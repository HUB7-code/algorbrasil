import os
import sys
# Adiciona o diretório atual ao path ANTES de importar módulos locais
sys.path.append(os.getcwd())

import pytest
from fastapi.testclient import TestClient

from backend.app.main import app


class TestRiskModule:
    
    def test_create_risk(self, authenticated_client):
        print("Testing Create Risk...")
        client = authenticated_client["client"]
        auth_headers = authenticated_client["headers"]
        
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

    def test_list_risks(self, authenticated_client):
        print("Testing List Risks...")
        client = authenticated_client["client"]
        auth_headers = authenticated_client["headers"]
        
        response = client.get("/api/v1/risks/", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        print("List Risks PASSED")

    def test_update_risk(self, authenticated_client):
        print("Testing Update Risk...")
        client = authenticated_client["client"]
        auth_headers = authenticated_client["headers"]
        
        # Assuming ID 1 exists from create test
        update_payload = {"status": "Mitigado", "probability": 2}
        response = client.patch("/api/v1/risks/1", json=update_payload, headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "Mitigado"
        assert data["risk_level"] == 10 # 2 * 5 (impact remains 5)
        print("Update Risk PASSED")

    def test_unauthorized_access(self, client):
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
