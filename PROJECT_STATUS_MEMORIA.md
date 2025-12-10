# MEMÓRIA DO PROJETO - ALGOR BRASIL (SAVE STATE)
> **Última Atualização:** 10/12/2025 - 12:00
> **Status Geral:** **BACKEND BLINDADO (LGPD/AUDIT) & DB EVOLUÍDO** 🛡️
> **Versão:** 5.0 (Fortaleza Digital & Dual Funnel Model)

## 1. Pivot de Infra: "Operação Fortaleza Digital"
O foco shiftou do visual para a **Segurança e Infraestrutura**, preparando o terreno para o modelo SaaS.
- **Conceito:** "Privacy by Design" e "Responsabilidade de Dados".
- **Compliance:** 100% Alinhado ao `LGPD-Manual-Operacional.md`.

## 2. Design System Cheat Sheet (Referência Frontend)
Mantido o visual **Elite Dark/Glassmorphism** definido na v4.0.
- **Frontend:** Next.js + Tailwind + Three.js
- **Backend:** FastAPI + SQLAlchemy + Pydantic

## 3. Estado Atual dos Arquivos (BACKEND REVAMP)
- **Segurança (NEW):**
  - Criptografia AES-256 (Fernet) para dados PII (`phone`, `cpf`).
  - logs de Auditoria (`audit_logs`) para rastreabilidade total (Signup/Create Profile).
  - Testes de Conformidade (`tests/security_compliance_test.py`) aprovados com ⭐.
- **Banco de Dados (Evoluído):**
  - **Dual Funnel Models:** Tabelas separadas para `CorporateProfile` (Empresas) e `ProfessionalProfile` (Auditores).
  - **Integridade:** Constraints garantem que usuário seja ou Empresa ou Profissional.
  - **Endpoints:** API `/profiles` pronta para o Onboarding.

## 4. Roadmap Imediato (Fase 2 - Integração)
Seguindo o documento **Modelagem de Site para Consultoria de IA.md**:
1.  👉 **Frontend LGPD:** Implementar componentes visuais de consentimento (`ConsentCheckbox`, `LegalTooltip`).
2.  **Onboarding UI:** Criar o fluxo visual de escolha "Sou Empresa" vs "Sou Auditor".
3.  **Central de Ferramentas:** Conectar os "Lead Magnets" ao novo banco seguro.

## 5. Histórico de Versões
- **v1.0:** MVP Estático (FormSubmit).
- **v2.0:** Dark Mode Premium (Next.js + 3D).
- **v3.0:** Light Mode Material (Enterprise Focus).
- **v4.0:** Elite Dark Mode (Glassmorphism Restoration).
- **v4.1:** Elite Responsive (Mobile Menu + Methodology).
- **v5.0:** **Fortaleza Digital (Backend Security + Dual Funnel DB) - ATUAL**.
