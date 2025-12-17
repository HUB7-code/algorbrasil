
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum, Float
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from backend.app.db.session import Base
import enum

class RiskStrategy(str, enum.Enum):
    MITIGATE = "Mitigar"
    ACCEPT = "Aceitar"
    TRANSFER = "Transferir"
    AVOID = "Evitar"

class RiskStatus(str, enum.Enum):
    OPEN = "Aberto"
    IN_PROGRESS = "Em Tratamento"
    MITIGATED = "Mitigado"
    RESIDUAL = "Risco Residual Aceito"

class RiskRegister(Base):
    """
    Tabela de Registro de Riscos de IA conforme ISO 42001 (Item 5.2).
    Armazena os riscos identificados, sua avaliação e tratamento.
    """
    __tablename__ = "risk_register"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # Identificação
    category = Column(String, nullable=False) # Ex: Viés, Segurança, Performance, Ética
    description = Column(Text, nullable=False)
    affected_system = Column(String, nullable=True) # Qual IA/Modelo é afetado
    
    # Avaliação Quantitativa (1-5)
    probability = Column(Integer, nullable=False, default=1)
    impact = Column(Integer, nullable=False, default=1)
    risk_level = Column(Integer, nullable=False) # Calculado: Prob * Impact
    
    # Tratamento
    strategy = Column(String, default=RiskStrategy.MITIGATE) # Enum manual para simplificar compatibilidade SQLite
    mitigation_plan = Column(Text, nullable=True)
    owner = Column(String, nullable=True) # Quem é o dono do risco
    
    # Status
    status = Column(String, default=RiskStatus.OPEN)
    
    # Auditoria
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relações
    user = relationship("User", back_populates="risks")
    
    # Organizacao (Multi-Tenant)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    organization = relationship("backend.app.models.organization.Organization", back_populates="risks")
