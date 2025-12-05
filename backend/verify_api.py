import httpx
import sys

# Cores para o terminal
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"

BASE_URL = "http://127.0.0.1:8002"

def log(msg, type="info"):
    if type == "success":
        print(f"{GREEN}✅ {msg}{RESET}")
    elif type == "error":
        print(f"{RED}❌ {msg}{RESET}")
    else:
        print(f"ℹ️  {msg}")

def test_health_check():
    log("Testando Endpoint de Saúde (Health Check)...")
    try:
        response = httpx.get(f"{BASE_URL}/")
        if response.status_code == 200:
            data = response.json()
            if data["status"] == "online" and data["security"] == "active":
                log("Health Check: OK", "success")
                return True
            else:
                log(f"Health Check: Resposta inesperada - {data}", "error")
        else:
            log(f"Health Check Falhou: Status {response.status_code}", "error")
    except Exception as e:
        log(f"Erro de conexão: {e}", "error")
    return False

def test_login_flow():
    log("\nTestando Fluxo de Login (Autenticação JWT)...")
    
    # Dados do Admin criado anteriormente
    payload = {
        "email": "admin@algor.com",
        "password": "admin123"
    }
    
    try:
        response = httpx.post(f"{BASE_URL}/api/v1/login", json=payload)
        
        if response.status_code == 200:
            token_data = response.json()
            token = token_data.get("access_token")
            type = token_data.get("token_type")
            
            if token and type == "bearer":
                log("Login: SUCESSO!", "success")
                log(f"Token JWT Recebido: {token[:20]}... (truncado)", "success")
                return token
            else:
                log("Login: Token não encontrado na resposta.", "error")
        elif response.status_code == 401:
            log("Login: Falha de autenticação (401). Senha incorreta?", "error")
        else:
            log(f"Login: Erro desconhecido ({response.status_code})", "error")
            print(response.text)
            
    except Exception as e:
        log(f"Erro no login: {e}", "error")
    return None

def test_security_headers():
    log("\nVerificando Headers de Blindagem...")
    try:
        response = httpx.get(f"{BASE_URL}/")
        headers = response.headers
        
        # Lista de headers que o 'secure' deve injetar
        expected_headers = [
            "X-Frame-Options",
            "X-Content-Type-Options",
            "Strict-Transport-Security",
            "Content-Security-Policy"
        ]
        
        missing = []
        for h in expected_headers:
            if h in headers:
                print(f"   - {h}: {GREEN}Presente{RESET}")
            else:
                print(f"   - {h}: {RED}AUSENTE{RESET}")
                missing.append(h)
        
        if not missing:
            log("Todos os headers de segurança estão ativos!", "success")
        else:
            log("Alguns headers de segurança estão faltando.", "error")
            
    except Exception:
        pass

if __name__ == "__main__":
    print(f"🔍 Iniciando Auditoria Automatizada da API no {BASE_URL}\n")
    
    if test_health_check():
        token = test_login_flow()
        test_security_headers()
        
    print("\n🏁 Auditoria finalizada.")
