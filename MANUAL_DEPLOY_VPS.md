# PROCESSO DE DEPLOY E ARQUITETURA DE INFRAESTRUTURA
> **IMPORTANTE:** Este documento descreve o fluxo de trabalho OBRIGATÓRIO para atualização do ambiente de produção (VPS).
> **Versão:** 17.0.0 (30/12/2025)

## 1. Arquitetura do Sistema
O projeto "Algor Brasil" opera em um modelo híbrido de desenvolvimento local e deploy containerizado em VPS.

- **Ambiente de Desenvolvimento:** Local (Windows/VSCode) + GitHub.
- **Ambiente de Produção (VPS):**
    - **OS:** Ubuntu.
    - **Gerenciador:** Docker & Docker Compose (v1.29.2).
    - **Serviços:**
        - `frontend`: Next.js (Node 20 Alpine).
        - `backend`: Python FastAPI (usuário não-root `appuser`).
        - `web`: Nginx (Proxy Reverso + SSL).
        - `db`: SQLite (Persistido via Volume mapping `./backend/sql_app.db`).

---

## 2. Deploy Automatizado (Recomendado)

Utilizamos o script `deploy.sh` para automatizar todo o processo de atualização.

### Uso Básico:
```bash
cd ~/algorbrasil
./deploy.sh
```

### Atualizar Apenas o Backend (mais rápido):
```bash
./deploy.sh --backend-only
```

### O que o script faz:
1. ✅ Sincroniza código com GitHub (`git fetch` + `reset`)
2. ✅ Para containers de forma limpa (evita bug ContainerConfig)
3. ✅ Remove containers órfãos
4. ✅ Reconstrói imagens Docker (multi-stage build, non-root)
5. ✅ Sobe todos os serviços
6. ✅ Exibe status e logs recentes

**IMPORTANTE:** O script **NÃO** sobrescreve o arquivo `.env` (ele está no `.gitignore`).

---

## 3. Configuração do Ambiente (`.env`)

O arquivo `.env` contém credenciais sensíveis e configurações específicas do ambiente.
**Ele NÃO está no Git** e deve ser criado manualmente na VPS.

### Variáveis Obrigatórias:
```ini
# Segurança JWT (gere com: python -c "import secrets; print(secrets.token_hex(32))")
SECRET_KEY=sua-chave-secreta-aqui

# Criptografia de dados (gere com: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
DATA_ENCRYPTION_KEY=sua-chave-fernet-base64-aqui

# E-mail SMTP
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu.email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM_EMAIL=seu.email@gmail.com

# URLs
FRONTEND_URL=https://algorbrasil.com.br
```

### Para Criar/Editar:
```bash
nano .env
# Ou usando heredoc:
cat > .env << 'EOF'
SECRET_KEY=...
DATA_ENCRYPTION_KEY=...
SMTP_SERVER=smtp.gmail.com
# ... resto das variáveis
EOF
```

### Após Alterar o `.env`:
É necessário recriar os containers para que as novas variáveis sejam carregadas:
```bash
docker-compose rm -sf backend
docker-compose up -d backend
```

---

## 4. Troubleshooting

### 4.1 Erro 502 Bad Gateway
O backend provavelmente crashou. Verifique:
```bash
docker-compose logs --tail 50 backend
```

### 4.2 E-mail Não Chega
1. Verifique os logs:
   ```bash
   docker-compose logs --tail 100 backend | grep -E "📧|SMTP|Email"
   ```
2. Confirme que `SMTP_FROM_EMAIL` e `FRONTEND_URL` estão no `.env`.

### 4.3 Erro "ContainerConfig" no Docker-Compose
Este é um bug da versão 1.29.2. Use o script `deploy.sh` ou:
```bash
docker-compose down --remove-orphans
docker rm -f algor_backend
docker-compose up -d
```

### 4.4 Login Admin Falha
Rode o Auto-Cure:
```bash
docker-compose exec backend python -m backend.app.initial_data
```

### 4.5 Erro "Fernet key must be 32 url-safe base64-encoded bytes"
A `DATA_ENCRYPTION_KEY` está no formato errado. Deve ser uma chave Fernet (base64), não hex.

**Gerar chave correta:**
```bash
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

**Atualizar no `.env`:**
```bash
nano .env
# Substitua a linha DATA_ENCRYPTION_KEY pela chave gerada
```

**Reiniciar:**
```bash
docker-compose down
docker-compose up -d
```

---

## 5. Referência: Arquivo `.env.example`
Um template completo está disponível em `.env.example` no repositório.

---

*Última atualização: 30/12/2025 - v17.0.0*

