from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import verify_password

def diagnosis():
    db = SessionLocal()
    try:
        email = "admin@algor.com"
        password = "admin"
        
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            print(f"❌ USUÁRIO NÃO ENCONTRADO NO BANCO!")
            print(f"   Procurando por: {email}")
            print(f"   Usuários existentes: {[u.email for u in db.query(User).all()]}")
            return

        print(f"✅ Usuário encontrado: {user.email} (ID: {user.id})")
        
        if verify_password(password, user.hashed_password):
            print(f"✅ SENHA CORRETA! O login deveria funcionar.")
        else:
            print(f"❌ SENHA INVÁLIDA NO BANCO!")
            print(f"   Hash atual: {user.hashed_password[:10]}...")
            
    finally:
        db.close()

if __name__ == "__main__":
    diagnosis()
