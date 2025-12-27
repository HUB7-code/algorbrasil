import logging
from backend.app.db.session import SessionLocal
from backend.app.core.security import get_password_hash
from backend.app.models import user, organization, profiles

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    db = SessionLocal()
    try:
        user_email = "admin@algor.com"
        
        # 1. Check if Admin exists
        current_user = db.query(user.User).filter(user.User.email == user_email).first()
        
        if not current_user:
            logger.info("➕ Creating Superuser...")
            current_user = user.User(
                email=user_email,
                hashed_password=get_password_hash("admin"),
                full_name="Algor Super Admin",
                role="admin",
                is_active=True,
                is_superuser=True,
                is_totp_enabled=False
            )
            db.add(current_user)
            db.commit()
            db.refresh(current_user)
            logger.info(f"✅ User created: {current_user.id}")
        else:
            logger.info("✅ Superuser already exists.")

        # 2. Check/Create Organization
        org = db.query(organization.Organization).filter(organization.Organization.owner_id == current_user.id).first()
        if not org:
            logger.info("➕ Creating Admin Organization...")
            org = organization.Organization(
                name="Algor HQ",
                owner_id=current_user.id,
                cnpj="00.000.000/0001-91",
                plan_tier="enterprise",
                credits_balance=9999
            )
            db.add(org)
            db.commit()
            logger.info("✅ Organization created.")
        else:
            # Garantir dados atualizados
            if org.plan_tier != 'enterprise':
                org.plan_tier = 'enterprise'
                db.commit()
                logger.info("🔄 Organization updated to Enterprise.")

        # 3. Check/Create Profile (Prevent Frontend Lockout)
        profile = db.query(profiles.CorporateProfile).filter(profiles.CorporateProfile.user_id == current_user.id).first()
        if not profile:
            logger.info("➕ Creating Corporate Profile...")
            profile = profiles.CorporateProfile(
                user_id=current_user.id,
                company_name="Algor Brasil",
                role="CTO",
                industry="Technology",
                employee_count="51-200",
                privacy_level="High"
            )
            db.add(profile)
            db.commit()
            logger.info("✅ Profile created.")
            
    except Exception as e:
        logger.error(f"❌ Error during initialization: {e}")
        # db.rollback() # Optional
    finally:
        db.close()

if __name__ == "__main__":
    logger.info("🚀 Initializing Data...")
    init_db()
    logger.info("🏁 Initialization Complete.")
