import requests
import sys

BASE_URL = "http://localhost:8000/api/v1"
EMAIL = "community_user@algor.com" 
PASSWORD = "password123"

def run_report_test():
    print("--- TEST: ISO 42001 SMART REPORT GENERATION ---")

    # 1. Login
    print(f"\n1. Logging in as {EMAIL}...")
    try:
        login_payload = {"email": EMAIL, "password": PASSWORD}
        resp = requests.post(f"{BASE_URL}/login", json=login_payload)
        
        if resp.status_code != 200:
            # Tentar registrar se o login falhar (caso o banco tenha sido resetado)
            print("   Login failed. Attempting quick registration...")
            reg_payload = {"email": EMAIL, "password": PASSWORD, "full_name": "Test User", "phone": "11999999999"}
            requests.post(f"{BASE_URL}/signup", json=reg_payload)
            resp = requests.post(f"{BASE_URL}/login", json=login_payload)

        if resp.status_code != 200:
            print(f"❌ CRITICAL: Could not auth. Status: {resp.status_code}")
            return

        token = resp.json()['access_token']
        headers = {"Authorization": f"Bearer {token}"}
        print("   ✅ Logged in.")

    except Exception as e:
        print(f"❌ Auth Error: {e}")
        return

    # 2. Get Organization
    print(f"\n2. Fetching Organization...")
    resp_orgs = requests.get(f"{BASE_URL}/organizations/me", headers=headers)
    orgs = resp_orgs.json()
    
    if not orgs:
        # Create one if none exists
        print("   No org found. Creating one...")
        r_create = requests.post(f"{BASE_URL}/organizations/", json={"name": "Report Test Org"}, headers=headers)
        target_org_id = r_create.json()['id']
    else:
        # Prefer an org owned by user
        owned = [o for o in orgs if o.get('role') == 'owner']
        if owned:
            target_org_id = owned[0]['id']
        else:
            target_org_id = orgs[0]['id']
        
    print(f"   Target Org ID: {target_org_id}")

    # 3. Generate Report
    print(f"\n3. Requesting Smart Report data for Org {target_org_id}...")
    report_url = f"{BASE_URL}/reports/iso42001/{target_org_id}"
    resp_report = requests.get(report_url, headers=headers)

    if resp_report.status_code == 200:
        data = resp_report.json()
        print("   ✅ SUCCESS: Report generated!")
        print(f"   --- Executive Summary Preview ---")
        print(f"   \"{data['executive_summary'][:150]}...\"")
        print(f"   Risks Mapped: {data['risk_summary']['total_risks']}")
        print(f"   Compliance Score: {data['compliance_summary']['maturity_score']}")
    else:
        print(f"   ❌ FAILURE: Report generation failed. Status: {resp_report.status_code}")
        print(f"   Response: {resp_report.text}")

if __name__ == "__main__":
    run_report_test()
