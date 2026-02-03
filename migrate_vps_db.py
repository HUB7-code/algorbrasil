
import sqlite3
import sys
import os

# Caminho do banco de dados (ajuste se necessário, mas geralmente é este no Docker)
# Tenta pegar do volume ou local
files = [
    "./backend/app.db",
    "/app/backend/app.db",
    "./app.db"
]

db_path = None
for f in files:
    if os.path.exists(f):
        db_path = f
        break

if not db_path:
    print("❌ Banco de dados app.db não encontrado nos caminhos padrões.")
    # Fallback to create if strict needed, but better to fail here
    sys.exit(1)

print(f"📦 Conectando ao banco: {db_path}")

try:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. Adicionar coluna is_totp_enabled
    try:
        print("Adicionando coluna 'is_totp_enabled'...")
        cursor.execute("ALTER TABLE users ADD COLUMN is_totp_enabled BOOLEAN DEFAULT 0")
        print("✅ Coluna 'is_totp_enabled' adicionada.")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("⚠️ Coluna 'is_totp_enabled' já existe.")
        else:
            print(f"❌ Erro ao adicionar coluna: {e}")

    # 2. Adicionar coluna totp_secret
    try:
        print("Adicionando coluna 'totp_secret'...")
        cursor.execute("ALTER TABLE users ADD COLUMN totp_secret VARCHAR")
        print("✅ Coluna 'totp_secret' adicionada.")
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e):
            print("⚠️ Coluna 'totp_secret' já existe.")
        else:
            print(f"❌ Erro ao adicionar coluna: {e}")

    conn.commit()
    conn.close()
    print("\n🚀 Migração concluída com sucesso!")

except Exception as e:
    print(f"\n❌ Erro crítico: {e}")
