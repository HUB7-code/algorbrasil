from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

def create_active_user():
    db = SessionLocal()
    email = "consultant_active@algor.com"
    pwd = "password123"
    
    user = db.query(User).filter(User.email == email).first()
    if user:
        print(f"User {email} exists. Updating password and activating.")
        user.hashed_password = get_password_hash(pwd)
        user.is_active = True
        db.commit()
    else:
        print(f"Creating user {email}...")
        new_user = User(
            email=email,
            hashed_password=get_password_hash(pwd),
            full_name="Consultant Active",
            role="subscriber",
            is_active=True
        )
        db.add(new_user)
        db.commit()
        
    print("Done.")

if __name__ == "__main__":
    create_active_user()
