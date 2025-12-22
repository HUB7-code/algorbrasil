from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    email = "admin@algor.com"
    password = "admin"
    
    existing = db.query(User).filter(User.email == email).first()
    if existing:
        print(f"User {email} already exists. Updating password to '{password}'...")
        existing.hashed_password = get_password_hash(password)
        existing.role = "admin"
        existing.is_superuser = True
    else:
        print(f"Creating user {email}...")
        user = User(
            email=email,
            hashed_password=get_password_hash(password),
            full_name="Admin User",
            role="admin",
            is_superuser=True
        )
        db.add(user)
    
    db.commit()
    print("Done.")
    db.close()

if __name__ == "__main__":
    create_admin()
