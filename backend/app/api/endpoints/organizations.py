from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.organization import Organization, organization_members
from backend.app.api.auth import get_current_user

router = APIRouter()

# --- Schemas ---
class OrganizationCreate(BaseModel):
    name: str
    cnpj: Optional[str] = None

class OrganizationOut(BaseModel):
    id: int
    name: str
    cnpj: Optional[str] = None
    role: str = "owner"

    class Config:
        from_attributes = True

# --- Endpoints ---

@router.post("/", response_model=OrganizationOut)
def create_organization(
    org_in: OrganizationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Cria uma nova organização e define o usuário atual como proprietário.
    """
    # Create Org
    new_org = Organization(
        name=org_in.name,
        cnpj=org_in.cnpj,
        owner_id=current_user.id
    )
    db.add(new_org)
    db.commit()
    db.refresh(new_org)

    # Add user as member with 'owner' role
    # Note: Using execute for association table insertion
    stmt = organization_members.insert().values(
        user_id=current_user.id,
        organization_id=new_org.id,
        role="owner"
    )
    db.execute(stmt)
    db.commit()

    return {
        "id": new_org.id,
        "name": new_org.name,
        "cnpj": new_org.cnpj,
        "role": "owner"
    }

@router.get("/me", response_model=List[OrganizationOut])
def list_my_organizations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista todas as organizações que o usuário pertence (como membro ou owner).
    """
    # SQLAlchemy relationship makes this easy
    # current_user.organizations (members) + current_user.owned_organizations
    # But usually 'members' includes owner if added to association table (which we did above)
    
    orgs_out = []
    
    # Fetch from association table to get Roles
    # Explicit join
    results = db.query(Organization, organization_members.c.role).join(
        organization_members, 
        Organization.id == organization_members.c.organization_id
    ).filter(
        organization_members.c.user_id == current_user.id
    ).all()

    for org, role in results:
        orgs_out.append({
            "id": org.id,
            "name": org.name,
            "cnpj": org.cnpj,
            "role": role
        })

    return orgs_out
