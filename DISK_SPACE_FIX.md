# 🔧 Solução: Espaço em Disco Crescendo no VPS

**Problema:** Mesmo removendo código, o VPS ocupa mais espaço a cada deploy.

**Causa Raiz:** 
1. Histórico Git com 2.45 GB de arquivos desnecessários (`.next/cache/`)
2. `.dockerignore` incompleto permitindo build cache no Docker
3. Nginx montando todo o repositório (incluindo `.git/`)

---

## 📋 Plano de Ação

### **Passo 1: Limpar Histórico Git (Remover Arquivos Grandes)**

```bash
# 1. Instalar git-filter-repo (ferramenta recomendada pelo GitHub)
pip install git-filter-repo

# 2. Fazer backup do repositório
cd c:\Users\edisi\.gemini\antigravity\playground
cp -r chrono-aldrin chrono-aldrin-backup

# 3. Remover pastas do histórico Git
cd chrono-aldrin
git filter-repo --path frontend/.next --invert-paths
git filter-repo --path frontend/node_modules --invert-paths
git filter-repo --path backend/__pycache__ --invert-paths

# 4. Forçar push (ATENÇÃO: Reescreve histórico!)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push origin --force --all
git push origin --force --tags
```

⚠️ **IMPORTANTE:** Isso reescreve o histórico do Git. Todos que têm clone do repo precisarão fazer `git clone` novamente.

---

### **Passo 2: Atualizar `.dockerignore`**

Adicionar estas linhas ao `.dockerignore`:

```
# Build artifacts
frontend/.next/
frontend/out/
frontend/build/
frontend/dist/

# Dependencies
frontend/node_modules/
backend/node_modules/

# Python cache
backend/__pycache__/
**/__pycache__/
*.pyc
*.pyo
*.pyd

# Logs
*.log
logs/

# Git
.git/
.gitignore

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Temp files
*.tmp
*.temp
*.swp
```

---

### **Passo 3: Otimizar `docker-compose.yml`**

**Problema Atual (linha 53):**
```yaml
- .:/usr/share/nginx/html  # ❌ Monta TODO o projeto
```

**Solução:** Montar apenas arquivos estáticos necessários:
```yaml
volumes:
  # Montar apenas arquivos estáticos específicos
  - ./frontend/public:/usr/share/nginx/html/public:ro
  - ./nginx.conf:/etc/nginx/nginx.conf:ro
  # Volumes para Certbot (SSL)
  - ./certbot/conf:/etc/letsencrypt:ro
  - ./certbot/www:/var/www/certbot:ro
```

---

### **Passo 4: Limpar Docker no VPS**

```bash
# SSH no VPS
ssh usuario@seu-vps.com

# Parar containers
cd /caminho/do/projeto
docker-compose down

# Limpar imagens antigas
docker system prune -a --volumes -f

# Limpar build cache
docker builder prune -a -f

# Verificar espaço liberado
df -h
docker system df
```

---

### **Passo 5: Adicionar `.gitignore` Robusto**

Criar/atualizar `.gitignore`:

```
# Build outputs
frontend/.next/
frontend/out/
frontend/build/
frontend/dist/

# Dependencies
node_modules/
frontend/node_modules/
backend/venv/

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Database
*.db
*.sqlite
*.sqlite3
sql_app.db

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
logs/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Docker
docker-compose.override.yml
```

---

## 🎯 Resultado Esperado

Após aplicar todas as correções:

| Item | Antes | Depois |
|------|-------|--------|
| **Repositório Git** | 2.45 GB | ~50 MB |
| **Build Docker** | Copia tudo | Apenas código necessário |
| **Deploy no VPS** | Cresce sempre | Tamanho estável |

---

## 🚀 Ordem de Execução Recomendada

1. ✅ **Atualizar `.dockerignore`** (seguro, sem risco)
2. ✅ **Atualizar `.gitignore`** (seguro, sem risco)
3. ✅ **Commit e push** das mudanças acima
4. ⚠️ **Limpar histórico Git** (requer coordenação se houver outros devs)
5. ✅ **Otimizar `docker-compose.yml`** (testar localmente primeiro)
6. ✅ **Limpar Docker no VPS**

---

## 📊 Monitoramento Pós-Fix

Após o deploy, verificar:

```bash
# No VPS
du -sh /caminho/do/projeto/.git/  # Deve ser < 100 MB
docker system df                   # Verificar uso de disco
df -h                              # Espaço total do disco
```

---

## 🆘 Rollback (Se Algo Der Errado)

```bash
# Restaurar backup
cd c:\Users\edisi\.gemini\antigravity\playground
rm -rf chrono-aldrin
mv chrono-aldrin-backup chrono-aldrin
cd chrono-aldrin
git push origin --force --all
```

---

**Criado em:** 04/02/2026  
**Versão:** 1.0  
**Status:** Pronto para execução
