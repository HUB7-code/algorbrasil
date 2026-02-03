from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal, engine, Base
# Import all models to ensure tables are created
from backend.app.models.user import User
from backend.app.models.ai_asset import AIAsset
from backend.app.models.risk import RiskRegister, RiskStatus
from backend.app.models.assessment import Assessment
from backend.app.models.project import Project
from backend.app.core.security import get_password_hash
from datetime import datetime

def seed_data():
    print("🛠️  Ensuring Database Tables Exist...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        print("🌱 Seeding Demo Data for Royal Navy Dashboard...")

        # 1. Get or Create User
        user = db.query(User).filter(User.email == "admin@algorbrasil.com.br").first()
        demo_password = "admin"
        hashed_pwd = get_password_hash(demo_password)

        if not user:
            print("Creating Demo User...")
            user = User(
                email="admin@algorbrasil.com.br",
                full_name="Edisio Demo",
                hashed_password=hashed_pwd, 
                is_active=True,
                role="admin"
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"Created User: {user.email} (Password: {demo_password})")
        else:
            print(f"User found: {user.email}. Updating password...")
            user.hashed_password = hashed_pwd
            db.add(user)
            db.commit()
        
        user_id = user.id

        # 2. Inventory Assets
        if db.query(AIAsset).count() < 5:
            print("Creating AI Assets...")
            assets = [
                AIAsset(name="Customer Service Bot v2", type="Generative AI", risk_level="Medium", department="Customer Success", owner_id=user_id, status="Production", description="GPTWrapper for Support"),
                AIAsset(name="Credit Scoring Model", type="Machine Learning", risk_level="High", department="Finance", owner_id=user_id, status="Production", description="Legacy XGBoost"),
                AIAsset(name="Resume Screener", type="Machine Learning", risk_level="Critical", department="HR", owner_id=user_id, status="Under Review", description="Potential Bias Issue"),
                AIAsset(name="Marketing Copy Gen", type="Generative AI", risk_level="Low", department="Marketing", owner_id=user_id, status="Staging", description="Claude 3 Opus"),
                AIAsset(name="Sales Predictor", type="Statistical Model", risk_level="Low", department="Sales", owner_id=user_id, status="Legacy", description="Linear Regression"),
            ]
            for a in assets:
                db.add(a)

        # 3. Risks
        if db.query(RiskRegister).count() < 3:
            print("Creating Risks...")
            risks = [
                RiskRegister(
                    user_id=user_id, category="Viés Discriminatório", description="Modelo de RH rejeita cvs de regiões específicas",
                    affected_system="Resume Screener", probability=4, impact=5, risk_level=20, # 20 = Critical
                    strategy="Mitigate", status=RiskStatus.OPEN
                ),
                RiskRegister(
                    user_id=user_id, category="Alucinação em Chatbot", description="Bot inventando políticas de reembolso",
                    affected_system="Customer Service Bot", probability=3, impact=3, risk_level=9, # 9 = High
                    strategy="Monitor", status=RiskStatus.OPEN
                ),
                RiskRegister(
                    user_id=user_id, category="Vazamento de PII", description="Dados de teste com CPF real",
                    affected_system="Credit Scoring Model", probability=2, impact=4, risk_level=8, # 8 = Medium
                    strategy="Accept", status=RiskStatus.MITIGATED
                )
            ]
            for r in risks:
                db.add(r)
        
        # 4. Projects
        if db.query(Project).count() < 2:
            print("Creating Projects...")
            projects = [
                Project(name="Adequação ISO 42001", status="In Progress", description="Implementação global", owner_id=user_id),
                Project(name="Auditoria de Vieses RH", status="Planned", description="Revisão do modelo de contratação", owner_id=user_id)
            ]
            for p in projects:
                db.add(p)

        # 5. LMS Courses (ISO 42001)
        from backend.app.models.lms import Course, CourseModule, CourseLesson
        
        if not db.query(Course).filter(Course.id == "iso42001-lead").first():
            print("Creating LMS Course: ISO 42001 Lead...")
            course = Course(
                id="iso42001-lead", 
                title="Formação Lead Implementer ISO 42001",
                description="Domine a implementação de Sistemas de Gestão de IA conforme a norma internacional.",
                type="certification",
                thumbnail_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2560&auto=format&fit=crop"
            )
            db.add(course)
            db.commit()
            
            # Module 1
            mod1 = CourseModule(course_id=course.id, title="Módulo 1: Fundamentos da Governança de IA", order=1)
            db.add(mod1)
            db.commit()
            
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
            
            # Module 2
            mod2 = CourseModule(course_id=course.id, title="Módulo 2: Planejamento e Riscos", order=2)
            db.add(mod2)
            db.commit()
            
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
            print("LMS Course Seeded.")

        db.commit()
        print("✅ Seed Complete! Login with: demo@algor.brasil / password123")

    except Exception as e:
        print(f"❌ Error seeding: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
