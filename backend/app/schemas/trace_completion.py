from pydantic import BaseModel
from typing import Optional

class TraceCompletionRequest(BaseModel):
    output_text: str
    metadata: Optional[dict] = None
    latency_ms: Optional[int] = None
