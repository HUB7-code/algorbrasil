
from sqlalchemy import Column, Integer, String, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from backend.app.db.session import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True) # Nullable para ações anônimas (ex: login falho)
    action = Column(String, nullable=False, index=True) # CREATE, READ, UPDATE, DELETE, LOGIN_FAIL
    resource_type = Column(String, nullable=False) # user, assessment, system
    resource_id = Column(String, nullable=True)
    details = Column(JSON, nullable=True) # Dados alterados (sem PII sensível!)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
