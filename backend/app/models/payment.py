from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from backend.app.db.session import Base

class PaymentStatus(str, enum.Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"
    REFUNDED = "refunded"

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stripe_session_id = Column(String, unique=True, index=True, nullable=True)
    amount = Column(Float, nullable=False)
    currency = Column(String, default="BRL")
    status = Column(String, default=PaymentStatus.PENDING)
    product_name = Column(String, nullable=False) # "viability_report_v9"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("backend.app.models.user.User", back_populates="payments")
