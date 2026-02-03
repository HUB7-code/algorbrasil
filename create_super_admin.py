import sys
import os

# Add root to sys.path
sys.path.append(os.getcwd())

from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    email = "superadmin@algor.com"
    
    print("Checking DB...")
    
    try:
        # Check if exists
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"User {email} already exists. Updating...")
            user.is_active = True
            user.is_superuser = True
            user.role = "admin"
            user.hashed_password = get_password_hash("admin123")
        else:
            print(f"Creating new superadmin {email}...")
            user = User(
                email=email,
                full_name="System Auditor",
                hashed_password=get_password_hash("admin123"),
                is_active=True,
                is_superuser=True,
                role="admin",
                phone="+5511999999999"
            )
            db.add(user)
        
        db.commit()
        print("Admin user created/updated successfully.")
        print(f"Credentials: {email} / admin123")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
