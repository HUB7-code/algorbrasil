import pyotp
import qrcode
import io
import base64
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Request
from fastapi.security import OAuth2PasswordBearer
from backend.app.core.limiter import limiter
import jwt # Replaces from jose import jwt, JWTError
from jwt.exceptions import PyJWTError # Replaces JWTError

from sqlalchemy.orm import Session
from pydantic import BaseModel

from backend.app.schemas import UserCreate, UserLogin, Token, UserUpdate, UserResponse
from backend.app.core.security import get_password_hash, verify_password, create_access_token, ALGORITHM
from backend.app.core.config import settings
from backend.app.core.security_encryption import encrypt_field
from backend.app.db.session import get_db
import logging

logger = logging.getLogger(__name__)
from backend.app.models.user import User
from backend.app.services.email_service import send_welcome_email, send_verification_email

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Decodifica o Token JWT e recupera o usuario atual.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Nao foi possivel validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # PyJWT decode does not require algorithms list as strictly but good practice
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except PyJWTError: # Catch generic PyJWT error
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# ==========================================
# ROTAS DE AUTENTICACAO
# ==========================================

@router.post("/signup", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_user(request: Request, user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Cadastra um novo usuario (Status: Pendente de Verificacao).
    """
    try:
        logger.info(f"🚀 INICIANDO CADASTRO PARA: {user_in.email}")
        user = db.query(User).filter(User.email == user_in.email).first()
        if user:
            raise HTTPException(
                status_code=400,
                detail="Este e-mail ja esta cadastrado no sistema."
            )
        
        # Criptografar phone apenas se não for None
        encrypted_phone = encrypt_field(user_in.phone) if user_in.phone else None
        
        new_user = User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            full_name=user_in.full_name,
            phone=encrypted_phone,
            role="subscriber",
            is_active=False, # BLOQUEADO ATE CONFIRMAR EMAIL
            is_totp_enabled=False 
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"✅ Usuário salvo no DB (ID: {new_user.id})")
        
        # === [LGPD AUDIT] ===
        # Registrar ação de criação de usuário para compliance
        try:
            from backend.app.models.audit import AuditLog
            audit_log = AuditLog(
                user_id=new_user.id,
                action="USER_SIGNUP",
                resource_type="user",
                resource_id=str(new_user.id),
                details={"email": new_user.email}
            )
            db.add(audit_log)
            db.commit()
            logger.info(f"📝 Audit Log criado para signup (User ID: {new_user.id})")
        except Exception as e_audit:
            logger.warning(f"⚠️ Erro não-fatal ao criar AuditLog: {e_audit}")

        # === [FIX PERSONA A] ===
        # Criar Organização Pessoal Default IMEDIATAMENTE para que ele tenha onde gastar os créditos
        # Isso evita o erro "Nenhuma organizacao owner encontrada" no primeiro login
        try:
            from backend.app.models.organization import Organization, organization_members
            
            default_org_name = f"Org de {user_in.full_name.split()[0]}" if user_in.full_name else "Minha Organização"
            new_org = Organization(
                name=default_org_name,
                owner_id=new_user.id,
                plan_tier="free",
                credits_balance=3 # <--- O OURO ESTÁ AQUI (3 Créditos de Demo)
            )
            db.add(new_org)
            db.commit()
            db.refresh(new_org)
            
            # Linkar como Owner (SQLAlchemy 2.0 compatible)
            from sqlalchemy import insert
            stmt = insert(organization_members).values(
                user_id=new_user.id,
                organization_id=new_org.id,
                role="owner"
            )
            db.execute(stmt)
            db.commit()
            logger.info(f"✅ Organização Default Criada: {new_org.name} (ID: {new_org.id})")
            
        except Exception as e_org:
            logger.warning(f"⚠️ ERRO NÃO-FATAL AO CRIAR ORG DEFAULT: {e_org}")
            # Não abortamos o cadastro por isso, mas logamos
        
        # Gerar Token de Verificacao (Validade: 24h)
        verification_token = create_access_token(
            data={"sub": new_user.email, "type": "email_verification"},
            expires_delta=timedelta(hours=24)
        )
        
        # Envio SÍNCRONO para garantir e debugar (sem BackgroundTasks por enquanto)
        logger.info("📧 Preparando envio de e-mail...")
        try:
            from backend.app.services.email_service import send_verification_email
            send_verification_email(new_user.full_name or "Usuario", new_user.email, verification_token)
            logger.info("✅ E-mail de verificação despachado com sucesso!")
        except Exception as e:
            logger.error(f"❌ ERRO CRÍTICO AO ENVIAR E-MAIL: {str(e)}")
            # Em produção, não parariamos o cadastro, mas para debug queremos ver o erro
            # raise HTTPException(status_code=500, detail=f"Erro no envio de e-mail: {str(e)}")

        return {
            "message": "Cadastro realizado. Verifique seu e-mail para ativar a conta.", 
            "email": new_user.email,
            "status": "pending_verification"
        }
    
    except HTTPException:
        # Re-raise HTTPExceptions (já são JSON válidos)
        raise
    except Exception as e:
        # Capturar qualquer outro erro e retornar JSON válido
        logger.error(f"❌ ERRO INTERNO NO SIGNUP: {str(e)}")
        import traceback
        traceback.print_exc() # Manter traceback é ok em dev, mas idealmente usar logger.exception
        raise HTTPException(
            status_code=500,
            detail=f"Erro interno ao processar cadastro: {str(e)}"
        )

class EmailVerification(BaseModel):
    token: str

@router.post("/verify-email")
async def verify_email_token(data: EmailVerification, db: Session = Depends(get_db)):
    """
    Valida o token de e-mail e ativa a conta.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Token de verificação inválido ou expirado."
    )
    
    try:
        payload = jwt.decode(data.token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if email is None or token_type != "email_verification":
            raise credentials_exception
            
    except PyJWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
         raise HTTPException(status_code=404, detail="Usuário não encontrado.")
         
    if user.is_active:
        return {"message": "Conta já está ativa. Pode fazer login."}
        
    user.is_active = True
    db.commit()
    
    # Opcional: Enviar boas vindas agora
    # send_welcome_email...
    
    return {"message": "E-mail confirmado com sucesso! Sua conta foi ativada."}

    
    return {"message": "E-mail confirmado com sucesso! Sua conta foi ativada."}

# ==========================================
# RESET DE SENHA
# ==========================================

class ForgotPasswordRequest(BaseModel):
    email: str

class PasswordReset(BaseModel):
    token: str
    new_password: str

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Solicita redefinicao de senha por e-mail.
    """
    user = db.query(User).filter(User.email == request.email).first()
    
    # Security: Always return success to prevent email enumeration
    if user:
        # Generate Reset Token (Valid for 1 hour)
        reset_token = create_access_token(
            data={"sub": user.email, "type": "password_reset"},
            expires_delta=timedelta(hours=1)
        )
        
        # Enviar Email (Sincrono ou Async conforme necessidade)
        # Vamos usar Sincrono agora para garantir que o cliente veja erros de SMTP se houver
        # background_tasks.add_task(send_password_reset_email, user.full_name, user.email, reset_token)
        try:
             from backend.app.services.email_service import send_password_reset_email
             send_password_reset_email(user.full_name, user.email, reset_token)
             logger.info(f"📧 Reset email sent to {user.email}")
        except Exception as e:
            logger.error(f"❌ Failed to send reset email: {e}")
    
    return {"message": "Se este e-mail estiver cadastrado, você receberá as instruções em breve."}

@router.post("/reset-password")
async def reset_password(data: PasswordReset, db: Session = Depends(get_db)):
    """
    Redefine a senha usando o token recebido por e-mail.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Token inválido ou expirado."
    )
    
    try:
        payload = jwt.decode(data.token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if email is None or token_type != "password_reset":
             raise credentials_exception
             
    except PyJWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    
    # Update Password
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    
    return {"message": "Senha redefinida com sucesso! Você já pode fazer login."}

@router.post("/login", response_model=Token)
@limiter.limit("5/minute")
async def login_for_access_token(request: Request, user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Autentica o usuario. Se tiver 2FA ativado, retorna token temporario.
    """
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais incorretas", headers={"WWW-Authenticate": "Bearer"})

    if not user.is_active:
        raise HTTPException(status_code=400, detail="E-mail não verificado. Por favor, ative sua conta.")
    
    # === VERIFICACAO 2FA ===
    if user.is_totp_enabled:
        # Gerar Token Temporario (Scope: PRE_2FA)
        temp_token = create_access_token(
            data={"sub": user.email, "role": "PRE_2FA"},
            expires_delta=timedelta(minutes=5)
        )
        
        return {
            "access_token": temp_token,
            "token_type": "bearer",
            "role": "pre_auth",
            "username": user.full_name,
            "requires_2fa": True
        }

    # Login Direto (Sem 2FA)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "role": user.role, 
        "username": user.full_name,
        "requires_2fa": False
    }

# ==========================================
# 2FA (TOTP)
# ==========================================

class OTPVerify(BaseModel):
    code: str
    temp_token: str

@router.post("/auth/2fa/setup")
async def setup_2fa(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Gera um novo Segredo TOTP e retorna a URL do QR Code.
    """
    # 1. Gerar Segredo Aleatorio Base32
    secret = pyotp.random_base32()
    
    # 2. Salvar temporariamente no user (ainda nao ativado)
    current_user.totp_secret = secret
    db.commit()
    
    # 3. Gerar URI de Provisionamento
    uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=current_user.email,
        issuer_name="Algor Brasil"
    )
    
    # 4. Gerar Imagem QR Code
    img = qrcode.make(uri)
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    qr_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    return {
        "secret": secret,
        "qr_code_url": f"data:image/png;base64,{qr_base64}"
    }

class TwoFAActivation(BaseModel):
    code: str

@router.post("/auth/2fa/activate")
async def activate_2fa(data: TwoFAActivation, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Confirma o primeiro codigo e ativa o 2FA.
    """
    if not current_user.totp_secret:
        raise HTTPException(status_code=400, detail="Setup de 2FA nao iniciado.")

    # Validar Codigo
    totp = pyotp.TOTP(current_user.totp_secret)
    if not totp.verify(data.code):
        raise HTTPException(status_code=400, detail="Codigo invalido. Verifique o relogio do celular.")
    
    # Sucesso: Ativar
    current_user.is_totp_enabled = True
    db.commit()
    
    return {"message": "Autenticacao de Dois Fatores ativada com sucesso!"}

@router.post("/verify-2fa", response_model=Token)
async def verify_2fa_code(otp_data: OTPVerify, db: Session = Depends(get_db)):
    """
    Troca o Token Temporario + Codigo TOTP pelo Token de Acesso Real.
    """
    try:
        # Decodificar o token temporario
        payload = jwt.decode(otp_data.temp_token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        role = payload.get("role")
        
        if role != "PRE_2FA":
             raise HTTPException(status_code=400, detail="Token invalido para esta etapa.")
             
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Sessao expirada. Faca login novamente.")

    user = db.query(User).filter(User.email == email).first()
    if not user or not user.is_totp_enabled:
        raise HTTPException(status_code=400, detail="Usuario nao possui 2FA ativo.")

    # Validar Codigo TOTP usando o segredo do banco
    totp = pyotp.TOTP(user.totp_secret)
    
    if not totp.verify(otp_data.code, valid_window=1):
         raise HTTPException(status_code=400, detail="Codigo incorreto.")

    # Sucesso: Emitir Token Real
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return {
        "access_token": access_token, 
        "token_type": "bearer", 
        "role": user.role, 
        "username": user.full_name,
        "requires_2fa": False
    }

# ==========================================
# USER MANAGEMENT (SELF)
# ==========================================

@router.get("/users/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """
    Retorna os dados do usuario logado.
    """
    return current_user

@router.put("/users/me", response_model=UserResponse)
async def update_user_me(
    user_in: UserUpdate, 
    current_user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """
    Atualiza dados do perfi (Nome, Email, Senha).
    """
    # 1. Update basics
    if user_in.full_name is not None:
        current_user.full_name = user_in.full_name
    if user_in.email is not None:
        # Check uniqueness if email changing
        if user_in.email != current_user.email:
            existing = db.query(User).filter(User.email == user_in.email).first()
            if existing:
                 raise HTTPException(status_code=400, detail="Este e-mail ja esta em uso.")
            current_user.email = user_in.email

    if user_in.phone is not None:
        current_user.phone = encrypt_field(user_in.phone)

    # 2. Update Password if provided
    if user_in.password:
        current_user.hashed_password = get_password_hash(user_in.password)

    db.add(current_user)
    db.commit()
    db.refresh(current_user)
    
    return current_user

import shutil
import os
from fastapi import UploadFile, File

@router.post("/users/me/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload de foto de perfil.
    """
    # 1. Definir local de salvamento
    UPLOAD_DIR = "backend/app/static/uploads/avatars"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # 2. Gerar nome de arquivo seguro
    file_ext = file.filename.split(".")[-1]
    filename = f"user_{current_user.id}_avatar.{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # 3. Salvar arquivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # 4. Atualizar no Banco
    # URL relativa para acesso via static
    relative_url = f"/static/uploads/avatars/{filename}"
    current_user.profile_image = relative_url
    
    db.add(current_user)
    db.commit()
    
    return {"message": "Avatar atualizado", "url": relative_url}
