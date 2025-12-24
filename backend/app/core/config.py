from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Algor AI Gov"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://localhost:8000", "http://localhost:3005"]
    
    # Segurança
    SECRET_KEY: str # Deve vir do .env
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
        # Legacy config support
        case_sensitive = True

    # Nova configuração Pydantic v2
    # model_config = SettingsConfigDict(env_file=".env", env_file_encoding='utf-8')
    # Para compatibilidade com a versão instalada, vamos forçar a leitura se necessário ou contar que BaseSettings já lê do env.
    
settings = Settings(_env_file=".env", _env_file_encoding='utf-8')
