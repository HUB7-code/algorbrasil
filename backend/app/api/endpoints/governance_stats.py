from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Dict

from backend.app.db.session import get_db
from backend.app.models.governance import GovernanceTrace

router = APIRouter()

@router.get("/dashboard-stats")
def get_growth_hub_stats(
    organization_id: int, 
    db: Session = Depends(get_db)
):
    """
    Calcula KPIs reais de Governança e Growth baseados no 'Evidence Vault'.
    """
    
    # 1. Total de Sessões Seguras (Total de Logs)
    total_sessions = db.query(func.count(GovernanceTrace.id))\
        .filter(GovernanceTrace.organization_id == organization_id)\
        .scalar() or 0
        
    # 2. Bloqueios Éticos (Risk Mitigation)
    blocked_count = db.query(func.count(GovernanceTrace.id))\
        .filter(GovernanceTrace.organization_id == organization_id)\
        .filter(GovernanceTrace.verdict == "BLOCKED")\
        .scalar() or 0
        
    # 3. Cálculo de CICR (Simulado base de logs)
    # Na v2.0, isso virá de integração com CRM. Por enquanto, assumimos 
    # que sessões "ALLOWED" com risk < 0.1 convertem melhor.
    high_quality_interactions = db.query(func.count(GovernanceTrace.id))\
        .filter(GovernanceTrace.organization_id == organization_id)\
        .filter(GovernanceTrace.verdict == "ALLOWED")\
        .filter(GovernanceTrace.risk_score < 0.1)\
        .scalar() or 0
    
    conversion_rate = 0.0
    if total_sessions > 0:
        conversion_rate = (high_quality_interactions / total_sessions) * 100
        
    # 4. Multas Mitigadas (Estimativa Financeira)
    # Assumindo Ticket Médio de Multa LGPD pequena = R$ 50.000 por incidente evitado
    money_saved = blocked_count * 50000 
    
    return {
        "kpis": {
            "cicr": {
                "value": f"{conversion_rate:.1f}%",
                "delta": "Baseado em logs",
                "isPositive": True
            },
            "risk_mitigation": {
                "value": f"R$ {money_saved/1000000:.1f}M", # Exibe em Milhões
                "delta": f"{blocked_count} Incidentes Bloqueados",
                "isPositive": True
            },
            "audit_readiness": {
                "value": "92%", # Hardcoded por enquanto (depende do módulo Assessments)
                "delta": "Audit Ready",
                "isPositive": True
            },
            "secure_sessions": {
                "value": str(total_sessions),
                "delta": "Total Monitorado",
                "isPositive": True
            }
        }
    }

@router.get("/recent-logs")
def get_recent_logs(
    organization_id: int, 
    limit: int = 5,
    db: Session = Depends(get_db)
):
    """
    Retorna os últimos logs para a tabela 'Live Trace'.
    """
    logs = db.query(GovernanceTrace)\
        .filter(GovernanceTrace.organization_id == organization_id)\
        .order_by(GovernanceTrace.created_at.desc())\
        .limit(limit)\
        .all()
        
    return logs
