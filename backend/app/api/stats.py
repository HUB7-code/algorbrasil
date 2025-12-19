from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User

router = APIRouter()

@router.get("/stats/public")
async def get_public_stats(db: Session = Depends(get_db)):
    """
    Retorna estatísticas públicas para exibir no site.
    """
    # Conta o número real de usuários na base
    count = db.query(User).count()
    
    return {
        "members_count": count
    }
from backend.app.models.ai_asset import AIAsset
from backend.app.models.risk import RiskRegister, RiskStatus
from backend.app.models.governance import GovernanceTrace

@router.get("/dashboard/overview")
async def get_dashboard_overview(db: Session = Depends(get_db)):
    """
    Agrega dados de todos os módulos para o Dashboard Principal (Command Center).
    """
    
    # 1. Active Models (AI Assets in Production)
    active_models = db.query(AIAsset).filter(AIAsset.status == "Production").count()
    
    # 2. Risks Summary
    total_risks = db.query(RiskRegister).count()
    critical_risks = db.query(RiskRegister).filter(RiskRegister.risk_level >= 15).count()
    high_risks = db.query(RiskRegister).filter(RiskRegister.risk_level >= 9, RiskRegister.risk_level < 15).count()
    
    # 3. Governance Activity (Traces today/total)
    # total_traces = db.query(GovernanceTrace).count()
    
    # 4. Mock Trust Score Algorithm (based on inverse of critical risks)
    # 100 - (Critical * 20) - (High * 5)
    trust_score = max(0, 100 - (critical_risks * 20) - (high_risks * 5))
    
    # 5. Growth Score (Mock for now, based on Assets)
    growth_score = min(100, active_models * 15)
    
    return {
        "kpis": {
            "trust_score": trust_score,
            "active_models": active_models,
            "growth_score": growth_score
        },
        "critical_alerts": critical_risks,
        "risks_summary": {
            "total": total_risks,
            "high": high_risks,
            "critical": critical_risks
        }
    }
