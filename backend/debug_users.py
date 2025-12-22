from backend.app.db.session import SessionLocal
from backend.app.models.user import User

def list_users():
    db = SessionLocal()
    users = db.query(User).all()
    print(f"Total Users: {len(users)}")
    for u in users:
        print(f"User: {u.email} | Role: {u.role}")
    db.close()

if __name__ == "__main__":
    list_users()
