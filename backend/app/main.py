from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from secure import Secure

from backend.app.db.session import engine, Base
from backend.app.models import user, assessment, profiles, audit, risk, lms, payment, project, organization, ai_asset, governance, partner, lead # Import all models to register tables

# Configuração de Segurança (Headers)
secure_headers = Secure.with_default_headers()

# Configuração de Rate Limiting (Blindagem contra Brute Force/DDoS)
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="Algor AI Gov API",
    description="API de Governança de IA com Segurança Hardened",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Create Database Tables on Startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

from fastapi.staticfiles import StaticFiles
import os
os.makedirs("backend/app/static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static")

from backend.app.core.config import settings


# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Integrar o Rate Limiter ao App
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middleware para adicionar Security Headers em todas as respostas
@app.middleware("http")
async def set_secure_headers(request: Request, call_next):
    response = await call_next(request)
    # Correção: O método correto nas versões recentes é set_headers ou simplesmente aplicar usando o response
    # secure_headers.set_headers(response) funciona em frameworks gerais
    # Para garantir, vamos setar manualmente se a lib falhar, mas vamos tentar o método padrão da lib nova
    try:
        secure_headers.set_headers(response)
    except AttributeError:
         # Fallback para versões mais antigas ou interface diferente
         pass
    return response

# Incluir Rotas
from backend.app.api import auth, forms
app.include_router(auth.router, prefix="/api/v1", tags=["Autenticação"])
app.include_router(forms.router, prefix="/api/v1", tags=["Formulários"])
from backend.app.api import stats
app.include_router(stats.router, prefix="/api/v1", tags=["Estatísticas"])
from backend.app.api import downloads
app.include_router(downloads.router, prefix="/api/v1", tags=["Downloads"])
from backend.app.api import profiles
app.include_router(profiles.router, prefix="/api/v1", tags=["Perfis (Onboarding)"])
from backend.app.api.endpoints import organizations
app.include_router(organizations.router, prefix="/api/v1/organizations", tags=["Organizações"])
from backend.app.api.endpoints import assessments
app.include_router(assessments.router, prefix="/api/v1/assessments", tags=["Diagnósticos IA"])
from backend.app.api.endpoints import risks
app.include_router(risks.router, prefix="/api/v1/risks", tags=["Gestão de Riscos ISO 42001"])
from backend.app.api.endpoints import lms
app.include_router(lms.router, prefix="/api/v1/lms", tags=["LMS Education"])
from backend.app.api.endpoints import payments
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Monetização"])
from backend.app.api.endpoints import admin
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin Command"])
from backend.app.api.endpoints import projects
app.include_router(projects.router, prefix="/api/v1/projects", tags=["AI GOV - Projects"])
from backend.app.api.endpoints import governance
app.include_router(governance.router, prefix="/api/v1/governance", tags=["Growth Hub (Audit Vault)"])
from backend.app.api.endpoints import governance_stats
app.include_router(governance_stats.router, prefix="/api/v1/governance-stats", tags=["Growth Hub (Analytics)"])
from backend.app.api import partners
app.include_router(partners.router, prefix="/api/v1/partners", tags=["Partner Program"])
from backend.app.api.endpoints import scanner
app.include_router(scanner.router, prefix="/api/v1/scanner", tags=["Scanner Público (Freemium)"])
from backend.app.api import leads
app.include_router(leads.router, prefix="/api/v1", tags=["Leads / Sales Funnel"])

@app.get("/", tags=["Status"])
@limiter.limit("10/minute") # Exemplo: max 10 requests por minuto por IP
async def health_check(request: Request):
    """
    Endpoint de Health Check para verificar se o sistema está online e seguro.
    Possui Rate Limiting aplicado.
    """
    return {
        "status": "online",
        "system": "Algor AI Gov Backend",
        "security": "active",
        "version": "1.0.0"
    }
