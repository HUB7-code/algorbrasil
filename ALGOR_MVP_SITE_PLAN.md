# ALGOR BRASIL — Plano de Finalização do Site MVP

> **Criado em:** 01/03/2026  
> **Status:** 🟡 PLANEJADO — Prioridade Pós-N7 ou em Paralelo  
> **Domínio:** `algorbrasil.com.br` (site existente, refatoração da homepage)  
> **Design:** Dark Navy atual — MANTIDO ✅

---

## 🎯 OBJETIVO DO SITE ALGOR (MVP)

O site da ALGOR não vende software. Ele **dita o padrão de mercado** e gera credibilidade institucional para a N7 Consultoria.

**Tom:** "Padrão-Ouro Internacional" — clima IBM Watson / fóruns globais de tecnologia  
**Função:** Educar o mercado → Capturar e-mails → Direcionar leads comerciais para N7

---

## 🗺️ ESTRUTURA DA HOMEPAGE (5 BLOCOS)

### BLOCO 1 — Hero (A Promessa Institucional)

**Headline:**
> "O Padrão-Ouro em Governança de Inteligência Artificial."

**Sub-headline:**
> A ALGOR Association é a comunidade internacional que orienta empresas e governos na adoção ética, segura e regulamentada da IA (ISO 42001, EU AI Act e PL 2338).

**CTAs:**
- Botão Primário: **"Baixar Kit de Sobrevivência IA"** → captura e-mail + entrega PDF
- Botão Secundário: **"Acessar Área de Membros"** → login Clerk

**Visual:** Dark Navy atual mantido · NeuralGlobe pode ser mantido (remete à "tech global")

---

### BLOCO 2 — A Autoridade (Quem Somos)

**Headline:**
> "Traduzimos o 'techês' em Risco de Negócio"

**Pontos de autoridade:**
- 250+ membros ativos · Associados, Gestores e Auditores C-Level
- Metodologias inovadoras aplicadas em empresas e governos
- Multas de até **R$ 50 milhões** (PL 2338) e Responsabilidade Objetiva
- Único framework brasileiro ancorado na **ISO/IEC 42001 (AIMS)**

**Formato visual:** Cards ou estatísticas animadas (aproveitar SaasPreview existente adaptado)

---

### BLOCO 3 — A Metodologia (O que a ALGOR Defende)

**Headline:**
> "O Mapa de Maturidade em IA"

**Os 5 Estágios de Maturidade (régua universal da ALGOR):**

| # | Estágio | Descrição |
|---|---------|-----------|
| 1 | 🔍 Descoberta | Mapeamento de Shadow AI e ativos ocultos |
| 2 | ⚙️ Gestão | Processos e controles de governança implantados |
| 3 | 🧠 Cultura | Pessoas e lideranças alinhadas com AI First ético |
| 4 | ⚖️ Regulação | Conformidade ISO 42001, LGPD e PL 2338 auditável |
| 5 | 🚀 Autonomia | IA gerenciada de forma independente e sustentável |

**Pilares inegociáveis (destacar visualmente):**
- Transparência · Supervisão Humana Significativa · Mitigação de Viés

**Narrativa:** Os 5 Estágios são a **régua** (mapa); a Metodologia N7 é o **veículo** que avança a empresa pelo mapa.

---

### BLOCO 4 — A Ponte Comercial ⚡ (Motor de Vendas do MVP)

**Título:**
> "Implemente a Governança com um Auditor Acreditado"

**Copy:**
> "A teoria não protege seu CNPJ. Para mapear sua Shadow AI, classificar seus riscos e adequar sua empresa à ISO 42001, acione nossa rede de Auditores e Consultores Oficiais."

**CTA principal:** Botão → **Calendly**
> "Agendar Diagnóstico de Maturidade Oficial"

**A Mecânica (invisível ao cliente):**
- O botão vai para o Calendly do sócio (Paulo Carvalho)
- Na call: *"Sou Paulo Carvalho, Presidente da ALGOR e Sócio da N7 Consultoria, a empresa homologada que vai executar e faturar este projeto."*
- Compliance resolvido com elegância: ONG indica → Consultoria executa

---

### BLOCO 5 — Área Privada (Hub de Retenção Ano 1)

**Teaser público (visível sem login):**
> "Acesse materiais exclusivos para Gestores Públicos, DPOs e Diretores de IA — guias práticos sobre PL 2338 e ISO 42001."

**Botão:** "Acessar Área de Membros" → login Clerk

**O que tem dentro (Ano 1):**
| Item | Status | Acesso |
|------|--------|--------|
| Kit de Sobrevivência IA (PDF) | ✅ A empacotar | Grátis (cadastro) |
| Gravações das Masterclasses | Após 1ª masterclass | Grátis (cadastro) |
| Curso Executivo | ⏳ Lista de Espera | Pago (R$ 790) |
| Dashboard de Conformidade | Para clientes N7 | Pago (contrato) |

---

## 🎨 DESIGN — O QUE MUDA, O QUE FICA

### ✅ MANTÉM (Economiza tempo)
- Dark Navy (`#0B0F1E`) como fundo principal
- NeuralGlobe no header (remete a padrão global)
- Cards Glassmorphism
- Framer Motion animations
- Blog `/blog` fora do nav → footer

### ✏️ REFATORA (Ajustes de repositionamento)
- **Hero:** Troca headline/sub-headline para o novo copy institucional
- **Bloco 2 (Quem Somos):** Substitui copy técnico por autoridade + multas + membros
- **Bloco 3:** Substitui "TrainingJourney" por "5 Estágios de Maturidade"
- **Bloco 4:** Nova seção "Ponte Comercial" → Calendly (pode adaptar CinematicSolutions)
- **Bloco 5:** CTA de login + teaser do Kit

### ❌ REMOVE OU OCULTA
- SaasPreview startup-like → substituir por estatísticas de autoridade
- PainPointBanner (mover dores para Bloco 2)
- Qualquer referência a "plataforma SaaS" ou "software"

---

## 🔗 INTEGRAÇÃO ALGOR ↔ N7

| Onde | Texto | Destino |
|------|-------|---------|
| Bloco 4 (Ponte Comercial) | "Agendar Diagnóstico" | Calendly N7 |
| Footer | "Consultoria Acreditada: N7 Consultoria →" | `n7consultoria.com.br` |
| Bloco 5 (teaser) | Masterclas / Kit | Login ALGOR |

---

## 📦 KIT DE SOBREVIVÊNCIA IA — Conteúdo Aprovado

O conteúdo existe no "GOV IA - Manual de Governança de IA". Arquivos MDX a criar:

| Arquivo | Fonte no Manual | Status |
|---------|-----------------|--------|
| `minuta-portaria-ia.mdx` | Capítulo 27 (Artigos 1-9) | ✅ Template inicial criado |
| `checklist-fornecedor-ia.mdx` | Anexo II (20 perguntas) | ✅ Template inicial criado |
| `diagnostico-50-questoes.mdx` | Capítulo 15 (50 questões) | ✅ Template inicial criado |

**Ação de publicação:** Converter para PDF com logo ALGOR → isca irrecusável para DPOs e Gestores Públicos.

---

*Documento criado em 01/03/2026*
