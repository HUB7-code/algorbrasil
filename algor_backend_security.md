# Arquitetura de Backend Seguro - Plataforma ALGOR BRASIL
## Especificações para Construção de uma "Fortaleza Digital"

---

## 1. ANÁLISE DE REQUISITOS DE SEGURANÇA

### 1.1. Classificação de Dados Críticos
Com base no documento estratégico, a plataforma manipulará:

**DADOS ALTAMENTE SENSÍVEIS:**
- Informações corporativas de compliance (diagnósticos de risco)
- Dados de auditoria de algoritmos
- Credenciais de consultores/auditores certificados
- Informações geopolíticas de empresas
- Templates e metodologias proprietárias (IP da ALGOR)

**DADOS PESSOAIS (LGPD):**
- E-mails corporativos e LinkedIn
- Dados de perfil profissional
- Histórico de aplicações e certificações
- Respostas a formulários de aptidão

**DADOS TRANSACIONAIS:**
- Pagamentos de associações
- Compras de cursos
- Renovações de certificações

### 1.2. Superfície de Ataque Identificada
- Formulários interativos (XSS, injection)
- Sistema de autenticação duplo (corporativo + associados)
- APIs de ferramentas (calculadoras, geradores)
- Área de downloads (file inclusion)
- Portal de membros (privilege escalation)
- Integrações de pagamento
- Dashboard em tempo real

---

## 2. ARQUITETURA DE INFRAESTRUTURA

### 2.1. Topologia de Rede (Zero Trust Architecture)

```
┌─────────────────────────────────────────────────┐
│          CDN + WAF (CloudFlare/AWS)             │
│  • Rate Limiting                                │
│  • DDoS Protection                              │
│  • Bot Detection                                │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│         API Gateway (Kong/AWS Gateway)          │
│  • JWT Validation                               │
│  • Request Signature Verification              │
│  • IP Whitelisting (Admin Endpoints)           │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
┌───────▼──────┐   ┌────────▼────────┐
│  Backend API │   │  Microserviços  │
│  (Node.js/   │   │  Isolados       │
│   Python)    │   │  (Docker)       │
└───────┬──────┘   └────────┬────────┘
        │                   │
┌───────▼───────────────────▼─────────┐
│     Database Cluster (Encrypted)     │
│  • PostgreSQL (dados relacionais)   │
│  • Redis (cache/sessions)           │
│  • S3 Encrypted (arquivos)          │
└──────────────────────────────────────┘
```

### 2.2. Tecnologias Recomendadas

**Backend Framework:**
- **Node.js + Express** (com TypeScript) OU
- **Python + FastAPI** (com Pydantic para validação)
- **NestJS** (arquitetura empresarial com DI nativo)

**Banco de Dados:**
- **PostgreSQL 15+** com Row-Level Security (RLS)
- **Redis 7+** para sessions/cache com ACLs
- **MongoDB** (opcional, apenas para logs não-críticos)

**Autenticação:**
- **OAuth 2.0 + OpenID Connect** (Keycloak/Auth0)
- **JWT** com rotação de tokens
- **MFA obrigatório** para administradores e auditores sênior

**Criptografia:**
- **TLS 1.3** obrigatório (sem fallback)
- **AES-256-GCM** para dados em repouso
- **Argon2id** para hashing de senhas
- **AWS KMS / HashiCorp Vault** para gestão de chaves

---

## 3. CAMADAS DE SEGURANÇA DEFENSIVA

### 3.1. Camada 1: Perímetro (WAF)

**Regras OWASP ModSecurity:**
```nginx
# Bloqueios essenciais
SecRule REQUEST_URI "@rx (\.\./|\.\.\\)" "id:1001,deny,status:403"
SecRule ARGS "@rx (<script|javascript:|onerror=)" "id:1002,deny,status:403"
SecRule REQUEST_HEADERS:User-Agent "@rx (nikto|sqlmap|havij)" "id:1003,deny,status:403"

# Rate Limiting específico
SecRule IP:suspicious_counter "@gt 100" "id:1004,deny,status:429,expirevar:IP:suspicious_counter=60"
```

**Proteções CloudFlare/AWS:**
- Challenge para países de alto risco (exceto Brasil)
- Bloqueio de TOR exit nodes em endpoints sensíveis
- Geolocation blocking para painel admin (somente Brasil)

### 3.2. Camada 2: API Gateway (Validação de Requisições)

**Middleware de Segurança (Node.js exemplo):**
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('express-validator');

