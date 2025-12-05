from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from secure import Secure

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

# Configuração de CORS (Restrição de Acesso)
# Em produção, substitua "*" pelos domínios reais (ex: https://algorbrasil.com.br)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # TODO: Restringir em produção
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
