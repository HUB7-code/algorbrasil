# 🚀 GUIA DE DEPLOY V18.3.0 - ALGOR BRASIL

**Versão:** V18.3.0 "Authentication Audit"  
**Data:** 03/02/2026  
**Status:** ✅ Pronto para Deploy  
**Commit:** `2e2df5f`

---

## 📋 PRÉ-CHECKLIST (Antes de Fazer Deploy)

### 1. ✅ Verificar GitHub Actions
- Acesse: https://github.com/HUB7-code/algorbrasil/actions
- Confirme que o commit `2e2df5f` está **✅ verde**
- Se houver ❌ vermelho, investigue os logs antes de prosseguir

### 2. ✅ Confirmar Mudanças Locais
```bash
git log --oneline -1
# Deve mostrar: 2e2df5f feat(v18.3.0): authentication audit and email system validation
```

### 3. ✅ Backup do Banco de Dados (VPS)
**CRÍTICO:** Sempre faça backup antes de deploy!

```bash
# Conecte-se ao VPS via SSH
ssh usuario@seu-vps-ip

# Navegue para o diretório do projeto
cd ~/algorbrasil

# Faça backup do banco SQLite
cp backend/sql_app.db backend/sql_app.db.backup-$(date +%Y%m%d-%H%M%S)

# Verifique se o backup foi criado
ls -lh backend/sql_app.db.backup-*
```

---

## 🎯 PROCESSO DE DEPLOY (VPS)

### Opção 1: Deploy Completo (Recomendado)

```bash
# No VPS, dentro do diretório ~/algorbrasil

# 1. Sincronizar código com GitHub
git fetch origin
git reset --hard origin/main

# 2. Verificar versão
git log --oneline -1
# Deve mostrar: 2e2df5f feat(v18.3.0): authentication audit...

# 3. Atualizar configurações de e-mail (IMPORTANTE!)
nano backend/.env

# Verifique se está assim:
# SMTP_SERVER=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=edisio.nascimentojr@gmail.com  # ← DEVE TER @gmail.com
# SMTP_PASSWORD=hziy tibq jkow iubu
# SMTP_FROM_EMAIL=edisio.nascimentojr@gmail.com
# SMTP_FROM_NAME=Algor Brasil

# 4. Executar deploy
./deploy.sh
```

**O que acontece:**
1. ✅ Para containers de forma limpa
2. ✅ Remove containers órfãos
3. ✅ Reconstrói imagens Docker (Frontend + Backend)
4. ✅ Sobe todos os serviços
5. ✅ Exibe status e logs

**Tempo estimado:** ~5-8 minutos

---

### Opção 2: Deploy Apenas Backend (Mais Rápido)

Se você **só alterou código do backend** (configurações, testes):

```bash
./deploy.sh --backend-only
```

**Tempo estimado:** ~2-3 minutos

---

## 🔍 VALIDAÇÃO PÓS-DEPLOY

### 1. Status dos Containers
```bash
docker-compose ps
```

**Esperado:**
```
Name                State         Ports
-------------------------------------------------
algor_frontend      Up           0.0.0.0:3000->3000/tcp
algor_backend       Up           0.0.0.0:8000->8000/tcp
algor_web           Up           0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp
```

### 2. Logs do Backend
```bash
docker-compose logs --tail 50 backend
```

**Esperado (sem erros):**
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 3. Teste de Configuração SMTP
```bash
# Dentro do container backend
docker-compose exec backend python -c "
from app.core.config import settings
print(f'SMTP User: {settings.SMTP_USER}')
print(f'SMTP Server: {settings.SMTP_SERVER}')
print(f'Frontend URL: {settings.FRONTEND_URL}')
"
```

**Esperado:**
```
SMTP User: edisio.nascimentojr@gmail.com  # ← DEVE TER @gmail.com
SMTP Server: smtp.gmail.com
Frontend URL: https://www.algorbrasil.com.br
```

### 4. Teste Automatizado do Sistema
```bash
# Dentro do container backend
docker-compose exec backend python test_auth_system.py
```

**Esperado:**
```
============================================================
🚀 ALGOR BRASIL - Teste do Sistema de Autenticação
============================================================
🔍 TESTE 1: Configurações de E-mail
✅ Todas as configurações estão OK!

🔍 TESTE 2: Caminho da Logo
✅ Logo encontrada!

🔍 TESTE 3: Conexão com Banco de Dados
✅ Conexão com banco OK!

🔍 TESTE 4: Envio de E-mail de Teste
✅ E-mail enviado com sucesso!

============================================================
📊 RESUMO DOS TESTES
============================================================
Configurações        → ✅ PASSOU
Logo                 → ✅ PASSOU
Banco de Dados       → ✅ PASSOU
Envio de E-mail      → ✅ PASSOU

============================================================
RESULTADO FINAL: 4/4 testes passaram
🎉 SISTEMA 100% FUNCIONAL!
============================================================
```

---

## 🧪 TESTES FUNCIONAIS (Produção)

### Teste 1: Cadastro de Novo Usuário
1. Acesse: https://www.algorbrasil.com.br/register
2. Preencha o formulário:
   - Email: `teste-deploy@empresa.com.br`
   - Nome: `Teste Deploy V18.3.0`
   - Senha: `SenhaForte123!`
3. Clique em "Criar Conta"
4. **Validação:**
   - ✅ Mensagem de sucesso exibida
   - ✅ E-mail de verificação recebido
   - ✅ Design Dark Mode com logo ALGOR
   - ✅ Botão "Confirmar Acesso" com gradient neon green

