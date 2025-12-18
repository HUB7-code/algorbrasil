from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.api import deps
from backend.app.models.ai_asset import AIAsset
from backend.app.models.organization import Organization
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()

# Schema (Pydantic) - Could be moved to schemas/
class AIAssetBase(BaseModel):
    name: str
    department: Optional[str] = None
    type: str # SaaS, Model, etc.
    risk_level: str # Low, Medium, High, Critical
    data_types: Optional[str] = None
    description: Optional[str] = None

class AIAssetCreate(AIAssetBase):
    pass

class AIAssetOut(AIAssetBase):
    id: int
    owner_id: int
    status: str
    created_at: datetime
    
    class Config:
        orm_mode = True

# Read All (With Organization Filter)
@router.get("/", response_model=List[AIAssetOut])
def read_assets(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
    organization_id: Optional[int] = None
):
    query = db.query(AIAsset)
    
    if organization_id:
        # Verify membership
        # Efficient way: Check if the organization exists in user.organizations or owned_organizations
        # Note: This relies on the relationship being loaded or db query.
        # Let's use a direct DB query for security and performance
        is_member = current_user.id in [member.id for member in db.query(Organization).filter(Organization.id == organization_id).first().members] if db.query(Organization).filter(Organization.id == organization_id).first() else False
        # Fallback for owner
        is_owner = db.query(Organization).filter(Organization.id == organization_id, Organization.owner_id == current_user.id).first() is not None
        
        if not (is_member or is_owner):
             raise HTTPException(status_code=403, detail="Not a member of this organization")
             
        query = query.filter(AIAsset.organization_id == organization_id)
    else:
        # Default: Show Personal Assets AND Organization Assets? 
        # For now, let's stick to Personal Only if no Org specified to keep UI clean, 
        # OR return all assets user has access to.
        # Choice: Personal Assets Only (Personal Workspace)
        query = query.filter(AIAsset.owner_id == current_user.id, AIAsset.organization_id == None)

    assets = query.offset(skip).limit(limit).all()
    return assets

# Create
@router.post("/", response_model=AIAssetOut)
def create_asset(
    *,
    db: Session = Depends(deps.get_db),
    asset_in: AIAssetCreate,
    current_user = Depends(deps.get_current_active_user),
    organization_id: Optional[int] = None
):
    # If organization_id is provided, verify permission
    if organization_id:
        is_owner = db.query(Organization).filter(Organization.id == organization_id, Organization.owner_id == current_user.id).first()
        # For now, simplistic check. Ideally check "role" in organization_members table.
        # Assuming any member can create assets for now (Growth Strategy: remove friction)
        # We need to fetch the org first
        org = db.query(Organization).filter(Organization.id == organization_id).first()
        if not org:
             raise HTTPException(status_code=404, detail="Organization not found")
             
        # Check membership
        is_member = current_user in org.members
        
        if not (is_owner or is_member):
             raise HTTPException(status_code=403, detail="No write access to this organization")

    asset = AIAsset(
        name=asset_in.name,
        department=asset_in.department,
        type=asset_in.type,
        risk_level=asset_in.risk_level,
        data_types=asset_in.data_types,
        description=asset_in.description,
        owner_id=current_user.id, # The value creator
        organization_id=organization_id, # The context
        status="Under Review" 
    )
    db.add(asset)
    db.commit()
    db.refresh(asset)
    return asset
