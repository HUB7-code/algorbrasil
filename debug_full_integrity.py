import sqlite3
import os

# Define globally, but logic inside function handles path selection
DEFAULT_DB_PATH = "sql_app.db"

def check_db():
    db_path = DEFAULT_DB_PATH
    
    if not os.path.exists(db_path):
        # Fallback check
        if os.path.exists("backend/sql_app.db"):
             db_path = "backend/sql_app.db"
        else:
            print(f"❌ Database not found at {db_path} or backend/sql_app.db")
            # Create a simplified report if DB missing
            return

    print(f"✅ Database found at {db_path}")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. List all tables
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [row[0] for row in cursor.fetchall()]
    print(f"\n📊 Found {len(tables)} tables: {', '.join(tables)}")

    # 2. Check Key Tables Schema
    target_tables = {
        "organizations": ["id", "name", "owner_id", "cnpj"],
        "organization_members": ["user_id", "organization_id", "role"],
        "ai_assets": ["id", "owner_id", "organization_id", "name"],
        "users": ["id", "email", "hashed_password", "role"],
        "projects": ["id", "user_id"]
    }

    for table, expected_cols in target_tables.items():
        if table not in tables:
            print(f"❌ CRITICAL: Table '{table}' MISSING!")
            continue

        print(f"\n🔍 Inspecting '{table}':")
        cursor.execute(f"PRAGMA table_info({table})")
        columns_info = cursor.fetchall()
        actual_cols = [col[1] for col in columns_info]
        
        # Check for missing columns
        missing = [col for col in expected_cols if col not in actual_cols]
        if missing:
            print(f"   ⚠️  MISSING COLUMNS: {missing}")
        else:
            print(f"   ✅ All expected columns present: {actual_cols}")

        # Count rows
        cursor.execute(f"SELECT COUNT(*) FROM {table}")
        count = cursor.fetchone()[0]
        print(f"   🔢 Row count: {count}")

    conn.close()

if __name__ == "__main__":
    check_db()
