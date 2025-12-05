from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Algor AI Gov"
    API_V1_STR: str = "/api/v1"
    
    # Segurança
    SECRET_KEY: str = "SEGREDO_TEMPORARIO_DEV_2025_TROCAR_EM_PROD"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 dias
    
    # Banco de Dados
    # Por padrão usa SQLite para dev, mas preparado para PostgreSQL
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./sql_app.db"

    class Config:
        case_sensitive = True

settings = Settings()
