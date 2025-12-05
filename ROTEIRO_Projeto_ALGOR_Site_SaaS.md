# 📋 ROTEIRO TÉCNICO: EVOLUÇÃO DO PROJETO ALGOR
## De Site Institucional para Plataforma Site + SaaS

---

**Data:** Dezembro de 2025  
**Responsável pelo Briefing:** ALGOR Association Brasil  
**Público:** Antigravity Agent (Dev Team Lead)  
**Status:** ✅ ATUALIZAÇÃO ESTRATÉGICA — Projeto Aprovado

---

## 📌 RESUMO EXECUTIVO

O projeto **ALGOR** evolui de um **site institucional tradicional** para uma **estratégia dual integrada**:

```
ANTES (v1.0):
├── Site Institucional
│   ├── Home, Sobre, Blog, Contato
│   ├── Área de Membros (gestão simples)
│   └── Downloads Públicos/Restritos
└── Foco: Brand + Lead Generation

AGORA (v2.0 - APROVADO):
├── Site Institucional (Lead Generation Engine)
│   ├── Home, Sobre, Regulação, O que Fazemos
│   ├── Blog estratégico (SEO-optimizado)
│   ├── Demonstração do SaaS (landing page integrada)
│   ├── Integração de pagamento
│   └── Funil de conversão estruturado
│
├── SaaS Platform (ALGOR AI GOV - Receita Core)
│   ├── Diagnóstico de Maturidade (versão completa)
│   ├── Inventário Dinâmico de Sistemas de IA
│   ├── Dashboard de Risco & Compliance
│   ├── Relatórios Auditáveis (PDF/Excel)
│   ├── Integração com padrões (ISO 42001, PL 2338)
│   ├── Multi-tenant Architecture
│   └── Logs de Auditoria & Rastreabilidade
│
└── Foco: Brand + Lead Gen (site) + Monetização Contínua (SaaS)
```

**Resultado Esperado (Y1):**
- Lançamento MVP: Q1 2026 (4 meses)
- Early Access com 2-3 clientes beta
- Receita projetada: R$ 60K - 300K (5-15 clientes @ R$ 5-20K/mês)

---

## 🎯 MUDANÇAS ESTRATÉGICAS PRINCIPAIS

### 1. **Escopo Expandido**

| Elemento | Antes | Agora | Impacto |
|----------|-------|-------|--------|
| **Objetivo Principal** | Brand + Comunicação | Brand + Lead Gen + Monetização | 🔴 Crítico |
| **Integração de Pagamento** | Fase 2 (atrasado) | MVP (prioritário) | 🔴 Crítico |
| **Arquitetura Banco de Dados** | Monolítica (simples) | Multi-tenant (escalável) | 🟡 Alto |
| **Modelo de Receita** | Associação apenas | Associação + SaaS Recorrente | 🔴 Crítico |
| **Funnel de Conversão** | Implícito | Explícito e Rastreável | 🟡 Alto |
| **Landing Pages** | Uma genérica | Múltiplas por público | 🟡 Alto |

### 2. **Novo Papel do Site**

O site **não é mais o fim**, mas **o início do funil**:

```
Site
  ├─ Lead Magnet: Diagnóstico Rápido (versão lite)
  ├─ Content Hub: Blog estratégico
  ├─ Social Proof: Case studies + testimoniais
  └─ CTA Principal: "Experimente o SaaS" (Free Trial)
           ↓
      SaaS Platform (ALGOR AI GOV)
           ↓
    Diagnóstico Completo + Inventário + Risco
           ↓
    Conversão: Assinatura Paga (Starter/Pro/Enterprise)
           ↓
    Retenção & Expansion Revenue
```

### 3. **Novo Ativo: SaaS Core (ALGOR AI GOV)**

**Antes:** Menção superficial  
**Agora:** Produto principal com página dedicada no site

**Funcionalidades SaaS MVP:**
- ✅ Diagnóstico de Maturidade em IA (versão completa)
- ✅ Inventário Dinâmico de Sistemas de IA
- ✅ Dashboard com KPIs de Risco
- ✅ Relatórios exportáveis (PDF, Excel)
- ✅ Integração com ISO 42001, PL 2338
- ✅ Auditoria & Logs (compliance-ready)

