
import sqlite3

def delete_user(email):
    try:
        conn = sqlite3.connect('sql_app.db')
        cursor = conn.cursor()
        
        # 1. Verificar se existe
        cursor.execute("SELECT id, full_name FROM users WHERE email = ?", (email,))
        user = cursor.fetchone()
        
        if not user:
            print(f"❌ Usuário {email} não encontrado.")
            return

        print(f"🔍 Encontrado: ID {user[0]} - {user[1]}")

        # 2. Deletar dependências (opcional, mas bom pra limpeza)
        # O SQLite aqui não tem CASCADE ativado por padrão na conexão simples,
        # então vamos deletar o user e deixar o resto orfão ou deletar se necessário.
        # Para teste rápido, deletar o USERS é suficiente se não houver FK constraint forte.
        
        cursor.execute("DELETE FROM users WHERE email = ?", (email,))
        conn.commit()
        
        print(f"✅ Usuário {email} deletado com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro ao deletar: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    delete_user("edisio.nascimento@outlook.com")
