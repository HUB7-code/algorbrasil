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
# Sem estes imports, SQLAlchemy não sabe quais tabelas criar!

from backend.app.models.user import User
from backend.app.models.risk import RiskRegister, RiskStrategy, RiskStatus
from backend.app.models.audit import AuditLog
from backend.app.models.profiles import ProfessionalProfile, CorporateProfile, ApplicationStatus
from backend.app.models.assessment import Assessment
from backend.app.models.ai_asset import AIAsset
from backend.app.models.organization import Organization, organization_members
from backend.app.models.project import Project, ProjectStatus, RiskLevel
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment
from backend.app.models.governance import GovernanceTrace, GovernancePolicy
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
    
    Esta fixture roda automaticamente (autouse=True) e garante que
    o banco de dados esteja pronto antes de qualquer teste executar.
    """
    print("\n🔧 [SETUP] Criando TODAS as tabelas no banco de teste...")
    print(f"📊 [SETUP] Modelos registrados: {len(Base.metadata.tables)} tabelas")
    print(f"📋 [SETUP] Tabelas: {list(Base.metadata.tables.keys())}")
    
    # Cria todas as tabelas definidas nos modelos importados acima
    Base.metadata.create_all(bind=test_engine)
    
    print("✅ [SETUP] Banco de dados de teste configurado com sucesso!\n")
    
    yield  # Os testes rodam aqui
    
    print("\n🧹 [TEARDOWN] Limpando banco de dados de teste...")
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    
    # Remove o arquivo do banco de dados
    if os.path.exists("./test_algor_complete.db"):
        try:
            os.remove("./test_algor_complete.db")
            print("✅ [TEARDOWN] Banco de dados removido com sucesso.\n")
        except (OSError, PermissionError) as e:
            print(f"⚠️ [TEARDOWN] Não foi possível remover o arquivo: {e}\n")


@pytest.fixture(scope="function")
def db_session():
    """
    Fixture que fornece uma sessão de banco de dados para cada teste.
    
    Nota: Os dados NÃO são revertidos após cada teste. Use o scope="session"
    do setup_test_database para limpar tudo ao final da sessão de testes.
    """
    session = TestingSessionLocal()
    
    yield session
    
    session.close()


@pytest.fixture(scope="function")
def client(db_session):
    """
    Fixture que fornece um TestClient do FastAPI configurado
    para usar o banco de dados de teste.
    
    O override de dependência garante que todos os endpoints
    usem a mesma sessão de banco de dados do teste.
    """
    def override_get_db():
        yield db_session
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()


@pytest.fixture(scope="function")
def admin_user(db_session):
    """
    Fixture que cria um usuário administrador para testes que precisam.
    """
    from backend.app.models.user import User
    from backend.app.core.security import get_password_hash
    
    admin_email = "admin@algorbrasil.com.br"
    existing_admin = db_session.query(User).filter(User.email == admin_email).first()
    
    if not existing_admin:
        admin_user = User(
            email=admin_email,
            hashed_password=get_password_hash("admin123"),
            full_name="Administrador Algor",
            role="admin",
            is_superuser=True
        )
        db_session.add(admin_user)
        db_session.commit()
        db_session.refresh(admin_user)
        return admin_user
    else:
        return existing_admin


@pytest.fixture(scope="function")
def authenticated_client(client):
    """
    Fixture que cria um usuário de teste e retorna um dict com client e headers autenticados.
    Útil para testes que precisam fazer requisições autenticadas.
    """
    # Create User for Auth
    user_data = {
        "email": "test_user@algor.com",
        "password": "TestPassword123!",
        "full_name": "Test User",
        "phone": "11999999999"
    }
    # Try to create user
    res_signup = client.post("/api/v1/auth/signup", json=user_data)
    if res_signup.status_code != 201:
        print(f"User might already exist: {res_signup.status_code}")
    
    # Login
    login_data = {"email": user_data["email"], "password": user_data["password"]}
    response = client.post("/api/v1/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"Login failed: {response.text}")
        raise Exception("Login failed")
        
    token = response.json()["access_token"]
    auth_headers = {"Authorization": f"Bearer {token}"}
    
    return {"client": client, "headers": auth_headers}
