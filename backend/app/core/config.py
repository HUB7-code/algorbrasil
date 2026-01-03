from pydantic_settings import BaseSettings
from typing import Optional
import os

# ============================================================
# ALGOR BRASIL - CONFIGURAÇÃO DE AMBIENTE
# ============================================================
# IMPORTANTE: Em produção, SEMPRE configure SECRET_KEY via 
# variável de ambiente. Nunca use o valor padrão!
# ============================================================

class Settings(BaseSettings):
    PROJECT_NAME: str = "Algor AI Gov"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000", 
        "http://localhost:8000", 
        "http://localhost:3005",
        "https://algorbrasil.com.br",
        "https://www.algorbrasil.com.br"
    ]

    # ========================================
    # Rate Limiting & Security
    # ========================================
    # IPs imunes ao Rate Limiter (Ex: Escritório Edisio, Localhost, Test Runners)
    WHITELISTED_IPS: list[str] = ["127.0.0.1", "::1"]
    
    # ========================================
    # SEGURANÇA
    # ========================================
    # ATENÇÃO: O valor padrão é APENAS para desenvolvimento local.
    # Em produção, SEMPRE configure via variável de ambiente!
    # Gere uma chave segura com: python -c "import secrets; print(secrets.token_hex(32))"
    SECRET_KEY: str = "dev-secret-key-change-in-production-use-env-file"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30  # 30 minutos (Segurança Aumentada)
    
    # ========================================
    # Banco de Dados
    # ========================================
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./sql_app.db"

    # ========================================
    # SMTP / Email
    # ========================================
    SMTP_SERVER: str = "smtp-relay.brevo.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = ""
    SMTP_FROM_NAME: str = "Algor Brasil"

    # ========================================
    # Stripe (Pagamentos)
    # ========================================
    STRIPE_API_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # ========================================
    # Frontend
    # ========================================
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        case_sensitive = True
        # Permite que o .env seja opcional (não falha se não existir)
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # Ignora variáveis extras no .env


# Instanciação das configurações
# O Pydantic vai ler automaticamente do .env se existir,
# ou usar os valores padrão se não existir
try:
    settings = Settings()
except Exception as e:
    # Fallback para desenvolvimento sem .env
    print(f"⚠️  Aviso: Usando configurações padrão de desenvolvimento. Erro: {e}")
    settings = Settings(_env_file=None)

# Aviso de segurança em desenvolvimento
if settings.SECRET_KEY == "dev-secret-key-change-in-production-use-env-file":
    if os.environ.get("ENVIRONMENT") != "development":
        print("🔴 ALERTA DE SEGURANÇA: Você está usando a SECRET_KEY padrão!")
        print("   Para produção, configure a variável de ambiente SECRET_KEY.")
        print("   Gere uma chave segura: python -c \"import secrets; print(secrets.token_hex(32))\"")
