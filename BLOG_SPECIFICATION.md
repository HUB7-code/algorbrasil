# 📰 ALGOR BRASIL - Blog Specification
**Version:** 1.0  
**Status:** ✅ Implemented  
**Date:** 24 Jan 2026

---

## 🎯 **Objetivo Estratégico**

O Blog ALGOR Insights foi criado para:
1. **SEO & Autoridade**: Posicionar ALGOR como referência em Governança de IA no Brasil
2. **Geração de Leads**: Converter visitantes em leads qualificados através de conteúdo educativo
3. **Thought Leadership**: Demonstrar expertise técnica e regulatória
4. **Educação de Mercado**: Preparar o mercado para adoção de governança de IA

---

## 🎨 **Design System - Editorial Premium**

### **Inspirações:**
- **Medium**: Tipografia otimizada para leitura longa
- **The Verge**: Layout moderno com imagens impactantes
- **Linear Blog**: Minimalismo sofisticado
- **Stripe Blog**: Profissionalismo técnico

### **Tipografia Editorial:**

```css
/* Lead Paragraph (Introdução) */
font-size: 1.375rem (22px)
line-height: 1.7
font-weight: 400
color: #d1d5db

/* Body Text */
font-size: 1.125rem (18px)
line-height: 1.8
font-weight: 300
color: #e5e7eb

/* Headings */
H2: 2rem (32px) - Orbitron Bold
H3: 1.5rem (24px) - Orbitron Semibold
```

### **Elementos Visuais:**

#### **Featured Article (Hero)**
- Layout: Grid 2 colunas (imagem + conteúdo)
- Badge "Destaque" com glow effect
- Hover: Scanline animation + gradient overlay
- Author card integrado

#### **Article Cards (Grid)**
- Bento Grid responsivo (1/2/3 colunas)
- Cover image com gradient placeholder
- Category badge flutuante
- Meta info: Data + tempo de leitura
- Hover: Lift effect + border glow

#### **Article Page**
- Max-width: 800px (leitura confortável)
- Sidebar fixo: Share buttons (Twitter, LinkedIn, Facebook, Copy)
- Back navigation (top-left)
- Author bio card (bottom)
- Related articles (3 cards)

---

## 📊 **Estrutura de Dados**

### **Post Object:**
```typescript
{
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  coverImage: string;
  category: 'Governança' | 'Compliance' | 'Regulação' | 'Tecnologia' | 'Ética' | 'Setorial';
  readTime: string; // "8 min"
  publishedAt: string; // "24 Jan 2026"
  updatedAt?: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  content: string; // HTML ou MDX
  featured?: boolean;
}
```

---

## 📝 **Pilares de Conteúdo**

### **1. Regulação & Compliance**
- PL 2338/2023 (Marco Legal da IA)
- ISO 42001 (Gestão de IA)
- LGPD e IA
- EU AI Act (impactos no Brasil)

### **2. Governança Técnica**
- Shadow AI
- Compliance as Code
- Auditoria de IA
- XAI (Explainable AI)

### **3. Estratégia de Negócios**
- ROI da Governança
- AI Discovery Sprint
- Casos setoriais (Fintech, Healthtech)

### **4. Ética & Sociedade**
- Viés Algorítmico
- Discriminação em IA
- Transparência e Accountability

---

## 🚀 **Roadmap de Implementação**

### **✅ Fase 1: MVP (Concluída)**
- [x] Página `/blog` com listagem
- [x] Página `/blog/[slug]` para artigos
- [x] Design system integrado
- [x] Filtros por categoria
- [x] Newsletter CTA
- [x] Share buttons
- [x] Related articles

### **🔄 Fase 2: CMS Integration (Próxima)**
- [ ] Integrar MDX para artigos em Markdown
- [ ] Sistema de tags
- [ ] Busca interna
- [ ] Paginação
- [ ] RSS Feed

### **📅 Fase 3: Analytics & SEO (Futuro)**
- [ ] Google Analytics 4
- [ ] Schema.org markup (Article)
- [ ] Open Graph tags
- [ ] Sitemap.xml automático
- [ ] Reading progress bar

