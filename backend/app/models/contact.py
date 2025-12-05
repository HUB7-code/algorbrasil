from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from backend.app.db.session import Base
import enum

class ContactStatus(str, enum.Enum):
    new = "novo"
    replied = "respondido"
    archived = "arquivado"

class ContactSource(str, enum.Enum):
    newsletter = "newsletter"
    association = "associacao"
    contact = "contato"

class ContactLog(Base):
    __tablename__ = "contact_logs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=True) # Newsletter pode não ter nome
    email = Column(String, index=True, nullable=False)
    company = Column(String, nullable=True)
    role = Column(String, nullable=True)
    interest = Column(String, nullable=True)
    message = Column(Text, nullable=True)
    
    source = Column(String, nullable=False) # 'newsletter', 'associacao'
    status = Column(String, default="novo")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
