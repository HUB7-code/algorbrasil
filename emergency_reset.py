from backend.app.db.session import SessionLocal
from backend.app.models.user import User
from backend.app.core.security import get_password_hash, verify_password

def emergency_reset():
    db = SessionLocal()
    try:
        email = "admin@algor.com"
        new_password = "admin"
        
        print(f"🔍 Buscando usuário: {email}")
        user = db.query(User).filter(User.email == email).first()
        
        if not user:
            print("❌ USUÁRIO NÃO ENCONTRADO! (Algo muito errado aconteceu)")
            return

        print(f"✅ Usuário encontrado (ID {user.id}). Resetando senha...")
        
        # Gerar novo hash usando EXATAMENTE a mesma função do sistema
        new_hash = get_password_hash(new_password)
        user.hashed_password = new_hash
        db.commit()
        
        print(f"💾 Senha atualizada para '{new_password}'")
        print(f"   Hash gerado: {new_hash}")
        
        # Prova real
        if verify_password(new_password, user.hashed_password):
            print("✅ Verificação Local: SUCESSO! A senha bate com o hash.")
        else:
            print("❌ Verificação Local: FALHA! O hash gerado não bate.")
            
    except Exception as e:
        print(f"❌ Erro: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    emergency_reset()
