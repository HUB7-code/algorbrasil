
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Enums para validação
class RiskStrategy(str, Enum):
    MITIGATE = "Mitigar"
    ACCEPT = "Aceitar"
    TRANSFER = "Transferir"
    AVOID = "Evitar"

class RiskStatus(str, Enum):
    OPEN = "Aberto"
    IN_PROGRESS = "Em Tratamento"
    MITIGATED = "Mitigado"
    RESIDUAL = "Risco Residual Aceito"

# Base
class RiskBase(BaseModel):
    category: str = Field(..., example="Viés Algorítmico")
    description: str = Field(..., example="O modelo apresenta viés de gênero em análises de crédito.")
    affected_system: Optional[str] = Field(None, example="CreditScoreModel v2.1")
    probability: int = Field(..., ge=1, le=5, description="1 a 5")
    impact: int = Field(..., ge=1, le=5, description="1 a 5")
    strategy: RiskStrategy = RiskStrategy.MITIGATE
    mitigation_plan: Optional[str] = Field(None, example="Re-treinar com dataset balanceado.")
    owner: Optional[str] = Field(None, example="Equipe de Data Science")

class RiskCreate(RiskBase):
    pass

class RiskUpdate(BaseModel):
    category: Optional[str] = None
    description: Optional[str] = None
    probability: Optional[int] = None
    impact: Optional[int] = None
    strategy: Optional[RiskStrategy] = None
    mitigation_plan: Optional[str] = None
    status: Optional[RiskStatus] = None

class RiskResponse(RiskBase):
    id: int
    user_id: int
    risk_level: int # Calculado no backend
    status: RiskStatus
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
