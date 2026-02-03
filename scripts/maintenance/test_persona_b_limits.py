import requests

BASE_URL = "http://localhost:8000/api/v1"

# Scenario:
# 1. Register a Community Member (Free)
# 2. Check Auto-Created Org (Count = 1)
# 3. Try to Create Client Org (Should Fail 403)
# 4. Promote User to 'pro'
# 5. Try to Create Client Org (Should Succeed)

EMAIL = "community_user@algor.com"
PASSWORD = "password123"

def run_limit_test():
    print("--- TEST PERSONA B: COMMUNITY LIMITS (SANDBOX) ---")
    
    # 1. Register
    print(f"\n1. Registering Community Member: {EMAIL}")
    
    # Pre-clean
    import sqlite3
    try:
        conn = sqlite3.connect("sql_app.db")
        conn.execute("DELETE FROM users WHERE email = ?", (EMAIL,))
        conn.commit()
        conn.close()
    except: pass
    
    try:
        reg_payload = {"email": EMAIL, "password": PASSWORD, "full_name": "Community Member", "phone": "11977776666"}
        r_regs = requests.post(f"{BASE_URL}/signup", json=reg_payload)
        print(f"   Registration Call: {r_regs.status_code} {r_regs.text}")
        
        # Login
        login_payload = {"email": EMAIL, "password": PASSWORD}
        resp = requests.post(f"{BASE_URL}/login", json=login_payload)
        
        if resp.status_code != 200:
            print(f"   Login failed: {resp.status_code}")
            return
            
        token = resp.json()['access_token']
        headers = {"Authorization": f"Bearer {token}"}
        print("   Success. Logged in as Community Member.")
        
    except Exception as e:
        print(f"   Auth error: {e}")
        return

    # 2. Verify Initial State
    print(f"\n2. Verifying Initial Workspaces...")
    resp_orgs = requests.get(f"{BASE_URL}/organizations/me", headers=headers)
    orgs = resp_orgs.json()
    owned = [o for o in orgs if o['role'] == 'owner']
    print(f"   Owned Workspaces: {len(owned)} (Auto-created)")
    
    if len(owned) == 0:
        print("   ⚠️ Strange: No auto-created org found. Creating first one manually...")
        requests.post(f"{BASE_URL}/organizations/", json={"name": "My Personal Sandbox"}, headers=headers)
        owned_count = 1
    else:
        owned_count = len(owned)

    # 3. Try to Exceed Limit
    print(f"\n3. Attempting to Create 2nd Workspace (Should FAIL)...")
    payload = {"name": "Forbidden Client Corp"}
    resp_create = requests.post(f"{BASE_URL}/organizations/", json=payload, headers=headers)
    
    if resp_create.status_code == 403:
        print(f"   ✅ SUCCESS: Blocked with 403. Message: {resp_create.json()['detail']}")
    else:
        print(f"   ❌ FAILURE: Was able to create workspace! Status: {resp_create.status_code}")
        # If it failed, maybe user is already pro or admin?
        
    # 4. Promote User (Simulate 'Associação')
    # Use SQL injection hack via our reset script logic or just assume we have an admin endpoint?
    # We don't have an admin endpoint to promote yet. 
    # Let's use a raw SQL update via python script helper.
    print(f"\n4. Promoting User to 'pro' (Simulating Association Payment)...")
    import sqlite3
    try:
        conn = sqlite3.connect("sql_app.db") 
        # Fallback path if needed
        cursor = conn.cursor()
        cursor.execute("UPDATE users SET role = 'pro' WHERE email = ?", (EMAIL,))
        conn.commit()
        conn.close()
        print("   User promoted via SQL override.")
    except Exception as e:
        print(f"   SQL Error: {e}")

    # 5. Try Again (Should Succeed)
    print(f"\n5. Attempting to Create 2nd Workspace as PRO (Should SUCCEED)...")
    resp_create_pro = requests.post(f"{BASE_URL}/organizations/", json=payload, headers=headers)
    
    if resp_create_pro.status_code == 200:
        print(f"   ✅ SUCCESS: Workspace created! ID: {resp_create_pro.json()['id']}")
    else:
        print(f"   ❌ FAILURE: Still blocked? Status: {resp_create_pro.status_code} {resp_create_pro.text}")
        
    print("\n--- TEST COMPLETE ---")

if __name__ == "__main__":
    run_limit_test()
