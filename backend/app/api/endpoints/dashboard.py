from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
from backend.app.models.ai_asset import AIAsset
from backend.app.models.risk import RiskRegister
from backend.app.models.project import Project

router = APIRouter()

@router.get("/overview")
async def get_dashboard_overview(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retorna KPI consolidados para o Dashboard CoE.
    Filtra por Organization se o usuário pertencer a uma.
    """
    
    # Base query filters (TODO: Multi-tenant filtering based on organization_id)
    # 1. Ativos de IA (Inventory)
    total_assets = db.query(AIAsset).count()
    
    # 2. Riscos Ativos
    # Contagem de riscos por nível (Logica: Critical >= 15, High > 8)
    total_risks = db.query(RiskRegister).count()
    critical_risks = db.query(RiskRegister).filter(RiskRegister.risk_level >= 15).count()
    high_risks = db.query(RiskRegister).filter(RiskRegister.risk_level > 8, RiskRegister.risk_level < 15).count()
    
    # 3. Projetos em Andamento
    active_projects = db.query(Project).filter(Project.status == "In Progress").count()
    
    # 4. Cálculo de Scores (Mockado com lógica básica por enquanto)
    # Growth Score: Baseado em projetos ativos + ativos implementados
    growth_score = min(100, (active_projects * 10) + (total_assets * 5) + 50)
    
    # AI Trust Score: Começa em 100 e perde pontos por riscos
    trust_score = 100 - (critical_risks * 20) - (high_risks * 5)
    trust_score = max(0, trust_score) # Não pode ser negativo

    return {
        "kpis": {
            "growth_score": int(growth_score),
            "trust_score": int(trust_score), # Compliance Readiness
            "active_models": total_assets,
            "data_events": 8920, # Mockado (hard to track real events without event bus)
        },
        "critical_alerts": critical_risks,
        "active_projects_count": active_projects,
        "risks_summary": {
            "total": total_risks,
            "critical": critical_risks,
            "high": high_risks
        }
    }
