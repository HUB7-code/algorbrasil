# ⚡ CHECKLIST RÁPIDO - LGPD 5 MINUTOS

**Antes de commitar código com dados pessoais, valide:**

---

## 🔐 SEGURANÇA (Copiar/Colar)

### Backend

```javascript
// ✅ Hashing de Senha
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(password, 12);
await bcrypt.compare(inputPassword, hash);

// ✅ Criptografia de Dados
const crypto = require('crypto');
const ENCRYPTION_KEY = Buffer.from(process.env.DATA_ENCRYPTION_KEY, 'hex');
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
let encrypted = cipher.update(plaintext, 'utf8', 'hex');
encrypted += cipher.final('hex');
// Retornar: iv:encrypted

// ✅ Autorização em CADA Endpoint
app.get('/api/users/:userId', authMiddleware, (req, res) => {
  if (req.params.userId !== req.user_id) {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  // ...
});

// ✅ Prepared Statements (NUNCA concatenar)
const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// ✅ Auditoria
await db.auditLogs.insert({
  user_id: userId,
  action: 'READ',
  timestamp: new Date(),
  ip: req.ip
});
```

### Frontend

```jsx
// ✅ Consentimento (Checkbox DESMARCADO)
<input type="checkbox" name="newsletter" />
Desejo receber newsletters

// ✅ Google Analytics (SOMENTE após consentimento)
if (consentData.analytics) {
  window['ga-disable-GA_MEASUREMENT_ID'] = false;
  gtag('config', 'GA_ID', { 'anonymize_ip': true });
}

// ✅ Transparência em Campos
<label>
  Email *
  <Tooltip content="Necessário para recuperação de conta">
    <InfoIcon />
  </Tooltip>
</label>
```

---

## 🎯 CHECKLIST RÁPIDO

```
Backend:
☐ Senha? Bcrypt (custo 12+)
☐ Dados sensíveis? Criptografado AES-256
☐ Banco de dados? Conexão TLS
☐ SQL Query? Prepared statement ($ ou ?)
☐ Endpoint? Autorização verificada
☐ Acesso? Logs de auditoria criados
☐ Dados de outro usuário? Teste acesso negado

Frontend:
☐ Consentimento? Checkbox desmarcado
☐ Finalidade? Explicada para cada campo
☐ Política de Privacidade? Link visível
☐ Google Analytics? Apenas após consentimento
☐ IP Analytics? Anonimizado (anonymize_ip: true)
☐ Revogação? Fácil em configurações

Documentação:
☐ ROPA? Adicionada
☐ Novo terceiro? DPA assinado
☐ Dados sensíveis? Política atualizada
☐ Teste? SAR, Exclusão, Portabilidade funcionam

Antes de Deploy:
☐ Sem credenciais em hardcode? (git grep password)
☐ Sem dados sensíveis em logs? (plaintext CPF, senha, CC?)
☐ Backup testado? (Restauração validada?)
☐ DPO revisto? (Se dados sensíveis novos?)
```

---

## 🚨 RED FLAGS - Se Encontrar, PARAR E ESCALAR

```
❌ Senha em plain text
   → Deletar, usar bcrypt imediatamente

❌ SQL Injection possível (concatenação de strings)
   → Refazer query com prepared statements

❌ Acesso a dados de outro usuário sem validação
   → Adicionar verificação: if (userId !== req.user_id) return 403

❌ Criptografia não implementada para CPF/SSN/PII
   → Adicionar encryptField() antes de salvar

❌ Google Analytics carregado antes de consentimento
   → Movê-lo para after consentimento

❌ Checkbox de consentimento PRÉ-MARCADO
   → Mudar para desmarcado (opt-in, não opt-out)

❌ Função de deletar conta que não deleta dados
   → Implementar cascade delete

❌ Sem logs de auditoria
   → Adicionar auditLog() em operações sensíveis

❌ Email enviado sem consentimento
   → Validar consentimento before envio

❌ Dados sensíveis em plain text em logs
   → Mascarar ou remover de logs públicos
```

---

## 📋 TEMPLATE: Nova Funcionalidade com Dados

**Copie quando adicionar novo feature:**

### Passo 1: Validação
```
[ ] Este recurso coleta dados pessoais?    SIM/NÃO
    Se SIM: Continue com checklist
    Se NÃO: Prossiga normalmente

[ ] Qual é o tipo de dado?
    [ ] Email    [ ] Nome    [ ] CPF    [ ] Telefone
    [ ] Outro: ________________

[ ] É sensível?    SIM/NÃO
    (Saúde, Raça, Religião, Biométrica, Financeira?)

[ ] Qual é a base legal?
    [ ] Consentimento    [ ] Contrato    [ ] Obrigação Legal
    [ ] Interesse Legítimo    [ ] Outra: ____________
```

### Passo 2: Backend
```
[ ] Criptografia implementada (se sensível)
[ ] Autorização verificada
[ ] Auditoria logada
[ ] Teste de acesso negado passou
[ ] Prepared statements usados
```

### Passo 3: Frontend
```
[ ] Consentimento/Label adicionado
[ ] Link para Política de Privacidade visível
[ ] Tooltip com finalidade implementado
[ ] Teste de revogação funciona
```

### Passo 4: Documentação
```
[ ] ROPA atualizada
[ ] Política de Privacidade atualizada (se necessário)
[ ] DPA assinado (se novo terceiro)
```

