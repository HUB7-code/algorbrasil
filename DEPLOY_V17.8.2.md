# 🚀 PLANO DE DEPLOY V17.8.2 - ALGOR BRASIL
**Data:** 01/01/2026  
**Versão:** V17.8.2 (Production Stable)  
**Status CI/CD:** ✅ Esperando confirmação final

---

## 📋 Pré-Checklist (Antes de Fazer Deploy)

### 1. Verificar GitHub Actions
Antes de fazer o deploy, confirme que **todos os testes passaram** no CI/CD:

1. Acesse: https://github.com/HUB7-code/algorbrasil/actions
2. Verifique que o último commit (`1bbe154` - "fix: remove non-existent UserProfile import") está **✅ verde**
3. Se houver ❌ vermelho, investigue os logs antes de prosseguir

### 2. Confirmar Mudanças Locais
```bash
# No seu ambiente local:
cd c:\Users\edisi\.gemini\antigravity\playground\chrono-aldrin
git status
# Deve retornar: "Your branch is up to date with 'origin/main'"
```

### 3. Backup do Banco de Dados (VPS)
**CRÍTICO:** Sempre faça backup antes de deploy!

```bash
# Conecte-se ao VPS via SSH
ssh usuario@seu-vps-ip

# Navegue para o diretório do projeto
cd ~/algorbrasil

# Faça backup do banco SQLite
cp backend/sql_app.db backend/sql_app.db.backup-$(date +%Y%m%d-%H%M%S)
```

---

## 🎯 Processo de Deploy (VPS)

### Opção 1: Deploy Completo (Recomendado)

```bash
# No VPS, dentro do diretório ~/algorbrasil

# Executar o script automatizado
./deploy.sh
```

**O que acontece:**
1. ✅ Sincroniza código com GitHub (`git fetch` + `reset`)
2. ✅ Para containers de forma limpa
3. ✅ Remove containers órfãos
4. ✅ Reconstrói imagens Docker (Frontend + Backend)
5. ✅ Sobe todos os serviços
6. ✅ Exibe status e logs

**Tempo estimado:** ~5-8 minutos

---

### Opção 2: Deploy Apenas Backend (Mais Rápido)

Se você **só alterou código do backend** (testes, modelos, APIs):

```bash
./deploy.sh --backend-only
```

**Tempo estimado:** ~2-3 minutos

---

## 🔍 Validação Pós-Deploy

Após o deploy, execute estas verificações:

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

### 3. Teste Visual de Tipografia
Abra no navegador e verifique:

- ✅ **https://www.algorbrasil.com.br/institute** → Título "A Ciência da" em **Manrope Light** (SEM serifa)
- ✅ **https://www.algorbrasil.com.br/academy** → Título "Domine a" em **Manrope Light**
- ✅ **https://www.algorbrasil.com.br/solutions/enterprise** → "Cresça Rápido" em **Manrope Light**
- ✅ Proporção do texto não exagerada (Institute agora usa `text-6xl` no desktop, não `text-8xl`)

### 4. Teste de Login
```bash
# Acesse no navegador
https://www.algorbrasil.com.br/login

# Credenciais admin padrão (se aplicável):
Email: admin@algorbrasil.com.br
Senha: admin123
```

---

## 🛠️ Troubleshooting

### Erro 502 Bad Gateway
```bash
# Verifique logs do backend
docker-compose logs --tail 100 backend

# Se necessário, reinicie apenas o backend
docker-compose restart backend
```

### Tipografia Ainda Aparece Serifada
```bash
# Limpe o cache do navegador (Ctrl + Shift + R)
# Ou verifique se o build do frontend foi concluído:
docker-compose logs --tail 50 frontend | grep "compiled successfully"
```

### Containers Não Sobem
```bash
# Verifique se há containers órfãos
docker ps -a

# Remova manualmente se necessário
docker rm -f algor_backend algor_frontend algor_web

# Tente novamente
docker-compose up -d
```

---

## 📊 Resumo das Mudanças V17.8.2

| Categoria | Alteração |
|-----------|-----------|
| **Tipografia** | Removido `italic` de fontes sans-serif para evitar fallback serif |
| **Institute** | Reduzido título hero de `8xl` → `6xl` para melhor proporção |
| **Assets** | Criado `grid.svg` para background patterns |
| **Performance** | Adicionado `sizes` prop em componentes `next/image` |
| **CI/CD** | Adicionado `python-jose` ao `requirements.txt` |
| **Testes** | Corrigidos imports de modelos em `test_risks.py` e `profiles_integration_test.py` |

---

## 🎉 Confirmação Final

Após deploy bem-sucedido:

1. ✅ Todos os containers rodando
2. ✅ Logs sem erros críticos
3. ✅ Tipografia visualmente correta
4. ✅ Login funcional

**🚀 ALGOR BRASIL V17.8.2 ESTÁ EM PRODUÇÃO!**

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique logs: `docker-compose logs -f backend`
2. Consulte `MANUAL_DEPLOY_VPS.md` para troubleshooting detalhado
3. Reverta para última versão estável:
   ```bash
   git reset --hard <commit-anterior>
   ./deploy.sh
   ```

---

*Documento criado em: 01/01/2026 - Versão V17.8.2*
