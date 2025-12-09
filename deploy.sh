#!/bin/bash

echo "🚀 Iniciando Deploy Automatizado ALGOR..."

# 1. Baixar atualizações
echo "📥 Baixando código do Git..."
git pull origin main

# 2. Derrubar containers antigos evitando erros de orfãos
echo "🛑 Parando serviços..."
docker-compose down --remove-orphans

# 3. Limpeza forçada (O segredo para evitar o KeyError)
echo "🧹 Limpando containers problemáticos..."
docker rmi -f algorbrasil_backend:latest 2>/dev/null || true
docker rm -f algor_backend algor_frontend algor_web 2>/dev/null || true

# 4. Subir tudo do zero
echo "🏗️ Construindo e subindo serviços..."
docker-compose up -d --build --force-recreate

echo "✅ Deploy concluído! Aguarde alguns instantes para o frontend iniciar."
