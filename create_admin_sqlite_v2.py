import sqlite3
from passlib.context import CryptContext
import os

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def get_hash(p): return pwd_context.hash(p)

# Try root first, then backend/
db_path = "sql_app.db"
if not os.path.exists(db_path):
    print(f"{db_path} not found. Trying backend/sql_app.db")
    db_path = "backend/sql_app.db"
    
if not os.path.exists(db_path):
    print("DB NOT FOUND ANYWHERE.")
    exit(1)

print(f"Using DB: {db_path}")

conn = sqlite3.connect(db_path)
c = conn.cursor()

email = "superadmin@algor.com"
pwd_hash = get_hash("admin123")

try:
    c.execute("SELECT id FROM users WHERE email=?", (email,))
    row = c.fetchone()

    if row:
        print("Updating existing user...")
        c.execute("UPDATE users SET hashed_password=?, is_active=1, is_superuser=1, role='admin' WHERE email=?", (pwd_hash, email))
    else:
        print("Inserting new user...")
        c.execute("""
            INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser, role, phone)
            VALUES (?, ?, 'Super Admin', 1, 1, 'admin', '+55000000000')
        """, (email, pwd_hash))

    conn.commit()
    print("Done. Credentials: superadmin@algor.com / admin123")
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
