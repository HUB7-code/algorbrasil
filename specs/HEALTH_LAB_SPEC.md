# 🏥 HEALTH AI LAB SPEC - ALGOR BRASIL

**Documento de Especificação Técnica - Módulo de Auditoria em Saúde**
**Status:** DRAFT (Aprovado para Implementação)
**Data:** 03/01/2026
**Responsável:** Astra & Antigravity

---

## 1. Visão Geral
Plataforma de Diagnóstico Operacional para o setor de Saúde, focada em auditar IAs de terceiros (clínicas, hospitais) em tempo real ("15-minute meeting"). A plataforma deve demonstrar falhas de XAI, vazamento de dados (Shadow AI) e falta de conformidade ISO 42001.

---

## 2. Módulo XAI: O "Interrogador de Logs" (Zero Retention)

**Engenharia:**
- **Stack:** FastAPI + Pandas (In-Memory Processing).
- **Endpoint:** POST `/api/v1/lab/xai/audit` (UploadFile CSV/JSON).
- **Output:** JSON com Score de Transparência (0-100) e Risk Level.

**Regras de Negócio (Score):**

### Critério de "Lixo" (High Risk / Score < 30)
- **Estrutura:** CSV com colunas opacas (`f1`, `f2`, `feature_X`) ou "Caixa-Preta" apenas com inputs brutos e predição (`id_paciente`, `prediction`).
- **Sinalizadores:** Ausência de metadados de erro, pesos ou atribuições estatísticas.

### Critério de "Ouro" (Compliant / Score > 80)
- **Estrutura:** Presença de colunas explicativas explícitas.
- **Keywords Obrigatórias (Regex):**
  - `^shap_.*` (SHAP Values)
  - `^lime_.*` (LIME Explanations)
  - `^contribution_.*`
  - `confidence_interval`
  - `feature_impact_.*`

**Visualização (Frontend):**
- Grafico de Radar: Transparência vs Acurácia (simulada) vs Robustez.
- Alerta Vermelho: "Modelo Caixa-Preta Detectado - Risco Jurídico Imediato".

---

## 3. Módulo Shadow AI: "Simulador de Exposição"

**Engenharia:**
- **Engine:** Microsoft Presidio (NLP) + RegEx Customizada.
- **Execução:** Container ou Lib interna (decisão: Lib interna inicial).
- **UX:** Client-side "Scanning Effect" (Animação sobre o texto).

**Entidades Críticas (Health Focus):**
1.  **Identificadores Clínicos:**
    - CRM Médico (Padrão: `CRM/[UF] \d{4,8}`) - **Custom Recognizer Obrigatório**.
    - RQE (Registro de Qualificação de Especialista).
    - Termos: "Prontuário", "Registro de Paciente".
2.  **Dados de Saúde (PHI - Protected Health Information):**
    - CID-10 (Padrão: `[A-Z]\d{2}(\.\d)?`).
    - Medicamentos controlados.
    - Resultados (ex: "Positivo para", "Níveis de Hemoglobina").
3.  **PII Genérico (LGPD):**
    - CPF, Nome, Data de Nascimento, Telefone, E-mail.

---

## 4. Módulo ISO 42001: "Radar de Maturidade"

**Engenharia:**
- **Banco de Dados:** PostgreSQL (JSONB).
- **Modelo:** `Assessment` com campo `answers` dinâmico.
- **Modelo:** `Assessment` com campo `answers` dinâmico.
- **Output:** PDF Report Engine V5.1 ("Titan Edition").

