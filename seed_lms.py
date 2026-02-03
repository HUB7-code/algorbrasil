from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.models.lms import Course, CourseModule, CourseLesson

def seed_lms():
    db = SessionLocal()
    
    # 1. Check if course exists
    if db.query(Course).filter(Course.id == "iso42001-lead").first():
        print("Curso já existe.")
        db.close()
        return

    print("Semeando Curso 'Formação Auditor Líder'...")

    # 2. Create Course
    course = Course(
        id="iso42001-lead",
        title="Formação Auditor Líder ISO/IEC 42001",
        description="Domine a implementação e auditoria de Sistemas de Gestão de IA segundo a norma internacional.",
        type="certification",
        thumbnail_url="/images/course_iso42001.jpg" # Placeholder
    )
    db.add(course)
    db.commit()

    # 3. Create Modules & Lessons
    
    # Module 1
    mod1 = CourseModule(course_id=course.id, title="Módulo 1: Fundamentos da Governança", order=1)
    db.add(mod1)
    db.commit()
    db.refresh(mod1)

    l1 = CourseLesson(
        id="iso-m1-l1", module_id=mod1.id, title="Introdução à ISO 42001", 
        type="video", video_id="https://www.youtube.com/watch?v=Get7rqXYrbQ", duration_min=10, order=1
    )
    l2 = CourseLesson(
        id="iso-m1-l2", module_id=mod1.id, title="Escopo e Contexto da Organização", 
        type="video", video_id="https://www.youtube.com/watch?v=ysz5S6P_z-U", duration_min=15, order=2
    )
    l3 = CourseLesson(
        id="iso-m1-l3", module_id=mod1.id, title="Material de Apoio (PDF)", 
        type="document", document_url="/docs/iso42001_intro.pdf", duration_min=5, order=3
    )
    db.add_all([l1, l2, l3])

    # Module 2
    mod2 = CourseModule(course_id=course.id, title="Módulo 2: Gestão de Riscos de IA", order=2)
    db.add(mod2)
    db.commit()
    db.refresh(mod2)

    l4 = CourseLesson(
        id="iso-m2-l1", module_id=mod2.id, title="Matriz de Risco Algorítmico", 
        type="video", video_id="https://www.youtube.com/watch?v=LXb3EKWsInQ", duration_min=20, order=1
    )
    db.add(l4)

    db.commit()
    db.close()
    print("✅ Curso Semeado com Sucesso!")

if __name__ == "__main__":
    seed_lms()
