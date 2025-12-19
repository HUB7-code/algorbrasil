# PLANO DE IMPLEMENTAÇÃO: GROWTH IA GOVERNANCE HUB
> **Status:** Em Planejamento
> **Baseado em:** `requisitos-GrowthIA-Hub-Governanca.md` e `Manual_Auditor_IA_Completo.md`

Este documento guia a construção da infraestrutura de governança "System of Action" da ALGOR.

---

## 🏗️ FASE 1: Fundação Backend (Middleware & Vault)
**Objetivo:** Criar a estrutura invisível que intercepta, audita e registra as ações das IAs dos clientes (O "Lock-in" técnico).

### 1.1 Modelagem de Dados (The Evidence Vault)
- [ ] **Criar Modelo `GovernanceTrace` (`backend/app/models/governance.py`)**
    - Tabela para armazenar logs imutáveis de inferência.
    - Campos: `input_hash`, `output_hash`, `pii_detected` (bool), `policy_version`, `model_id`, `latency_ms`.
    - Relacionamento: Linkado a `Organization` e `AIAsset`.

### 1.2 Contratos de API (Pydantic Schemas)
- [ ] **Criar Schemas (`backend/app/schemas/governance.py`)**
    - `GuardrailRequest`: Payload que o cliente envia (prompt + metadados).
    - `GuardrailResponse`: Veredito da ALGOR (`ALLOWED`, `FLAGGED`, `BLOCKED`) + explicação.

### 1.3 API Gateway (Ethical Guardrail)
- [ ] **Criar Router (`backend/app/api/endpoints/governance.py`)**
    - Endpoint: `POST /api/v1/governance/guardrail`
    - Lógica (Mock Inicial): Receber request, gerar hashes, salvar no DB e retornar "mock verdict".
- [ ] **Registrar Router em `main.py`**

---

## 🖥️ FASE 2: Frontend "XAI Widget" (Transparência)
**Objetivo:** "Direito à Explicação" via script injetável.

- [ ] **Criar Componente `TranspacencyWidget` (React)**
    - Mini-badge flutuante ("Secured by ALGOR").
    - Ao clicar: Mostra metadados da governança (sem expor segredos industriais).
- [ ] **Gerar Snippet de Integração**
    - `<script src="https://algor.com/widget.js?token=XYZ">`

---

## 📊 FASE 3: Dashboard de Growth & Metrics (O Valor para o CFO)
**Objetivo:** Provar ROI da governança.

- [ ] **Implementar Métricas no Backend**
    - Calcular `CICR` (Taxa de conversão segura).
    - Calcular `Blindagem` (Quantos requests tóxicos foram bloqueados).
- [ ] **Nova Página no Dashboard Frontend**
    - `/dashboard/growth-hub`
    - Gráficos de barras (Bloqueios x Aprovações).

---

## 🤖 FASE 4: Automação Jurídica (Playbooks)
**Objetivo:** Gerar documentos ISO 42001 automaticamente.

- [ ] **Gerador de RNC-IA**
    - Botão "Gerar Relatório de Incidente" quando um Guardrail falha.

---

## ✅ Próximos Passos (Imediato)
Aguardando aprovação para iniciar execução da **FASE 1**.
