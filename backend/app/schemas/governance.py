from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime

# --- REQUEST ---
class GuardrailRequest(BaseModel):
    organization_id: int
    project_id: Optional[int] = None
    ai_asset_id: Optional[int] = None
    
    # Payload da IA
    prompt_text: str
    metadata: Optional[dict] = None
    model_name: Optional[str] = "unknown"

# --- RESPONSE ---
class GuardrailResponse(BaseModel):
    trace_id: str
    verdict: str # ALLOWED, FLAGGED, BLOCKED
    risk_score: float
    
    pii_detected: bool
    filtered_output: Optional[str] = None # Texto sanitizado (se necessário)
    
    audit_log_ref: str # Link para evidência no Vault

class GovernanceTraceRead(BaseModel):
    id: int
    trace_id: str
    verdict: str
    risk_score: float
    pii_detected: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
