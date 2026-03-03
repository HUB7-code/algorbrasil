# 📋 CHANGELOG - ALGOR BRASIL

Histórico de versões e mudanças do projeto.

---

## [V22.1.0] - 2026-03-03 - "CI/CD Stabilization & B2B Conversion Hook"

### 🎯 Conversão e Vendas (N7 Consultoria)

#### ✅ Adicionado
- **Link Direto de Diagnóstico:** Atualizado o link do Calendly em todo o site para o evento específico de Diagnóstico de Maturidade ISO 42001.
  - Link: `https://calendly.com/edisio-nascimentojr/diagnostico-de-maturidade-iso-42001-algor`
  - Pontos afetados: Homepage (CTAs), Board de Consultores, Cinematic Solutions.

### 🛠️ Infraestrutura e DevOps (Next.js 16 + React 19)

#### 🔧 Corrigido
- **GitHub Actions Build (Verde):** Resolvido o erro de build que travava o pipeline após o upgrade para Next 16.
- **Saneamento de Workspace:** Removidos arquivos `package.json` e `package-lock.json` duplicados na raiz do projeto que causavam conflitos de resolução de dependências no ambiente Linux (CI).
- **Tipagem de Componentes (Build Robustness):**
  - Refatorados componentes do dashboard (`TimelineChart`, `ActionChecklist`, `DataBreakdownTable`, `ActivityFeed`) para remover `React.FC` em favor de funções padrão com props tipadas, eliminando erros de inferência no React 19.
  - Adicionado cast de tipo explícito (`as any[]`) para arrays de mock vazios em `mockData.ts`, evitando a inferência `never[]` que quebrava o build.
- **Workflow CI/CD:** Atualizado `.github/workflows/main.yml` para usar `npm install --legacy-peer-deps`, garantindo compatibilidade entre Next 16 e dependências legadas.

---

## [V21.7.0] - 2026-02-26 - "Production Hardening & Deploy Bulletproof"

### 🛠️ Infraestrutura e DevOps Crítico

#### 🔒 Segurança
- **`.env` removido do rastreamento Git:**
  - Executado `git rm --cached .env` para proteger o arquivo `.env` de Produção.
  - Problema raiz: o arquivo havia sido adicionado ao Git no passado (antes do `.gitignore`), fazendo o `git reset --hard` sobrescrever o arquivo de Produção a cada deploy.
  - O `.gitignore` já tinha a regra correta; o cache do Git é que precisou ser limpo.

#### 🔧 Corrigido
- **`deploy.sh` — Proteção do `.env`:**
  - Adicionado bloco de backup/restore ao redor do `git reset --hard origin/main`.
  - O script agora salva o `.env` em `/tmp/` antes do reset e restaura após, garantindo que as credenciais de Produção nunca sejam perdidas por um deploy.
- **`docker-compose.yml` — Injeção correta de variáveis:**
  - Adicionada diretiva `env_file: .env` nos serviços `backend` e `frontend`.
  - Sem essa configuração, o Docker Compose não lia o arquivo `.env` físico e as variáveis (`SECRET_KEY`, `CLERK_*`, etc.) ficavam vazias dentro dos containers.
  - Adicionada variável `CLERK_WEBHOOK_SECRET` ao serviço backend.
  - Removidos os fallbacks inseguros `:-pk_test_disabled` das chaves Clerk do frontend.
- **Frontend — URLs `localhost:8000` removidas:**
  - `frontend/lib/api-config.ts`: Fallback alterado de `http://localhost:8000` para `/api`.
  - `frontend/app/dashboard/leads/page.tsx`: 3 ocorrências corrigidas.
  - `frontend/app/dashboard/classroom/[courseId]/page.tsx`: 2 chamadas de fetch corrigidas.
- **Frontend — Links mortos `/contato` removidos (6 ocorrências):**
  - `frontend/components/Navbar.tsx`: 2 links (desktop e mobile).
  - `frontend/components/HeroCinematic.tsx`: 1 botão CTA principal.
  - `frontend/components/TrainingJourney.tsx`: 1 botão CTA.
  - `frontend/components/CinematicSolutions.tsx`: 3 botões CTA.
  - Todos substituídos por `/#diagnostico` (âncora na homepage).
- **Testes — Refactoring de mocks SQLAlchemy:**
  - `backend/tests/test_dashboard_integration.py`, `test_risks.py`, `profiles_integration_test.py`.
  - Substituído `joinedload` temporário pela abordagem correta: generator com `yield` (padrão nativo do FastAPI/SQLAlchemy).
  - A sessão agora permanece ativa durante todo o ciclo de vida da requisição, eliminando `DetachedInstanceError` de forma limpa.

#### 🗑️ Removido
- Arquivos temporários `test_out.txt` e `test_out_utf8.txt` removidos do repositório.

---

## [V21.6.1] - 2026-02-25 - "VPS & CI/CD Stabilization"

### 🛠️ Infraestrutura e DevOps

