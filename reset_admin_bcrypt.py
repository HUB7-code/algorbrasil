import sqlite3
import os
# We will use the exact same logic as the backend
from passlib.context import CryptContext

# Replicating backend logic
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_hash(p): 
    return pwd_context.hash(p)

db_path = "backend/sql_app.db"
if not os.path.exists(db_path):
    print("DB not found in backend/")
    db_path = "sql_app.db"

conn = sqlite3.connect(db_path)
c = conn.cursor()

email = "admin@algor.com"
pwd = "admin123"

try:
    print(f"Hashing password '{pwd}' with bcrypt...")
    hashed = get_hash(pwd)
    print(f"Hash info: {hashed[:10]}...")
    
    c.execute("SELECT id FROM users WHERE email=?", (email,))
    row = c.fetchone()
    
    if row:
        print(f"Updating user {email}...")
        c.execute("UPDATE users SET hashed_password=?, is_active=1, is_superuser=1, role='admin' WHERE email=?", (hashed, email))
    else:
        print(f"Creating user {email}...")
        c.execute("INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser, role, phone) VALUES (?, ?, 'Admin User', 1, 1, 'admin', '+55000')", (email, hashed))
        
    conn.commit()
    print("Success. Admin credentials reset: admin@algor.com / admin123")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    conn.close()
