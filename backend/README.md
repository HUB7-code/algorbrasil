# Algor Brasil - Backend API

Backend FastAPI para a plataforma Algor Brasil de governança de IA.

## 🔐 Configuração de Segurança

### Variáveis de Ambiente

O projeto usa variáveis de ambiente para configuração sensível. 

**Para desenvolvimento local:**
1. Copie `.env.example` para `.env` na raiz do projeto
2. Gere uma SECRET_KEY segura:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
3. Atualize o arquivo `.env` com seus valores

**Para produção:**
- **NUNCA** use a SECRET_KEY padrão
- **SEMPRE** defina SECRET_KEY via variáveis de ambiente ou arquivo `.env`
- Configure as variáveis de ambiente no seu provedor de hospedagem
- Use valores fortes e únicos para todas as credenciais

**Para CI/CD:**
- Os testes usam valores padrão seguros automaticamente
- Para testes de integração, configure secrets no GitHub Actions
- O arquivo `.env` não é necessário no ambiente de CI

## 🚀 Instalação

```bash
# Instalar dependências
pip install -r requirements.txt

# Executar servidor de desenvolvimento
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## 🧪 Testes

```bash
# Executar testes
pytest tests/ -v

# Testes específicos
pytest tests/test_smoke.py -v
```

## 📝 Estrutura

```
backend/
├── app/
│   ├── core/          # Configurações e segurança
│   ├── api/           # Endpoints da API
│   ├── models/        # Modelos de dados
│   └── services/      # Lógica de negócio
├── tests/             # Testes automatizados
├── main.py            # Entry point da aplicação
└── requirements.txt   # Dependências Python
```

## 🔒 Segurança

- SECRET_KEY é usada para assinatura de tokens JWT
- Tokens de acesso expiram em 8 dias por padrão
- CORS configurado para domínios específicos
- Sempre use HTTPS em produção
