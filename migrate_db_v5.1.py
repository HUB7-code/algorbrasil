import sqlite3
from backend.app.core.config import settings

def migrate_db():
    db_path = settings.SQLALCHEMY_DATABASE_URI.replace("sqlite:///", "")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f"🔧 Migrando banco de dados: {db_path}")
    
    try:
        # Create Organizations table if missing (Fix for FK error)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS organizations (
                id INTEGER PRIMARY KEY,
                name VARCHAR,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY,
                name VARCHAR
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ai_assets (
                id INTEGER PRIMARY KEY,
                name VARCHAR
            )
        """)
        
        # Check if column exists
        cursor.execute("PRAGMA table_info(governance_traces)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "previous_hash" not in columns:
            print("Adding previous_hash column...")
            cursor.execute("ALTER TABLE governance_traces ADD COLUMN previous_hash VARCHAR")
            
        if "block_hash" not in columns:
            print("Adding block_hash column...")
            cursor.execute("ALTER TABLE governance_traces ADD COLUMN block_hash VARCHAR")
            
        conn.commit()
        print("✅ Migração concluída com sucesso.")
        
    except Exception as e:
        print(f"❌ Erro na migração: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_db()
