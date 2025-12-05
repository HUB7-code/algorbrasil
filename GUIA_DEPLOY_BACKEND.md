# 🚀 GUIA DE DEPLOY - BACKEND ALGOR BRASIL

## ✅ BACKEND PREPARADO E PRONTO PARA DEPLOY!

**Localização:** `~/algorbrasil-backend/`  
**Status:** ✅ Git inicializado, 15 arquivos commitados  
**Branch:** main  

---

## 🎯 OPÇÃO 1: RAILWAY.APP ⭐ **RECOMENDADO**

### **Por quê Railway?**
- ✅ **Gratuito** para começar ($5 crédito/mês)
- ✅ **Deploy automático** via Git
- ✅ **HTTPS incluído** gratuitamente
- ✅ **Fácil de usar** - interface intuitiva
- ✅ **Logs em tempo real**
- ✅ **Variáveis de ambiente** fáceis de configurar

---

## 📋 PASSO A PASSO - RAILWAY

### **PASSO 1: Criar Conta (2 minutos)**

1. Acesse: https://railway.app/
2. Clique em **"Start a New Project"**
3. Faça login com GitHub
4. Autorize o Railway

---

### **PASSO 2: Criar Repositório no GitHub (5 minutos)**

Você precisa criar um repositório no GitHub para o backend:

1. Acesse: https://github.com/new
2. **Repository name:** `algorbrasil-backend`
3. **Description:** "Backend API seguro para Algor Brasil"
4. **Public** ✅
5. **NÃO** marque "Add a README"
6. Clique em **Create repository**

---

### **PASSO 3: Fazer Push do Backend para GitHub (3 minutos)**

Execute estes comandos no PowerShell:

```powershell
# Navegar até o backend na VM
wsl --distribution Ubuntu --exec bash -c "cd ~/algorbrasil-backend && git remote add origin https://github.com/HUB7-code/algorbrasil-backend.git && git push -u origin main"
```

**Nota:** Você precisará autenticar com GitHub (mesma forma que fez antes)

---

### **PASSO 4: Deploy no Railway (5 minutos)**

1. No Railway, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório **`algorbrasil-backend`**
4. Railway detectará automaticamente que é Node.js
5. Clique em **"Deploy Now"**

---

### **PASSO 5: Configurar Variáveis de Ambiente (5 minutos)**

No Railway, vá em **Variables** e adicione:

```env
PORT=3000
NODE_ENV=production

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contato@algorbrasil.com.br
EMAIL_PASS=sua-senha-de-app-aqui
EMAIL_FROM=contato@algorbrasil.com.br

# CORS
ALLOWED_ORIGINS=https://hub7-code.github.io,https://algorbrasil.com.br
```

**⚠️ IMPORTANTE:** Para o `EMAIL_PASS`, você precisa criar uma **Senha de App** do Gmail:

1. Acesse: https://myaccount.google.com/apppasswords
2. Crie uma senha de app
3. Use essa senha no `EMAIL_PASS`

---

### **PASSO 6: Obter URL da API (1 minuto)**

1. No Railway, vá em **Settings**
2. Procure por **"Domains"**
3. Clique em **"Generate Domain"**
4. Copie a URL (ex: `algorbrasil-backend-production.up.railway.app`)

---

### **PASSO 7: Testar a API (2 minutos)**

Acesse no navegador:

```
https://sua-url.railway.app/health
```

Deve retornar:
```json
{
  "status": "healthy",
  "timestamp": "2025-11-22T...",
  "uptime": 123.45
}
```

✅ **SE FUNCIONOU: BACKEND NO AR!** 🎉

---

## 🎯 OPÇÃO 2: RENDER.COM

### **Vantagens:**
- ✅ Gratuito (com limitações)
- ✅ HTTPS incluído
- ✅ Deploy via Git

### **Desvantagens:**
- ⚠️ Servidor "dorme" após 15 min de inatividade
- ⚠️ Primeiro acesso pode ser lento

### **Como fazer:**

1. Acesse: https://render.com/
2. Crie conta com GitHub
3. **New** → **Web Service**
4. Conecte o repositório `algorbrasil-backend`
5. Configure:
   - **Name:** algorbrasil-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Adicione variáveis de ambiente (mesmo do Railway)
7. Clique em **Create Web Service**

---

## 🎯 OPÇÃO 3: VERCEL

### **Vantagens:**
- ✅ Gratuito
- ✅ Deploy super rápido
- ✅ HTTPS incluído

### **Desvantagens:**
- ⚠️ Serverless (pode ter cold start)

### **Como fazer:**

1. Acesse: https://vercel.com/
2. Importe o repositório
3. Configure variáveis de ambiente
4. Deploy!

---

## 📊 COMPARAÇÃO DAS OPÇÕES

| Plataforma | Gratuito | HTTPS | Deploy Auto | Recomendado |
|------------|----------|-------|-------------|-------------|
| **Railway** | ✅ ($5/mês) | ✅ | ✅ | ⭐⭐⭐⭐⭐ |
| **Render** | ✅ | ✅ | ✅ | ⭐⭐⭐⭐ |
| **Vercel** | ✅ | ✅ | ✅ | ⭐⭐⭐ |

---

## 🐛 TROUBLESHOOTING

### **Erro: "Application failed to respond"**
**Solução:** Verifique se a variável `PORT` está configurada

### **Erro: "Invalid login" (Email)**
**Solução:** Use uma Senha de App do Gmail, não sua senha normal

### **Erro: "CORS blocked"**
**Solução:** Adicione a URL do GitHub Pages em `ALLOWED_ORIGINS`

### **Logs não aparecem**
**Solução:** No Railway, vá em **Deployments** → **View Logs**

---

## ✅ CHECKLIST DE DEPLOY

- [ ] Criar repositório GitHub para backend
- [ ] Fazer push do código
- [ ] Criar conta no Railway/Render/Vercel
- [ ] Conectar repositório
- [ ] Configurar variáveis de ambiente
- [ ] Obter senha de app do Gmail
- [ ] Fazer deploy
- [ ] Obter URL da API
- [ ] Testar endpoint `/health`
- [ ] Testar endpoint `/`
- [ ] Verificar logs
- [ ] Anotar URL da API para usar no frontend

---

## 📝 PRÓXIMOS PASSOS

Depois que o backend estiver no ar:

1. ✅ Copiar URL da API
2. ✅ Atualizar `js/api-client.js` no frontend
3. ✅ Testar formulários
4. ✅ Fazer deploy do frontend
5. ✅ Celebrar! 🎉

---

## 📞 PRECISA DE AJUDA?

Se tiver problemas:
1. Verifique os logs no Railway/Render
2. Teste a API com Postman ou navegador
3. Verifique as variáveis de ambiente
4. Me chame! 😊

---

**Escolha uma plataforma e vamos fazer o deploy! 🚀**

**Minha recomendação:** Railway.app (mais fácil e confiável)
