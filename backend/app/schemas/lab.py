from pydantic import BaseModel
from typing import List, Optional

class XAIAuditResult(BaseModel):
    score: int
    risk_level: str  # CRITICAL, HIGH, MODERATE, LOW
    verdict: str
    transparency_metrics: dict  # Detalhes técnicos (ex: entropia, n_features)
    detected_explainability_methods: List[str]  # ex: ['SHAP', 'LIME']
    missing_critical_components: List[str]  # ex: ['Confidence Intervals']
    columns_sample: List[str]  # Para mostrar na UI o que foi lido
    processing_time_ms: float