---

## 🏗️ ARQUITETURA TÉCNICA ATUALIZADA

### **Estrutura Recomendada (MVP)**

```
FRONTEND (User Interface)
├── Site Institucional (Next.js / React)
│   ├── Home, Sobre, Blog, Contato
│   ├── Landing: "ALGOR AI GOV" (SaaS showcase)
│   ├── Integração com CRM (HubSpot/Pipedrive)
│   └── Analytics (GA4 + Conversão)
│
└── SaaS App (Next.js / React + TypeScript)
    ├── Dashboard Principal
    ├── Diagnóstico (Form-based workflow)
    ├── Inventário (CRUD + visualização)
    ├── Reports (template system)
    └── Admin Panel (tenant management)

BACKEND (API & Logic)
├── API REST (Node.js/Express ou FastAPI)
│   ├── Authentication (JWT + Multi-tenant isolation)
│   ├── Business Logic (diagnóstico, cálculos, integrações)
│   ├── File Management (uploads de relatórios)
│   └── Email Service (notificações, alertas)
│
└── Webhooks & Integrações
    ├── Stripe/PagSeguro (Payment)
    ├── SendGrid/AWS SES (Email)
    ├── S3/GCS (File Storage)
    └── Futures: Zapier, Make, n8n

DATABASE (Multi-tenant)
├── PostgreSQL (Primary)
│   ├── Tabela: tenants (informações do cliente)
│   ├── Tabela: usuarios (com tenant_id)
│   ├── Tabela: diagnosticos (com tenant_id)
│   ├── Tabela: inventario_ia (com tenant_id)
│   ├── Tabela: relatorios (com tenant_id)
│   └── Tabela: logs_auditoria (compliance)
│
├── Redis (Cache & Session)
│   ├── Token storage
│   ├── Rate limiting
│   └── Real-time updates
│
└── S3/Storage (File Management)
    ├── Documentos de relatórios
    ├── Uploads de usuários
    └── Backups

INFRASTRUCTURE (Devops)
├── Cloud: AWS / GCP / Azure (escolha do dev)
├── Containerização: Docker
├── Orquestração: Kubernetes (ou gerenciado)
├── CI/CD: GitHub Actions / GitLab CI
├── Monitoring: DataDog / New Relic / Grafana
└── Security: WAF, DDoS protection, SSL/TLS
```

---

## 📋 BANCO DE DADOS: SCHEMA ATUALIZADO (Multi-tenant)

### **Tabelas Essenciais (MVP)**

#### **1. tenants**
```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email_admin VARCHAR(255),
  plano ENUM('free_trial', 'starter', 'professional', 'enterprise'),
  status ENUM('ativo', 'cancelado', 'suspenso'),
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_proxima_cobranca DATE,
  stripe_customer_id VARCHAR(255),
  ambiente ENUM('production', 'sandbox')
);
```

#### **2. usuarios**
```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  email VARCHAR(255) NOT NULL,
  senha_hash VARCHAR(255),
  nome VARCHAR(255),
  cargo VARCHAR(255),
  papel ENUM('admin', 'gestor', 'editor', 'viewer'),
  data_cadastro TIMESTAMP DEFAULT NOW(),
  ativo BOOLEAN DEFAULT true,
  UNIQUE(tenant_id, email)
);
```

#### **3. diagnosticos_maturidade**
```sql
CREATE TABLE diagnosticos_maturidade (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  criado_por_usuario_id UUID REFERENCES usuarios(id),
  titulo VARCHAR(255),
  data_criacao TIMESTAMP DEFAULT NOW(),
  data_atualizacao TIMESTAMP,
  status ENUM('rascunho', 'completo', 'finalizado'),
  -- Respostas do diagnóstico
  respostas JSONB, -- Armazena perguntas + respostas
  score_maturidade DECIMAL(3,1), -- 0-5
  gaps_identificados JSONB,
  plano_acao_5w2h JSONB,
  relatorio_pdf_url VARCHAR(255),
  INDEX(tenant_id)
);
```

