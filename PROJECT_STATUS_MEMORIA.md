# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 10/12/2025 - 02:00
> **Status Geral:** **HOME PAGE "ELITE DARK" RESTAURADA** ⚫
> **Versão:** 4.0 (Elite Visuals Restoration)

## 1. Pivot Visual: "Elite Dark Glass"
O projeto reverteu para a identidade **Dark Cyberpunk/Elite**. O foco é exclusividade, mistério e alta sofisticação tecnológica.
- **Conceito:** "Governança Generativa" e "Elite da Governança".
- **Estilo:** Glassmorphism Real, Neon Glows, Animações Fluídas.

## 2. Design System Cheat Sheet (Referência Técnica)
ATENÇÃO: Ignore referências anteriores ao tema "Clean/Light".

### Cores Principais
- **Background:** `bg-[#0A1A2F]` (Deep Navy) e `bg-[#050d18]` (Footer).
- **Texto Principal:** `text-white`.
- **Texto Secundário:** `text-gray-400` / `text-gray-500`.
- **Accent Green:** `#00FF94` (Bio Green - Símbolo de Verificação/Sucesso).
- **Accent Blue:** `#00A3FF` (Electric Blue - Tech/Processing).
- **Glass Panel:** `bg-white/3` com `backdrop-blur-md` e bordas sutis.

### Formas & Componentes
- **Botões:** Mistura de Retangulares com bordas levemente arredondadas (`rounded`) e Pílulas para tags.
- **Input/Forms:** Glassmorphism.
- **Cards:** Glass Panel com efeitos de hover (Gret glow border).

### Tipografia
- **Títulos (Serifa):** `font-serif` (Playfair Display) - Autoridade.
- **Corpo (Sans):** `font-sans` (Manrope) - Legibilidade.
- **Dados/Tech (Mono):** `font-mono` (JetBrains Mono) - Labels técnicos e dados.
- **Destaques:** Uso de `tracking-widest` e Uppercase em subtítulos.

## 3. Estado Atual dos Arquivos
- **Frontend:**
  - `frontend/app/page.tsx`: **Atualizado** (Elite Dark Mode Component).
  - `frontend/app/globals.css`: **Atualizado** (Dark Theme + Keyframes).
  - `frontend/app/layout.tsx`: **Configurado** (Fontes + Dark Body).
  - `frontend/components/`: *Status Incerto* (Componentes antigos "Clean" ainda existem mas não estão em uso na Home atual).
- **Backend:** Estável (FastAPI + SQLite).

## 4. Roadmap Imediato (Fase 4)
1.  **Dashboard UI Synchronization:** O Painel de Membros precisa seguir o mesmo Design System "Elite Dark" da Home.
2.  **Assessment Engine:** Integração com o novo frontend.
3.  **Refatoração:** Quebrar o `page.tsx` monolítico em componentes menores (`Hero`, `Benefits`, `Methodology`) dentro de `frontend/components/elite/`.

## 5. Histórico de Versões
- **v1.0:** MVP Estático (FormSubmit).
- **v2.0:** Dark Mode Premium (Next.js + 3D).
- **v3.0:** Light Mode Material (Enterprise Focus).
- **v4.0:** Elite Dark Mode (Glassmorphism & High-End Animations) - **ATUAL**.
