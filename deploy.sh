#!/bin/bash
#
# ALGOR BRASIL - Script de Deploy Automatizado
# Uso: ./deploy.sh [--backend-only]
#
# Este script sincroniza o código com o GitHub e reinicia os containers
# Docker de forma segura, evitando bugs conhecidos do docker-compose 1.29.2.
#

set -e  # Para imediatamente se qualquer comando falhar

echo "=========================================="
echo "  🚀 ALGOR BRASIL - Deploy Script V1.0"
echo "=========================================="
echo ""

# 1. Sincronizar código com GitHub
echo "📥 [1/5] Sincronizando código com GitHub..."

# 🛡️ PROTEÇÃO DO .env: Salvar antes do reset e restaurar depois
# O git reset --hard apagaria o .env caso ele tenha sido removido do tracking.
ENV_BACKUP="/tmp/.env.deploy_backup"
if [ -f ".env" ]; then
    cp .env "$ENV_BACKUP"
    echo "🔒 Backup do .env salvo com segurança."
fi

git fetch origin
git reset --hard origin/main

# Restaurar o .env de produção após o reset
if [ -f "$ENV_BACKUP" ]; then
    cp "$ENV_BACKUP" .env
    rm "$ENV_BACKUP"
    echo "✅ .env de produção restaurado com sucesso."
fi

echo "✅ Código atualizado para: $(git log -1 --format='%h - %s')"
echo ""

# 2. Rodar migrações do banco de dados (ANTES de subir containers)
echo "🗄️  [2/6] Executando migrações do banco de dados..."
cd backend
# Ativa o venv de produção se existir, senão usa o Python do sistema (Docker)
if [ -d "venv" ]; then
    source venv/bin/activate
fi
PYTHONPATH=.. alembic upgrade head
cd ..
echo "✅ Banco de dados atualizado com sucesso."
echo ""

# 3. Parar containers existentes (evita bug ContainerConfig)
echo "🛑 [3/6] Parando containers..."
docker-compose down --remove-orphans 2>/dev/null || true
echo ""

# 3. Remover containers órfãos manualmente (segurança extra)
echo "🧹 [3/5] Limpando containers antigos..."
docker rm -f algor_backend algor_frontend algor_web algor_adminer 2>/dev/null || true
echo ""

# 4. Construir e subir
if [ "$1" == "--backend-only" ]; then
    echo "🔨 [4/5] Reconstruindo apenas o Backend..."
    docker-compose build backend
    echo ""
    echo "🐳 [5/5] Iniciando Backend..."
    docker-compose up -d backend
else
    echo "🔨 [4/5] Reconstruindo todos os serviços..."
    docker-compose build
    echo ""
    echo "🐳 [5/5] Iniciando todos os serviços..."
    docker-compose up -d
fi

echo ""
echo "=========================================="
echo "  ✅ Deploy Concluído!"
echo "=========================================="
echo ""

# Mostrar status
echo "📊 Status dos Containers:"
docker-compose ps
echo ""

# Mostrar logs recentes do backend
echo "📜 Últimas linhas do log do Backend:"
docker-compose logs --tail 10 backend
echo ""
echo "Para ver logs em tempo real: docker-compose logs -f backend"
