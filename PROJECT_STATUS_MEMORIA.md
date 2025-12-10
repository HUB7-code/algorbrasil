# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 09/12/2025 - 22:35
> **Status Geral:** **HOME PAGE "GOOGLE CLEAN" ATIVA** ⚪ | Backend Pronto | Pivot de Design Completo.
> **Foco Atual:** Desenvolvimento do **Assessment Engine** (SaaS) e refinamento do Dashboard.

## 1. Pivot Visual (Da Escuridão para a Luz)
Realizamos uma mudança radical de identidade visual (Pivot de Design) para alinhar com a estética "Tech Enterprise" (Google, Stripe, Linear).
- **De:** Dark Mode Cyberpunk (Neon, preto, glassmorphism pesado).
- **Para:** **Light Mode Material 3** (Branco, Ice Blue, Pill Shapes, Manrope Font).
- **Motivo:** Transmitir maior confiança institucional, clareza e acessibilidade para o público C-Level/Corporativo.

## 2. Novo Design System (Algor Clean)
- **Paleta:**
  - **Fundo:** Ice Blue (`#F3F6FC`).
  - **Primária:** Google Blue (`#0B57D0`).
  - **Texto:** Dark Charcoal (`#1F1F1F`).
  - **Superfícies:** Branco (`#FFFFFF`) com sombras suaves (`shadow-sm` / `elevation-1`).
- **Tipografia:**
  - **`Manrope`** (Sans): Geométrica, moderna e legível.
  - **`Playfair Display`** (Serif): Mantida para títulos de "Autoridade".
  - **`JetBrains Mono`** (Mono): Detalhes técnicos.
- **Formas:** `rounded-full` (Pílulas) e `rounded-[24px]` (Cards).

## 3. Estrutura Técnica (Stack V2)
- **Frontend:** Next.js 14 + Tailwind CSS.
  - Global CSS refatorado para classes `.surface-card`, `.btn-primary`.
- **Backend:** FastAPI + SQLite (Estável).
- **Infraestrutura:** Docker Compose.

## 4. Histórico de Conquistas (Recente)
- [x] **Home Page "Clean":** Reconstrução total do layout (`page.tsx`) para o novo tema claro.
- [x] **Componentes Adaptados:** `MembershipBenefits`, `Methodology` e `Insights` portados para o estilo Material.
- [x] **Logo Restaurada:** Imagem oficial `logo-algor.jpg` reintegrada no header circular.
- [x] **Deploy:** Pipeline de deploy automatizado (`./deploy.sh`) funcionando.

## 5. Próximos Passos (Roadmap Fase 3)
- [ ] **Assessment Engine:** Criar o fluxo de diagnóstico (Wizard) no Dashboard.
- [ ] **Dashboard UI:** Adaptar o Dashboard (que ainda deve estar Dark) para o novo tema Light/Clean.
- [ ] **Trust Bar:** Inserir logos de parceiros/standards na Home.

## 6. Arquivos Chave Atuais
- `frontend/app/page.tsx` (Home Light).
- `frontend/app/globals.css` (Design System Clean).
- `frontend/tailwind.config.ts` (Config de Fontes/Cores).
