import requests
import sys
import os
import secrets

# Configurações
API_URL = "http://127.0.0.1:8001/api/v1"
HEALTH_URL = "http://127.0.0.1:8001/"
FRONTEND_PATH = os.getcwd()

# Cores para o Terminal
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

def print_pass(message):
    print(f"[{GREEN}PASS{RESET}] {message}")

def print_fail(message):
    print(f"[{RED}FAIL{RESET}] {message}")

def test_backend_health():
    print("\n--- Testando Backend Health ---")
    try:
        r = requests.get(HEALTH_URL)
        if r.status_code == 200:
            print_pass("Backend respondendo status 200")
            print(f"       Info: {r.json()}")
        else:
            print_fail(f"Backend retornou {r.status_code}")
    except Exception as e:
        print_fail(f"Falha na conexão: {e}")

def test_signup_flow():
    print("\n--- Testando Fluxo de Cadastro (Nível 1) ---")
    random_id = secrets.token_hex(4)
    email = f"test_user_{random_id}@example.com"
    password = "password123"
    name = f"Test User {random_id}"
    
    payload = {
        "email": email,
        "password": password,
        "full_name": name,
        "phone": "11999999999"
    }
    
    try:
        # 1. Tentar Criar
        r = requests.post(f"{API_URL}/signup", json=payload)
        if r.status_code == 201:
            print_pass(f"Usuário criado com sucesso: {email}")
        else:
            print_fail(f"Erro ao criar usuário: {r.text}")
            return None, None

        # 2. Tentar Duplicidade (Deve falhar)
        r_dup = requests.post(f"{API_URL}/signup", json=payload)
        if r_dup.status_code == 400:
            print_pass("Proteção contra email duplicado funcionando")
        else:
            print_fail(f"Falha na proteção de duplicidade. Código: {r_dup.status_code}")

        return email, password

    except Exception as e:
        print_fail(f"Exceção no fluxo de cadastro: {e}")
        return None, None

def test_login_flow(email, password):
    print("\n--- Testando Fluxo de Login e Token ---")
    payload = {"email": email, "password": password}
    
    try:
        r = requests.post(f"{API_URL}/login", json=payload)
        if r.status_code == 200:
            data = r.json()
            if "access_token" in data and "role" in data:
                print_pass("Login realizado com sucesso")
                print_pass(f"Token JWT recebido")
                print_pass(f"Role detectada: {data['role']}")
                
                if data['role'] == 'subscriber':
                     print_pass("Role correta para novo usuário (subscriber)")
                else:
                     print_fail(f"Role incorreta: {data['role']}")
            else:
                print_fail("Resposta de login incompleta (faltam chaves)")
        else:
            print_fail(f"Login falhou: {r.text}")

    except Exception as e:
         print_fail(f"Exceção no login: {e}")

def test_frontend_integrity():
    print("\n--- Testando Integridade dos Arquivos Frontend ---")
    
    files_to_check = [
        "index.html",
        "login.html",
        "signup.html",
        "dashboard.html",
        "associe-se.html",
        "js/auth-client.js"
    ]
    
    all_exist = True
    for fname in files_to_check:
        fpath = os.path.join(FRONTEND_PATH, fname)
        if os.path.exists(fpath):
            print_pass(f"Arquivo encontrado: {fname}")
        else:
            print_fail(f"Arquivo FALTANDO: {fname}")
            all_exist = False
            
    # Checar se index.html tem links para signup.html
    try:
        with open(os.path.join(FRONTEND_PATH, "index.html"), "r", encoding="utf-8") as f:
            content = f.read()
            if 'href="signup.html"' in content:
                print_pass("Links para signup.html encontrados na Home")
            else:
                print_fail("Nenhum link para 'signup.html' encontrado na Home (Funil pode estar quebrado)")
    except Exception as e:
        print_fail(f"Erro ao ler index.html: {e}")

def run():
    print("=== INICIANDO SUÍTE DE TESTES ALGOR BRASIL ===")
    test_backend_health()
    email, password = test_signup_flow()
    if email:
        test_login_flow(email, password)
    test_frontend_integrity()
    print("\n=== FIM DOS TESTES ===")

if __name__ == "__main__":
    run()
