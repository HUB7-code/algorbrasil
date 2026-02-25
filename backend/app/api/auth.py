import pyotp
import qrcode
import io
import base64
import httpx # OAuth
from urllib.parse import urlencode # OAuth Query Params
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Request
from fastapi.responses import RedirectResponse

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
from backend.app.services.email_service import send_welcome_email

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")

import clerk_backend_api
from clerk_backend_api import Clerk

# Iniciar Cliente do Clerk (singleton global recomendado para as rotas auth)
# Evita inicializar a class Clerk a cada request.
clerk_client = Clerk(bearer_auth=settings.CLERK_SECRET_KEY)

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Decodifica o Token JWT recebido do Clerk via Authorization Header (Bearer).
    Busca o usuário no banco local através do seu `clerk_id` (sub do token).
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Nao foi possivel validar as credenciais do Clerk. Sessão inválida ou expirada.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # A SDK Clerk verifica assinatura criptográfica remotamente (via JWKS em cache interno).
        # Retorna um dict se for válido ou lança exception
        # OBS: verify_token usa a secret key fornecida na inicialização do cliente
        payload = clerk_client.verify_token(token)
        
        # O ID do clerk fica no campo 'sub' (subject) retornado
        clerk_id: str = payload.get("sub")
        
        if clerk_id is None:
            raise credentials_exception
            
    except Exception as e:
        logger.warning(f"Clerk JWT Verification falhou: {e}")
        raise credentials_exception
    
    # 2. Buscar o usuário relacional associado a este ID único do Clerk
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    
    # OBS Especial: Caso o Webhook ainda não tenha terminado de processar (race condition),
    # nós também tentamos buscar por email caso ele esteja no token claims, caso tenha sido registrado manualmente
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário logado no Clerk, mas perfil não foi sincronizado com ALGOR. Contate o suporte.",
        )
        
    return user

# ==========================================
# ROTAS DE AUTENTICACAO DEMOVIDAS P/ CLERK
# ==========================================
# As rotas de Cadastro (Signup), Confirmação de Email,
# e Login foram removidas. A identidade é agora gerenciada pelo Clerk.
# Sincronização é feita via Webhooks em /api/v1/webhooks/clerk

# ==========================================


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

# ==========================================
# OAUTH2 - GOOGLE LOGIN
# ==========================================

@router.get("/google/login")
async def google_login():
    """
    Inicia o fluxo OAuth2 com Google.
    Retorna a URL de autorização do Google.
    """
    # Verificar se as credenciais do Google estão configuradas
    if not settings.GOOGLE_CLIENT_ID or not settings.GOOGLE_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Google Login não configurado no servidor (Faltam credenciais)."
        )
    
    # URL de callback (deve estar registrada no Google Console)
    redirect_uri = f"{settings.FRONTEND_URL}/api/v1/auth/google/callback"
    
    # Parâmetros da URL de autorização
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    
    # Construir URL de autorização
    auth_url = f"https://accounts.google.com/o/oauth2/v2/auth?{urlencode(params)}"
    
    return {"url": auth_url}


