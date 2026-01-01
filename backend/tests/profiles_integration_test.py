import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
from datetime import datetime
from decimal import Decimal

from backend.app.main import app
from backend.app.database import get_db
from backend.app.models.profiles import CorporateProfile, ProfessionalProfile
from backend.app.models.user import User
from backend.app.models.base import Base
from backend.app.database import engine

# Create test client
client = TestClient(app)

# Test database setup
@pytest.fixture(scope="module")
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session(test_db):
    connection = engine.connect()
    transaction = connection.begin()
    session = Session(bind=connection)
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()

@pytest.fixture
def override_get_db(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            pass
    app.dependency_overrides[get_db] = _override_get_db
    yield
    app.dependency_overrides.clear()

# Test data
def create_test_user(db: Session, email: str = "test@example.com"):
    user = User(
        email=email,
        hashed_password="hashed_password",
        is_active=True,
        created_at=datetime.utcnow()
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_test_corporate_profile(db: Session, user_id: int):
    profile = CorporateProfile(
        user_id=user_id,
        company_name="Test Company",
        cnpj="12345678901234",
        company_size="medium",
        industry="technology",
        created_at=datetime.utcnow()
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

def create_test_professional_profile(db: Session, user_id: int):
    profile = ProfessionalProfile(
        user_id=user_id,
        full_name="Test Professional",
        cpf="12345678901",
        experience_years=5,
        hourly_rate=Decimal("100.00"),
        created_at=datetime.utcnow()
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile

# Tests
def test_create_corporate_profile(db_session, override_get_db):
    user = create_test_user(db_session)
    
    response = client.post(
        "/api/v1/profiles/corporate",
        json={
            "user_id": user.id,
            "company_name": "New Company",
            "cnpj": "98765432109876",
            "company_size": "large",
            "industry": "finance"
        }
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["company_name"] == "New Company"
    assert data["cnpj"] == "98765432109876"

def test_create_professional_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="professional@example.com")
    
    response = client.post(
        "/api/v1/profiles/professional",
        json={
            "user_id": user.id,
            "full_name": "New Professional",
            "cpf": "98765432100",
            "experience_years": 10,
            "hourly_rate": 150.00
        }
    )
    
    assert response.status_code == 201
    data = response.json()
    assert data["full_name"] == "New Professional"
    assert data["experience_years"] == 10

def test_get_corporate_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="corporate@example.com")
    profile = create_test_corporate_profile(db_session, user.id)
    
    response = client.get(f"/api/v1/profiles/corporate/{profile.id}")
    
    assert response.status_code == 200
    data = response.json()
    assert data["company_name"] == "Test Company"

def test_get_professional_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="prof@example.com")
    profile = create_test_professional_profile(db_session, user.id)
    
    response = client.get(f"/api/v1/profiles/professional/{profile.id}")
    
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Test Professional"

def test_update_corporate_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="update_corp@example.com")
    profile = create_test_corporate_profile(db_session, user.id)
    
    response = client.put(
        f"/api/v1/profiles/corporate/{profile.id}",
        json={
            "company_name": "Updated Company",
            "industry": "healthcare"
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["company_name"] == "Updated Company"
    assert data["industry"] == "healthcare"

def test_update_professional_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="update_prof@example.com")
    profile = create_test_professional_profile(db_session, user.id)
    
    response = client.put(
        f"/api/v1/profiles/professional/{profile.id}",
        json={
            "full_name": "Updated Professional",
            "hourly_rate": 200.00
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["full_name"] == "Updated Professional"

def test_delete_corporate_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="delete_corp@example.com")
    profile = create_test_corporate_profile(db_session, user.id)
    
    response = client.delete(f"/api/v1/profiles/corporate/{profile.id}")
    
    assert response.status_code == 204
    
    # Verify deletion
    response = client.get(f"/api/v1/profiles/corporate/{profile.id}")
    assert response.status_code == 404

def test_delete_professional_profile(db_session, override_get_db):
    user = create_test_user(db_session, email="delete_prof@example.com")
    profile = create_test_professional_profile(db_session, user.id)
    
    response = client.delete(f"/api/v1/profiles/professional/{profile.id}")
    
    assert response.status_code == 204
    
    # Verify deletion
    response = client.get(f"/api/v1/profiles/professional/{profile.id}")
    assert response.status_code == 404
