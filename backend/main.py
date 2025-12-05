from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Algor Brasil API",
    description="API Backend para a plataforma SaaS de Governança de IA",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuração de CORS (Cross-Origin Resource Sharing)
# Por enquanto, permitimos tudo para facilitar o desenvolvimento local.
# Em produção, isso será restrito apenas ao domínio do frontend.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """
    Endpoint raiz para verificar se a API está online.
    """
    return {"message": "Algor Brasil API is running", "status": "online"}

@app.get("/health")
async def health_check():
    """
    Health check para monitoramento de uptime.
    """
    return {"status": "healthy"}
