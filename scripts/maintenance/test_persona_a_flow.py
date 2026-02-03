import requests
import json

# Configuração
BASE_URL = "http://localhost:8000/api/v1"
EMAIL = "test_persona_a@algor.com"
PASSWORD = "password123"

def run_test():
    print(f"--- TESTE AUTOMATIZADO: PERSONA A (DEMO CREDITS) ---")
    
    # 1. Criar Usuario de Teste (Se nao existir)
    print(f"\n1. Autenticando/Cadastrando Usuario de Teste: {EMAIL}")
    try:
        # Tenta Login
        login_payload = {"username": EMAIL, "password": PASSWORD}
        resp = requests.post(f"{BASE_URL}/auth/access-token", data=login_payload)
        
        if resp.status_code != 200:
            # Tenta Registrar
            print("   Usuario nao encontrado, registrando...")
            reg_payload = {"email": EMAIL, "password": PASSWORD, "full_name": "Test Persona A", "phone": "11999999999"}
            resp_reg = requests.post(f"{BASE_URL}/auth/register", json=reg_payload)
            if resp_reg.status_code != 200:
                print(f"   ERRO AO REGISTRAR: {resp_reg.text}")
                return
            # Login novamente
            resp = requests.post(f"{BASE_URL}/auth/access-token", data=login_payload)
            
        token_data = resp.json()
        token = token_data['access_token']
        print(f"   LOGIN SUCESSO. Token obtido.")
        
    except Exception as e:
        print(f"   ERRO FATAL NA AUTENTICACAO: {e}")
        return

    headers = {"Authorization": f"Bearer {token}"}

    # 2. Verificar/Criar Organizacao com Creditos
    print(f"\n2. Verificando Organizacao e Saldo...")
    resp_org = requests.get(f"{BASE_URL}/organizations/me", headers=headers)
    orgs = resp_org.json()
    
    my_org = None
    for org in orgs:
        if org['role'] == 'owner':
            my_org = org
            break
            
    if not my_org:
        print("   Nenhuma organizacao 'owner' encontrada. Criando uma nova...")
        new_org_payload = {"name": "Empresa Teste Persona A"}
        resp_create = requests.post(f"{BASE_URL}/organizations/", json=new_org_payload, headers=headers)
        my_org = resp_create.json()
        print(f"   Organizacao Criada: {my_org['name']} | ID: {my_org['id']}")
    else:
        print(f"   Organizacao Encontrada: {my_org['name']} | Saldo Atual: {my_org.get('credits_balance', 'N/A')}")

    # 3. Executar Scanner (Loop ate esgotar creditos)
    print(f"\n3. Executando Scanner ate esgotar creditos...")
    
    # Arquivo dummy CSV
    csv_content = "nome,cpf,email\nTeste da Silva,123.456.789-00,teste@email.com"
    files = {'file': ('test.csv', csv_content, 'text/csv')}
    
    # Executa 5 vezes (esperamos sucesso 3x, falha 2x)
    for i in range(1, 6):
        print(f"   Tentativa {i}...", end=" ")
        
        # Files pointer reset
        files = {'file': ('test.csv', csv_content, 'text/csv')}
        
        resp_scan = requests.post(f"{BASE_URL}/scanner/upload", headers=headers, files=files)
        
        if resp_scan.status_code == 200:
            data = resp_scan.json()
            print(f"✅ SUCESSO (Riscos: {data['risks_found']})")
        elif resp_scan.status_code == 402:
            print(f"🚫 BLOQUEADO (402 Payment Required - Sem Creditos)")
            print(f"   >> SISTEMA FUNCIONOU CORRETAMENTE: O usuario foi barrado.")
            break 
        else:
            print(f"❌ ERRO INESPERADO: {resp_scan.status_code} - {resp_scan.text}")

    print("\n--- FIM DO TESTE ---")

if __name__ == "__main__":
    run_test()
