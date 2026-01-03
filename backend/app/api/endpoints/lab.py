from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from backend.app.schemas.lab import XAIAuditResult
from backend.app.services.xai_service import XAIService
from typing import Any
# from backend.app.api.deps import get_current_active_user # Desativado temporariamente para facilitar teste do Lab sem Auth

router = APIRouter()

@router.post("/xai/audit", response_model=XAIAuditResult)
async def audit_xai_logs(
    file: UploadFile = File(...),
    # current_user: Any = Depends(get_current_active_user)
):
    """
    **Laboratório de Auditoria Algorítmica (XAI)**
    
    Analisa arquivos de logs de IA (CSV/JSON) em busca de metadados de explicabilidade.
    
    - **Processamento In-Memory:** NENHUM dado é salvo em disco ("Zero Retention Policy").
    - **Detecção:** Busca padrões de SHAP, LIME, Intervalos de Confiança e Ofuscação.
    """
    if not file.filename.endswith(('.csv', '.json')):
        raise HTTPException(status_code=400, detail="Apenas arquivos CSV ou JSON são suportados.")
    
    try:
        content = await file.read()
        # Limite de tamanho (ex: 10MB) poderia ser checado aqui
        
        result = XAIService.audit_file(content, file.filename)
        return result
        
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro interno no processamento do arquivo de auditoria.")
