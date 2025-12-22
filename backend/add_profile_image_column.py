import sqlite3
import os

def add_column():
    db_path = "sql_app.db"
    
    if not os.path.exists(db_path):
        print(f"ERROR: Database file {db_path} not found.")
        return

    print(f"Connecting to {db_path}...")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        # Check if column exists
        cursor.execute("PRAGMA table_info(users)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "profile_image" not in columns:
            print("Adding 'profile_image' column to 'users' table...")
            cursor.execute("ALTER TABLE users ADD COLUMN profile_image TEXT")
            conn.commit()
            print("SUCCESS: Column added.")
        else:
            print("INFO: Column 'profile_image' already exists.")
            
    except Exception as e:
        print(f"ERROR: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    add_column()
