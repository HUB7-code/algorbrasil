import pytest
from fastapi.testclient import TestClient
import sys
import os

# Ensure backend can be imported
sys.path.append(os.getcwd())

from backend.app.main import app

client = TestClient(app)

def test_auth_routes_location():
    """
    Verifies that auth routes are correctly located under /api/v1/auth
    and NOT under /api/v1 root, ensuring frontend/backend harmony.
    """
    print("\n🔍 Testing Auth Route Harmony...")

    # 1. Check Login Route (Correct Location)
    # Sending empty body should yield 422 Validation Error, NOT 404 Not Found
    response = client.post("/api/v1/auth/login", json={})
    print(f"POST /api/v1/auth/login -> {response.status_code}")
    assert response.status_code != 404, "❌ /api/v1/auth/login should exist"
    assert response.status_code == 422, "✅ /api/v1/auth/login exists (got validation error as expected)"

    # 2. Check Login Route (Old Location - Should disappear)
    response_old = client.post("/api/v1/login", json={})
    print(f"POST /api/v1/login -> {response_old.status_code}")
    assert response_old.status_code == 404, "✅ /api/v1/login correctly returns 404 (Route moved)"

    # 3. Check Forgot Password (Correct Location)
    response_fp = client.post("/api/v1/auth/forgot-password", json={})
    print(f"POST /api/v1/auth/forgot-password -> {response_fp.status_code}")
    assert response_fp.status_code != 404, "❌ /api/v1/auth/forgot-password should exist"
    
    # 4. Check Forgot Password (Old Location)
    response_fp_old = client.post("/api/v1/forgot-password", json={})
    print(f"POST /api/v1/forgot-password -> {response_fp_old.status_code}")
    assert response_fp_old.status_code == 404, "✅ /api/v1/forgot-password correctly returns 404"

    print("\n🎉 AUTH HARMONY VERIFIED: Routes are correctly aligned.")
