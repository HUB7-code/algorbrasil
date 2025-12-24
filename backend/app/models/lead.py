from sqlalchemy import Boolean, Column, Integer, String, DateTime, Text, JSON, Enum
from sqlalchemy.sql import func
from backend.app.db.session import Base
import enum

class LeadStatus(str, enum.Enum):
    NEW = "new"
    CONTACTED = "contacted"
    QUALIFIED = "qualified"
    NURTURING = "nurturing"
    CONVERTED = "converted"
    LOST = "lost"

class LeadPriority(str, enum.Enum):
    HOT = "hot"
    WARM = "warm"
    COLD = "cold"
    NURTURE = "nurture"

class FunnelStage(str, enum.Enum):
    TOP = "top_funnel"
    MID = "mid_funnel"
    BOTTOM = "bottom_funnel"

class Lead(Base):
    """
    Lead Model - Para captura e gestão de leads do funil de vendas
    
    Estágios do Funil:
    - TOP: Scanner Freemium (apenas email)
    - MID: Diagnóstico Técnico (contato + contexto IA)
    - BOTTOM: Falar com Especialista (qualificação completa)
    """
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    
    # === Dados Básicos ===
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    company = Column(String(255), nullable=True)
    
    # === Qualificação ===
    role = Column(String(100), nullable=True)  # Cargo
    company_size = Column(String(50), nullable=True)  # 10-50, 51-200, etc.
    ai_volume = Column(String(50), nullable=True)  # Volume de requisições IA/mês
    
    # === Contexto IA (JSON arrays) ===
    ai_providers = Column(JSON, nullable=True)  # ['openai', 'anthropic', etc.]
    pain_points = Column(JSON, nullable=True)  # ['lgpd', 'hallucinations', etc.]
    
    # === Classificação ===
    lead_score = Column(Integer, default=0)  # 0-100
    priority = Column(String(20), default=LeadPriority.NURTURE.value)
    status = Column(String(20), default=LeadStatus.NEW.value, index=True)
    funnel_stage = Column(String(20), default=FunnelStage.MID.value)
    lead_type = Column(String(50), nullable=True)  # diagnostic_request, specialist_contact, scanner_trial
    
    # === Tracking ===
    source = Column(String(100), nullable=True)  # enterprise-page, scanner, calculadora
    utm_source = Column(String(100), nullable=True)
    utm_medium = Column(String(100), nullable=True)
    utm_campaign = Column(String(100), nullable=True)
    
    # === Preferências de Contato ===
    urgency = Column(String(50), nullable=True)  # exploring, planning, urgent
    contact_time = Column(String(50), nullable=True)  # morning, afternoon, flexible
    comments = Column(Text, nullable=True)
    
    # === Notas Internas (Admin) ===
    admin_notes = Column(Text, nullable=True)
    assigned_to = Column(String(255), nullable=True)  # Email do vendedor responsável
    
    # === Timestamps ===
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    contacted_at = Column(DateTime(timezone=True), nullable=True)
    converted_at = Column(DateTime(timezone=True), nullable=True)
    
    # === LGPD Compliance ===
    consent_marketing = Column(Boolean, default=False)
    consent_data_processing = Column(Boolean, default=True)
    ip_address = Column(String(50), nullable=True)
    
    def __repr__(self):
        return f"<Lead {self.id}: {self.email} - {self.status}>"
