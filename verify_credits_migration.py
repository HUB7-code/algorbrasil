import sqlite3

conn = sqlite3.connect("sql_app.db")
cursor = conn.cursor()

print("--- Checking Columns ---")
cursor.execute("PRAGMA table_info(organizations)")
for row in cursor.fetchall():
    print(row)

print("\n--- Checking Data ---")
cursor.execute("SELECT id, name, plan_tier, credits_balance FROM organizations")
rows = cursor.fetchall()
if not rows:
    print("No organizations found.")
else:
    for row in rows:
        print(row)

conn.close()
