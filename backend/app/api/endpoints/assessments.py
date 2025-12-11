from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.db.session import get_db
from backend.app.models.assessment import Assessment
from backend.app.models.user import User
from backend.app.schemas_assessment import AssessmentCreate, AssessmentResponse
from backend.app.api.auth import get_current_user

router = APIRouter()

# --- Lógica de Negócio Simples (Mock do "AI Engine") ---
def calculate_score(answers: dict) -> int:
    """
    Calcula um score de 0 a 100 baseado em respostas simples.
    Espera formato: {"q1": "yes", "q2": "no", ...}
    """
    score = 0
    total_questions = len(answers)
    if total_questions == 0:
        return 0
    
    for key, value in answers.items():
        # Lógica básica: "yes" ou "sim" ou true vale ponto
        if str(value).lower() in ["yes", "sim", "true", "high"]:
            score += 1
            
    # Normaliza para 0-100
    final_score = int((score / total_questions) * 100)
    return final_score

def generate_report(score: int) -> str:
    if score < 30:
        return "Nível 1 (Inicial): Sua organização possui riscos não mapeados. Requer ação imediata."
    elif score < 70:
        return "Nível 3 (Definido): Processos existem mas faltam controles automatizados."
    else:
        return "Nível 5 (Otimizado): Parabéns, você está próximo da conformidade ISO 42001."

# --- Rotas ---

@router.post("/", response_model=AssessmentResponse)
def create_assessment(
    assessment_in: AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Cria um novo diagnóstico de maturidade.
    Calcula o score automaticamente baseado nas respostas JSON.
    """
    # 1. Calcular Score (Simulação de AI)
    calculated_score = calculate_score(assessment_in.answers)
    report = generate_report(calculated_score)
    
    # 2. Criar Objeto
    db_assessment = Assessment(
        user_id=current_user.id,
        title=assessment_in.title,
        status="completed", # Por enquanto, assume que vem completo
        answers_payload=assessment_in.answers,
        score_total=calculated_score,
        report_summary=report
    )
    
    # 3. Salvar
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    
    return db_assessment

@router.get("/", response_model=List[AssessmentResponse])
def read_assessments(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista todos os diagnósticos do usuário logado.
    """
    assessments = db.query(Assessment).filter(Assessment.user_id == current_user.id).offset(skip).limit(limit).all()
    return assessments

@router.get("/{assessment_id}", response_model=AssessmentResponse)
def read_assessment_detail(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Obtém detalhes de um diagnóstico específico.
    """
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id, Assessment.user_id == current_user.id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")
    return assessment
