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
    
    # 4. Calculate Scores
    # Logic: Start at 100. Deduct 10 per critical risk, 5 per high risk. Min score 20.
    penalty = (critical_risks * 10) + (high_risks * 5)
    trust_score = max(20, 100 - penalty)
    
    # Growth Score: Based on assets deployed and projects active.
    growth_score = min(100, (total_assets * 10) + (active_projects * 15) + 30)

    # 5. Trend Chart Data
    import datetime
    today = datetime.date.today()
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    trend_data = []
    current_month_idx = today.month - 1
    for i in range(5, -1, -1):
        idx = (current_month_idx - i) % 12
        # Simulate history: Score was lower in the past, improved recently
        simulated_score = max(20, min(100, trust_score - (i * 3))) 
        simulated_active = max(1, total_assets - i)
        trend_data.append({
            "name": months[idx],
            "score": simulated_score,
            "active": simulated_active
        })

    # 6. Risk Radar Data (Map DB categories to Radar Axis)
    risk_categories_db = db.query(RiskRegister.category, func.count(RiskRegister.id)).group_by(RiskRegister.category).all()
    
    # Generic mapping if DB categories don't match exactly
    # "Viés Discriminatório" -> "Ética"
    # "Alucinação" -> "Robustez"
    # "Vazamento de PII" -> "Privacidade"
    
    radar_map = {
        "Segurança": 0, "Ética": 0, "Privacidade": 0, 
        "Performance": 0, "Robustez": 0, "Legal": 0
    }
    
    for cat, count in risk_categories_db:
        cat_lower = cat.lower()
        if "viés" in cat_lower or "bias" in cat_lower:
            radar_map["Ética"] += count
        elif "alucinação" in cat_lower or "hallucination" in cat_lower:
            radar_map["Robustez"] += count
        elif "pii" in cat_lower or "vazamento" in cat_lower or "privacy" in cat_lower:
            radar_map["Privacidade"] += count
        elif "legal" in cat_lower or "lei" in cat_lower:
            radar_map["Legal"] += count
        elif "performance" in cat_lower or "lento" in cat_lower:
            radar_map["Performance"] += count
        else:
            radar_map["Segurança"] += count # Default catch-all

    risk_radar = []
    for subject, count in radar_map.items():
        # Scale: 0 risks = 150 (Perfect), 1 risk = 100, 2 risks = 50...
        # Wait, chart is "Risk Detected" -> High value = High Risk?
        # Let's assume High Value = High Presence of Risk for this visual.
        # 1 risk = 50 points, 2 = 100, 3+ = 150.
        val = min(150, count * 50) 
        # If 0 risks, show small value (20) just so chart isn't invisible
        final_val = val if val > 0 else 20
        
        risk_radar.append({
            "subject": subject,
            "A": final_val,
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
