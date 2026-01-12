"""
Configuração centralizada de fixtures pytest para todos os testes.
Este arquivo garante que TODAS as tabelas do banco de dados sejam criadas
antes dos testes executarem, resolvendo o erro "no such table: users".
"""
import os
import sys
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Adiciona o diretório raiz ao path para imports absolutos
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend.app.main import app
from backend.app.db.session import Base, get_db

# ========================================================================
# IMPORTAR TODOS OS MODELOS - CRÍTICO para Base.metadata.create_all()
# ========================================================================
from backend.app.models.user import User
from backend.app.models.risk import RiskRegister, RiskStrategy, RiskStatus
from backend.app.models.audit import AuditLog
from backend.app.models.profiles import ProfessionalProfile, CorporateProfile, ApplicationStatus
from backend.app.models.assessment import Assessment
from backend.app.models.ai_asset import AIAsset
from backend.app.models.organization import Organization, organization_members
from backend.app.models.project import Project, ProjectStatus, RiskLevel
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment
from backend.app.models.governance import GovernanceRecord, GovernancePolicy, GovernanceRule
from backend.app.models.partner import PartnerApplication, PartnerApplicationStatus
from backend.app.models.lead import Lead, LeadStatus, LeadPriority, FunnelStage
from backend.app.models.payment import Payment, PaymentStatus
from backend.app.models.contact import ContactLog, ContactStatus, ContactSource

# ========================================================================
# CONFIGURAÇÃO DO BANCO DE DADOS DE TESTE
# ========================================================================

SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_algor_complete.db"
test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


# ========================================================================
# FIXTURES PYTEST
# ========================================================================

@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """
    Fixture de escopo 'session' que cria TODAS as tabelas uma vez
    antes de TODOS os testes e remove depois.
    """
    print(f"\n🔧 [SETUP] Criando {len(Base.metadata.tables)} tabelas no banco de teste...")
    Base.metadata.create_all(bind=test_engine)
    print("✅ [SETUP] Banco de dados de teste pronto!\n")
    
    yield
    
    print("\n🧹 [TEARDOWN] Limpando banco de dados de teste...")
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    
    if os.path.exists("./test_algor_complete.db"):
        try:
            os.remove("./test_algor_complete.db")
            print("✅ [TEARDOWN] Banco removido com sucesso.\n")
        except (OSError, PermissionError) as e:
            print(f"⚠️  [TEARDOWN] Não foi possível remover: {e}\n")


@pytest.fixture(scope="function")
def db_session():
    """
    Fixture que fornece uma sessão de banco de dados para cada teste.
    Usa transações com rollback para manter isolamento entre testes.
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
    Fixture que fornece um TestClient do FastAPI com
    override de dependência para usar o banco de teste.
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
    Fixture que cria um usuário admin para testes de autenticação.
    """
    from backend.app.core.security import get_password_hash
    
    user = User(
        email="admin@test.com",
        full_name="Admin Test",
        hashed_password=get_password_hash("testpass123"),
        is_active=True,
        role="admin"
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    
    return user


@pytest.fixture(scope="function")
def authenticated_client(client, admin_user):
    """
    Fixture que fornece um TestClient com autenticação configurada.
    """
    login_data = {"email": "admin@test.com", "password": "testpass123"}
    response = client.post("/api/v1/auth/login", json=login_data)
    
    if response.status_code != 200:
        raise Exception(f"Login failed: {response.text}")
    
    token = response.json()["access_token"]
    client.headers = {"Authorization": f"Bearer {token}"}
    
    return client
