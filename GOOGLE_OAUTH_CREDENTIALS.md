# 🔐 CREDENCIAIS GOOGLE OAUTH CONFIGURADAS

**Data:** 03/02/2026  
**Status:** ✅ CONFIGURADO

---

## ✅ CREDENCIAIS OBTIDAS

### Google OAuth Client
- **Client ID:** `11084800495-1luf1jlpqet5ig7d6sb90rm73hha0art.apps.googleusercontent.com`
- **Client Secret:** `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`

### Configurações no Google Cloud Console
- **Projeto:** Algor Brasil
- **Tipo:** Web application
- **JavaScript origins:**
  - `https://www.algorbrasil.com.br`
  - `http://localhost:3000`
- **Redirect URIs:**
  - `https://www.algorbrasil.com.br/api/v1/auth/google/callback`
  - `http://localhost:3000/api/v1/auth/google/callback`

---

## 📝 ARQUIVOS ATUALIZADOS

### Local (Desenvolvimento)
- ✅ `/.env` - Credenciais adicionadas
- ✅ `/backend/.env` - Credenciais adicionadas

### VPS (Produção)
⚠️ **PENDENTE:** Você precisa adicionar as credenciais ao VPS manualmente

---

## 🚀 DEPLOY NO VPS

### Passo 1: Conectar ao VPS
```bash
ssh usuario@vps-ip
```

### Passo 2: Navegar para o projeto
```bash
cd ~/algorbrasil
```

### Passo 3: Fazer backup do .env atual
```bash
cp backend/.env backend/.env.backup-$(date +%Y%m%d-%H%M%S)
```

### Passo 4: Editar o .env
```bash
nano backend/.env
```

### Passo 5: Adicionar as credenciais
Adicione estas linhas ao final do arquivo:

```env
# Google OAuth
GOOGLE_CLIENT_ID=11084800495-1luf1jlpqet5ig7d6sb90rm73hha0art.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

**Salvar:** `Ctrl + O` → `Enter` → `Ctrl + X`

### Passo 6: Atualizar FRONTEND_URL (se necessário)
Certifique-se de que esta linha está correta:
```env
FRONTEND_URL=https://www.algorbrasil.com.br
```

### Passo 7: Fazer pull do código
```bash
git pull origin main
```

### Passo 8: Fazer deploy
```bash
./deploy.sh
```

### Passo 9: Aguardar 5-8 minutos
O deploy vai:
- Parar containers
- Reconstruir imagens
- Subir todos os serviços

---

## 🧪 TESTANDO

### Teste Local (Agora)
1. Inicie o backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload
   ```

2. Inicie o frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Acesse: http://localhost:3000/register

4. Clique no botão "Google"

5. **Esperado:**
   - ✅ Redireciona para Google Consent Screen
   - ✅ Após autorizar, cria conta automaticamente
   - ✅ Faz login e redireciona para dashboard

### Teste em Produção (Após Deploy)
1. Acesse: https://www.algorbrasil.com.br/register

2. Clique no botão "Google"

3. **Esperado:**
   - ✅ Redireciona para Google Consent Screen
   - ✅ Após autorizar, cria conta automaticamente
   - ✅ Faz login e redireciona para dashboard

---

## 🔍 VALIDAÇÃO

### Verificar se credenciais estão carregadas (VPS)
```bash
docker-compose exec backend python -c "
from app.core.config import settings
print(f'GOOGLE_CLIENT_ID: {settings.GOOGLE_CLIENT_ID[:30]}...')
print(f'GOOGLE_CLIENT_SECRET: {settings.GOOGLE_CLIENT_SECRET[:20]}...')
"
```

**Esperado:**
```
GOOGLE_CLIENT_ID: 11084800495-1luf1jlpqet5ig7d6s...
GOOGLE_CLIENT_SECRET: GOCSPX--TkO2ZhVkjyVP...
```

---

## ⚠️ SEGURANÇA

### ❌ NÃO FAZER:
- Não commitar este arquivo para o Git (já está no .gitignore)
- Não compartilhar as credenciais publicamente
- Não usar as mesmas credenciais em múltiplos projetos

### ✅ FAZER:
- Manter as credenciais apenas nos arquivos `.env`
- Fazer backup do `.env` antes de modificar
- Usar credenciais diferentes para dev e prod (opcional)

---

## 📋 CHECKLIST DE DEPLOY

- [x] Credenciais obtidas do Google Cloud Console
- [x] Credenciais adicionadas ao `.env` local
- [x] Credenciais adicionadas ao `backend/.env` local
- [x] Testado localmente (validação de config)
- [ ] Credenciais adicionadas ao VPS
- [ ] Deploy realizado no VPS
- [ ] Testado em produção

---

## 🎯 PRÓXIMOS PASSOS

1. **Adicionar credenciais ao VPS** (seguir Passo 1-6 acima)
2. **Fazer deploy** (`git pull` + `./deploy.sh`)
3. **Testar login com Google** em produção
4. **Verificar logs** para confirmar funcionamento

---

## 📞 SUPORTE

Se encontrar problemas:

1. **Erro 501:** Credenciais não estão no `.env` do VPS
2. **Erro 400 (redirect_uri_mismatch):** URL de callback não está registrada no Google Console
3. **Erro 403:** App não foi publicado no Google Console

---

**Configuração concluída! Pronto para deploy! 🚀**
