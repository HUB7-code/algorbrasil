from pydantic import BaseModel, EmailStr

# Schema para Login (O que o usuário envia)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema para Token (O que a API responde)
class Token(BaseModel):
    access_token: str
    token_type: str

# Schema para Dados do Token
class TokenData(BaseModel):
    email: str | None = None
