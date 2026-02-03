from backend.app.db.session import SessionLocal, engine
from backend.app.models.user import User
from backend.app.core.security import get_password_hash

# Garantir que as tabelas existem (importar todos os models)
from backend.app.models import user, assessment, profiles, audit, risk, lms, payment, project, organization, ai_asset, governance

def create_admin():
    db = SessionLocal()
    try:
        email = "admin@algor.com"
        password = "admin"
        
        existing_user = db.query(User).filter(User.email == email).first()
        
        if existing_user:
            print(f"✅ Usuário {email} já existe. Atualizando senha para garantir acesso...")
            existing_user.hashed_password = get_password_hash(password)
            existing_user.role = "admin"
            existing_user.is_active = True
            db.commit()
            print("🔐 Senha atualizada com sucesso.")
        else:
            print(f"➕ Criando novo super-usuário: {email}")
            new_user = User(
                email=email,
                hashed_password=get_password_hash(password),
                full_name="Algor Admin",
                role="admin",
                is_active=True,
                is_totp_enabled=False
            )
            db.add(new_user)
            db.commit()
            print("✅ Usuário criado com sucesso.")
            
    except Exception as e:
        print(f"❌ Erro ao criar admin: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
