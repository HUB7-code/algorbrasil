from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal, engine, Base
from backend.app.models.user import User
from backend.app.models.contact import ContactLog
from backend.app.core.security import get_password_hash

def init_db():
    # 1. Cria todas as tabelas definidas nos Models
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # 2. Verifica se já existe um Admin
        admin_email = "admin@algor.com"
        existing_admin = db.query(User).filter(User.email == admin_email).first()
        
        if not existing_admin:
            print(f"⚙️ Criando usuário Admin inicial ({admin_email})...")
            admin_user = User(
                email=admin_email,
                hashed_password=get_password_hash("admin123"),
                full_name="Administrador Algor",
                role="admin",
                is_superuser=True
            )
            db.add(admin_user)
            db.commit()
            print("✅ Admin criado com sucesso! (Senha: admin123)")
        else:
            print("ℹ️ Usuário Admin já existe.")
            
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Inicializando Banco de Dados...")
    init_db()
    print("🏁 Inicialização concluída.")
