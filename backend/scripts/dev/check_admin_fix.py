from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError
from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

print("Starting check_admin_fix.py...")

db = SessionLocal()
try:
    print("Checking for admin user...")
    admin_email = "admin@algorbrasil.com.br"
    user = db.query(User).filter(User.email == admin_email).first()
    
    if user:
        print("User FOUND.")
        print(f"Email: {user.email}")
        print(f"Role: {user.role}")
    else:
        print("User NOT found. Creating...")
        new_user = User(
            email=admin_email,
            hashed_password=get_password_hash("admin123"),
            full_name="Administrador Algor",
            role="admin",
            is_superuser=True
        )
        db.add(new_user)
        db.commit()
        print("User CREATED successfully.")

except OperationalError as e:
    print(f"OperationalError: {e}")
    # This catches 'no such column' or 'database locked'
except Exception as e:
    print(f"General Error: {e}")
finally:
    db.close()
    print("Done.")
