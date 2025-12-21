import sys
import hashlib
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from backend.app.models.governance import GovernanceTrace
from backend.app.core.config import settings

# Setup DB connection
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def generate_hash(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()

def verify_chain(organization_id: int):
    db = SessionLocal()
    try:
        print(f"🔒 Iniciando auditoria de integridade para Organização ID: {organization_id}...")
        
        # Fetch all traces ordered by creation time
        traces = db.query(GovernanceTrace).filter(
            GovernanceTrace.organization_id == organization_id
        ).order_by(GovernanceTrace.created_at.asc()).all()
        
        if not traces:
            print("⚠️ Nenhum registro encontrado para esta organização.")
            return

        is_valid = True
        broken_link_index = -1
        
        print(f"📄 Total de Blocos (Traces): {len(traces)}")
        print("-" * 60)
        
        for i, trace in enumerate(traces):
            # 1. Determine Expected Previous Hash
            if i == 0:
                expected_prev_hash = "GENESIS_ALGOR_TRUST_HUB_v1"
            else:
                expected_prev_hash = traces[i-1].block_hash
            
            # 2. Check Link Integrity
            if trace.previous_hash != expected_prev_hash:
                safe_trace_prev = trace.previous_hash if trace.previous_hash else "NONE"
                safe_expected = expected_prev_hash if expected_prev_hash else "NONE"
                
                print(f"❌ ERRO DE LINK no Bloco #{i} (ID: {trace.trace_id})")
                print(f"   Esperado: {safe_expected[:10]}...")
                print(f"   Encontrado: {safe_trace_prev[:10]}...")
                is_valid = False
                broken_link_index = i
                break
                
            # 3. Re-calculate Block Hash to check for Tampering
            # Payload reconstruction must match exactly the generation logic in endpoints/governance.py
            # Payload: TraceID + InputHash + Verdict + Score + PrevHash
            
            # Note: input_hash in DB is already hashed. In endpoint we hash prompt_text.
            # But the logic in endpoint uses: generate_hash(request.prompt_text) which IS the input_hash stored.
            
            recalc_payload = f"{trace.trace_id}{trace.input_hash}{trace.verdict}{trace.risk_score}{expected_prev_hash}"
            recalc_hash = generate_hash(recalc_payload)
            
            if recalc_hash != trace.block_hash:
                print(f"❌ ERRO DE CONTEÚDO (TAMPERING) no Bloco #{i} (ID: {trace.trace_id})")
                print(f"   Hash Armazenado: {trace.block_hash}")
                print(f"   Hash Recalculado: {recalc_hash}")
                is_valid = False
                broken_link_index = i
                break
                
            safe_block_hash = trace.block_hash if trace.block_hash else "NONE"
            print(f"✅ Bloco #{i} Integro. (Hash: {safe_block_hash[:8]}...)")

        print("-" * 60)
        if is_valid:
            print("🏆 CADEIA VÁLIDA: A integridade dos dados está GARANTIDA.")
        else:
            print(f"🚨 CADEIA CORROMPIDA no bloco #{broken_link_index}. Auditoria falhou.")
            
    finally:
        db.close()

if __name__ == "__main__":
    # Default to Organization ID 1 if not provided
    org_id = 1
    if len(sys.argv) > 1:
        org_id = int(sys.argv[1])
    verify_chain(org_id)
