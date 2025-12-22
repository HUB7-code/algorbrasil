from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, Boolean
from sqlalchemy.sql import func
from backend.app.db.session import Base
import enum

class PartnerApplicationStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class PartnerApplication(Base):
    __tablename__ = "partner_applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, index=True) # Corporate email
    linkedin = Column(String, nullable=True)
    whatsapp = Column(String)
    area = Column(String) # 'Consultoria', 'Advocacia', etc.
    motivation = Column(Text)
    
    status = Column(String, default="pending") # pending, approved, rejected
    reviewed_by = Column(Integer, nullable=True) # User ID of admin who reviewed
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
