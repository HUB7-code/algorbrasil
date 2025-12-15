from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.api.auth import get_current_user
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment
from backend.app.services.audit_service import log_audit

router = APIRouter()

# --- Schemas ---
class LessonCreate(BaseModel):
    id: str
    title: str
    type: str # video, document
    video_id: str = None
    document_url: str = None
    duration_min: int = 0

class ModuleCreate(BaseModel):
    title: str
    order: int
    lessons: List[LessonCreate]

class CourseCreate(BaseModel):
    id: str
    title: str
    description: str
    modules: List[ModuleCreate]

class ProgressUpdate(BaseModel):
    lesson_id: str
    status: str # 'completed', 'in_progress'
    seek_time: int = 0

# --- Endpoints ---

@router.get("/courses", response_model=List[Dict[str, Any]])
def list_courses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Lista todos os cursos disponíveis."""
    courses = db.query(Course).all()
    return [{"id": c.id, "title": c.title, "type": c.type, "thumbnail": c.thumbnail_url} for c in courses]

@router.get("/courses/{course_id}")
def get_course_details(
    course_id: str, 
    request: Request,
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    """Retorna a estrutura completa do curso (Módulos e Aulas)."""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Curso não encontrado")
    
    # Check enrollment
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id, 
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        # Auto-enroll for now on first access (Open Model)
        enrollment = Enrollment(user_id=current_user.id, course_id=course_id, role="student")
        db.add(enrollment)
        db.commit()
        db.refresh(enrollment)

    # Log Access (Audit)
    log_audit(
        db=db,
        action="READ",
        resource_type="course",
        resource_id=course_id,
        user_id=current_user.id,
        details={"module_count": len(course.modules)},
        request=request
    )

    # Serialize Structure
    structure = {
        "id": course.id,
        "title": course.title,
        "description": course.description,
        "modules": []
    }
    
    for mod in sorted(course.modules, key=lambda x: x.order):
        mod_data = {
            "id": mod.id,
            "title": mod.title,
            "lessons": []
        }
        for lesson in sorted(mod.lessons, key=lambda x: x.order):
            # Check progress
            progress = enrollment.progress_data.get(lesson.id, {})
            mod_data["lessons"].append({
                "id": lesson.id,
                "title": lesson.title,
                "type": lesson.type,
                "content": lesson.video_id if lesson.type == 'video' else lesson.document_url,
                "duration": lesson.duration_min,
                "status": progress.get("status", "locked" if lesson.order > 0 else "unlocked"), # Simple logic
                "completed": progress.get("status") == "completed"
            })
        structure["modules"].append(mod_data)
        
    return structure

@router.post("/enrollments/{course_id}/progress")
def update_progress(
    course_id: str, 
    update: ProgressUpdate,
    request: Request,
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    """Atualiza o progresso de uma aula específica."""
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id, 
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=404, detail="Matrícula não encontrada")
        
    # Update JSON safely
    current_data = dict(enrollment.progress_data or {})
    current_data[update.lesson_id] = {
        "status": update.status,
        "timestamp": update.seek_time,
        "updated_at": "now"
    }
    
    # Reassign to trigger update
    enrollment.progress_data = current_data
    db.commit()
    
    # Audit Progress
    log_audit(
        db=db,
        action="UPDATE_PROGRESS",
        resource_type="lesson",
        resource_id=update.lesson_id,
        user_id=current_user.id,
        details={"status": update.status, "course_id": course_id},
        request=request
    )
    
    return {"status": "success", "progress": current_data}

# Endpoint administrativo para semear curso (DEV ONLY)
@router.post("/seed")
def seed_course(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # ... (Seed Logic is kept for backup)
    if db.query(Course).filter(Course.id == "iso42001-lead").first():
        return {"msg": "Curso já existe"}
        
    course = Course(
        id="iso42001-lead", 
        title="Formação Lead Implementer ISO 42001",
        description="Domine a implementação de Sistemas de Gestão de IA.",
        type="certification"
    )
    db.add(course)
    db.commit()
    return {"msg": "Curso Semeado com Sucesso"}

@router.delete("/courses/{course_id}")
def delete_course(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Remove um curso inteiro e seu conteúdo.
    (Em produção, verifique se é Admin)
    """
    # Simple Admin Check
    if current_user.role != "admin" and not current_user.is_superuser:
         raise HTTPException(status_code=403, detail="Acesso restrito.")

    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Curso não encontrado")

    db.delete(course)
    db.commit()
    return {"status": "success", "message": f"Curso {course_id} removido."}

@router.post("/courses")
def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Cria um novo curso via painel administrativo."""
    if current_user.role != "admin" and not current_user.is_superuser:
         raise HTTPException(status_code=403, detail="Acesso restrito.")
         
    if db.query(Course).filter(Course.id == course_data.id).first():
        raise HTTPException(status_code=400, detail="ID do curso já existe.")

    new_course = Course(
        id=course_data.id,
        title=course_data.title,
        description=course_data.description,
        type="certification" # Default for now
    )
    db.add(new_course)
    db.commit()
    
    # Add Modules
    for m in course_data.modules:
        new_mod = CourseModule(course_id=new_course.id, title=m.title, order=m.order)
        db.add(new_mod)
        db.commit()
        db.refresh(new_mod)
        
        for l in m.lessons:
            new_lesson = CourseLesson(
                id=l.id,
                module_id=new_mod.id,
                title=l.title,
                type=l.type,
                video_id=l.video_id,
                document_url=l.document_url,
                duration_min=l.duration_min
            )
            db.add(new_lesson)
    
    db.commit()
    return {"status": "success", "id": new_course.id}
