# 📤 UPLOAD MANUAL VIA GITHUB WEB

## 🎯 Método Alternativo (Sem Git)

Se você não quiser instalar o Git, pode fazer upload direto pelo site do GitHub.

---

## 📋 PASSO A PASSO

### 1️⃣ Criar Repositório

1. Acesse: https://github.com/new
2. **Repository name:** `algorbrasil`
3. **Public** ✅
4. **NÃO** marque "Add a README file"
5. Clique em **Create repository**

### 2️⃣ Fazer Upload dos Arquivos

1. Na página do repositório criado, clique em **uploading an existing file**
2. Arraste TODOS os arquivos da pasta:
   ```
   C:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin
   ```
3. **IMPORTANTE:** Arraste também a pasta `images/` com todas as imagens
4. No campo "Commit message", escreva: `Deploy inicial - Site Algor Brasil`
5. Clique em **Commit changes**

### 3️⃣ Ativar GitHub Pages

1. Vá para: **Settings** (no menu do repositório)
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
4. Clique em **Save**
5. Aguarde 2-5 minutos

### 4️⃣ Acessar o Site

Seu site estará em:
```
https://hub7-code.github.io/algorbrasil/
```

---

## ⚠️ ATENÇÃO

### Arquivos que NÃO devem ser enviados:

- ❌ `*.backup`
- ❌ `*.backup2`
- ❌ `site_algor_brasil.zip`
- ❌ `.firebase/`
- ❌ `enviar-email.php` (não funciona no GitHub Pages)

### Arquivos que DEVEM ser enviados:

- ✅ `index.html`
- ✅ `associe-se.html`
- ✅ `artigo-modelo.html`
- ✅ Pasta `images/` completa
- ✅ `README.md`
- ✅ Todos os arquivos `.md` de documentação

---

## 📁 Estrutura Final no GitHub

```
algorbrasil/
├── index.html
├── associe-se.html
├── artigo-modelo.html
├── images/
│   ├── algor_association_logo_light.png
│   ├── membro_*.webp
│   └── ...
├── README.md
├── DEPLOY.md
├── FASE2_FORMULARIOS.md
└── COMECE_AQUI.md
```

---

## ✅ Vantagens deste Método

- ✅ Não precisa instalar Git
- ✅ Interface visual simples
- ✅ Funciona em qualquer navegador

## ❌ Desvantagens

- ❌ Mais trabalhoso para atualizações futuras
- ❌ Precisa fazer upload manual a cada mudança

---

## 💡 Recomendação

Para facilitar atualizações futuras, recomendo **instalar o Git** (veja `INSTALAR_GIT.md`).

Mas se quiser fazer o deploy **agora**, este método funciona perfeitamente! 🚀
