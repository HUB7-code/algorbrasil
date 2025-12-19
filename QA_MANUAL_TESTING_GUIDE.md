# MANUAL DE TESTES GLOBAL (E2E) - ALGOR BRASIL v9.5
> **Objetivo:** Roteiro completo para validação da plataforma "Growth AI Compliant", cobrindo o site institucional (Dual Funnel), Core SaaS (Multi-tenant) e LMS (Academia).

## 🚀 PREPARAÇÃO
1. **Backend:** Certifique-se que o Uvicorn está rodando na porta `8000`.
2. **Frontend:** Certifique-se que o Next.js está rodando na porta `3000`.
3. **Reset (Opcional):** Para teste limpo, considere limpar o `localStorage` ou usar aba anônima.

---

## 🟢 FASE 1: EXPERIÊNCIA DO VISITANTE (DUAL FUNNEL)
*O objetivo é validar a segmentação de público e a primeira impressão visual.*

### 1.1. Home Page (`/`)
- [ ] **Visual Check:** O "Globo Neural" (Fibonacci Sphere) está girando suavemente no centro? O fundo é Deep Navy limpo (sem artefatos)?
- [ ] **Segmentação Claras:** Existem duas chamadas de ação distintas?
  - "Para Empresas" (Mitigar Riscos)
  - "Para Profissionais" (Certificação/Associação)
- [ ] **Prova Social:** O carrossel de logos/parceiros está rodando?

### 1.2. Funil Corporativo (Wizard de Risco)
- [ ] **Acesso:** Clicar em "Diagnóstico de Risco" ou similar.
- [ ] **Wizard:** Navegar pelas perguntas (Provenance, Consent, Brand Safety).
- [ ] **Resultado:** Ao final, o sistema pede o e-mail e gera um "Score Preliminar"?

---

## 🟡 FASE 2: ONBOARDING & ORGANIZAÇÃO (SAAS CORE)
*O objetivo é validar a arquitetura Multi-tenant e criação de conta.*

### 2.1. Registro (`/register`)
- [ ] **Fluxo:** Criar uma nova conta (ex: `user_test_[timestamp]@algor.com`).
- [ ] **Tipo de Perfil:** O sistema pergunta se é "Corporativo" ou "Profissional"? Escolha **Corporativo**.

### 2.2. Criação de Organização (CRÍTICO)
- [ ] **Modal de Criação:** Após o login, se não houver organização, o "CreateOrganizationModal" deve abrir?
- [ ] **Ação:** Criar uma organização chamada "Empresa Teste Ltda".
- [ ] **Validação:** Após criar, o nome da organização aparece no topo da sidebar ou header?

---

## 🔵 FASE 3: OPERAÇÃO DE GOVERNANÇA (FEATURES)
*O objetivo é testar as ferramentas de consultoria técnica.*

### 3.1. Dashboard (`/dashboard`)
- [ ] **Visão Geral:** Os cards de KPIs (Growth Viability, Lead Risk) carregam sem erro?

### 3.2. Inventário de IA (`/dashboard/inventory`)
- [ ] **Cadastro:** Clicar em "Novo Ativo" (ou "+ IA").
- [ ] **Formulário:** Cadastrar um modelo fictício (ex: "Chatbot de Atendimento GPT-4").
- [ ] **Listagem:** O item aparece na lista com status "Em Análise"?

### 3.3. Matriz de Riscos (`/dashboard/risks`)
- [ ] **Novo Incidente:** Registrar um risco vinculado ao ativo criado acima.
- [ ] **Cálculo:** O sistema calcula a severidade (Probabilidade x Impacto) corretamente?

---

## 🟣 FASE 4: ACADEMIA & SEGURANÇA (LMS)
*O objetivo é validar a entrega de valor educacional e proteção de IP.*

### 4.1. Sala de Aula (`/dashboard/classroom`)
- [ ] **Player de Vídeo:** Acessar uma aula de vídeo. O layout é "Theater Mode" (foco total)?
- [ ] **Secure PDF Viewer:** Acessar um material de leitura.
  - [ ] **Marca D'água:** O overlay "CONFIDENTIAL" está visível e rotacionado?
  - [ ] **Bloqueio:** Tentar selecionar/copiar texto (deve estar bloqueado).
  - [ ] **Rastreio:** O rodapé mostra o IP e ID do usuário logado?

---

## 🔴 FASE 5: ADMIN & INFRA (OPCIONAL)
### 5.1. Admin Panel
- [ ] Acessar `/admin` (requer conta superuser) para ver se lista os usuários e organizações criadas.

---

> **Critério de Sucesso:** Se o fluxo 1 a 4 for completado sem erros 500 ou telas brancas, o Release Candidate 9.5 está aprovado.
