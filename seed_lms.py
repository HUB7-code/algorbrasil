import sys
import os
from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal, engine
from backend.app.models.lms import Course, CourseModule, CourseLesson

# Ensure tables exist
from backend.app.models import lms
lms.Base.metadata.create_all(bind=engine)

def seed_lms():
    db = SessionLocal()
    try:
        # 1. Check if course exists
        existing = db.query(Course).filter(Course.id == "iso42001-lead").first()
        if existing:
            print("Course 'iso42001-lead' already exists. Skipping seed.")
            return

        print("Seeding LMS Content...")

        # 2. Create Course
        course = Course(
            id="iso42001-lead",
            title="Formação Auditor Líder ISO 42001 (AIMS)",
            description="Domine a norma internacional de gestão de IA. Do zero à certificação de auditor líder.",
            type="certification",
            thumbnail_url="/images/iso-course-thumb.webp" # Ensure this exists or use placeholder
        )
        db.add(course)
        db.commit()

        # 3. Create Modules & Lessons
        
        # Module 1: Fundamentos
        mod1 = CourseModule(
            course_id="iso42001-lead",
            title="Módulo 1: Fundamentos da Governança de IA",
            description="Entenda o escopo, termos e definições da ISO/IEC 42001.",
            order=1
        )
        db.add(mod1)
        db.commit() # Commit to get ID
        db.refresh(mod1)

        lessons_m1 = [
            CourseLesson(id="m1-l1", module_id=mod1.id, title="1.1 Introdução ao AIMS (Artificial Intelligence Management System)", type="video", video_id="dQw4w9WgXcQ", duration_min=15, order=1), # Rick Roll Placeholder :D
            CourseLesson(id="m1-l2", module_id=mod1.id, title="1.2 O Ciclo PDCA na IA", type="video", video_id="dQw4w9WgXcQ", duration_min=20, order=2),
            CourseLesson(id="m1-l3", module_id=mod1.id, title="1.3 Material de Apoio (PDF)", type="document", document_url="iso42001_intro.pdf", order=3)
        ]
        for l in lessons_m1: db.add(l)

        # Module 2: Planejamento (Clause 6)
        mod2 = CourseModule(
            course_id="iso42001-lead",
            title="Módulo 2: Planejamento & Riscos (Clause 6)",
            description="Como realizar o Risk Assessment obrigatório.",
            order=2
        )
        db.add(mod2)
        db.commit()
        db.refresh(mod2)

        lessons_m2 = [
            CourseLesson(id="m2-l1", module_id=mod2.id, title="2.1 Metodologia de Análise de Risco", type="video", video_id="dQw4w9WgXcQ", duration_min=25, order=1),
            CourseLesson(id="m2-l2", module_id=mod2.id, title="2.2 Definindo o Apetite de Risco", type="video", video_id="dQw4w9WgXcQ", duration_min=10, order=2),
            CourseLesson(id="m2-l3", module_id=mod2.id, title="2.3 Workshop Prático: Matriz de Riscos", type="workshop", duration_min=45, order=3)
        ]
        for l in lessons_m2: db.add(l)

        # Module 3: Operação (Clause 8)
        mod3 = CourseModule(
            course_id="iso42001-lead",
            title="Módulo 3: Operação e Controle (Clause 8)",
            description="Implementando controles operacionais em MLops.",
            order=3
        )
        db.add(mod3)
        db.commit()
        db.refresh(mod3)
        
        lessons_m3 = [
             CourseLesson(id="m3-l1", module_id=mod3.id, title="3.1 Controles de Dados (Data Governance)", type="video", video_id="dQw4w9WgXcQ", duration_min=30, order=1),
             CourseLesson(id="m3-l2", module_id=mod3.id, title="3.2 Human Oversight (Supervisão Humana)", type="video", video_id="dQw4w9WgXcQ", duration_min=20, order=2),
        ]
        for l in lessons_m3: db.add(l)

        db.commit()
        print("LMS Seeded Successfully!")

    except Exception as e:
        print(f"Error seeding LMS: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_lms()
