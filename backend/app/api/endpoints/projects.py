from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.db.session import get_db
from backend.app.api.auth import get_current_user
from backend.app.models.user import User
from backend.app.models.project import Project
from backend.app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut

router = APIRouter()

@router.get("/", response_model=List[ProjectOut])
def list_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Lista todos os projetos de IA do usuário.
    """
    return db.query(Project).filter(Project.user_id == current_user.id).all()

@router.post("/", response_model=ProjectOut, status_code=status.HTTP_201_CREATED)
def create_project(
    project_in: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Cria um novo projeto de governança.
    """
    new_project = Project(
        name=project_in.name,
        description=project_in.description,
        status=project_in.status,
        risk_level=project_in.risk_level,
        user_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get("/{project_id}", response_model=ProjectOut)
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return project

@router.put("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    
    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    project = db.query(Project).filter(Project.id == project_id, Project.user_id == current_user.id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    
    db.delete(project)
    db.commit()
