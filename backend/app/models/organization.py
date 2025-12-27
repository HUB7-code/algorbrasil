from sqlalchemy import Column, Integer, String, ForeignKey, Table, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.db.session import Base

# Tabela de Associação (Many-to-Many com Role)
organization_members = Table(
    "organization_members",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("organization_id", Integer, ForeignKey("organizations.id"), primary_key=True),
    Column("role", String, default="member"), # 'admin', 'auditor', 'viewer'
    Column("joined_at", DateTime(timezone=True), server_default=func.now())
)

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    cnpj = Column(String, unique=True, index=True, nullable=True) # Optional for international
    
    # Monetization / Credits System (Persona A)
    plan_tier = Column(String, default="free") # 'free', 'pro', 'enterprise'
    credits_balance = Column(Integer, default=3) # Créditos para uso de ferramentas (Demo Limitada)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Owner (Quem paga a conta)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("backend.app.models.user.User", back_populates="owned_organizations")

    # Membros (Inclui Consultores Externos)
    members = relationship(
        "backend.app.models.user.User",
        secondary=organization_members,
        back_populates="organizations"
    )

    # Ativos de IA vinculados a esta Organização
    # Note: Precisaremos atualizar o AIAsset para ter organization_id
    assets = relationship("backend.app.models.ai_asset.AIAsset", back_populates="organization")

    # Riscos vinculados
    risks = relationship("backend.app.models.risk.RiskRegister", back_populates="organization")
