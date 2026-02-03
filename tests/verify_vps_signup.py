
import requests
import random
import string
import time

# Configurações do VPS
# Ajuste se sua URL for diferente (ex: http://IP ou https://dominio)
BASE_URL = "https://www.algorbrasil.com.br" 

def generate_random_email():
    random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))
    return f"test_vps_{random_suffix}@algor.com.br"

TEST_USER = {
    "email": generate_random_email(),
    "password": "StrongPassword123!",
    "full_name": "Test VPS User",
    "phone": "11999999999"
}

def run_test():
    print(f"🚀 INICIANDO TESTE NO VPS: {BASE_URL}")
    print(f"👤 Usuário Gerado: {TEST_USER['email']}\n")

    # 1. Signup
    print("Testing Signup...")
    signup_url = f"{BASE_URL}/api/v1/auth/signup"
    try:
        response = requests.post(signup_url, json=TEST_USER, timeout=10)
    except Exception as e:
        print(f"❌ Erro de Conexão: {e}")
        return

    if response.status_code not in [200, 201]:
        print(f"❌ Signup Falhou: {response.status_code} - {response.text}")
        return
    
    print(f"✅ Signup Sucesso: {response.json()}")

    # 2. Login (Vai falhar se email verificação for obrigatória, mas valida a credencial)
    print("\nTesting Login...")
    login_data = {
        "email": TEST_USER['email'],
        "password": TEST_USER['password']  # Usando 'password' como chave (form-data ou json?)
        # Nota: OAuth2PasswordRequestForm espera form-data com 'username' e 'password'
        # Mas vamos testar o endpoint /auth/login que configuramos para receber JSON
    }
    
    # IMPORTANTE: Seu endpoint de login é JSON ou Form-Data? 
    # V18.3.0 usa JSON com chave 'email' no body? Vamos assumir que sim.
    login_url = f"{BASE_URL}/api/v1/auth/login"
    
    response = requests.post(login_url, json=login_data)

    if response.status_code == 200:
        print(f"✅ Login Sucesso (Sem verificação?): {response.json()}")
        access_token = response.json().get('access_token')
    elif response.status_code == 400 and "inactive" in response.text.lower():
        print(f"✅ Login Barrado Corretamente (Conta Inativa/Não Verificada): {response.text}")
        print("ℹ️  Isso confirma que o bloqueio de e-mail não verificado está funcionando.")
    elif response.status_code == 401:
        print(f"❌ Credenciais Inválidas? {response.text}")
    else:
        print(f"⚠️ Resposta Inesperada no Login: {response.status_code} - {response.text}")

    print("\n🎉 TESTE DE CONECTIVIDADE E CADASTRO CONCLUÍDO!")

if __name__ == "__main__":
    run_test()
