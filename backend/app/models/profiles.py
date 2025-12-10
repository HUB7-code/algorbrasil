
from sqlalchemy import Column, Integer, String, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from backend.app.db.session import Base
import enum

class ApplicationStatus(str, enum.Enum):
    PENDING = "pending"
    UNDER_REVIEW = "under_review"
    APPROVED = "approved"
    REJECTED = "rejected"

class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Dados Públicos (Transparência para o Mapa de Influência)
    bio = Column(Text, nullable=True)
    linkedin_url = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    
    # Dados de Qualificação
    years_experience = Column(Integer, default=0)
    primary_expertise = Column(String, nullable=True) # Ex: "Legal", "Technical", "Ethics"
    
    # Status na Associação
    status = Column(String, default=ApplicationStatus.PENDING)
    membership_tier = Column(String, default="standard") # 'standard', 'gold', 'platinum'

    # Relacionamento
    user = relationship("backend.app.models.user.User", back_populates="professional_profile")

class CorporateProfile(Base):
    __tablename__ = "corporate_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    
    # Dados da Empresa (Alguns podem ser sensíveis se for startup em stealth mode)
    company_name = Column(String, nullable=False)
    sector = Column(String, nullable=True) # Finance, Health, Retail
    size_range = Column(String, nullable=True) # 1-50, 51-200, etc.
    
    # Dados Sensíveis de Risco (Devem ser tratados com cuidado no Controller)
    website = Column(String, nullable=True)
    
    # Relacionamento
    user = relationship("backend.app.models.user.User", back_populates="corporate_profile")
