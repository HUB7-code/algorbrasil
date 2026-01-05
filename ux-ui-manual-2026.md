# Manual Completo UX/UI 2026
## Guia Definitivo para Design Moderno de Interfaces

---

## 📋 Índice

1. [Visão Geral 2026](#visão-geral)
2. [Design Systems](#design-systems)
3. [Tendências Visuais](#tendências-visuais)
4. [Animações e Microinterações](#animações)
5. [Tipografia](#tipografia)
6. [Paletas de Cores](#cores)
7. [Acessibilidade](#acessibilidade)
8. [IA e Personalização](#ia-personalizacao)
9. [Melhores Práticas](#melhores-praticas)
10. [Ferramentas e Recursos](#ferramentas)

---

## 🎯 Visão Geral 2026 {#visão-geral}

### Filosofia Central
O design em 2026 prioriza **experiências humanas autênticas** sobre tendências superficiais. O foco está em criar interfaces que:
- Adaptam-se dinamicamente ao usuário
- Priorizam acessibilidade desde o início
- Equilibram estética com funcionalidade
- Reduzem carga cognitiva

### Princípios Fundamentais
1. **Usabilidade > Estética**: O design "correto" vence o design "cool"
2. **Menos é Mais**: Minimalismo funcional com personalidade
3. **Inclusão por Design**: Acessibilidade não é afterthought
4. **Performance**: Animações e efeitos devem ser leves e intencionais

---

## 🎨 Design Systems {#design-systems}

### O Que São Design Systems
Coleção unificada de componentes reutilizáveis, padrões de design, documentação e código que garante consistência em todas as plataformas.

### Design Systems Populares em 2026

#### 1. **Material Design 3 (Google)**
- **Características**: Personalização dinâmica, temas adaptativos
- **Foco**: Flexibilidade cross-platform com identidade única
- **Quando usar**: Apps Android, interfaces robustas e escaláveis
- **Link**: material.io

**Elementos principais:**
- Motion expressivo e feedback tátil
- Sistema de cores dinâmico baseado em Material You
- Componentes com elevação e profundidade
- Suporte nativo para dark mode

#### 2. **Fluent Design 2 (Microsoft)**
- **Características**: Acrylic material, mica, profundidade
- **Foco**: Experiências imersivas cross-device
- **Quando usar**: Apps Windows, Enterprise, Microsoft 365
- **Materiais**: Solid, Acrylic (vidro fosco), Mica, Smoke

**Pontos fortes:**
- Guidelines extensas para animações
- Foco em luz, profundidade e movimento
- Integração perfeita com ecossistema Microsoft

#### 3. **IBM Carbon Design System**
- **Características**: Open-source, enterprise-grade
- **Foco**: Acessibilidade, escalabilidade, flexibilidade
- **Quando usar**: Aplicações corporativas complexas
- **Componentes**: Disponível para React, Angular, Vue, Svelte

#### 4. **Apple Human Interface Guidelines (HIG)**
- **Características**: Atenção aos detalhes, fluidez
- **Foco**: Experiências intuitivas e elegantes
- **Quando usar**: Apps iOS, macOS, watchOS

#### 5. **Shopify Polaris**
- **Características**: Focado em e-commerce
- **Foco**: Experiências mercantis, fluxos de checkout
- **Quando usar**: Plataformas de vendas, dashboards

### Estrutura de um Design System Efetivo

```
Design System
├── Fundamentos
│   ├── Design Tokens (cores, espaçamentos, tipografia)
│   ├── Grid System
│   └── Iconografia
├── Componentes
│   ├── Botões
│   ├── Formulários
│   ├── Cards
│   ├── Navegação
│   └── Modais
├── Padrões
│   ├── Layouts
│   ├── Fluxos de usuário
│   └── Estados (loading, erro, sucesso)
└── Documentação
    ├── Guias de uso
    ├── Código comentado
    └── Exemplos práticos
```

---

## ✨ Tendências Visuais {#tendências-visuais}

### 1. **Glassmorphism (Vidro Fosco)**

**O que é**: Efeito de vidro translúcido com blur de fundo, criando profundidade e hierarquia visual.

**Características:**
- Background semi-transparente (rgba)
- Backdrop blur
- Bordas sutis e brilhantes
- Sombras suaves

**Implementação CSS:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**Quando usar:**
- Sidebars e menus de navegação
- Cards sobrepostos
- Modais e popovers
- Dashboards e painéis

**Cuidados:**
- Teste a legibilidade do texto
- Performance em mobile (blur é pesado)
- Forneça fallback para navegadores antigos

### 2. **Dark Mode Refinado**

**Por que importa:**
- Reduz fadiga ocular (especialmente OLED)
- Melhora bateria em telas AMOLED
- Preferência de 70%+ dos usuários

**Implementação moderna:**
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a1a1a;
  --accent: #0066cc;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0a0a0a;
    --text-primary: #e5e5e5;
    --accent: #4d94ff;
  }
}
```

**Melhores práticas 2026:**
- Micro-contraste elevado (não use preto puro)
- Acentos em neon para destacar ações
- Shadow layering para profundidade
- Transição suave entre modos

### 3. **Bento Grid**

**O que é**: Layout modular inspirado em bento boxes japonesas, com blocos de tamanhos diferentes organizando conteúdo.

**Por que usar:**
- Apenas 1% dos usuários clicam em carousels
- 89% dos cliques vão para o primeiro slide
- Bento Grid mostra tudo de uma vez

**Estrutura:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  grid-auto-rows: minmax(200px, auto);
}

.bento-item-large {
  grid-column: span 2;
  grid-row: span 2;
}
```

**Regras de ouro:**
- Contraste e equilíbrio visual
- Hierarquia clara (tamanhos guiam o olhar)
- Usado por Apple, Samsung, Google

### 4. **Elementos 3D e Espaciais**

**Tendência em 2026:**
- Modelos 3D interativos em WebGL
- Spatial layouts para AR/VR
- Parallax com profundidade real
- Holographic motifs

**Frameworks:**
- Three.js (r128+ para web)
- Babylon.js
- WebXR para experiências imersivas

**Implementação responsável:**
- Loading progressivo
- Versões simplificadas para mobile
- Indicadores de carregamento claros

### 5. **Liquid UI / Morphing**

**Características:**
- Formas orgânicas e fluidas
- Animações suaves tipo "blob"
- Transições elásticas
- Feedback tátil visual

**Ferramentas:**
- GSAP para animações suaves
- Lottie para animações leves
- SVG filters para efeitos de água

---

### 6. **Quantum Prestige (Institutional Layer)**
**Introduzido em:** V17.4 (Institute & Academy)

**Conceito:**
Uma fusão de autoridade acadêmica clássica com futurismo "Hard Sci-Fi". Evoca confiança, precisão técnica e vanguarda.

**Design Tokens Exclusivos:**
1.  **Motion Background (Quantum Mesh):**
    *   Camadas sobrepostas de gradientes radiais com `animate-pulse-slow`.
    *   `mix-blend-mode: screen` para luminosidade etérea.
    *   Cores: Deep Navy (#0A1A2F) + Neon Blue (#00A3FF) + Bio Green (#00FF94).

2.  **Typography Hybrid:**
    *   **Headline:** `Playfair Display` (Serifa, Peso 700+) -> *O peso da lei.*
    *   **Subhead/UI:** `Orbitron` (Sans, Peso 400-600) -> *A velocidade da inovação.*

3.  **Holographic Cards:**
    *   Borda de vidro: `border-white/10`
    *   Glow interativo: `hover:shadow-[color]/50` e `hover:border-[color]/50`
    *   Backdrop: `bg-[#0A111A]/90 backdrop-blur-xl`

4.  **Skewed Actions:**
    *   Botões com `skew-x-[-10deg]` para dinamismo agressivo (estilo militar/tático).
    *   Animação interna de "slide" no hover.

**Exemplo de Componente (Quantum Button):**
```tsx
<button className="group relative px-8 py-4 bg-[#00FF94] skew-x-[-10deg] overflow-hidden">
  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
  <span className="skew-x-[10deg] font-bold text-[#050A10]">Acessar</span>
</button>
```

---

### 7. **Ghost UI (Locked States)**

**O que é**: Técnica visual para exibir funcionalidades futuras ou bloqueadas, gerando curiosidade e engajamento sem frustração.

**Características:**
- Conteúdo real (mock) ao fundo
- Desfoque intenso (`backdrop-filter: blur(8px)`)
- Opacidade reduzida
- Overlay holográfico com CTA claro ("Solicitar Acesso")

**Por que usar:**
- Mostra valor futuro ("O que estou perdendo")
- Mantém a imersão visual (sem telas em branco)
- Valida interesse (botão de solicitação)

## 🎬 Animações e Microinterações {#animações}

### Filosofia 2026: "Functional Motion"

Animações devem ter **propósito**, não apenas enfeitar. Cada movimento comunica algo ao usuário.

### Microinterações Essenciais

**1. Feedback de Botão**
```css
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

**2. Loading States**
- Skeleton screens (melhor que spinners)
- Progress indicators claros
- Animações brandas (não chamar muita atenção)

### 3. Status e Confirmação
- Checkmark animado em sucesso
- Shake em erro (sutil)
- Ícones que mudam: "Save" → "Saved ✓"

### 4. Data Storytelling Motion (Novo V17.9.5)

**Filosofia:** Dados estáticos são chatos. Dados animados contam uma história de progresso e precisão.

**Técnicas:**
- **CountUp:** Números nunca aparecem "secos". Eles crescem de 0 até o valor final (`0` -> `98%`). Isso dá peso ao resultado.
- **Staggered Entrance:** Cards não carregam em bloco. Eles entram em "escadinha" (delay de 0.1s entre cada), guiando o olhar do usuário do mais importante (topo esquerdo) para o detalhe (fundo direito).
- **Self-Drawing Charts:** Gráficos de linha e pizza desenham seus caminhos (`stroke-dashoffset`), simulando a análise acontecendo em tempo real.
- **Alive State:** Elementos críticos (como alertas de risco) devem ter um pulso constante ("breathing"), indicando que o sistema está monitorando ativamente.

### Parallax Scrolling

**Quando usar:**
- Landing pages narrativas
- Portfolios criativos
- One-page sites

**Princípios:**
- Monitore performance (pesado)
- Simplifique ou desative em mobile
- Use com moderação (apenas seções-chave)

**Implementação:**
```css
.parallax-section {
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}
```

### Regras de Performance

1. **60 FPS é o mínimo**: Use `transform` e `opacity` (GPU-accelerated)
2. **Evite layout thrashing**: Não anime `width`, `height`, `margin`
3. **Teste em dispositivos reais**: Especialmente mobile de baixo custo
4. **Prefer CSS sobre JS**: Quando possível, use CSS animations

---

## 🔤 Tipografia {#tipografia}

### Tendências 2026

#### 1. **Variable Fonts**

**O que são**: Um único arquivo de fonte com múltiplas variações (peso, largura, slant).

**Vantagens:**
- Arquivo menor (reduz requests HTTP)
- Transições suaves entre pesos
- Customização granular
- Performance web superior

**Fontes populares:**
- Inter Variable
- Source Sans Variable
- IBM Plex Variable
- Roboto Flex

**Implementação:**
```css
@font-face {
  font-family: 'Inter Variable';
  src: url('Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
}

h1 {
  font-family: 'Inter Variable', sans-serif;
  font-weight: clamp(400, 50vw, 900);
  font-size: clamp(1.5rem, 5vw, 4rem);
}
```

#### 2. **Tipografia Fluida e Responsiva**

**CSS Clamp() é essencial:**
```css
:root {
  --fs-100: 1rem;       /* 16px base */
  --fs-200: 1.25rem;    /* 20px */
  --fs-300: 1.56rem;    /* ~25px */
  --fs-400: 1.95rem;    /* ~31px */
  --fs-500: 2.44rem;    /* ~39px */
}

h1 {
  font-size: clamp(2rem, 2.4rem + 1vw, 3.2rem);
  /* Nunca menor que 2rem, nunca maior que 3.2rem */
}
```

#### 3. **Type Scales Modulares**

Use escalas matemáticas (1.25, 1.33, 1.5) para tamanhos harmônicos:
- **1.25 (Major Third)**: Conservadora, corporativa
- **1.333 (Perfect Fourth)**: Equilibrada, versátil
- **1.5 (Perfect Fifth)**: Dramática, editorial

### Hierarquia Tipográfica

```
Display (Hero)     → 48-72px   → 700-900 weight
H1 (Título)        → 32-48px   → 700 weight
H2 (Seção)         → 24-32px   → 600 weight
H3 (Subseção)      → 20-24px   → 600 weight
Body (Corpo)       → 16-18px   → 400 weight
Small (Metadados)  → 14px      → 400 weight
```

### Legibilidade e Espaçamento

**Line Height:**
- Títulos: 1.1 - 1.3
- Corpo: 1.5 - 1.7
- UI elements: 1.4

**Line Length:**
- Ideal: 50-75 caracteres por linha
- Máximo: 90 caracteres

**Letter Spacing:**
- Títulos grandes: -0.02em (tighter)
- Body: 0 (normal)
- UPPERCASE: +0.05em (mais aberto)

### Fontes Acessíveis

**Recomendadas:**
- **Atkinson Hyperlegible**: Projetada para baixa visão
- **Lexend**: Melhora fluência de leitura
- **Open Sans**: Distinção clara entre caracteres
- **Verdana**: Excelente para web, alta legibilidade

**Pares comuns confusos:**
- I, l, 1 (capital i, lowercase L, número 1)
- O, 0 (letra O, zero)
- C, O (capital C, capital O)
- b, d (espelhados)

### Acessibilidade Tipográfica

**WCAG Guidelines:**
- Contraste mínimo 4.5:1 para texto normal
- Contraste mínimo 3:1 para texto grande (18pt+)
- Tamanho base: 16px mínimo
- Evite pesos muito finos (<300) em texto pequeno

---

## 🎨 Paletas de Cores {#cores}

### Cor do Ano 2025-2026: Mocha Mousse

**Pantone 17-1230 (#A47864)**
- Tom marrom quente e sofisticado
- Transmite conforto, confiança, autenticidade
- Combina com neutros, pastéis, e tons terrosos

### Tendências de Cores 2026

#### 1. **Tons Terrosos e Naturais**
Refletem sustentabilidade e conexão com a natureza.

**Paleta recomendada:**
- Forest Green: #2D5016
- Clay: #C4766D
- Ocean Blue: #4A7C8C
- Taupe: #8B7E74
- Terracotta: #E07856

**Indústrias**: Wellness, eco-friendly, lifestyle, sustentabilidade

#### 2. **Neon e Futurístico**
Para tech, gaming, entretenimento.

**Paleta recomendada:**
- Electric Blue: #00D9FF
- Cyber Green: #39FF14
- Hot Pink: #FF006E
- Neon Purple: #B026FF
- Vivid Yellow: #FFE500

**Uso**: Acentos, CTAs, elementos interativos

#### 3. **Gradientes Cromáticos**
Transições multicor com profundidade.

**Exemplo:**
```css
.gradient-hero {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
}
```

#### 4. **Dark Mode com Contraste Alto**
Preto não-puro com acentos vibrantes.

**Paleta Dark Mode:**
- Background: #0A0A0A (não #000000)
- Surface: #1A1A1A
- Text Primary: #E5E5E5
- Text Secondary: #A0A0A0
- Accent: #4D94FF (azul neon)

#### 5. **Monocromático Sofisticado**
Preto, branco e cinzas com acentos metálicos.

**Paleta:**
- Pure White: #FFFFFF
- Off-White: #F8F8F8
- Light Grey: #E0E0E0
- Medium Grey: #888888
- Charcoal: #2A2A2A
- Accent Gold: #D4AF37

### Sistema de Cores Estruturado

```css
:root {
  /* Primary Brand */
  --color-primary-100: #E6F0FF;
  --color-primary-500: #0066CC; /* Main */
  --color-primary-700: #004499;
  
  /* Neutral */
  --color-neutral-50: #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-900: #1A1A1A;
  
  /* Semantic */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

### Ferramentas de Cores

1. **Coolors.co**: Gerador de paletas instantâneo
2. **Adobe Color**: Explorar harmonias complexas
3. **Colormind**: Paletas com IA
4. **WebAIM Contrast Checker**: Verificar acessibilidade
5. **Paletton**: Criar esquemas harmônicos

### Acessibilidade de Cores

**Checklist:**
- ✅ Contraste 4.5:1 mínimo (texto normal)
- ✅ Contraste 3:1 mínimo (texto grande)
- ✅ Não use apenas cor para transmitir informação
- ✅ Teste com simuladores de daltonismo
- ✅ Forneça dark mode com bom contraste

**Ferramentas:**
- Stark (plugin Figma)
- Color Oracle (simulador daltonismo)
- Accessible Colors (ajusta automaticamente)

---

## ♿ Acessibilidade {#acessibilidade}

### Mindset 2026: Design Inclusivo

Acessibilidade não é checklist, é **fundamento** do design. 1 em 5 pessoas experimenta produtos diferentemente.

### WCAG 2.1 Level AA (Padrão Mínimo)

#### 1. **Contraste de Cores**
- Texto normal: 4.5:1
- Texto grande (18pt+): 3:1
- Componentes UI: 3:1

#### 2. **Estrutura Semântica**
```html
<!-- ❌ Errado -->
<div onclick="submit()">Enviar</div>

<!-- ✅ Correto -->
<button type="submit">Enviar</button>
```

**Tags semânticas:**
- `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- `<h1>` até `<h6>` em ordem hierárquica
- `<button>` para ações, `<a>` para links

#### 3. **Navegação por Teclado**
- Todo elemento interativo deve ser acessível via Tab
- Ordem de tabulação lógica
- Indicadores de foco visíveis

```css
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```

#### 4. **Alternativas de Texto**
```html
<!-- Imagens informativas -->
<img src="chart.png" alt="Gráfico mostrando aumento de 30% nas vendas">

<!-- Imagens decorativas -->
<img src="divider.png" alt="" role="presentation">

<!-- Ícones com ação -->
<button aria-label="Fechar modal">
  <svg><!-- ícone X --></svg>
</button>
```

#### 5. **Formulários Acessíveis**
```html
<div class="form-group">
  <label for="email">E-mail</label>
  <input 
    type="email" 
    id="email" 
    name="email"
    aria-required="true"
    aria-describedby="email-hint"
  >
  <span id="email-hint">Usaremos para enviar atualizações</span>
</div>
```

#### 6. **Espaçamento Ajustável**
Usuários devem poder aumentar:
- Espaçamento entre parágrafos: até 200% do tamanho da fonte
- Line height: até 150% do tamanho da fonte
- Letter spacing: até 12% do tamanho da fonte
- Word spacing: até 16% do tamanho da fonte

### Acessibilidade para Neurodiversidade

**ADHD, Autismo, Dislexia:**
- Evite blocos de texto grandes (use parágrafos curtos)
- Forneça opções de foco (modo de leitura)
- Controle sobre animações (prefers-reduced-motion)
- Navegação clara e previsível

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Ferramentas de Teste

1. **WAVE**: Extensão browser para auditoria
2. **axe DevTools**: Integração com dev tools
3. **Lighthouse**: Auditoria automática no Chrome
4. **Screen readers**: NVDA (Windows), VoiceOver (Mac)
5. **Keyboard navigation**: Teste manual com Tab

---

## 🤖 IA e Personalização {#ia-personalizacao}

### Interfaces Adaptativas

**O que está mudando:**
- Interfaces não são mais "one-size-fits-all"
- Layout se adapta ao comportamento do usuário
- Conteúdo personalizado em tempo real
- Predição de necessidades

**Exemplos:**
- Netflix adaptando thumbnails por usuário
- Dashboards que reorganizam widgets por uso
- Navegação contextual baseada em histórico

### AI-Powered Features

#### 1. **Assistentes Conversacionais**
- Chatbots inteligentes e contextuais
- Suporte inline com IA
- Onboarding guiado por IA

#### 2. **Geração de Conteúdo**
- Sugestões de texto em tempo real
- Autocomplete inteligente
- Resumos automáticos

#### 3. **Buscas Semânticas**
- Busca por intenção, não apenas keywords
- Resultados contextualizados
- Filtros inteligentes

### Voice User Interfaces (VUI)

**Crescimento em 2026:**
- Integração com assistentes (Alexa, Siri, Google)
- Comandos de voz em apps web
- Navegação hands-free

**Design para VUI:**
- Feedbacks claros (visual + áudio)
- Comandos simples e naturais
- Fallbacks para interação tradicional

### Zero UI

**Conceito**: A melhor interface é nenhuma interface.

**Tecnologias:**
- Gestos e detecção de presença
- Comandos de voz
- Interfaces contextuais (aparecem quando necessário)
- Smart fridges, carros, wearables

---

## 📚 Melhores Práticas {#melhores-praticas}

### Performance Web

#### Core Web Vitals
1. **LCP (Largest Contentful Paint)**: < 2.5s
2. **FID (First Input Delay)**: < 100ms
3. **CLS (Cumulative Layout Shift)**: < 0.1

**Otimizações:**
- Lazy loading de imagens
- Code splitting
- Compressão de assets (WebP, AVIF)
- CDN para recursos estáticos

### Mobile-First Design

**Por quê:**
- 70%+ do tráfego é mobile
- Google usa mobile-first indexing
- Força simplicidade

**Abordagem:**
```css
/* Base: Mobile */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### Progressive Enhancement

1. **Base**: HTML semântico funcional
2. **Layer 1**: CSS para estética
3. **Layer 2**: JS para interatividade
4. **Layer 3**: Recursos avançados (quando suportados)

### Princípios de Usabilidade

#### Lei de Hick
Quanto mais opções, mais tempo para decidir.
- **Solução**: Simplifique menus, use progressive disclosure

#### Lei de Fitts
Alvos maiores e mais próximos são mais rápidos de clicar.
- **Solução**: Botões grandes (min 44x44px), espaçamento adequado

#### Lei de Miller
Pessoas conseguem manter 7±2 itens na memória de trabalho.
- **Solução**: Agrupe informações, limite opções visíveis

### Testes com Usuários

**Métodos essenciais:**
1. **Testes de usabilidade**: 5 usuários revelam 85% dos problemas
2. **A/B Testing**: Testes de variações
3. **Heatmaps**: Onde usuários clicam e scrollam
4. **Session recordings**: Ver o fluxo real

**Ferramentas:**
- Hotjar, Clarity (heatmaps)
- UserTesting (testes remotos)
- Optimal Workshop (card sorting, tree testing)

---

### 11. Printing & Reports (Digital PDF) {#printing}

O padrão de relatórios da Algor Brasil segue a filosofia **"Dark Mode on Paper"**, desafiando o convencional (fundo branco) para manter a identidade visual mesmo em documentos exportados.

#### Header V5.1 (Titan Layout)
- **Altura Total:** 40mm (Barra de Marca) + 35mm (Dados e Metadados).
- **Background:** Preto Puro (`#000000`) no top bar, Dark Navy (`#0A1628`) no corpo.
- **Tipografia de Marca:**
  - Fonte: **Orbitron Bold** (Custom Injection).
  - Tamanho: 32pt.
  - Tracking (Letter-spacing): 1.5.

#### Paleta de Impressão Digital
Apesar de ser digital, o PDF deve usar cores seguras para leitura em tela:
- **Neon Green:** `#00FF94` (Aprovações, "Brasil", Sucesso).
- **Neon Red:** `#FF3366` (Risco Crítico, Reprovas).
- **Electric Blue:** `#00A3FF` (Bordas, Links, Elementos Neutros).
- **Text:** Branco (`#FFFFFF`) para títulos, Slate-300 (`#CBD5E1`) para corpo.

#### Regras de Layout
1.  **Imagens:** Sempre sanitizar via Canvas API antes de injetar (remove artefatos WebP/Alpha).
2.  **Margens:** Mínimo de 15mm nas laterais.
3.  **Footer:** Deve haver um "respiro" de 6mm entre a linha separadora e o texto legal.

---

### 12. Ferramentas e Recursos {#ferramentas}

### Design Tools

#### UI/UX Design
- **Figma**: Líder em 2026, colaboração em tempo real
- **Sketch**: Focado em Mac, bibliotecas robustas
- **Adobe XD**: Integração com Creative Cloud
- **Framer**: Design + protótipos interativos

#### Prototipagem
- **Framer Motion**: Animações React
- **ProtoPie**: Protótipos de alta fidelidade
- **Principle**: Animações Mac nativas

### Development

#### Frameworks CSS
- **Tailwind CSS**: Utility-first, altamente customizável
- **Shadcn/ui**: Componentes React + Tailwind
- **Chakra UI**: Componentes acessíveis por padrão
- **MUI (Material-UI)**: Material Design para React

#### Animation Libraries
- **GSAP**: Animações performáticas e complexas
- **Framer Motion**: React animations declarativas
- **Lottie**: Animações leves em JSON
- **Rive**: Interações sem código

#### JavaScript Frameworks
- **React 19**: Hooks, Server Components
- **Vue 3**: Composition API
- **Svelte**: Sem virtual DOM, ultra rápido
- **Next.js 15**: React com SSR

### Recursos de Aprendizado

#### Documentação Oficial
- [Material Design](https://material.io)
- [Fluent UI](https://fluent2.microsoft.design)
- [Apple HIG](https://developer.apple.com/design)
- [IBM Carbon](https://carbondesignsystem.com)

#### Inspiração
- **Dribbble**: Tendências visuais
- **Behance**: Projetos completos
- **Awwwards**: Sites premiados
- **Mobbin**: Flows de apps mobile

#### Comunidades
- **Designer News**
- **UX Stack Exchange**
- **r/userexperience (Reddit)**
- **Design Systems Slack**

---

## 📊 Dashboard Premium - Design Avançado 2025-2026 {#dashboard-premium}

### Filosofia: Data Storytelling

Dashboards modernos não são apenas paineis de números — são **narrativas visuais** que guiam o usuário para insights acionáveis. A evolução de 2025-2026:

| Era Anterior | Era Premium 2026 |
|--------------|------------------|
| Dados estáticos | Dados em tempo real |
| KPIs básicos | Insights contextuais com IA |
| Layout fixo | Layouts modulares/Bento Grid |
| Spinners de loading | Skeleton screens animados |
| Alertas genéricos | Notificações inteligentes proativas |

---

### 1. Arquitetura Visual Premium

#### 1.1 Layout Bento Grid para Dashboards

O **Bento Grid** (inspirado em lunchboxes japonesas) é o padrão de ouro para dashboards 2026:

```css
.dashboard-bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
}

/* KPI Hero Card (Large) */
.kpi-hero {
  grid-column: span 4;
  grid-row: span 2;
}

/* Standard KPI Card */
.kpi-standard {
  grid-column: span 3;
  grid-row: span 1;
}

/* Chart Wide */
.chart-area {
  grid-column: span 8;
  grid-row: span 3;
}

/* Sidebar Widget */
.widget-narrow {
  grid-column: span 4;
  grid-row: span 3;
}
```

**Regras de Ouro:**
- KPIs mais importantes: **canto superior esquerdo** (primeira área de foco do olhar)
- Tamanho do card = Importância do dado
- Mínimo **3 tamanhos diferentes** de cards para hierarquia visual
- Mobile: Colapsar para 1-2 colunas com cards empilhados

#### 1.2 KPI Cards Premium

**Anatomia de um KPI Card Moderno:**

```
┌─────────────────────────────────────────────┐
│  📈 Label (12px, uppercase, gray-400)       │
│                                             │
│  2,847                                      │
│  ▲ +12.5%                                   │
│  ════════════════════════▒▒▒ (sparkline)    │
│                                             │
│  vs. último período · Atualizado há 5min    │
└─────────────────────────────────────────────┘
```

**Elementos Essenciais:**
1. **Label descritivo** (não abreviações)
2. **Valor principal** (maior fonte, peso bold)
3. **Delta/Variação** (com ícone ▲▼ e cor semântica)
4. **Sparkline ou mini-gráfico** (contexto de tendência)
5. **Metadados** (período de comparação, última atualização)
6. **Tooltip expandido** (on hover, com explicação detalhada)

**Implementação React/TypeScript:**

```tsx
interface KPICardProps {
  label: string;
  value: number;
  delta: number;
  deltaLabel?: string;
  sparklineData?: number[];
  trend: 'up' | 'down' | 'neutral';
  updatedAt?: Date;
}

const KPICard: React.FC<KPICardProps> = ({
  label, value, delta, sparklineData, trend
}) => {
  const trendColor = {
    up: 'text-emerald-400',
    down: 'text-rose-400',
    neutral: 'text-gray-400'
  }[trend];

  return (
    <motion.div 
      className="kpi-card glass-panel p-6 rounded-2xl"
      whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,163,255,0.2)' }}
    >
      <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
        {label}
      </span>
      
      <div className="flex items-baseline gap-3 mt-2">
        <AnimatedCounter 
          value={value} 
          className="text-4xl font-bold text-white" 
        />
        <span className={`text-sm font-semibold ${trendColor}`}>
          {trend === 'up' && '▲'}{trend === 'down' && '▼'} {delta}%
        </span>
      </div>
      
      {sparklineData && (
        <Sparklines data={sparklineData} className="mt-4 h-8">
          <SparklinesLine color="#00A3FF" />
        </Sparklines>
      )}
    </motion.div>
  );
};
```

#### 1.3 Animated Counters (Contadores Animados)

Contadores que "rolam" até o valor final criam engajamento visual:

```tsx
import { useSpring, animated } from '@react-spring/web';

const AnimatedCounter = ({ value, decimals = 0 }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 }
  });

  return (
    <animated.span>
      {number.to(n => n.toFixed(decimals))}
    </animated.span>
  );
};
```

**Alternativa com Framer Motion:**
```tsx
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function CountUp({ to, duration = 2 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, v => Math.round(v));
  
  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [to]);
  
  return <motion.span>{rounded}</motion.span>;
}
```

---

### 2. Visualizações de Dados Premium

#### 2.1 Escolha do Tipo de Gráfico

| Objetivo | Tipo de Gráfico | Quando Usar |
|----------|-----------------|-------------|
| **Tendência temporal** | Line Chart, Area Chart | Evolução ao longo do tempo |
| **Comparação** | Bar Chart (horizontal preferido) | Comparar categorias |
| **Proporção** | Donut Chart (não Pie!) | Partes de um todo |
| **Distribuição** | Histogram, Heatmap | Padrões e densidade |
| **Progresso** | Gauge, Radial Progress | Metas vs. atual |
| **Multivariável** | Radar Chart | Comparar múltiplas dimensões |
| **Hierarquia** | Treemap | Proporções aninhadas |

#### 2.2 Gauge Charts (Gráficos Gauge)

**Gauge Premium SVG com Gradiente:**

```tsx
const GaugeChart = ({ value, max = 100, label }) => {
  const percentage = (value / max) * 100;
  const strokeDasharray = `${percentage * 2.51} ${251.2 - (percentage * 2.51)}`;
  
  return (
    <div className="relative w-48 h-48">
      <svg viewBox="0 0 100 50" className="overflow-visible">
        {/* Background Arc */}
        <path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Progress Arc with Gradient */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#00FF94" />
          </linearGradient>
        </defs>
        
        <motion.path
          d="M 10 50 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      {/* Central Value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-xs text-gray-400">{label}</span>
      </div>
    </div>
  );
};
```

#### 2.3 Radial Progress Bars

Para métricas de conclusão (ex: onboarding 75% completo):

```tsx
const RadialProgress = ({ progress, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={strokeWidth}
      />
      
      {/* Progress Circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#00FF94"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ filter: 'drop-shadow(0 0 6px #00FF94)' }}
      />
    </svg>
  );
};
```

#### 2.4 Recharts Premium Configuration

```tsx
// Configuração global de tema dark premium
const CHART_THEME = {
  colors: ['#00A3FF', '#00FF94', '#FF6B6B', '#FFD93D', '#6366F1'],
  grid: { stroke: 'rgba(255,255,255,0.05)' },
  axis: { 
    stroke: 'rgba(255,255,255,0.1)',
    tick: { fill: '#94A3B8', fontSize: 12 }
  },
  tooltip: {
    contentStyle: {
      background: 'rgba(10, 26, 47, 0.95)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    }
  }
};

// Area Chart Premium
<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={data}>
    <defs>
      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00A3FF" stopOpacity={0.4} />
        <stop offset="100%" stopColor="#00A3FF" stopOpacity={0} />
      </linearGradient>
    </defs>
    
    <CartesianGrid {...CHART_THEME.grid} vertical={false} />
    <XAxis dataKey="month" {...CHART_THEME.axis} />
    <YAxis {...CHART_THEME.axis} />
    <Tooltip {...CHART_THEME.tooltip} />
    
    <Area
      type="monotone"
      dataKey="value"
      stroke="#00A3FF"
      strokeWidth={2}
      fill="url(#areaGradient)"
      animationDuration={1500}
    />
  </AreaChart>
</ResponsiveContainer>
```

---

### 3. Microinterações para Dashboards

#### 3.1 Skeleton Loading (Estado de Carregamento)

Nunca use spinners em dashboards — use **skeleton screens**:

```tsx
const SkeletonKPICard = () => (
  <div className="glass-panel p-6 rounded-2xl animate-pulse">
    <div className="h-3 w-20 bg-white/10 rounded mb-4" />
    <div className="h-8 w-32 bg-white/10 rounded mb-2" />
    <div className="h-4 w-24 bg-white/10 rounded" />
    <div className="h-16 w-full bg-white/10 rounded mt-4" />
  </div>
);
```

#### 3.2 Hover States Premium

```css
.kpi-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.kpi-card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 0 20px rgba(0, 163, 255, 0.15),
    0 0 40px rgba(0, 163, 255, 0.1);
  border-color: rgba(0, 163, 255, 0.3);
}

/* Glow effect on value */
.kpi-card:hover .kpi-value {
  text-shadow: 0 0 20px rgba(0, 163, 255, 0.5);
}
```

#### 3.3 Data Refresh Animation

```tsx
const PulseOnUpdate = ({ children, value }) => {
  const [pulse, setPulse] = useState(false);
  
  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 500);
    return () => clearTimeout(timer);
  }, [value]);
  
  return (
    <motion.div
      animate={{ 
        scale: pulse ? [1, 1.05, 1] : 1,
        backgroundColor: pulse 
          ? ['transparent', 'rgba(0,255,148,0.1)', 'transparent']
          : 'transparent'
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

---

### 4. Personalização com IA (Tendência 2026)

#### 4.1 Dashboards Adaptativos

Dashboards premium em 2026 se adaptam ao usuário:

```typescript
interface UserPreferences {
  favoriteMetrics: string[];
  viewingPattern: 'quick-glance' | 'deep-analysis';
  lastViewedSections: string[];
  alertThresholds: Record<string, number>;
}

// Reordenar widgets baseado em uso
const sortWidgetsByUsage = (widgets: Widget[], history: ViewHistory[]) => {
  return widgets.sort((a, b) => {
    const aViews = history.filter(h => h.widgetId === a.id).length;
    const bViews = history.filter(h => h.widgetId === b.id).length;
    return bViews - aViews;
  });
};

// Highlight automático de anomalias
const highlightAnomalies = (data: DataPoint[]) => {
  const mean = data.reduce((a, b) => a + b.value, 0) / data.length;
  const stdDev = Math.sqrt(
    data.reduce((a, b) => a + Math.pow(b.value - mean, 2), 0) / data.length
  );
  
  return data.map(point => ({
    ...point,
    isAnomaly: Math.abs(point.value - mean) > 2 * stdDev
  }));
};
```

#### 4.2 Smart Alerts

```tsx
const SmartAlert = ({ metric, threshold, current }) => {
  const severity = current > threshold * 1.5 ? 'critical' : 
                   current > threshold ? 'warning' : 'normal';
  
  const colors = {
    critical: { bg: 'bg-red-500/20', border: 'border-red-500/50', icon: '🚨' },
    warning: { bg: 'bg-amber-500/20', border: 'border-amber-500/50', icon: '⚠️' },
    normal: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', icon: '✓' }
  };
  
  if (severity === 'normal') return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${colors[severity].bg} ${colors[severity].border} 
                  border rounded-xl p-4 flex items-start gap-3`}
    >
      <span className="text-2xl">{colors[severity].icon}</span>
      <div>
        <p className="font-medium text-white">{metric} acima do limite</p>
        <p className="text-sm text-gray-400">
          Atual: {current} | Limite: {threshold}
        </p>
      </div>
    </motion.div>
  );
};
```

---

### 5. Performance de Dashboards

#### 5.1 Otimizações Críticas

```tsx
// 1. Virtualização para listas longas
import { FixedSizeList } from 'react-window';

// 2. Memoização de componentes pesados
const MemoizedChart = React.memo(ExpensiveChart, (prev, next) => {
  return JSON.stringify(prev.data) === JSON.stringify(next.data);
});

// 3. Debounce de atualizações em tempo real
const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// 4. Progressive Loading
const DashboardWithProgressive = () => {
  const [phase, setPhase] = useState(1);
  
  useEffect(() => {
    // Fase 1: KPIs críticos (imediato)
    // Fase 2: Gráficos principais (500ms)
    // Fase 3: Widgets secundários (1000ms)
    const timer1 = setTimeout(() => setPhase(2), 500);
    const timer2 = setTimeout(() => setPhase(3), 1000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);
  
  return (
    <>
      <CriticalKPIs />
      {phase >= 2 && <MainCharts />}
      {phase >= 3 && <SecondaryWidgets />}
    </>
  );
};
```

#### 5.2 Real-Time Data Best Practices

```tsx
// WebSocket com reconexão automática
const useRealtimeData = (endpoint: string) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  
  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimeout: NodeJS.Timeout;
    
    const connect = () => {
      ws = new WebSocket(endpoint);
      
      ws.onopen = () => setStatus('connected');
      ws.onmessage = (e) => setData(JSON.parse(e.data));
      ws.onclose = () => {
        setStatus('connecting');
        reconnectTimeout = setTimeout(connect, 3000);
      };
      ws.onerror = () => setStatus('error');
    };
    
    connect();
    
    return () => {
      ws?.close();
      clearTimeout(reconnectTimeout);
    };
  }, [endpoint]);
  
  return { data, status };
};
```

---

### 6. Acessibilidade em Dashboards

#### 6.1 Nunca Dependa Apenas de Cor

```tsx
// ❌ Errado: Apenas cor indica status
<span className="text-green-500">{value}</span>

// ✅ Correto: Cor + Ícone + Texto
<span className="text-green-500 flex items-center gap-1">
  <TrendingUp className="w-4 h-4" aria-hidden="true" />
  <span>{value}</span>
  <span className="sr-only">aumento de</span>
  <span>{delta}%</span>
</span>
```

#### 6.2 Descrições para Screen Readers

```tsx
<figure role="img" aria-labelledby="chart-title" aria-describedby="chart-desc">
  <figcaption id="chart-title" className="sr-only">
    Vendas mensais de 2024
  </figcaption>
  <p id="chart-desc" className="sr-only">
    Gráfico de linha mostrando crescimento de 15% ao longo do ano,
    com pico em dezembro de R$ 2.4 milhões.
  </p>
  <AreaChart data={salesData} />
</figure>
```

---

### 7. Bibliotecas Recomendadas 2026

| Categoria | Biblioteca | Por que usar |
|-----------|------------|--------------|
| **Gráficos** | Recharts | Componentes React, fácil customização |
| **Gráficos Avançados** | Nivo | +50 tipos, SSR, temas prontos |
| **Animações** | Framer Motion | Motion values, gestures, layout |
| **Tabelas** | TanStack Table | Headless, sorting, filtering |
| **Datas** | date-fns | Tree-shakeable, imutável |
| **Estado Real-time** | SWR / React Query | Caching, revalidation |
| **Ícones** | Lucide React | 1000+ ícones, tree-shakeable |

---

## 🎯 Checklist Final: Lançamento de Site 2026

### Design Visual
- [ ] Design system definido e documentado
- [ ] Paleta de cores com contraste acessível
- [ ] Tipografia escalável (variable fonts)
- [ ] Grid responsivo (mobile-first)
- [ ] Dark mode implementado
- [ ] Bento Grid para dashboards
- [ ] Animações com propósito

### Dashboard Premium
- [ ] KPI Cards com todos os elementos (label, valor, delta, sparkline)
- [ ] Contadores animados implementados
- [ ] Gauge/Radial progress para metas
- [ ] Skeleton loading (não spinners)
- [ ] Hover states premium com glow
- [ ] Tooltips informativos em todos os gráficos
- [ ] Período de comparação visível

### Funcionalidade
- [ ] Navegação por teclado funcional
- [ ] Todos os elementos interativos acessíveis
- [ ] Formulários com validação clara
- [ ] Loading states implementados
- [ ] Error states informativos
- [ ] Microinterações em ações-chave

### Performance
- [ ] Core Web Vitals otimizados
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Lazy loading implementado
- [ ] Fontes carregadas eficientemente
- [ ] CSS e JS minificados
- [ ] Memoização de componentes pesados
- [ ] Teste em dispositivos reais

### Acessibilidade
- [ ] Contraste WCAG AA em todo site
- [ ] HTML semântico usado corretamente
- [ ] Alt text em todas as imagens
- [ ] ARIA labels quando necessário
- [ ] Focus states visíveis
- [ ] Cores não são única forma de informação
- [ ] Testado com screen reader

### SEO e Analytics
- [ ] Meta tags otimizadas
- [ ] Structured data implementado
- [ ] Sitemap XML
- [ ] Analytics configurado
- [ ] Search console verificado

---

## 🌟 Conclusão

O design de dashboards em 2026 transcende a mera exibição de números — é sobre criar **experiências que contam histórias com dados**. Priorize:

1. **Data Storytelling**: Guie o usuário para insights, não apenas mostre números
2. **Microinterações**: Cada hover, cada animação deve ter propósito
3. **Personalização**: Dashboards que se adaptam ao usuário
4. **Performance**: Dados em tempo real exigem código otimizado
5. **Acessibilidade**: Informação acessível a todos os usuários

### Paleta Premium Recomendada (Dark Mode)

```css
:root {
  /* Background Layers */
  --bg-primary: #0A0E1A;    /* Deep Navy */
  --bg-elevated: #0F172A;   /* Elevated Surface */
  --bg-card: rgba(255, 255, 255, 0.05); /* Glass */
  
  /* Brand Colors */
  --brand-blue: #00A3FF;    /* Electric Blue */
  --brand-green: #00FF94;   /* Neon Green */
  --brand-purple: #6366F1;  /* Indigo Accent */
  
  /* Semantic */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  
  /* Text */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
}
```

**Lembre-se**: O melhor dashboard é aquele que o usuário nem percebe que está usando — ele flui naturalmente para as decisões certas.


---

## 11. Identidade Visual ALGOR (Aplicação Prática)

Especificações oficiais para a implementação da marca **ALGOR PREMIERE**.

### 11.1 Tipografia Oficial

A tipografia define o tom da interface: "Futurista, Autoritária, Segura".

*   **Display / Headings (L1 - L3):** `Orbitron`
    *   **Uso:** Títulos principais (H1), Títulos de seção (H2), Badges de Status.
    *   **Características:** Geometria técnica, espaçamento expandido (tracking-wide), kerning agressivo.
    *   **Class:** `.font-orbitron`
*   **Body / Texto de Apoio (L4 - L6):** `Inter` ou `Sans-serif` System default.
    *   **Uso:** Parágrafos, listas, cartões de dados.
    *   **Características:** Alta legibilidade, neutra, funcional.
    *   **Class:** `font-sans`
*   **Dados Táticos:** `JetBrains Mono` ou `Monospace`
    *   **Uso:** Códigos, IDs, Tokens, Metadados técnicos.
    *   **Class:** `font-mono`

> **Nota Crítica (30/12/2025):** A fonte `Serif` foi oficialmente depreciada para títulos. Todos os headers devem usar `Orbitron` para consistência com o tema "Secure Terminal".

### 11.2 Estética "Secure Terminal"

Utilizada em páginas transacionais críticas e dashboards de alta segurança.

1.  **Hologramas Neurais:** Elementos 3D giratórios (`HeroScene`) usados como âncora visual para representar IA viva.
2.  **Inputs Táticos:** Campos de formulário com feedback imediato de foco (brilho neon), lembrando interfaces militares/cyberpunk refinadas.
3.  **Data Encryption Motion:** Animações de loading que simulam criptografia de dados em tempo real (ex: texto embaralhado resolvendo para texto limpo).

---

## 12. Alive Interface (V17.9)

A "Alive Interface" é o novo padrão para interações de alta fidelidade na plataforma ALGOR. Ela transforma telas estáticas em ambientes reativos que simulam vida e inteligência.

### 12.1 Princípios
1.  **Biomimética:** O sistema "respira". Elementos vitais (logos, status críticos) nunca estão 100% parados; eles pulsam, orbitam ou flutuam.
2.  **Foco Laser (Scanner Effect):** Onde o usuário olha (ou clica), o sistema ilumina. Inputs não apenas mudam de cor, eles emitem luz.
3.  **Transição de Estado Líquida:** Mudanças de página ou contexto não são cortes secos. Usamos "Wipes" diagonais, expansões circulares ou morphing para manter a continuidade da narrativa visual.

### 12.2 Componentes "Alive"
#### Scanner Input
Campos de texto que simulam a leitura biométrica ou conexão de dados.
```css
.input-scanner:focus {
  border-color: #00FF94;
  box-shadow: 0 0 20px rgba(0, 255, 148, 0.3), inset 0 0 10px rgba(0, 255, 148, 0.1);
  background: radial-gradient(circle at center, rgba(0,255,148,0.05) 0%, transparent 70%);
}
```

#### Diagonal Transition (The Curtain)
Utilizada em fluxos de onboarding e login para transições dramáticas.
- **Trigger:** Clique em CTA primário/secundário.
- **Animação:** `clip-path: polygon(...)` movendo-se de 0% para 100% da tela.
- **Duração:** 0.8s (rápido, mas perceptível).
- **Conteúdo:** Deve conter o Branding (ALGOR BRASIL) para reforçar a identidade durante o "blink".

#### Holographic Buttons (ISO Wizard)
Botões que reagem à proximidade e intenção.
- **Idle:** Vidro translúcido (`backdrop-blur`).
- **Hover:** Preenchimento total com cor neon + Glow externo.
- **Active:** Feedback de clique "Pressão" (`scale: 0.98`).

---

*Manual atualizado com pesquisa extensiva sobre tendências UX/UI 2025-2026*
*Foco especial em: Dashboards Enterprise, KPI Visualization, Data Storytelling, Brand Identity Unification, Alive Interface*
*Última atualização: 04/01/2026 - **V17.9.7 Compatible***