import requests
import concurrent.futures
import time

URL = "http://localhost:8000/api/v1/lab/xai/audit"
FILE_PATH = "backend/tests/stress_data.csv"
CONCURRENT_USERS = 20

def simulate_user(id):
    try:
        start_time = time.time()
        with open(FILE_PATH, 'rb') as f:
            files = {'file': (f'stress_test_{id}.csv', f, 'text/csv')}
            response = requests.post(URL, files=files)
        
        elapsed = (time.time() - start_time) * 1000
        status = response.status_code
        
        result = "✅ SUCESSO" if status == 200 else ("🛡️ BLOQUEADO (429)" if status == 429 else f"❌ ERRO ({status})")
        print(f"User {id:02d} | Status: {status} | Tempo: {elapsed:.0f}ms | {result}")
        return status
    except Exception as e:
        print(f"User {id:02d} | FALHA DE CONEXÃO: {str(e)}")
        return 0

print(f"--- INICIANDO STRESS TEST: {CONCURRENT_USERS} CONCORRENTES ---")
print(f"Alvo: {URL}")
print(f"Arquivo: 50k linhas (Simulação de Carga Pandas)")
print("-" * 60)

start_total = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=CONCURRENT_USERS) as executor:
    results = list(executor.map(simulate_user, range(CONCURRENT_USERS)))

duration = time.time() - start_total
print("-" * 60)
print(f"Teste finalizado em {duration:.2f} segundos.")
print(f"Sucessos (200 OK): {results.count(200)}")
print(f"Bloqueios Rate Limit (429): {results.count(429)}")
print(f"Erros de Servidor (500): {results.count(500)}")