// Headers de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdn.algor.com.br"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "api.algor.com.br"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting por tipo de endpoint
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas
  message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, // 100 requisições/minuto
  standardHeaders: true,
  legacyHeaders: false
});

app.use('/api/auth/', authLimiter);
app.use('/api/', apiLimiter);

// Validação de entrada (exemplo para captura de lead)
app.post('/api/leads', [
  validator.body('email').isEmail().normalizeEmail(),
  validator.body('nome').trim().escape().isLength({min: 2, max: 100}),
  validator.body('empresa').optional().trim().escape(),
  validator.sanitize('*').trim()
], asyncHandler(leadController.create));
```

### 3.3. Camada 3: Autenticação e Autorização (RBAC Granular)

**Modelo de Perfis:**
```typescript
enum UserRole {
  VISITANTE_CADASTRADO = 'visitante',
  MEMBRO_ASSOCIADO = 'associado',
  AUDITOR_JUNIOR = 'auditor_jr',
  AUDITOR_SENIOR = 'auditor_sr',
  GESTOR_REGIONAL = 'gestor_regional',
  ADMIN_ALGOR = 'admin',
  SUPER_ADMIN = 'super_admin'
}

enum Permission {
  // Recursos
  READ_WEBINARS_FREE = 'read:webinars:free',
  READ_MANUAL_LITE = 'read:manual:lite',
  READ_MANUAL_FULL = 'read:manual:full',
  DOWNLOAD_TEMPLATES = 'download:templates',
  USE_TOOLS_BASIC = 'use:tools:basic',
  USE_TOOLS_ADVANCED = 'use:tools:advanced',
  
  // Certificações
  APPLY_CERTIFICATION = 'apply:certification',
  ISSUE_CERTIFICATION = 'issue:certification',
  
  // Administrativo
  MANAGE_USERS = 'manage:users',
  VIEW_ANALYTICS = 'view:analytics',
  MANAGE_CONTENT = 'manage:content'
}

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.VISITANTE_CADASTRADO]: [
    Permission.READ_WEBINARS_FREE,
    Permission.READ_MANUAL_LITE,
    Permission.USE_TOOLS_BASIC
  ],
  [UserRole.MEMBRO_ASSOCIADO]: [
    Permission.READ_MANUAL_FULL,
    Permission.DOWNLOAD_TEMPLATES,
    Permission.USE_TOOLS_ADVANCED,
    Permission.APPLY_CERTIFICATION
  ],
  // ... outros roles
};
```

**Implementação JWT Segura:**
```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Geração de token com claims mínimos
function generateTokenPair(userId, role) {
  const accessTokenPayload = {
    sub: userId,
    role: role,
    type: 'access',
    jti: crypto.randomUUID() // Token ID único
  };
  
  const refreshTokenPayload = {
    sub: userId,
    type: 'refresh',
    jti: crypto.randomUUID()
  };
  
  const accessToken = jwt.sign(
    accessTokenPayload,
    process.env.JWT_ACCESS_SECRET,
    { 
      expiresIn: '15m',
      algorithm: 'RS256', // Assimétrico
      issuer: 'algor.com.br',
      audience: 'algor-api'
    }
  );
  
  const refreshToken = jwt.sign(
    refreshTokenPayload,
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d', algorithm: 'RS256' }
  );
  
  // Armazenar JTI em blacklist Redis para revogação
  return { accessToken, refreshToken };
}

// Middleware de autorização
function authorize(requiredPermissions) {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    try {
      // Verificar se token está na blacklist
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        return res.status(401).json({ error: 'Token revogado' });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
        algorithms: ['RS256'],
        issuer: 'algor.com.br',
        audience: 'algor-api'
      });
      
      // Verificar permissões
      const userPermissions = ROLE_PERMISSIONS[decoded.role] || [];
      const hasPermission = requiredPermissions.every(p => 
        userPermissions.includes(p)
      );
      
      if (!hasPermission) {
        return res.status(403).json({ error: 'Permissão insuficiente' });
      }
      
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
  };
}
```

### 3.4. Camada 4: Banco de Dados (Defense in Depth)

**PostgreSQL com Row-Level Security:**
```sql
-- Habilitar RLS na tabela de diagnósticos corporativos
ALTER TABLE diagnosticos_corporativos ENABLE ROW LEVEL SECURITY;

-- Política: usuários só veem dados de sua própria empresa
CREATE POLICY diagnosticos_empresa_policy ON diagnosticos_corporativos
  FOR ALL
  USING (empresa_id = current_setting('app.current_empresa_id')::uuid);

