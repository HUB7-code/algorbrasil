import sqlite3
import os

DB_PATH = "sql_app.db"

def debug():
    print(f"Debugando DB em: {os.path.abspath(DB_PATH)}")
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute("SELECT id, email, hashed_password, role, is_active FROM users")
        rows = cursor.fetchall()
        
        print(f"Total Usuários: {len(rows)}")
        for r in rows:
            print(f" - ID: {r[0]} | Email: '{r[1]}' | Hash: {r[2][:10]}... | Role: {r[3]}")
            
        conn.close()
    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    debug()
