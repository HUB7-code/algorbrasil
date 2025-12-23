from backend.main import app
import sys

print("--- REGISTERED ROUTES ---")
found = False
for route in app.routes:
    if hasattr(route, "path"):
        print(f"{route.methods} {route.path}")
        if "/scanner/upload" in route.path:
            found = True

if found:
    print("\n✅ SUCESSO: A rota '/scanner/upload' foi encontrada no código!")
    sys.exit(0)
else:
    print("\n❌ ERRO: A rota NÃO foi encontrada na lista de rotas.")
    sys.exit(1)
