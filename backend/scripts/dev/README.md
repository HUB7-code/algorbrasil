# 🛠️ Scripts de Desenvolvimento - ALGOR Backend

Esta pasta contém scripts utilitários para desenvolvimento e manutenção do sistema.

## ⚠️ ATENÇÃO
**Estes scripts são apenas para ambiente de DESENVOLVIMENTO.**  
**NUNCA execute em produção sem revisar o código.**

---

## 📋 Scripts Disponíveis

### **Gerenciamento de Usuários**

#### `fix_admin.py`
- **Função:** Reseta credenciais do admin principal
- **Uso:** `python backend/scripts/dev/fix_admin.py`
- **Quando usar:** Quando esquecer a senha do admin

#### `force_reset_robust.py`
- **Função:** Reset robusto com validação de hash
- **Uso:** `python backend/scripts/dev/force_reset_robust.py`
- **Quando usar:** Problemas com autenticação do admin

#### `cleanup_test_users.py`
- **Função:** Remove usuários de teste, mantém apenas admins
- **Uso:** `python backend/scripts/dev/cleanup_test_users.py`
- **Quando usar:** Limpar banco após testes

---

### **Utilitários de Hash**

#### `debug_hash.py`
- **Função:** Gera hash bcrypt para senhas
- **Uso:** `python backend/scripts/dev/debug_hash.py`
- **Quando usar:** Testar geração de hashes

#### `get_hash_only.py`
- **Função:** Gera hash argon2 para senhas
- **Uso:** `python backend/scripts/dev/get_hash_only.py`
- **Quando usar:** Gerar hash para inserção manual no DB

---

### **Testes de Funcionalidades**

#### `test_certificate.py`
- **Função:** Gera certificado PDF de teste
- **Uso:** `python backend/scripts/dev/test_certificate.py`
- **Quando usar:** Validar design do certificado
- **Output:** `certificate_test_premium.pdf`

#### `check_admin_fix.py`
- **Função:** Verifica status do admin no banco
- **Uso:** `python backend/scripts/dev/check_admin_fix.py`
- **Quando usar:** Debugar problemas de autenticação

---

## 🔐 Segurança

- ✅ Scripts validam ambiente antes de executar
- ✅ Logs detalhados de todas as operações
- ⚠️ Alguns scripts modificam o banco de dados
- ⚠️ Sempre faça backup antes de executar

---

## 📝 Notas

- Todos os scripts assumem que você está na raiz do projeto
- Certifique-se de que o `.env` está configurado corretamente
- Em caso de dúvida, consulte o código-fonte do script

---

**Última atualização:** 04/02/2026  
**Versão:** V21.2.0
