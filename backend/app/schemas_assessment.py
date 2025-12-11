from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime

# Schema para Criação de Assessment (Answers)
class AssessmentCreate(BaseModel):
    title: str = "Avaliação Inicial de Maturidade"
    answers: Dict[str, Any] # Flexível: {"q1": "yes", "section_A": 10}

# Schema para Atualização (se necessário)
class AssessmentUpdate(BaseModel):
    status: Optional[str] = None # 'completed'
    answers: Optional[Dict[str, Any]] = None

# Schema de Resposta (O que o Front recebe)
class AssessmentResponse(BaseModel):
    id: int
    user_id: int
    title: str
    status: str
    score_total: int
    answers_payload: Dict[str, Any]
    report_summary: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
