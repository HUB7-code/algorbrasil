from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.db.session import Base

class AIAsset(Base):
    __tablename__ = "ai_assets"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    name = Column(String, index=True, nullable=False)
    department = Column(String, nullable=True)
    type = Column(String, nullable=False)  # SaaS, Model, etc.
    risk_level = Column(String, nullable=False) # Low, Medium, High, Critical
    data_types = Column(String, nullable=True) # JSON or comma-separated string
    status = Column(String, default="Under Review") # Active, Under Review, Approved, Rejected
    description = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = relationship("User", back_populates="assets")
    
    # Organizacao (Multi-Tenant)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=True)
    organization = relationship("backend.app.models.organization.Organization", back_populates="assets")
