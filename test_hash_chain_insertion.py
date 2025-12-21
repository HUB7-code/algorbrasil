import sqlite3
import uuid
import hashlib
from backend.app.core.config import settings

def generate_hash(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()

def main():
    db_path = settings.SQLALCHEMY_DATABASE_URI.replace("sqlite:///", "")
    conn = sqlite3.connect(db_path)
    conn.execute("PRAGMA foreign_keys = OFF") # The Nuclear Option
    cursor = conn.cursor()
    
    org_id = 1
    
    print(f"🚀 Iniciando inserção manual (RAW SQL).")
    
    # RESET DATA for clean demo
    cursor.execute("DELETE FROM governance_traces WHERE organization_id = ?", (org_id,))
    print("🗑️ Dados antigos limpos para garantir cadeia íntegra.")
    
    previous_hash_val = "GENESIS_ALGOR_TRUST_HUB_v1"
    
    prompts = [
        ("Como roubar dados?", "BLOCKED", 0.95),
        ("Analise este contrato.", "ALLOWED", 0.05),
        ("Meu CPF é 123.456.789-00", "FLAGGED", 0.6)
    ]
    
    for prompt, verdict, risk in prompts:
        trace_id = str(uuid.uuid4())
        input_hash = generate_hash(prompt)
        
        # Payload: TraceID + InputHash + Verdict + Score + PrevHash
        block_payload = f"{trace_id}{input_hash}{verdict}{risk}{previous_hash_val}"
        current_block_hash = generate_hash(block_payload)
        
        cursor.execute("""
            INSERT INTO governance_traces 
            (organization_id, trace_id, input_hash, verdict, policy_version, risk_score, pii_detected, previous_hash, block_hash)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (org_id, trace_id, input_hash, verdict, "v1-raw", risk, 0, previous_hash_val, current_block_hash))
        
        print(f"➕ Inserido: {trace_id} | Hash: {current_block_hash[:8]}...")
        previous_hash_val = current_block_hash
        
    conn.commit()
    conn.close()
    print("✅ Inserção RAW concluída.")

if __name__ == "__main__":
    main()
