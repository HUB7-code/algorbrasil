
import requests
import sqlite3
import jwt
from datetime import datetime, timedelta

# Configurações
BASE_URL = "http://localhost:8000"
DB_PATH = "sql_app.db"
SECRET_KEY = "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f"
ALGORITHM = "HS256"

TEST_USER = {
    "email": "test_auto_signup_v2@algor.com.br",
    "password": "StrongPassword123!",
    "full_name": "Test Automation User",
    "phone": "11999999999"
}

def get_db_connection():
    return sqlite3.connect(DB_PATH)

def cleanup_user():
    print(f"🧹 Limpando usuário de teste: {TEST_USER['email']}")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE email = ?", (TEST_USER['email'],))
    conn.commit()
    conn.close()
    print("✅ Limpeza concluída.")

def generate_verification_token(email):
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode = {"sub": email, "type": "email_verification", "exp": expire}
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def run_test():
    print("🚀 INICIANDO TESTE DE FLUXO DE REGISTRO\n")

    # 1. Limpeza
    cleanup_user()

    # 2. Signup
    print("Testing Signup...")
    signup_url = f"{BASE_URL}/api/v1/auth/signup"
    response = requests.post(signup_url, json=TEST_USER)
    
    if response.status_code not in [200, 201]:
        print(f"❌ Signup Falhou: {response.status_code} - {response.text}")
        exit(1)
    
    print(f"✅ Signup Sucesso: {response.json()}")

    # 3. Verificar estado no banco (deve estar inativo)
    conn = get_db_connection()
    cursor = conn.cursor()
    user = cursor.execute("SELECT id, is_active FROM users WHERE email = ?", (TEST_USER['email'],)).fetchone()
    conn.close()

    if not user:
        print("❌ Usuário não encontrado no banco!")
        exit(1)
    
    print(f"🔍 Estado no Banco antes da verificação: Active={user[1]}")
    if user[1] != 0: # 0 = False in SQLite
        print("⚠️ Aviso: Usuário já nasceu ativo (talvez a lógica tenha mudado?)")
    
    # 4. Verificar Email
    print("\nTesting Email Verification...")
    token = generate_verification_token(TEST_USER['email'])
    verify_url = f"{BASE_URL}/api/v1/auth/verify-email"
    response = requests.post(verify_url, json={"token": token})

    if response.status_code != 200:
        print(f"❌ Verificação Falhou: {response.status_code} - {response.text}")
        exit(1)
    
    print(f"✅ Verificação Sucesso: {response.json()}")

    # 5. Login
    print("\nTesting Login...")
    login_data = {
        "email": TEST_USER['email'],
        "password": TEST_USER['password']
    }
    login_url = f"{BASE_URL}/api/v1/auth/login"
    response = requests.post(login_url, json=login_data)

    if response.status_code != 200:
        print(f"❌ Login Falhou: {response.status_code} - {response.text}")
        exit(1)
    
    token_data = response.json()
    access_token = token_data['access_token']
    print(f"✅ Login Sucesso. Token recebido.")

    # 6. Validar /me
    print("\nValidating Protected Route (/users/me)...")
    headers = {"Authorization": f"Bearer {access_token}"}
    me_url = f"{BASE_URL}/api/v1/auth/users/me"
    response = requests.get(me_url, headers=headers)

    if response.status_code != 200:
        print(f"❌ /users/me Falhou: {response.status_code} - {response.text}")
        exit(1)
    
    user_data = response.json()
    print(f"✅ Dados do Usuário: {user_data['email']} - {user_data['full_name']}")
    
    print("\n🎉 TESTE DE REGISTRO COMPLETO COM SUCESSO! 🎉")

if __name__ == "__main__":
    run_test()
