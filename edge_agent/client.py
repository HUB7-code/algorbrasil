import requests
import json
import time
from typing import Optional, Dict, Any

class AlgorEdgeClient:
    """
    O 'Robozinho' que vive na borda (Edge).
    Ele se conecta ao Castelo (API ALGOR) para auditar interações de IA.
    """
    
    def __init__(self, base_url: str = "http://localhost:8000", email: str = "admin@algor.com", password: str = "admin"):
        self.base_url = base_url
        self.email = email
        self.password = password
        self.token = None
        self.api_session = requests.Session()
        print(f"🤖 [Edge Agent] Inicializando vigilância em: {base_url}")

    def authenticate(self) -> bool:
        """Obtém o crachá de acesso (JWT Token)"""
        print("🔑 [Edge Agent] Tentando autenticação...")
        try:
            payload = {
                "email": self.email,
                "password": self.password,
                "scope": "" # Scope opcional, o login padrão usa isso
            }
            # O Login espera application/json ou form-data? O endpoint é UserLogin pydantic model, então JSON é ok
            # Mas espera, vamos conferir o auth.py... ah, o endpoint /login recebe UserLogin (JSON).
            
            response = self.api_session.post(f"{self.base_url}/api/v1/login", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                self.token = data.get("access_token")
                self.api_session.headers.update({"Authorization": f"Bearer {self.token}"})
                print("✅ [Edge Agent] Acesso concedido! Pronto para operar.")
                return True
            else:
                print(f"❌ [Edge Agent] Falha no login: {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ [Edge Agent] Erro de conexão: {e}")
            return False

    def check_prompt(self, 
                     prompt_text: str, 
                     model_name: str = "gpt-4-turbo", 
                     project_id: int = 1,
                     ai_asset_id: int = 1) -> Dict[str, Any]:
        """
        Envia um prompt para o Guardrail da ALGOR.
        Retorna o veredicto e o hash de auditoria.
        """
        if not self.token:
            print("⚠️ [Edge Agent] Sem token! Tentando re-autenticar...")
            if not self.authenticate():
                return {"error": "Authentication failed"}

        payload = {
            "organization_id": 1, # Fixo por enquanto
            "project_id": project_id,
            "ai_asset_id": ai_asset_id,
            "model_name": model_name,
            "prompt_text": prompt_text,
            "temperature": 0.7
        }

        try:
            start_time = time.time()
            response = self.api_session.post(f"{self.base_url}/api/v1/governance/guardrail", json=payload)
            end_time = time.time()
            latency = (end_time - start_time) * 1000

            if response.status_code == 200:
                result = response.json()
                verdict = result.get("verdict", "UNKNOWN")
                block_hash = result.get("block_hash", "No-Hash")
                
                print(f"📨 [Edge Agent] Prompt enviado. Latência: {latency:.2f}ms")
                print(f"   🛡️ Veredicto: {verdict}")
                print(f"   🔗 Hash da Prova: {block_hash[:15]}...")
                return result
            else:
                print(f"🚨 [Edge Agent] Erro no Guardrail: {response.text}")
                return {"error": response.text}

        except Exception as e:
             print(f"🚨 [Edge Agent] Erro de transporte: {e}")
             return {"error": str(e)}

if __name__ == "__main__":
    # Teste rápido se rodar direto
    client = AlgorEdgeClient()
    client.authenticate()
