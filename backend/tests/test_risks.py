import os
import sys
# Adiciona o diretório atual ao path ANTES de importar módulos locais
sys.path.append(os.getcwd())

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.main import app
from backend.app.db.session import Base, get_db

# ✅ ADICIONE ESTES IMPORTS DOS MODELOS
from backend.app.models.user import User
from backend.app.models.risk import RiskRegister
from backend.app.models.audit import AuditLog

# Setup Database for Testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_risks.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

client = TestClient(app)

# ✅ ADICIONE DECORATOR PYTEST PARA SETUP/TEARDOWN
@pytest.fixture(scope="class", autouse=True)
def setup_database_fixture():
    print("Setting up database...")
    Base.metadata.create_all(bind=engine)
    app.dependency_overrides[get_db] = override_get_db
    yield
    print("Tearing down database...")
    del app.dependency_overrides[get_db]  # Remove apenas o override que configuramos
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    if os.path.exists("./test_risks.db"):
        try:
            os.remove("./test_risks.db")
        except:
            pass

class TestRiskModule:
    auth_headers = {}

    def setup_class(self):
        # Create User for Auth
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
        self.auth_headers = {"Authorization": f"Bearer {token}"}
        print("Login successful, token acquired.")

    def test_create_risk(self):
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
        response = client.post("/api/v1/risks/", json=risk_data, headers=self.auth_headers)
        assert response.status_code == 200, f"Create failed: {response.text}"
        data = response.json()
        assert data["category"] == risk_data["category"]
        assert data["risk_level"] == 20 # 4 * 5
        assert data["status"] == "Aberto"
        print("Create Risk PASSED")

    def test_list_risks(self):
        print("Testing List Risks...")
        response = client.get("/api/v1/risks/", headers=self.auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        print("List Risks PASSED")

    def test_update_risk(self):
        print("Testing Update Risk...")
        # Assuming ID 1 exists from create test
        update_payload = {"status": "Mitigado", "probability": 2}
        response = client.patch("/api/v1/risks/1", json=update_payload, headers=self.auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "Mitigado"
        assert data["risk_level"] == 10 # 2 * 5 (impact remains 5)
        print("Update Risk PASSED")

    def test_unauthorized_access(self):
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
