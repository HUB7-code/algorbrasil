import requests
import json
import sys

BASE_URL = "http://localhost:8000/api/v1"

def log(msg, type="INFO"):
    print(f"[{type}] {msg}")

def run_audit():
    session = requests.Session()
    
    # 1. SETUP: Create/Login User (Attacker Profile - Low Privilege)
    auditor_email = "attacker_low_priv@test.com"
    auditor_pass = "Attacker123!"
    
    log(f"Attempting login with {auditor_email}...")
    
    # Try login first
    login_payload = {
        "username": auditor_email, # OAuth2 form usually expects 'username' for email
        "password": auditor_pass
    }
    
    # Note: Backend might use OAuth2PasswordRequestForm which expects form-data, not json
    # Let's try standard JSON first as per typical REST, if fails, we try form-data
    res = session.post(f"{BASE_URL}/login", data=login_payload)
    
    if res.status_code == 401 or res.status_code == 404: # User might not exist
        log("User not found or invalid creds. Attempting registration...", "WARN")
        reg_payload = {
            "email": auditor_email,
            "password": auditor_pass,
            "full_name": "Low Priv Attacker",
            "phone": "+5511999999999"
        }
        res_reg = session.post(f"{BASE_URL}/signup", json=reg_payload)
        if res_reg.status_code in [200, 201]:
             log("Registration successful. Logging in again...")
             res = session.post(f"{BASE_URL}/login", data=login_payload)
        else:
             log(f"Registration failed: {res_reg.text}", "ERROR")
             return

    if res.status_code != 200:
        log(f"Login failed: {res.text}", "CRITICAL")
        return

    tokens = res.json()
    access_token = tokens.get("access_token")
    headers = {"Authorization": f"Bearer {access_token}"}
    log("Login successful. Access Token acquired.")

    # 2. TEST: IDOR / Broken Access Control (Admin Access)
    log("-- TEST 1: Privilege Escalation (Accessing Admin Users) --")
    res_admin = session.get(f"{BASE_URL}/admin/users", headers=headers)
    
    if res_admin.status_code == 200:
        log(f"VULNERABILITY DETECTED! Low priv user accessed admin route. Status: {res_admin.status_code}", "FAIL")
    elif res_admin.status_code == 403:
        log(f"Security Control Verified: Admin route blocked. Status: {res_admin.status_code}", "PASS")
    else:
        log(f"Unexpected response on admin route: {res_admin.status_code}", "INFO")

    # 3. TEST: Prompt Injection (AI Scanner)
    log("-- TEST 2: Prompt Injection on AI Scanner --")
    files = {
        'file': ('malicious_prompt.csv', open('tests/payloads/malicious_prompt.csv', 'rb'), 'text/csv')
    }
    
    try:
        res_scan = session.post(f"{BASE_URL}/scanner/upload", headers=headers, files=files)
        
        if res_scan.status_code == 200:
            scan_data = res_scan.json()
            # Analyze response for successful injection
            # Hypothesis: If injection works, model might return trusting score or ignore risks
            log(f"Scanner response received: {json.dumps(scan_data, indent=2)}", "INFO")
            
            # Simple keyword check in response to see if model echoed the override
            resp_text = str(scan_data).lower()
            if "compliant" in resp_text and "100" in resp_text:
                 log("POTENTIAL INJECTION SUCCESS: Model seems to have followed the override instructions.", "WARN")
            else:
                 log("Injection outcomes inconclusive from raw text. Manual review required.", "INFO")

        else:
            log(f"Scanner upload failed: {res_scan.status_code} - {res_scan.text}", "ERROR")

    except Exception as e:
        log(f"Exception during scanner test: {str(e)}", "ERROR")

if __name__ == "__main__":
    run_audit()