#### 🔧 Corrigido
- **VPS 502 Bad Gateway (Next.js Build Crash):**
  - Resolvido travamento do container frontend durante o processo de `npm run build` no Docker.
  - Evitada falha de build (*Exit 1*) causada pelo uso do fallback `pk_test_disabled` no docker-compose.
  - Implementado `.env.production` diretamente no diretório `/frontend` no servidor de produção para forçar a precedência correta das **Clerk Environment Variables** em tempo de build.
- **Backend `requirements.txt` Corruption & Missing Dependencies:**
  - Recuperado arquivo original de requisitos via git history que havia sido sobrescrito em merge conflicts.
  - Resolvidas quebras de container do backend reacoplando `clerk-backend-api` e `pyotp`.
  - Corrigido pipeline de CI/CD (Github Actions pytest) injetando pacotes ausentes de teste (`reportlab`, `qrcode`, `requests`).

#### 🗑️ Removido
- **Legacy Auth Packages:**
  - `next-auth` e `@auth/prisma-adapter` foram completamente expurgados do `package.json` após migração total para a Clerk.

---

## [V21.6.0] - 2026-02-25 - "Cinematic UI/UX & B2B Conversion Overhaul"

### 🎬 UI/UX — Experiência Cinematográfica Premium

#### 🌟 Novo
- **Vídeo Slow-Motion no Hero (`HeroCinematic`):**
  - Imagem corporativa estática substituída por vídeo de data center em slow-motion (tech abstract).
  - Filtro integrado (`brightness`, `saturate`) mais *color grading* azul/violeta (`mix-blend-screen`).
  - Overlay de degradê horizontal (`.video-hero-overlay`) para legibilidade absoluta do texto.
  - Fallback automático para imagem caso o vídeo falhe.
- **Pain Point Banner (`PainPointBanner`):**
  - Nova seção ancorada antes das soluções para criar senso de urgência B2B.
  - Headline de alta conversão: "Não espere a multa chegar. Transforme o risco da IA em vantagem competitiva auditável."
  - 3 cards narrativos detalhando dores de mercado: Multas (LGPD/IA Act), Shadow AI e Confiança.

#### ✅ Adicionado
- **Animações "Data-Live" no Dashboard (`SaasPreview`):**
  - `LiveLogTicker`: Componente injetado no overlay do dashboard mostrando stream de logs simulados atuando de forma responsiva.
  - Barras animadas para cada módulo de conformidade, carregando a partir de 0% via `useInView`.
  - Contador animado "Trust Score" (`useCounter`) carregando progressivamente até 92%.
- **Sistema de Corners e Typography Premium (`globals.css`):**
  - Adicionado suporte a `.card-premium` (24px) e `.card-modern` (20px).
  - Textos de apoio atualizados com utilitários de contraste dinâmico (`.text-body`, `.text-label`).
- **Glows Dinâmicos e Parallax Avançado:**
  - Parallax independente via scroll nos "ambient blobs" e "floating cards" do Hero.
  - `boxShadow` pulsante ("Aura Dourada") e gradiente reativo no card ★ Elite do `TrainingJourney`.
  - Expansão de scale (`1.015`) e `translateY(-8px)` no hover do `CinematicSolutions`.
  - Efeito `.icon-glow` animado isoladamente sobre os ícones no hover.

#### 🔄 Modificado
- `TrainingJourney`: Copy do "E-book" atualizado para "Whitepaper Executivo" — "Guia Estratégico de Governança de IA para Lideranças".
- `HeroCinematic`: CTA refatorado de "Quero saber mais" para "Agendar Diagnóstico Gratuito" (ação de alto valor).
- CSS do Glassmorphism (`blur(32px)`) dos floating cards agora utiliza opacidade dupla para maior separação de fundo.

---

## [V21.5.0] - 2026-02-24 - "Board Page Elite — Client-Side Interactivity"

### 🎨 UI/UX — Página de Especialistas Refatorada

#### 🌟 Novo
- **Homepage B2B Completa via Stitch MCP:**
  - `HeroCinematic`: Institucional badge, headline gradiante "Liderando a Era da Governança", botões B2B (Diagnóstico/Ecossistema), barra de confiança (ISO 42001, LGPD). Layout mantido.
  - `TrainingJourney`: Transformada em "Jornada de Maturidade". Nova "Timeline Row" acima dos cards usando Grid exata de 5 colunas para alinhamento pixel-perfect dos números (01-05).
  - `CinematicSolutions`: Novo design com cards de **borda esquerda colorida** (verde, azul, violeta, âmbar), hover text "Saiba mais ->", ícone colorido lateral.
  - `SaasPreview`: Refatorado para "Painel de Controle Unificado". Novo copy focado em conformidade ISO 42001. Adicionada barra lateral de "Live Logs".
  - `GlobalTeam`: Título trocado para "Escala Global, Expertise Local.", copy focado em conformidade legal (LGPD, GDPR, CCPA).

