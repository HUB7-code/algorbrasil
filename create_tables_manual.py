
import sys
import os

# Adiciona o diretório atual ao path
sys.path.append(os.getcwd())

from backend.app.db.session import engine, Base
from backend.app.models.user import User
from backend.app.models.risk import RiskRegister
from backend.app.models.audit import AuditLog
# Importar outros models se necessário para garantir que tudo seja criado

def create_tables():
    print("Criando tabelas no banco de dados...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Sucesso! Tabelas criadas (se não existiam).")
    except Exception as e:
        print(f"Erro ao criar tabelas: {e}")

if __name__ == "__main__":
    create_tables()
