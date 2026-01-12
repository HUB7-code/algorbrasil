import sys
import os
sys.path.append(os.getcwd())

from backend.app.db.session import engine, Base, SessionLocal
from backend.app.models.user import User
from backend.app.models.organization import Organization
from backend.app.models.ai_asset import AIAsset
from backend.app.models.governance import GovernanceRecord
from backend.app.models.project import Project
from sqlalchemy.orm import Session
import uuid

def test_full_db_integrity():
    print("--- INICIANDO TESTE DE INTEGRIDADE DO BANCO DE DADOS (SAAS FULL) ---")
    
    # 1. DROP and CREATE ALL tables (Clean Slate for Testing)
    # WARNING: Only for Dev/Test environment usage
    print("[1] Recriando tabelas...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Create User (Owner)
        print("[2] Criando Usuário Admin (Owner)...")
        owner = User(
            email="admin@test.com", 
            hashed_password="hashed_secret", 
            full_name="Admin Tester",
            role="admin", 
            is_active=True
        )
        db.add(owner)
        db.commit()
        db.refresh(owner)
        print(f"    -> User ID: {owner.id}")
        
        # 3. Create Organization
        print("[3] Criando Organização (Tenant)...")
        org = Organization(
            name="Acme Corp Test",
            owner_id=owner.id,
            cnpj="00.000.000/0001-00"
        )
        db.add(org)
        db.commit()
        print(f"    -> Org ID: {org.id}")
        
        # 4. Create Project
        print("[4] Criando Projeto de IA...")
        proj = Project(
            name="Chatbot Atendimento",
            user_id=owner.id,
            status="production"
        )
        db.add(proj)
        db.commit()
        print(f"    -> Project ID: {proj.id}")
        
        # 5. Create AI Asset
        print("[5] Cadastrando Ativo de IA (Modelo)...")
        asset = AIAsset(
            name="GPT-4 Customer Service",
            owner_id=owner.id,
            organization_id=org.id,
            type="LLM",
            risk_level="High"
        )
        db.add(asset)
        db.commit()
        print(f"    -> Asset ID: {asset.id}")
        
        # 6. Generate Governance Trace (The "Glue")
        print("[6] Gerando Trace de Auditoria (Trust Hub)...")
        trace_id = str(uuid.uuid4())
        trace = GovernanceRecord(
            trace_id=trace_id,
            organization_id=org.id,
            project_id=proj.id,
            ai_asset_id=asset.id,
            input_hash="sha256_mock_input",
            verdict="ALLOWED",
            policy_version="default-v1",
            risk_score=0.1,
            previous_hash="GENESIS"
        )
        db.add(trace)
        db.commit()
        db.refresh(trace)
        print(f"    -> Trace ID: {trace.id} (UUID: {trace.trace_id})")
        
        # 7. Validation / Navigation Check
        print("[7] Validando Relacionamentos ORM...")
        retrieved_trace = db.query(GovernanceRecord).filter(GovernanceRecord.id == trace.id).first()
        
        assert retrieved_trace.organization.name == "Acme Corp Test", "Falha relacao Trace->Org"
        assert retrieved_trace.ai_asset.name == "GPT-4 Customer Service", "Falha relacao Trace->Asset"
        assert retrieved_trace.project.name == "Chatbot Atendimento", "Falha relacao Trace->Project"
        
        print("    -> SUCESSO: Todas as entidades estão conectadas corretamente!")
        print("--- TESTE DE INTEGRIDADE CONCLUIDO COM 100% DE SUCESSO ---")
        
    except Exception as e:
        print(f"!!! ERRO FATAL NO TESTE: {str(e)}")
        raise e
    finally:
        db.close()

if __name__ == "__main__":
    test_full_db_integrity()
