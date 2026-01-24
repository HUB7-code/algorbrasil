# TECHNICAL SPECIFICATION: ALGOR TRUST HUB (v5.1)

> **Status:** APPROVED
> **Target Architecture:** Decentralized Governance Infrastructure
> **Key Pivot:** Shift-Left + Hash Chaining + Risk-as-a-Service

---

## 1. VISION & STRATEGY
The system pivots from a "Consultancy Tool" to an "Infrastructure for AI Reliability".
We are building the "SWIFT Network" for AI Governance: a secure, immutable messaging system for AI Risk.

### Core Pillars
1.  **Shift-Left:** Governance moves to CI/CD. Developers get feedback *before* deploy.
2.  **Edge Telemetry:** Latency-zero monitoring. The `ALGOR Edge Agent` runs locally and sends async telemetry to the Hub.
3.  **Anti-Poisoning:** Hash Chaining ensures the `ARI` (ALGOR Risk Index) cannot be tampered with by the client to lower insurance premiums.

---

## 2. ARCHITECTURE OVERVIEW

### 2.1 The "Walled Garden" (SaaS)
*   **Domain:** `app.algor.pt` (Conceptual isolation).
*   **Security:** High-security zone. MFA required. No public access.
*   **Data Isolation:** Strict tenant separation (Organization ID) enforced at API level.

### 2.2 Components
1.  **Discovery Scanner (Phase 1 Engine):**
    *   *Input:* Cloud Accounts (AWS/Azure), Code Repos, Network Logs.
    *   *Function:* Detects "Shadow AI" (undeclared usage of OpenAI keys, PyTorch libs).
    *   *Output:* "Shadow AI Inventory" & Initial Risk Map.
2.  **Regulatory AI Co-pilot (CI/CD Scanner):**
    *   *Input:* GitHub/GitLab Repositories.
    *   *Function:* Scans specific files (`prompts.py`, `model_cards.md`) for compliance anti-patterns.
    *   *Output:* "Build Pass/Fail" signal based on ISO 42001 rules.
2.  **ALGOR Edge Agent (Telemetry):**
    *   *Input:* LLM Calls (OpenAI/Azure wrappers).
    *   *Function:* Intercepts request/response, calculates hash locally, sends metadata to Hub asynchronously.
    *   *Benefit:* Zero added latency to the client's application.
3.  **ARI Engine (Actuarial Risk Index):**
    *   *Input:* Governance Traces + Policy Violations + Operational Uptime.
    *   *Function:* Calculates a unified `Risk Score` (0-1000).
    *   *Output:* Improving score lowers insurance premiums.

---

## 3. DATA INTEGRITY: HASH CHAINING
To guarantee that a company didn't delete "bad logs" to look safer:
*   Each `GovernanceTrace` record must contain a `previous_hash` field.
*   `trace[n].hash = SHA256(trace[n].data + trace[n-1].hash)`
*   This creates a blockchain-like immutable ledger in the centralized database.

---

## 4. USER JOURNEYS

### 4.1 Corporate User (The Client)
*   **Goal:** "Show me I'm safe to deploy."
*   **Dashboard:**
    *   *Health Score:* Real-time risk index (aligned with ISO 42001).
    *   *Discovery:* "Found 3 new undeclared AI models in Marketing Dept".
    *   *Actions:* "Trigger AIA (Avaliação de Impacto Algorítmico)".

### 4.2 Consultant (The Partner)
*   **Goal:** "Manage 10 clients efficiently."
*   **Feature:** Multi-tenant Switcher.
*   **Task:** "Human Ratification" (ISO 42001: 9.3). The consultant reviews flagged interactions and confirms/rejects the AI verdict. This supports the **Step 5 (Monitoring & Improvement)** of the methodology.

---

## 5. ROADMAP

### PHASE 1: MVP (Trust Hub Alpha)
*   [ ] **Secure Auth:** JWT + Organization Isolation.
*   [ ] **Discovery Scanner (MVP):** Script to scan codebase/logs for "Shadow AI" signatures (Step 1).
*   [ ] **Governance Policies:** Templates for Step 2 (Strategy & Structure).

### PHASE 2: OPERATIONALIZATION
*   [ ] **Edge Agent:** Async queue for trace submission.
*   [ ] **Drift Monitor:** Compare production stats vs baseline.
*   [ ] **Immutability:** Implement Hash Chaining in `GovernanceTrace`.

### PHASE 3: FINANCIALIZATION
*   [ ] **ARI Engine:** Actuarial formulas.
*   [ ] **Ratification Workflow:** UI for consultants to label data.

---

## 6. UX GUIDELINES
*   **Style:** "Bloomberg Terminal meets Cyber-Security". Dark mode default. High density data.
*   **No Fluff:** Remove marketing animations from the SaaS area. Focus on metrics.
