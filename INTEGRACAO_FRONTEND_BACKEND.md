# 🚀 GUIA DE INTEGRAÇÃO FRONTEND ↔ BACKEND

## 📋 O QUE VOCÊ PODE IMPLEMENTAR AGORA

Com o backend blindado, você pode adicionar ao seu site no GitHub Pages:

### ✅ **1. FORMULÁRIOS FUNCIONAIS**
- Newsletter (footer)
- Associação (associe-se.html)
- Contato
- Validação em tempo real
- Feedback visual (loading, sucesso, erro)

### ✅ **2. RECURSOS AVANÇADOS** (Futuro)
- Sistema de login/registro
- Área de membros
- Dashboard personalizado
- Conteúdo exclusivo
- Analytics e métricas

---

## 🔧 PASSO A PASSO PARA INTEGRAÇÃO

### **PASSO 1: Adicionar Arquivos ao Site**

Copie os arquivos criados para o seu projeto:

```
algorbrasil/
├── js/
│   └── api-client.js          ← NOVO
├── css/
│   └── notifications.css      ← NOVO
├── index.html                 ← ATUALIZAR
└── associe-se.html            ← ATUALIZAR
```

---

### **PASSO 2: Atualizar index.html**

Adicione no `<head>`:

```html
<!-- CSS de Notificações -->
<link rel="stylesheet" href="css/notifications.css">
```

Adicione antes do `</body>`:

```html
<!-- API Client -->
<script src="js/api-client.js"></script>
```

---

### **PASSO 3: Atualizar associe-se.html**

Adicione no `<head>`:

```html
<!-- CSS de Notificações -->
<link rel="stylesheet" href="css/notifications.css">
```

Adicione antes do `</body>`:

```html
<!-- API Client -->
<script src="js/api-client.js"></script>
```

---

### **PASSO 4: Fazer Deploy do Backend**

Você precisa hospedar o backend em algum lugar. Opções:

#### **Opção A: Railway.app** ⭐ **RECOMENDADO**
- ✅ Gratuito para começar
- ✅ Deploy automático via Git
- ✅ HTTPS incluído
- ✅ Fácil de usar

**Como fazer:**
1. Acesse: https://railway.app/
2. Conecte seu GitHub
3. Crie novo projeto
4. Selecione o repositório do backend
5. Configure variáveis de ambiente (.env)
6. Deploy automático!

#### **Opção B: Render.com**
- ✅ Gratuito (com limitações)
- ✅ HTTPS incluído
- ✅ Deploy via Git

#### **Opção C: Vercel**
- ✅ Gratuito
- ✅ Serverless functions
- ✅ Deploy rápido

#### **Opção D: Heroku**
- ⚠️ Não é mais gratuito
- ✅ Muito confiável

---

### **PASSO 5: Atualizar URL do Backend**

Depois do deploy, edite `js/api-client.js`:

```javascript
// ANTES (desenvolvimento)
this.baseURL = 'http://localhost:3000';

// DEPOIS (produção)
this.baseURL = 'https://sua-api.railway.app'; // Exemplo
```

---

### **PASSO 6: Configurar CORS no Backend**

Atualize o `.env` do backend:

```env
ALLOWED_ORIGINS=https://hub7-code.github.io,https://algorbrasil.com.br
```

---

### **PASSO 7: Testar!**

1. Acesse seu site: https://hub7-code.github.io/algorbrasil/
2. Teste o formulário de newsletter
3. Teste o formulário de associação
4. Verifique as notificações

---

## 📝 EXEMPLO DE USO

### **Formulário de Newsletter (index.html)**

O formulário já existente funcionará automaticamente! Apenas certifique-se que tem:

```html
<form class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <input type="email" 
           name="email"
           placeholder="Seu melhor e-mail" 
           required
           class="flex-1 px-6 py-4 bg-brand-panel border-2 border-brand-copper/30 rounded-full">
    
    <button type="submit"
            class="bg-brand-copper hover:bg-opacity-90 px-10 py-4 rounded-full font-bold">
        Inscrever-se
    </button>
</form>
```

