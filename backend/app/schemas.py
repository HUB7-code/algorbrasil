from pydantic import BaseModel, EmailStr

# Schema para Login (O que o usuário envia)
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Schema para Token (O que a API responde)
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str # 'subscriber' | 'member' | 'admin'
    username: str # Para exibir na tela "Olá, Fulano"

# Schema para Dados do Token
class TokenData(BaseModel):
    email: str | None = None

# Schema para Cadastro (Novo Leads Nível 1)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone: str | None = None
