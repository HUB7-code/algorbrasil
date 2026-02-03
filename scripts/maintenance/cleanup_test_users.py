import sqlite3
import os

DB_FILE = "sql_app.db"

def cleanup_users_sql():
    if not os.path.exists(DB_FILE):
        print(f"❌ Banco de dados {DB_FILE} não encontrado.")
        return

    try:
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        
        # Lista de admins para preservar
        admins = ['admin@algor.com', 'admin@algorbrasil.com.br']
        placeholders = ', '.join(['?'] * len(admins))
        
        # Verificar quantos existem
        cursor.execute(f"SELECT email FROM users WHERE email NOT IN ({placeholders})", admins)
        users = cursor.fetchall()
        
        if not users:
            print("✅ Nenhum usuário de teste para remover.")
        else:
            print(f"🗑️ Removendo {len(users)} usuários de teste...")
            for user in users:
                print(f"   - {user[0]}")
            
            # Deletar
            cursor.execute(f"DELETE FROM users WHERE email NOT IN ({placeholders})", admins)
            conn.commit()
            print("✨ Limpeza concluída! Apenas admins foram preservados.")
            
    except Exception as e:
        print(f"❌ Erro SQL: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    cleanup_users_sql()
