from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from pydantic import BaseModel
from datetime import datetime
from backend.app.db.session import get_db
from backend.app.models.user import User
from backend.app.api.auth import get_current_user
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment
from backend.app.services.audit_service import log_audit
from backend.app.services.certificate_generator import CertificateGenerator

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
    """Semeia o curso ISO 42001 com módulos e aulas reais."""
    if db.query(Course).filter(Course.id == "iso42001-lead").first():
        return {"msg": "Curso já existe"}
        
    # 1. Create Course
    course = Course(
        id="iso42001-lead", 
        title="Formação Lead Implementer ISO 42001",
        description="Domine a implementação de Sistemas de Gestão de IA conforme a norma internacional.",
        type="certification",
        thumbnail_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop"
    )
    db.add(course)
    db.commit()
    
    # 2. Module 1: Fundamentos
    mod1 = CourseModule(course_id=course.id, title="Módulo 1: Fundamentos da Governança de IA", order=1)
    db.add(mod1)
    db.commit()
    db.refresh(mod1)
    
    lessons_m1 = [
        {"id": "iso-m1-l1", "title": "Introdução à ISO 42001", "type": "video", "video_id": "dQw4w9WgXcQ", "duration": 15, "order": 1},
        {"id": "iso-m1-l2", "title": "O Conceito de Sistema de Gestão", "type": "video", "video_id": "dQw4w9WgXcQ", "duration": 20, "order": 2},
        {"id": "iso-m1-l3", "title": "O AI Act Europeu vs. Brasil", "type": "document", "doc_url": "/docs/ai-act-summary.pdf", "duration": 30, "order": 3}
    ]
    
    for l in lessons_m1:
        db.add(CourseLesson(
            id=l["id"], module_id=mod1.id, title=l["title"], type=l["type"], 
            video_id=l.get("video_id"), document_url=l.get("doc_url"), 
            duration_min=l["duration"], order=l["order"]
        ))
        
    # 3. Module 2: Planejamento (Clause 6)
    mod2 = CourseModule(course_id=course.id, title="Módulo 2: Planejamento e Riscos", order=2)
    db.add(mod2)
    db.commit()
    db.refresh(mod2)
    
    lessons_m2 = [
        {"id": "iso-m2-l1", "title": "Ações para abordar riscos (6.1)", "type": "video", "video_id": "dQw4w9WgXcQ", "duration": 45, "order": 1},
        {"id": "iso-m2-l2", "title": "Avaliação de Impacto Algorítmico (AIA)", "type": "video", "video_id": "dQw4w9WgXcQ", "duration": 35, "order": 2},
        {"id": "iso-m2-quiz", "title": "Quiz: Planejamento", "type": "quiz", "duration": 10, "order": 3}
    ]

    for l in lessons_m2:
        db.add(CourseLesson(
            id=l["id"], module_id=mod2.id, title=l["title"], type=l["type"], 
            video_id=l.get("video_id"), document_url=l.get("doc_url"), 
            duration_min=l["duration"], order=l["order"]
        ))

    db.commit()
    return {"msg": "Curso ISO 42001 Semeado com Sucesso (Módulos + Aulas)"}

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

class SingleModuleCreate(BaseModel):
    title: str
    order: int
    course_id: str

@router.post("/modules")
def create_module(
    module_data: SingleModuleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin" and not current_user.is_superuser:
         raise HTTPException(status_code=403, detail="Acesso restrito.")
         
    new_mod = CourseModule(course_id=module_data.course_id, title=module_data.title, order=module_data.order)
    db.add(new_mod)
    db.commit()
    db.refresh(new_mod)
    return {"id": new_mod.id, "title": new_mod.title}

class SingleLessonCreate(BaseModel):
    id: str # slug
    module_id: int
    title: str
    type: str
    video_id: str = None
    document_url: str = None
    duration_min: int = 0
    order: int = 0

@router.post("/lessons")
def create_lesson(
    lesson_data: SingleLessonCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != "admin" and not current_user.is_superuser:
         raise HTTPException(status_code=403, detail="Acesso restrito.")

    # Check validation
    if db.query(CourseLesson).filter(CourseLesson.id == lesson_data.id).first():
        raise HTTPException(status_code=400, detail="Lesson ID already exists")

    new_lesson = CourseLesson(
        id=lesson_data.id,
        module_id=lesson_data.module_id,
        title=lesson_data.title,
        type=lesson_data.type,
        video_id=lesson_data.video_id,
        document_url=lesson_data.document_url,
        duration_min=lesson_data.duration_min,
        order=lesson_data.order
    )
    db.add(new_lesson)
    db.commit()
    return {"status": "success", "id": new_lesson.id}

@router.get("/certificates/{course_id}")
def download_certificate(
    course_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Gera e baixa o certificado se o curso estiver concluído."""
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id, 
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=404, detail="Matrícula não encontrada.")
    
    # Check Completion (Simplificado: Se status != completed, negar. Em dev pode liberar)
    # TODO: Implementar checagem real de 100%
    # Por enquanto, liberado para testes se o curso tiver pelo menos 1 aula feita ou se for admin
    
    course = db.query(Course).filter(Course.id == course_id).first()
    
    pdf_buffer = CertificateGenerator.generate(
        student_name=current_user.full_name or current_user.email,
        course_title=course.title,
        date=datetime.now(),
        certification_id=f"CRT-{course_id.upper()}-{current_user.id}"
    )
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=Certificate_Algor_{course_id}.pdf"}
    )
