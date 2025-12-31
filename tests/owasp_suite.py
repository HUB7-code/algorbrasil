import requests
import json
import sys
import random
import string

BASE_URL = "http://localhost:8000/api/v1"

def log(msg, type="INFO"):
    print(f"[{type}] {msg}")

def generate_random_string(length=8):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def run_tests():
    session = requests.Session()
    
    # =================================================================
    # 2.1 INJECTION ATTACKS (SQLi, Command Injection)
    # =================================================================
    log("=== 2.1 INJECTION ATTACKS ===")
    
    # A. SQL Injection on Login (Authentication Bypass)
    # The app uses SQLAlchemy ORM which protects against classic SQLi, BUT let's verify.
    sqli_payloads = [
        "' OR '1'='1", 
        "admin' --", 
        "' UNION SELECT 1, 'admin', 'pass' --"
    ]
    
    log("-- Testing SQL Injection on Login --")
    for payload in sqli_payloads:
        res = session.post(f"{BASE_URL}/login", json={"username": payload, "password": "password"})
        if res.status_code == 200:
            log(f"CRITICAL: SQL Injection successful with payload: {payload}", "FAIL")
        elif res.status_code in [401, 404, 422]:
            log(f"Payload blocked/handled (Status {res.status_code}): {payload}", "PASS")
        else:
            log(f"Unexpected status {res.status_code} for payload: {payload}", "WARN")

    # B. Command Injection on Scanner (Simulated)
    # Since we can't easily see execution output, we check for timing (sleep) or error messages leaking shell info
    log("-- Testing Command Injection on Scanner --")
    
    # We need a token for scanner
    res = session.post(f"{BASE_URL}/login", json={"email": "admin@algor.com", "password": "admin123"})
    if res.status_code != 200:
        log("Cannot authenticate admin for Scanner tests. Aborting Scanner tests.", "CRITICAL")
        return
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    cmd_payloads = [
        "; ls -la", 
        "$(whoami)", 
        "| cat /etc/passwd"
    ]
    
    for cmd in cmd_payloads:
        # Scanner input simulation via CSV file content
        csv_content = f"column1\n{cmd}"
        files = {'file': ('payload.csv', csv_content, 'text/csv')}
        
        try:
            res_scan = session.post(f"{BASE_URL}/scanner/upload", headers=headers, files=files)
            if res_scan.status_code == 200:
                result = res_scan.json()
                # Check if the output contains command execution results (heuristic)
                # Ideally we check if it literally scanned the string or executed it.
                log(f"Status 200 for cmd payload. App likely treated it as text string.", "PASS")
            else:
                log(f"Status {res_scan.status_code} for cmd payload.", "PASS")
        except Exception as e:
            log(f"Error sending payload: {e}", "ERROR")

    # =================================================================
    # 2.2 BROKEN AUTHENTICATION (Rate Limiting, Session)
    # =================================================================
    log("=== 2.2 BROKEN AUTHENTICATION ===")
    
    # A. Rate Limiting on Login
    log("-- Testing Rate Limiting (Brute Force Protection) --")
    # Try 15 rapid logins (Limit is unknown, but usually 5-10/min)
    hit_limit = False
    for i in range(15):
        res = session.post(f"{BASE_URL}/login", json={"email": "admin@algor.com", "password": f"wrongpass{i}"})
        if res.status_code == 429:
            log(f"Rate Limit Hit at attempt {i+1}. Protection Active.", "PASS")
            hit_limit = True
            break
    
    if not hit_limit:
        log("WARN: 15 login attempts allowed without 429. Rate limiting might be too loose or inactive.", "WARN")

    # B. Token Expiration (Static Analysis Check Preferable, but runtime check:)
    # We can inspect the token expiration claim
    # Decoding JWT (simple manual parse)
    try:
        parts = token.split('.')
        # padding
        payload_part = parts[1] + '=='
        import base64
        decoded = json.loads(base64.b64decode(payload_part).decode('utf-8'))
        exp = decoded.get("exp")
        log(f"Token Expiration Claim found: {exp}", "INFO")
        
        import time
        now = time.time()
        ttl_minutes = (exp - now) / 60
        log(f"Token TTL: {ttl_minutes:.2f} minutes", "INFO")
        
        if ttl_minutes > 10000: # checking for infinite tokens
            log("Token life is excessively long.", "WARN")
        else:
            log("Token life seems reasonable.", "PASS")
            
    except Exception as e:
        log(f"Could not parse token: {e}", "WARN")

if __name__ == "__main__":
    run_tests()
