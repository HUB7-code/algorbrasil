# ALGOR Brasil - Backend

API FastAPI para a plataforma de Governança de IA.

## 🔐 Configuração de Segurança

### Desenvolvimento Local

Para desenvolvimento local, o backend funciona **sem arquivo `.env`**, usando valores padrão seguros para ambiente de desenvolvimento.

```bash
# Instalar dependências
pip install -r requirements.txt

# Rodar o servidor
uvicorn backend.app.main:app --reload
```

### Produção

Em produção, **SEMPRE** configure as variáveis de ambiente:

#### 1. Gerar SECRET_KEY Segura

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

#### 2. Criar arquivo .env

```bash
cp .env.example .env
nano .env  # Editar com seus valores
```

#### 3. Variáveis Obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SECRET_KEY` | Chave JWT (64 chars hex) | `a1b2c3d4e5f6...` |
| `SMTP_SERVER` | Servidor de email | `smtp.gmail.com` |
| `SMTP_USER` | Usuário SMTP | `email@gmail.com` |
| `SMTP_PASSWORD` | Senha de App | `xxxx xxxx xxxx xxxx` |
| `SMTP_FROM_EMAIL` | Email remetente | `email@gmail.com` |
| `FRONTEND_URL` | URL do frontend | `https://algorbrasil.com.br` |

## 🐳 Docker

O Docker Compose lê automaticamente o `.env` do diretório raiz do projeto.

```bash
# Subir com build
docker-compose up --build -d

# Ver logs
docker-compose logs -f backend
```

## 🧪 CI/CD

Para pipelines de CI/CD, configure as variáveis como secrets do repositório:

```yaml
# GitHub Actions
env:
  SECRET_KEY: ${{ secrets.SECRET_KEY }}
  SMTP_PASSWORD: ${{ secrets.SMTP_PASSWORD }}
```

## 📁 Estrutura

```
backend/
├── app/
│   ├── api/          # Rotas da API
│   ├── core/         # Configurações e segurança
│   ├── db/           # Modelos e sessões
│   ├── services/     # Lógica de negócios
│   └── main.py       # Ponto de entrada
├── alembic/          # Migrações do banco
└── requirements.txt  # Dependências
```

## 🔗 Endpoints Principais

- `POST /api/v1/signup` - Cadastro de usuários
- `POST /api/v1/login` - Autenticação
- `GET /api/v1/dashboard/overview` - Dados do dashboard
- `POST /api/v1/scanner/upload` - Upload de código para análise
