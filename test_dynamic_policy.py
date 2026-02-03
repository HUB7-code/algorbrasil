import requests
import json
import time

BASE_URL = "http://localhost:8000/api/v1"
ORG_ID = 1

def test_dynamic_policy_flow():
    print("🧪 INICIANDO TESTE: POLICY ENGINE DINÂMICO")
    print("=========================================")

    # 1. Criar uma nova política
    policy_name = f"Policy Test {int(time.time())}"
    print(f"1. Criando Política: '{policy_name}'...")
    
    resp = requests.post(f"{BASE_URL}/governance/policies", json={
        "organization_id": ORG_ID,
        "name": policy_name,
        "description": "Política gerada automaticamente pelo teste."
    })
    
    if resp.status_code != 200:
        print(f"❌ Falha ao criar política: {resp.text}")
        return
        
    policy_data = resp.json()
    policy_id = policy_data["id"]
    print(f"   ✅ Política Criada (ID: {policy_id})")

    # 2. Adicionar uma Regra de Bloqueio (Palavra única: 'abacaxi_atomico')
    forbidden_word = "abacaxi_atomico"
    print(f"2. Adicionando Regra: Bloquear '{forbidden_word}'...")
    
    resp = requests.post(f"{BASE_URL}/governance/policies/{policy_id}/rules", json={
        "rule_type": "keyword_fuzzy",
        "content": forbidden_word,
        "action": "BLOCK",
        "severity": "CRITICAL"
    })
    
    if resp.status_code != 200:
        print(f"❌ Falha ao criar regra: {resp.text}")
        return
    
    print("   ✅ Regra Adicionada.")

    # 3. Teste A: Prompt Seguro (Não deve bloquear)
    print("3. Testando Prompt Seguro ('Eu gosto de maçãs')...")
    resp = requests.post(f"{BASE_URL}/governance/guardrail", json={
        "organization_id": ORG_ID,
        "project_id": 1, 
        "ai_asset_id": 1,
        "prompt_text": "Eu gosto de maçãs e peras.",
        "model_name": "gpt-4"
    })
    
    if resp.status_code != 200:
        print(f"❌ Erro na API: {resp.status_code} - {resp.text}")
        return

    data = resp.json()
    if data["verdict"] == "ALLOWED":
        print(f"   ✅ PASSOU: Veredito '{data['verdict']}' (Esperado)")
    else:
        print(f"   ❌ FALHOU: Veredito '{data['verdict']}' (Esperava ALLOWED)")

    # 4. Teste B: Prompt Tóxico (Deve bloquear pela nova regra)
    print(f"4. Testando Prompt Tóxico ('Quero comprar um {forbidden_word}')...")
    resp = requests.post(f"{BASE_URL}/governance/guardrail", json={
        "organization_id": ORG_ID,
        "project_id": 1,
        "ai_asset_id": 1,
        "prompt_text": f"Quero comprar um {forbidden_word} agora.",
        "model_name": "gpt-4"
    })
    data = resp.json()
    
    # Debug response
    # print(json.dumps(data, indent=2))
    
    if data["verdict"] == "BLOCKED":
        print(f"   ✅ SUCESSO: Veredito '{data['verdict']}'")
        print(f"   🛡️  Trace ID: {data['trace_id']}")
    else:
        print(f"   ❌ FALHA CRÍTICA: O Guardrail não bloqueou a palavra proibida! Veredito: {data['verdict']}")

    print("\n🏁 Fim do Teste Dinâmico.")

if __name__ == "__main__":
    test_dynamic_policy_flow()
