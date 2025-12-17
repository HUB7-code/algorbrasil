from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from backend.app.models.project import ProjectStatus, RiskLevel

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING
    risk_level: RiskLevel = RiskLevel.LOW

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    risk_level: Optional[RiskLevel] = None

class ProjectOut(ProjectBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
