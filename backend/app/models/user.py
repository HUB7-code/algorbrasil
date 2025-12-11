from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from backend.app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    phone = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    role = Column(String, default="user") # 'admin', 'auditor', 'user'

    # Relacionamento com Avaliações
    assessments = relationship("backend.app.models.assessment.Assessment", back_populates="owner")

    # Relacionamentos de Perfil (Dual Funnel)
    professional_profile = relationship("backend.app.models.profiles.ProfessionalProfile", back_populates="user", uselist=False)
    corporate_profile = relationship("backend.app.models.profiles.CorporateProfile", back_populates="user", uselist=False)

    # Relacionamento com Riscos (ISO 42001)
    risks = relationship("backend.app.models.risk.RiskRegister", back_populates="user")