### **Formulário de Associação (associe-se.html)**

O formulário já existente funcionará automaticamente! Certifique-se que os campos têm os atributos `name` corretos:

```html
<form class="space-y-6">
    <input type="text" name="nome" required>
    <input type="email" name="email" required>
    <input type="text" name="empresa">
    <input type="text" name="cargo">
    <select name="interesse">
        <option value="governanca">Governança</option>
        <!-- ... -->
    </select>
    <textarea name="mensagem"></textarea>
    <button type="submit">Enviar</button>
</form>
```

---

## 🎨 PERSONALIZAÇÃO

### **Mudar Cores das Notificações**

Edite `css/notifications.css`:

```css
.algor-notification-success {
  background: linear-gradient(135deg, #B87333 0%, #A0632B 100%);
}
```

### **Mudar Tempo de Exibição**

Edite `js/api-client.js`:

```javascript
// Linha ~120
setTimeout(() => {
  notification.classList.remove('show');
  setTimeout(() => notification.remove(), 300);
}, 5000); // ← Mude para 3000 (3 segundos) ou 10000 (10 segundos)
```

---

## 🔒 SEGURANÇA

### **Proteções Implementadas:**

✅ **Frontend:**
- Validação de email
- Sanitização de dados
- Rate limiting visual
- HTTPS enforcement

✅ **Backend:**
- 8 camadas de segurança
- Rate limiting (5 req/hora)
- Validação com Joi
- Logging completo
- Proteção contra XSS, SQL Injection, etc.

---

## 📊 ANALYTICS (Opcional)

O código já está preparado para Google Analytics. Adicione no `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Os eventos serão rastreados automaticamente:
- `newsletter_signup` - Inscrição na newsletter
- `association_request` - Solicitação de associação

---

## 🐛 TROUBLESHOOTING

### **Erro: CORS blocked**
**Solução:** Adicione a URL do GitHub Pages no `.env` do backend:
```env
ALLOWED_ORIGINS=https://hub7-code.github.io
```

### **Erro: Failed to fetch**
**Solução:** Verifique se o backend está rodando e a URL está correta em `api-client.js`

### **Formulário não envia**
**Solução:** Abra o Console do navegador (F12) e veja os erros

### **Notificação não aparece**
**Solução:** Verifique se o CSS `notifications.css` está carregado

---

## 🚀 PRÓXIMOS PASSOS

Depois de integrar os formulários, você pode adicionar:

1. **Sistema de Login**
   - JWT Authentication
   - Área de membros
   - Dashboard

2. **Conteúdo Dinâmico**
   - Blog com API
   - Notícias atualizadas
   - Eventos

3. **Recursos Avançados**
   - Chat ao vivo
   - Webinars
   - Certificados digitais

---

## 📞 SUPORTE

Se tiver dúvidas:
1. Verifique os logs do backend: `~/algorbrasil-backend/logs/`
2. Verifique o Console do navegador (F12)
3. Teste a API diretamente: `https://sua-api.com/health`

---

## ✅ CHECKLIST DE INTEGRAÇÃO

- [ ] Copiar `js/api-client.js` para o projeto
- [ ] Copiar `css/notifications.css` para o projeto
- [ ] Adicionar links no `<head>` do index.html
- [ ] Adicionar links no `<head>` do associe-se.html
- [ ] Fazer deploy do backend (Railway, Render, etc)
- [ ] Atualizar URL do backend em `api-client.js`
- [ ] Configurar CORS no backend
- [ ] Configurar credenciais de email no backend
- [ ] Testar formulário de newsletter
- [ ] Testar formulário de associação
- [ ] Fazer commit e push para GitHub
- [ ] Aguardar GitHub Pages atualizar (1-2 min)
- [ ] Testar no site publicado
- [ ] Celebrar! 🎉

---

**Pronto! Seu site estará 100% funcional com backend seguro!** 🚀
