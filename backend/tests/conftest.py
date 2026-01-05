import os
import sys
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Adiciona o diretório raiz ao path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from backend.app.main import app
from backend.app.db.session import Base, get_db

# ✅ IMPORTAR TODOS OS MODELOS para registrar no Base.metadata
from backend.app.models.user import User
from backend.app.models.risk import RiskRegister
from backend.app.models.audit import AuditLog
from backend.app.models.profiles import CorporateProfile, ProfessionalProfile
from backend.app.models.assessment import Assessment
from backend.app.models.ai_asset import AIAsset
from backend.app.models.organization import Organization
from backend.app.models.project import Project
from backend.app.models.lms import Course, CourseModule, CourseLesson, Enrollment
from backend.app.models.governance import GovernanceTrace, GovernancePolicy, GovernanceRule
from backend.app.models.partner import PartnerApplication
from backend.app.models.lead import Lead
from backend.app.models.payment import Payment

# Configuração do banco de dados de teste
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///./test_algor.db"
test_engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_database():
    """
    Fixture de escopo 'session' que cria todas as tabelas uma vez
    antes de TODOS os testes e remove depois.
    """
    print("\n🔧 [SETUP] Criando todas as tabelas no banco de teste...")
    Base.metadata.create_all(bind=test_engine)
    print("✅ [SETUP] Tabelas criadas com sucesso!\n")
    
    yield  # Os testes rodam aqui
    
    print("\n🧹 [TEARDOWN] Removendo banco de dados de teste...")
    Base.metadata.drop_all(bind=test_engine)
    test_engine.dispose()
    
    # Remove o arquivo do banco de dados
    if os.path.exists("./test_algor.db"):
        try:
            os.remove("./test_algor.db")
            print("✅ [TEARDOWN] Banco de dados removido.\n")
        except Exception as e:
            print(f"⚠️ [TEARDOWN] Não foi possível remover o arquivo: {e}\n")


@pytest.fixture(scope="function")
def db_session():
    """
    Fixture que fornece uma sessão de banco de dados para cada teste.
    Faz rollback após cada teste para manter isolamento.
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
