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
        - `db`: SQLite (Persistido via Volume).

## 2. Fluxo de Trabalho (Workflow)

### Passo 1: Desenvolvimento Local
1.  O Agente (AI) desenvolve, testa e valida as alterações localmente.
2.  Instalação de novas libs é feita localmente (`npm install ...`).
3.  **Commit:** O Agente envia as alterações para o repositório GitHub (`main`).

### Passo 2: Atualização da VPS (Responsabilidade do Usuário)
O usuário acessa a VPS via SSH e executa a sincronização. Como o ambiente é DOCKER, não basta baixar o código; é necessário reconstruir os containers se houver mudanças em dependências (`package.json`).

#### Comandos Padrão de Deploy:
```bash
cd ~/algorbrasil

# 1. Sincronizar Código com GitHub (Forçar exatidão)
git fetch origin
git reset --hard origin/main

# 2. Reconstruir Containers (CRUCIAL para novas dependências)
# O flag --build força o Docker a reler o package.json e rodar npm install
docker-compose down
docker-compose up --build -d
```

### Passo 3: Verificação
- Acompanhar logs se necessário: `docker logs -f algor_frontend`
- Verificar se a aplicação está online.

## 3. Notas Técnicas Importantes
- **Persistência:** O banco de dados SQLite (`sql_app.db`) é mapeado como volume. O `git reset --hard` NÃO apaga o banco de dados de produção, pois ele geralmente está no `.gitignore` ou é preservado pelo Docker Volume, mas cuidado com arquivos locais não versionados.
- **Dependências:** Se adicionarmos uma lib (ex: `three`, `framer-motion`) localmente, ela SÓ funcionará na VPS após o `docker-compose up --build`. O simples restart não instala pacotes novos.
- **Conflitos:** A pasta `.next` e `node_modules` dentro do container são efêmeras. O `git reset` na VPS garante que não haja conflitos de merge com arquivos gerados automaticamente.

---
**Regra de Ouro:** "Se mudou o `package.json` ou configs de build, tem que rodar com `--build` na VPS."
