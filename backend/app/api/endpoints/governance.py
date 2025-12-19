from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
import hashlib

from backend.app.db.session import get_db
from backend.app.models.governance import GovernanceTrace
from backend.app.schemas.governance import GuardrailRequest, GuardrailResponse

router = APIRouter()

def generate_hash(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()

@router.post("/guardrail", response_model=GuardrailResponse)
def check_compliance_guardrail(
    request: GuardrailRequest,
    db: Session = Depends(get_db)
    # TODO: Adicionar dependência de Auth (JWT) na Fase de Segurança
):
    """
    ETHICAL GUARDRAIL (Middleware):
    Intercepta inputs, gera evidência auditável e retorna veredito.
    """
    
    # 1. Gerar Trace ID Único
    trace_uuid = str(uuid.uuid4())
    
    # 2. Dynamic Policy Engine
    # Fetch active policy and rules for the organization
    from backend.app.models.governance import GovernancePolicy, GovernanceRule
    
    # Busca política ativa (se houver) ou usa default
    policy = db.query(GovernancePolicy).filter(
        GovernancePolicy.organization_id == request.organization_id,
        GovernancePolicy.is_active == True
    ).order_by(GovernancePolicy.version.desc()).first()
    
    # Default State
    risk_score = 0.0
    verdict = "ALLOWED"
    pii_found = False
    policy_name = "default-implicit"
    violation_details = []
    
    if policy:
        policy_name = f"{policy.name} ({policy.version})"
        # Iterate Rules
        for rule in policy.rules:
            if not rule.is_active: continue
            
            triggered = False
            
            # A. Keyword Matching
            if rule.rule_type == "keyword_precise":
                if rule.content.lower() in request.prompt_text.lower().split():
                     triggered = True
            elif rule.rule_type == "keyword_fuzzy":
                 if rule.content.lower() in request.prompt_text.lower():
                     triggered = True
            
            # TODO: Add Regex and PII Classifier logic here in next iterations
            
            if triggered:
                violation_details.append(f"Regra violada: {rule.content} ({rule.severity})")
                
                # Update Risk Score
                if rule.severity == "CRITICAL" or rule.severity == "HIGH":
                    risk_score = 0.95
                    verdict = "BLOCKED"
                elif rule.severity == "MEDIUM":
                    risk_score = max(risk_score, 0.5)
                    if verdict != "BLOCKED": verdict = "FLAGGED"
                else: 
                     risk_score = max(risk_score, 0.2)
                
                # Check specifics
                if "pii" in rule.rule_type or "cpf" in rule.content or "password" in rule.content:
                    pii_found = True
                    
                # Break on BLOCK to save processing? For audit, maybe finding all is better.
                # Let's simple break for now if blocked.
                if verdict == "BLOCKED":
                    break
    
    # Fallback Hardcoded (Para testes sem configurar política)
    else:
        # Regra simples de teste legado
        if "senha" in request.prompt_text.lower() or "password" in request.prompt_text.lower():
            risk_score = 0.9
            verdict = "BLOCKED"
            pii_found = True
            policy_name = "legacy-fallback"

    # 3. Registrar no Evidence Vault (Imutabilidade)
    trace_entry = GovernanceTrace(
        trace_id=trace_uuid,
        organization_id=request.organization_id,
        project_id=request.project_id,
        ai_asset_id=request.ai_asset_id,
        
        input_hash=generate_hash(request.prompt_text),
        output_hash=None, # Será preenchido no callback de resposta (Fase 2)
        
        verdict=verdict,
        policy_version=policy_name,
        risk_score=risk_score,
        pii_detected=pii_found,
        topics_flagged=violation_details, # Novo campo JSON
        Model_name=request.model_name
    )
    
    db.add(trace_entry)
    db.commit()
    db.refresh(trace_entry)
    
    return GuardrailResponse(
        trace_id=trace_uuid,
        verdict=verdict,
        risk_score=risk_score,
        pii_detected=pii_found,
        audit_log_ref=f"/audit/trace/{trace_uuid}"
    )

# --- POLICY MANAGEMENT ENDPOINTS ---

from pydantic import BaseModel
class RuleCreate(BaseModel):
    rule_type: str # keyword_precise, keyword_fuzzy
    content: str
    action: str = "BLOCK"
    severity: str = "HIGH"

class PolicyCreate(BaseModel):
    organization_id: int
    name: str
    description: str = None

@router.post("/policies")
def create_policy(policy: PolicyCreate, db: Session = Depends(get_db)):
    from backend.app.models.governance import GovernancePolicy
    
    # Check existing policy name for org
    existing = db.query(GovernancePolicy).filter(
        GovernancePolicy.organization_id == policy.organization_id,
        GovernancePolicy.name == policy.name
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Policy with this name already exists")
        
    new_policy = GovernancePolicy(
        organization_id=policy.organization_id,
        name=policy.name,
        description=policy.description,
        version="1.0"
    )
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    return {"id": new_policy.id, "name": new_policy.name, "status": "created"}

@router.post("/policies/{policy_id}/rules")
def add_rule_to_policy(policy_id: int, rule: RuleCreate, db: Session = Depends(get_db)):
    from backend.app.models.governance import GovernancePolicy, GovernanceRule
    
    policy = db.query(GovernancePolicy).filter(GovernancePolicy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    new_rule = GovernanceRule(
        policy_id=policy_id,
        rule_type=rule.rule_type,
        content=rule.content,
        action=rule.action,
        severity=rule.severity
    )
    db.add(new_rule)
    db.commit()
    return {"id": new_rule.id, "content": new_rule.content, "action": new_rule.action}

@router.get("/policies")
def list_policies(organization_id: int, db: Session = Depends(get_db)):
    from backend.app.models.governance import GovernancePolicy
    
    policies = db.query(GovernancePolicy).filter(
        GovernancePolicy.organization_id == organization_id
    ).all()
    
    # Simple serialization
    return [
        {
            "id": p.id,
            "name": p.name,
            "version": p.version,
            "is_active": p.is_active,
            "rules_count": len(p.rules)
        }
        for p in policies
    ]
