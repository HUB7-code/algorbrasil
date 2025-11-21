# 🚀 Instruções Rápidas - GitHub Pages

## ⚠️ ALTERAÇÕES OBRIGATÓRIAS

### 1. Substituir Formulários PHP

O GitHub Pages **NÃO suporta PHP**. Você precisa atualizar 3 arquivos:

#### ✏️ Arquivo: `index.html` (linha ~657)

**ANTES:**
```html
<form action="enviar-email.php" method="POST" ...>
```

**DEPOIS:**
```html
<form action="https://formsubmit.co/SEU_EMAIL@exemplo.com" method="POST" ...>
    <input type="hidden" name="_subject" value="Nova inscrição - Algor Brasil">
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_next" value="https://SEU_USUARIO.github.io/SEU_REPO/index.html">
```

#### ✏️ Arquivo: `associe-se.html`

Mesma alteração acima.

#### ✏️ Arquivo: `contato.html`

Mesma alteração acima.

---

## 📝 PASSO A PASSO SIMPLIFICADO

### Passo 1: Atualizar os Formulários
1. Abra cada arquivo HTML mencionado acima
2. Substitua `action="enviar-email.php"` por `action="https://formsubmit.co/SEU_EMAIL"`
3. Adicione os campos hidden do FormSubmit
4. Salve os arquivos

### Passo 2: Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome do repositório: `algor-brasil-site` (ou outro nome)
3. Deixe como **Public**
4. **NÃO** marque "Add a README file"
5. Clique em **Create repository**

### Passo 3: Fazer Upload do Código

Abra o PowerShell na pasta do projeto e execute:

```powershell
# Navegar até a pasta
cd "C:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin"

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Deploy inicial - Algor Brasil"

# Conectar ao GitHub (SUBSTITUA com seus dados)
git remote add origin https://github.com/SEU_USUARIO/algor-brasil-site.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### Passo 4: Ativar GitHub Pages

1. Vá para: `https://github.com/SEU_USUARIO/algor-brasil-site/settings/pages`
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
3. Clique em **Save**
4. Aguarde 2-5 minutos

### Passo 5: Acessar o Site

Seu site estará em:
```
https://SEU_USUARIO.github.io/algor-brasil-site/
```

---

## ⚡ COMANDOS RÁPIDOS

### Atualizar o site após mudanças:

```powershell
git add .
git commit -m "Atualização do site"
git push
```

Aguarde 1-2 minutos para as mudanças aparecerem.

---

## 🔧 CONFIGURAÇÕES DO FORMSUBMIT

Após a primeira submissão do formulário:
1. Você receberá um email de confirmação
2. Clique no link para ativar
3. Pronto! Os próximos envios funcionarão automaticamente

---

## ❓ PRECISA DE AJUDA?

Consulte o arquivo `GITHUB_PAGES_SETUP.md` para instruções detalhadas.
