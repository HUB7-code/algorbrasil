from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from backend.app.db.session import get_db
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
from backend.app.models.payment import Payment, PaymentStatus
from backend.app.models.assessment import Assessment

router = APIRouter()

# Schema for Admin Dashboard
class UserAdminView(BaseModel):
    id: int
    email: str
    full_name: Optional[str] = None
    role: str
    created_at: Optional[datetime] = None # Assuming we add created_at to User later, or just mock for now
    assessment_score: Optional[int] = None
    payment_status: Optional[str] = "Pending"
    clean_room_status: str = "Inactive"

    class Config:
        from_attributes = True

class InviteRequest(BaseModel):
    client_email: str
    plan_type: str = "enterprise_clean_room"

# Admin Permission Dependency
def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin" and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso restrito a administradores."
        )
    return current_user

@router.get("/users", response_model=List[UserAdminView])
async def list_users(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """
    List all users with their payment and assessment status.
    Only accessible by Admins.
    """
    users = db.query(User).offset(skip).limit(limit).all()
    
    result = []
    for u in users:
        # Check Payment
        last_payment = db.query(Payment).filter(
            Payment.user_id == u.id,
            Payment.status == PaymentStatus.COMPLETED
        ).order_by(Payment.created_at.desc()).first()
        
        # Check Score
        last_assessment = db.query(Assessment).filter(
            Assessment.owner_id == u.id
        ).order_by(Assessment.created_at.desc()).first()

        payment_st = "Paid" if last_payment else "Pending"
        score = last_assessment.score_total if last_assessment else 0
        
        # Clean Room Logic (Mock)
        clean_room = "Active" if payment_st == "Paid" and score > 70 else "Not Eligible"

        result.append(UserAdminView(
            id=u.id,
            email=u.email,
            full_name=u.full_name,
            role=u.role,
            assessment_score=score,
            payment_status=payment_st,
            clean_room_status=clean_room
        ))
    
    return result

@router.post("/invite")
async def create_invite(
    invite_data: InviteRequest,
    admin: User = Depends(get_current_admin)
):
    """
    Generate a secure invitation link for a client.
    """
    # In a real app, this would generate a JWT token or unique hash
    import hashlib
    import time
    
    token_base = f"{invite_data.client_email}{time.time()}"
    secure_token = hashlib.sha256(token_base.encode()).hexdigest()[:16]
    
    invite_link = f"https://algorbrasil.com.br/register?invite={secure_token}&plan={invite_data.plan_type}"
    
    return {
        "message": "Invite generated successfully",
        "client_email": invite_data.client_email,
        "invite_link": invite_link,
        "valid_until": "24h"
    }

class UserRoleUpdate(BaseModel):
    role: str # 'admin', 'auditor', 'user'

@router.put("/users/{user_id}/role")
async def update_user_role(
    user_id: int,
    role_data: UserRoleUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """
    Promote or Demote a user.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if role_data.role not in ['admin', 'auditor', 'user']:
         raise HTTPException(status_code=400, detail="Invalid role")

    user.role = role_data.role
    db.commit()
    return {"status": "success", "message": f"User {user.email} role updated to {user.role}"}

@router.delete("/users/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    """
    Ban/Delete a user.
    """
    if user_id == admin.id:
        raise HTTPException(status_code=400, detail="Cannot delete yourself")
        
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    db.delete(user)
    db.commit()
    return {"status": "success", "message": "User deleted"}

from fastapi import UploadFile, File
import shutil
import os

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    admin: User = Depends(get_current_admin)
):
    """
    Upload a file (PDF, Doc, etc) to be used in LMS lessons.
    Max size is controlled by server config, but typically allow ~50MB.
    """
    UPLOAD_DIR = "backend/app/static/uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    # Save file
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Could not save file")
        
    return {
        "filename": file.filename, 
        "url": f"/static/uploads/{file.filename}",
        "size_bytes": os.path.getsize(file_path)
    }
