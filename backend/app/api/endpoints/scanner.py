from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from typing import List, Dict
from sqlalchemy.orm import Session
import json
import csv
import io
import re
import logging

from backend.app.schemas.scanner import ScanResult, Finding
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.api.auth import get_current_user

logger = logging.getLogger(__name__)

router = APIRouter()

# --- REGEX PATTERNS ---
CPF_PATTERN = r'\b\d{3}\.\d{3}\.\d{3}-\d{2}\b'
EMAIL_PATTERN = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
INJECTION_KEYWORDS = [
    "ignore previous instructions", "system prompt", "jailbreak", "DAN mode", 
    "desconsidere as instruções", "modo desenvolvedor", "fale como se fosse"
]

from backend.app.schemas.scanner import ScanResult, Finding, ScannerStats

@router.get("/stats", response_model=ScannerStats)
async def get_scanner_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Consolida métricas de todos os scans realizados para o Dashboard.
    """
    from backend.app.models.organization import Organization
    from backend.app.models.risk import RiskRegister, RiskStatus
    from sqlalchemy import func
    
    # 1. Identificar Organização
    owned_org = db.query(Organization).filter(Organization.owner_id == current_user.id).first()
    if not owned_org:
        # Fallback for mock/dev
        owned_org_id = 1
    else:
        owned_org_id = owned_org.id

    # 2. Agregação de Riscos (RiskRegister)
    risks_query = db.query(RiskRegister).filter(RiskRegister.organization_id == owned_org_id)
    all_risks = risks_query.all()
    
    # 3. Calcular Exposição Financeira (Simulado + Baseado em findings reais persistidos)
    # Nota: No MVP, o scanner.py persistiu 'estimated_fine' na 'description' ou similar? 
    # Melhor: recalcular baseado na severidade do registro de risco.
    total_exposure = 0.0
    legal_risk = 0.0
    operational_risk = 0.0
    
    for r in all_risks:
        fine = 0.0
        if r.risk_level >= 15: fine = 50000.0 # Critical
        elif r.risk_level >= 12: fine = 15000.0 # High
        elif r.risk_level >= 8: fine = 5000.0 # Medium
        
        total_exposure += fine
        if r.category == "LGPD":
            legal_risk += fine
        else:
            operational_risk += fine

    # 4. KPIs de Risco (Geral)
    critical_count = sum(1 for r in all_risks if r.risk_level >= 15)
    high_count = sum(1 for r in all_risks if r.risk_level >= 12 and r.risk_level < 15)
    penalty = (critical_count * 10) + (high_count * 5)
    risk_score = max(20, 100 - penalty)

    # 5. Dados Específicos por Categoria
    lgpd_risks = [r for r in all_risks if r.category == "LGPD"]
    sec_risks = [r for r in all_risks if r.category == "SEGURANCA"]
    halluc_risks = [r for r in all_risks if r.category == "ETICA"]

    lgpd_stats = {
        "exposurePercentage": min(100, len(lgpd_risks) * 5),
        "cpfCount": sum(1 for r in lgpd_risks if "CPF" in r.description),
        "geoCount": sum(1 for r in lgpd_risks if "geolocalização" in r.description),
        "relevantArticle": "LGPD Art. 5",
        "potentialFine": legal_risk,
        "severity": "high" if any(r.risk_level >= 12 for r in lgpd_risks) else "low"
    }

    sec_stats = {
        "blockedCount": sum(1 for r in sec_risks if r.status == RiskStatus.MITIGATED),
        "injectionAttempts": max(1, len(sec_risks)),
        "lastAttemptTime": "10 min atrás",
        "owaspReference": "OWASP LLM01",
        "severity": "medium" if any(r.risk_level >= 8 for r in sec_risks) else "low"
    }

    halluc_stats = {
        "lowConfidencePercentage": 12,
        "confirmedHallucinations": len(halluc_risks),
        "threshold": 0.85,
        "monthlyRiskCost": operational_risk * 0.2,
        "severity": "low"
    }

    # 6. Trend Data
    trend_data = [
        {"name": "Jan", "compliance": 45, "risks": 20},
        {"name": "Fev", "compliance": 52, "risks": 18},
        {"name": "Mar", "compliance": 48, "risks": 25},
        {"name": "Abr", "compliance": 61, "risks": 15},
        {"name": "Mai", "compliance": 72, "risks": 12},
    ]

    # 7. Data Breakdown Table Mapping
    table_data = []
    for i, r in enumerate(all_risks[:4]):
        risk_label = "Low"
        if r.risk_level >= 15: risk_label = "Excessive"
        elif r.risk_level >= 12: risk_label = "High"
        elif r.risk_level >= 8: risk_label = "Medium"
        
        table_data.append({
            "id": str(r.id),
            "source": r.affected_system or "System Data",
            "category": r.category,
            "risk": risk_label,
            "compliance": 100 - (r.risk_level * 4),
            "lastAudit": r.created_at.strftime("%d/%m/%Y")
        })

    # 8. Activity Feed Mapping (Real Governance Traces)
    from backend.app.models.governance import GovernanceRecord
    traces = db.query(GovernanceRecord).filter(
        GovernanceRecord.organization_id == owned_org_id
    ).order_by(GovernanceRecord.created_at.desc()).limit(5).all()

    activity_feed = []
    for t in traces:
        t_type = "audit"
        if t.verdict == "BLOCKED": t_type = "alert"
        elif t.verdict == "FLAGGED": t_type = "update"
        
        activity_feed.append({
            "id": str(t.id),
            "type": t_type,
            "text": f"Interação {t.verdict}: {t.Model_name or 'AI Asset'}",
            "time": t.created_at.strftime("%H:%M") + " hoje",
            "user": "Evidence Vault"
        })

    if not activity_feed:
        activity_feed = [
            { "id": "1", "type": "audit", "text": "Aguardando primeiras interações de IA...", "time": "agora" },
            { "id": "2", "type": "update", "text": "Políticas de Governança Sincronizadas", "time": "hoje" }
        ]

    return {
        "risk_score": risk_score,
        "previous_week_score": 68,
        "financial_summary": {
            "totalExposure": total_exposure,
            "mitigationSavings": total_exposure * 0.15,
            "legalRisk": legal_risk,
            "operationalRisk": operational_risk,
            "roiPercentage": 125.0
        },
        "lgpd_risk": lgpd_stats,
        "hallucination_risk": halluc_stats,
        "security_risk": sec_stats,
        "trend_data": trend_data,
        "data_breakdown": table_data or [
            {"id": "1", "source": "API Gateway", "category": "Security", "risk": "Low", "compliance": 95, "lastAudit": "hoje"},
        ],
        "action_items": [
           {"id": "1", "text": "Revisar política de retenção de dados", "priority": "high", "status": "pending", "timeEstimate": "2h"},
           {"id": "2", "text": "Implementar sanitização de prompt no Lab Alpha", "priority": "medium", "status": "completed", "timeEstimate": "1h"},
        ],
        "recent_activity": activity_feed
    }

@router.post("/upload", response_model=ScanResult)
async def scan_upload(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint Autenticado para Scanner (Persona A - Demo)
    Consome 1 crédito por uso. Retorna 402 se sem créditos.
    Aceita arquivos CSV ou JSON. Limite de 100 linhas processadas.
    """
    from backend.app.services.analysis_engine import AnalysisEngine
    from backend.app.models.organization import organization_members, Organization
    
    # 0. Verificar Créditos (Persona A Logic)
    # Busca a organização qual o user é DONO
    # Nota: Para multi-tenancy completo, implementar seleção de organização via header X-Organization-Id
    owned_org = db.query(Organization).filter(Organization.owner_id == current_user.id).first()
    
    if not owned_org:
        # Se não tem organização (ex: convidado), verifica se é membro de alguma com créditos (MVP simplificado: block)
         raise HTTPException(status_code=403, detail="Você precisa ser dono de uma conta para usar o Scanner.")
         
    if owned_org.plan_tier != 'enterprise' and (owned_org.credits_balance is None or owned_org.credits_balance <= 0):
        raise HTTPException(
            status_code=402, # Payment Required
            detail="Seus créditos de demonstração acabaram. Atualize para o plano Enterprise."
        )

    # 1. Validar Tipo e Ler Conteúdo
    content_type = file.content_type
    filename = file.filename.lower()
    
    rows: List[str] = []
    
    try:
        content = await file.read()
        text_content = content.decode('utf-8')
        
        if filename.endswith('.json') or 'json' in content_type:
            data = json.loads(text_content)
            if isinstance(data, list):
                # Extrair strings de objetos
                for item in data:
                    rows.append(json.dumps(item))
            elif isinstance(data, dict):
                 rows.append(json.dumps(data))
                 
        elif filename.endswith('.csv') or 'csv' in content_type:
             csv_file = io.StringIO(text_content)
             reader = csv.reader(csv_file)
             for row in reader:
                 rows.append(" ".join(row))
        else:
             # Tenta tratar como texto plano/linhas
             rows = text_content.splitlines()
             
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar arquivo: {str(e)}")

    # 2. Limitar & Debitar (Se sucesso garantido na leitura)
    # Debita 1 crédito
    if owned_org.plan_tier != 'enterprise':
        owned_org.credits_balance -= 1
        db.commit() # Salva o débito antes de processar pesado

    # Limite Rows
    total_received = len(rows)
    if len(rows) > 100:
        rows = rows[:100]
        
    # 3. Analisar (Using Shared Engine)
    findings: List[Finding] = []
    lgpd_hits = 0
    security_hits = 0
    
    for idx, row_text in enumerate(rows):
        analysis = AnalysisEngine.analyze_text(row_text)
        
        # A. Process PII
        if analysis["pii_detected"]:
            for item in analysis["pii_details"]:
                findings.append(Finding(
                    category="LGPD",
                    severity=item["severity"],
                    description=f"{item['type']} detectado: {item['value'][:4]}...",
                    regulatory_ref="LGPD Art. 5 (PII)",
                    # Fine calc mult (simulation)
                    estimated_fine=50000.0 if item['severity'] == "CRITICAL" else 1000.0,
                    row_index=idx
                ))
                lgpd_hits += 1

        # B. Process Injection
        if analysis["injection_detected"]:
             for item in analysis["injection_details"]:
                 findings.append(Finding(
                    category="SEGURANCA",
                    severity=item["severity"],
                    description=f"Padrão de Prompt Injection: '{item['term']}'",
                    regulatory_ref="OWASP LLM01",
                    estimated_fine=0.0,
                    row_index=idx
                ))
                 security_hits += 1
                 
    # 4. Calcular Scores
    # 100 base, penalize log
    lgpd_score = max(0.0, 100.0 - (lgpd_hits * 15))
    owasp_score = max(0.0, 100.0 - (security_hits * 25))
    
    # Operational Heuristic: If extremely short or empty, low operational quality
    operational_score = 100.0
    empty_lines = sum(1 for r in rows if len(r.strip()) < 5)
    if len(rows) > 0:
        operational_score -= (empty_lines / len(rows)) * 50
    
    # --- PERSISTENCE LAYER (BRIDGE TO DASHBOARD) ---
    # Persist HIGH/CRITICAL findings to Risk Register so Dashboard updates
    try:
        from backend.app.models.risk import RiskRegister, RiskStatus, RiskStrategy
        
        for finding in findings:
            if finding.severity in ["HIGH", "CRITICAL"]:
                # Check for duplicate risk to avoid spamming DB on repeated scans
                # Simple dedup based on description signature
                existing = db.query(RiskRegister).filter(
                    RiskRegister.organization_id == owned_org.id,
                    RiskRegister.description == finding.description
                ).first()
                
                if not existing:
                    new_risk = RiskRegister(
                        user_id=current_user.id,
                        organization_id=owned_org.id,
                        category=finding.category,
                        description=finding.description,
                        affected_system=f"File: {filename}",
                        probability=3 if finding.severity == "HIGH" else 5,
                        impact=4 if finding.severity == "HIGH" else 5,
                        risk_level=12 if finding.severity == "HIGH" else 25, # Simple calc
                        strategy=RiskStrategy.MITIGATE,
                        status=RiskStatus.OPEN
                    )
                    db.add(new_risk)
        
        db.commit()
    except Exception as e:
        logger.warning(f"Failed to persist risks to dashboard: {e}")
        # Dont block response if persistence fails
    
    return ScanResult(
        total_rows=total_received,
        risks_found=len(findings),
        lgpd_score=round(lgpd_score, 1),
        operational_score=round(operational_score, 1),
        owasp_score=round(owasp_score, 1),
        findings=findings
    )
