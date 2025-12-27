
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime

from backend.app.db.session import get_db
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
from backend.app.models.organization import Organization, organization_members
from backend.app.models.risk import RiskRegister, RiskStatus
from backend.app.models.assessment import Assessment

router = APIRouter()

# --- SCHEMAS ---
from pydantic import BaseModel

class RiskSummary(BaseModel):
    total_risks: int
    high_risks: int
    mitigated_risks: int
    top_risks: List[dict]

class ComplianceSummary(BaseModel):
    last_assessment_date: Optional[datetime]
    maturity_score: int
    status: str

class ReportISO42001(BaseModel):
    organization_name: str
    generated_at: datetime
    consultant_name: str
    risk_summary: RiskSummary
    compliance_summary: ComplianceSummary
    executive_summary: str

# --- ENDPOINTS ---

@router.get("/reports/iso42001/{organization_id}", response_model=ReportISO42001)
async def generate_iso42001_report(
    organization_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Gera os dados para o Relatório 'Smart Report ISO 42001'.
    Agrega dados de Riscos e Auditorias da Organização.
    """
    
    # 1. Validação de Acesso (Multi-Tenant Guard)
    # Verifica se o usuario é membro da organização
    membership = db.query(organization_members).filter(
        organization_members.c.user_id == current_user.id,
        organization_members.c.organization_id == organization_id
    ).first()
    
    if not membership:
         raise HTTPException(status_code=403, detail="Acesso negado a esta organização.")

    org = db.query(Organization).filter(Organization.id == organization_id).first()
    if not org:
        raise HTTPException(status_code=404, detail="Organização não encontrada.")

    # 2. Agregação de Riscos
    risks_query = db.query(RiskRegister).filter(RiskRegister.organization_id == organization_id)
    all_risks = risks_query.all()
    
    total = len(all_risks)
    high = sum(1 for r in all_risks if r.risk_level >= 15) # Assuming 15+ is High (5x3, 4x4, 5x4...)
    mitigated = sum(1 for r in all_risks if r.status == RiskStatus.MITIGATED)
    
    # Top 5 Riscos Críticos
    top_risks_objs = risks_query.order_by(RiskRegister.risk_level.desc()).limit(5).all()
    top_risks_data = [
        {
            "category": r.category,
            "description": r.description,
            "level": r.risk_level,
            "status": r.status
        } 
        for r in top_risks_objs
    ]

    # 3. Agregação de Compliance (Assessment)
    last_assessment = db.query(Assessment).filter(
        Assessment.organization_id == organization_id
    ).order_by(Assessment.created_at.desc()).first()
    
    if last_assessment:
        comp_date = last_assessment.created_at
        comp_score = last_assessment.score_total
        comp_status = last_assessment.status
    else:
        comp_date = None
        comp_score = 0
        comp_status = "N/A"

    # 4. Geração do Resumo Executivo (Simulação de IA)
    # Num cenário real, passaríamos esses dados para um LLM gerar o texto.
    # Aqui faremos um rule-based para o MVP.
    summary = f"A organização {org.name} apresenta um nível de maturidade de {comp_score}/100. "
    if high > 0:
        summary += f"Foram identificados {high} riscos críticos que requerem atenção imediata, principalmente nas áreas de {[r['category'] for r in top_risks_data[:2]]}. "
    else:
        summary += "O perfil de risco está controlado, sem apontamentos críticos pendentes. "
        
    if comp_score < 50:
        summary += "Recomenda-se priorizar a implementação dos controles fundamentais do Anexo A."
    elif comp_score < 80:
        summary += "A organização está no caminho certo, mas precisa refinar a documentação de processos."
    else:
        summary += "Excelente estado de conformidade, pronta para auditoria de certificação."

    return ReportISO42001(
        organization_name=org.name,
        generated_at=datetime.utcnow(),
        consultant_name=current_user.full_name,
        risk_summary=RiskSummary(
            total_risks=total,
            high_risks=high,
            mitigated_risks=mitigated,
            top_risks=top_risks_data
        ),
        compliance_summary=ComplianceSummary(
            last_assessment_date=comp_date,
            maturity_score=comp_score,
            status=comp_status
        ),
        executive_summary=summary
    )
