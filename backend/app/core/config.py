from pydantic_settings import BaseSettings

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
    
    # Segurança
    # ATENÇÃO: Em produção, SEMPRE defina SECRET_KEY no arquivo .env com um valor seguro!
    # Este valor padrão é apenas para desenvolvimento e testes automatizados
    SECRET_KEY: str = "dev-secret-key-change-in-production-use-env-file"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 dias
    
    # Banco de Dados
    # Por padrão usa SQLite para dev, mas preparado para PostgreSQL
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./sql_app.db"

    # SMTP / Email
    SMTP_SERVER: str = "smtp-relay.brevo.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_FROM_EMAIL: str = "edisio.nascimentojr@gmail.com" # Temp. autorizado
    SMTP_FROM_NAME: str = "Algor Brasil"

    # Stripe
    STRIPE_API_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""

    # Frontend
    FRONTEND_URL: str = "http://localhost:3005"

    class Config:
        # Torna o arquivo .env opcional (não falha se não existir)
        env_file = ".env"
        env_file_encoding = 'utf-8'
        # Permite que variáveis de ambiente do sistema sobrescrevam os padrões
        case_sensitive = True

# Instancia as configurações
# O arquivo .env é opcional - se não existir, usa os valores padrão acima
settings = Settings()
