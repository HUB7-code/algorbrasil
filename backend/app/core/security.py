from datetime import datetime, timedelta
from typing import Optional
from datetime import datetime, timedelta
from typing import Optional
import jwt # Replaces from jose import jwt
from passlib.context import CryptContext
from backend.app.core.config import settings

# ...

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Cria um token JWT com tempo de expiração."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        # Use config value (8 days) instead of hardcoded 15 mins for better DX
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    # PyJWT encode returns string, jose returns string.
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
