# GUIA DE DEPLOY (VPS) - v17.5.0

Este guia descreve os passos necessários para sincronizar o seu servidor VPS com as últimas atualizações de segurança e funcionalidades (v17.5.0).

## 1. Atualizar Código Fonte
No servidor VPS, navegue até a pasta do projeto e baixe a versão mais recente:

```bash
cd /caminho/do/projeto/algor-brasil
git pull origin main
```

## 2. Backend (Python)
Novas bibliotecas de segurança (`pyjwt`, `slowapi`) foram adicionadas e bibliotecas vulneráveis (`python-jose`) removidas.

```bash
cd backend
# Ativar ambiente virtual (se estiver usando venv)
source venv/bin/activate 

# Instalar novas dependências
pip install -r requirements.txt

# Reiniciar o serviço (exemplo com systemd ou uvicorn direto)
# sudo systemctl restart algor-backend
# OU se estiver rodando manualmente:
# kill -9 <PID> && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 3. Frontend (Next.js)
Novos componentes gráficos e bibliotecas (`recharts`, `framer-motion`) exigem reconstrução.

```bash
cd ../frontend
# Instalar novas dependências do Node
npm install

# Construir a versão de produção otimizada
npm run build

# Reiniciar o serviço do frontend (exemplo com PM2)
# pm2 restart algor-frontend
```

## 4. Banco de Dados (Opcional)
Se houver alterações de schema (nesta atualização focamos em segurança, mas é bom prevenir):

```bash
# Caso utilize migrações (alembic)
# alembic upgrade head
```

## 5. Verificação Pós-Deploy
Após reiniciar, execute os seguintes testes rápidos para garantir que a segurança está ativa:

1. **Teste de Login:** Tente logar. Se falhar com erro de token, limpe os cookies do navegador (devido à mudança de criptografia JWT).
2. **Teste de Segurança:** Verifique se os headers de servidor foram removidos:
   ```bash
   curl -I https://sua-vps.com
   # Não deve aparecer "Server: uvicorn" ou "Server: nginx/x.x.x"
   ```

---
**Gerado por:** Agente Antigravity
**Data:** 30/12/2025
