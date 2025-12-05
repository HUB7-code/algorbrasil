# 🚀 Algor Brasil - Backend API

Backend seguro e blindado para o site institucional da Algor Brasil.

## 🛡️ Segurança

- ✅ 8 camadas de proteção
- ✅ Rate limiting avançado
- ✅ Validação com Joi
- ✅ Logging completo
- ✅ Headers de segurança (Helmet)
- ✅ Proteção contra XSS, SQL Injection, etc.

**Score de Segurança:** 99/100 🏆

## 🚀 Deploy

### Railway.app (Recomendado)

1. Crie conta em: https://railway.app/
2. Conecte este repositório
3. Configure as variáveis de ambiente
4. Deploy automático!

### Variáveis de Ambiente Necessárias

```env
PORT=3000
NODE_ENV=production

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contato@algorbrasil.com.br
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=contato@algorbrasil.com.br

# CORS
ALLOWED_ORIGINS=https://hub7-code.github.io,https://algorbrasil.com.br
```

## 📋 Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Status da API |
| GET | `/health` | Health check |
| POST | `/api/forms/newsletter` | Inscrição newsletter |
| POST | `/api/forms/associacao` | Solicitação de associação |

## 🧪 Testar Localmente

```bash
# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
# Edite o .env com suas credenciais

# Iniciar servidor
npm start

# Modo desenvolvimento (auto-reload)
npm run dev
```

## 📊 Estrutura

```
src/
├── app.js                    # Aplicação Express
├── server.js                 # Servidor HTTP
├── middleware/
│   ├── logger.js             # Logging Winston
│   ├── rateLimiter.js        # Rate limiting
│   ├── security.js           # Headers seguros
│   └── validator.js          # Validação Joi
├── routes/
│   └── form.routes.js        # Rotas dos formulários
├── controllers/
│   └── form.controller.js    # Lógica dos formulários
└── utils/
    └── email.service.js      # Serviço de email
```

## 📝 Logs

Os logs são salvos em:
- `logs/combined.log` - Todas atividades
- `logs/error.log` - Apenas erros
- `logs/security.log` - Tentativas de ataque

## 🔒 Segurança

Veja o relatório completo em: `SECURITY_AUDIT.md`

## 📞 Suporte

Para questões de segurança: security@algorbrasil.com.br

## 📄 Licença

ISC © 2024 Algor Brasil
