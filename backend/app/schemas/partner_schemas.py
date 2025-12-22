from pydantic import BaseModel, EmailStr, HttpUrl
from typing import Optional
from datetime import datetime

class PartnerApplicationBase(BaseModel):
    full_name: str
    email: EmailStr
    linkedin: Optional[str] = None
    whatsapp: str
    area: str
    motivation: str

class PartnerApplicationCreate(PartnerApplicationBase):
    pass

class PartnerApplicationResponse(PartnerApplicationBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
