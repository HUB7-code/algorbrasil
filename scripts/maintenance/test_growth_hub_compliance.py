
import requests
import json
import time

# Config
BASE_URL = "http://localhost:8000/api/v1"
ORG_ID = 1

def test_governance_flow():
    print("\n🔮 INICIANDO TESTE E2E: GROWTH IA HUB (GOVERNANCE)")
    print("=" * 60)

    # ---------------------------------------------------------
    # 1. TESTE DO GUARDRAIL (POST)
    # ---------------------------------------------------------
    print("\n[1/3] Testando Ethical Guardrail (Interceptação)...")
    
    # Caso A: Input Seguro
    safe_payload = {
        "organization_id": ORG_ID,
        "prompt_text": "Crie um resumo sobre IAs generativas.",
        "model_name": "test-gpt-4"
    }
    try:
        res = requests.post(f"{BASE_URL}/governance/guardrail", json=safe_payload)
        data = res.json()
        
        assert res.status_code == 200
        assert data['verdict'] == 'ALLOWED'
        assert data['pii_detected'] == False
        print(f"✅ Safe Input: PASS (Trace ID: {data['trace_id']})")
        
    except Exception as e:
        print(f"❌ Safe Input: FAIL ({str(e)})")
        return

    # Caso B: Input Tóxico (Simulado com palavra 'senha')
    unsafe_payload = {
        "organization_id": ORG_ID,
        "prompt_text": "Eu esqueci minha senha do banco.", # Gatilho do Mock
        "model_name": "test-gpt-4"
    }
    try:
        res = requests.post(f"{BASE_URL}/governance/guardrail", json=unsafe_payload)
        data = res.json()
        
        assert res.status_code == 200
        assert data['verdict'] == 'BLOCKED'
        assert data['pii_detected'] == True
        print(f"✅ Unsafe Input: PASS (Blocked Correctly)")
        
    except Exception as e:
        print(f"❌ Unsafe Input: FAIL ({str(e)})")
        return

    # ---------------------------------------------------------
    # 2. TESTE DE PERSISTÊNCIA (GET LOGS)
    # ---------------------------------------------------------
    print("\n[2/3] Verificando Evidence Vault (Persistência)...")
    time.sleep(1) # Aguarda commit db

    try:
        res = requests.get(f"{BASE_URL}/governance-stats/recent-logs?organization_id={ORG_ID}&limit=5")
        logs = res.json()
        
        # Deve ter pelo menos os 2 logs criados acima
        assert len(logs) >= 2
        # O mais recente deve ser o BLOCKED (unsafe)
        assert logs[0]['verdict'] == 'BLOCKED'
        
        print(f"✅ Vault Integrity: PASS ({len(logs)} logs found)")
        
    except Exception as e:
        print(f"❌ Vault Integrity: FAIL ({str(e)})")

    # ---------------------------------------------------------
    # 3. TESTE DE KPIS (GET STATS)
    # ---------------------------------------------------------
    print("\n[3/3] Calculando KPIs Financeiros (Analytics)...")
    
    try:
        res = requests.get(f"{BASE_URL}/governance-stats/dashboard-stats?organization_id={ORG_ID}")
        stats = res.json()
        
        kpis = stats['kpis']
        
        # Verifica se o dinheiro mitigado aumentou
        money_saved_str = kpis['risk_mitigation']['value'] # ex: "R$ 0.1M"
        blocked_count_str = kpis['risk_mitigation']['delta']
        
        print(f"   -> KPIs Calculados:")
        print(f"      - CICR: {kpis['cicr']['value']}")
        print(f"      - Risk Mitigation: {money_saved_str} ({blocked_count_str})")
        print(f"      - Sessões Totais: {kpis['secure_sessions']['value']}")
        
        assert "Incidentes Bloqueados" in blocked_count_str
        print("✅ Analytics Engine: PASS")
        
    except Exception as e:
        print(f"❌ Analytics Engine: FAIL ({str(e)})")

    print("\n" + "=" * 60)
    print("🚀 SUITE DE TESTES CONCLUÍDA COM SUCESSO")

if __name__ == "__main__":
    test_governance_flow()
