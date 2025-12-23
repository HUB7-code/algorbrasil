# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 23/12/2025 - 16:20 (Site vs SaaS Separation)
> **Status Geral:** **ARQUITETURA SITE + SAAS IMPLEMENTADA (V12.1)** 🛡️🚀📊
> **Versão:** 12.1 (Separação Site Público vs SaaS Pago)

---

## 1. Arquitetura de Produto (ATUALIZADO V12.1)

### 🌐 Site Público (`/`, `/scanner`, `/members`, etc.)
**Objetivo:** Aquisição de leads via ferramentas gratuitas

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/` | Homepage com Hero + Pricing | Público |
| `/scanner` | Scanner Freemium (100 linhas, 3 findings) | Público |
| `/members` | Página de benefícios para membros | Público |
| `/login`, `/register` | Autenticação | Público |
| `/policies/*` | Privacidade & Termos | Público |

### 🔐 SaaS Pago (`/dashboard/*`)
**Objetivo:** Plataforma completa para usuários pagantes

| Rota | Descrição | Acesso |
|------|-----------|--------|
| `/dashboard` | Dashboard principal | Autenticado |
| `/dashboard/compliance-scanner` | Scanner Completo (Overview) | Autenticado |
| `/dashboard/compliance-scanner/technical` | Dashboard Técnico (CTOs) | Autenticado |
| `/dashboard/compliance-scanner/compliance` | Centro de Compliance (DPOs) | Autenticado |
| `/dashboard/assessments` | Auditorias e Assessments | Autenticado |
| `/dashboard/inventario` | Inventário de IA | Autenticado |

---

## 2. Middleware de Autenticação (NOVO)

Arquivo: `frontend/middleware.ts`

```typescript
// Rotas protegidas: /dashboard/*, /onboarding/*
// Redireciona para /login se não autenticado
// Usa cookie 'access_token' para verificação
```

**Fluxo:**
1. Usuário acessa `/dashboard/*`
2. Middleware verifica cookie `access_token`
3. Se não existe → Redireciona para `/login?redirect=/dashboard/...`
4. Se existe → Permite acesso

---

## 3. Scanner Freemium vs Enterprise

| Feature | Freemium (`/scanner`) | Enterprise (`/dashboard/compliance-scanner`) |
|---------|----------------------|-------------------------------------------|
| Max linhas | 100 | Ilimitado |
| Max arquivo | 1MB | 50MB |
| Findings visíveis | 3 | Todos |
| Histórico | ❌ | ✅ |
| Relatório PDF | ❌ | ✅ |
| Dashboards | ❌ | ✅ 3 Dashboards |
| API Access | ❌ | ✅ |

---

## 4. Estrutura de Pastas (V12.1)

```
frontend/app/
├── (public)/                  # SITE PÚBLICO
│   ├── layout.tsx             # Layout com Navbar
│   ├── page.tsx               # Homepage
│   ├── scanner/page.tsx       # Scanner Freemium (NOVO)
│   ├── login/                 # Autenticação
│   ├── register/
│   ├── members/
│   └── ...
│
├── dashboard/                 # SAAS PAGO (Protegido por middleware)
│   ├── page.tsx               # Dashboard principal
│   ├── compliance-scanner/    # Scanner Enterprise
│   │   ├── page.tsx           # Overview
│   │   ├── technical/         # CTO Dashboard
│   │   └── compliance/        # DPO Dashboard
│   ├── assessments/
│   └── ...
│
├── middleware.ts              # Auth Guard (NOVO)
├── globals.css
└── layout.tsx
```

---

## 5. Deploy no VPS

**O que precisa fazer ao atualizar:**
```bash
# 1. Baixar alterações
cd /path/to/project
git pull origin main

# 2. Atualizar dependências (Recharts já está no package.json)
cd frontend
npm install

# 3. Rebuild
npm run build

# 4. Reiniciar serviços
# Se usando PM2:
pm2 restart all

# Se usando Docker:
docker-compose up -d --build
```

**Dependências já incluídas no package.json:**
- `recharts: ^3.6.0` ✅
- `framer-motion: ^11.18.2` ✅
- `lucide-react: ^0.372.0` ✅

---

## 6. Próximos Passos

1. **Testar Localmente:**
   - `/scanner` → Scanner Freemium
   - `/dashboard/compliance-scanner` → Scanner Enterprise (requer login)

2. **Limites no Backend:**
   - Implementar verificação de plano no endpoint `/api/v1/scanner/upload`
   - Retornar 402 se usuário Free exceder limites

3. **Stripe Integration:**
   - Conectar planos (Free, Pro, Enterprise) ao billing

4. **Commit & Deploy:**
   - `git add . && git commit -m "feat: site vs saas separation"`
   - `git push origin main`
   - Atualizar VPS

---
*Documento atualizado automaticamente. Versão 12.1.*
