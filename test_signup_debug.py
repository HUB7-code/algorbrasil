"""
Script de teste para verificar a resposta do endpoint /signup
"""
import requests
import json

# Dados de teste
payload = {
    "email": "teste_debug@empresa.com.br",
    "password": "Teste@123",
    "full_name": "Teste Debug",
    "phone": "85999999999",
    "confirm_password": "Teste@123"
}

# Fazer requisição
url = "http://localhost:8000/api/v1/signup"
print(f"🔍 Testando endpoint: {url}")
print(f"📤 Payload: {json.dumps(payload, indent=2)}")
print("\n" + "="*60 + "\n")

try:
    response = requests.post(url, json=payload)
    
    print(f"📡 Status Code: {response.status_code}")
    print(f"📡 Headers: {dict(response.headers)}")
    print("\n" + "="*60 + "\n")
    
    print(f"📄 Raw Response Text:")
    print(response.text)
    print("\n" + "="*60 + "\n")
    
    # Tentar fazer parse do JSON
    try:
        data = response.json()
        print(f"✅ JSON Parse Success:")
        print(json.dumps(data, indent=2, ensure_ascii=False))
    except json.JSONDecodeError as e:
        print(f"❌ JSON Parse Error: {e}")
        print(f"❌ Posição do erro: {e.pos}")
        print(f"❌ Linha: {e.lineno}, Coluna: {e.colno}")
        
except Exception as e:
    print(f"❌ Request Error: {e}")
