# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 09/12/2025
> **Status Geral:** **PIVOT ESTRATÉGICO PARA SAAS (Inteligência Viva)** 🧠 | Backend SMTP Ativo | Frontend Next.js em Construção.
> **Foco Atual:** Criar a nova plataforma baseada em "Modelagem de Site para Consultoria de IA" usando Stack Moderna (Next.js 14).

## 1. Pivot Estratégico (A Nova Direção)
Abandonamos o site institucional estático para construir uma **Plataforma de Autoridade** baseada no conceito de "Inteligência Viva".
- **Objetivo:** O site deixa de ser vitrine e vira ferramenta de pré-vendas/consultoria.
- **Arquitetura:** SaaS-first. O "Associe-se" vira cadastro direto no sistema; a Home vira grade de decisão para 4 Personas (Estrategista, Guardião, Construtor, Protetor).

## 2. Decisões de Design (Identidade "Inteligência Viva")
- **Conceito:** Bio-Digital Convergence.
- **Paleta:**
  - **Fundo:** Deep Navy (`#0A1A2F`) - Substitui o preto absoluto.
  - **Ação:** Bio-Luminescent Green (`#00FF94`).
  - **Tech:** Electric Blue (`#00A3FF`).
- **UI:** **Glassmorphism** (Painéis translúcidos) para representar "Caixa Branca" (Transparência).
- **Tipografia:** 'Orbitron' (Display), 'Inter' (Corpo), 'IBM Plex Mono' (Dados).

## 3. Estrutura Técnica Nova (Stack V2)
- **Frontend:** **Next.js 14 (App Router)** + TypeScript + Tailwind CSS.
  - Substitui todo o HTML/JS estático antigo.
  - Rodando em container Docker dedicado (`frontend:3000`).
- **Backend:** FastAPI (Python) + SQLite (Mantido e Expandido).
  - Integrado com **SMTP (Brevo)** para envio real de e-mails.
  - Auth JWT mantido.
- **Infraestrutura:** Docker Compose gerenciando `backend` (API), `frontend` (Next.js) e `web` (Nginx Proxy).

## 4. Histórico de Conquistas (Checklist Recente)
- [x] **SMTP:** Implementado serviço de e-mail (Brevo) no Backend.
- [x] **Setup Frontend:** Inicializado projeto Next.js 14 com TypeScript e Docker.
- [x] **Design System:** Configurado Tailwind, Fontes e Cores "Inteligência Viva".
- [x] **Home Completada (Fase 1):**
  - **Hero:** Título de impacto, Animação 3D e **Logo Centralizada**.
  - **Grade de Personas:** Auto-segmentação (Board, Risco, Tech, Legal).
  - **Sala de Máquinas:** Seção de Metodologia animada (Processo de Fluxo de Dados).
  - **Compliance:** Rodapé com **Logo Oficial**, badges de transparência e links de governança.
- [x] **Infraestrutura:** Script `deploy.sh` criado para automação de updates na VPS.

## 5. Próximos Passos (Roadmap de Execução: Fase 2 - O Motor SaaS)
- [ ] **Cadastro (Register):** Finalizar testes da página `/register` e sua integração com a API (`/signup`).
- [ ] **Console do Membro (Dashboard):**
  - Implementar layout com Sidebar (Menu Lateral).
  - Criar "Cockpit de Governança" (Widgets de Status).
  - Visualizar Nível de Maturidade.
- [ ] **Login:** Criar página de login para acesso de membros existentes.

## 6. Arquivos Chave Atuais
- `frontend/app/page.tsx` (Home Finalizada).
- `frontend/components/MethodologySection.tsx` (Sala de Máquinas).
- `frontend/components/Footer.tsx` (Rodapé Compliance).
- `deploy.sh` (Automação de Deploy).
- `backend/app/api/auth.py` (API de Cadastro/Login).
