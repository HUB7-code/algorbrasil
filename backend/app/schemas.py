
from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import Optional

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

# === NOVOS SCHEMAS (DUAL FUNNEL) ===

class CorporateProfileCreate(BaseModel):
    company_name: str = Field(..., min_length=2, max_length=100)
    sector: str = Field(..., min_length=2, max_length=50)
    size_range: str = Field(..., pattern="^(1-50|51-200|201-1000|1000\+)$")
    website: Optional[HttpUrl] = None

class CorporateProfileResponse(CorporateProfileCreate):
    id: int
    user_id: int
    
    class Config:
        from_attributes = True

class ProfessionalProfileCreate(BaseModel):
    linkedin_url: HttpUrl
    bio: Optional[str] = Field(None, max_length=500)
    years_experience: int = Field(0, ge=0, le=50)
    primary_expertise: str = Field(..., min_length=2, max_length=50)
    city: str
    state: str = Field(..., min_length=2, max_length=2) # UF

class ProfessionalProfileResponse(ProfessionalProfileCreate):
    id: int
    user_id: int
    status: str
    membership_tier: str
    
    class Config:
        from_attributes = True
