import sqlite3
import os
from passlib.hash import argon2

def reset_password():
    db_path = "sql_app.db"
    if not os.path.exists(db_path): db_path = "backend/app/sql_app.db"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print("--- Users in DB ---")
    cursor.execute("SELECT id, email, role, is_active FROM users")
    rows = cursor.fetchall()
    for r in rows:
        print(r)
    print("-------------------")
    
    new_password = "admin"
    hashed = argon2.hash(new_password)
    email = "admin@algor.com"
    
    if any(r[1] == email for r in rows):
        cursor.execute("UPDATE users SET hashed_password = ?, is_active = 1 WHERE email = ?", (hashed, email))
        conn.commit()
        print("Updated admin.")
    else:
        print("Inserting admin...")
        cursor.execute("""
            INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser, is_totp_enabled)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (email, hashed, "Super Admin", "admin", 1, 1, 0))
        conn.commit()
        print("Inserted admin.")

    conn.close()

if __name__ == "__main__":
    reset_password()
