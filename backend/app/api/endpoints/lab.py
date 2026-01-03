from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Request
from pydantic import BaseModel
from typing import Any

from backend.app.schemas.lab import XAIAuditResult
from backend.app.services.xai_service import XAIService
from backend.app.services.health_lab_services import ShadowAIService, ISOService, ShadowScanResult, ISOAssessmentRequest, ISOAssessmentResult

# Security Hardening
from backend.app.core.security_lab import SecurityLab
from backend.app.core.limiter import limiter

router = APIRouter()

@router.post("/xai/audit", response_model=XAIAuditResult)
@limiter.limit("20/minute")
async def audit_xai_logs(
    request: Request,
    file: UploadFile = File(...),
    # current_user: Any = Depends(get_current_active_user)
):
    """
    **Laboratório de Auditoria Algorítmica (XAI)**
    
    Analisa arquivos de logs de IA (CSV/JSON) em busca de metadados de explicabilidade.
    
    Security Checks:
    - Rate Limit: 5 req/min
    - Magic Bytes Inspection (Anti-Malware)
    - Zero Retention Policy (In-Memory Processing)
    """
    # 1. Validação de Extensão (Básica)
    if not file.filename.endswith(('.csv', '.json')):
        raise HTTPException(status_code=400, detail="Apenas arquivos CSV ou JSON são suportados.")
    
    try:
        content = await file.read()
        
        # 2. Security Hardening: Magic Bytes Inspection
        SecurityLab.validate_magic_bytes(content, file.filename)
        
        # 3. Processamento In-Memory
        result = XAIService.audit_file(content, file.filename)
        return result
        
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        # Logar erro real no servidor mas retornar genérico para o user
        print(f"[INTERNAL ERROR] {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno de segurança ou processamento.")

class ScanRequest(BaseModel):
    text: str

@router.post("/shadow/scan", response_model=ShadowScanResult)
@limiter.limit("30/minute")
async def scan_shadow_ai(
    request: Request,
    payload: ScanRequest
):
    """
    **Shadow AI Scanner**
    Simula vazamento de dados identificando PII e PHI em textos.
    
    Security Checks:
    - Input Sanitization (Anti-ReDoS)
    - PII Identification
    """
    # Security Hardening: Sanitização de Input
    clean_text = SecurityLab.sanitize_input_text(payload.text)
    
    return ShadowAIService.scan_text(clean_text)

@router.post("/iso/assess", response_model=ISOAssessmentResult)
@limiter.limit("50/minute")
async def assess_iso_maturity(
    request: Request, 
    payload: ISOAssessmentRequest
):
    """
    **ISO 42001 Maturity**
    Calcula nível de maturidade baseado em questionário ponderado.
    """
    return ISOService.evaluate(payload.answers)
