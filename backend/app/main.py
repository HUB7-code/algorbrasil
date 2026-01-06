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
from backend.app.models import user, assessment, profiles, audit, risk, lms, payment, project, organization, ai_asset, governance, partner, lead 

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

# Create Database Tables on Startup
@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

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

# Rotas
# Rotas - Correção de Imports baseada na estrutura real
from backend.app.api import auth
from backend.app.api.endpoints import admin, lab, organizations, risks

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["users"]) # Desativado: Módulo não encontrado
app.include_router(organizations.router, prefix="/api/v1/enterprise", tags=["enterprise"]) # Assumindo organizations=enterprise
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(lab.router, prefix="/api/v1/lab", tags=["Health Lab (Audit)"])
app.include_router(risks.router, prefix="/api/v1/risks", tags=["risks"])

@app.get("/")
def read_root():
    return {"message": "Algor AI Governance API is running", "version": "v17.4.0 (Health Lab)"}
