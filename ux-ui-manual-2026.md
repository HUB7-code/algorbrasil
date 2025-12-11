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

**3. Status e Confirmação**
- Checkmark animado em sucesso
- Shake em erro (sutil)
- Ícones que mudam: "Save" → "Saved ✓"

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

## 🛠️ Ferramentas e Recursos {#ferramentas}

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

## 🎯 Checklist Final: Lançamento de Site 2026

### Design Visual
- [ ] Design system definido e documentado
- [ ] Paleta de cores com contraste acessível
- [ ] Tipografia escalável (variable fonts)
- [ ] Grid responsivo (mobile-first)
- [ ] Dark mode implementado
- [ ] Animações com propósito

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
- [ ] Teste em dispositivos reais

### Acessibilidade
- [ ] Contraste WCAG AA em todo site
- [ ] HTML semântico usado corretamente
- [ ] Alt text em todas as imagens
- [ ] ARIA labels quando necessário
- [ ] Focus states visíveis
- [ ] Testado com screen reader

### SEO e Analytics
- [ ] Meta tags otimizadas
- [ ] Structured data implementado
- [ ] Sitemap XML
- [ ] Analytics configurado
- [ ] Search console verificado

---

## 🌟 Conclusão

O design em 2026 não é sobre seguir todas as tendências, mas sobre escolher as que servem seus usuários. Priorize:

1. **Usabilidade**: Facilite a vida do usuário
2. **Acessibilidade**: Inclua todos desde o início
3. **Performance**: Rápido é melhor
4. **Autenticidade**: Seja genuíno, não genérico
5. **Iteração**: Teste, aprenda, melhore

**Lembre-se**: Bom design resolve problemas reais, não apenas parece bonito.

---

*Manual compilado a partir de pesquisas extensivas sobre tendências UX/UI 2025-2026*
*Última atualização: Dezembro 2025*