**Especificações do Relatório PDF (Titan):**
1.  **Header V5.1:**
    - Altura: 40mm (Barra Preta) + 35mm (Dados).
    - Logo: Renderização Sanitizada (Canvas) com altura 32mm (2X Size).
    - Branding: "ALGOR" (White Orbitron) + "BRASIL" (Green Orbitron #00FF94).
2.  **Status Digital:**
    - Box flutuante com feedback semântico ("APROVADO" Verde / "ALTO RISCO" Vermelho).
    - Timestamp de milissegundos para prova de autoria.
3.  **Layout:**
    - "Bento Grid" para métricas técnicas.
    - Gauge Chart vetorial (desenhado via código) para Score Geral.
    - Seção de Contexto Clínico com fundo colorido condicional.
    - Footer com "Respiro" visual (6mm padding).

**Questionário Base (Pesos Calibrados):**

| ID | Categoria | Pergunta | Peso | Ref. Legal |
|----|-----------|----------|------|------------|
| q1 | Governança | Existe um responsável (humano) nomeado pela supervisão das decisões da IA? | 3 | PL 2338 Art. 17 |
| q2 | Transparência | O sistema gera logs de explicabilidade (XAI) acessíveis para auditoria externa? | 5 | PL 2338 Art. 20 |
| q3 | Dados | Há evidência de testes de viés (fairness) para diferentes etnias e faixas etárias? | 4 | PL 2338 Art. 18 |
| q4 | Segurança | O modelo é protegido contra ataques adversariais ou envenenamento de dados? | 3 | ISO A.11.2 |
| q5 | Privacidade | A IA utiliza dados sensíveis (saúde/biometria) sem uma base legal documentada no RIPD? | 5 | LGPD Art. 11 |

---

## 5. Infraestrutura & Segurança

- **Database:** Migração para PostgreSQL 16 (Suporte a JSONB).
- **Rate Limiting:**
  - `SlowAPI` configurado.
  - Whitelist: IP do Edisio.
  - Public: 5 req/min (Shadow AI).

**Roadmap de Implementação:**
- [x] Docker Compose com PostgreSQL.
- [x] Dependências Backend (psycopg2, asyncpg).
- [x] Backend Core Logic (XAIService) + Testes TDD.
- [ ] Criar endpoint `/xai`. (Já criado, falta integrar no frontend)
- [ ] Integrar Microsoft Presidio.
- [ ] Modelagem `Assessment` com JSONB.

---

## 6. UX/UI Requirements ("The Expert Pause")

**Estratégia:** "Teatro de Auditoria". O sistema deve simular um processamento profundo para valorizar a complexidade da análise ("A Pausa do Especialista").

**Status Loading Sequence (~3s total):**
Ocorrerá em overlay sobre um gráfico desfocado (blur/noise):
1.  *"Interrogando pesos sinápticos e vetores de explicabilidade (XAI)..."*
2.  *"Mapeando aderência ao Art. 20 da LGPD & requisitos do PL 2338..."*
3.  *"Auditando integridade de PHI (Personal Health Information) e entropia de dados..."*
4.  *"Sintetizando Mapa de Calor de Risco e Veredito de Governança..."*

**Reveal:**
- O blur desaparece ("Snap focus").
- Cores Neon Green (Low Risk) ou Electric Red (High Risk) "explodem" na tela.

## 7. Especificação de Relatórios & Paleta Oficial (V17.9)

#### 7.1 Relatório Profissional (PDF)
O sistema deve gerar relatórios em PDF nativo via `jspdf`, não screenshots.

**Estrutura Obrigatória:**
1.  **Header:**
    *   Background: `#0A1A2F` (Deep Navy)
    *   Logo: Carregada dinamicamente
    *   Título: "ALGOR BRASIL" em `#00FF94`
    *   Metadados: Timestamp de geração
2.  **Resumo Executivo:**
    *   Score em destaque (tamanho 40pt+)
    *   Caixa de status com cor semântica (Verde/Vermelho)
3.  **Análise Detalhada:**
    *   Lista de indicadores auditados
    *   Seção "O que significa?" (Educativa)
    *   Seção "Ação Recomendada" (Consultiva)
4.  **Conclusão:** Texto dinâmico baseado no veredito.

#### 7.2 Paleta de Cores Oficial (Health Lab)
Usar estritamente estas cores para garantir consistência "Power BI Premium":

| Cor | Hex | Uso Principal |
|-----|-----|---------------|
| **Deep Navy** | `#0A1A2F` | Backgrounds, Headers, Cards (com opacidade) |
| **Neon Green** | `#00FF94` | Sucesso, Score > 75, Tendência Alta, Ícones |
| **Neon Red** | `#FF0055` | Risco, Score < 40, AlertTriangle, Erro |
| **Electric Cyan**| `#00A3FF` | Acentos, Gráficos, Botões Primários, Subtítulos |
| **Cyber Purple** | `#9945FF` | Baseline, Entropia, Elementos Secundários |
| **Slate Gray** | `#64748B` | Textos de apoio, Eixos de gráficos, Bordas sutis |

---
*Gerado por Antigravity para Astra - ALGOR BRASIL*