### Passo 5: Testes
```
[ ] Criar dados ✓
[ ] Ler dados (autorizado) ✓
[ ] Ler dados (não autorizado) → 403 ✓
[ ] Deletar dados ✓
[ ] Auditoria registrada ✓
[ ] SAR funciona ✓
[ ] Consentimento pode ser revogado ✓
```

---

## 🔄 MATRIZ RÁPIDA: O QUE FAZER

| Você quer... | Use isto | Localização |
|---|---|---|
| Hash de senha | bcrypt.hash() | Backend - Auth |
| Criptografar CPF | encryptField() | Backend - Crypto |
| Validar autorização | if(userId !== req.user_id) | Backend - Auth |
| Consentimento no form | checkbox (unchecked) | Frontend - Consent |
| Revogação | button + POST /revoke | Frontend - Settings |
| Google Analytics OK | gtag(anonymize_ip: true) | Frontend - Analytics |
| Usuário acessar dados | GET /api/export-data | Backend - SAR |
| Usuário deletar conta | DELETE /api/account | Backend - Deletion |
| Logar acessos | auditLog() | Backend - Audit |
| Proteger conexão BD | ssl: { rejectUnauthorized: true } | Backend - DB |
| Deletar dados antigos | scheduler + purge() | Backend - Retention |
| Notificar incidente | POST /report-incident | Backend - Incident |

---

## 💾 COPIAR/COLAR: Minimal Viable LGPD Code

```javascript
// Arquivo: compliance.js
// Copie e adapte para seu projeto

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ===== SEGURANÇA =====

// Hash de senha
async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Verificar senha
async function verifyPassword(input, hash) {
  return await bcrypt.compare(input, hash);
}

// Criptografar campo
function encryptField(plaintext) {
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(process.env.DATA_ENCRYPTION_KEY, 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Descriptografar campo
function decryptField(encryptedText) {
  const [ivHex, ciphertext] = encryptedText.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = Buffer.from(process.env.DATA_ENCRYPTION_KEY, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// ===== AUTORIZAÇÃO =====

// Middleware de autenticação
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Validar acesso ao próprio recurso
function checkOwnership(req, res, next) {
  if (req.params.userId !== req.user_id) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
}

// ===== AUDITORIA =====

// Logar ação
async function auditLog(action, resourceType, resourceId, userId, req) {
  const log = {
    action,
    resourceType,
    resourceId,
    userId,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date()
  };
  
  // Salvar em DB
  return db.auditLogs.insert(log);
}

// ===== DIREITOS DO TITULAR =====

// Deletar usuário (cascata)
async function deleteUser(userId) {
  await db.activities.delete({ user_id: userId });
  await db.documents.delete({ owner_id: userId });
  await db.users.delete({ id: userId });
  
  // Anonimizar logs
  await db.auditLogs.update(
    { user_id: userId },
    { user_id: 'DELETED' }
  );
}

// Exportar dados do usuário
async function exportUserData(userId) {
  const user = await db.users.findById(userId);
  
  return {
    profile: {
      id: user.id,
      email: user.email,
      name: decryptField(user.name),
      created_at: user.created_at
    },
    documents: await db.documents.find({ owner_id: userId })
  };
}

// ===== USO =====

// Exemplo: Registrar novo usuário
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Hash password
  const passwordHash = await hashPassword(password);
  
  // Criptografar nome
  const encryptedName = encryptField(name);
  
  // Salvar
  const user = await db.users.insert({
    email,
    password_hash: passwordHash,
    name: encryptedName,
    created_at: new Date()
  });
  
  // Auditar
  await auditLog('USER_CREATED', 'user', user.id, user.id, req);
  
  res.json({ success: true });
});

// Exemplo: Buscar dados do próprio usuário
app.get('/api/users/:userId', authMiddleware, checkOwnership, async (req, res) => {
  const user = await db.users.findById(req.user_id);
  
  // Descriptografar antes de enviar
  user.name = decryptField(user.name);
  delete user.password_hash; // NUNCA enviar hash
  
  // Auditar
  await auditLog('DATA_READ', 'user', user.id, req.user_id, req);
  
  res.json(user);
});

// Exemplo: Deletar conta do usuário
app.delete('/api/users/:userId', authMiddleware, checkOwnership, async (req, res) => {
  await deleteUser(req.user_id);
  
  // Auditar
  await auditLog('ACCOUNT_DELETED', 'user', req.user_id, req.user_id, req);
  
  res.json({ success: true });
});

module.exports = {
  hashPassword,
  verifyPassword,
  encryptField,
  decryptField,
  authMiddleware,
  checkOwnership,
  auditLog,
  deleteUser,
  exportUserData
};
```

---

## 📞 Em Caso de Dúvida

**Nível 1: Self-Service**
- Seção relevante do LGPD-Manual-Operacional.md
- Busque por palavra-chave

**Nível 2: Peer Review**
- Compartilhe código com outro dev
- "Este código é LGPD-conforme?"

**Nível 3: DPO/Compliance**
- Se envolver dados sensíveis novos
- Se envolver novo terceiro
- Se envolver decisão arquitetural

---

**Tempo Médio para Usar Este Checklist:** 5 minutos  
**Resultado:** Código LGPD-conforme pronto para deploy  
**Manutenção:** Rever antes de cada deploy

✅ **AGORA VOCÊ ESTÁ BLINDADO DE INCONFORMIDADES LGPD**