@router.get("/google/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    """
    Callback do Google OAuth2.
    Recebe o código de autorização e troca por access_token.
    """
    if not code:
        raise HTTPException(status_code=400, detail="Código de autorização não fornecido")
    
    # Trocar código por access_token
    token_url = "https://oauth2.googleapis.com/token"
    redirect_uri = f"{settings.FRONTEND_URL}/api/v1/auth/google/callback"
    
    token_data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": redirect_uri,
        "grant_type": "authorization_code"
    }
    
    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=token_data)
        
        if token_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Erro ao obter access_token do Google")
        
        tokens = token_response.json()
        access_token = tokens.get("access_token")
        
        # Buscar informações do usuário
        user_info_url = "https://www.googleapis.com/oauth2/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        
        user_response = await client.get(user_info_url, headers=headers)
        
        if user_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Erro ao obter informações do usuário")
        
        user_data = user_response.json()
    
    # Verificar se usuário já existe
    email = user_data.get("email")
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Criar novo usuário
        user = User(
            email=email,
            full_name=user_data.get("name", ""),
            hashed_password=get_password_hash(os.urandom(32).hex()),  # Senha aleatória
            role="subscriber",
            is_active=True,  # Já ativado pois e-mail foi verificado pelo Google
            is_totp_enabled=False,
            oauth_provider="google",
            oauth_id=user_data.get("id")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Criar organização default
        from backend.app.models.organization import Organization
        org = Organization(
            name=f"Organização de {user.full_name}",
            credits=3,
            owner_id=user.id
        )
        db.add(org)
        db.commit()
        
        # Audit log
        try:
            from backend.app.models.audit import AuditLog
            audit_log = AuditLog(
                user_id=user.id,
                action="USER_SIGNUP_GOOGLE",
                resource_type="user",
                resource_id=str(user.id),
                ip_address="oauth"
            )
            db.add(audit_log)
            db.commit()
        except Exception as e:
            logger.warning(f"Falha ao registrar audit log: {e}")
    
    # Gerar JWT
    access_token_jwt = create_access_token(data={"sub": user.email})
    
    # Redirecionar para frontend com token
    frontend_redirect = f"{settings.FRONTEND_URL}/login/callback?token={access_token_jwt}&role={user.role}"
    return RedirectResponse(url=frontend_redirect)


# ==========================================
# OAUTH2 - LINKEDIN LOGIN
# ==========================================

@router.get("/linkedin/login")
async def linkedin_login():
    """
    Inicia o fluxo OAuth2 com LinkedIn.
    Retorna a URL de autorização do LinkedIn.
    """
    # Verificar se as credenciais do LinkedIn estão configuradas
    if not settings.LINKEDIN_CLIENT_ID or not settings.LINKEDIN_CLIENT_SECRET:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="LinkedIn Login não configurado no servidor (Faltam credenciais)."
        )
    
    # URL de callback
    redirect_uri = f"{settings.FRONTEND_URL}/api/v1/auth/linkedin/callback"
    
    # Parâmetros da URL de autorização
    params = {
        "response_type": "code",
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "scope": "openid profile email"
    }
    
    # Construir URL de autorização
    auth_url = f"https://www.linkedin.com/oauth/v2/authorization?{urlencode(params)}"
    
    return {"url": auth_url}


@router.get("/linkedin/callback")
async def linkedin_callback(code: str, db: Session = Depends(get_db)):
    """
    Callback do LinkedIn OAuth2.
    Recebe o código de autorização e troca por access_token.
    """
    if not code:
        raise HTTPException(status_code=400, detail="Código de autorização não fornecido")
    
    # Trocar código por access_token
    token_url = "https://www.linkedin.com/oauth/v2/accessToken"
    redirect_uri = f"{settings.FRONTEND_URL}/api/v1/auth/linkedin/callback"
    
    token_data = {
        "grant_type": "authorization_code",
        "code": code,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
        "redirect_uri": redirect_uri
    }
    
    async with httpx.AsyncClient() as client:
        token_response = await client.post(token_url, data=token_data)
        
        if token_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Erro ao obter access_token do LinkedIn")
        
        tokens = token_response.json()
        access_token = tokens.get("access_token")
        
        # Buscar informações do usuário
        user_info_url = "https://api.linkedin.com/v2/userinfo"
        headers = {"Authorization": f"Bearer {access_token}"}
        
        user_response = await client.get(user_info_url, headers=headers)
        
        if user_response.status_code != 200:
            raise HTTPException(status_code=400, detail="Erro ao obter informações do usuário")
        
        user_data = user_response.json()
    
    # Verificar se usuário já existe
    email = user_data.get("email")
    user = db.query(User).filter(User.email == email).first()
    
    if not user:
        # Criar novo usuário
        user = User(
            email=email,
            full_name=user_data.get("name", ""),
            hashed_password=get_password_hash(os.urandom(32).hex()),  # Senha aleatória
            role="subscriber",
            is_active=True,  # Já ativado pois e-mail foi verificado pelo LinkedIn
            is_totp_enabled=False,
            oauth_provider="linkedin",
            oauth_id=user_data.get("sub")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Criar organização default
        from backend.app.models.organization import Organization
        org = Organization(
            name=f"Organização de {user.full_name}",
            credits=3,
            owner_id=user.id
        )
        db.add(org)
        db.commit()
        
        # Audit log
        try:
            from backend.app.models.audit import AuditLog
            audit_log = AuditLog(
                user_id=user.id,
                action="USER_SIGNUP_LINKEDIN",
                resource_type="user",
                resource_id=str(user.id),
                ip_address="oauth"
            )
            db.add(audit_log)
            db.commit()
        except Exception as e:
            logger.warning(f"Falha ao registrar audit log: {e}")
    
    # Gerar JWT
    access_token_jwt = create_access_token(data={"sub": user.email})
    
    # Redirecionar para frontend com token
    frontend_redirect = f"{settings.FRONTEND_URL}/login/callback?token={access_token_jwt}&role={user.role}"
    return RedirectResponse(url=frontend_redirect)