#### **4. inventario_ia**
```sql
CREATE TABLE inventario_ia (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  nome_sistema VARCHAR(255),
  descricao TEXT,
  tipo ENUM('generativa', 'preditiva', 'classificacao', 'outro'),
  data_implementacao DATE,
  responsavel VARCHAR(255),
  nivel_risco ENUM('baixo', 'medio', 'alto', 'critico'),
  metricas JSONB, -- performance, acuracia, viés
  conformidade_iso42001 JSONB,
  conformidade_pl2338 JSONB,
  data_ultima_auditoria DATE,
  INDEX(tenant_id)
);
```

#### **5. relatorios**
```sql
CREATE TABLE relatorios (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  tipo ENUM('diagnostico', 'auditoria', 'risco', 'compliance'),
  titulo VARCHAR(255),
  criado_em TIMESTAMP DEFAULT NOW(),
  gerado_por_usuario_id UUID REFERENCES usuarios(id),
  conteudo JSONB,
  arquivo_pdf_url VARCHAR(255),
  arquivo_excel_url VARCHAR(255),
  compartilhado_com TEXT[], -- emails
  INDEX(tenant_id)
);
```

#### **6. logs_auditoria**
```sql
CREATE TABLE logs_auditoria (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES tenants(id),
  usuario_id UUID REFERENCES usuarios(id),
  acao VARCHAR(255),
  tabela_afetada VARCHAR(100),
  registro_id VARCHAR(255),
  dados_anteriores JSONB,
  dados_novos JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  INDEX(tenant_id, timestamp)
);
```

#### **7. formas_contato**
```sql
CREATE TABLE formas_contato (
  id UUID PRIMARY KEY,
  nome VARCHAR(255),
  email VARCHAR(255),
  empresa VARCHAR(255),
  telefone VARCHAR(20),
  assunto VARCHAR(255),
  mensagem TEXT,
  origem ENUM('site_form', 'email_direto'),
  status ENUM('novo', 'respondido', 'qualificado'),
  data_envio TIMESTAMP DEFAULT NOW(),
  data_resposta TIMESTAMP,
  INDEX(email, data_envio)
);
```

---

## 🔄 FLUXO DE DESENVOLVIMENTO (Timeline: 4 meses)

### **Semana 1-2: Planejamento & Setup**
- [ ] Kickoff com dev team (Antigravity)
- [ ] Definição de tech stack final (linguagens, frameworks, cloud)
- [ ] Setup de repositórios Git + CI/CD pipeline
- [ ] Configuração de ambientes (dev, staging, production)
- [ ] Estrutura de banco de dados finalizada
- **Deliverable:** Infrastructure as Code pronto

### **Semana 3-6: MVP Backend + Frontend Base**
- [ ] API REST (endpoints de diagnóstico, inventário, relatórios)
- [ ] Sistema de autenticação multi-tenant
- [ ] CRUD para todas as tabelas principais
- [ ] Integração com Stripe (pagamento)
- [ ] Frontend: Componentes base (dashboard, forms)
- **Deliverable:** API 80% pronta, Frontend 40% pronto

### **Semana 7-10: Features Core + Integração**
- [ ] Diagnóstico de Maturidade (engine de cálculo)
- [ ] Inventário Dinâmico (visualização + filtros)
- [ ] Dashboard com KPIs
- [ ] Geração de relatórios (PDF/Excel)
- [ ] Integração com padrões (ISO 42001, PL 2338)
- [ ] Logs de auditoria e compliance
- **Deliverable:** SaaS 70% funcional, Site 70% pronto

### **Semana 11-14: Polish + QA + Launch Prep**
- [ ] Testes (unitários, integração, E2E)
- [ ] Performance optimization
- [ ] Security audit (OWASP Top 10)
- [ ] LGPD compliance check
- [ ] UX refinement
- [ ] Documentação técnica
- [ ] Setup de monitoring (DataDog, New Relic)
- **Deliverable:** MVP pronto para Beta Launch

### **Semana 15-16: Beta + Adjustments**
- [ ] Deploy em staging com clientes beta
- [ ] Coleta de feedback
- [ ] Ajustes críticos
- [ ] Production readiness checklist
- **Deliverable:** Pronto para launch público

---

