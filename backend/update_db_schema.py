
import sqlite3

def add_columns():
    conn = sqlite3.connect('sql_app.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("ALTER TABLE users ADD COLUMN totp_secret VARCHAR")
        print("✅ Added 'totp_secret' column.")
    except sqlite3.OperationalError as e:
        print(f"ℹ️ Column 'totp_secret' probably exists: {e}")

    try:
        cursor.execute("ALTER TABLE users ADD COLUMN is_totp_enabled BOOLEAN DEFAULT 0")
        print("✅ Added 'is_totp_enabled' column.")
    except sqlite3.OperationalError as e:
        print(f"ℹ️ Column 'is_totp_enabled' probably exists: {e}")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    add_columns()
