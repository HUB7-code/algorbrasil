import sys
import os
# Adiciona o diretório raiz ao path para conseguir importar o backend
sys.path.append(os.getcwd())

from backend.app.db.session import engine, Base
from backend.app.models import user, assessment, profiles, audit, risk
from sqlalchemy import inspect

def check_database_integrity():
    print("--- Verificando Integridade do Banco de Dados ---")
    
    # 1. Conectar ao Banco
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()
    print(f"Tabelas encontradas no SQLite: {existing_tables}")
    
    # 2. Verificar Tabelas Esperadas
    expected_tables = ["users", "profiles", "assessments", "risk_register", "audit_logs", 
                       "lms_courses", "lms_modules", "lms_lessons", "lms_enrollments"]
    missing_tables = [t for t in expected_tables if t not in existing_tables]
    
    if missing_tables:
        print(f"ALERTA: Tabelas faltando: {missing_tables}")
        print("Tentando criar tabelas faltantes...")
        try:
            Base.metadata.create_all(bind=engine)
            print("SUCESSO: Tabelas criadas.")
        except Exception as e:
            print(f"ERRO ao criar tabelas: {e}")
    else:
        print("OK: Todas as tabelas principais existem.")

    # 3. Verificar Colunas da Tabela de Risco (Garantir schema novo)
    if "risk_register" in existing_tables:
        columns = [c['name'] for c in inspector.get_columns("risk_register")]
        required_columns = ["mitigation_plan", "risk_level", "strategy"]
        
        missing_cols = [c for c in required_columns if c not in columns]
        if missing_cols:
            print(f"ALERTA CRÍTICO: Tabela 'risk_register' existe mas faltam colunas: {missing_cols}")
            print("SOLUÇÃO RECOMENDADA: Backup do banco e recriar a tabela, ou adicionar colunas via SQL.")
        else:
            print("OK: Schema de 'risk_register' validado.")

    print("--- Verificação Concluída ---")

if __name__ == "__main__":
    check_database_integrity()
