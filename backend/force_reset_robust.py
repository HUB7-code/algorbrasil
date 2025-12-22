import sqlite3
import os
from passlib.context import CryptContext

# Setup password context (Argon2)
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def fix_db():
    db_path = "sql_app.db"
    
    if not os.path.exists(db_path):
        print(f"ERROR: Database file {db_path} not found in current directory.")
        return

    print(f"Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # 1. Fix admin@algorbrasil.com.br
        email1 = "admin@algorbrasil.com.br"
        pass1 = "admin123"
        hash1 = get_password_hash(pass1)
        
        # Check if exists
        cursor.execute("SELECT id FROM users WHERE email = ?", (email1,))
        row1 = cursor.fetchone()
        
        if row1:
            print(f"Updating {email1}...")
            cursor.execute("""
                UPDATE users 
                SET hashed_password = ?, role = 'admin', is_active = 1, is_superuser = 1
                WHERE email = ?
            """, (hash1, email1))
        else:
            print(f"Creating {email1}...")
            cursor.execute("""
                INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
                VALUES (?, ?, ?, 'admin', 1, 1)
            """, (email1, hash1, "Master Admin"))

        # 2. Fix admin@algor.com
        email2 = "admin@algor.com"
        pass2 = "admin"
        hash2 = get_password_hash(pass2)
        
        cursor.execute("SELECT id FROM users WHERE email = ?", (email2,))
        row2 = cursor.fetchone()
        
        if row2:
            print(f"Updating {email2}...")
            cursor.execute("""
                UPDATE users 
                SET hashed_password = ?, role = 'admin', is_active = 1, is_superuser = 1
                WHERE email = ?
            """, (hash2, email2))
        else:
            print(f"Creating {email2}...")
            cursor.execute("""
                INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser)
                VALUES (?, ?, ?, 'admin', 1, 1)
            """, (email2, hash2, "Custom Admin"))

        conn.commit()
        print("--- SUCCESS: Users updated/created. ---")
        
    except Exception as e:
        print(f"ERROR: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    fix_db()
