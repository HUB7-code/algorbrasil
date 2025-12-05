# 🚀 DEPLOY NO CYCLIC.SH - 100% GRATUITO

## ⭐ POR QUE CYCLIC?

- ✅ **100% GRATUITO** para sempre
- ✅ **NÃO DORME** (sempre ativo!)
- ✅ **DEPLOY EM 1 CLIQUE**
- ✅ **HTTPS incluído**
- ✅ **Sem cartão de crédito**
- ✅ **10.000 requisições/mês** (suficiente)
- ✅ **Interface super simples**

---

## 📋 PASSO A PASSO (10 MINUTOS)

### **PASSO 1: Criar Repositório no GitHub (2 min)**

1. Acesse: https://github.com/new
2. **Repository name:** `algorbrasil-backend`
3. **Description:** "Backend API seguro para Algor Brasil"
4. **Public** ✅
5. **NÃO** marque "Add a README"
6. Clique em **Create repository**

---

### **PASSO 2: Fazer Push do Código (2 min)**

Execute no PowerShell:

```powershell
wsl --distribution Ubuntu --exec bash -c "cd ~/algorbrasil-backend && git remote add origin https://github.com/HUB7-code/algorbrasil-backend.git && git push -u origin main"
```

**Nota:** Você precisará autenticar com GitHub (mesma forma que antes)

---

### **PASSO 3: Deploy no Cyclic (5 min)**

1. **Acesse:** https://www.cyclic.sh/

2. **Clique em:** "Deploy Now" ou "Get Started"

3. **Login com GitHub:**
   - Clique em "Continue with GitHub"
   - Autorize o Cyclic

4. **Conectar Repositório:**
   - Clique em "Link Your Own"
   - Selecione: `algorbrasil-backend`
   - Clique em "Connect"

5. **Deploy Automático:**
   - Cyclic detectará automaticamente que é Node.js
   - Deploy começará automaticamente!
   - Aguarde 1-2 minutos

---

### **PASSO 4: Configurar Variáveis de Ambiente (3 min)**

1. No dashboard do Cyclic, clique em **"Variables"** ou **"Environment Variables"**

2. Adicione as seguintes variáveis:

```
PORT=3000
NODE_ENV=production
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=contato@algorbrasil.com.br
EMAIL_PASS=sua-senha-de-app-aqui
EMAIL_FROM=contato@algorbrasil.com.br
ALLOWED_ORIGINS=https://hub7-code.github.io,https://algorbrasil.com.br
```

3. Clique em **"Save"**

4. O Cyclic fará **redeploy automático**

---

### **PASSO 5: Obter URL da API (1 min)**

Após o deploy, você verá a URL da sua API:

```
https://seu-app.cyclic.app
```

Copie essa URL!

---

### **PASSO 6: Testar a API (1 min)**

Abra no navegador:

```
https://seu-app.cyclic.app/health
```

**Deve retornar:**
```json
{
  "status": "healthy",
  "timestamp": "2025-11-22T...",
  "uptime": 123.45
}
```

✅ **SE FUNCIONOU: BACKEND NO AR!** 🎉

---

## 🔐 CONFIGURAR SENHA DE APP DO GMAIL

Para o email funcionar, você precisa de uma **Senha de App**:

1. Acesse: https://myaccount.google.com/apppasswords
2. Nome: "Algor Brasil Backend"
3. Clique em "Criar"
4. **Copie a senha** (16 caracteres)
5. Use essa senha em `EMAIL_PASS`

---

## 🧪 TESTAR TODOS OS ENDPOINTS

### **1. Health Check**
```
GET https://seu-app.cyclic.app/health
```

### **2. Status da API**
```
GET https://seu-app.cyclic.app/
```

### **3. Testar Newsletter (com Postman ou cURL)**
```bash
curl -X POST https://seu-app.cyclic.app/api/forms/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com"}'
```

### **4. Testar Associação**
```bash
curl -X POST https://seu-app.cyclic.app/api/forms/associacao \
  -H "Content-Type: application/json" \
  -d '{
    "nome":"Teste",
    "email":"teste@email.com",
    "empresa":"Empresa Teste"
  }'
```

