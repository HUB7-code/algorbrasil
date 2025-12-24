"""
Script para criar a tabela de leads no banco de dados.
Execute: python create_leads_table.py
"""
import sys
sys.path.append('.')

from backend.app.db.session import engine, Base
from backend.app.models.lead import Lead

def create_leads_table():
    print("Criando tabela de leads...")
    Base.metadata.create_all(bind=engine, tables=[Lead.__table__])
    print("✓ Tabela 'leads' criada com sucesso!")

if __name__ == "__main__":
    create_leads_table()
