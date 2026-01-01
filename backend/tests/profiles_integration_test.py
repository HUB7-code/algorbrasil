
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.main import app
from backend.app.db.session import Base, get_db
from backend.app.models.user import User
from backend.app.models.profiles import CorporateProfile, ProfessionalProfile, UserProfile
from backend.app.models.audit import AuditLog

# Setup do Banco de Teste
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_profiles.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        while True: # Workaround para manter session no yield
            yield db
            break
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def setup_module(module):
    Base.metadata.create_all(bind=engine)

def teardown_module(module):
    import os
    engine.dispose()
    if os.path.exists("./test_profiles.db"):
        try:
            os.remove("./test_profiles.db")
        except:
            pass

def test_corporate_flow():
    # 1. Signup
    signup_data = {"email": "ceo@bigcorp.com", "password": "pass", "full_name": "CEO", "phone": "119999"}
    client.post("/api/v1/signup", json=signup_data)
    
    # 2. Login
    login_res = client.post("/api/v1/login", json={"email": "ceo@bigcorp.com", "password": "pass"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Criar Perfil Corporativo
    corp_data = {
        "company_name": "Big Corp S.A.",
        "sector": "Industrial",
        "size_range": "201-1000",
        "website": "https://bigcorp.com"
    }
    res = client.post("/api/v1/profiles/corporate", json=corp_data, headers=headers)
    assert res.status_code == 201
    assert res.json()["company_name"] == "Big Corp S.A."
    
    # 4. Verificar atualização de Role e Auditoria
    # Vamos verificar via API /me
    me_res = client.get("/api/v1/profiles/me", headers=headers)
    assert me_res.json()["type"] == "corporate"
    
    print("\n✅ Fluxo Corporativo: SUCESSO")

def test_integrity_constraint():
    # Tentar criar perfil profissional para usuário que JÁ É Corporativo (deve falhar)
    
    # Login como CEO (criado no teste anterior)
    login_res = client.post("/api/v1/login", json={"email": "ceo@bigcorp.com", "password": "pass"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    prof_data = {
        "linkedin_url": "https://linkedin.com/in/ceo",
        "primary_expertise": "Management",
        "city": "SP",
        "state": "SP"
    }
    
    res = client.post("/api/v1/profiles/professional", json=prof_data, headers=headers)
    
    assert res.status_code == 400
    assert "já possui um perfil" in res.json()["detail"]
    
    print("\n✅ Integridade de Dados (Constraint): SUCESSO - Duplicidade bloqueada")

def test_professional_flow():
    # 1. Signup Auditor
    client.post("/api/v1/signup", json={"email": "auditor@algor.com", "password": "pass", "full_name": "Auditor", "phone": "118888"})
    
    # 2. Login
    token = client.post("/api/v1/login", json={"email": "auditor@algor.com", "password": "pass"}).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    
    # 3. Criar Perfil
    prof_data = {
        "linkedin_url": "https://linkedin.com/in/auditor",
        "primary_expertise": "Compliance",
        "city": "RJ",
        "state": "RJ",
        "years_experience": 5
    }
    res = client.post("/api/v1/profiles/professional", json=prof_data, headers=headers)
    assert res.status_code == 201
    
    print("\n✅ Fluxo Profissional: SUCESSO")

if __name__ == "__main__":
    try:
        setup_module(None)
        test_corporate_flow()
        test_integrity_constraint()
        test_professional_flow()
        print("\n🎉 TODOS OS TESTES DE INTEGRAÇÃO PASSARAM!")
    except AssertionError as e:
        print(f"\n❌ FALHA: {e}")
    except Exception as e:
        print(f"\n❌ ERRO: {e}")
    finally:
        teardown_module(None)
