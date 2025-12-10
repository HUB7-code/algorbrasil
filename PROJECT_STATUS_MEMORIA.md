# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 09/12/2025 - 22:40
> **Status Geral:** **HOME PAGE "GOOGLE CLEAN" ONLINE** ⚪
> **Versão:** 3.0 (Material Design Pivot)

## 1. Pivot Visual: "Algor Clean"
A identidade visual migrou de **Dark Cyberpunk** para **Light Material 3 (Enterprise)**. O objetivo é transmitir confiança institucional, clareza e autoridade técnica, similar a benchmarks como Google Cloud e Stripe.

## 2. Design System Cheat Sheet (Referência Técnica)
Use estas classes e tokens para manter a consistência nas próximas páginas (ex: Dashboard):

### Cores Principais
- **Background:** `bg-[#F3F6FC]` (Ice Blue - Padrão Global)
- **Texto Principal:** `text-[#1F1F1F]` (Dark Charcoal - Menos duro que preto)
- **Texto Secundário:** `text-[#444746]` (Grey Medium)
- **Brand Primary:** `text-[#0B57D0]` / `bg-[#0B57D0]` (Google Blue)
- **Accent Green:** `text-[#146C2E]` / `bg-[#C4EED0]` (Success/Growth)

### Formas & Componentes
- **Botões:** `rounded-full` (Sempre Pílula).
- **Cards (Surface):**
  - Classe: `.surface-card` (Definida em `globals.css`)
  - Specs: `bg-white`, `rounded-[24px]`, `border-[#E0E3E7]`, `shadow-sm`.
- **Inputs:** `bg-white`, `border-[#E0E3E7]`, `rounded-lg` (não pílula).

### Tipografia
- **Títulos (Serifa):** `font-serif` (Playfair Display) - Uso: H1, H2, Cards Title.
- **Corpo (Sans):** `font-sans` (Manrope) - Uso: Parágrafos, UI, Menus.
- **Dados (Mono):** `font-mono` (JetBrains Mono) - Uso: Status, Scores, Technical Terms.

## 3. Estado Atual dos Arquivos
- **Frontend:**
  - `frontend/app/page.tsx`: **Migrado** (Light Mode).
  - `frontend/app/globals.css`: **Refatorado** (Material Styles).
  - `frontend/app/layout.tsx`: **Configurado** (Fontes Manrope/Playfair).
  - `frontend/components/`: `MembershipBenefits`, `Methodology`, `Insights` atualizados.
- **Backend:** Estável (FastAPI + SQLite).
- **Imagens:** Logo corrigida no Header circular.

## 4. Roadmap Imediato (Fase 3)
1.  **Dashboard UI Overhaul:** O Painel de Membros ainda está "Dark". Precisa ser migrado para o tema "Clean" usando o *Cheat Sheet* acima.
2.  **Assessment Engine:** Implementar a lógica de diagnóstico ISO 42001.
3.  **Trust Signals:** Adicionar barra de logos de parceiros/standards na Home.

## 5. Histórico de Versões
- **v1.0:** MVP Estático (FormSubmit).
- **v2.0:** Dark Mode Premium (Next.js + 3D).
- **v3.0:** Light Mode Material (Enterprise Focus) - **ATUAL**.
