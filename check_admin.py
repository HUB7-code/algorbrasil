from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal
from backend.app.models.user import User

db = SessionLocal()
try:
    user = db.query(User).filter(User.email == "admin@algorbrasil.com.br").first()
    if user:
        print(f"User found: {user.email}, Role: {user.role}, Phone col exists: {hasattr(user, 'phone')}")
    else:
        print("User NOT found")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()
