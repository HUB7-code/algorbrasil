"""
Script de teste automatizado para validar o endpoint de registro no VPS
"""
import requests
import json
from datetime import datetime

# Configuração
BASE_URL = "https://www.algorbrasil.com.br"
TEST_EMAIL = f"teste_{datetime.now().strftime('%Y%m%d_%H%M%S')}@empresa.com.br"

print("="*60)
print("🧪 TESTE AUTOMATIZADO - ENDPOINT DE REGISTRO")
print("="*60)
print(f"\n🌐 URL Base: {BASE_URL}")
print(f"📧 Email de Teste: {TEST_EMAIL}\n")

# Dados de teste
payload = {
    "email": TEST_EMAIL,
    "password": "Teste@123",
    "full_name": "Teste Automatizado",
    "phone": "85999999999",
    "confirm_password": "Teste@123"
}

print("📤 Enviando requisição de registro...")
print(f"Payload: {json.dumps(payload, indent=2, ensure_ascii=False)}\n")

try:
    # Fazer requisição
    response = requests.post(
        f"{BASE_URL}/api/v1/signup",
        json=payload,
        timeout=10
    )
    
    print("="*60)
    print("📡 RESPOSTA DO SERVIDOR")
    print("="*60)
    print(f"Status Code: {response.status_code}")
    print(f"Headers: {dict(response.headers)}\n")
    
    # Tentar fazer parse do JSON
    try:
        data = response.json()
        print("✅ JSON Parse: SUCCESS")
        print(f"\nResposta JSON:")
        print(json.dumps(data, indent=2, ensure_ascii=False))
        
        # Validar resposta
        if response.status_code == 201:
            print("\n" + "="*60)
            print("✅ TESTE PASSOU!")
            print("="*60)
            print("✅ Cadastro realizado com sucesso")
            print(f"✅ Email: {data.get('email')}")
            print(f"✅ Status: {data.get('status')}")
            print(f"✅ Mensagem: {data.get('message')}")
        elif response.status_code == 400:
            print("\n" + "="*60)
            print("⚠️ ERRO ESPERADO (Email já cadastrado)")
            print("="*60)
            print(f"Detalhe: {data.get('detail')}")
        else:
            print("\n" + "="*60)
            print("❌ TESTE FALHOU!")
            print("="*60)
            print(f"Status inesperado: {response.status_code}")
            print(f"Detalhe: {data.get('detail')}")
            
    except json.JSONDecodeError as e:
        print("\n" + "="*60)
        print("❌ TESTE FALHOU - JSON INVÁLIDO!")
        print("="*60)
        print(f"❌ Erro de Parse: {e}")
        print(f"❌ Resposta Raw: {response.text[:500]}")
        
except requests.exceptions.RequestException as e:
    print("\n" + "="*60)
    print("❌ ERRO DE CONEXÃO!")
    print("="*60)
    print(f"Erro: {e}")

print("\n" + "="*60)
print("FIM DO TESTE")
print("="*60)
