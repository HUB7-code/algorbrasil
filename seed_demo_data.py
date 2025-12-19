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
        user = db.query(User).filter(User.email == "demo@algor.brasil").first()
        demo_password = "password123"
        hashed_pwd = get_password_hash(demo_password)

        if not user:
            print("Creating Demo User...")
            user = User(
                email="demo@algor.brasil",
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
