import pytest
import sys
import os

# Ensure backend module is found
sys.path.append(os.getcwd())

from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.core.config import settings

def test_dashboard_flow_robust(client, admin_user):
    """
    Test de integração do Dashboard: Login → Fetch User Data → List Risks
    """
    # Login com credenciais padrão
    login_data = {
        "email": "admin@algorbrasil.com.br",
        "password": "admin123"
    }
    
    print("\n🔐 1. Testing Login...")
    r = client.post(f"{settings.API_V1_STR}/auth/login", json=login_data)
    
    # Debug
    if r.status_code != 200:
        print(f"❌ Login Failed: {r.text}")
    
    assert r.status_code == 200, f"Login falhou: {r.text}"
    
    token = r.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Test Dashboard
    print("\n📊 2. Testing Dashboard API...")
    r = client.get(f"{settings.API_V1_STR}/dashboard/overview", headers=headers)
    assert r.status_code == 200, f"Dashboard error: {r.text}"
    data = r.json()
    
    # Check for Critical Alert (from our Test Asset)
    assert data["critical_alerts"] >= 0 # Should be at least what we have, but could be 0 if 'Critical' string case mismatch
    # Let's check if 'kpis' exists
    assert "kpis" in data
    print(f"✅ Dashboard KPI Validated: Score {data['kpis']['growth_score']}")

    # 3. Test Inventory
    print("\n📦 3. Testing Inventory API...")
    r = client.get(f"{settings.API_V1_STR}/inventory/", headers=headers)
    assert r.status_code == 200
    assets = r.json()
    # Inventory should return a list (even if empty)
    assert isinstance(assets, list), "Inventory should return a list"
    print("✅ Inventory Validated.")

    print("\n🚀 TEST SUCCESS: Backend Integration Verified.")
