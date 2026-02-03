# 📋 CHANGELOG - ALGOR BRASIL

Histórico de versões e mudanças do projeto.

---

## [V18.3.0] - 2026-02-03 - "Authentication Audit"

### 🔒 Segurança e Autenticação

#### ✅ Adicionado
- **Auditoria Completa do Sistema de Autenticação:**
  - Script de teste automatizado (`backend/test_auth_system.py`)
  - Relatório completo de auditoria (`AUTHENTICATION_AUDIT_REPORT.md`)
  - Validação de todos os 14 endpoints de autenticação
  - Teste de envio de e-mail real (100% sucesso)

- **Documentação:**
  - Jornada de testes completa (JORNADA 11) no `ROTEIRO_TESTES_COMPLETO.md`
  - 15 cenários de teste detalhados
  - Instruções para teste de performance e segurança

#### 🔧 Corrigido
- **SMTP Configuration Fix:**
  - Corrigido `SMTP_USER` no `/backend/.env` (adicionado `@gmail.com`)
  - E-mails agora são enviados corretamente
  - Validação de credenciais no script de teste

- **Route Cleanup:**
  - Removida rota mock duplicada `/frontend/app/api/auth/login/route.ts`
  - Mantida apenas a API real do backend FastAPI
  - Evita confusão entre endpoints mock e produção

#### ✅ Validado
- **Sistema de E-mail (6 Templates):**
  - Verificação de cadastro (24h validade)
  - Reset de senha (1h validade)
  - Boas-vindas
  - 2FA via e-mail
  - Confirmação de lead
  - Alertas admin

- **Segurança:**
  - JWT com PyJWT (HS256, 30min)
  - Argon2id para senhas (custo 12+)
  - AES-256-CBC para dados sensíveis
  - Rate limiting (5 req/min)
  - Prepared statements (anti-SQL injection)
  - LGPD audit logs (6 meses retenção)

- **OAuth2:**
  - Google OAuth (fluxo completo)
  - LinkedIn OAuth (fluxo completo)
  - Auto-provisioning de usuário + organização

- **2FA:**
  - TOTP via pyotp (RFC 6238)
  - QR Code generation
  - 6 dígitos, 30s window

#### 📊 Testes
- **Resultado:** 4/4 testes passaram (100%)
  1. ✅ Configurações SMTP
  2. ✅ Logo para e-mails
  3. ✅ Conexão com banco de dados
  4. ✅ Envio de e-mail real

---

## [V18.2.0] - 2026-01-23 - "Premium Image Cards"

### 🎨 Design e UI

#### ✅ Adicionado
- **Services Section Redesign:**
  - 3 cards com imagens profissionais de alta fidelidade
  - Consultoria & Advisory (escudo 3D ciano/verde)
  - Educação In-Company (ícone de grupo holográfico)
  - Palestras & Keynotes (púlpito roxo neon)
  - Container expandido para `max-w-[1600px]`
  - Grid layout 3 colunas (`md:grid-cols-3`)

- **Assets:**
  - `/images/consultoria-shield-icon.png`
  - `/images/educacao-in-company-card.png`
  - `/images/palestras-keynotes-card.png`

---

## [V18.1.x] - 2026-01-20 - "Institutional Polish"

### 🐛 Bug Fixes

#### 🔧 Corrigido
- **Hydration Error Fix:**
  - Resolvido erro `Prop style did not match` no card "System Status"
  - Removida memoização agressiva em `page.tsx`
  - Hot-reload fluido durante desenvolvimento

### 🎨 Visual Enhancements

#### ✅ Adicionado
- **Matrix Rain Effect:**
  - Implementado no card "Sistema Operacional de Governança"
  - Efeito de chuva de algoritmos animado

- **Hero Rollback:**
  - Copy revertido para "Liderando a Era da Governança de IA no Brasil"

- **Methodology Update:**
  - Cards atualizados para refletir ciclo de 5 etapas B2B
  - Sincronização com `STRATEGIC_ECONOMICS` e `Metodologia B2B`

- **Holographic Stats:**
  - `GlobalConnectionMap` com conexões animadas
  - `AuditScanner` em pure CSS/Glassmorphism
  - `IsoBadgeAnimator` com escudo holográfico rotativo

---

## [V18.0.0] - 2026-01-12 - "Security Fortress"

### 🔒 Segurança Crítica

#### 🔧 Corrigido
- **Email Verification Enforcement:**
  - Bloqueio de login para contas não verificadas (`is_active=False`)
  - Mensagem clara: "E-mail não verificado. Por favor, ative sua conta."

- **Encryption Key Hardening:**
  - Sanitização de chaves do `.env` com `.strip()`
  - Fallback seguro para chaves inválidas

- **Registration 500 Fix:**
  - Corrigidos imports de models
  - Syntax SQLAlchemy 2.0 atualizada

### 📊 CI/CD

#### ✅ Adicionado
- **GitHub Actions Stabilization:**
  - Pipeline backend (Python) estável
  - Pipeline frontend (Node.js) estável
  - Instalação de `libmagic1` para backend
  - Uso de `npm install` (não `npm ci`)

---

## [V17.8.2] - 2026-01-01 - "Typography Fix"

### 🎨 Design

#### 🔧 Corrigido
- **Typography Issues:**
  - Removido `italic` de fontes sans-serif
  - Evita fallback para fontes serifadas
  - Reduzido título hero de `8xl` → `6xl` no Institute

#### ✅ Adicionado
- **Assets:**
  - Criado `grid.svg` para background patterns

- **Performance:**
  - Adicionado `sizes` prop em componentes `next/image`

---

## [V17.8.0] - 2025-12-31 - "Enterprise Visual Polish"

### 🎨 Design

#### ✅ Adicionado
- **Enterprise Page Enhancements:**
  - WebGL degradation graceful
  - Visual integrity improvements
  - Stability fixes

---

## Convenções de Versionamento

### Formato: `MAJOR.MINOR.PATCH`

- **MAJOR:** Mudanças incompatíveis com versões anteriores
- **MINOR:** Novas funcionalidades compatíveis
- **PATCH:** Correções de bugs compatíveis

### Categorias de Mudanças

- **✅ Adicionado:** Novas funcionalidades
- **🔧 Corrigido:** Correções de bugs
- **🔄 Modificado:** Mudanças em funcionalidades existentes
- **🗑️ Removido:** Funcionalidades removidas
- **🔒 Segurança:** Correções de vulnerabilidades
- **📊 Performance:** Melhorias de performance
- **📝 Documentação:** Atualizações de documentação

---

**Última atualização:** 03/02/2026  
**Versão atual:** V18.3.0
