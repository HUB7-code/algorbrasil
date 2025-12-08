# Build Stage
FROM python:3.10-slim

# Variáveis de Ambiente para Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Diretório de Trabalho do Container
WORKDIR /app

# Copiar lista de dependências primeiro (Cache Layering)
COPY backend/requirements.txt .

# Atualizar pip e instalar dependências
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar todo o código fonte do projeto
# (O .dockerignore vai filtrar node_modules, venv, etc depois)
COPY . .

# Expor porta da API
EXPOSE 8000

# Comando de Inicialização (Uvicorn Production Mode)
CMD ["uvicorn", "backend.app.main:app", "--host", "0.0.0.0", "--port", "8000", "--forwarded-allow-ips", "*"]
