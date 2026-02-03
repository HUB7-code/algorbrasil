import sys
import os
import traceback

# Add project root to sys.path
sys.path.append(os.getcwd())

from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import verify_password

def test_login_crash():
    print("🚀 Iniciando teste de reprodução de crash no login...")
    db = SessionLocal()
    try:
        email = "admin@algor.com"
        password = "admin"
        
        print(f"1. Buscando usuário {email}...")
        # This executes the SQL query. If columns are missing, it might work here but fail on access or fail here.
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            print("❌ Usuário não encontrado.")
            return

        print(f"✅ Usuário encontrado: ID {user.id}")
        
        print("2. Acessando hash da senha...")
        db_hash = user.hashed_password
        print(f"   Hash: {db_hash[:20]}...")

        print("3. Verificando senha...")
        is_valid = verify_password(password, db_hash)
        print(f"   Senha válida? {is_valid}")

        print("4. Acessando coluna is_totp_enabled (Crítico)...")
        # Accessing this attribute will trigger a lazy load or check if not loaded eagerly
        totp_status = user.is_totp_enabled
        print(f"   is_totp_enabled: {totp_status}")

        print("✅ Teste finalizado SEM CRASH.")
        
    except Exception:
        print("\n❌ CRASH DETECTADO!")
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    test_login_crash()
