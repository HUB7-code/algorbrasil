from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.app.db.session import Base
import enum

class ProjectStatus(str, enum.Enum):
    PLANNING = "planning"
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    RETIRED = "retired"

class RiskLevel(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    status = Column(String, default=ProjectStatus.PLANNING)
    risk_level = Column(String, default=RiskLevel.LOW)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relacionamentos
    user = relationship("User", back_populates="projects")
