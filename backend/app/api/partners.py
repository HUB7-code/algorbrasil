from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.db.session import get_db
from backend.app.models.partner import PartnerApplication, PartnerApplicationStatus
from backend.app.models.user import User
from backend.app.schemas.partner_schemas import PartnerApplicationCreate, PartnerApplicationResponse
from backend.app.api.auth import get_current_user

router = APIRouter()

# --- PUBLIC ENDPOINTS ---

@router.post("/apply", response_model=PartnerApplicationResponse, status_code=status.HTTP_201_CREATED)
def submit_application(application: PartnerApplicationCreate, db: Session = Depends(get_db)):
    """
    Public endpoint for partners to submit their credentialing dossier.
    """
    # Check if email already applied
    existing = db.query(PartnerApplication).filter(PartnerApplication.email == application.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Application already exists for this email.")

    new_app = PartnerApplication(
        full_name=application.full_name,
        email=application.email,
        linkedin=application.linkedin,
        whatsapp=application.whatsapp,
        area=application.area,
        motivation=application.motivation,
        status=PartnerApplicationStatus.pending
    )
    
    db.add(new_app)
    db.commit()
    db.refresh(new_app)
    return new_app

# --- ADMIN ENDPOINTS ---

@router.get("/applications", response_model=List[PartnerApplicationResponse])
def list_applications(
    status_filter: str = None, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Admin only: List all applications.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    query = db.query(PartnerApplication)
    if status_filter:
        query = query.filter(PartnerApplication.status == status_filter)
        
    return query.order_by(PartnerApplication.created_at.desc()).all()

@router.put("/applications/{app_id}/status")
def update_application_status(
    app_id: int, 
    new_status: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Admin only: Approve or Reject an application.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized")
    
    app = db.query(PartnerApplication).filter(PartnerApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    app.status = new_status
    app.reviewed_by = current_user.id
    db.commit()
    
    return {"message": f"Application status updated to {new_status}"}
