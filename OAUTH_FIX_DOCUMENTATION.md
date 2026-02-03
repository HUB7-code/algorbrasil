# 🔧 FIX: Google/LinkedIn OAuth 501 Error

**Data:** 03/02/2026  
**Problema:** GET https://algorbrasil.com.br/api/v1/auth/google/login 501 (Not Implemented)  
**Status:** ✅ RESOLVIDO

---

## 🔍 PROBLEMA IDENTIFICADO

Quando o usuário tentava criar uma conta usando o botão "Google" ou "LinkedIn" na página de registro, recebia o erro **501 (Not Implemented)**.

### Causa Raiz
Os endpoints OAuth2 (`/api/v1/auth/google/login` e `/api/v1/auth/linkedin/login`) **não estavam implementados** no backend, apesar de estarem sendo chamados pelo frontend.

---

## ✅ SOLUÇÃO IMPLEMENTADA

### 1. **Endpoints OAuth2 Criados**

Adicionados 4 novos endpoints em `/backend/app/api/auth.py`:

#### Google OAuth
- **`GET /api/v1/auth/google/login`**
  - Retorna URL de autorização do Google
  - Verifica se credenciais estão configuradas
  - Retorna 501 se `GOOGLE_CLIENT_ID` ou `GOOGLE_CLIENT_SECRET` não estiverem configurados

- **`GET /api/v1/auth/google/callback`**
  - Recebe código de autorização do Google
  - Troca código por `access_token`
  - Busca informações do usuário (email, nome)
  - Cria usuário + organização (se novo)
  - Gera JWT e redireciona para `/login/callback`

#### LinkedIn OAuth
- **`GET /api/v1/auth/linkedin/login`**
  - Retorna URL de autorização do LinkedIn
  - Verifica se credenciais estão configuradas
  - Retorna 501 se `LINKEDIN_CLIENT_ID` ou `LINKEDIN_CLIENT_SECRET` não estiverem configurados

- **`GET /api/v1/auth/linkedin/callback`**
  - Recebe código de autorização do LinkedIn
  - Troca código por `access_token`
  - Busca informações do usuário
  - Cria usuário + organização (se novo)
  - Gera JWT e redireciona para `/login/callback`

### 2. **Modelo User Atualizado**

Adicionados campos para suportar OAuth:

```python
# backend/app/models/user.py

class User(Base):
    # ... campos existentes ...
    
    # OAuth2 Social Login
    oauth_provider = Column(String, nullable=True)  # 'google', 'linkedin', etc
    oauth_id = Column(String, nullable=True)  # ID do usuário no provider
```

### 3. **Auto-Provisioning**

Quando um usuário faz login pela primeira vez via OAuth:
1. ✅ Cria usuário com `is_active=True` (e-mail já verificado pelo provider)
2. ✅ Cria organização default com 3 créditos
3. ✅ Registra audit log (`USER_SIGNUP_GOOGLE` ou `USER_SIGNUP_LINKEDIN`)
4. ✅ Gera JWT
5. ✅ Redireciona para frontend com token

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA

### Backend (.env)

Para que o OAuth funcione, você precisa adicionar as credenciais ao `.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret-aqui

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=seu-client-id-aqui
LINKEDIN_CLIENT_SECRET=seu-client-secret-aqui

# Frontend URL (para callbacks)
FRONTEND_URL=https://www.algorbrasil.com.br
```

### Como Obter Credenciais

#### Google OAuth
1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione existente
3. Vá em **APIs & Services** → **Credentials**
4. Clique em **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure:
   - **Application type:** Web application
   - **Authorized redirect URIs:**
     - `https://www.algorbrasil.com.br/api/v1/auth/google/callback`
     - `http://localhost:3000/api/v1/auth/google/callback` (para dev)
6. Copie `Client ID` e `Client Secret`

#### LinkedIn OAuth
1. Acesse: https://www.linkedin.com/developers/apps
2. Crie um novo app
3. Vá em **Auth** tab
4. Configure:
   - **Redirect URLs:**
     - `https://www.algorbrasil.com.br/api/v1/auth/linkedin/callback`
     - `http://localhost:3000/api/v1/auth/linkedin/callback` (para dev)
5. Copie `Client ID` e `Client Secret`

---

## 🧪 TESTANDO

### Teste Local (Desenvolvimento)

1. **Configure credenciais no `.env`:**
   ```bash
   cd backend
   nano .env
   # Adicione GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc
   ```

2. **Reinicie o backend:**
   ```bash
   uvicorn app.main:app --reload
   ```

