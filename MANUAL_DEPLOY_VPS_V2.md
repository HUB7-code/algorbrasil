
# -----------------------------
# ALGOR BRASIL - DEPLOYMENT GUIDE (VPS)
# -----------------------------
# Data: 25/01/2026
# Status: PRODUCTION READY

# --- STEP 0: PRÉ-REQUISITOS ---
# - VPS Linux (Ubuntu 22.04+ recomendado)
# - Docker e Docker Compose instalados
# - Domínio apontado (A Record -> IP da VPS)

# --- STEP 1: CLONE & SETUP ---
git clone https://github.com/algor-brasil/plataforma-v18.git algor
cd algor

# Copiar variáveis de ambiente (PREENCHER COM DADOS REAIS DE PRODUÇÃO!)
cp .env.example .env
nano .env

# --- STEP 2: BUILD & RUN ---
# Este comando faz build do frontend e backend e sobe os containers
docker-compose up --build -d

# --- STEP 3: MIGRATIONS & SEED ---
# Criar tabelas do banco de dados (SQLite em volume persistente)
docker-compose exec backend python -c "from backend.app.db.session import engine, Base; Base.metadata.create_all(bind=engine)"

# (Opcional) Criar usuário admin inicial
# docker-compose exec backend python backend/app/commands/create_admin.py

# --- STEP 4: VERIFICAÇÃO ---
# Checar logs para garantir que não há erros
docker-compose logs -f backend

# O Frontend estará acessível na porta 3000 (ou 80 via Nginx reverso, se configurado)
