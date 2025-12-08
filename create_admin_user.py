import sys
import os

# Adiciona o diretório atual ao path para importar os módulos do backend
sys.path.append(os.getcwd())

from sqlalchemy.orm import Session
from backend.app.db.session import SessionLocal, engine
from backend.app.models.user import User, Base
from backend.app.core.security import get_password_hash

def create_admin_user():
    # 1. Garantir que as tabelas existam
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    email = "admin@algorbrasil.com.br"
    raw_password = "admin"
    
    # 2. Verificar se já existe
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print(f"[-] O usuário {email} já existe no banco de dados.")
        db.close()
        return

    # 3. Criar novo usuário
    new_user = User(
        email=email,
        hashed_password=get_password_hash(raw_password),
        is_active=True,
        role="admin"
    )
    
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        print(f"[+] SUCESSO! Usuário criado.")
        print(f"    Email: {email}")
        print(f"    Senha: {raw_password}")
        print(f"    Agora você pode fazer login em login.html")
    except Exception as e:
        print(f"[!] Erro ao criar usuário: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin_user()
