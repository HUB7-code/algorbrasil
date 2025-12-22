import sys
import os

# Ensure we are using absolute imports from the root
# No sys.path hacks that might duplicate entries

from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

def reset_admin():
    db = SessionLocal()
    try:
        print("--- FIXING ADMIN CREDENTIALS ---")
        
        # 1. Fix admin@algorbrasil.com.br
        email1 = "admin@algorbrasil.com.br"
        pass1 = "admin123"
        user1 = db.query(User).filter(User.email == email1).first()
        if user1:
            print(f"Updating password for {email1}...")
            user1.hashed_password = get_password_hash(pass1)
            user1.role = "admin"
            user1.is_active = True
        else:
            print(f"Creating user {email1}...")
            user1 = User(
                email=email1,
                hashed_password=get_password_hash(pass1),
                full_name="Master Admin",
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(user1)
        
        # 2. Fix admin@algor.com (Backup)
        email2 = "admin@algor.com"
        # pass2 = "admin"  <-- Password policy might require longer? Using admin123 for safety/consistency or just 'admin' as requested.
        pass2 = "admin" 
        user2 = db.query(User).filter(User.email == email2).first()
        if user2:
            print(f"Updating password for {email2}...")
            user2.hashed_password = get_password_hash(pass2)
            user2.role = "admin"
            user2.is_active = True
        else:
            print(f"Creating user {email2}...")
            user2 = User(
                email=email2,
                hashed_password=get_password_hash(pass2),
                full_name="Custom Admin",
                role="admin",
                is_active=True,
                is_superuser=True
            )
            db.add(user2)

        db.commit()
        print("--- SUCCESS ---")
        print(f"1. {email1} / {pass1}")
        print(f"2. {email2} / {pass2}")
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()
