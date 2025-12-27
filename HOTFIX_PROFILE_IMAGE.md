# 🚨 HOTFIX: Adicionar Coluna profile_image no VPS

## Problema Identificado:
```
sqlite3.OperationalError: no such column: users.profile_image
```

## Solução Rápida (Escolha UMA das opções):

---

### OPÇÃO 1: SQL Direto (MAIS RÁPIDO) ⚡

**No VPS, execute:**

```bash
# 1. Conectar ao banco de dados
cd /caminho/do/projeto
sqlite3 backend/algor.db

# 2. Executar o comando SQL
ALTER TABLE users ADD COLUMN profile_image VARCHAR(255) NULL;

# 3. Verificar
.schema users

# 4. Sair
.quit

# 5. Reiniciar backend
sudo systemctl restart algor-backend
# ou
sudo supervisorctl restart algor-backend
```

---

### OPÇÃO 2: Usando o Script SQL

```bash
# 1. Fazer upload do arquivo add_profile_image.sql para o VPS
scp add_profile_image.sql user@vps:/caminho/do/projeto/

# 2. No VPS, executar:
cd /caminho/do/projeto
sqlite3 backend/algor.db < add_profile_image.sql

# 3. Reiniciar backend
sudo systemctl restart algor-backend
```

---

### OPÇÃO 3: Usando Alembic (MAIS SEGURO)

```bash
# 1. Fazer upload da migration
scp backend/alembic/versions/add_profile_image.py user@vps:/caminho/do/projeto/backend/alembic/versions/

# 2. No VPS, executar:
cd /caminho/do/projeto/backend
alembic upgrade head

# 3. Reiniciar backend
sudo systemctl restart algor-backend
```

---

## Verificação Pós-Fix:

1. Acesse https://www.algorbrasil.com.br/register
2. Preencha o formulário
3. Clique "Criar Conta"
4. **Resultado esperado:** ✅ Cadastro bem-sucedido

---

## Commits Necessários:

```bash
# No seu ambiente local:
git add backend/alembic/versions/add_profile_image.py
git add add_profile_image.sql
git commit -m "fix(db): Add profile_image column migration for production"
git push origin main
```

---

**Tempo estimado:** 2-5 minutos
