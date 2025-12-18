
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.app.db.session import get_db
from backend.app.models.risk import RiskRegister, RiskStatus
from backend.app.models.user import User
from backend.app.schemas_risk import RiskCreate, RiskUpdate, RiskResponse
from backend.app.api.auth import get_current_user

router = APIRouter()

@router.post("/", response_model=RiskResponse)
def create_risk(
    risk_in: RiskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    organization_id: Optional[int] = None
):
    """
    Registra um novo risco no Sistema de Gestão (ISO 42001 - 5.2).
    Calcula automaticamente o Nível de Risco (Probabilidade x Impacto).
    """
    # Verify Permissions if org_id is present (Simplified check for now)
    if organization_id:
        # Check if user is member of org
        # For now, assuming standard permission logic handled by frontend context or middleware in future
        pass

    risk_level = risk_in.probability * risk_in.impact
    
    db_risk = RiskRegister(
        user_id=current_user.id,
        category=risk_in.category,
        description=risk_in.description,
        affected_system=risk_in.affected_system,
        probability=risk_in.probability,
        impact=risk_in.impact,
        risk_level=risk_level,
        strategy=risk_in.strategy,
        mitigation_plan=risk_in.mitigation_plan,
        owner=risk_in.owner,
        status=RiskStatus.OPEN,
        organization_id=organization_id
    )
    
    db.add(db_risk)
    db.commit()
    db.refresh(db_risk)
    return db_risk

@router.get("/", response_model=List[RiskResponse])
def read_risks(
    skip: int = 0,
    limit: int = 100,
    organization_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista riscos. Se organization_id for fornecido, filtra por organização.
    Caso contrário, lista os riscos PESSOAIS do usuário.
    """
    query = db.query(RiskRegister)
    
    if organization_id:
         query = query.filter(RiskRegister.organization_id == organization_id)
         # TODO: Add security check to ensure user belongs to organization_id
    else:
         # Personal risks only
         query = query.filter(RiskRegister.user_id == current_user.id, RiskRegister.organization_id == None)

    risks = query.offset(skip).limit(limit).all()
    return risks

@router.get("/{risk_id}", response_model=RiskResponse)
def read_risk(
    risk_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    risk = db.query(RiskRegister).filter(RiskRegister.id == risk_id, RiskRegister.user_id == current_user.id).first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risco não encontrado")
    return risk

@router.patch("/{risk_id}", response_model=RiskResponse)
def update_risk(
    risk_id: int,
    risk_in: RiskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Atualiza um risco (ex: mudar status para Mitigado, ou atualizar probabilidade).
    Recalcula o Nível de Risco se Probabilidade ou Impacto mudarem.
    """
    risk = db.query(RiskRegister).filter(RiskRegister.id == risk_id, RiskRegister.user_id == current_user.id).first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risco não encontrado")
    
    update_data = risk_in.dict(exclude_unset=True)
    
    # Recalcula risk_level se necessário
    new_prob = update_data.get("probability", risk.probability)
    new_impact = update_data.get("impact", risk.impact)
    if "probability" in update_data or "impact" in update_data:
        update_data["risk_level"] = new_prob * new_impact
        
    for field, value in update_data.items():
        setattr(risk, field, value)
        
    db.add(risk)
    db.commit()
    db.refresh(risk)
    return risk
        
@router.delete("/{risk_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_risk(
    risk_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Remove um risco do registro.
    """
    risk = db.query(RiskRegister).filter(RiskRegister.id == risk_id, RiskRegister.user_id == current_user.id).first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risco não encontrado")
        
    db.delete(risk)
    db.commit()
    return None
