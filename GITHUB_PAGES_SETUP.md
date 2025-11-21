# 📘 Guia de Configuração para GitHub Pages

## ✅ Alterações Necessárias

### 1. **Problema com PHP** ⚠️

O GitHub Pages **NÃO suporta PHP**. Você precisa substituir o arquivo `enviar-email.php` por uma solução alternativa.

#### Soluções Recomendadas:

**Opção A: FormSubmit.co (Recomendado - Gratuito)**
- Serviço gratuito que funciona perfeitamente com sites estáticos
- Não requer configuração de servidor
- Simples de implementar

**Opção B: Formspree.io**
- Também gratuito para uso básico
- Boa alternativa ao FormSubmit

**Opção C: Netlify Forms ou Vercel**
- Se você migrar para Netlify ou Vercel em vez de GitHub Pages

### 2. **Arquivos que Precisam ser Atualizados**

Você precisa atualizar os formulários nos seguintes arquivos:

1. `index.html` - Formulário de newsletter (linha ~657)
2. `associe-se.html` - Formulário de associação
3. `contato.html` - Formulário de contato

### 3. **Como Configurar o FormSubmit.co**

#### Passo 1: Substitua o formulário no `index.html`

Encontre esta linha:
```html
<form action="enviar-email.php" method="POST" class="...">
```

Substitua por:
```html
<form action="https://formsubmit.co/SEU_EMAIL_AQUI" method="POST" class="...">
    <!-- Configurações do FormSubmit -->
    <input type="hidden" name="_subject" value="Nova inscrição na Newsletter - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://SEU_USUARIO.github.io/SEU_REPOSITORIO/index.html#conteudo">
    
    <!-- Resto do formulário continua igual -->
```

**IMPORTANTE:** Substitua:
- `SEU_EMAIL_AQUI` pelo email onde quer receber as mensagens
- `SEU_USUARIO` pelo seu nome de usuário do GitHub
- `SEU_REPOSITORIO` pelo nome do repositório

#### Passo 2: Primeira Submissão

Na primeira vez que alguém enviar o formulário, o FormSubmit enviará um email de confirmação para o endereço configurado. Você precisa clicar no link de confirmação para ativar o formulário.

### 4. **Estrutura de Diretórios para GitHub Pages**

Sua estrutura atual está correta! O GitHub Pages pode servir arquivos de duas formas:

**Opção A: Da raiz do repositório** (Recomendado para você)
```
/
├── index.html
├── images/
├── associe-se.html
├── artigo-modelo.html
└── ... outros arquivos
```

**Opção B: Da pasta /docs**
```
/docs/
├── index.html
├── images/
└── ... outros arquivos
```

Você está usando a Opção A, que é perfeita!

### 5. **Arquivos que Podem ser Removidos**

Estes arquivos não funcionarão no GitHub Pages e podem ser removidos:

- `enviar-email.php` (não funciona em sites estáticos)
- `.firebase/` (se não estiver usando Firebase)
- `.firebaserc` (se não estiver usando Firebase)
- `firebase.json` (se não estiver usando Firebase)

### 6. **Configuração do Repositório GitHub**

#### Passo 1: Criar Repositório
1. Vá para https://github.com/new
2. Crie um novo repositório (ex: `algor-brasil-site`)
3. **NÃO** inicialize com README, .gitignore ou licença

#### Passo 2: Fazer Upload dos Arquivos

No PowerShell, navegue até a pasta do projeto:

```powershell
cd "C:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin"

# Inicializar repositório Git
git init

# Adicionar todos os arquivos (exceto os que estão no .gitignore)
git add .

# Fazer o primeiro commit
git commit -m "Initial commit - Algor Brasil website"

# Adicionar o repositório remoto (substitua SEU_USUARIO e SEU_REPOSITORIO)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Fazer push para o GitHub
git branch -M main
git push -u origin main
```

#### Passo 3: Ativar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**

Aguarde alguns minutos e seu site estará disponível em:
`https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`

### 7. **Verificar Caminhos de Recursos**

Seus caminhos estão corretos! Você está usando caminhos relativos:

✅ `images/algor_association_logo_light.png`
✅ `associe-se.html`
✅ `artigo-modelo.html`

**NÃO use caminhos absolutos** como `/images/logo.png` pois isso não funcionará no GitHub Pages a menos que você configure um domínio customizado.

### 8. **Domínio Customizado (Opcional)**

Se você quiser usar um domínio próprio (ex: `www.algorbrasil.com.br`):

1. No GitHub Pages Settings, adicione seu domínio customizado
2. Configure os registros DNS no seu provedor de domínio:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valor: `SEU_USUARIO.github.io`

### 9. **Checklist Final**

Antes de fazer o deploy:

- [ ] Substituir todos os formulários PHP por FormSubmit
- [ ] Atualizar o email de destino no FormSubmit
- [ ] Atualizar URLs de redirecionamento (`_next`)
- [ ] Verificar se todas as imagens estão na pasta `images/`
- [ ] Testar todos os links internos
- [ ] Remover arquivos PHP e Firebase (se não usar)
- [ ] Criar repositório no GitHub
- [ ] Fazer push do código
- [ ] Ativar GitHub Pages nas configurações
- [ ] Testar o site publicado

### 10. **Exemplo Completo de Formulário Atualizado**

```html
<!-- Formulário de Newsletter -->
<form action="https://formsubmit.co/contato@algorbrasil.com.br" method="POST" class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
    <!-- Configurações do FormSubmit -->
    <input type="hidden" name="_subject" value="Nova inscrição na Newsletter - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_template" value="table">
    <input type="hidden" name="_next" value="https://SEU_USUARIO.github.io/algor-brasil-site/index.html#conteudo">
    <input type="hidden" name="tipo_formulario" value="newsletter">
    
    <input type="email" name="email" placeholder="Seu melhor e-mail" required
        class="flex-1 px-6 py-4 bg-brand-panel border-2 border-brand-copper/30 rounded-full text-brand-text placeholder-brand-text/50 focus:outline-none focus:border-brand-copper transition-all">
    <button type="submit"
        class="bg-brand-copper hover:bg-opacity-90 px-10 py-4 rounded-full font-bold text-brand-text shadow-xl hover:shadow-2xl hover:scale-105 transition-all btn-copper">
        Inscrever-se
    </button>
</form>
```

### 11. **Recursos Adicionais**

- [Documentação GitHub Pages](https://docs.github.com/pt/pages)
- [FormSubmit.co Documentação](https://formsubmit.co/)
- [Formspree.io](https://formspree.io/)

---

## 🚀 Próximos Passos

1. Atualize os formulários conforme descrito acima
2. Teste localmente abrindo o `index.html` no navegador
3. Crie o repositório no GitHub
4. Faça o push do código
5. Ative o GitHub Pages
6. Teste o formulário (lembre-se de confirmar o email do FormSubmit na primeira vez)

**Boa sorte com o deploy! 🎉**