## 🎬 FUNCIONALIDADES DETALHADAS (MVP)

### **1. Diagnóstico de Maturidade em IA**

**O que é:**
Ferramenta que avalia o nível de maturidade da organização em IA (0-5), identificando gaps e gerando plano de ação 5W2H.

**Fluxo:**
1. Usuário inicia diagnóstico (clica em CTA no site)
2. Entra em "free trial" ou login (se cliente)
3. Responde a 20-30 perguntas (weighted scoring)
4. Sistema calcula score e identifica gaps
5. Gera plano de ação com recomendações
6. Exporta relatório (PDF)

**Integração com padrões:**
- ✅ ISO/IEC 42001:2024 (8 dimensões)
- ✅ PL 2338/2023 (compliance regulatório)
- ✅ EU AI Act (transparency requirements)

---

### **2. Inventário Dinâmico de Sistemas de IA**

**O que é:**
Registro centralizado de todos os sistemas de IA em uso na organização, com risco, conformidade e auditoria.

**Dados por Sistema:**
- Nome, descrição, tipo (generativa, preditiva, etc.)
- Data de implementação
- Responsável
- Nível de risco (baixo/médio/alto/crítico)
- Métricas (accuracy, fairness, performance)
- Conformidade (ISO, PL 2338, GDPR/LGPD)
- Data da última auditoria

**Interface:**
- Tabela editável com filtros
- Vista de cards (Kanban-style por risco)
- Export para Excel
- Integração com dashboard

---

### **3. Dashboard de Risco & Compliance**

**Widgets principais:**
- 📊 Score de Maturidade Geral
- 🚨 Sistemas por Nível de Risco (gráfico)
- ✅ Taxa de Conformidade (ISO 42001, PL 2338)
- 📈 Histórico de Maturidade (série temporal)
- 🔴 Top 5 Gaps (priorização)
- 📋 Próximas Auditorias (calendário)

**Características:**
- Atualização em tempo real
- Filtros por período
- Export de dados
- Alertas configurable

---

### **4. Geração de Relatórios**

**Tipos:**
1. **Diagnóstico:** Score + Gaps + Plano de ação
2. **Auditoria:** Conformidade com padrões
3. **Risco:** Análise de sistemas críticos
4. **Compliance:** Checklist por regulação

**Formatos:**
- 📄 PDF (com branding do cliente)
- 📊 Excel (com planilhas de dados)
- 🌐 HTML (compartilhável por link)

**Template System:**
- Customizável por tenant
- Seções modulares
- Auto-populate com dados

---

### **5. Autenticação & Autorização Multi-tenant**

**Modelos de Usuário:**
- **Admin:** Gestão total (usuários, configurações, pagamento)
- **Gestor:** Pode criar/editar diagnósticos e inventário
- **Editor:** Só leitura + comentários
- **Viewer:** Apenas visualização

**Segurança:**
- JWT com refresh tokens
- 2FA para admins (optional MVP)
- Rate limiting por tenant
- Isolamento rigoroso de dados (tenant_id em cada query)

---

## 💰 MODELO DE PREÇO (SaaS)

### **Planos Sugeridos (Validar com stakeholders)**

| Plano | Preço/mês | Uso Típico | Limites |
|-------|-----------|-----------|---------|
| **Free Trial** | R$ 0 (14 dias) | Avaliação | 1 diagnóstico, 5 sistemas no inventário |
| **Starter** | R$ 2.990 | PME / 1 área | 5 diagnósticos/ano, 20 sistemas, 1 usuário admin |
| **Professional** | R$ 7.990 | Empresa média | 20 diagnósticos/ano, 50 sistemas, 5 usuários |
| **Enterprise** | Customizado | Grandes corporações | Ilimitado + suporte dedicado |

**Modelo:** Cobrança anual com desconto 15-20%

---

## 📞 INTEGRAÇÃO COM SITE

### **Páginas Novas/Atualizadas**

#### **1. Home (atualizada)**
- Hero com proposta de valor ALGOR
- CTA Principal: "Experimente o Diagnóstico" (lead magnet)
- Seção: "Por que ALGOR?" (diferencial)
- Seção: "Nossas Soluções" (blog + SaaS showcase)
- Seção: "Casos de Sucesso" (testimoniais)

