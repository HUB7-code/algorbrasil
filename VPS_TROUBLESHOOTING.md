# VPS Deployment & Troubleshooting Guide
**Versão:** 1.0  
**Data:** 03/02/2026  
**Projeto:** Algor Brasil Platform

---

## 🚀 Deployment Padrão

### Comando Principal
```bash
./deploy.sh
```

Este script automaticamente:
1. Faz `git pull` do repositório
2. Para e remove containers antigos
3. Reconstrói imagens Docker
4. Inicia os serviços

---

## ⚙️ Configuração de Variáveis de Ambiente

### Arquivo: `.env` (raiz do projeto)

**Variáveis Críticas:**
```bash
# URLs de Produção
FRONTEND_URL=https://www.algorbrasil.com.br
NEXT_PUBLIC_API_URL=${FRONTEND_URL}/api/v1

# SMTP (Gmail App Password)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=edisio.nascimentojr@gmail.com
SMTP_PASSWORD=hziy_tibq_jkow_iubu
SMTP_FROM_EMAIL=edisio.nascimentojr@gmail.com
SMTP_FROM_NAME=Algor Brasil

# Database
SQLALCHEMY_DATABASE_URI=sqlite:///./sql_app.db

# Security
SECRET_KEY=9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f
DATA_ENCRYPTION_KEY=ORPbyhRmyPZ4aqPYX6gzKssXvmDjKTSNKhlzn03fN9Q=

# OAuth
GOOGLE_CLIENT_ID=11084800495-1luf1jlpqet5ig7d6sb90rm73hha0art.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
LINKEDIN_CLIENT_ID=78q8iccxcllrj7
LINKEDIN_CLIENT_SECRET=WPL_AP1.ApsfWoWHXOrFk0ZU.RQxfOw==
```

### ⚠️ IMPORTANTE: Recarregando Variáveis

**❌ ERRADO:**
```bash
docker-compose restart backend  # NÃO recarrega .env!
```

**✅ CORRETO:**
```bash
docker-compose up -d  # Detecta mudanças e recria containers
```

**✅ GARANTIDO:**
```bash
docker-compose stop backend
docker-compose rm -f backend
docker-compose up -d backend
```

---

## 🐛 Troubleshooting Comum

### 1. Erro: `no such column: users.oauth_provider`

**Sintoma:** Cadastro retorna 500 Internal Server Error

**Causa:** Schema do banco desatualizado

**Solução:**
```bash
# Executar script de migração
docker-compose exec -T backend python <<EOF
import sqlite3
import os

db_path = "sql_app.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

try:
    c.execute("ALTER TABLE users ADD COLUMN oauth_provider VARCHAR")
    print("✅ Added oauth_provider")
except:
    print("ℹ️ oauth_provider exists")

try:
    c.execute("ALTER TABLE users ADD COLUMN oauth_id VARCHAR")
    print("✅ Added oauth_id")
except:
    print("ℹ️ oauth_id exists")
    
conn.commit()
conn.close()
EOF
```

---

### 2. E-mails com Links Errados (localhost)

**Sintoma:** E-mail de verificação tem link `http://localhost:3000/verify-email?token=...`

**Causa:** Backend não leu a variável `FRONTEND_URL` atualizada

**Diagnóstico:**
```bash
# Verificar o que o backend está lendo
docker-compose exec backend python -c "from backend.app.core.config import settings; print(settings.FRONTEND_URL)"
```

**Solução:**
```bash
# 1. Verificar .env
cat .env | grep FRONTEND_URL
# Deve mostrar: FRONTEND_URL=https://www.algorbrasil.com.br

# 2. Recriar backend
docker-compose stop backend
docker-compose rm -f backend
docker-compose up -d backend

# 3. Verificar novamente
docker-compose exec backend python -c "from backend.app.core.config import settings; print(settings.FRONTEND_URL)"
# Agora deve mostrar: https://www.algorbrasil.com.br
```

---

### 3. Logo Não Aparece nos E-mails

**Sintoma:** E-mails chegam sem a imagem do cabeçalho

**Causa (Antiga):** Logo não persistia após rebuild do Docker

**Solução (Permanente - V18.4.0+):**
A logo agora está incluída no `Dockerfile`:
```dockerfile
COPY frontend/public/logo-algor.webp /app/frontend/public/logo-algor.webp
```

Após `./deploy.sh`, a logo já estará presente automaticamente.

**Verificação:**
```bash
docker-compose exec backend ls -l /app/frontend/public/logo-algor.webp
# Deve mostrar o arquivo (127016 bytes)
```

---

### 4. Frontend Chamando API Errada

**Sintoma:** Console do navegador mostra `POST http://localhost:3000/api/v1/auth/signup`

**Causa:** Frontend não pegou a variável `NEXT_PUBLIC_API_URL`

**Solução:**
```bash
# 1. Verificar .env
cat .env | grep FRONTEND_URL
# Deve ter: FRONTEND_URL=https://www.algorbrasil.com.br

# 2. Forçar rebuild do frontend (Next.js precisa recompilar)
docker-compose stop frontend
docker-compose rm -f frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend

# 3. Limpar cache do navegador (Ctrl+Shift+Delete)
# ou abrir em aba anônima
```

---

## 📊 Verificação de Saúde do Sistema

### Checklist Pós-Deploy

Execute estes comandos para validar o deploy:

```bash
# 1. Containers rodando
docker-compose ps
# Todos devem estar "Up"

# 2. Backend lendo URLs corretas
docker-compose exec backend python -c "from backend.app.core.config import settings; print(f'FRONTEND_URL: {settings.FRONTEND_URL}')"
# Esperado: https://www.algorbrasil.com.br

# 3. Logo presente
docker-compose exec backend ls -l /app/frontend/public/logo-algor.webp
# Esperado: arquivo de ~127KB

# 4. Banco com schema correto
docker-compose exec backend python -c "import sqlite3; c = sqlite3.connect('sql_app.db').cursor(); c.execute('PRAGMA table_info(users)'); cols = [i[1] for i in c.fetchall()]; print(f'OAuth OK: {\"oauth_provider\" in cols}')"
# Esperado: OAuth OK: True

# 5. Logs sem erros
docker-compose logs backend --tail=50
# Não deve ter tracebacks Python
```

---

## 🔍 Debugging Avançado

### Ver Logs em Tempo Real
```bash
docker-compose logs -f backend
```

### Acessar Shell do Container
```bash
docker-compose exec backend sh
```

### Executar Python Interativo
```bash
docker-compose exec backend python
>>> from backend.app.core.config import settings
>>> print(settings.FRONTEND_URL)
```

### Inspecionar Banco de Dados
```bash
docker-compose exec backend python -c "
import sqlite3
conn = sqlite3.connect('sql_app.db')
c = conn.cursor()
c.execute('SELECT email, is_active, oauth_provider FROM users LIMIT 5')
for row in c.fetchall():
    print(row)
"
```

---

## 📝 Notas de Versão

### V18.4.0 - Infrastructure Hardening
- ✅ Logo persistente no Docker
- ✅ Schema do banco corrigido (oauth_provider, oauth_id)
- ✅ URLs de produção configuradas
- ✅ Onboarding simplificado (Academy)

### Lições Aprendidas
1. **Sempre usar `docker-compose up -d`** após editar `.env`
2. **Frontend precisa de rebuild** para pegar `NEXT_PUBLIC_*` vars
3. **Assets devem estar no Dockerfile** para persistir
4. **Testar em aba anônima** para evitar cache do navegador
