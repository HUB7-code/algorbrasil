from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from backend.app.core.limiter import limiter
from backend.app.core.config import settings
from secure import Secure
import datetime
import os
from fastapi.staticfiles import StaticFiles

from backend.app.db.session import engine, Base
# Import all models to register tables
# Import all models explicitly to avoid circular dependency crashes
from backend.app.models import user, assessment, profiles, audit, risk, lms, payment, project, organization, ai_asset, governance, partner, lead
# Certificar que a tabela de associação foi carregada
from backend.app.models.organization import organization_members 

# Configuração de Segurança (Headers)
secure_headers = Secure.with_default_headers()

# Custom Rate Limit Handler (Logging Silencioso + Mensagem Amigável)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    ip = request.client.host
    timestamp = datetime.datetime.now().isoformat()
    # Log apenas no servidor (Silent Audit)
    print(f"[SECURITY AUDIT] Rate Limit BLOCK | IP: {ip} | Time: {timestamp} | Path: {request.url.path}")
    
    return JSONResponse(
        status_code=429,
        content={
            "detail": "Limite de requisições excedido.",
            "message": "O volume de dados excede o limite do diagnóstico rápido. Para auditorias de larga escala, utilize a versão Enterprise.",
        }
    )

app = FastAPI(
    title="Algor AI Gov API",
    description="API de Governança de IA com Segurança Hardened",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Integrar o Rate Limiter ao App
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, custom_rate_limit_handler)

# Database Startup Check
# NOTA: Em ambiente de produção, as migrações são geridas pelo Alembic (deploy.sh).
# O `create_all` abaixo serve APENAS para desenvolvimento local sem Alembic configurado.
# Em produção, execute: cd backend && alembic upgrade head
@app.on_event("startup")
def on_startup():
    import logging
    import os
    env = os.environ.get("ENVIRONMENT", "development")
    if env == "development":
        # Em dev, garante que as tabelas existam para facilitar o onboarding
        # Não altera tabelas existentes; o Alembic cuida das migrações
        Base.metadata.create_all(bind=engine)
        logging.getLogger("uvicorn").info("[DEV] Tabelas verificadas via create_all.")
    else:
        logging.getLogger("uvicorn").info("[PROD] Banco gerido pelo Alembic. Tabelas não recriadas no startup.")

# Static Files
os.makedirs("backend/app/static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static")

# Configuração de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Middleware para adicionar Security Headers em todas as respostas
@app.middleware("http")
async def set_secure_headers(request: Request, call_next):
    response = await call_next(request)
    try:
        secure_headers.set_headers(response)
        if "server" in response.headers:
            del response.headers["server"]
    except Exception:
        pass
    return response

# Rotas - Imports baseados na estrutura real
from backend.app.api.endpoints import admin, lab, organizations, risks, dashboard, lms, scanner, governance
from backend.app.api import profiles, leads, partners, downloads, forms, stats
from backend.app.api.endpoints.inventory import assets as inventory_assets

# Autenticação e Perfis
app.include_router(profiles.router, prefix="/api/v1", tags=["User Profiles"])

# Enterprise e Admin
app.include_router(organizations.router, prefix="/api/v1/enterprise", tags=["Enterprise"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin Panel"])

# Ferramentas de Governança
app.include_router(lab.router, prefix="/api/v1/lab", tags=["Health Lab"])
app.include_router(risks.router, prefix="/api/v1/risks", tags=["Risk Register"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["Dashboard"])
app.include_router(inventory_assets.router, prefix="/api/v1/inventory", tags=["AI Inventory"])
app.include_router(scanner.router, prefix="/api/v1/scanner", tags=["Compliance Scanner"])
app.include_router(governance.router, prefix="/api/v1/governance", tags=["Governance Guardrail"])

# LMS (Learning Management System)
app.include_router(lms.router, prefix="/api/lms", tags=["LMS - Academy"])

# Leads, Parceiros e Formulários
app.include_router(leads.router, prefix="/api/v1", tags=["Leads"])
app.include_router(partners.router, prefix="/api/v1/partners", tags=["Partners"])
app.include_router(forms.router, prefix="/api/v1", tags=["Forms"])
app.include_router(downloads.router, prefix="/api/v1", tags=["Downloads"])
app.include_router(stats.router, prefix="/api/v1", tags=["Stats"])

# Webhooks (Clerk, etc)
from backend.app.api.webhooks import clerk as clerk_webhooks
app.include_router(clerk_webhooks.router, prefix="/api/v1/webhooks", tags=["Webhooks"])

@app.get("/")
def read_root():
    return {"message": "Algor AI Governance API is running", "version": "v17.4.0 (Health Lab)"}
