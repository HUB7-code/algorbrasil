import requests
import time
import os

BASE_URL = "http://localhost:8000/api/v1/lab"
XAI_URL = f"{BASE_URL}/xai/audit"
SHADOW_URL = f"{BASE_URL}/shadow/scan"

# Arquivos de Teste
DEMO_DIR = "frontend/public/demo"
CSV_FILE = os.path.join(DEMO_DIR, "RISCO_MODELO_BLACKBOX.csv")
TXT_FILE = os.path.join(DEMO_DIR, "VAZAMENTO_PRONTUARIO.txt")

# Criar arquivo fake de malware (EXE com extensão CSV)
FAKE_MALWARE = "backend/tests/fake_malware.csv"
with open(FAKE_MALWARE, "wb") as f:
    # Header de um executável DOS/Windows (MZ)
    f.write(b'MZ\x90\x00\x03\x00\x00\x00\x04\x00\x00\x00\xff\xff\x00\x00\xb8\x00\x00\x00')

def check_step(name, success):
    icon = "[OK]" if success else "[FAIL]"
    print(f"{icon} {name}")
    return success

print("=== INICIANDO AUDITORIA FINAL DE SEGURANCA E SANIDADE ===")

all_pass = True

# 1. TESTE DE SANIDADE (XAI)
print("\n[1] Check de Sanidade (XAI Auditor)")
try:
    with open(CSV_FILE, "rb") as f:
        files = {"file": ("demo.csv", f, "text/csv")}
        resp = requests.post(XAI_URL, files=files)
        if check_step("Upload CSV Valido (200 OK)", resp.status_code == 200):
            data = resp.json()
            check_step("Risco Critico Detectado (Score Check)", data['score'] < 50)
        else:
            all_pass = False
            print(f"   Erro: {resp.text}")
except Exception as e:
    print(f"   Falha de conexao: {e}")
    all_pass = False

# 2. TESTE DE SEGURANCA (MALWARE BLOCK - MAGIC BYTES)
print("\n[2] Check de Seguranca (Iron Dome - Anti-Malware)")
try:
    with open(FAKE_MALWARE, "rb") as f:
        files = {"file": ("virus_disfarcado.csv", f, "text/csv")} # Extensão .csv enganosa
        resp = requests.post(XAI_URL, files=files)
        
        # Esperamos 400 Bad Request
        if check_step("Bloqueio de Executavel Renomeado (400 Bad Request)", resp.status_code == 400):
            print("   Resposta do Servidor:", resp.json()['detail'])
        else:
            all_pass = False
            print(f"   FALHA CRITICA: Malware passou ou erro incorreto ({resp.status_code})")
except Exception as e:
    print(f"   Erro: {e}")
    all_pass = False

# 3. TESTE DE CARGA DE TEXTO (ANTI-REDOS)
print("\n[3] Check de Carga de Texto (Anti-ReDoS)")
payload = {"text": "A" * 60000} # 60k chars (limite é 50k)
resp = requests.post(SHADOW_URL, json=payload)
if check_step("Bloqueio de Payload Gigante (400 Bad Request)", resp.status_code == 400): # Esperado erro no sanitizer
    print("   Status:", resp.status_code)
else:
    # Se falhar o 400, pode ter dado 422 (Validation Error), vamos checar
    if resp.status_code == 422:
         print("   WARN: Retornou 422 (Validation). Aceitavel, mas 400 seria melhor.")
    else:
        all_pass = False
        print(f"   FALHA: Texto passou ou erro 500 ({resp.status_code})")

# 4. TESTE DE WHITELIST (RATE LIMIT IGNORED)
print("\n[4] Check de Whitelist (VIP Access)")
print("   Enviando 25 requisicoes rapidas (Limite normal e 20/min)...")
blocked = False
for i in range(25):
    try:
        with open(CSV_FILE, "rb") as f:
            files = {"file": (f"spam_{i}.csv", f, "text/csv")}
            resp = requests.post(XAI_URL, files=files)
            if resp.status_code == 429:
                blocked = True
                break
    except:
        pass

if check_step("Whitelist Ativa (Nenhum Bloqueio em 25 reqs)", not blocked):
    print("   O IP Local (Edisio) esta imune ao Rate Limit.")
else:
    all_pass = False
    print("   FAIL: O IP Local foi bloqueado. Whitelist inativa!")

# Limpeza
try:
    os.remove(FAKE_MALWARE)
except:
    pass

print("\n" + "="*50)
if all_pass:
    print("CONCLUSAO: SISTEMA PRONTO PARA COMBATE (GO)")
else:
    print("CONCLUSAO: FALHAS DETECTADAS (NO-GO)")
print("="*50)
