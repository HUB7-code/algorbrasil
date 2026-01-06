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
    Fixture que fornece uma sessão de banco de dados isolada para cada teste.
    
    Usa transações com rollback para garantir que cada teste comece
    com um estado limpo do banco de dados.
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
    Fixture que fornece um TestClient do FastAPI configurado
    para usar o banco de dados de teste.
    
    O override de dependência garante que todos os endpoints
    usem a mesma sessão de banco de dados do teste.
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
