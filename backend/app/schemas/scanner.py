from pydantic import BaseModel
from typing import List, Optional

class Finding(BaseModel):
    category: str # LGPD, SECURITY, HALLUCINATION
    severity: str # CRITICAL, HIGH, MEDIUM, LOW
    description: str
    regulatory_ref: str
    estimated_fine: float
    row_index: Optional[int] = None

class ScanResult(BaseModel):
    total_rows: int
    risks_found: int
    lgpd_score: float # 0-100
    operational_score: float # 0-100
    owasp_score: float # 0-100
    findings: List[Finding]
