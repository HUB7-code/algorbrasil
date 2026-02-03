import os
import sys
from alembic.config import Config
from alembic import command

# Adicionar o diretório atual ao path para que o alembic encontre 'backend'
sys.path.append(os.getcwd())

def run_migrations():
    print("🚀 Rodando Migrations via Script Python...")
    try:
        # Caminho para o alembic.ini (dentro de backend)
        alembic_ini_path = os.path.join("backend", "alembic.ini")
        
        # Criar configuração do Alembic
        alembic_cfg = Config(alembic_ini_path)
        
        # IMPORTANTE: Definir o script location corretamente relativo ao ini
        alembic_cfg.set_main_option("script_location", os.path.join("backend", "alembic"))
        
        # IMPORTANTE 2: Definir url do banco para garantir (se não pegar do env)
        alembic_cfg.set_main_option("sqlalchemy.url", "sqlite:///./backend/sql_app.db")

        # Executar upgrade head
        command.upgrade(alembic_cfg, "head")
        
        print("✅ Migrations aplicadas com sucesso!")
        
    except Exception as e:
        print(f"❌ Erro ao rodar migrations: {e}")

if __name__ == "__main__":
    run_migrations()
