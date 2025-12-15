from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PaymentBase(BaseModel):
    amount: float
    currency: str = "BRL"
    product_name: str

class PaymentCreate(PaymentBase):
    user_id: int
    stripe_session_id: Optional[str] = None

class PaymentUpdate(PaymentBase):
    status: str
    stripe_session_id: Optional[str] = None

class PaymentOut(PaymentBase):
    id: int
    user_id: int
    status: str
    stripe_session_id: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class CheckoutSessionRequest(BaseModel):
    product_type: str # e.g. "viability_report"
