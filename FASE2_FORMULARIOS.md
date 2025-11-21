# 📋 FASE 2 - Configuração dos Formulários

## ⏰ Quando executar?

Execute esta fase **DEPOIS** que o site estiver no ar e funcionando.

---

## 🎯 Objetivo

Configurar os formulários para funcionar no GitHub Pages usando **FormSubmit.co** (serviço gratuito).

---

## 📝 Alterações Necessárias

### 1️⃣ Formulário de Newsletter (`index.html`)

**Localização:** Procure por "ASSINE O ESTRATEGISTA DE IA" (aproximadamente linha 625)

**Alteração:**

Encontre:
```html
<form class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <input type="email" placeholder="Seu melhor e-mail" required
```

Substitua por:
```html
<form action="https://formsubmit.co/contato@algorbrasil.com.br" method="POST" class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <input type="hidden" name="_subject" value="Nova inscrição - Newsletter Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="https://hub7-code.github.io/algorbrasil/index.html#conteudo">
    
    <input type="email" name="email" placeholder="Seu melhor e-mail" required
```

---

### 2️⃣ Formulário de Associação (`associe-se.html`)

**Localização:** Linha 140

**Alteração:**

Encontre:
```html
<form action="enviar-email.php" method="POST" class="space-y-6">
    <input type="hidden" name="tipo_formulario" value="associacao">
```

Substitua por:
```html
<form action="https://formsubmit.co/contato@algorbrasil.com.br" method="POST" class="space-y-6">
    <input type="hidden" name="_subject" value="Nova Solicitação de Associação - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="https://hub7-code.github.io/algorbrasil/index.html">
    <input type="hidden" name="tipo_formulario" value="associacao">
```

---

## 🔧 Como Fazer as Alterações

### Opção A: Editar no GitHub (Recomendado)

1. Acesse: https://github.com/HUB7-code/algorbrasil
2. Clique no arquivo que quer editar
3. Clique no ícone de lápis (Edit)
4. Faça a alteração
5. Clique em "Commit changes"
6. Aguarde 1-2 minutos para o site atualizar

### Opção B: Editar Localmente

1. Abra o arquivo no VS Code
2. Faça a alteração
3. Execute:
```powershell
git add .
git commit -m "Configurar formulários com FormSubmit"
git push
```

---

## 📧 Ativação do FormSubmit

**IMPORTANTE:** Na primeira vez que alguém enviar um formulário:

1. O FormSubmit enviará um email para `contato@algorbrasil.com.br`
2. Você precisa clicar no link de confirmação
3. Depois disso, todos os formulários funcionarão automaticamente

---

## ✅ Teste dos Formulários

Após configurar:

1. Acesse o site: https://hub7-code.github.io/algorbrasil/
2. Vá até o footer
3. Teste o formulário de newsletter
4. Verifique se recebeu o email de confirmação
5. Confirme o email
6. Teste novamente - agora deve funcionar!

---

## 🎯 Campos do FormSubmit

### Campos Hidden Importantes:

- `_subject` - Assunto do email
- `_captcha` - Desabilita captcha (false)
- `_next` - URL de redirecionamento após envio
- `_template` - Formato do email (table)

### Documentação Completa:

https://formsubmit.co/

---

## 📝 Checklist

- [ ] Site está no ar e funcionando
- [ ] Editar `index.html` (formulário newsletter)
- [ ] Editar `associe-se.html` (formulário associação)
- [ ] Fazer commit e push
- [ ] Testar formulário
- [ ] Confirmar email do FormSubmit
- [ ] Testar novamente

---

**Não tenha pressa! Faça esta fase quando o site estiver estável.** 😊
