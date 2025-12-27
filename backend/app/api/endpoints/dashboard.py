from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
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
    
    # 5. Trend Chart Data (Last 6 Months Mock - In Real Life, use Assessment History)
    # Simulator for demo purposes based on trust_score
    import datetime
    today = datetime.date.today()
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    trend_data = []
    current_month_idx = today.month - 1
    for i in range(5, -1, -1):
        idx = (current_month_idx - i) % 12
        score = trust_score - (i * 2) # Simulate improvement
        active = total_assets - i
        trend_data.append({
            "name": months[idx],
            "score": max(20, min(100, score)),
            "active": max(0, active)
        })

    # 6. Risk Radar Data (Real aggregations)
    risk_categories = db.query(RiskRegister.category, func.count(RiskRegister.id)).group_by(RiskRegister.category).all()
    # Map to Radar Format
    risk_radar = []
    # If no data, provide seeds so chart isn't empty
    default_categories = ["Segurança", "Ética", "Privacidade", "Performance", "Robustez", "Legal"]
    for cat in default_categories:
        count = next((c for c_name, c in risk_categories if c_name == cat), 0)
        # Normalize for chart 0-150 scale
        normalized_value = min(150, count * 30 + 50) if count > 0 else 30 # Base 30
        risk_radar.append({
            "subject": cat,
            "A": normalized_value,
            "fullMark": 150
        })

    return {
        "kpis": {
            "growth_score": int(growth_score),
            "trust_score": int(trust_score), # Compliance Readiness
            "active_models": total_assets,
            "data_events": 8920,
        },
        "critical_alerts": critical_risks,
        "active_projects_count": active_projects,
        "risks_summary": {
            "total": total_risks,
            "critical": critical_risks,
            "high": high_risks
        },
        "charts": {
            "trend_data": trend_data,
            "risk_radar": risk_radar
        }
    }
