
import sqlite3
import sys
import os

# Ajuste o caminho se necessário (ex: backend/sql_app.db)
DB_PATH = "backend/sql_app.db" if os.path.exists("backend/sql_app.db") else "sql_app.db"

def usage():
    print("Uso: python3 manage_vps_user.py <email> [delete|activate]")
    print("Ex: python3 manage_vps_user.py teste@email.com")
    print("Ex: python3 manage_vps_user.py teste@email.com delete")
    sys.exit(1)

def main():
    if len(sys.argv) < 2:
        usage()

    email = sys.argv[1]
    action = sys.argv[2] if len(sys.argv) > 2 else "check"

    if not os.path.exists(DB_PATH):
        print(f"❌ Banco de dados não encontrado em: {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # 1. Buscar Usuário
    cursor.execute("SELECT id, email, is_active, role FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()

    if not user:
        print(f"❌ Usuário '{email}' não encontrado no banco.")
        conn.close()
        return

    print(f"✅ Usuário Encontrado:")
    print(f" - ID: {user[0]}")
    print(f" - Email: {user[1]}")
    print(f" - Ativo: {user[2]}")
    print(f" - Role: {user[3]}")

    # 2. Executar Ação
    if action == "delete":
        print(f"\n🗑️ Deletando usuário {email}...")
        try:
            # Deletar OrganizationMembers primeiro (FK)
            cursor.execute("DELETE FROM organization_members WHERE user_id = ?", (user[0],))
            # Deletar Organizations (Owner)
            cursor.execute("DELETE FROM organizations WHERE owner_id = ?", (user[0],))
            # Deletar User
            cursor.execute("DELETE FROM users WHERE id = ?", (user[0],))
            conn.commit()
            print("✅ Usuário e dados relacionados deletados com sucesso!")
            print("👉 Agora você pode tentar o cadastro novamente.")
        except Exception as e:
            print(f"❌ Erro ao deletar: {e}")

    elif action == "activate":
        print(f"\n🔓 Ativando manualmnte usuário {email}...")
        cursor.execute("UPDATE users SET is_active = 1 WHERE id = ?", (user[0],))
        conn.commit()
        print("✅ Usuário ativado! Pode fazer login.")

    conn.close()

if __name__ == "__main__":
    main()