-- Política: admins veem tudo
CREATE POLICY diagnosticos_admin_policy ON diagnosticos_corporativos
  FOR ALL
  TO admin_role
  USING (true);

-- Função para setar contexto por requisição
CREATE OR REPLACE FUNCTION set_current_empresa(empresa_uuid uuid)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_empresa_id', empresa_uuid::text, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

**Criptografia de Colunas Sensíveis:**
```sql
-- Usar pgcrypto para dados ultrassenssíveis
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Tabela de diagnósticos com campos encriptados
CREATE TABLE diagnosticos_corporativos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID NOT NULL REFERENCES empresas(id),
  score_maturidade INTEGER,
  relatorio_pdf_encriptado BYTEA, -- Armazenado com pgp_sym_encrypt
  dados_geopoliticos_encriptado BYTEA,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Inserção com encriptação
INSERT INTO diagnosticos_corporativos (empresa_id, relatorio_pdf_encriptado)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  pgp_sym_encrypt('conteúdo sensível', current_setting('app.encryption_key'))
);

-- Leitura com decriptação (apenas para roles autorizados)
SELECT 
  id,
  empresa_id,
  pgp_sym_decrypt(relatorio_pdf_encriptado::bytea, current_setting('app.encryption_key')) AS relatorio
FROM diagnosticos_corporativos;
```

**Prepared Statements Obrigatórios:**
```javascript
// NUNCA fazer concatenação de strings em queries
// ❌ ERRADO:
const query = `SELECT * FROM users WHERE email = '${userInput}'`;

// ✅ CORRETO (Node.js com pg):
const query = 'SELECT * FROM users WHERE email = $1';
const result = await pool.query(query, [userInput]);

// ✅ CORRETO (Python com psycopg2):
cursor.execute("SELECT * FROM users WHERE email = %s", (user_input,))
```

---

## 4. SEGURANÇA DE FERRAMENTAS INTERATIVAS

### 4.1. Gerador de Política de IA (Proteção contra Template Injection)

**Backend de Renderização Segura:**
```javascript
const Handlebars = require('handlebars');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

// Configurar DOMPurify
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Registrar helpers Handlebars seguros
Handlebars.registerHelper('safe', function(text) {
  return new Handlebars.SafeString(DOMPurify.sanitize(text));
});

// Template de política (sem execução de código)
const policyTemplate = Handlebars.compile(`
<h1>Política de IA - {{safe nomeEmpresa}}</h1>
<p>Escopo: {{safe escopo}}</p>
<p>Responsável: {{safe responsavel}}</p>
{{!-- Sem acesso a funções JavaScript --}}
`, { noEscape: false });

// Endpoint de geração
app.post('/api/tools/generate-policy', 
  authorize([Permission.USE_TOOLS_BASIC]),
  [
    validator.body('nomeEmpresa').trim().escape().isLength({max: 100}),
    validator.body('escopo').trim().escape().isLength({max: 500}),
    validator.body('responsavel').trim().escape().isLength({max: 100})
  ],
  async (req, res) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Sanitizar novamente antes de renderizar
    const sanitizedData = {
      nomeEmpresa: DOMPurify.sanitize(req.body.nomeEmpresa),
      escopo: DOMPurify.sanitize(req.body.escopo),
      responsavel: DOMPurify.sanitize(req.body.responsavel)
    };
    
    const html = policyTemplate(sanitizedData);
    
    // Gerar PDF com biblioteca segura (Puppeteer em sandbox)
    const pdf = await generatePDFSecure(html);
    
    // Audit log
    await logAction({
      userId: req.user.sub,
      action: 'GENERATE_POLICY',
      ip: req.ip,
      userAgent: req.headers['user-agent']
    });
    
    res.contentType('application/pdf');
    res.send(pdf);
  }
);
```

### 4.2. Calculadora de Risco Geopolítico (Proteção contra Data Poisoning)

```javascript
// Validação estrita de entradas numéricas
app.post('/api/tools/geopolitical-risk',
  authorize([Permission.USE_TOOLS_BASIC]),
  [
    validator.body('exposicaoChina').isFloat({min: 0, max: 100}),
    validator.body('exposicaoEUA').isFloat({min: 0, max: 100}),
    validator.body('dependenciaSemicondutores').isBoolean(),
    validator.body('setorAtuacao').isIn(['tech', 'finance', 'health', 'manufacturing'])
  ],
  async (req, res) => {
    // Modelo de cálculo isolado (sem eval() ou Function())
    const riskScore = calculateGeopoliticalRisk(req.body);
    
    // Nunca retornar detalhes internos do algoritmo
    res.json({
      riskLevel: riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low',
      recommendation: getRecommendation(riskScore)
      // NÃO retornar: weights, formulas, raw scores
    });
  }
);
```