#### **2. /saas (Nova - Landing Page do SaaS)**
- Título: "ALGOR AI GOV - Plataforma de Governança de IA"
- Descrição: O que a plataforma faz, por quê, resultado
- Screenshots/demo
- Pricing table
- CTA: "Começar Free Trial"
- FAQ

#### **3. /regulacao (Nova - Estratégica)**
- Explicação: PL 2338, ISO 42001, EU AI Act, LGPD
- Como ALGOR alinha: Mapeamento 1:1
- Checklist de conformidade
- Links para blog
- CTA: "Ver nossos recursos"

#### **4. /blog (Otimizado para SEO)**
- Estratégia: 10-15 artigos pilar (meses 1-3)
  - "Governança de IA no Brasil: Guia Prático"
  - "Como Auditar Sistemas de IA"
  - "PL 2338/2023: O que Muda"
  - "ISO 42001: Preparação"
  - etc.
- Integração: Cada artigo tem CTA para diagnóstico

#### **5. /case-studies (Nova)**
- Mini cases de clientes (com permissão)
- Antes/depois (maturidade)
- Impacto quantificável
- Testimoniail em vídeo (se possível)

---

## 🔐 Compliance & Segurança

### **LGPD (Lei Geral de Proteção de Dados)**
- [ ] Política de privacidade atualizada
- [ ] Termos de serviço (TOS) aprovados
- [ ] RGPD-ready data processing
- [ ] Direito ao acesso/portabilidade/exclusão implementado
- [ ] Data residency: Dados em BR (AWS SP ou GCP São Paulo)

### **ISO 27001 (Information Security)**
- [ ] Criptografia em trânsito (TLS 1.3)
- [ ] Criptografia em repouso (AES-256)
- [ ] Backup automático (3 cópias, 1 offsite)
- [ ] Disaster recovery plan
- [ ] Penetration testing anual

### **OWASP Top 10 (Web Security)**
- [ ] Injection prevention (parameterized queries)
- [ ] Broken authentication (JWT + MFA)
- [ ] Sensitive data exposure (encryption)
- [ ] XML External Entities (XXE) - não aplicável
- [ ] Broken access control (RBAC + tenant isolation)
- [ ] Security misconfiguration (security headers)
- [ ] Cross-site scripting (CSP)
- [ ] Insecure deserialization (avoid pickle/eval)
- [ ] Using components with known vulnerabilities (dependency scanning)
- [ ] Insufficient logging (audit logs obrigatórios)

### **PL 2338/2023 (Regulação IA Brasil)**
- [ ] Transparência: Documentação de algoritmos
- [ ] Accountability: Logs de decisões
- [ ] Mitigação de viés: Testes obrigatórios
- [ ] Direito à contestação: Workflow implementado
- [ ] Notificação: Quando IA toma decisão crítica

---

## 🛠️ Tech Stack Recomendado (Flexível)

### **Frontend**
- **Framework:** Next.js 14+ (React + TypeScript)
- **Styling:** Tailwind CSS + Shadcn UI (ou Material UI)
- **State:** Zustand / TanStack Query
- **Charts:** Recharts / Chart.js
- **Forms:** React Hook Form + Zod

### **Backend**
- **Opção 1:** Node.js + Express.js + TypeScript
- **Opção 2:** Python + FastAPI (mais data science-friendly)
- **ORM:** Prisma (Node) ou SQLAlchemy (Python)
- **Validation:** Joi / Pydantic

### **Database**
- **Primary:** PostgreSQL 15+
- **Cache:** Redis 7+
- **Storage:** AWS S3 (ou GCP Cloud Storage)

### **DevOps**
- **Container:** Docker
- **Orchestration:** Docker Compose (MVP) → Kubernetes (scaling)
- **CI/CD:** GitHub Actions / GitLab CI
- **Cloud:** AWS (recomendado) / GCP / Azure
- **Monitoring:** DataDog / New Relic / Prometheus + Grafana

### **3rd Party**
- **Payment:** Stripe (internacional) ou PagSeguro (local)
- **Email:** SendGrid / AWS SES
- **CRM:** HubSpot (free plan) / Pipedrive
- **Analytics:** Google Analytics 4
- **Error Tracking:** Sentry

