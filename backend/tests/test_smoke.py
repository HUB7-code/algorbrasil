import pytest
from fastapi.testclient import TestClient
import sys
import os

# Adiciona raiz ao path
sys.path.append(os.getcwd())

from backend.main import app

def test_root():
    client = TestClient(app)
    response = client.get("/docs")
    assert response.status_code == 200
    print("\n✅ SMOKE TEST PASSED: FastAPI is loading correctly.")
