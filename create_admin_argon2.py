import sqlite3
from passlib.context import CryptContext
import os

# Using ARGON2 as seen in source code
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
def get_hash(p): return pwd_context.hash(p)

db_path = "sql_app.db"
if not os.path.exists(db_path):
    print("DB not found in root")
    db_path = "backend/sql_app.db" # Try backend just in case

print(f"Opening {db_path}")
conn = sqlite3.connect(db_path)
c = conn.cursor()

email = "superadmin@algor.com"
try:
    print("Generating Argon2 hash...")
    pwd_hash = get_hash("admin123")
except Exception as e:
    print(f"Hash Gen Error: {e}")
    exit(1)

c.execute("SELECT id FROM users WHERE email=?", (email,))
row = c.fetchone()
if row:
    print("Updating...")
    c.execute("UPDATE users SET hashed_password=?, is_active=1, is_superuser=1, role='admin' WHERE email=?", (pwd_hash, email))
else:
    print("Inserting...")
    c.execute("INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser, role, phone) VALUES (?, ?, 'Super Admin', 1, 1, 'admin', '+55000')", (email, pwd_hash))

conn.commit()
print("User Created/Updated: superadmin@algor.com / admin123")
conn.close()
