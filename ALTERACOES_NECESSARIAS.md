# ✅ ALTERAÇÕES FINAIS PARA GITHUB PAGES

## 📝 Resumo das Alterações Necessárias

Você precisa fazer **2 alterações simples** nos formulários:

---

## 1️⃣ Arquivo: `associe-se.html` (Linha 140)

### ❌ ANTES (linha 140-141):
```html
<form action="enviar-email.php" method="POST" class="space-y-6">
    <input type="hidden" name="tipo_formulario" value="associacao">
```

### ✅ DEPOIS:
```html
<form action="https://formsubmit.co/contato@algorbrasil.com.br" method="POST" class="space-y-6">
    <!-- Configurações do FormSubmit -->
    <input type="hidden" name="_subject" value="Nova Solicitação de Associação - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://hub7-code.github.io/algorbrasil/index.html">
    <input type="hidden" name="tipo_formulario" value="associacao">
```

---

## 2️⃣ Arquivo: `index.html` (Procure por "ASSINE O ESTRATEGISTA")

### Encontre esta seção (aproximadamente linha 620-638):
```html
<h3 class="text-3xl md:text-4xl font-orbitron font-bold text-brand-gold mb-4">
    ASSINE O ESTRATEGISTA DE IA
</h3>
<p class="text-brand-text/70 mb-8 text-lg">
    Receba insights exclusivos sobre governança de IA diretamente no seu e-mail
</p>
<form class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <input type="email" placeholder="Seu melhor e-mail" required
```

### ❌ ANTES:
```html
<form class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <input type="email" placeholder="Seu melhor e-mail" required
```

### ✅ DEPOIS:
```html
<form action="https://formsubmit.co/contato@algorbrasil.com.br" method="POST" class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <!-- Configurações do FormSubmit -->
    <input type="hidden" name="_subject" value="Nova inscrição na Newsletter - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://hub7-code.github.io/algorbrasil/index.html#conteudo">
    <input type="hidden" name="tipo_formulario" value="newsletter">
    
    <input type="email" name="email" placeholder="Seu melhor e-mail" required
```

**IMPORTANTE:** Note que também adicionamos `name="email"` no campo de email!

---

## 🚀 COMANDOS PARA FAZER O DEPLOY

Depois de fazer as alterações acima, execute estes comandos no PowerShell:

```powershell
# 1. Navegar até a pasta do projeto
cd "C:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin"

# 2. Inicializar Git (se ainda não fez)
git init

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer o commit
git commit -m "Deploy inicial - Algor Brasil com formulários configurados"

# 5. Conectar ao repositório do GitHub
git remote add origin https://github.com/HUB7-code/algorbrasil.git

# 6. Enviar para o GitHub
git branch -M main
git push -u origin main
```

---

## ⚙️ ATIVAR GITHUB PAGES

1. Acesse: https://github.com/HUB7-code/algorbrasil/settings/pages
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
3. Clique em **Save**
4. Aguarde 2-5 minutos

---

## 🌐 SEU SITE ESTARÁ EM:

```
https://hub7-code.github.io/algorbrasil/
```

---

## 📧 IMPORTANTE SOBRE O FORMSUBMIT

Na **primeira vez** que alguém enviar um formulário:
1. O FormSubmit enviará um email de confirmação para `contato@algorbrasil.com.br`
2. Você precisa clicar no link de confirmação
3. Depois disso, todos os formulários funcionarão automaticamente

---

## 🔄 ATUALIZAR O SITE DEPOIS

Para fazer alterações futuras:

```powershell
git add .
git commit -m "Descrição da alteração"
git push
```

Aguarde 1-2 minutos para as mudanças aparecerem no site.

---

## ✅ CHECKLIST FINAL

- [ ] Alterar formulário em `associe-se.html`
- [ ] Alterar formulário em `index.html`
- [ ] Executar comandos Git
- [ ] Ativar GitHub Pages
- [ ] Aguardar deploy
- [ ] Testar o site
- [ ] Confirmar email do FormSubmit (primeira vez)

---

**Pronto! Seu site estará no ar! 🎉**
