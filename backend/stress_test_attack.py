import asyncio
import httpx
import time

BASE_URL = "http://127.0.0.1:8000"
ATTACK_COUNT = 50  # Número de requisições para disparar

async def attack_endpoint(client, i):
    start = time.time()
    try:
        response = await client.get(f"{BASE_URL}/")
        end = time.time()
        duration = (end - start) * 1000
        
        status = response.status_code
        if status == 200:
            print(f"✅ Req {i}: Sucesso ({duration:.2f}ms)")
        elif status == 429:
            print(f"🛡️ Req {i}: BLOQUEADO PELO ESCUDO (Rate Limit) ({duration:.2f}ms)")
        else:
            print(f"⚠️ Req {i}: Status {status}")
            
    except Exception as e:
        print(f"❌ Req {i}: Erro de conexão - {e}")

async def run_attack():
    print(f"🚀 INICIANDO ATAQUE SIMULADO ({ATTACK_COUNT} requisições)...")
    print("---------------------------------------------------")
    
    async with httpx.AsyncClient() as client:
        tasks = []
        for i in range(1, ATTACK_COUNT + 1):
            tasks.append(attack_endpoint(client, i))
            
        await asyncio.gather(*tasks)

    print("---------------------------------------------------")
    print("🏁 Ataque finalizado.")

if __name__ == "__main__":
    try:
        asyncio.run(run_attack())
    except ImportError:
        print("Erro: Instale o 'httpx' para rodar este teste (pip install httpx)")
