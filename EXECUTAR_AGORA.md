# ✅ GIT INSTALADO - Próximos Passos

## ⚠️ IMPORTANTE: Reinicie o PowerShell!

Você instalou o Git, mas o PowerShell atual ainda não o reconhece.

---

## 🔄 PASSO 1: Reiniciar PowerShell

1. **Feche** esta janela do PowerShell
2. **Abra uma NOVA** janela do PowerShell
3. Navegue até a pasta do projeto:

```powershell
cd "C:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin"
```

---

## ✅ PASSO 2: Verificar Git

Execute para confirmar que o Git está funcionando:

```powershell
git --version
```

Deve aparecer algo como: `git version 2.43.0.windows.1`

---

## 🚀 PASSO 3: Executar Comandos de Deploy

Agora execute estes comandos **um de cada vez**:

### 1. Inicializar Git
```powershell
git init
```

### 2. Configurar seu nome e email (primeira vez)
```powershell
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

### 3. Adicionar todos os arquivos
```powershell
git add .
```

### 4. Fazer o primeiro commit
```powershell
git commit -m "Deploy inicial - Site Algor Brasil"
```

### 5. Conectar ao repositório GitHub
```powershell
git remote add origin https://github.com/HUB7-code/algorbrasil.git
```

### 6. Renomear branch para main
```powershell
git branch -M main
```

### 7. Fazer push para o GitHub
```powershell
git push -u origin main
```

**IMPORTANTE:** No passo 7, o Git pode pedir suas credenciais do GitHub.

---

## 🔐 Autenticação GitHub

Se o Git pedir senha, você tem 2 opções:

### Opção A: Personal Access Token (Recomendado)

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Dê um nome: "Deploy Algor Brasil"
4. Marque: `repo` (acesso completo aos repositórios)
5. Clique em "Generate token"
6. **COPIE o token** (você não verá novamente!)
7. Use o token como senha quando o Git pedir

### Opção B: GitHub CLI

Ou instale o GitHub CLI para login automático:
https://cli.github.com/

---

## ⚙️ PASSO 4: Ativar GitHub Pages

Depois do push bem-sucedido:

1. Acesse: https://github.com/HUB7-code/algorbrasil/settings/pages
2. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
3. Clique em **Save**
4. Aguarde 2-5 minutos

---

## 🌐 Seu Site Estará Em:

```
https://hub7-code.github.io/algorbrasil/
```

---

## 📝 Resumo Rápido

1. ✅ Fechar e abrir novo PowerShell
2. ✅ Executar `git --version` para confirmar
3. ✅ Executar os 7 comandos acima
4. ✅ Ativar GitHub Pages
5. ✅ Aguardar 2-5 minutos
6. ✅ Acessar o site! 🎉

---

**Feche este PowerShell, abra um novo e execute os comandos! 🚀**
