# N7 CONSULTORIA — Plano do Site MVP (One-Page)

> **Criado em:** 01/03/2026  
> **Status:** 🟡 PLANEJADO — Aguardando Calendly/WhatsApp/Domínio  
> **Domínio alvo:** `n7consultoria.com.br`  
> **Repositório:** Novo projeto separado do `algorbrasil`  

---

## 🎯 OBJETIVO DO SITE

O site N7 tem dois objetivos e dois únicos objetivos:

1. **Área Pública:** Máquina de Agendamento → converter visita em call de Diagnóstico no Calendly
2. **Área Privada:** Hub de Retenção → manter o cliente/membro engajado pós-venda

---

## 🗺️ MAPA DO SITE

```
n7consultoria.com.br
├── / (One-Page — ver blocos abaixo)
├── /login → redireciona para algorbrasil.com.br/dashboard (Clerk)
└── [sem outras páginas]

Footer links (não no menu):
└── Ver artigos → algorbrasil.com.br/blog
```

---

## 🏗️ ESTRUTURA DA ONE-PAGE (5 BLOCOS)

### BLOCO 1 — Hero (A Promessa)

**Headline:**
> "Transformamos a Governança de IA em Diferencial Competitivo, não em Custo."

**Sub-headline:**
> Proteja o seu negócio (Setor Financeiro e Público) do passivo do "Shadow AI" e da LGPD, preparando-se para o PL 2338 e a ISO 42001.

**CTA principal:** Botão → Calendly
> "Agendar Diagnóstico Gratuito de 15 min"

**Visual:** Fundo branco/cinza claro · Tipografia bold · Azul institucional · Zero neon

---

### BLOCO 2 — O Problema (Dor do C-Level)

**Headline âncora:**
> "Sua equipe já usa IA. Você sabe como e onde?"

**Pontos de dor (3 cards ou bullets):**
- 🔴 **Multas de até R$ 50 milhões** (PL 2338 — em tramitação no Senado)
- 🔴 **Responsabilidade Objetiva sem Supervisão Humana Significativa** — o CPF do gestor responde
- 🔴 **Shadow AI** — ferramentas não mapeadas já operam nas suas equipes hoje

**CTA secundário (subtle):** "Saiba qual é sua exposição →" → ancora no Bloco 4

---

### BLOCO 3 — Metodologia N7 (Nossa Autoridade)

**Headline:**
> "A Metodologia N7: 7 Vetores de Blindagem para Sua IA"

**4 Dimensões (abertas ao público):**
| # | Dimensão | Descrição curta |
|---|----------|-----------------|
| 1 | Estratégia | Alinhamento da IA com os objetivos de negócio |
| 2 | Estrutura | Governança, papéis e responsabilidades definidos |
| 3 | Processos | Workflows auditáveis e rastreáveis |
| 4 | Cultura | People & Change Management para adoção segura |

**"Escudo" — as 3 Travas (caixa visual separada, propositalmente fechada):**
> ⚔️ **+ 3 Travas Regulatórias Exclusivas**  
> *Blindagem específica para o PL 2338 — reveladas na sessão de Diagnóstico.*

> 💡 *Gatilho psicológico: o C-Level pensa "tenho processos, mas quais são essas 3 travas que a lei exige e eu não tenho?"*

**Selo de autoridade (abaixo do bloco):**
> [Logo ALGOR] "Metodologia N7 ancorada nos frameworks oficiais da ALGOR Association e aderente à ISO/IEC 42001 (AIMS)"

---

### BLOCO 4 — Ofertas do MVP

**Oferta 1 (destaque principal):**
#### Diagnóstico de Maturidade N7
- Mapeamento completo em 3 semanas
- Classificação de Risco conforme PL 2338 (Baixo / Alto / Excessivo)
- Roadmap priorizado de conformidade
- **CTA: "Agendar Meu Diagnóstico →" → Calendly**

**Oferta 2 (secundária):**
#### Governança de IA as a Service
- Retentor mensal para implementar e monitorar o Roadmap
- Relatórios periódicos + acesso ao dashboard de conformidade
- **CTA: "Falar com um Especialista →" → Calendly**

> ⚠️ Nenhum preço exposto. Preços revelados apenas na Proposta Comercial pós-call.

---

