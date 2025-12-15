import sys
import os

# Adiciona o diretório atual ao path
sys.path.append(os.getcwd())

from backend.app.db.session import engine, Base
from backend.app.models.user import User
from backend.app.models.payment import Payment

def create_payment_tables():
    print("Criando tabela 'payments' no banco de dados...")
    try:
        Base.metadata.create_all(bind=engine)
        print("Sucesso! Tabela 'payments' criada.")
    except Exception as e:
        print(f"Erro ao criar tabelas: {e}")

if __name__ == "__main__":
    create_payment_tables()
