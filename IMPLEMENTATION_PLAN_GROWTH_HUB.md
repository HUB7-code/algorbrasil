# PLANO DE EXECUÇÃO TÉCNICA: ALGOR TRUST HUB (v5.1)
> **Status:** EM EXECUÇÃO (Pivot v5.1)
> **Foco:** Integridade de Dados, Hash Chaining e Edge Telemetry.

Este documento detalha o step-by-step técnico para transformar o backend atual na infraestrutura descentralizada do Trust Hub.

---

## 🏗️ FASE 1: A CADEIA DE CONFIANÇA (Hash Chaining)
**Objetivo:** Garantir que o histórico de auditoria seja matematicamente imutável (Anti-Poisoning), permitindo a precificação de seguros.

### 1.1 Migração de Schema (Database)
- [ ] **Atualizar Modelo `GovernanceTrace` (`backend/app/models/governance.py`)**
    - Adicionar campo `previous_hash` (String, Indexed, Nullable para o bloco gênesis).
    - Adicionar campo `signature_id` (Assinatura digital do Edge Agent, se aplicável).
    - Garantir índice único composto se necessário para performance de busca sequencial.

### 1.2 Lógica de Encadeamento (The Chain Logic)
- [ ] **Atualizar Endpoint `POST /guardrail` (`backend/app/api/endpoints/governance.py`)**
    - Antes de inserir um novo trace:
        1. Buscar o **último** trace desta organização (`organization_id`).
        2. Ler o hash desse último trace (`last_trace.hash` ou calculado na hora).
        3. Calcular o hash do trace atual combinando (Payload Atual + Hash Anterior).
        4. Salvar o novo trace com este hash composto.
    - **Resultado:** Se alguém deletar uma linha no meio do banco, todos os hashes subsequentes quebrarão, alertando a auditoria.

### 1.3 Verificador de Integridade (Audit Tool)
- [ ] **Criar Script `verify_chain_integrity.py`**
    - Script administrativo que percorre a cadeia de uma organização e valida se `Hash(N) == Calculate(Data(N) + Hash(N-1))`.

---

## 🕵️ FASE 2: TELEMETRIA DESCENTRALIZADA (Edge Agent)
**Objetivo:** Remover a latência da API síncrona. O cliente chama a LLM direto, o agente "observa" e reporta depois.

### 2.1 Protótipo do Agente (Python SDK)
- [ ] **Criar pasta `sdks/python/algor_edge`**
    - Decorator `@algor.monitor` para funções Python.
    - Captura input/output.
    - **Cálculo de Hash Local:** O agente calcula o hash na borda.
    - **Envio Assíncrono:** Usa `asyncio` ou threads para enviar para `app.algor.pt/api/v1/telemetry` sem bloquear a thread principal da aplicação do cliente.

### 2.2 Endpoint de Telemetria Assíncrona
- [ ] **Criar `POST /api/v1/telemetry`**
    - Recebe batches de logs.
    - Valida assinaturas.
    - Insere na Cadeia de Confiança (Hash Chaining).

---

## 🔐 FASE 3: SEGURANÇA E ISOLAMENTO (SaaS Hardening)
**Objetivo:** Proteger o "Walled Garden".

### 3.1 Autenticação Robusta
- [ ] **Revisar `check_admin.py` e Auth Middleware**
    - Garantir que apenas Tokens válidos com privilégio de `write` possam postar telemetria.

### 3.2 Isolamento de Rotas
- [ ] **Refatorar Routers**
    - Separar rotas públicas (Landing Page, Widgets) de rotas privadas (Dashboard, API de Escrita).

---

## ✅ Checklist de Entrega Imediata (Sprint Atual)
1. Modificar `GovernanceTrace` com `previous_hash`.
2. Implementar a lógica de cálculo de hash encadeado no endpoint existente.
3. Testar a imutabilidade com script de verificação.
