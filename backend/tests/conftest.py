"""
Central pytest configuration file for all tests.

This file ensures that ALL 21 database tables are created before any test runs,
solving the "no such table" errors that occurred when individual test files 
only imported a subset of models.

Key responsibilities:
1. Import ALL models to register them in Base.metadata
2. Provide reusable fixtures for database session, test client, and authenticated users
3. Ensure proper isolation between tests with transaction rollback
"""

import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.app.main import app
from backend.app.db.session import Base, get_db
from backend.app.core.security import get_password_hash

# ========================================
# IMPORT ALL 21 MODELS
# This ensures all tables are registered in Base.metadata
# ========================================

# Core models
from backend.app.models.user import User
from backend.app.models.audit import AuditLog

# Risk Management models
from backend.app.models.risk import RiskRegister, RiskStrategy, RiskStatus

# Profiles & Assessment models
from backend.app.models.profiles import ProfessionalProfile, CorporateProfile, ApplicationStatus
from backend.app.models.assessment import Assessment

# AI Governance models
from backend.app.models.ai_asset import AIAsset
from backend.app.models.governance import GovernanceRecord, GovernancePolicy, GovernanceRule

# Organization & Projects models
from backend.app.models.organization import Organization, organization_members
from backend.app.models.project import Project, ProjectStatus, RiskLevel

# LMS models
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment

# Business models
from backend.app.models.partner import PartnerApplication, PartnerApplicationStatus
from backend.app.models.lead import Lead, LeadStatus, LeadPriority, FunnelStage
from backend.app.models.payment import Payment, PaymentStatus
from backend.app.models.contact import ContactLog, ContactStatus, ContactSource

# ========================================
# TEST DATABASE SETUP
# ========================================

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test.db"
test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """
    Creates ALL 21 database tables before any tests run.
    
    This fixture runs once per test session and is automatically used
    by all tests (autouse=True).
    """
    print("\n[SETUP] Creating all database tables...")
    Base.metadata.create_all(bind=test_engine)
    yield
    print("\n[TEARDOWN] Dropping all database tables...")
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    # Clean up the database file
    if os.path.exists("./test.db"):
        try:
            os.remove("./test.db")
        except (PermissionError, FileNotFoundError) as e:
            print(f"Warning: Could not remove test.db: {e}")


@pytest.fixture(scope="function")
def db_session():
    """
    Provides an isolated database session for each test.
    
    Uses transactions with rollback to ensure tests don't interfere
    with each other. Each test gets a clean database state.
    """
    connection = test_engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)
    
    yield session
    
    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db_session):
    """
    Provides a TestClient with the database session overridden.
    
    This ensures that API calls made during tests use the test database
    instead of the production database.
    """
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def admin_user(db_session):
    """
    Creates an admin user for authentication tests.
    
    Returns a User object that can be used for testing authenticated endpoints.
    """
    user = User(
        email="admin@test.com",
        hashed_password=get_password_hash("testpass123"),
        full_name="Admin Test User",
        role="admin",
        is_active=True
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture(scope="function")
def authenticated_client(client, admin_user):
    """
    Provides a TestClient that is already authenticated.
    
    Makes a login request to get a token and sets the Authorization header
    automatically for all subsequent requests.
    """
    response = client.post("/api/v1/auth/login", json={
        "email": "admin@test.com",
        "password": "testpass123"
    })
    
    if response.status_code != 200:
        raise Exception(f"Login failed: {response.text}")
    
    token = response.json()["access_token"]
    client.headers = {"Authorization": f"Bearer {token}"}
    return client
