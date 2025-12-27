import sqlite3

HASH = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"
EMAIL = "admin@algor.com"

def update_password():
    try:
        conn = sqlite3.connect('sql_app.db')
        cursor = conn.cursor()
        
        cursor.execute("UPDATE users SET hashed_password = ? WHERE email = ?", (HASH, EMAIL))
        
        if cursor.rowcount > 0:
            conn.commit()
            print(f"✅ Sucesso: Senha de '{EMAIL}' atualizada para 'admin'.")
        else:
            print(f"❌ Erro: Usuário '{EMAIL}' não encontrado.")
            
        conn.close()
    except Exception as e:
        print(f"❌ Erro SQL: {e}")

if __name__ == "__main__":
    update_password()