---

## 5. SISTEMA DE UPLOADS E DOWNLOADS

### 5.1. Upload Seguro de Documentos

```javascript
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const fileType = require('file-type');

// Configuração de storage seguro
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Diretório isolado, fora do webroot
    cb(null, '/var/algor/uploads/temp/');
  },
  filename: (req, file, cb) => {
    // Nome aleatório para evitar path traversal
    const randomName = crypto.randomBytes(16).toString('hex');
    cb(null, randomName);
  }
});

// Filtro de arquivos
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 1
  }
});

app.post('/api/applications/upload-cv',
  authorize([Permission.APPLY_CERTIFICATION]),
  upload.single('curriculum'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo não enviado' });
    }
    
    // Validação de magic bytes (não confiar no mimetype do cliente)
    const buffer = await fs.readFile(req.file.path);
    const detectedType = await fileType.fromBuffer(buffer);
    
    if (!detectedType || detectedType.mime !== 'application/pdf') {
      await fs.unlink(req.file.path); // Deletar arquivo inválido
      return res.status(400).json({ error: 'Arquivo não é um PDF válido' });
    }
    
    // Scan antivírus (ClamAV via biblioteca node-clamav)
    const isClean = await scanFile(req.file.path);
    if (!isClean) {
      await fs.unlink(req.file.path);
      await logSecurityEvent('MALWARE_DETECTED', req.user.sub, req.ip);
      return res.status(400).json({ error: 'Arquivo contém malware' });
    }
    
    // Mover para S3 com encriptação
    const s3Key = `cvs/${req.user.sub}/${crypto.randomUUID()}.pdf`;
    await uploadToS3Encrypted(req.file.path, s3Key);
    
    // Deletar arquivo temporário
    await fs.unlink(req.file.path);
    
    res.json({ fileId: s3Key });
  }
);
```

### 5.2. Download Seguro de Materiais

```javascript
app.get('/api/resources/download/:fileId',
  authorize([Permission.DOWNLOAD_TEMPLATES]),
  async (req, res) => {
    const { fileId } = req.params;
    
    // Validar que fileId é UUID (evita path traversal)
    if (!validator.isUUID(fileId)) {
      return res.status(400).json({ error: 'ID inválido' });
    }
    
    // Verificar se usuário tem acesso ao arquivo
    const file = await db.query(
      'SELECT * FROM recursos WHERE id = $1 AND (publico = true OR $2 = ANY(roles_permitidos))',
      [fileId, req.user.role]
    );
    
    if (file.rows.length === 0) {
      return res.status(404).json({ error: 'Arquivo não encontrado' });
    }
    
    // Gerar URL pré-assinada do S3 (expira em 5 minutos)
    const signedUrl = await s3.getSignedUrlPromise('getObject', {
      Bucket: 'algor-resources',
      Key: file.rows[0].s3_key,
      Expires: 300,
      ResponseContentDisposition: `attachment; filename="${file.rows[0].nome_seguro}"`
    });
    
    // Audit log
    await logDownload(req.user.sub, fileId);
    
    res.json({ downloadUrl: signedUrl });
  }
);
```

---

## 6. LOGGING E MONITORAMENTO

### 6.1. Sistema de Audit Logs

```javascript
const winston = require('winston');

// Logger estruturado
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'algor-api' },
  transports: [
    new winston.transports.File({ 
      filename: '/var/log/algor/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: '/var/log/algor/audit.log',
      level: 'info'
    })
  ]
});

// Função de auditoria
async function logAction(action) {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    userId: action.userId,
    action: action.action,
    resource: action.resource || null,
    ip: action.ip,
    userAgent: action.userAgent,
    status: action.status || 'success',
    metadata: action.metadata || {}
  };
  
  // Log local
  logger.info('AUDIT', auditEntry);
  
  // Enviar para SIEM (Splunk/ELK)
  await sendToSIEM(auditEntry);
  
  // Armazenar em banco (tabela append-only)
  await db.query(`
    INSERT INTO audit_logs (user_id, action, resource, ip, user_agent, metadata)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [
    auditEntry.userId,
    auditEntry.action,
    auditEntry.resource,
    auditEntry.ip,
    auditEntry.userAgent,
    JSON.stringify(auditEntry.metadata)
  ]);
}