### Teste 2: Verificação de E-mail
1. Abra o e-mail recebido
2. Clique no botão "Confirmar Acesso"
3. **Validação:**
   - ✅ Redirecionamento para `/verify-email?token=...`
   - ✅ Mensagem: "E-mail confirmado com sucesso!"
   - ✅ Conta ativada

### Teste 3: Login
1. Acesse: https://www.algorbrasil.com.br/login
2. **UI Check:**
   - ✅ Neural Mesh Background animado
   - ✅ Logo com aura pulsante
   - ✅ Inputs com neon glow on focus
3. Faça login com as credenciais criadas
4. **Validação:**
   - ✅ Login bem-sucedido
   - ✅ Redirecionamento para dashboard/onboarding
   - ✅ Token salvo

### Teste 4: Esqueci Senha
1. Acesse: https://www.algorbrasil.com.br/login
2. Clique em "Esqueceu a senha?"
3. Digite o e-mail de teste
4. **Validação:**
   - ✅ E-mail de reset recebido
   - ✅ Botão com gradient red
   - ✅ Link funcional

### Teste 5: Lead Enterprise
1. Acesse: https://www.algorbrasil.com.br/solutions/enterprise
2. Clique em "Diagnóstico Técnico Gratuito"
3. Preencha e envie
4. **Validação:**
   - ✅ E-mail de confirmação recebido
   - ✅ Design institucional
   - ✅ Admin recebe notificação

---

## 🛠️ TROUBLESHOOTING

### Erro 502 Bad Gateway
```bash
# Verifique logs do backend
docker-compose logs --tail 100 backend

# Se necessário, reinicie apenas o backend
docker-compose restart backend
```

### E-mails Não Estão Sendo Enviados
```bash
# 1. Verifique configuração SMTP
docker-compose exec backend python -c "
from app.core.config import settings
print(f'SMTP User: {settings.SMTP_USER}')
print(f'SMTP Password: {'*' * len(settings.SMTP_PASSWORD) if settings.SMTP_PASSWORD else 'NOT SET'}')
"

# 2. Teste envio manual
docker-compose exec backend python test_auth_system.py

# 3. Verifique logs de erro
docker-compose logs backend | grep -i "smtp\|email"
```

### Containers Não Sobem
```bash
# Verifique se há containers órfãos
docker ps -a

# Remova manualmente se necessário
docker rm -f algor_backend algor_frontend algor_web

# Limpe volumes órfãos
docker volume prune -f

# Tente novamente
docker-compose up -d --build
```

### Teste Automatizado Falha
```bash
# Verifique qual teste falhou
docker-compose exec backend python test_auth_system.py

# Se for SMTP:
# - Verifique backend/.env
# - Confirme que SMTP_USER tem @gmail.com
# - Verifique senha de app do Gmail

# Se for Logo:
# - Verifique se frontend/public/logo-algor.webp existe
# - Confirme permissões do arquivo

# Se for Banco:
# - Verifique se sql_app.db existe
# - Confirme permissões do arquivo
```

---

## 📊 RESUMO DAS MUDANÇAS V18.3.0

| Categoria | Alteração | Impacto |
|-----------|-----------|---------|
| **SMTP Config** | Corrigido `SMTP_USER` (adicionado @gmail.com) | 🔴 CRÍTICO - E-mails agora funcionam |
| **Route Cleanup** | Removida rota mock `/frontend/app/api/auth/login/route.ts` | 🟡 MÉDIO - Evita confusão |
| **Test Suite** | Criado `backend/test_auth_system.py` | 🟢 BAIXO - Facilita validação |
| **Documentation** | 4 novos documentos + 3 atualizados | 🟢 BAIXO - Melhora navegação |

---

## 🎉 CONFIRMAÇÃO FINAL

Após deploy bem-sucedido:

1. ✅ Todos os containers rodando
2. ✅ Logs sem erros críticos
3. ✅ Teste automatizado: 4/4 passando
4. ✅ Cadastro funcional
5. ✅ E-mails sendo enviados
6. ✅ Login funcional

**🚀 ALGOR BRASIL V18.3.0 ESTÁ EM PRODUÇÃO!**

---

## 📞 SUPORTE

Se encontrar problemas:

1. Verifique logs: `docker-compose logs -f backend`
2. Execute teste automatizado: `docker-compose exec backend python test_auth_system.py`
3. Consulte [`AUTHENTICATION_AUDIT_REPORT.md`](./AUTHENTICATION_AUDIT_REPORT.md)
4. Reverta para última versão estável:
   ```bash
   git reset --hard 22ae98c  # Versão anterior
   ./deploy.sh
   ```

---

## 📝 CHECKLIST DE DEPLOY

- [ ] Backup do banco de dados criado
- [ ] Código sincronizado com GitHub (commit `2e2df5f`)
- [ ] Configuração SMTP verificada (SMTP_USER com @gmail.com)
- [ ] Deploy executado (`./deploy.sh`)
- [ ] Containers rodando (docker-compose ps)
- [ ] Logs sem erros (docker-compose logs backend)
- [ ] Teste automatizado: 4/4 passando
- [ ] Teste de cadastro: ✅
- [ ] Teste de e-mail: ✅
- [ ] Teste de login: ✅
- [ ] Teste de esqueci senha: ✅
- [ ] Teste de lead enterprise: ✅

---

**Documento criado em:** 03/02/2026  
**Versão:** V18.3.0  
**Commit:** `2e2df5f`  
**Status:** ✅ Pronto para Deploy
