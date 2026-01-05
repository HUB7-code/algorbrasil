from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AIAssetBase(BaseModel):
    name: str
    department: Optional[str] = None
    type: str # SaaS, Model, etc.
    risk_level: str # Low, Medium, High, Critical
    data_types: Optional[str] = None
    description: Optional[str] = None

class AIAssetCreate(AIAssetBase):
    pass

class AIAssetOut(AIAssetBase):
    id: int
    owner_id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True