// Eventos críticos que devem gerar alertas
const CRITICAL_EVENTS = [
  'FAILED_LOGIN_ATTEMPT',
  'PRIVILEGE_ESCALATION_ATTEMPT',
  'MALWARE_DETECTED',
  'SQL_INJECTION_ATTEMPT',
  'XSS_ATTEMPT',
  'MASS_DATA_EXPORT',
  'ADMIN_ACTION'
];

async function logSecurityEvent(eventType, userId, ip, details = {}) {
  await logAction({
    userId,
    action: eventType,
    ip,
    metadata: details
  });
  
  if (CRITICAL_EVENTS.includes(eventType)) {
    // Alertar equipe de segurança (PagerDuty/Slack)
    await sendSecurityAlert(eventType, { userId, ip, details });
  }
}
```

### 6.2. Métricas de Segurança (Prometheus)

```javascript
const promClient = require('prom-client');

// Métricas customizadas
const failedLogins = new promClient.Counter({
  name: 'algor_failed_logins_total',
  help: 'Total de tentativas de login falhadas',
  labelNames: ['user_id', 'ip']
});

const apiRequestDuration = new promClient.Histogram({
  name: 'algor_api_request_duration_seconds',
  help: 'Duração das requisições API',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

const suspiciousActivities = new promClient.Gauge({
  name: 'algor_suspicious_activities',
  help: 'Atividades suspeitas nas últimas 24h'
});

// Middleware de métricas
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    apiRequestDuration.labels(req.method, req.route?.path || 'unknown', res.statusCode).observe(duration);
  });
  
  next();
});

// Endpoint de métricas (protegido)
app.get('/metrics', 
  authorize([Permission.VIEW_ANALYTICS]),
  async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  }
);
```

---

## 7. PROTEÇÃO DE APIS CRÍTICAS

### 7.1. Endpoint de Aplicação para Certificação (Anti-Spam)

```javascript
const { body } = require('express-validator');

app.post('/api/applications/certification',
  // CAPTCHA obrigatório
  verifyCaptcha,
  // Rate limit severo
  rateLimit({ windowMs: 60 * 60 * 1000, max: 3 }), // 3 aplicações/hora
  authorize([Permission.APPLY_CERTIFICATION]),
  [
    body('nome').trim().isLength({min: 3, max: 100}).escape(),
    body('email').isEmail().normalizeEmail(),
    body('linkedinUrl').isURL().matches(/linkedin\.com\/in\//),
    body('experienciaISO').isIn(['none', 'basic', 'intermediate', 'advanced']),
    body('motivacao').trim().isLength({min: 50, max: 1000}).escape()
  ],
  async (req, res) => {
    // Verificar se usuário já tem aplicação pendente
    const existingApp = await db.query(
      'SELECT id FROM applications WHERE user_id = $1 AND status = $2',
      [req.user.sub, 'pending']
    );
    
    if (existingApp.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Você já possui uma aplicação pendente' 
      });
    }
    
    // Mini-exame de aptidão (respostas pre-definidas)
    const examScore = calculateExamScore(req.body.examAnswers);
    
    // Criar aplicação
    const application = await db.query(`
      INSERT INTO applications (
        user_id, nome, email, linkedin_url, experiencia_iso, 
        motivacao, exam_score, status, ip_origin
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `, [
      req.user.sub,
      req.body.nome,
      req.body.email,
      req.body.linkedinUrl,
      req.body.experienciaISO,
      req.body.motivacao,
      examScore,
      'pending',
      req.ip
    ]);
    
    // Notificar admins (fila assíncrona)
    await queueNotification('NEW_APPLICATION', application.rows[0].id);
    
    res.status(201).json({
      message: 'Aplicação enviada com sucesso',
      applicationId: application.rows[0].id,
      estimatedReviewTime: '5-7 dias úteis'
    });
  }
);
```

### 7.2. Dashboard em Tempo Real (WebSockets Seguro)

```javascript
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const io = socketio(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  transports: ['websocket'] // Apenas WebSocket, sem polling
});

// Autenticação de socket
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    
    // Verificar permissão para dashboard
    if (!ROLE_PERMISSIONS[decoded.role].includes(Permission.VIEW_ANALYTICS)) {
      return next(new Error('Sem permissão para dashboard'));
    }
    
    socket.userId = decoded.sub;
    socket.role = decoded.role;
    next();
  } catch (err) {
    next(new Error('Token inválido'));
  }
});