---

## 📊 Métricas de Sucesso (KPIs)

### **Product Metrics**
- ✅ Usuários ativos (DAU/MAU)
- ✅ Feature adoption rate (% fazendo diagnóstico)
- ✅ NPS (Net Promoter Score)
- ✅ Time-to-value (dias até primeiro relatório)

### **Business Metrics**
- ✅ MRR (Monthly Recurring Revenue)
- ✅ CAC (Customer Acquisition Cost)
- ✅ LTV (Lifetime Value)
- ✅ Churn rate (taxa de cancelamento)
- ✅ NRR (Net Revenue Retention)

### **Technical Metrics**
- ✅ Uptime (objetivo: 99.9%)
- ✅ Page load time (<2s)
- ✅ API response time (<500ms p95)
- ✅ Deployment frequency (target: daily)
- ✅ Security incidents (target: 0 críticos)

---

## 🚀 Go-to-Market (GTM)

### **Fase 1: Beta (Semana 16)**
- Launch com 2-3 clientes piloto
- Free access em troca de feedback
- Case study ao final

### **Fase 2: Early Access (Mês 5-6)**
- Convite para 20-30 leads qualificados
- Preço promocional (-30%)
- Content marketing heavy

### **Fase 3: General Availability (Mês 7+)**
- Launch público
- PR em mídia tech brasileira
- Eventos (webinars, conferências)

---

## 📞 Contato & Coordenação

### **Lead Técnico (Dev)**
- Antigravity Agent
- Responsabilidades:
  - [ ] Escolher tech stack final
  - [ ] Setup de infraestrutura
  - [ ] Desenvolvimento MVP
  - [ ] QA e deployment

### **Lead Produto (PM)**
- Responsabilidades:
  - [ ] Priorização de features
  - [ ] User research
  - [ ] Stakeholder alignment
  - [ ] Metrics tracking

### **Reuniões**
- **Semanal:** Status de desenvolvimento (segunda 10h)
- **Bi-semanal:** Review de features (quinta 14h)
- **Mensal:** Retrospective e planejamento (último sexta)

---

## ✅ Checklist de Início

**Para o Dev Team (Antigravity):**
- [ ] Confirmar tech stack proposto (ou sugerir alternativa)
- [ ] Setup do repositório Git
- [ ] Estrutura de branches (main, dev, feature/*)
- [ ] Configuração de CI/CD inicial
- [ ] Ambiente de desenvolvimento local pronto
- [ ] Primeira versão do schema do banco (PostgreSQL)
- [ ] Kickoff call agendada

**Para o ALGOR:**
- [ ] Confirmar modelo de preço
- [ ] Definir 2-3 clientes beta
- [ ] Preparar conteúdo para landing page SaaS
- [ ] Definir timezones e horários de reunião
- [ ] Preparar briefing de design (if hiring designer)

---

## 📚 Referências & Documentação

### **Documentos Consultados**
- Plano Original: "Plano de Desenvolvimento do Site Institucional ALGOR Association Brasil Final.docx"
- Best Practices: Arquitetura multi-tenant SaaS 2025
- Regulação: PL 2338/2023, ISO 42001, LGPD

### **Próximos Passos**
1. Dev team revisa este roteiro (prazo: 48h)
2. Kickoff call para esclarecer dúvidas
3. Tech stack final aprovado
4. Primeira sprint iniciada

---

## 📝 Notas Finais

Este documento representa a **visão consolidada** da evolução do projeto ALGOR. Não é rígido — será refinado conforme o desenvolvimento. 

**O objetivo é claro:**
- **MVP em 4 meses** (viável)
- **Site + SaaS integrado** (receita + brand)
- **Escalabilidade desde o dia 1** (multi-tenant ready)
- **Compliance-by-design** (LGPD, PL 2338, ISO 42001)

---

**Próxima ação:** Agendar kickoff com Antigravity Agent esta semana.

**Versão:** 1.0  
**Data:** Dezembro 4, 2025  
**Status:** ✅ APROVADO PARA DESENVOLVIMENTO