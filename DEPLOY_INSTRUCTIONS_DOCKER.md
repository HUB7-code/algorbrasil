# GUIA DE DEPLOY (VPS com Docker) - v17.5.0

Este guia descreve os passos para atualizar seu servidor VPS rodando Docker.

## 1. Atualizar Código Fonte
Acesse o servidor via SSH, vá para a pasta do projeto e baixe as atualizações:

```bash
cd /root/algorbrasil
git pull origin main
```

## 2. Reconstruir os Containers
Como houve mudanças nas dependências (requirements.txt e package.json), é crucial forçar o rebuild.

```bash
# Derruba os serviços antigos
docker-compose down

# Reconstrói as imagens (Backend instala pyjwt, Frontend roda npm install)
docker-compose build --no-cache

# Sobe tudo em background
docker-compose up -d
```

## 3. Verificação (Logs)
Certifique-se de que não há erros de inicialização:

```bash
# Ver logs do backend (Python)
docker-compose logs -f backend

# Ver logs do frontend (Next.js)
docker-compose logs -f frontend
```

---
**Observação Importante:**
No seu `docker-compose.yml`, o frontend está configurado para desenvolvimento (`npm run dev`).
Para produção real, o ideal seria alterar o comando no `docker-compose.yml` para `npm run build && npm start`.
Mas se você quer manter como está (dev mode), o `docker-compose up` já vai rodar o `npm install` novamente devido ao comando definido: `sh -c "npm install && npm run dev"`.

**Gerado por:** Agente Antigravity
**Data:** 30/12/2025