// Rooms segregadas por role
io.on('connection', (socket) => {
  // Audit log de conexão
  logAction({
    userId: socket.userId,
    action: 'WEBSOCKET_CONNECT',
    ip: socket.handshake.address
  });
  
  // Juntar sala baseada em role
  socket.join(`dashboard:${socket.role}`);
  
  // Enviar apenas dados permitidos para o role
  socket.on('request:metrics', async () => {
    const metrics = await getFilteredMetrics(socket.role);
    socket.emit('metrics:update', metrics);
  });
  
  socket.on('disconnect', () => {
    logAction({
      userId: socket.userId,
      action: 'WEBSOCKET_DISCONNECT',
      ip: socket.handshake.address
    });
  });
});

// Broadcast de métricas (a cada 5 segundos)
setInterval(async () => {
  const publicMetrics = await getPublicDashboardMetrics();
  io.to('dashboard:admin').emit('metrics:update', publicMetrics);
}, 5000);
```

---

## 8. INTEGRAÇÃO COM PAGAMENTOS

### 8.1. Stripe Integration Segura

```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payments/create-subscription',
  authorize([Permission.APPLY_CERTIFICATION]),
  [
    body('planId').isIn(['associado_mensal', 'associado_anual']),
    body('paymentMethodId').isString()
  ],
  async (req, res) => {
    try {
      // Verificar se usuário já não tem subscription ativa
      const existingSub = await db.query(
        'SELECT id FROM subscriptions WHERE user_id = $1 AND status = $2',
        [req.user.sub, 'active']
      );
      
      if (existingSub.rows.length > 0) {
        return res.status(409).json({ 
          error: 'Você já possui uma assinatura ativa' 
        });
      }
      
      // Criar customer no Stripe
      const customer = await stripe.customers.create({
        email: req.user.email,
        metadata: {
          userId: req.user.sub,
          origin: 'algor-platform'
        }
      });
      
      // Criar subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: getPriceId(req.body.planId) }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent']
      });
      
      // Armazenar no banco
      await db.query(`
        INSERT INTO subscriptions (
          user_id, stripe_customer_id, stripe_subscription_id, 
          plan_id, status
        )
        VALUES ($1, $2, $3, $4, $5)
      `, [
        req.user.sub,
        customer.id,
        subscription.id,
        req.body.planId,
        'pending'
      ]);
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret
      });
    } catch (err) {
      logger.error('Payment error', { error: err.message, userId: req.user.sub });
      res.status(500).json({ error: 'Erro ao processar pagamento' });
    }
  }
);

// Webhook do Stripe (verificação de assinatura)
app.post('/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      
      // Processar eventos
      switch (event.type) {
        case 'invoice.payment_succeeded':
          await handlePaymentSuccess(event.data.object);
          break;
        case 'customer.subscription.deleted':
          await handleSubscriptionCancellation(event.data.object);
          break;
        // ... outros eventos
      }
      
      res.json({ received: true });
    } catch (err) {
      logger.error('Webhook error', { error: err.message });
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }
);
```

---

## 9. DISASTER RECOVERY E BACKUP

### 9.1. Estratégia de Backup

```bash
#!/bin/bash
# Script de backup automatizado (cron diário)

# Variáveis
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/algor"
S3_BUCKET="s3://algor-backups-encrypted"
RETENTION_DAYS=90

# Backup PostgreSQL
pg_dump -U algor_user -d algor_production | \
  gzip | \
  gpg --encrypt --recipient backup@algor.com.br \
  > "${BACKUP_DIR}/db_${TIMESTAMP}.sql.gz.gpg"

# Backup Redis (RDB snapshot)
redis-cli --rdb "${BACKUP_DIR}/redis_${TIMESTAMP}.rdb"

# Upload para S3 com encriptação server-side
aws s3 cp "${BACKUP_DIR}/" "${S3_BUCKET}/" \
  --recursive \
  --storage-class GLACIER \
  --server-side-encryption AES256

# Limpar backups locais antigos
find "${BACKUP_DIR}" -type f -mtime +7 -delete

# Verificar integridade do backup
LATEST_BACKUP=$(ls -t "${BACKUP_DIR}"/db_*.gpg | head -1)
gpg --decrypt "${LATEST_BACKUP}" | gunzip | psql -U algor_user -d algor_test_restore

if [ $? -eq 0 ]; then
  echo "Backup verificado com sucesso: ${TIMESTAMP}"
else
  # Alertar equipe
  curl -X POST "${SLACK_WEBHOOK}" \
    -d '{"text":"⚠️ FALHA na verificação do backup de '${TIMESTAMP}'"}'
fi
```

### 9.2. Plano de Recuperação

```yaml
# disaster-recovery-plan.yml
recovery_time_objective: 4 hours
recovery_point_objective: 1 hour

