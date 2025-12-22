import sqlite3
import os

def check_partners():
    db_path = "sql_app.db"
    if not os.path.exists(db_path):
        print(f"ERROR: {db_path} not found.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='partner_applications'")
        table = cursor.fetchone()
        if not table:
            print("Table 'partner_applications' DOES NOT EXIST.")
            return

        # Count rows
        cursor.execute("SELECT count(*) FROM partner_applications")
        count = cursor.fetchone()[0]
        print(f"Total Applications: {count}")

        if count > 0:
            cursor.execute("SELECT id, full_name, email, status FROM partner_applications")
            rows = cursor.fetchall()
            for r in rows:
                print(r)
    except Exception as e:
        print(f"Error: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    check_partners()
