from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Algor Brasil API",
    description="API Backend para a plataforma SaaS de Governança de IA",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuração CORS Básica para Dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Permitir frontend local
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Imports de Endpoints ---
from backend.app.api import auth, forms, profiles, downloads
from backend.app.api.endpoints import payments, assessments, risks, lms, admin, projects, organizations, dashboard

# Import específico para evitar conflito de namespace no pacote inventory
from backend.app.api.endpoints.inventory.assets import router as inventory_router

# --- Rotas Existentes ---
app.include_router(auth.router, prefix="/api/v1", tags=["auth"])
app.include_router(forms.router, prefix="/api/v1/forms", tags=["forms"])
app.include_router(profiles.router, prefix="/api/v1/profiles", tags=["profiles"])
app.include_router(downloads.router, prefix="/api/v1/downloads", tags=["downloads"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])
app.include_router(assessments.router, prefix="/api/v1/assessments", tags=["assessments"])
app.include_router(risks.router, prefix="/api/v1/risks", tags=["risks"])
app.include_router(lms.router, prefix="/api/v1/lms", tags=["lms"])
app.include_router(admin.router, prefix="/api/v1/admin", tags=["admin"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(organizations.router, prefix="/api/v1/organizations", tags=["organizations"])

# Rotas Novas
app.include_router(inventory_router, prefix="/api/v1/inventory", tags=["inventory"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["dashboard"])

# Scanner Module (MVP Freemium)
from backend.app.api.endpoints import scanner
app.include_router(scanner.router, prefix="/api/v1/scanner", tags=["scanner"])
