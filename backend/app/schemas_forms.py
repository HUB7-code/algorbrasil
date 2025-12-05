from pydantic import BaseModel, EmailStr
from typing import Optional

class NewsletterCreate(BaseModel):
    email: EmailStr

class AssociationCreate(BaseModel):
    nome: str
    email: EmailStr
    empresa: Optional[str] = None
    cargo: Optional[str] = None
    interesse: str
    mensagem: Optional[str] = None
