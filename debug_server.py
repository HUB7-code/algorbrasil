
import sys
import os

# Adiciona o diretório atual ao path para simular a raiz do projeto
sys.path.append(os.getcwd())

print("🔍 Verificando integridade do Backend...")

try:
    print("Tentando importar backend.app.api.auth...")
    from backend.app.api import auth
    print("✅ backend.app.api.auth importado com sucesso!")

    print("Tentando importar backend.app.main...")
    from backend.app import main
    print("✅ backend.app.main importado com sucesso!")

except Exception as e:
    print("\n❌ ERRO ENCONTRADO:")
    print(e)
    import traceback
    traceback.print_exc()