procedures:
  database_corruption:
    - Stop application servers
    - Restore from last verified backup
    - Replay WAL logs from archive
    - Verify data integrity
    - Restart application in read-only mode
    - Full smoke test
    - Switch to read-write
    
  infrastructure_failure:
    - Failover to secondary region (AWS us-east-1 -> eu-west-1)
    - Update DNS records (Route53)
    - Restore from cross-region replicas
    - Verify encryption keys availability (KMS)
    
  security_breach:
    - Isolate affected systems
    - Revoke all JWT tokens (blacklist all JTI)
    - Force password reset for all users
    - Rotate all secrets and API keys
    - Audit logs forensics
    - Incident report to ANPD (LGPD)
```

---

## 10. COMPLIANCE E LGPD

### 10.1. Implementação de Direitos do Titular

```javascript
// Endpoint de solicitação de dados pessoais (Art. 18 LGPD)
app.post('/api/gdpr/data-request',
  authorize([Permission.READ_OWN_DATA]),
  async (req, res) => {
    // Criar ticket de solicitação
    const ticket = await db.query(`
      INSERT INTO data_requests (user_id, type, status, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING id
    `, [req.user.sub, 'export', 'pending']);
    
    // Processar de forma assíncrona (prazo de 15 dias LGPD)
    queueDataExport(req.user.sub, ticket.rows[0].id);
    
    res.json({
      message: 'Solicitação registrada',
      ticketId: ticket.rows[0].id,
      estimatedDelivery: '15 dias úteis'
    });
  }
);

// Endpoint de exclusão de dados (direito ao esquecimento)
app.delete('/api/gdpr/delete-account',
  authorize([Permission.DELETE_OWN_DATA]),
  [body('confirmacao').equals('EXCLUIR MEUS DADOS')],
  async (req, res) => {
    // Anonimizar dados críticos em vez de deletar (para audit logs)
    await db.query(`
      UPDATE users 
      SET 
        email = 'deleted_' || id || '@anonymized.local',
        nome = 'Usuário Excluído',
        linkedin_url = NULL,
        deleted_at = NOW(),
        deletion_reason = $2
      WHERE id = $1
    `, [req.user.sub, req.body.motivo]);
    
    // Deletar dados não-auditados
    await db.query('DELETE FROM sessions WHERE user_id = $1', [req.user.sub]);
    await db.query('DELETE FROM notifications WHERE user_id = $1', [req.user.sub]);
    
    // Cancelar assinaturas
    await stripe.subscriptions.cancel(user.stripeSubscriptionId);
    
    // Audit log
    await logAction({
      userId: req.user.sub,
      action: 'ACCOUNT_DELETED',
      metadata: { reason: req.body.motivo }
    });
    
    // Revogar token
    await redis.setex(`blacklist:${req.token}`, 86400, '1');
    
    res.json({ message: 'Conta excluída com sucesso' });
  }
);
```

---

## 11. CHECKLIST DE DEPLOY EM PRODUÇÃO

### 11.1. Pré-Deploy

- [ ] Todas as dependências atualizadas (npm audit fix)
- [ ] Secrets rotacionados e armazenados em Vault/Secrets Manager
- [ ] Certificados SSL/TLS válidos (Let's Encrypt auto-renewal)
- [ ] WAF rules ativadas e testadas
- [ ] Rate limits configurados por endpoint
- [ ] Backups automáticos configurados e testados
- [ ] Disaster recovery testado em ambiente de staging
- [ ] Logs centralizados (ELK/Splunk)
- [ ] Alertas configurados (PagerDuty/OpsGenie)
- [ ] LGPD compliance checklist completo
- [ ] Penetration testing executado por terceiros

### 11.2. Pós-Deploy

- [ ] Smoke tests em produção
- [ ] Verificar métricas de latência (p95 < 500ms)
- [ ] Verificar taxa de erro (< 0.1%)
- [ ] Testar fluxo de autenticação end-to-end
- [ ] Verificar integridade de backups
- [ ] Testar failover de banco de dados
- [ ] Verificar logs de segurança (primeiras 24h)
- [ ] Executar scan de vulnerabilidades (OWASP ZAP)

---

## 12. CÓDIGO DE EXEMPLO: ENDPOINT COMPLETO SEGURO

```javascript
/**
 * Endpoint completo demonstrando todas as camadas de segurança
 * Use case: Download do Manual do Auditor (Capítulo Free)
 */

