import pyotp
import qrcode
import io
import base64
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from pydantic import BaseModel

from backend.app.schemas import UserCreate, UserLogin, Token, UserUpdate, UserResponse
from backend.app.core.security import get_password_hash, verify_password, create_access_token, ALGORITHM
from backend.app.core.config import settings
from backend.app.core.security_encryption import encrypt_field
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.services.email_service import send_welcome_email

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
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# ==========================================
# ROTAS DE AUTENTICACAO
# ==========================================

@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def create_user(user_in: UserCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """
    Cadastra um novo usuario.
    """
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="Este e-mail ja esta cadastrado no sistema."
        )
    
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        phone=encrypt_field(user_in.phone),
        role="subscriber",
        is_active=True,
        is_totp_enabled=False # Padrao off
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    background_tasks.add_task(send_welcome_email, new_user.full_name or "Membro", new_user.email, False)

    return {"message": "Usuario criado com sucesso", "email": new_user.email}

@router.post("/login", response_model=Token)
async def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Autentica o usuario. Se tiver 2FA ativado, retorna token temporario.
    """
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais incorretas", headers={"WWW-Authenticate": "Bearer"})
    
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
             
    except JWTError:
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
