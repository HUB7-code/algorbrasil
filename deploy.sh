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
git fetch origin
git reset --hard origin/main
echo "✅ Código atualizado para: $(git log -1 --format='%h - %s')"
echo ""

# 2. Parar containers existentes (evita bug ContainerConfig)
echo "🛑 [2/5] Parando containers..."
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
