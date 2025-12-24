from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# === Enums ===
class LeadStatus(str, Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    NURTURING = "nurturing"
    CONVERTED = "converted"
    LOST = "lost"

class LeadPriority(str, Enum):
    HOT = "hot"
    WARM = "warm"
    COLD = "cold"
    NURTURE = "nurture"

class FunnelStage(str, Enum):
    TOP = "top_funnel"
    MID = "mid_funnel"
    BOTTOM = "bottom_funnel"

# === Create Schemas ===

class LeadCreateBase(BaseModel):
    """Schema base para criação de leads"""
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    company: Optional[str] = None
    source: Optional[str] = None

class LeadCreateDiagnostic(LeadCreateBase):
    """
    ESTÁGIO 2 - MEIO DE FUNIL
    Diagnóstico Técnico (Enterprise Page)
    """
    ai_providers: List[str] = Field(default_factory=list)
    pain_points: List[str] = Field(default_factory=list, max_length=2)
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "João Silva",
                "email": "joao@empresa.com.br",
                "company": "Empresa XYZ",
                "ai_providers": ["openai", "anthropic"],
                "pain_points": ["lgpd", "hallucinations"],
                "source": "enterprise-page"
            }
        }

class LeadCreateSpecialist(LeadCreateBase):
    """
    ESTÁGIO 3 - FUNDO DE FUNIL
    Falar com Especialista (Qualificação Completa)
    """
    phone: str = Field(..., min_length=10)
    role: str
    company_size: Optional[str] = None
    ai_volume: Optional[str] = None
    urgency: Optional[str] = None
    contact_time: Optional[str] = None
    comments: Optional[str] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "Maria Santos",
                "email": "maria@bigcorp.com.br",
                "phone": "(11) 99999-9999",
                "company": "BigCorp Brasil",
                "role": "cto",
                "company_size": "201-1000",
                "ai_volume": "100k-1M",
                "urgency": "planning",
                "contact_time": "morning",
                "comments": "Interesse em compliance LGPD para GPT-4",
                "source": "enterprise-cta"
            }
        }

class LeadCreateScanner(BaseModel):
    """
    ESTÁGIO 1 - TOPO DE FUNIL
    Scanner Freemium (Apenas Email)
    """
    email: EmailStr
    source: Optional[str] = "scanner-freemium"

# === Update Schema ===

class LeadUpdate(BaseModel):
    """Schema para atualização de leads pelo admin"""
    status: Optional[LeadStatus] = None
    priority: Optional[LeadPriority] = None
    admin_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    contacted_at: Optional[datetime] = None

# === Response Schemas ===

class LeadResponse(BaseModel):
    """Schema de resposta completa do lead"""
    id: int
    name: str
    email: str
    phone: Optional[str] = None
    company: Optional[str] = None
    role: Optional[str] = None
    company_size: Optional[str] = None
    ai_volume: Optional[str] = None
    ai_providers: Optional[List[str]] = None
    pain_points: Optional[List[str]] = None
    lead_score: int
    priority: str
    status: str
    funnel_stage: str
    lead_type: Optional[str] = None
    source: Optional[str] = None
    urgency: Optional[str] = None
    contact_time: Optional[str] = None
    comments: Optional[str] = None
    admin_notes: Optional[str] = None
    assigned_to: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    contacted_at: Optional[datetime] = None
    converted_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class LeadListResponse(BaseModel):
    """Schema para listagem paginada de leads"""
    items: List[LeadResponse]
    total: int
    page: int
    per_page: int
    pages: int

class LeadStats(BaseModel):
    """Estatísticas de leads para dashboard admin"""
    total_leads: int
    new_leads: int
    contacted_leads: int
    qualified_leads: int
    converted_leads: int
    hot_leads: int
    warm_leads: int
    conversion_rate: float
    leads_today: int
    leads_this_week: int
    leads_this_month: int
