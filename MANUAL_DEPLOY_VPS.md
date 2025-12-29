# PROCESSO DE DEPLOY E ARQUITETURA DE INFRAESTRUTURA
> **IMPORTANTE:** Este documento descreve o fluxo de trabalho OBRIGATÓRIO para atualização do ambiente de produção (VPS).

## 1. Arquitetura do Sistema
O projeto "Algor Brasil" opera em um modelo híbrido de desenvolvimento local e deploy containerizado em VPS.

- **Ambiente de Desenvolvimento:** Local (Windows/VSCode) + GitHub.
- **Ambiente de Produção (VPS):**
    - **OS:** Ubuntu.
    - **Gerenciador:** Docker & Docker Compose.
    - **Serviços:**
        - `frontend`: Next.js (Node 20 Alpine).
        - `backend`: Python FastAPI.
        - `web`: Nginx (Proxy Reverso).
        - `db`: SQLite (Persistido via Volume mapping `./backend/sql_app.db`).

## 2. Fluxo de Trabalho (Workflow)

### Passo 1: Desenvolvimento Local
1.  O Agente (AI) desenvolve, testa e valida as alterações localmente.
2.  Instalação de novas libs é feita localmente (`npm install ...`).
3.  **Commit:** O Agente envia as alterações para o repositório GitHub (`main`).

### Passo 2: Atualização da VPS (Responsabilidade do Usuário)
O usuário acessa a VPS via SSH e executa a sincronização.

#### Protocolo Padrão de Deploy (Atualizado V16.3):

```bash
cd ~/algorbrasil

# 1. Sincronizar Código com GitHub
git fetch origin
git reset --hard origin/main

# 2. Reconstruir Containers (Se houve mudança em libs ou Dockerfile)
docker-compose down
docker-compose up --build -d
```

### Passo 3: Garantia de Integridade do Banco (Crucial!)
Sempre que houver mudanças no banco de dados (novas colunas, tabelas) ou problemas de login, execute estes comandos de "Auto-Cura":

```bash
# 1. Aplicar Migrations (Garante estrutura das tabelas)
docker-compose exec backend alembic -c backend/alembic.ini upgrade head

# 2. Inicializar/Reparar Dados (Garante Admin e Organização Principal)
# (Este script é idempotente e usa SQL puro, à prova de falhas)
docker-compose exec backend python -m backend.app.initial_data
```

## 3. Notas Técnicas Importantes
- **Persistência:** O banco de dados SQLite é mapeado como volume. O `git reset` NÃO apaga o banco de dados.
- **SQLite Path:** O arquivo real fica em `~/algorbrasil/backend/sql_app.db` na VPS.
- **Erros Comuns:** 
    - *Login falhando após deploy?* Rode o comando `initial_data` (Passo 3.2).
    - *Erro 500 no Signup?* Rode as migrations (Passo 3.1).

---
**Regra de Ouro:** "Na dúvida, rode o `initial_data`. Ele conserta usuários Admin e Organizações quebradas."

## 4. Troubleshooting de E-mail (SMTP)
Se houver problemas no envio de e-mails na VPS:

1.  **Verifique Logs do Backend:**
    ```bash
    docker compose logs backend --tail 100
    ```
    Procure por `📧 DEBUG` ou erros de autenticação (535).

2.  **Valide o .env:**
    Certifique-se de que o `.env` na VPS contenha as credenciais corretas do Gmail/Provedor:
    ```ini
    SMTP_SERVER=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=seu.email@gmail.com
    SMTP_PASSWORD=sua-chave-app-senha
    ```

3.  **Reinicie Recriando Containers:**
    Sempre que alterar o `.env`, é necessário recriar o container para injetar as novas variáveis:
    ```bash
    docker compose up -d --force-recreate backend
    ```
