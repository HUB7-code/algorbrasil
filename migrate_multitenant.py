import sqlite3
import os

DB_PATH = "sql_app.db"

def migrate():
    if not os.path.exists(DB_PATH):
        print(f"Database {DB_PATH} not found!")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print("Iniciando Migração Multi-Tenant...")

    # 1. Criar Tabela Organizations
    try:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS organizations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR,
            cnpj VARCHAR,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME,
            owner_id INTEGER,
            FOREIGN KEY(owner_id) REFERENCES users(id)
        );
        """)
        cursor.execute("CREATE INDEX IF NOT EXISTS ix_organizations_id ON organizations (id);")
        cursor.execute("CREATE INDEX IF NOT EXISTS ix_organizations_name ON organizations (name);")
        cursor.execute("CREATE UNIQUE INDEX IF NOT EXISTS ix_organizations_cnpj ON organizations (cnpj);")
        print("✅ Tabela 'organizations' verificada/criada.")
    except Exception as e:
        print(f"❌ Erro ao criar 'organizations': {e}")

    # 2. Criar Tabela Organization Members
    try:
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS organization_members (
            user_id INTEGER,
            organization_id INTEGER,
            role VARCHAR DEFAULT 'member',
            joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (user_id, organization_id),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(organization_id) REFERENCES organizations(id)
        );
        """)
        print("✅ Tabela 'organization_members' verificada/criada.")
    except Exception as e:
        print(f"❌ Erro ao criar 'organization_members': {e}")

    # 3. Adicionar coluna organization_id em ai_assets
    try:
        # Verifica se a coluna já existe
        cursor.execute("PRAGMA table_info(ai_assets)")
        columns = [info[1] for info in cursor.fetchall()]
        if "organization_id" not in columns:
            cursor.execute("ALTER TABLE ai_assets ADD COLUMN organization_id INTEGER REFERENCES organizations(id)")
            print("✅ Coluna 'organization_id' adicionada em 'ai_assets'.")
        else:
            print("ℹ️ Coluna 'organization_id' já existe em 'ai_assets'.")
    except Exception as e:
        print(f"❌ Erro ao alterar 'ai_assets': {e}")

    # 4. Adicionar coluna organization_id em risk_register
    try:
        # Verifica se a coluna já existe
        cursor.execute("PRAGMA table_info(risk_register)")
        columns = [info[1] for info in cursor.fetchall()]
        if "organization_id" not in columns:
            cursor.execute("ALTER TABLE risk_register ADD COLUMN organization_id INTEGER REFERENCES organizations(id)")
            print("✅ Coluna 'organization_id' adicionada em 'risk_register'.")
        else:
            print("ℹ️ Coluna 'organization_id' já existe em 'risk_register'.")
    except Exception as e:
        print(f"❌ Erro ao alterar 'risk_register': {e}")

    # 5. Adicionar coluna organization_id em assessments
    try:
        # Verifica se a tabela existe primeiro
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='assessments'")
        if cursor.fetchone():
            # Verifica se a coluna já existe
            cursor.execute("PRAGMA table_info(assessments)")
            columns = [info[1] for info in cursor.fetchall()]
            if "organization_id" not in columns:
                cursor.execute("ALTER TABLE assessments ADD COLUMN organization_id INTEGER REFERENCES organizations(id)")
                print("✅ Coluna 'organization_id' adicionada em 'assessments'.")
            else:
                print("ℹ️ Coluna 'organization_id' já existe em 'assessments'.")
        else:
            print("⚠️ Tabela 'assessments' não encontrada (provavelmente ainda não criada via app).")
    except Exception as e:
        print(f"❌ Erro ao alterar 'assessments': {e}")

    conn.commit()
    conn.close()
    print("Migração Concluída com Sucesso! 🚀")

if __name__ == "__main__":
    migrate()
