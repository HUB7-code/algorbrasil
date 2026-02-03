import sqlite3
import os

DEFAULT_PATH = "sql_app.db"

def fix_schema():
    db_path = DEFAULT_PATH
    
    # Resolve path logic
    if not os.path.exists(db_path):
        if os.path.exists("backend/sql_app.db"):
             db_path = "backend/sql_app.db"
        else:
            print(f"⚠️  Database not found at {db_path} or backend/sql_app.db - Assuming new DB will be created by app.")
            # We can't fix a DB that doesn't exist.
            # But maybe we should check if we can connect to create it? 
            # SQLite creates on connect. Let's just create it at root if missing.
            db_path = "sql_app.db" 
    
    print(f"🔧 Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 1. Check AI_ASSETS for organization_id
    try:
        cursor.execute("SELECT organization_id FROM ai_assets LIMIT 1")
    except sqlite3.OperationalError:
        print("⚠️ 'organization_id' missing in 'ai_assets'. Adding it...")
        try:
            cursor.execute("ALTER TABLE ai_assets ADD COLUMN organization_id INTEGER REFERENCES organizations(id)")
            conn.commit()
            print("✅ Added 'organization_id' to 'ai_assets'.")
        except Exception as e:
            print(f"❌ Failed to add column: {e}")

    # 2. Check USERS for phone
    try:
        cursor.execute("SELECT phone FROM users LIMIT 1")
    except sqlite3.OperationalError:
        print("⚠️ 'phone' missing in 'users'. Adding it...")
        try:
            cursor.execute("ALTER TABLE users ADD COLUMN phone VARCHAR")
            conn.commit()
            print("✅ Added 'phone' to 'users'.")
        except Exception as e:
            print(f"❌ Failed to add column: {e}")

    # 3. Check USERS for role
    try:
        cursor.execute("SELECT role FROM users LIMIT 1")
    except sqlite3.OperationalError:
        print("⚠️ 'role' missing in 'users'. Adding it...")
        try:
            cursor.execute("ALTER TABLE users ADD COLUMN role VARCHAR DEFAULT 'user'")
            conn.commit()
            print("✅ Added 'role' to 'users'.")
        except Exception as e:
             print(f"❌ Failed to add column: {e}")

    conn.close()
    print("🏁 Schema check complete.")

if __name__ == "__main__":
    fix_schema()
