#!/bin/bash
# =============================================================================
# Script de Limpeza de Disco - VPS Algor Brasil
# =============================================================================
# Versão: 1.0
# Data: 04/02/2026
# Objetivo: Limpar Docker e liberar espaço em disco no VPS
# =============================================================================

set -e  # Exit on error

echo "🧹 Iniciando limpeza de disco no VPS..."
echo "================================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Verificar espaço atual
echo -e "\n${YELLOW}📊 Espaço em disco ANTES da limpeza:${NC}"
df -h | grep -E '(Filesystem|/$)'
echo ""
docker system df

# 2. Parar containers
echo -e "\n${YELLOW}⏸️  Parando containers...${NC}"
docker-compose down

# 3. Remover containers parados
echo -e "\n${YELLOW}🗑️  Removendo containers parados...${NC}"
docker container prune -f

# 4. Remover imagens não utilizadas
echo -e "\n${YELLOW}🖼️  Removendo imagens não utilizadas...${NC}"
docker image prune -a -f

# 5. Remover volumes não utilizados
echo -e "\n${YELLOW}💾 Removendo volumes órfãos...${NC}"
docker volume prune -f

# 6. Remover build cache
echo -e "\n${YELLOW}🏗️  Limpando build cache...${NC}"
docker builder prune -a -f

# 7. Limpar logs do Docker (opcional - cuidado!)
echo -e "\n${YELLOW}📝 Limpando logs antigos do Docker...${NC}"
find /var/lib/docker/containers/ -type f -name "*.log" -exec truncate -s 0 {} \; 2>/dev/null || true

# 8. Limpar arquivos temporários do projeto
echo -e "\n${YELLOW}🧹 Limpando arquivos temporários do projeto...${NC}"
rm -rf frontend/.next/ 2>/dev/null || true
rm -rf frontend/node_modules/ 2>/dev/null || true
rm -rf backend/__pycache__/ 2>/dev/null || true
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.pyc" -delete 2>/dev/null || true
find . -type f -name "*.log" -delete 2>/dev/null || true

# 9. Verificar espaço após limpeza
echo -e "\n${GREEN}✅ Espaço em disco DEPOIS da limpeza:${NC}"
df -h | grep -E '(Filesystem|/$)'
echo ""
docker system df

# 10. Rebuild e restart
echo -e "\n${YELLOW}🚀 Reconstruindo e reiniciando serviços...${NC}"
docker-compose up -d --build

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ Limpeza concluída com sucesso!${NC}"
echo -e "${GREEN}================================================${NC}"

# 11. Mostrar status dos containers
echo -e "\n${YELLOW}📦 Status dos containers:${NC}"
docker-compose ps

echo -e "\n${GREEN}💡 Dica:${NC} Execute este script regularmente para manter o VPS otimizado."
echo -e "${GREEN}💡 Dica:${NC} Use 'docker-compose logs -f backend' para monitorar logs."
