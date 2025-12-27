from sqlalchemy import Column, Integer, String
from backend.app.db.session import Base

# Model temporário para migração
class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(Integer, primary_key=True)
    plan_tier = Column(String, default="free") # free, enterprise
    credits_balance = Column(Integer, default=3) # 3 Créditos iniciais para Demo