### **🎯 Fase 4: Engagement (Futuro)**
- [ ] Comentários (Giscus/Disqus)
- [ ] Reações (👍 ❤️ 🔥)
- [ ] Tempo de leitura estimado
- [ ] Table of Contents (TOC)
- [ ] Code syntax highlighting

---

## 📐 **Boas Práticas de Diagramação**

### **Legibilidade:**
1. **Largura Máxima**: 65-75 caracteres por linha (800px)
2. **Line Height**: 1.7-1.8 para body text
3. **Parágrafos**: Espaçamento de 1.5rem entre parágrafos
4. **Contraste**: Texto #e5e7eb sobre fundo #050A10 (WCAG AAA)

### **Hierarquia Visual:**
1. **Lead Paragraph**: 22px, peso 400 (destaque)
2. **Body**: 18px, peso 300 (leitura confortável)
3. **Headings**: Orbitron (autoridade)
4. **Quotes**: Border-left + background sutil
5. **Code**: Monospace com syntax highlighting

### **Elementos Interativos:**
- **Links**: Underline on hover + cor #00FF94
- **Blockquotes**: Border-left #00FF94 + background rgba(0,255,148,0.05)
- **Tables**: Borders sutis + header destacado
- **CTA Boxes**: Gradient background + border glow

---

## 🎨 **Componentes Customizados**

### **1. Lead Paragraph**
```html
<p class="lead">Texto de abertura impactante...</p>
```

### **2. Blockquote com Citação**
```html
<blockquote>
  "Citação importante..."
  <cite>— Autor, Cargo</cite>
</blockquote>
```

### **3. CTA Box**
```html
<div class="cta-box">
  <h3>Título do CTA</h3>
  <p>Descrição...</p>
  <a href="/link" class="cta-button">Ação →</a>
</div>
```

### **4. Risk Table**
```html
<div class="risk-table">
  <table>
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

---

## 📊 **KPIs & Métricas**

### **Tráfego:**
- Meta: 5.000 visitas/mês em 6 meses
- Origem: 60% orgânico, 30% social, 10% direto

### **Engajamento:**
- Tempo médio na página: >3 minutos
- Taxa de rejeição: <50%
- Scroll depth: >75%

### **Conversão:**
- Newsletter signup: 2-5% dos visitantes
- Lead generation: 1-3% (via CTAs)
- Social shares: 10+ por artigo

### **SEO:**
- Top 3 no Google para "governança de IA Brasil"
- 10+ backlinks de sites relevantes
- Domain Authority: +5 pontos em 6 meses

---

## 🔧 **Próximas Melhorias Técnicas**

### **Performance:**
- [ ] Image optimization (WebP, lazy loading)
- [ ] Code splitting por rota
- [ ] Prefetch de artigos relacionados

### **Acessibilidade:**
- [ ] ARIA labels completos
- [ ] Navegação por teclado
- [ ] Screen reader optimization
- [ ] Contraste WCAG AAA

### **SEO Avançado:**
- [ ] JSON-LD structured data
- [ ] Breadcrumbs
- [ ] Canonical URLs
- [ ] Hreflang (PT-BR)

---

## 📚 **Conteúdo Inicial (6 Artigos)**

1. ✅ **Shadow AI: O Risco Invisível** (Featured)
2. ✅ **ISO 42001: Guia Completo**
3. ✅ **PL 2338/2023: Impactos para Empresas**
4. ✅ **Compliance as Code: O Futuro**
5. ✅ **XAI: Explicabilidade Obrigatória**
6. ✅ **Fintech e IA: Banco Central**
7. ✅ **Viés Algorítmico: 5 Cases Reais**

---

## 🎯 **Estratégia de Publicação**

### **Frequência:**
- **Fase 1**: 1 artigo/semana (4/mês)
- **Fase 2**: 2 artigos/semana (8/mês)
- **Fase 3**: 3 artigos/semana (12/mês)

### **Distribuição:**
- **LinkedIn**: Post com excerpt + link
- **Twitter**: Thread com highlights
- **Newsletter**: Resumo semanal
- **WhatsApp**: Grupos de membros ALGOR

---

**Documento criado por:** Antigravity Agent  
**Última atualização:** 24 Jan 2026
