
import requests
import sys
import os

# Adiciona o diretorio atual ao path para importar modulos vizinhos
sys.path.append(os.getcwd())

from test_persona_b_limits import run_limit_test

BASE_URL = "http://localhost:8000/api/v1"

def run_security_smoke_test():
    print("\n--- SECURITY SMOKE TEST ---")
    
    # 1. Test Auth Guard on Protected Route
    print("1. Testing Auth Guard on /users/me (Should be 401)...")
    try:
        resp = requests.get(f"{BASE_URL}/users/me")
        if resp.status_code == 401:
            print("   ✅ SUCCESS: Access denied (401)")
        else:
            print(f"   ❌ FAILURE: Protected route is open! Status: {resp.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("   ❌ CRITICAL: Backend is NOT running on port 8000")
        return False

    # 2. Test Auth Guard on /organizations/ (Should be 401)
    print("2. Testing Auth Guard on /organizations/ (Should be 401)...")
    resp = requests.get(f"{BASE_URL}/organizations/me")
    if resp.status_code == 401:
        print("   ✅ SUCCESS: Access denied (401)")
    else:
        print(f"   ❌ FAILURE: Protected route is open! Status: {resp.status_code}")
        return False
        
    # 3. Test Public Route Reachability
    print("3. Testing Public Route /openapi.json (Should be 200)...")
    resp = requests.get(f"http://localhost:8000/openapi.json")
    if resp.status_code == 200:
        print("   ✅ SUCCESS: API Docs reachable")
    else:
        print(f"   ⚠️ WARNING: OpenAPI docs returned {resp.status_code}")

    return True

if __name__ == "__main__":
    print("🚀 STARTING PRE-COMMIT TEST SUITE 🚀")
    
    # Run Security Tests
    if not run_security_smoke_test():
        print("\n❌ SECURITY CHECKS FAILED. ABORTING COMMIT.")
        sys.exit(1)
        
    # Run Functional Tests (Persona B Limits)
    try:
        run_limit_test()
    except Exception as e:
        print(f"\n❌ FUNCTIONAL TEST ERROR: {e}")
        sys.exit(1)
        
    print("\n✅✅ ALL TESTS PASSED. READY FOR COMMIT. ✅✅")
