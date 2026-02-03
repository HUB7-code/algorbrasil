import requests
import sys

# Tentar upload na URL padrão
url = "http://127.0.0.1:8000/api/v1/scanner/upload"
url_alt = "http://localhost:8000/api/v1/scanner/upload"

files = {'file': ('test.json', '[{"content": "CPF 123.456.789-00"}]', 'application/json')}

print(f"Tentando POST em {url}...")
try:
    r = requests.post(url, files=files)
    print(f"Status Code: {r.status_code}")
    print(f"Response: {r.text[:200]}")
    
    if r.status_code == 200:
        print("\n✅ SUCESSO! O Backend está funcional e recebendo uploads.")
        print("Se o navegador falha, é problema de CORS ou Cache do Frontend.")
    elif r.status_code == 404:
        print("\n❌ ERRO 404 (Not Found). O Backend NÃO reconhece a rota.")
        print("O servidor precisa ser reiniciado manualmente para carregar o novo módulo.")
    else:
        print(f"\n⚠️ ERRO {r.status_code}. Algo inesperado ocorreu.")

except Exception as e:
    print(f"\n❌ FALHA DE CONEXÃO: {e}")
    print("O servidor parece estar desligado ou em outra porta.")

