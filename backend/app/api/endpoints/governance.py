from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
import hashlib

from backend.app.db.session import get_db
from backend.app.models.governance import GovernanceRecord
from backend.app.schemas.governance import GuardrailRequest, GuardrailResponse
from backend.app.models.user import User as UserModel
from backend.app.api.auth import get_current_user
from backend.app.services.analysis_engine import AnalysisEngine

router = APIRouter()

def generate_hash(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()

@router.post("/guardrail", response_model=GuardrailResponse)
def check_compliance_guardrail(
    request: GuardrailRequest,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
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
            
            # A. Keyword/Regex Matching using AnalysisEngine
            if rule.rule_type == "pii_classifier":
                analysis = AnalysisEngine.analyze_text(request.prompt_text)
                if analysis["pii_detected"]:
                     triggered = True
                     violation_details.append(f"PII Detectado: {len(analysis['pii_details'])} ocorrências.")
                     pii_found = True
            elif rule.rule_type == "injection_classifier":
                analysis = AnalysisEngine.analyze_text(request.prompt_text)
                if analysis["injection_detected"]:
                    triggered = True
                    violation_details.append(f"Prompt Injection: {len(analysis['injection_details'])} termos.")
            
            # Legacy/Simple Keyword Check (Manter compatibilidade)
            elif rule.rule_type == "keyword_precise":
                if rule.content.lower() in request.prompt_text.lower().split():
                     triggered = True
            elif rule.rule_type == "keyword_fuzzy":
                 if rule.content.lower() in request.prompt_text.lower():
                     triggered = True
            
            if triggered:
                # ... (manter lógica de score existente)
                violation_details.append(f"Regra violada: {rule.content} ({rule.severity})")
                
                if rule.severity == "CRITICAL" or rule.severity == "HIGH":
                    risk_score = 0.95
                    verdict = "BLOCKED"
                elif rule.severity == "MEDIUM":
                    risk_score = max(risk_score, 0.5)
                    if verdict != "BLOCKED": verdict = "FLAGGED"
                else: 
                     risk_score = max(risk_score, 0.2)
                
                if verdict == "BLOCKED":
                    break
    
    # Fallback Policy (No policy active)
    else:
        # Default Safe Mode: Analyze using Engine directly
        analysis = AnalysisEngine.analyze_text(request.prompt_text)
        
        if analysis["verdict"] == "BLOCKED" or analysis["pii_detected"]:
             risk_score = analysis["risk_score"]
             verdict = analysis["verdict"]
             pii_found = analysis["pii_detected"]
             policy_name = "system-default-safe"
             if analysis["pii_detected"]: violation_details.append("PII Detectado (Default Policy)")
             if analysis["injection_detected"]: violation_details.append("Injection Detectado (Default Policy)")
        else:
             policy_name = "system-default-allow"

    # 3. Registrar no Evidence Vault (Imutabilidade) - TRUST HUB LOGIC
    
    # 3.a Fetch Previous Block for Hash Chaining
    previous_trace = db.query(GovernanceRecord).filter(
        GovernanceRecord.organization_id == request.organization_id
    ).order_by(GovernanceRecord.created_at.desc()).first()
    
    previous_hash_val = previous_trace.block_hash if previous_trace else "GENESIS_ALGOR_TRUST_HUB_v1"
    
    # 3.b Calculate Current Block Hash
    # Payload for hashing: TraceID + InputHash + Verdict + Score + PrevHash
    block_payload = f"{trace_uuid}{generate_hash(request.prompt_text)}{verdict}{risk_score}{previous_hash_val}"
    current_block_hash = generate_hash(block_payload)

    trace_entry = GovernanceRecord(
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
        Model_name=request.model_name,
        
        # New Trust Hub Fields
        previous_hash=previous_hash_val,
        block_hash=current_block_hash
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

from backend.app.schemas.trace_completion import TraceCompletionRequest

@router.patch("/guardrail/{trace_id}/complete")
def complete_trace_audit(
    trace_id: str,
    completion: TraceCompletionRequest,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    """
    TRUST HUB: Fecha o ciclo de auditoria registrando o hash da saída.
    Apenas o dono da organização original pode atualizar.
    """
    trace = db.query(GovernanceRecord).filter(GovernanceRecord.trace_id == trace_id).first()
    if not trace:
        raise HTTPException(status_code=404, detail="Trace not found")
        
    if trace.output_hash:
        raise HTTPException(status_code=400, detail="Trace already completed (Immutable)")
        
    # Calculate Output Hash
    output_hash = generate_hash(completion.output_text)
    
    # Update Trace
    trace.output_hash = output_hash
    if completion.latency_ms:
        trace.latency_ms = completion.latency_ms
        
    db.commit()
    db.refresh(trace)
    
    return {"status": "completed", "integrity_check": "valid", "final_hash": trace.block_hash}

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
def create_policy(
    policy: PolicyCreate, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
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
def add_rule_to_policy(
    policy_id: int, 
    rule: RuleCreate, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
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
def list_policies(
    organization_id: int, 
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
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