#### ✅ Adicionado
- **Filtros interativos por especialidade** na página `/board`:
  - Categorias: `Todos`, `Estratégia`, `Risco`, `Compliance`, `Segurança`, `Gestão`
  - Filtro verde com glow ao ativo; inativo com estilo ghost
  - Implementado com `useState` — zero dependências externas
- **Labels de especialidade centralizados na base das fotos:**
  - Cada consultor tem cor exclusiva (`#00FF94`, `#4F7EFF`, `#F59E0B`, `#818CF8`, `#EF4444`, `#06B6D4`, `#EC4899`, etc.)
  - Overlay translúcido com `backdrop-blur` e borda na cor da especialidade
  - Hover da foto ganha tonalidade na cor da especialidade do membro
- **Botão de agendamento** no final da página:
  - Estilo outline com borda `#00FF94`, ícone `Calendar` e glow ao hover
  - Texto: "Schedule an Assessment with an Expert"
  - Link: `https://calendly.com/contato-algor`
- **Mapeamento de `filterTag`** por membro para filtro preciso sem duplicidade

#### 🔄 Modificado
- `app/board/page.tsx` — convertido de **Server Component** para **Client Component** (`'use client'`) para suportar estado React interativo
- Tipo `Member` expandido com campos `specialtyColor` e `filterTag`
- Hover das fotos agora usa a cor específica do membro (não mais cor global)
- Tamanhos ajustados: foto `aspect-square`, cards com `rounded-2xl` e `p-5`

#### 🔧 Correções (Build Stabilization — V21.4.1)
- Criados 15+ placeholders para módulos ausentes que causavam `404` e falha no build:
  - `growth-hub/modules/`: `ExplainabilityDashboard`, `HumanOversight`, `MonitoringDashboard`
  - `dashboard/inventory/CreateAssetModal`, `components/ui/Button`
  - `blog/ArticleViewer`, `blog/BlogClient`
  - `lab/HeroSection`, `lab/ContentCarousel`
  - `dashboard/OrganizationSwitcher`
- Corrigidos erros ESLint (`react/no-unescaped-entities`) em `policies/cookies` e `policies/terms`
- Corrigido `react/no-children-prop` em `app/dashboard/layout.tsx`
- Corrigidos exports nomeados (`named export`) nos módulos do growth-hub
- Build Next.js 14.2.1 passando com **Exit Code 0**

---

## [V21.4.0] - 2026-02-24 - "B2B Cinematic Pivot"



### 🎨 Design & UI — Refundação Visual Completa

#### ✅ Adicionado
- **Tema Cinematográfico (Dark Enterprise 2025):**
  - Substituição completa do tema cyberpunk/neon por paleta enterprise refinada
  - Nova homepage com `HeroCinematic.tsx` e `CinematicSolutions.tsx`
  - Logo animada `NeuralGlobe.tsx` — globo neural 3D via Canvas API
  - Fonte `Orbitron` para títulos da marca (ALGOR BRASIL)

- **Nova Paleta 2025 (IBM Design + Vercel Dark):**

  | Token | Hex | Substituição |
  |-------|-----|-------------|
  | Background | `#0B0F1E` | `#050A14` (anterior) |
  | Primary accent | `#4F7EFF` | `#3C67E7` / `#00A3FF` |
  | Secondary | `#818CF8` | `#60a5fa` / `#8B5CF6` |
  | Text dark | `#0F172A` | `#0A2540` |
  | Text muted | `slate-400/500` | `gray-400/500` |
  | Borders | `slate-700/50` | `white/10` |

- **Navbar Inteligente:**
  - Logo adaptativa: branco em homepage/scroll, navy em páginas claras
  - SVG → NeuralGlobe animado como identidade visual
  - Floating glass pod com blur e scroll progress indicator

- **Footer Atualizado:**
  - Paleta unificada com o tema cinematic
  - Logo inline SVG (mesmo globo do Navbar)
  - Remoção de neons `#00FF94` e `#00A3FF`

#### 🗑️ Removido
- **Componentes obsoletos (~60 arquivos):**
  - `HeroDual.tsx`, `B2BPillars.tsx` — substituídos por versões cinematic
  - Pastas inteiras: `compliance-scanner/`, `growth-hub/`, `leads/`, `onboarding/`, `scanner/`, `ui/`, `dashboard/`, `blog/`
  - Componentes órfãos: `AboutSection`, `AnimatedWave`, `HeroScene`, `MethodologySection`, `OfferingsShowcase`, `PersonaGrid`, `SecurePDFViewer` e outros 9

- **Cores cyberpunk purgadas globalmente:**
  - `#00FF94` (neon verde), `#00A3FF` (ciano neon), `rgba(0,255,148,...)` e derivados

#### 🔄 Modificado
- `app/(public)/page.tsx` — background `#0B0F1E`, usa `HeroCinematic` + `CinematicSolutions`
- `Navbar.tsx` — logo NeuralGlobe + texto adaptativo para contraste em qualquer página
- `Footer.tsx` — reescrito completamente com nova paleta

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

**Última atualização:** 03/03/2026  
**Versão atual:** V22.1.0
