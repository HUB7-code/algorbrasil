
from sqlalchemy.orm import Session
from backend.app.models.audit import AuditLog
from fastapi import Request
import json

def log_audit(
    db: Session, 
    action: str, 
    resource_type: str, 
    resource_id: str = None, 
    user_id: int = None, 
    details: dict = None,
    request: Request = None
):
    """
    Registra um evento de auditoria no banco de dados.
    Proteção LGPD: Certifique-se de não passar PII não encriptado em 'details'.
    """
    ip_address = None
    user_agent = None
    
    if request:
        ip_address = request.client.host if request.client else "unknown"
        user_agent = request.headers.get("user-agent")

    log_entry = AuditLog(
        user_id=user_id,
        action=action,
        resource_type=resource_type,
        resource_id=str(resource_id) if resource_id else None,
        details=details if details else {},
        ip_address=ip_address,
        user_agent=user_agent
    )
    
    db.add(log_entry)
    db.commit()
    return log_entry