---

## 📊 MONITORAMENTO

### **Ver Logs:**
1. No dashboard do Cyclic
2. Clique em **"Logs"**
3. Veja logs em tempo real

### **Ver Métricas:**
1. Clique em **"Analytics"**
2. Veja requisições, erros, etc.

---

## 🔄 ATUALIZAÇÕES FUTURAS

Para atualizar o backend:

1. Faça alterações no código localmente
2. Commit:
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push
   ```
3. **Cyclic faz deploy automático!**
4. Aguarde 1-2 minutos

---

## 🐛 TROUBLESHOOTING

### **Erro: "Application failed to start"**
**Solução:** 
- Verifique se `package.json` tem `"start": "node src/server.js"`
- Verifique logs no dashboard

### **Erro: "Invalid login" (Email)**
**Solução:** 
- Use Senha de App do Gmail, não sua senha normal
- Verifique se `EMAIL_USER` e `EMAIL_PASS` estão corretos

### **Erro: "CORS blocked"**
**Solução:** 
- Adicione a URL do GitHub Pages em `ALLOWED_ORIGINS`
- Formato: `https://hub7-code.github.io`

### **Erro: "Cannot find module"**
**Solução:**
- Verifique se `package.json` está correto
- Cyclic instala dependências automaticamente

---

## ✅ VANTAGENS DO CYCLIC

| Recurso | Cyclic | Render | Railway |
|---------|--------|--------|---------|
| **Custo** | $0 | $0 | $5/mês |
| **Dorme?** | ❌ Não | ✅ Sim | ❌ Não |
| **HTTPS** | ✅ | ✅ | ✅ |
| **Deploy Auto** | ✅ | ✅ | ✅ |
| **Fácil?** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Req/mês** | 10.000 | Ilimitado | Ilimitado |

---

## 💡 DICAS

### **1. Domínio Customizado (Opcional)**
Você pode adicionar seu próprio domínio:
1. No Cyclic, vá em **"Domains"**
2. Adicione: `api.algorbrasil.com.br`
3. Configure DNS

### **2. Monitoramento**
Cyclic tem analytics integrado:
- Requisições por dia
- Tempo de resposta
- Erros

### **3. Logs**
Logs são salvos automaticamente:
- Últimas 1000 linhas
- Filtros por nível (info, error, etc)

---

## 📝 CHECKLIST DE DEPLOY

- [ ] Criar repositório GitHub
- [ ] Fazer push do código
- [ ] Criar conta no Cyclic
- [ ] Conectar repositório
- [ ] Aguardar deploy automático
- [ ] Configurar variáveis de ambiente
- [ ] Obter senha de app do Gmail
- [ ] Testar endpoint `/health`
- [ ] Testar endpoint `/`
- [ ] Testar formulário de newsletter
- [ ] Testar formulário de associação
- [ ] Copiar URL da API
- [ ] Atualizar frontend com a URL

---

## 🎯 PRÓXIMOS PASSOS

Depois que o backend estiver no ar:

1. ✅ Copiar URL da API
2. ✅ Atualizar `js/api-client.js`:
   ```javascript
   this.baseURL = 'https://seu-app.cyclic.app';
   ```
3. ✅ Testar formulários no frontend
4. ✅ Fazer deploy do frontend
5. ✅ Celebrar! 🎉

---

## 📞 SUPORTE

**Documentação Cyclic:** https://docs.cyclic.sh/

**Problemas?**
1. Verifique logs no dashboard
2. Teste endpoints com Postman
3. Verifique variáveis de ambiente

---

## 🎉 RESUMO

**Tempo total:** ~10 minutos  
**Custo:** $0 (gratuito para sempre)  
**Dificuldade:** ⭐ Muito fácil  
**Resultado:** Backend no ar, sempre ativo!  

---

**Pronto! Seu backend estará no ar em menos de 10 minutos! 🚀**

**Quer que eu te ajude a criar o repositório e fazer o push agora?**