### BLOCO 5 — Educação + Captura de Leads

**Headline:**
> "Aprofunde seu conhecimento antes de decidir"

**Card 1 — Masterclass Gratuita Mensal:**
- "Participe da nossa sessão ao vivo sobre Governança de IA"
- **CTA: "Garantir Minha Vaga →"** (link para formulário/LP da masterclass)

**Card 2 — Curso Executivo (bloqueado):**
- Título: *Governança de IA para Lideranças — Da Teoria à Blindagem*
- Badge: "Em breve · Lista de Espera"
- **CTA: "Entrar na Lista de Espera →"** (captura de email apenas)

**Card 3 — Área de Membros:**
- "Masterclasses gravadas, kits PDF, relatórios exclusivos"
- **CTA: "Acessar Área do Cliente →"** → `algorbrasil.com.br/dashboard`

---

## 🎨 DESIGN SYSTEM — "N7 Consultoria"

### Paleta de Cores
| Token | Valor | Uso |
|-------|-------|-----|
| Background | `#FFFFFF` / `#F8F9FA` | Fundo primário / seções alternadas |
| Azul Institucional | `#1A3A6C` (ou similar) | Títulos, CTAs, bordas |
| Azul Claro | `#2563EB` | Links, hover |
| Texto Principal | `#111827` | Headings |
| Texto Secundário | `#6B7280` | Body, subtítulos |
| Acento Escudo | `#DC2626` (vermelho sutil) | Cards de dor/risco |
| Borda | `#E5E7EB` | Separadores, cards |

### Tipografia
- **Display/Headlines:** Montserrat Bold 700
- **Body:** Inter Regular 400
- **Mono/Badges:** JetBrains Mono (opcional para dados)

### Estilo
- ✅ Espaço branco generoso (respiro entre seções)
- ✅ Cards limpos com shadow sutil
- ✅ Iconografia minimalista (linha fina, sem gradientes)
- ✅ Botões sólidos (azul institucional), sem glow
- ❌ Proibido: neon, glassmorphism exagerado, NeuralGlobe, SaasPreview, dark background

---

## 🔧 COMPONENTES DE UI

### Header (fixo, minimalista)
```
[N7 CONSULTORIA]                    [Área do Cliente ↗]
```

### Footer
```
N7 Consultoria — Governança de IA
© 2026 · Consultoria Acreditada pela ALGOR Association
Links: Blog | Políticas | LGPD
```

### WhatsApp Float (canto inferior direito)
- Ícone WhatsApp verde discreto
- Mensagem pré-configurada: *"Olá, N7 Consultoria. Gostaria de entender como blindar minha empresa com o Diagnóstico de IA."*
- Comportamento: aparece após 5s ou 30% de scroll

---

## ⚙️ STACK TÉCNICO

| Item | Decisão |
|------|---------|
| Framework | Next.js 15 (App Router) — estático |
| Hospedagem | VPS existente (Docker) ou Vercel (mais simples para MVP) |
| Backend próprio | ❌ Não — é uma One-Page estática |
| Auth | Não tem — login redireciona para `algorbrasil.com.br` |
| Analytics | Google Analytics 4 (básico) |
| Formulário Lista Espera | Form simples → email capture (Formspree ou Server Action) |

---

## ⏳ ITENS PENDENTES (bloqueiam o deploy)

| Item | Responsável | Status |
|------|-------------|--------|
| Registrar `n7consultoria.com.br` | Sócio | ⏳ |
| Criar Calendly ("Sessão de Triagem de Risco de IA") | Sócio | ⏳ |
| Criar link WhatsApp Business com mensagem pré-programada | Sócio | ⏳ |
| Logo ALGOR para Selo de Autoridade (arquivo PNG/SVG) | Existente no `/public` do ALGOR site | ✅ |

---

## 📋 ITENS QUE MUDAM NO SITE ALGOR (algorbrasil.com.br)

1. **Homepage:** Adicionar banner/seção → *"Precisa de implementação comercial? Conheça a N7 Consultoria, nossa parceira oficial"* + botão → `n7consultoria.com.br`
2. **Resto do site:** Nenhuma alteração estrutural — blog, dashboard e board ficam como estão

---

*Documento criado em 01/03/2026 — Decisões do Plano N7 v3.1*
