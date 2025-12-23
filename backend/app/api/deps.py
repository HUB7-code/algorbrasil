from typing import Generator
from backend.app.db.session import SessionLocal
from backend.app.core.config import settings
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session
from backend.app.models.user import User
from backend.app.core import security
from backend.app.api.auth import get_current_user

# Re-export get_db
from backend.app.db.session import get_db

# Re-export or implement get_current_active_user
def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def get_current_member_user(
    current_user: User = Depends(get_current_active_user),
) -> User:
    """
    Verifica se o usuario e Membro Associado (Categoria B) ou Admin.
    Caso contrario, nega acesso a conteudos premium.
    """
    if current_user.role not in ["member", "admin", "auditor"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Conteudo exclusivo para Membros Associados. Faca o upgrade do seu plano."
        )
    return current_user
