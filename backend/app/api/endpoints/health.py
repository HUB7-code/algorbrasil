"""
Health Check Endpoint
Endpoint para validação de status da API
"""
from fastapi import APIRouter
from datetime import datetime
from typing import Dict

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check() -> Dict[str, str]:
    """
    Health Check Endpoint
    
    Retorna o status da API e timestamp atual.
    Usado para validação de disponibilidade e testes E2E.
    
    Returns:
        Dict com status e timestamp
    """
    return {
        "status": "ok",
        "service": "ALGOR Brasil API",
        "timestamp": datetime.now().isoformat(),
        "version": "17.6.0"
    }

@router.get("/ping", tags=["Health"])
async def ping() -> Dict[str, str]:
    """
    Ping Endpoint
    
    Endpoint simples para verificação rápida de conectividade.
    
    Returns:
        Dict com mensagem de pong
    """
    return {"message": "pong"}
