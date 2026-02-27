import logging
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from backend.app.core.config import settings
from backend.app.db.session import get_db
from backend.app.models.user import User
from clerk_backend_api import Clerk

logger = logging.getLogger(__name__)

# O endpoint /login não existe mais no backend, 
# mas usamos o OAuth2PasswordBearer para forçar o swagger a pedir token Bearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

# Iniciar Cliente do Clerk (singleton global recomendado para as rotas auth)
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
        # A SDK Clerk verifica assinatura criptográfica remotamente
        payload = clerk_client.verify_token(token)
        clerk_id: str = payload.get("sub")
        if clerk_id is None:
            raise credentials_exception
            
    except Exception as e:
        logger.warning(f"Clerk JWT Verification falhou: {e}")
        raise credentials_exception
    
    # Buscar o usuário relacional associado a este ID único do Clerk
    user = db.query(User).filter(User.clerk_id == clerk_id).first()
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário logado no Clerk, mas perfil não foi sincronizado com ALGOR. Contate o suporte.",
        )
        
    return user