const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Rate limiter específico para downloads
const downloadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // 10 downloads por hora por usuário
  keyGenerator: (req) => req.user?.sub || req.ip,
  handler: (req, res) => {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', req.user?.sub, req.ip);
    res.status(429).json({ 
      error: 'Muitos downloads. Tente novamente em 1 hora.' 
    });
  }
});

router.get(
  '/api/resources/manual-chapter-1',
  
  // 1. Rate Limiting
  downloadLimiter,
  
  // 2. Autenticação (JWT)
  async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticação necessária' });
    }
    
    try {
      // Verificar blacklist
      const isBlacklisted = await redis.get(`blacklist:${token}`);
      if (isBlacklisted) {
        throw new Error('Token revogado');
      }
      
      // Validar JWT
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
        algorithms: ['RS256'],
        issuer: 'algor.com.br'
      });
      
      req.user = decoded;
      req.token = token;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }
  },
  
  // 3. Autorização (RBAC)
  (req, res, next) => {
    const allowedRoles = [
      UserRole.VISITANTE_CADASTRADO,
      UserRole.MEMBRO_ASSOCIADO,
      UserRole.AUDITOR_JUNIOR,
      UserRole.AUDITOR_SENIOR
    ];
    
    if (!allowedRoles.includes(req.user.role)) {
      logSecurityEvent('UNAUTHORIZED_ACCESS', req.user.sub, req.ip, {
        resource: 'manual-chapter-1',
        role: req.user.role
      });
      return res.status(403).json({ error: 'Permissão insuficiente' });
    }
    
    next();
  },
  
  // 4. Lógica de negócio
  async (req, res) => {
    try {
      // Verificar se usuário já baixou hoje (limitar compartilhamento)
      const downloadToday = await db.query(
        `SELECT COUNT(*) FROM download_logs 
         WHERE user_id = $1 
         AND resource_id = $2 
         AND downloaded_at > NOW() - INTERVAL '24 hours'`,
        [req.user.sub, 'manual-chapter-1']
      );
      
      if (parseInt(downloadToday.rows[0].count) >= 3) {
        return res.status(429).json({ 
          error: 'Limite de 3 downloads por dia atingido' 
        });
      }
      
      // Gerar URL pré-assinada do S3 (expira em 10 minutos)
      const s3Params = {
        Bucket: 'algor-resources-encrypted',
        Key: 'manuais/capitulo-1-free.pdf',
        Expires: 600,
        ResponseContentDisposition: 'attachment; filename="Manual_Auditor_IA_Cap1.pdf"',
        ResponseContentType: 'application/pdf'
      };
      
      const signedUrl = await s3.getSignedUrlPromise('getObject', s3Params);
      
      // Registrar download em audit log
      await db.query(
        `INSERT INTO download_logs 
         (user_id, resource_id, ip, user_agent, downloaded_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [
          req.user.sub,
          'manual-chapter-1',
          req.ip,
          req.headers['user-agent']
        ]
      );
      
      // Log para analytics
      await logAction({
        userId: req.user.sub,
        action: 'DOWNLOAD_RESOURCE',
        resource: 'manual-chapter-1',
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      // Retornar URL
      res.json({
        downloadUrl: signedUrl,
        expiresIn: 600,
        filename: 'Manual_Auditor_IA_Cap1.pdf',
        disclaimer: 'Este material é protegido por direitos autorais da ALGOR BRASIL.'
      });
      
    } catch (err) {
      logger.error('Download error', {
        error: err.message,
        userId: req.user.sub,
        stack: err.stack
      });
      
      res.status(500).json({ 
        error: 'Erro ao processar download. Tente novamente.' 
      });
    }
  }
);

module.exports = router;
```

---

## 13. CONCLUSÃO: PRINCÍPIOS DA FORTALEZA

### Defesa em Profundidade
Nunca confie em uma única camada de segurança. Este backend implementa:
- Perímetro (WAF)
- Gateway (validação)
- Aplicação (autorização)
- Dados (criptografia)
- Auditoria (logs)

### Privilégio Mínimo
Cada usuário, serviço e processo tem apenas as permissões estritamente necessárias.

### Falha Segura
Em caso de erro, o sistema nega acesso e loga o evento, nunca expõe dados.

### Auditabilidade Total
Toda ação sensível é registrada e pode ser rastreada para fins de compliance.

### Segurança não é Feature, é Fundação
Implementar estas medidas desde o dia 1 é 100x mais barato que corrigir brechas após o lançamento.

---

**Este documento deve ser tratado como um blueprint vivo, atualizado conforme novas ameaças e tecnologias surgem.**