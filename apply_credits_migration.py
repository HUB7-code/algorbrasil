import sqlite3
import os

DB_PATH = "sql_app.db"

def migrate():
    if not os.path.exists(DB_PATH):
        print(f"Database {DB_PATH} not found.")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    try:
        # Check if columns exist
        cursor.execute("PRAGMA table_info(organizations)")
        columns = [info[1] for info in cursor.fetchall()]

        if "plan_tier" not in columns:
            print("Adding 'plan_tier' column...")
            cursor.execute("ALTER TABLE organizations ADD COLUMN plan_tier TEXT DEFAULT 'free'")
        else:
            print("'plan_tier' column already exists.")

        if "credits_balance" not in columns:
            print("Adding 'credits_balance' column...")
            cursor.execute("ALTER TABLE organizations ADD COLUMN credits_balance INTEGER DEFAULT 3")
        else:
            print("'credits_balance' column already exists.")
            
        conn.commit()
        print("Migration completed successfully.")

    except Exception as e:
        print(f"Error during migration: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
