import sys
import os

# Adicionar o diretório raiz ao path para importar os módulos do backend
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from backend.app.db.session import SessionLocal
from backend.app.models.user import User

def approve_user(email):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"❌ Usuário {email} não encontrado no banco de dados.")
            return
        
        if user.is_active:
             print(f"⚠️ O usuário {email} JÁ ESTÁ ATIVO.")
             return

        user.is_active = True
        db.commit()
        print(f"✅ SUCESSO! O usuário {email} foi ativado manualmente.")
        print("➡️  Agora você pode fazer login.")
        
    except Exception as e:
        print(f"Erro: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python approve_user_manual.py <email>")
    else:
        approve_user(sys.argv[1])
