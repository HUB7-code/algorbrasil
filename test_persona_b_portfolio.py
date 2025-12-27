import requests

BASE_URL = "http://localhost:8000/api/v1"
EMAIL = "admin@algor.com"
PASSWORD = "admin" # Agora sim garantido pelo reset_admin_sql.py

def run_portfolio_test():
    print("--- TEST PERSONA B: CLIENT PORTFOLIO ---")
    
    # 1. Login Consultant
    print(f"\n1. Authenticating Consultant: {EMAIL}")
    try:
        login_payload = {"email": EMAIL, "password": PASSWORD} # auth.py uses 'email' in UserLogin schema? 
        # Wait, usually OAuth2 uses username form data, but UserLogin pydantic uses JSON?
        # Let's check auth.py line 213: user_data: UserLogin
        # UserLogin is likely {email: str, password: str}
        # So we send JSON, not data.
        resp = requests.post(f"{BASE_URL}/login", json=login_payload)
        
        if resp.status_code != 200:
            print(f"   Login failed: {resp.status_code} {resp.text}")
            return
            
        token = resp.json()['access_token']
        print("   Success. Token obtained.")
        
    except Exception as e:
        print(f"   Auth failed: {e}")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Create 3 Clients
    clients = ["Client Alpha Corp", "Client Beta Ltd", "Client Gamma Inc"]
    
    print(f"\n2. Creating {len(clients)} Client Workspaces...")
    for client_name in clients:
        payload = {"name": client_name}
        resp = requests.post(f"{BASE_URL}/organizations/", json=payload, headers=headers)
        if resp.status_code == 200:
            data = resp.json()
            print(f"   Created: {data['name']} (ID: {data['id']}) - Credits: {data.get('credits_balance')}")
        else:
            print(f"   Failed to create {client_name}: {resp.text}")

    # 3. List Portfolio
    print(f"\n3. Fetching Portfolio (My Clients)...")
    resp_list = requests.get(f"{BASE_URL}/organizations/me", headers=headers)
    orgs = resp_list.json()
    
    print(f"   Total Workspaces Found: {len(orgs)}")
    print("   --- LIST START ---")
    for org in orgs:
        role = org['role']
        print(f"   - {org['name']} (Role: {role}, Tier: {org.get('plan_tier', 'N/A')})")
    print("   --- LIST END ---")
    
    if len(orgs) >= 4: # Default + 3 created
        print("\n✅ TEST PASSED: Consultant successfully manages multiple clients.")
    else:
        print("\n⚠️ TEST WARNING: Number of orgs lower than expected.")

if __name__ == "__main__":
    run_portfolio_test()
