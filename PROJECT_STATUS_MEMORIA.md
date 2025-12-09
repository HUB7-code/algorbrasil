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
  - Alertas de Admin e Boas-vindas funcionando.
  - Correção de autenticação SMTP (Login correto vs Email do perfil).
- [x] **Limpeza Radical:** Removido todo o site estático legado (`index.html`, `js/`, `css/` antigos).
- [x] **Setup Frontend:** Inicializado projeto Next.js 14 com TypeScript.
  - Restaurados arquivos de configuração (`package.json`, `tsconfig.json`, `next.config.mjs`).
- [x] **Design System:** Configurado Tailwind com as cores da nova marca e fontes do Google.
- [x] **Infraestrutura SaaS:**
  - Adicionado serviço `frontend` no `docker-compose.yml`.
  - Configurado Nginx para proxy reverso da porta 80 -> 3000 (Next.js).
- [x] **Home V2 (Visual):** Implementado `HeroScene.tsx` (3D Particles) e nova grade de decisão das 4 Personas.

## 5. Próximos Passos (Roadmap de Execução)
- [ ] **Instalação:** Rodar `npm install` no container/frontend para baixar dependências.
- [x] **Cadastro Real (SaaS):** Criada página de Registro (`/register`) integrada a API `/api/v1/signup`.
  - Formulário completo com validação e Design System.
  - Campos: Nome, Email, Telefone, Senha.
- [ ] **Console do Membro:** Recriar o Dashboard antigo dentro do Next.js (protegido por rota privada).
- [ ] **Console do Membro:** Recriar o Dashboard antigo dentro do Next.js (protegido por rota privada).
- [ ] **Integração:** Conectar formulários do Next.js com o Backend Python existente.

## 6. Arquivos Chave Atuais
- `frontend/app/page.tsx` (Nova Home).
- `frontend/tailwind.config.ts` (Design System).
- `backend/app/services/email_service.py` (Motor de E-mail).
- `ARCHITECTURE_SITEMAP.md` (Mapa da nova estrutura).
- `Modelagem de Site para Consultoria de IA.md` (Documento Estratégico).
