import sqlite3

# Hash pré-calculado para a senha "admin"
hashed_pw = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW"

conn = sqlite3.connect('sql_app.db')
cursor = conn.cursor()

try:
    # 1. Inserir Usuário
    print("Inserindo Usuário Admin...")
    cursor.execute("""
        INSERT INTO users (email, hashed_password, full_name, role, is_active, is_superuser, is_totp_enabled)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, ("admin@algor.com", hashed_pw, "Super Admin", "admin", 1, 1, 0))
    user_id = cursor.lastrowid
    print(f"✅ Usuário inserido com ID: {user_id}")

    # 2. Inserir Organização (Para não travar dashboard)
    print("Inserindo Organização...")
    cursor.execute("""
        INSERT INTO organizations (name, owner_id, cnpj, plan_tier, credits_balance)
        VALUES (?, ?, ?, ?, ?)
    """, ("Algor HQ", user_id, "00.000.000/0001-91", "enterprise", 9999))
    print("✅ Organização inserida.")

    conn.commit()
    print("💾 Commit realizado com sucesso!")

except sqlite3.IntegrityError:
    print("⚠️  Usuário já existe. Resetando senha...")
    cursor.execute("UPDATE users SET hashed_password = ? WHERE email = ?", (hashed_pw, "admin@algor.com"))
    conn.commit()
    print("✅ Senha resetada para 'admin'.")

conn.close()