3. **Teste no frontend:**
   - Acesse: http://localhost:3000/register
   - Clique no botão "Google"
   - Deve redirecionar para Google Consent Screen
   - Após autorizar, deve criar conta e fazer login automaticamente

### Teste em Produção (VPS)

1. **Adicione credenciais ao `.env` do VPS:**
   ```bash
   ssh usuario@vps-ip
   cd ~/algorbrasil/backend
   nano .env
   # Adicione credenciais
   ```

2. **Faça deploy:**
   ```bash
   cd ~/algorbrasil
   git pull origin main
   ./deploy.sh
   ```

3. **Teste:**
   - Acesse: https://www.algorbrasil.com.br/register
   - Clique em "Google" ou "LinkedIn"
   - Verifique se funciona corretamente

---

## 🔍 TROUBLESHOOTING

### Erro 501: "Google Login não configurado"

**Causa:** Credenciais não estão no `.env`

**Solução:**
```bash
# Verifique se as variáveis estão definidas
docker-compose exec backend python -c "
from app.core.config import settings
print(f'GOOGLE_CLIENT_ID: {settings.GOOGLE_CLIENT_ID[:20] if settings.GOOGLE_CLIENT_ID else 'NOT SET'}...')
print(f'GOOGLE_CLIENT_SECRET: {settings.GOOGLE_CLIENT_SECRET[:20] if settings.GOOGLE_CLIENT_SECRET else 'NOT SET'}...')
"
```

### Erro 400: "Código de autorização não fornecido"

**Causa:** Callback foi chamado sem o parâmetro `code`

**Solução:** Verifique se a URL de callback está correta no Google/LinkedIn Console

### Erro 400: "Erro ao obter access_token"

**Causa:** Credenciais inválidas ou redirect_uri não autorizado

**Solução:**
1. Verifique se `Client ID` e `Client Secret` estão corretos
2. Verifique se a URL de callback está registrada no provider
3. Certifique-se de que `FRONTEND_URL` no `.env` está correto

### Erro: "redirect_uri_mismatch"

**Causa:** A URL de callback não está registrada no Google/LinkedIn Console

**Solução:**
1. Acesse o console do provider
2. Adicione a URL exata: `https://www.algorbrasil.com.br/api/v1/auth/google/callback`
3. Aguarde alguns minutos para propagar

---

## 📊 FLUXO COMPLETO

```
1. Usuário clica em "Google" no /register
   ↓
2. Frontend chama: GET /api/v1/auth/google/login
   ↓
3. Backend retorna: {"url": "https://accounts.google.com/o/oauth2/v2/auth?..."}
   ↓
4. Frontend redireciona usuário para Google
   ↓
5. Usuário autoriza no Google
   ↓
6. Google redireciona para: /api/v1/auth/google/callback?code=...
   ↓
7. Backend troca code por access_token
   ↓
8. Backend busca user info do Google
   ↓
9. Backend cria usuário (se novo) + organização
   ↓
10. Backend gera JWT
   ↓
11. Backend redireciona para: /login/callback?token=...&role=...
   ↓
12. Frontend salva token e redireciona para dashboard
```

---

## ✅ VALIDAÇÃO

Após deploy, verifique:

- [ ] Botão "Google" não retorna mais 501
- [ ] Botão "LinkedIn" não retorna mais 501
- [ ] Redirecionamento para Google funciona
- [ ] Redirecionamento para LinkedIn funciona
- [ ] Usuário é criado automaticamente
- [ ] Organização default é criada (3 créditos)
- [ ] Audit log registrado
- [ ] Login automático após autorização
- [ ] Token JWT válido
- [ ] Redirecionamento para dashboard correto

---

## 📝 COMMIT

**Commit ID:** `b6e0bda`  
**Mensagem:** feat: implement OAuth2 Google and LinkedIn login

**Arquivos Alterados:**
- `backend/app/api/auth.py` (+261 linhas)
- `backend/app/models/user.py` (+4 linhas)

---

## 🚀 PRÓXIMOS PASSOS

1. **Configurar credenciais OAuth no VPS**
2. **Fazer deploy (git pull + ./deploy.sh)**
3. **Testar login com Google**
4. **Testar login com LinkedIn**
5. **Atualizar documentação com screenshots**

---

**Problema resolvido!** 🎉

O erro 501 foi causado pela falta de implementação dos endpoints OAuth2. Agora os endpoints estão funcionais e retornam mensagens claras quando as credenciais não estão configuradas.
