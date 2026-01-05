import pytest
from fastapi.testclient import TestClient

# Fixture to create and authenticate a user for the tests
@pytest.fixture(scope="function")
def auth_headers(client):
    """Create a user and return authentication headers"""
    user_data = {
        "email": "risk_tester@algor.com",
        "password": "TestPassword123!",
        "full_name": "Risk Tester",
        "phone": "11999999999"
    }
    # Try to create user
    res_signup = client.post("/api/v1/auth/signup", json=user_data)
    if res_signup.status_code != 201:
        print(f"Signup info (might exist): {res_signup.status_code} - {res_signup.text}")
    
    # Login
    login_data = {"email": user_data["email"], "password": user_data["password"]}
    response = client.post("/api/v1/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        raise Exception("Login failed")
        
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful, token acquired.")
    return headers


def test_create_risk(client, auth_headers):
    print("Testing Create Risk...")
    risk_data = {
        "category": "Viés Algorítmico",
        "description": "Risk of bias in training data",
        "affected_system": "Credit Scorer",
        "probability": 4,
        "impact": 5,
        "strategy": "Mitigar",
        "mitigation_plan": "Re-sampling"
    }
    response = client.post("/api/v1/risks/", json=risk_data, headers=auth_headers)
    assert response.status_code == 200, f"Create failed: {response.text}"
    data = response.json()
    assert data["category"] == risk_data["category"]
    assert data["risk_level"] == 20 # 4 * 5
    assert data["status"] == "Aberto"
    print("Create Risk PASSED")


def test_list_risks(client, auth_headers):
    print("Testing List Risks...")
    # First create a risk to ensure we have at least one
    risk_data = {
        "category": "Viés Algorítmico",
        "description": "Risk of bias in training data",
        "affected_system": "Credit Scorer",
        "probability": 4,
        "impact": 5,
        "strategy": "Mitigar",
        "mitigation_plan": "Re-sampling"
    }
    client.post("/api/v1/risks/", json=risk_data, headers=auth_headers)
    
    response = client.get("/api/v1/risks/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    print("List Risks PASSED")


def test_update_risk(client, auth_headers):
    print("Testing Update Risk...")
    # First create a risk
    risk_data = {
        "category": "Viés Algorítmico",
        "description": "Risk of bias in training data",
        "affected_system": "Credit Scorer",
        "probability": 4,
        "impact": 5,
        "strategy": "Mitigar",
        "mitigation_plan": "Re-sampling"
    }
    create_response = client.post("/api/v1/risks/", json=risk_data, headers=auth_headers)
    created_risk = create_response.json()
    risk_id = created_risk["id"]
    
    # Now update it
    update_payload = {"status": "Mitigado", "probability": 2}
    response = client.patch(f"/api/v1/risks/{risk_id}", json=update_payload, headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "Mitigado"
    assert data["risk_level"] == 10 # 2 * 5 (impact remains 5)
    print("Update Risk PASSED")


def test_unauthorized_access(client):
    print("Testing Unauthorized Access...")
    response = client.get("/api/v1/risks/")
    assert response.status_code == 401
    print("Unauthorized Access PASSED")

import logging

# Configure logging
logging.basicConfig(filename='test_debug.log', level=logging.DEBUG, filemode='w')

if __name__ == "__main__":
    # Fixtures don't run automatically in __name__ == "__main__", but pytest tests do.
    # We can keep a minimal run wrapper or let pytest handle it.
    # Given the complexity, we assume this file is run via pytest in CI.
    pytest.main([__file__])
