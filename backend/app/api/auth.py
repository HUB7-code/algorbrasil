from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from backend.app.schemas import UserLogin, Token
from backend.app.core.security import verify_password, create_access_token, get_password_hash

router = APIRouter()

from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User

@router.post("/login", response_model=Token)
async def login_for_access_token(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Autentica o usuário e retorna o Token JWT.
    
    Verifica as credenciais no banco de dados SQLite/PostgreSQL.
    """
    # 1. Buscar usuário pelo email
    user = db.query(User).filter(User.email == user_data.email).first()
    
    # 2. Verificar se usuário existe e se a senha bate
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais incorretas (Email ou Senha inválidos)",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Gerar token se sucesso
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}
    )
    
    return {"access_token": access_token, "token_type": "bearer"}
