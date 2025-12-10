# 📘 MANUAL OPERACIONAL DE CONFORMIDADE LGPD 
## Para Desenvolvimento Backend & Frontend 100% Blindado

**Versão:** 2.0 - Manual Executivo  
**Público-Alvo:** Antigravity Agent (Desenvolvimento Web Automatizado)  
**Objetivo:** Aplicar conformidade LGPD como guardrails durante construção de sistema  
**Padrão:** Fazer/Não Fazer + Código Pronto + Validação  

---

## 🎯 PRINCÍPIO FUNDAMENTAL

> **VOCÊ NÃO PODE ASSUMIR CONFORMIDADE. VOCÊ DEVE CONSTRUIR CONFORMIDADE.**

Toda decisão de desenvolvimento deve responder:
1. **Qual é o dado?** (Identificador direto ou indireto?)
2. **Por que coletamos?** (Finalidade específica?)
3. **Com que base legal?** (Consentimento, contrato, etc?)
4. **Como protegemos?** (Criptografia, acesso, retenção?)
5. **Como deletamos?** (Cascata de exclusão?)

---

## 📋 ÍNDICE OPERACIONAL

1. [Arquitetura de Conformidade](#arquitetura-de-conformidade)
2. [Backend - Segurança de Dados](#backend---segurança-de-dados)
3. [Frontend - Coleta Consciente](#frontend---coleta-consciente)
4. [Gerenciamento de Consentimento](#gerenciamento-de-consentimento)
5. [Processamento de Direitos do Titular](#processamento-de-direitos-do-titular)
6. [Gestão de Terceiros/Operadores](#gestão-de-terceirosoperadores)
7. [Incidentes e Notificação](#incidentes-e-notificação)
8. [Checklist de Certificação](#checklist-de-certificação)

---

## 🏗️ ARQUITETURA DE CONFORMIDADE

### Modelo de Camadas de Proteção

```
┌─────────────────────────────────────────────────────────┐
│  CAMADA 1: COLETA (Frontend)                            │
│  ✓ Consentimento explícito                              │
│  ✓ Transparência total                                  │
│  ✓ Opt-in (nunca opt-out)                              │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  CAMADA 2: TRANSMISSÃO (HTTP/Transport)                │
│  ✓ HTTPS/TLS obrigatório                               │
│  ✓ Certificados válidos                                │
│  ✓ Criptografia de ponta a ponta                       │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  CAMADA 3: PROCESSAMENTO (Backend)                      │
│  ✓ Validação de autorização                            │
│  ✓ Minimização de dados                                │
│  ✓ Auditoria de acesso                                 │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  CAMADA 4: ARMAZENAMENTO (Database)                     │
│  ✓ Criptografia em repouso (AES-256)                    │
│  ✓ Isolamento de dados sensíveis                        │
│  ✓ Separação de identificadores                         │
└────────────────────┬────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│  CAMADA 5: RETENÇÃO/EXCLUSÃO                            │
│  ✓ Ciclo de vida de dados documentado                   │
│  ✓ Exclusão automática ou manual                        │
│  ✓ Cascata de relacionamentos                           │
└─────────────────────────────────────────────────────────┘
```

### Padrão de Fluxo de Dados

**PARA CADA DADO COLETADO, DOCUMENTE:**

```
DATA-001: Nome Completo
├─ Identificador? SIM (Direto)
├─ Finalidade? Criação de conta
├─ Base Legal? Contrato (Art. 7º, II)
├─ Necessário? SIM
├─ Sensível? NÃO
├─ Retenção? Enquanto conta ativa + 90 dias
├─ Armazenamento? 
│  └─ Criptografia: AES-256
│  └─ Acesso: Administrativo apenas
│  └─ Backup: Diário (encriptado)
├─ Compartilhado? NÃO
├─ Exclusão? DELETE em cascata
└─ Validação: ✓ LGPD-OK
```

---

## 🔐 BACKEND - SEGURANÇA DE DADOS

### 1. Autenticação e Autorização

**FAZER:**
- ✅ Implementar autenticação JWT ou OAuth 2.0
- ✅ Hash seguro de senhas com bcrypt (custo 12+)
- ✅ Autenticação multi-fator (2FA) para dados sensíveis
- ✅ Validar autorização em CADA requisição

**NÃO FAZER:**
- ❌ Armazenar senhas em plain text
- ❌ Usar MD5 ou SHA1 para passwords
- ❌ Confiar em autorização apenas frontend
- ❌ Deixar contas admin sem 2FA

**Código Padrão - Node.js:**

```javascript
const bcrypt = require('bcrypt');

// HASHING DE SENHA (Durante registro)
async function hashPassword(password) {
  // Custo 12+ torna ataque de força bruta impraticável
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  
  // Nunca retorna senha em plain text!
  return hash;
}

// VERIFICAÇÃO DE SENHA (Durante login)
async function verifyPassword(inputPassword, storedHash) {
  const isValid = await bcrypt.compare(inputPassword, storedHash);
  return isValid;
}

// MIDDLEWARE DE AUTORIZAÇÃO (Todas as rotas privadas)
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: 'Autorização necessária' 
    });
  }
  
  try {
    // Validar token e extrair user_id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    
    // CRÍTICO: Validar que usuário só acessa seus dados
    if (req.params.user_id !== req.user_id) {
      return res.status(403).json({ 
        error: 'Acesso negado' 
      });
    }
    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// USO: Proteger rotas sensíveis
app.get('/api/users/:user_id/data', authMiddleware, (req, res) => {
  // Neste ponto, user_id foi validado
});
```

### 2. Criptografia em Repouso (Database)

**FAZER:**
- ✅ Usar AES-256 para dados sensíveis
- ✅ Manter chaves em environment variables seguras
- ✅ Usar TDE (Transparent Data Encryption) no BD
- ✅ Criptografar campos individuais críticos

**NÃO FAZER:**
- ❌ Confiar em criptografia de disco apenas
- ❌ Armazenar chaves no código
- ❌ Usar algoritmos frágeis (RC4, DES)
- ❌ Criptografar sem auditoria de acesso

**Código Padrão - Node.js com Crypto:**

```javascript
const crypto = require('crypto');

// Configuração de Chaves
const ENCRYPTION_KEY = Buffer.from(
  process.env.DATA_ENCRYPTION_KEY, 
  'hex'
); // 32 bytes = 256 bits
const IV_LENGTH = 16; // bytes

// Função de Encriptação (Dados Sensíveis)
function encryptField(plaintext) {
  // Gerar IV único para cada encriptação (crítico!)
  const iv = crypto.randomBytes(IV_LENGTH);
  
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    iv
  );
  
  let encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  // Retornar IV + Ciphertext (IV precisa ser armazenado)
  return `${iv.toString('hex')}:${encrypted}`;
}

// Função de Descriptação
function decryptField(encryptedText) {
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    ENCRYPTION_KEY,
    iv
  );
  
  let decrypted = decipher.update(parts[1], 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// APLICAÇÃO: Salvar dados sensíveis encriptados
async function createUser(userData) {
  const user = {
    id: generateUUID(),
    email: userData.email, // Não criptografar - precisa buscar por email
    name: encryptField(userData.name), // CRIPTOGRAFAR
    cpf: encryptField(userData.cpf), // CRIPTOGRAFAR
    phone: encryptField(userData.phone), // CRIPTOGRAFAR
    salary_range: encryptField(userData.salary_range), // CRIPTOGRAFAR
    date_created: new Date(),
    updated_at: new Date()
  };
  
  return db.users.insert(user);
}

// RETORNAR DADOS: Descriptografar antes de enviar
async function getUser(userId) {
  const user = await db.users.findById(userId);
  
  // Verificar autorização antes!
  if (!isAuthorized(req.user_id, userId)) {
    throw new Error('Acesso negado');
  }
  
  // Descriptografar apenas campos sensíveis
  return {
    id: user.id,
    email: user.email,
    name: decryptField(user.name),
    // CPF: Não retornar a menos que necessário
    date_created: user.date_created
  };
}
```

### 3. Proteção de Conexão com Database

**FAZER:**
- ✅ Usar connection strings seguras (TLS/SSL)
- ✅ Autenticação com credentials seguros
- ✅ Connection pooling com limite de conexões
- ✅ Timeouts e circuit breakers

**NÃO FAZER:**
- ❌ Conectar sem TLS
- ❌ Credentials em plain text no código
- ❌ Conexões abertas indefinidamente
- ❌ Expor detalhes de erro do BD ao usuário

**Código Padrão - PostgreSQL + Node.js:**

```javascript
const { Pool } = require('pg');

// CORRETO: Connectionstring segura via ENV
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true, // CRÍTICO: validar certificado
    ca: process.env.DB_CA_CERT // CA fornecido pelo provedor
  },
  max: 20, // Limite de conexões
  idleTimeoutMillis: 30000, // Fechar conexões ociosas
  connectionTimeoutMillis: 10000 // Timeout de conexão
});

// NUNCA EXPONHA ERRO DO BD PARA CLIENTE
pool.on('error', (err) => {
  console.error('Pool error:', err);
  // Log para monitoramento interno
  logError({
    service: 'database',
    severity: 'critical',
    message: err.message,
    timestamp: new Date()
  });
  // Retornar erro genérico ao usuário
});

// USO SEGURO:
async function queryUser(userId) {
  let client;
  try {
    client = await pool.connect();
    
    // Usar parametrized queries (previne SQL injection!)
    const result = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );
    
    return result.rows[0];
  } catch (err) {
    // Log detalhado internamente
    console.error('Query error:', err);
    
    // Resposta genérica ao cliente
    throw new Error('Erro ao buscar dados');
  } finally {
    if (client) client.release();
  }
}
```

### 4. Proteção contra SQL Injection

**FAZER:**
- ✅ Usar prepared statements SEMPRE
- ✅ Validar entrada de dados
- ✅ Usar ORMs (Sequelize, TypeORM) que fazem sanitização
- ✅ Implementar WAF (Web Application Firewall)

**NÃO FAZER:**
- ❌ Concatenar strings em queries SQL
- ❌ Confiar em validação frontend apenas
- ❌ Usar eval() ou dynamic SQL

**Exemplo de VULNERABILIDADE (NUNCA FAZER):**

```javascript
// ❌ PERIGO: SQL Injection!
const userId = req.params.id;
const query = `SELECT * FROM users WHERE id = ${userId}`;
// Atacante passa: ' OR '1'='1
// Query vira: SELECT * FROM users WHERE id = '' OR '1'='1'
// ACESSO A TODOS OS USERS!
```

**Exemplo SEGURO:**

```javascript
// ✅ CORRETO: Prepared statement
const userId = req.params.id;
const query = 'SELECT * FROM users WHERE id = $1';
const result = await db.query(query, [userId]);
// Parâmetro é tratado como valor, nunca como código

// ✅ ALTERNATIVA: ORM (Sequelize)
const user = await User.findOne({ 
  where: { id: userId } 
});
// ORM sanitiza automaticamente
```

### 5. Auditoria e Logging de Acessos

**FAZER:**
- ✅ Logar TODA leitura de dados sensíveis
- ✅ Logar TODA modificação de dados
- ✅ Incluir user_id, timestamp, ação, IP
- ✅ Manter logs por mínimo 6 meses
- ✅ Proteger logs do acesso não autorizado

**NÃO FAZER:**
- ❌ Logar senhas ou dados sensíveis
- ❌ Deletar logs prematuramente
- ❌ Deixar logs acessíveis a qualquer um
- ❌ Não correlacionar logs com usuários

**Código Padrão - Auditoria:**

```javascript
// Schema de Auditoria
const auditLog = {
  id: UUID,
  user_id: UUID,
  action: 'READ|WRITE|DELETE',
  resource_type: 'user|document|etc',
  resource_id: UUID,
  changes: {
    before: { /* valores antigos */ },
    after: { /* valores novos */ }
  },
  ip_address: '192.168.1.1',
  user_agent: 'Mozilla/5.0...',
  timestamp: ISODate,
  status: 'SUCCESS|FAILED'
};

// Middleware de Auditoria
async function auditLog(action, resourceType, resourceId, userId, changes, req) {
  // NUNCA LOGAR DADOS SENSÍVEIS EM PLAIN TEXT
  const sanitizedChanges = {
    before: sanitize(changes.before),
    after: sanitize(changes.after)
  };
  
  const log = {
    id: generateUUID(),
    user_id: userId,
    action: action,
    resource_type: resourceType,
    resource_id: resourceId,
    changes: sanitizedChanges,
    ip_address: req.ip,
    user_agent: req.get('User-Agent'),
    timestamp: new Date(),
    status: 'SUCCESS'
  };
  
  // Salvar em BD separado (com retenção política)
  return db.auditLogs.insert(log);
}

// USO: Envolver operações sensíveis
app.post('/api/users/:userId/update', authMiddleware, async (req, res) => {
  const userId = req.params.userId;
  
  try {
    // Buscar dados atuais (para auditoria)
    const before = await db.users.findById(userId);
    
    // Executar modificação
    const after = await db.users.update(userId, req.body);
    
    // Auditar mudança
    await auditLog(
      'WRITE',
      'user',
      userId,
      req.user_id,
      { before, after },
      req
    );
    
    res.json(after);
  } catch (err) {
    // Auditar falha
    await auditLog(
      'WRITE',
      'user',
      userId,
      req.user_id,
      { error: err.message },
      req
    );
    
    res.status(500).json({ error: 'Erro na operação' });
  }
});

// RETENÇÃO DE LOGS: Deletar automaticamente após 6 meses
async function purgeOldLogs() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  await db.auditLogs.delete({
    timestamp: { $lt: sixMonthsAgo }
  });
}

// Schedule: Executar diariamente
setInterval(purgeOldLogs, 24 * 60 * 60 * 1000);
```

### 6. Backup Encriptado

**FAZER:**
- ✅ Backups automáticos diários
- ✅ Criptografia de backups
- ✅ Armazenamento geograficamente distribuído
- ✅ Teste de restauração regular
- ✅ Retenção conforme política (e.g., 30 dias)

**NÃO FAZER:**
- ❌ Backups sem criptografia
- ❌ Backups em único local
- ❌ Nunca testar restauração
- ❌ Backups indefinidamente

**Checklist de Backup:**

```
Backup Protocol:
├─ Tipo: Full daily + Incremental hourly
├─ Frequência: 04:00 UTC diariamente
├─ Criptografia: AES-256 (master key em HSM)
├─ Locais: 
│  ├─ Primary: AWS S3 (us-east-1)
│  ├─ Secondary: AWS S3 (eu-west-1)
│  └─ Tertiary: Azure Backup (disaster recovery)
├─ Retenção: 
│  ├─ Backups diários: 30 dias
│  ├─ Backups semanais: 3 meses
│  └─ Backups mensais: 1 ano
├─ Teste de Restauração: Semanalmente
├─ Auditoria: Logged e monitorado
└─ Responsável: DevOps Team
```

---

## 🎨 FRONTEND - COLETA CONSCIENTE

### 1. Consentimento - Implementação Correta

**FAZER:**
- ✅ Checkbox desmarcado por padrão (opt-in)
- ✅ Texto claro e específico
- ✅ Link para Política de Privacidade
- ✅ Armazenar timestamp + IP do consentimento
- ✅ Permitir revogação fácil

**NÃO FAZER:**
- ❌ Checkbox pré-marcado
- ❌ Consentimento vago ("concordo com termos")
- ❌ Ocultar link de política
- ❌ Tornar revogação difícil

**Código Padrão - React:**

```jsx
import React, { useState } from 'react';

function ConsentForm({ onConsent }) {
  const [consentData, setConsentData] = useState({
    newsletter: false,
    marketing: false,
    analytics: false
  });

  const [errors, setErrors] = useState({});

  // CRÍTICO: Validar que ao menos um foi marcado
  function validateConsent() {
    const newErrors = {};
    
    if (!consentData.analytics) {
      newErrors.analytics = 'Consentimento necessário para continuar';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateConsent()) return;

    // Capturar contexto de consentimento
    const consentContext = {
      timestamp: new Date().toISOString(),
      ip_address: await fetch('/api/my-ip').then(r => r.json()),
      user_agent: navigator.userAgent,
      consents: consentData,
      version: '1.0' // Versão da política
    };

    // Enviar ao backend para armazenamento
    const response = await fetch('/api/consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consentContext)
    });

    if (response.ok) {
      // Armazenar localmente (localStorage)
      localStorage.setItem(
        'user_consent',
        JSON.stringify(consentContext)
      );
      
      onConsent(consentData);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="consent-form">
      <h2>Política de Privacidade</h2>
      
      {/* Consentimento para Analytics */}
      <fieldset>
        <legend>Análise de Uso</legend>
        <label>
          <input
            type="checkbox"
            name="analytics"
            checked={consentData.analytics}
            onChange={(e) => setConsentData({
              ...consentData,
              analytics: e.target.checked
            })}
          />
          {/* CRÍTICO: Texto específico e claro */}
          Permitir coleta de dados sobre como você usa nossa plataforma
          para melhorar a experiência (Google Analytics com IP anonimizado)
        </label>
        {errors.analytics && (
          <span className="error">{errors.analytics}</span>
        )}
      </fieldset>

      {/* Consentimento para Marketing */}
      <fieldset>
        <legend>Comunicações de Marketing</legend>
        <label>
          <input
            type="checkbox"
            name="marketing"
            checked={consentData.marketing}
            onChange={(e) => setConsentData({
              ...consentData,
              marketing: e.target.checked
            })}
          />
          Enviar emails com ofertas, atualizações de produto e conteúdo
          relevante (pode ser revogado a qualquer momento)
        </label>
      </fieldset>

      {/* Newsletter */}
      <fieldset>
        <legend>Newsletter</legend>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={consentData.newsletter}
            onChange={(e) => setConsentData({
              ...consentData,
              newsletter: e.target.checked
            })}
          />
          Inscrever-se na newsletter mensal com insights sobre IA
        </label>
      </fieldset>

      {/* Link obrigatório para política */}
      <p className="fine-print">
        Ao enviar este formulário, você concorda com nossa{' '}
        <a href="/politica-privacidade" target="_blank">
          Política de Privacidade
        </a>
        {' '}e{' '}
        <a href="/termos-servico" target="_blank">
          Termos de Serviço
        </a>
      </p>

      <button type="submit">Confirmar Consentimento</button>
      
      {/* Opção de revogação */}
      <p className="revoke-option">
        Pode revogar este consentimento a qualquer momento em{' '}
        <a href="/minha-conta/privacidade">Configurações de Privacidade</a>
      </p>
    </form>
  );
}

export default ConsentForm;
```

### 2. Formulários - Transparência em Cada Campo

**FAZER:**
- ✅ Label para cada campo
- ✅ Indicar se é obrigatório
- ✅ Tooltip explicando finalidade
- ✅ Validação frontend (não confiar nisso!)
- ✅ Validação backend

**NÃO FAZER:**
- ❌ Campos ocultos
- ❌ Descrições vagas
- ❌ Confiar apenas em validação frontend
- ❌ Enviar dados não solicitados

**Código Padrão - Formulário com Transparência:**

```jsx
function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    cpf: '' // Campo sensível
  });

  // Descrição de cada campo
  const fieldDescriptions = {
    name: {
      required: true,
      purpose: 'Para identificação e comunicação',
      baseDataProtection: 'Art. 7º, II (Contrato)'
    },
    email: {
      required: true,
      purpose: 'Para recuperação de conta e comunicações',
      baseDataProtection: 'Art. 7º, II (Contrato)'
    },
    company: {
      required: false,
      purpose: 'Para personalização de conteúdo',
      baseDataProtection: 'Art. 7º, IX (Interesse Legítimo)'
    },
    cpf: {
      required: false,
      purpose: 'Para faturamento (apenas se B2B)',
      baseDataProtection: 'Art. 7º, II (Contrato)',
      sensitive: true
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(fieldDescriptions).map(([fieldName, desc]) => (
        <fieldset key={fieldName}>
          <label htmlFor={fieldName}>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            {desc.required && <span className="required">*</span>}
            
            {/* Tooltip com informação LGPD */}
            <Tooltip
              title="Informação LGPD"
              content={`
                Finalidade: ${desc.purpose}
                Base Legal: ${desc.baseDataProtection}
                Retenção: ${desc.retention || 'Conforme política'}
              `}
            >
              <InfoIcon />
            </Tooltip>
          </label>

          <input
            id={fieldName}
            name={fieldName}
            type={desc.sensitive ? 'password' : 'text'}
            value={formData[fieldName]}
            onChange={(e) => setFormData({
              ...formData,
              [fieldName]: e.target.value
            })}
            required={desc.required}
            placeholder={`Digite seu ${fieldName}`}
          />

          {/* Mensagem visual para dados sensíveis */}
          {desc.sensitive && (
            <small className="sensitive-warning">
              ⚠️ Dado sensível - será criptografado
            </small>
          )}
        </fieldset>
      ))}

      <p className="disclaimer">
        * Campos obrigatórios apenas para criar sua conta.
        Campos adicionais são opcionais.
      </p>

      <button type="submit">Criar Conta</button>
    </form>
  );
}
```

### 3. Banner de Cookies

**FAZER:**
- ✅ Banner claro e proeminente
- ✅ Botões "Aceitar" e "Rejeitar" equivalentes
- ✅ Link para Política de Cookies
- ✅ Não carregar scripts até consentimento
- ✅ Opção "Configurações" para consentimento granular

**NÃO FAZER:**
- ❌ Carregar Google Analytics antes de consentimento
- ❌ Botão "Rejeitar" oculto ou pequeno
- ❌ Assumir consentimento por inatividade
- ❌ Cookie de sessão sem consentimento

**Código Padrão - Banner de Cookies:**

```jsx
import React, { useState, useEffect } from 'react';

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [cookieConsent, setCookieConsent] = useState({
    essential: true, // Sempre true (não consentível)
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Verificar se já tem consentimento salvo
    const saved = localStorage.getItem('cookie_consent');
    
    if (!saved) {
      setShowBanner(true);
      // CRÍTICO: Bloquear scripts de tracking
      window['ga-disable-GA_MEASUREMENT_ID'] = true;
    } else {
      const consent = JSON.parse(saved);
      applyCookieConsent(consent);
    }
  }, []);

  function applyCookieConsent(consent) {
    // Analytics
    if (consent.analytics) {
      // Carregar Google Analytics APENAS se consentido
      loadGoogleAnalytics();
    } else {
      // Desabilitar Google Analytics
      window['ga-disable-GA_MEASUREMENT_ID'] = true;
    }

    // Marketing (Meta Pixel, etc)
    if (consent.marketing) {
      loadMarketingPixels();
    }

    // Salvar consentimento
    localStorage.setItem(
      'cookie_consent',
      JSON.stringify({
        ...consent,
        timestamp: new Date().toISOString(),
        version: '1.0'
      })
    );
  }

  function handleAcceptAll() {
    const fullConsent = {
      essential: true,
      analytics: true,
      marketing: true
    };
    applyCookieConsent(fullConsent);
    setShowBanner(false);
  }

  function handleRejectAll() {
    const minimalConsent = {
      essential: true,
      analytics: false,
      marketing: false
    };
    applyCookieConsent(minimalConsent);
    setShowBanner(false);
  }

  function handleSaveAdvanced() {
    applyCookieConsent(cookieConsent);
    setShowBanner(false);
  }

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <h3>🍪 Uso de Cookies e Dados</h3>
        
        {!showAdvanced ? (
          <>
            <p>
              Usamos cookies para analisar como você usa nossa plataforma
              e melhorar sua experiência. Alguns são essenciais,
              outros dependem de seu consentimento.
            </p>

            <p>
              <a href="/politica-cookies" target="_blank">
                Saiba mais sobre nossa Política de Cookies
              </a>
            </p>

            <div className="button-group">
              {/* Botões EQUIVALENTES em tamanho */}
              <button
                className="btn btn-primary"
                onClick={handleAcceptAll}
              >
                Aceitar Tudo
              </button>
              
              <button
                className="btn btn-secondary"
                onClick={handleRejectAll}
              >
                Rejeitar Não-Essenciais
              </button>

              <button
                className="btn btn-tertiary"
                onClick={() => setShowAdvanced(true)}
              >
                ⚙️ Configurações Avançadas
              </button>
            </div>
          </>
        ) : (
          <>
            <h4>Gerenciar Preferências de Cookies</h4>

            {/* Essenciais - sempre ativado */}
            <label className="cookie-option">
              <input
                type="checkbox"
                checked={true}
                disabled
              />
              <strong>Cookies Essenciais</strong>
              <span className="description">
                Necessários para funcionamento básico do site
                (autenticação, segurança)
              </span>
            </label>

            {/* Analytics */}
            <label className="cookie-option">
              <input
                type="checkbox"
                checked={cookieConsent.analytics}
                onChange={(e) => setCookieConsent({
                  ...cookieConsent,
                  analytics: e.target.checked
                })}
              />
              <strong>Análise (Google Analytics)</strong>
              <span className="description">
                Dados sobre como você usa o site.
                IP será anonimizado.
              </span>
            </label>

            {/* Marketing */}
            <label className="cookie-option">
              <input
                type="checkbox"
                checked={cookieConsent.marketing}
                onChange={(e) => setCookieConsent({
                  ...cookieConsent,
                  marketing: e.target.checked
                })}
              />
              <strong>Marketing</strong>
              <span className="description">
                Cookies de redes sociais e publicidade
                (Meta Pixel, LinkedIn, etc)
              </span>
            </label>

            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={handleSaveAdvanced}
              >
                Salvar Preferências
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowAdvanced(false)}
              >
                Voltar
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.95);
          color: white;
          padding: 20px;
          z-index: 9999;
          box-shadow: 0 -2px 10px rgba(0,0,0,0.3);
        }

        .cookie-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .button-group button {
          min-width: 150px;
          padding: 10px 20px;
          margin-right: 10px;
          cursor: pointer;
          border-radius: 4px;
          font-weight: 500;
          border: none;
        }

        .button-group .btn-primary {
          background: #3182ce;
          color: white;
        }

        .button-group .btn-secondary {
          background: transparent;
          border: 2px solid white;
          color: white;
        }

        .button-group .btn-tertiary {
          background: transparent;
          border: none;
          color: #3182ce;
          text-decoration: underline;
        }

        /* CRÍTICO: Botões devem ser visualmente equivalentes */
        .button-group .btn-primary,
        .button-group .btn-secondary {
          width: 45%;
        }

        .cookie-option {
          display: block;
          margin: 15px 0;
          padding: 10px;
          border: 1px solid #555;
          border-radius: 4px;
          cursor: pointer;
        }

        .cookie-option input {
          margin-right: 10px;
          cursor: pointer;
        }

        .cookie-option input:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .description {
          display: block;
          font-size: 12px;
          color: #aaa;
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
}

export default CookieBanner;
```

### 4. Google Analytics com Conformidade

**FAZER:**
- ✅ Anonimizar IP obrigatoriamente
- ✅ Carregar SOMENTE após consentimento
- ✅ Usar GA4 com modo de consentimento
- ✅ Desabilitar linker cross-domain

**NÃO FAZER:**
- ❌ Carregar GA sem consentimento
- ❌ Usar versão antiga de GA
- ❌ Rastrear dados sensíveis
- ❌ Compartilhar dados com Google sem transparência

**Código Padrão - GA4 Conforme:**

```html
<!-- ❌ NUNCA FAZER: Carregar direto -->
<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script> -->

<!-- ✅ CORRETO: Condicional ao consentimento -->
<script>
  // Desabilitar GA até consentimento
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // Configuração ANTES do consentimento
  gtag('config', 'GA_MEASUREMENT_ID', {
    'anonymize_ip': true, // CRÍTICO: Remover últimos 3 dígitos de IP
    'allow_ad_personalization': false, // Não rastrear para ads
    'cookie_expires': 26 * 7 * 24 * 60 * 60 // 26 semanas
  });

  // Desabilitar GA até consentimento do usuário
  window['ga-disable-GA_MEASUREMENT_ID'] = true;

  // Atualizar quando usuário consentir
  function enableGA(consentData) {
    if (consentData.analytics) {
      // Carregar script do GA
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      // Re-habilitar GA
      window['ga-disable-GA_MEASUREMENT_ID'] = false;
      
      gtag('config', 'GA_MEASUREMENT_ID', {
        'anonymize_ip': true,
        'allow_ad_personalization': false
      });
    }
  }

  // Listener para mudança de consentimento
  document.addEventListener('consentGranted', (e) => {
    enableGA(e.detail);
  });
</script>
```

---

## 🔄 GERENCIAMENTO DE CONSENTIMENTO

### 1. Sistema de Consentimento

**Deve armazenar:**

```sql
CREATE TABLE user_consents (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  consent_type VARCHAR(50), -- 'analytics', 'marketing', 'newsletter'
  consent_given BOOLEAN,
  consent_timestamp TIMESTAMP,
  consent_ip_address INET,
  consent_version VARCHAR(10),
  revoked_at TIMESTAMP NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Índices para performance
CREATE INDEX idx_user_consents ON user_consents(user_id, consent_type);
CREATE INDEX idx_active_consents ON user_consents(user_id, revoked_at);
```

### 2. Revogação de Consentimento

**FAZER:**
- ✅ Botão "Revogar" em configurações do usuário
- ✅ Exigir confirmação
- ✅ Efeito imediato
- ✅ Logs de revogação

**NÃO FAZER:**
- ❌ Tornar revogação difícil
- ❌ Exigir múltiplas confirmações
- ❌ Atraso na aplicação

**Código Padrão - Revogação:**

```javascript
async function revokeConsent(userId, consentType) {
  const result = await db.userConsents.update(
    {
      user_id: userId,
      consent_type: consentType
    },
    {
      revoked_at: new Date()
    }
  );

  // Auditar revogação
  await auditLog(
    'CONSENT_REVOKED',
    'consent',
    consentType,
    userId,
    { consentType },
    {}
  );

  // Se foi marketing, remover de listas
  if (consentType === 'marketing') {
    await removeFromMarketingList(userId);
  }

  // Se foi analytics, parar de rastrear
  if (consentType === 'analytics') {
    // Instruções ao frontend para desabilitar GA
  }

  return result;
}
```

---

## ⚙️ PROCESSAMENTO DE DIREITOS DO TITULAR

### 1. Subject Access Request (SAR) - Direito de Acesso

**Tempo de Resposta:** 15 dias (pode estender a 30)

**Backend Endpoint:**

```javascript
// POST /api/data-access-request
async function handleDataAccessRequest(req, res) {
  const userId = req.user_id;
  const requestId = generateUUID();
  
  try {
    // PASSO 1: Validar identidade (dupla verificação)
    const verification = await verifyIdentity(userId, req.body);
    if (!verification.success) {
      return res.status(403).json({ error: 'Identidade não verificada' });
    }

    // PASSO 2: Coletar TODOS os dados do usuário
    const userData = {
      // Dados de perfil
      profile: await db.users.findById(userId),
      
      // Dados de atividade
      activities: await db.activities.find({ user_id: userId }),
      
      // Dados de consentimento
      consents: await db.userConsents.find({ user_id: userId }),
      
      // Dados de documentos
      documents: await db.documents.find({ owner_id: userId }),
      
      // Dados de auditoria (acessos anteriores)
      auditLogs: await db.auditLogs.find({ user_id: userId })
    };

    // PASSO 3: Remover dados desnecessários
    // (não retornar hashes de senha, tokens, etc)
    delete userData.profile.password_hash;
    delete userData.profile.session_tokens;

    // PASSO 4: Descriptografar dados sensíveis
    if (userData.profile.cpf_encrypted) {
      userData.profile.cpf = decryptField(userData.profile.cpf_encrypted);
      delete userData.profile.cpf_encrypted;
    }

    // PASSO 5: Gerar arquivo (JSON ou CSV)
    const exportFile = JSON.stringify(userData, null, 2);
    const fileId = generateUUID();
    
    // Armazenar arquivo temporariamente (24 horas)
    await db.dataExports.insert({
      id: fileId,
      user_id: userId,
      data: exportFile,
      created_at: new Date(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: 'ready'
    });

    // PASSO 6: Auditar requisição
    await auditLog(
      'DATA_ACCESS_REQUEST',
      'user',
      userId,
      userId,
      { requestId, status: 'GRANTED' },
      req
    );

    // PASSO 7: Notificar usuário
    await sendEmail(userData.profile.email, {
      subject: 'Seus Dados Pessoais - Solicitação de Acesso',
      template: 'data_export_ready',
      variables: {
        downloadLink: `${process.env.APP_URL}/download-data/${fileId}`,
        expiresIn: '24 horas',
        downloadCount: 1 // Permitir apenas 1 download
      }
    });

    res.json({
      success: true,
      message: 'Link de download enviado por email',
      downloadLink: `${process.env.APP_URL}/download-data/${fileId}`
    });

  } catch (err) {
    // Auditar falha
    await auditLog(
      'DATA_ACCESS_REQUEST',
      'user',
      userId,
      userId,
      { requestId, status: 'FAILED', error: err.message },
      req
    );

    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}

// GET /api/download-data/:fileId
async function downloadDataExport(req, res) {
  const fileId = req.params.fileId;
  const userId = req.user_id;

  const exportRecord = await db.dataExports.findById(fileId);

  // Validações
  if (!exportRecord) {
    return res.status(404).json({ error: 'Arquivo não encontrado' });
  }

  if (exportRecord.user_id !== userId) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  if (new Date() > exportRecord.expires_at) {
    return res.status(410).json({ error: 'Link expirado' });
  }

  if (exportRecord.download_count >= 1) {
    return res.status(410).json({ error: 'Limite de downloads atingido' });
  }

  // Enviar arquivo
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="meus-dados.json"');
  res.send(exportRecord.data);

  // Marcar como baixado
  await db.dataExports.update(fileId, {
    download_count: exportRecord.download_count + 1,
    downloaded_at: new Date()
  });

  // Deletar arquivo após download
  setTimeout(() => {
    db.dataExports.delete(fileId);
  }, 1000);
}
```

### 2. Right to Deletion (Right to Be Forgotten)

**Quando pode ser exercido:**
- ❌ Não conforme com finalidade
- ❌ Retirada de consentimento
- ❌ Dados desnecessários
- ✅ Obrigação legal exige
- ✅ Interesse público

**Backend Endpoint:**

```javascript
// POST /api/delete-account
async function handleAccountDeletion(req, res) {
  const userId = req.user_id;
  const { reason, password } = req.body;

  try {
    // PASSO 1: Dupla verificação
    const user = await db.users.findById(userId);
    
    // Verificar senha
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );
    if (!isPasswordValid) {
      return res.status(403).json({ error: 'Senha incorreta' });
    }

    // PASSO 2: Período de reflexão (opcional, recomendado)
    // Você pode ofertar 30 dias para o usuário mudar de ideia
    await db.users.update(userId, {
      deletion_requested_at: new Date(),
      deletion_status: 'pending',
      deletion_reason: reason
    });

    // Enviar email confirmando
    await sendEmail(user.email, {
      subject: 'Solicitação de Exclusão de Conta Recebida',
      template: 'account_deletion_pending',
      variables: {
        reversibleUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        reverseLink: `${process.env.APP_URL}/undo-deletion?token=${generateToken(userId)}`
      }
    });

    // Auditar solicitação
    await auditLog(
      'DELETION_REQUESTED',
      'user',
      userId,
      userId,
      { reason },
      req
    );

    res.json({
      success: true,
      message: 'Conta marcada para exclusão. Você tem 30 dias para reverter.',
      reversibleUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}

// SCHEDULER: Executar diariamente para deletar contas expiradas
async function purgeDeletedAccounts() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const deletedUsers = await db.users.find({
    deletion_status: 'pending',
    deletion_requested_at: { $lt: thirtyDaysAgo }
  });

  for (const user of deletedUsers) {
    await permanentlyDeleteUser(user.id);
  }
}

async function permanentlyDeleteUser(userId) {
  try {
    // PASSO 1: Backup para conformidade (se necessário por lei)
    const backup = await backupUserData(userId);

    // PASSO 2: Cascade delete de relacionamentos
    await db.activities.delete({ user_id: userId });
    await db.documents.delete({ owner_id: userId });
    await db.comments.delete({ user_id: userId });
    await db.userConsents.delete({ user_id: userId });
    await db.sessions.delete({ user_id: userId });

    // PASSO 3: Deletar dados de pessoa
    await db.users.delete({ id: userId });

    // PASSO 4: Anonimizar logs (para manter auditoria)
    await db.auditLogs.update(
      { user_id: userId },
      { user_id: 'DELETED_USER_' + hashId(userId) }
    );

    // PASSO 5: Auditar exclusão permanente
    await auditLog(
      'DELETION_PERMANENT',
      'user',
      userId,
      'SYSTEM',
      { backup_id: backup.id },
      {}
    );

  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    // Alertar DPO
    await notifyDPO({
      severity: 'critical',
      message: `Erro ao deletar usuário ${userId}: ${err.message}`
    });
  }
}
```

### 3. Right to Portability

**Formato suportado:** JSON, CSV

**Backend Endpoint:**

```javascript
// GET /api/data-portability
async function getDataPortability(req, res) {
  const userId = req.user_id;

  const userData = await db.users.findById(userId);
  
  // Criar JSON estruturado e portável
  const portableData = {
    metadata: {
      exported_at: new Date().toISOString(),
      version: '1.0',
      format: 'application/json',
      schema_url: 'https://example.com/data-schema/v1'
    },
    data: {
      user: {
        id: userData.id,
        email: userData.email,
        name: decryptField(userData.name),
        created_at: userData.created_at
      },
      documents: await getPortableDocuments(userId),
      activity_history: await getPortableActivity(userId)
    }
  };

  res.json(portableData);

  // Auditar exportação
  await auditLog(
    'DATA_PORTABILITY_REQUEST',
    'user',
    userId,
    userId,
    {},
    req
  );
}
```

---

## 🤝 GESTÃO DE TERCEIROS/OPERADORES

### 1. Contrato de Operador (DPA)

**Obrigatório para:** AWS, Google Cloud, Stripe, SendGrid, qualquer serviço que acesse dados

**Checklist DPA:**

```
DPA CHECKLIST - [Operador: ___________]

Legal:
☐ Cópia assinada de DPA arquivada
☐ Cláusulas de conformidade LGPD inclusas
☐ Responsabilidades de operador claramente definidas

Escopo:
☐ Tipo de dados especificado
☐ Categorias de titulares definidas
☐ Duração do contrato clara
☐ Natureza do tratamento explicitado

Segurança:
☐ Medidas técnicas descritas
☐ Medidas organizacionais descritas
☐ Certificações de segurança listadas (ISO 27001, SOC 2, etc)
☐ Direitos de auditoria garantidos

Subcontratação:
☐ Proibida sem consentimento prévio
☐ Operador responsável por subcontratados
☐ Notificação obrigatória de mudanças

Exclusão de Dados:
☐ Modalidade: Deleção / Devolução
☐ Prazo: _____ dias após término
☐ Comprovante: Certificado de destruição

Transferências Internacionais:
☐ Países permitidos listados
☐ Mecanismos de proteção (se fora da UE/Brasil)
☐ Adequação conforme ANPD

Incidentes:
☐ Notificação obrigatória
☐ Prazo de resposta definido
☐ Obrigação de investigação

Status: [ ] Faltam assinatures [ ] Pendente review [ ] ✓ ATIVO
Data de Review: _________
Próxima Renovação: _________
```

### 2. Avaliação de Conformidade LGPD de Terceiros

**Questões a fazer antes de contratar:**

```javascript
const thirdPartyAssessment = {
  vendor: 'Google Analytics',
  category: 'Analytics',
  
  questions: [
    {
      id: 'q1',
      question: 'Fornece DPA em conformidade com LGPD?',
      required: true,
      answer: 'SIM',
      evidence: 'https://support.google.com/analytics/answer/3379636'
    },
    {
      id: 'q2',
      question: 'Oferece anonimização de IP como padrão?',
      required: true,
      answer: 'SIM',
      evidence: 'Google Analytics Privacy Settings'
    },
    {
      id: 'q3',
      question: 'Permite exclusão de dados de titulares?',
      required: true,
      answer: 'SIM',
      evidence: 'Google Analytics Deletion API'
    },
    {
      id: 'q4',
      question: 'Certeza ISO 27001?',
      required: false,
      answer: 'SIM',
      evidence: 'Google Trust Center'
    },
    {
      id: 'q5',
      question: 'Realiza transferências internacionais?',
      required: true,
      answer: 'SIM (para US)',
      mitigation: 'Usar Data Processing Addendum com cláusulas padrão'
    }
  ],

  riskLevel: 'LOW', // LOW, MEDIUM, HIGH, CRITICAL
  
  conditions: [
    'Deve-se incluir DPA no contrato',
    'Anonimizar IP é obrigatório',
    'Proibir compartilhamento com Google Ads',
    'Revisar anualmente'
  ],

  approvalDate: '2025-12-10',
  nextReview: '2026-12-10',
  approvedBy: 'DPO'
};
```

---

## 🚨 INCIDENTES E NOTIFICAÇÃO

### 1. Plano de Resposta a Incidentes

**Classificação de Risco:**

```
Incidente de Segurança
  ├─ Nível CRÍTICO (Notificar ANPD + Titulares em 48h)
  │  ├─ Vazamento de dados sensíveis (CPF, senha, saúde)
  │  ├─ Acesso não autorizado a > 1000 registros
  │  ├─ Falha de criptografia
  │  └─ Ataque ransomware bem-sucedido
  │
  ├─ Nível ALTO (Notificar ANPD em 15 dias)
  │  ├─ Acesso não autorizado a 100-1000 registros
  │  ├─ Falha de backup
  │  └─ Exposição temporária de dados (< 1h)
  │
  ├─ Nível MÉDIO (Registrar internamente)
  │  ├─ Tentativa de ataque bloqueada
  │  ├─ Acesso não autorizado a < 100 registros
  │  └─ Falha de auditoria
  │
  └─ Nível BAIXO (Log e monitoramento)
     ├─ Tentativas de força bruta bloqueadas
     └─ Atividades suspeitas
```

**Processo de Resposta:**

```javascript
async function reportSecurityIncident(incident) {
  const {
    type, // 'data_breach', 'unauthorized_access', 'ransomware', etc
    severity, // 'critical', 'high', 'medium', 'low'
    affectedUsers, // número de titulares afetados
    affectedData, // tipos de dados (e.g., ['email', 'cpf'])
    detectedAt,
    containedAt,
    rootCause,
    currentMeasures
  } = incident;

  // PASSO 1: Classificar risco
  const riskAssessment = classifyIncident({
    severity,
    affectedUsers,
    affectedData
  });

  // PASSO 2: Notificação à liderança
  await notifyExecutives({
    severity: riskAssessment.level,
    summary: incident.summary,
    actionRequired: riskAssessment.actionRequired
  });

  // PASSO 3: Se CRÍTICO ou ALTO, notificar ANPD
  if (['critical', 'high'].includes(riskAssessment.level)) {
    const anpdNotification = {
      controllerName: process.env.COMPANY_NAME,
      dpoEmail: process.env.DPO_EMAIL,
      incidentDescription: incident.description,
      affectedSubjects: affectedUsers.length,
      affectedDataTypes: affectedData,
      detectionDate: detectedAt,
      containmentDate: containedAt,
      currentMeasures: currentMeasures,
      riskAssessment: `
        Risco: ${riskAssessment.riskDescription}
        Consequências para titulares: ${riskAssessment.consequences}
      `,
      measures: currentMeasures
    };

    // Enviar para ANPD
    await sendToANPD(anpdNotification);
  }

  // PASSO 4: Se CRÍTICO, notificar titulares afetados
  if (riskAssessment.level === 'critical') {
    const affectedUserIds = await getAffectedUsers(incident);
    
    for (const userId of affectedUserIds) {
      const user = await db.users.findById(userId);
      
      await sendEmail(user.email, {
        subject: 'Notificação de Incidente de Segurança',
        template: 'security_incident_notification',
        variables: {
          description: riskAssessment.userFriendlyDescription,
          dataAffected: affectedData.join(', '),
          measures: currentMeasures,
          supportContact: process.env.SUPPORT_EMAIL
        }
      });
    }
  }

  // PASSO 5: Auditar incidente
  await db.securityIncidents.insert({
    id: generateUUID(),
    type: incident.type,
    severity: severity,
    affectedUsers: affectedUsers.length,
    affectedData: affectedData,
    detectedAt: detectedAt,
    containedAt: containedAt,
    rootCause: rootCause,
    anpdNotified: riskAssessment.level !== 'low',
    titularsNotified: riskAssessment.level === 'critical',
    resolutionDate: null,
    status: 'open',
    createdAt: new Date()
  });

  // PASSO 6: Iniciar investigação
  await startIncidentInvestigation(incident.id);
}
```

---

## ✅ CHECKLIST DE CERTIFICAÇÃO

### Antes de Deploy em Produção

```
🔐 BACKEND - SEGURANÇA
☐ Todas as senhas com bcrypt (custo 12+)
☐ Dados sensíveis criptografados em repouso (AES-256)
☐ Conexão com BD usa TLS
☐ Prepared statements em ALL queries
☐ Autorização verificada em CADA endpoint
☐ Logs de auditoria implementados
☐ Backup criptografado diário testado
☐ Sem credenciais no código

🎨 FRONTEND - COLETA
☐ Consentimento explícito implementado
☐ Checkbox de consentimento desmarcado por padrão
☐ Cada campo tem label e finalidade
☐ Link para Política de Privacidade visível
☐ Revogação de consentimento fácil
☐ Google Analytics SÓ após consentimento
☐ IP do Analytics anonimizado

📋 DOCUMENTAÇÃO
☐ ROPA preenchida para todos os dados
☐ RIPD para operações de risco alto
☐ DPAs assinados com operadores
☐ Política de Privacidade publicada
☐ Aviso de Cookies publicado
☐ Termos de Serviço atualizados

⚙️ OPERAÇÃO
☐ DPO nomeado (formalmente)
☐ Contato DPO publicado no site
☐ Plano de resposta a incidentes criado
☐ Equipe treinada em LGPD
☐ Calendário de revisão definido

🔄 DIREITOS DOS TITULARES
☐ Endpoint de Acesso de Dados (SAR) implementado
☐ Endpoint de Exclusão implementado
☐ Endpoint de Portabilidade implementado
☐ Endpoint de Revogação de Consentimento implementado
☐ Todos com resposta em 15 dias

🚨 INCIDENTES
☐ Sistema de detecção configurado
☐ Procedimento de notificação definido
☐ Contato da ANPD conhecido
☐ Plano de comunicação redatado

⚖️ COMPLIANCE
☐ Auditoria LGPD interna realizada
☐ Gaps identificados e mitigados
☐ Aprovação final de DPO/Compliance obtida
☐ Documentação assinada e arquivada
```

---

## 🎓 INSTRUÇÕES PARA O ANTIGRAVITY AGENT

### Antes de Implementar Qualquer Recurso:

1. **Pergunte:** "Este recurso coleta dados pessoais?"
   - SIM → Valide contra este manual
   - NÃO → Prossiga normalmente

2. **Se coleta dados:**
   - ✅ Qual é o dado? (Mapeie acima)
   - ✅ Qual é a base legal? (Consentimento, Contrato, etc)
   - ✅ É sensível? (Saúde, raça, religião, biométrica?)
   - ✅ Como protegemos? (Criptografia, acesso, auditoria?)
   - ✅ Como deletamos? (Cascade delete, período de retenção)

3. **Implemente:**
   - ✅ Código de Backend (seção acima)
   - ✅ Código de Frontend (seção acima)
   - ✅ Documentação (ROPA entry)
   - ✅ Teste de conformidade

4. **Valide:**
   - ✅ Contra Checklist de Certificação
   - ✅ Com Política de Privacidade (se nova base legal)
   - ✅ Com Operadores (se novo terceiro)

---

## 📞 CONTATOS E ESCALAÇÃO

**DPO:** [DPO_EMAIL]  
**ANPD Reclamações:** reclamacao@anpd.gov.br  
**ANPD Telefone:** +55 (61) 2030-3600  
**Responsável de Segurança:** [SECURITY_EMAIL]  
**Responsável de Compliance:** [COMPLIANCE_EMAIL]  

---

**Nota Final:** Este manual é executivo. Use como guardrails durante desenvolvimento. Para questões legais complexas, consulte DPO ou advogado especializado em LGPD.

**Objetivo:** Construir conformidade desde o código, não adicionar depois.

