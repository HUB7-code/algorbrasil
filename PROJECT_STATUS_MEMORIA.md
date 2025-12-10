# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 09/12/2025 - 21:43
> **Status Geral:** **HOME PAGE "ELITE UX" COMPLETADA** 🎨 | Backend Pronto para SaaS | Foco Total em Dashboard.
> **Foco Atual:** Desenvolvimento do **Motor de Avaliação (Assessment Engine)** e Dashboard do Membro.

## 1. Pivot Estratégico (A Nova Direção)
Abandonamos o site institucional estático para construir uma **Plataforma de Autoridade** baseada no conceito de "Inteligência Viva".
- **Objetivo:** O site deixa de ser vitrine e vira ferramenta de pré-vendas/consultoria.
- **Arquitetura:** SaaS-first. O "Associe-se" vira cadastro direto no sistema; a Home vira grade de decisão para 4 Personas (Estrategista, Guardião, Construtor, Protetor).

## 2. Decisões de Design (Identidade "Inteligência Viva")
- **Conceito:** Bio-Digital Convergence (Organismo Vivo + Precisão Técnica).
- **Paleta V2:**
  - **Fundo:** Deep Navy (`#0A1A2F`) com Aurora Animation (CSS puro para performance).
  - **Ação:** Bio-Luminescent Green (`#00FF94`).
  - **Tech:** Electric Blue (`#00A3FF`).
- **UI:** **Glassmorphism Avançado** (Painéis translúcidos, overlays de grid, gradientes sutis).
- **Tipografia V2:**
  - **`Playfair Display`** (Títulos): Evoca autoridade de "Consultoria Boutique" e "Carta Magna".
  - **`Orbitron`** (Tech): Usado apenas em detalhes futuristas (Badges, Status).
  - **`IBM Plex Mono`** (Dados): Para transmitir precisão técnica.

## 3. Estrutura Técnica (Stack V2)
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.
  - Componentes Ricos: `MaturityRadar.tsx`, `Scene3D.tsx` (Fallback CSS), `MethodologySection.tsx` (Grid 2-col).
- **Backend:** FastAPI (Python) + SQLite.
  - Tabela `Assessments` criada para suportar o motor de diagnóstico.
  - Auto-migration configurada.
- **Infraestrutura:** Docker Compose gerenciando `backend`, `frontend` e `web` (Nginx).

## 4. Histórico de Conquistas (Checklist Recente)
- [x] **SMTP:** Implementado serviço de e-mail (Brevo) no Backend.
- [x] **Design System V2 (Elite UX):**
  - Implementação da tipografia `Playfair Display`.
  - Refinamento visual com glassmorphism e animações CSS (Aurora).
  - Ajuste de layout responsivo (Scroll Indicator, Persona Grid).
- [x] **Home Completada "Inteligência Viva":**
  - **Hero:** Título gradiente, Fundo Aurora, Status Bar e Logo Centralizada.
  - **Metodologia:** Componente `MaturityRadar` interativo (não estático).
  - **Conteúdo:** Insights de Governança e Benefícios Institucionais integrados.
- [x] **Infraestrutura SaaS:**
  - **Backend:** Schema DB pronto para Assessments (Tabelas e Relacionamentos).
  - **Auth:** Fluxo (Register -> Login -> Dashboard) funcional.

## 5. Próximos Passos (Roadmap de Execução: Fase 3 - O Diagnóstico)
- [ ] **Trust Bar:** Adicional visual de régua de conformidade (ISO, EU AI Act).
- [ ] **Motor de Avaliação (Assessment Engine):**
  - Criar página `/dashboard/assessments/new`.
  - Implementar Wizard de Diagnóstico (Perguntas interativas).
  - Lógica de cálculo de Maturidade e geração de "Parecer Preliminar".
- [ ] **Dashboard do Membro (Cockpit):**
  - Visualizar Assessments em andamento.
  - Acesso a conteúdos exclusivos (Manual do Auditor).

## 6. Arquivos Chave Atuais
- `frontend/app/page.tsx` (Home Finalizada - Layout Safe).
- `frontend/components/MaturityRadar.tsx` (Novo Componente Visual).
- `frontend/components/MethodologySection.tsx` (Grid de Metodologia).
- `frontend/components/Scene3D.tsx` (Fundo Aurora).
- `backend/app/models/assessment.py` (Modelo de Dados SaaS).
