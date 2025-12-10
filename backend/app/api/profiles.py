
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.models.profiles import CorporateProfile, ProfessionalProfile
from backend.app.schemas import CorporateProfileCreate, CorporateProfileResponse, ProfessionalProfileCreate, ProfessionalProfileResponse
from backend.app.api.auth import get_current_user
from backend.app.services.audit_service import log_audit

router = APIRouter()

@router.post("/profiles/corporate", response_model=CorporateProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_corporate_profile(
    profile_in: CorporateProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Cria o perfil corporativo para o usuário logado (Cliente C-Level).
    """
    # 1. Verificar se já existe perfil
    if current_user.corporate_profile or current_user.professional_profile:
        raise HTTPException(status_code=400, detail="Usuário já possui um perfil associado.")

    # 2. Criar Perfil
    db_profile = CorporateProfile(
        user_id=current_user.id,
        company_name=profile_in.company_name,
        sector=profile_in.sector,
        size_range=profile_in.size_range,
        website=str(profile_in.website) if profile_in.website else None
    )
    
    db.add(db_profile)
    
    # 3. Atualizar Role do Usuário para 'corporate_lead'
    current_user.role = "corporate_lead"
    db.add(current_user)
    
    db.commit()
    db.refresh(db_profile)
    
    # 4. Auditoria
    log_audit(db, "CREATE_CORPORATE_PROFILE", "corporate_profile", db_profile.id, current_user.id, {"company": db_profile.company_name})
    
    return db_profile

@router.post("/profiles/professional", response_model=ProfessionalProfileResponse, status_code=status.HTTP_201_CREATED)
async def create_professional_profile(
    profile_in: ProfessionalProfileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Cria o perfil profissional para o usuário logado (Auditor/Candidato).
    """
    if current_user.corporate_profile or current_user.professional_profile:
        raise HTTPException(status_code=400, detail="Usuário já possui um perfil associado.")

    db_profile = ProfessionalProfile(
        user_id=current_user.id,
        linkedin_url=str(profile_in.linkedin_url),
        bio=profile_in.bio,
        years_experience=profile_in.years_experience,
        primary_expertise=profile_in.primary_expertise,
        city=profile_in.city,
        state=profile_in.state
    )
    
    db.add(db_profile)
    current_user.role = "professional_candidate"
    db.add(current_user)
    
    db.commit()
    db.refresh(db_profile)
    
    log_audit(db, "CREATE_PROFESSIONAL_PROFILE", "professional_profile", db_profile.id, current_user.id, {"expertise": db_profile.primary_expertise})
    
    return db_profile

@router.get("/profiles/me")
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Retorna o perfil completo do usuário (Corporativo ou Profissional).
    """
    if current_user.corporate_profile:
        return {"type": "corporate", "data": current_user.corporate_profile}
    elif current_user.professional_profile:
        return {"type": "professional", "data": current_user.professional_profile}
    else:
        return {"type": "undefined", "message": "Nenhum perfil configurado. Inicie o onboarding."}
