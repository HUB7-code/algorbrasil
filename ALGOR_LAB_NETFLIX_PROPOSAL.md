# 🎬 ALGOR LAB - Proposta de Design Estilo Netflix (IMPLEMENTADO)

**Status:** ✅ COMPLETADO (V20.0.0 - Fev/2026)
**Versão:** 1.0  
**Data:** 04/02/2026  
**Objetivo:** Transformar o Algor Lab em uma experiência premium de aprendizado

> **Nota:** Esta especificação foi implementada com sucesso no lançamento V20.0.0. Consulte o código em `frontend/app/academy/lab` para ver a implementação final.

---

## 🎯 Visão Geral

Criar uma experiência de aprendizado **extraordinária** para membros associados, inspirada no Netflix, com foco em:
- 🎬 **Descoberta visual** de conteúdo
- 🚀 **Navegação intuitiva** e sem fricção
- 💎 **Design premium** e imersivo
- 📱 **Responsivo** (desktop, tablet, mobile)
- 🔒 **Acesso exclusivo** para membros

---

## 📊 Tipos de Conteúdo

### **1. Vídeos (YouTube)**
- Aulas gravadas
- Webinars
- Palestras
- Tutoriais

### **2. Documentos**
- PDFs (guias, ebooks)
- Planilhas (Excel, Google Sheets)
- Apresentações (PowerPoint, Google Slides)
- Documentos (Word, Google Docs)

### **3. Links Externos**
- Artigos
- Ferramentas
- Recursos complementares

---

## 🎨 Design System - "Netflix Dark Premium"

### **Paleta de Cores**

```css
/* Background */
--bg-primary: #0A0E14;        /* Quase preto */
--bg-secondary: #141922;      /* Card background */
--bg-hover: #1F2937;          /* Hover state */

/* Accent Colors */
--accent-primary: #00FF94;    /* Verde neon (Algor) */
--accent-secondary: #00A3FF;  /* Azul elétrico */
--accent-tertiary: #8B5CF6;   /* Roxo */

/* Text */
--text-primary: #FFFFFF;
--text-secondary: #A0AEC0;
--text-tertiary: #718096;

/* Status */
--status-new: #00FF94;        /* Novo */
--status-progress: #FFB000;   /* Em progresso */
--status-completed: #10B981;  /* Concluído */
```

### **Typography**

```css
/* Headings */
--font-display: 'Orbitron', sans-serif;  /* Títulos */
--font-body: 'Inter', sans-serif;        /* Corpo */
--font-mono: 'JetBrains Mono', monospace; /* Código */
```

---

## 🏗️ Estrutura da Página

### **1. Hero Section (Destaque)**

**Inspiração:** Banner principal do Netflix

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [VÍDEO/IMAGEM DE FUNDO COM GRADIENT OVERLAY]         │
│                                                         │
│  🎓 ALGOR LAB                                          │
│  Laboratório de Excelência em Governança de IA         │
│                                                         │
│  [▶ CONTINUAR ASSISTINDO: ISO 42001 - Módulo 3]       │
│  [📚 MEU PROGRESSO: 67%]                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
- ✅ Vídeo/imagem de fundo com overlay escuro
- ✅ Título + subtítulo
- ✅ CTA "Continuar Assistindo" (último conteúdo)
- ✅ Barra de progresso geral
- ✅ Efeito parallax no scroll

---

### **2. Carrosséis de Conteúdo (Netflix-style)**

**Inspiração:** Rows horizontais do Netflix

#### **Categorias Sugeridas:**

```
┌─────────────────────────────────────────────────────────┐
│ 🔥 NOVOS CONTEÚDOS                                      │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │ Card │ │ Card │ │ Card │ │ Card │ │ Card │ →        │
│ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📚 CONTINUAR ASSISTINDO                                 │
│ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │ 67%  │ │ 34%  │ │ 12%  │                             │
│ └──────┘ └──────┘ └──────┘                             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🎯 TRILHAS DE APRENDIZADO                               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │ ISO  │ │ LGPD │ │ PL   │ │ Risk │                    │
│ │42001 │ │      │ │ 2338 │ │ Mgmt │                    │
│ └──────┘ └──────┘ └──────┘ └──────┘                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📄 DOCUMENTOS E PLANILHAS                               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │ PDF  │ │ Excel│ │ Docs │ │ PPT  │                    │
│ └──────┘ └──────┘ └──────┘ └──────┘                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ⭐ MAIS POPULARES                                        │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│ │ #1   │ │ #2   │ │ #3   │ │ #4   │                    │
│ └──────┘ └──────┘ └──────┘ └──────┘                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 🎬 WEBINARS E PALESTRAS                                 │
│ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │ Live │ │ Rec  │ │ Rec  │                             │
│ └──────┘ └──────┘ └──────┘                             │
└─────────────────────────────────────────────────────────┘
```

---

### **3. Card de Conteúdo (Design Detalhado)**

#### **Estado Normal:**
```
┌────────────────────────────┐
│                            │
│   [THUMBNAIL/PREVIEW]      │
│                            │
│   [BADGE: NOVO/PDF/VIDEO]  │
├────────────────────────────┤
│ Título do Conteúdo         │
│ 45 min • Módulo 3          │
│ ████░░░░░░ 40%            │
└────────────────────────────┘
```

#### **Estado Hover (Expansão Netflix):**
```
┌────────────────────────────────────────┐
│                                        │
│   [THUMBNAIL MAIOR + PLAY OVERLAY]     │
│                                        │
│   [BADGE: NOVO] [TIPO: PDF]           │
├────────────────────────────────────────┤
│ 📚 ISO 42001 - Módulo 3                │
│ Implementação de Controles             │
│                                        │
│ ⏱️ 45 min • 📊 Intermediário           │
│ 👤 Paulo Carvalho                      │
│                                        │
│ ████████░░ 40% concluído              │
│                                        │
│ [▶ CONTINUAR] [📥 DOWNLOAD] [ℹ️ INFO] │
└────────────────────────────────────────┘
```

**Elementos do Card:**
- ✅ Thumbnail/preview (16:9 para vídeos, custom para docs)
- ✅ Badge de tipo (VÍDEO, PDF, EXCEL, LINK)
- ✅ Badge de status (NOVO, EM PROGRESSO, CONCLUÍDO)
- ✅ Título + descrição curta
- ✅ Metadados (duração, nível, instrutor)
- ✅ Barra de progresso (se iniciado)
- ✅ Botões de ação (Play, Download, Info)
- ✅ Animação de expansão no hover
- ✅ Glassmorphism + neon glow

---

## 🎬 Interações e Animações

### **1. Scroll Horizontal (Carrossel)**
```javascript
// Comportamento Netflix
- Scroll suave com mouse wheel
- Botões de navegação (< >)
- Snap to grid
- Infinite scroll (lazy loading)
- Indicador de posição (dots)
```

### **2. Hover Effects**
```css
/* Card Hover */
.content-card:hover {
  transform: scale(1.1) translateY(-10px);
  z-index: 10;
  box-shadow: 0 20px 60px rgba(0, 255, 148, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Thumbnail Overlay */
.thumbnail:hover::after {
  opacity: 1; /* Play button overlay */
}
```

### **3. Loading States**
```
┌────────────────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░  │ Skeleton loading
│ ▓▓▓▓░░░░░░░░░░░░░░░░░░░░  │
│ ▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░  │
└────────────────────────────┘
```

---

## 🔍 Sistema de Busca e Filtros

### **Barra de Busca (Top)**
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Buscar cursos, documentos, vídeos...                 │
└─────────────────────────────────────────────────────────┘
```

### **Filtros Laterais (Opcional)**
```
┌─────────────────┐
│ FILTROS         │
├─────────────────┤
│ ☑ Vídeos        │
│ ☐ PDFs          │
│ ☐ Planilhas     │
│ ☐ Documentos    │
├─────────────────┤
│ NÍVEL           │
│ ☐ Iniciante     │
│ ☑ Intermediário │
│ ☐ Avançado      │
├─────────────────┤
│ TRILHA          │
│ ☑ ISO 42001     │
│ ☐ LGPD          │
│ ☐ PL 2338       │
└─────────────────┘
```

---

## 📱 Responsividade

### **Desktop (1920px+)**
- 5-6 cards por linha
- Carrossel com scroll horizontal
- Sidebar de filtros

### **Tablet (768px - 1919px)**
- 3-4 cards por linha
- Carrossel com botões de navegação
- Filtros em modal

### **Mobile (< 768px)**
- 1-2 cards por linha
- Scroll vertical (sem carrossel)
- Filtros em bottom sheet
- Hero simplificado

---

## 🎥 Página de Detalhes do Conteúdo

### **Layout (Inspiração: Netflix Player)**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           [VÍDEO PLAYER / PREVIEW]                      │
│                                                         │
│  [◀ VOLTAR]                    [📥 DOWNLOAD] [⋮ MAIS]  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ 📚 ISO 42001 - Módulo 3: Implementação de Controles    │
│                                                         │
│ ⏱️ 45 min • 📊 Intermediário • 👤 Paulo Carvalho       │
│ ████████░░ 40% concluído                               │
│                                                         │
│ [▶ CONTINUAR ASSISTINDO] [🔖 MARCAR COMO CONCLUÍDO]    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ DESCRIÇÃO                                               │
│ Neste módulo, você aprenderá a implementar controles   │
│ de segurança conforme a ISO 42001...                   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ MATERIAIS COMPLEMENTARES                                │
│ 📄 Checklist de Implementação.pdf                      │
│ 📊 Template de Controles.xlsx                          │
│ 📝 Guia de Boas Práticas.docx                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│ PRÓXIMO NA TRILHA                                       │
│ ┌──────┐ ┌──────┐ ┌──────┐                            │
│ │ Mod4 │ │ Mod5 │ │ Mod6 │                            │
│ └──────┘ └──────┘ └──────┘                            │
└─────────────────────────────────────────────────────────┘
```

**Elementos:**
- ✅ Player de vídeo (YouTube embed)
- ✅ Botão de download (para PDFs/planilhas)
- ✅ Progresso salvo automaticamente
- ✅ Materiais complementares
- ✅ Próximos conteúdos da trilha
- ✅ Breadcrumb de navegação

---

## 🗂️ Organização de Conteúdo (Backend)

### **Estrutura de Dados Sugerida**

```typescript
interface Content {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'pdf' | 'excel' | 'doc' | 'link';
  category: string; // "ISO 42001", "LGPD", etc.
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // em minutos
  instructor: string;
  thumbnail: string;
  url: string; // YouTube URL ou file path
  downloadUrl?: string; // Para PDFs/planilhas
  tags: string[];
  isNew: boolean;
  publishedAt: Date;
  
  // Trilha de aprendizado
  trackId?: string;
  trackOrder?: number;
  
  // Metadados
  views: number;
  completions: number;
}

interface UserProgress {
  userId: string;
  contentId: string;
  progress: number; // 0-100
  completed: boolean;
  lastWatchedAt: Date;
  watchTime: number; // em segundos
}

interface Track {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  contents: string[]; // IDs dos conteúdos
  totalDuration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
}
```

---

## 🎯 Funcionalidades Principais

### **1. Controle de Acesso**
```typescript
// Middleware de autenticação
- Verificar se usuário está logado
- Verificar se é membro associado
- Redirecionar para /login se não autenticado
- Mostrar mensagem de upgrade se não for membro
```

### **2. Progresso do Usuário**
```typescript
// Salvar progresso automaticamente
- Vídeo: a cada 10 segundos
- PDF: ao fechar visualizador
- Planilha/Doc: ao fazer download

// Calcular progresso geral
- Total de conteúdos concluídos / Total de conteúdos
- Progresso por trilha
- Tempo total de estudo
```

### **3. Sistema de Download**
```typescript
// Download de materiais
- PDFs: download direto
- Planilhas: download direto
- Documentos: download direto
- Vídeos: link para YouTube (não download)

// Tracking de downloads
- Registrar quem baixou
- Quando baixou
- Quantas vezes
```

### **4. Recomendações (Futuro)**
```typescript
// Algoritmo simples
- Baseado em conteúdos concluídos
- Baseado em trilhas iniciadas
- Baseado em popularidade
- Baseado em nível do usuário
```

---

## 🎨 Componentes React (Sugestão)

### **1. Hero Section**
```tsx
<HeroSection
  title="ALGOR LAB"
  subtitle="Laboratório de Excelência em Governança de IA"
  continueWatching={lastWatchedContent}
  overallProgress={67}
  backgroundImage="/images/hero-bg.webp"
/>
```

### **2. Content Carousel**
```tsx
<ContentCarousel
  title="🔥 Novos Conteúdos"
  contents={newContents}
  onCardClick={handleCardClick}
  onDownload={handleDownload}
/>
```

### **3. Content Card**
```tsx
<ContentCard
  content={content}
  userProgress={progress}
  onPlay={handlePlay}
  onDownload={handleDownload}
  onInfo={handleInfo}
/>
```

### **4. Content Detail Page**
```tsx
<ContentDetailPage
  content={content}
  userProgress={progress}
  relatedContents={nextInTrack}
  onComplete={handleComplete}
/>
```

---

## 📊 Métricas e Analytics

### **Dashboard do Membro**
```
┌─────────────────────────────────────────────────────────┐
│ MEU PROGRESSO                                           │
├─────────────────────────────────────────────────────────┤
│ 📚 Conteúdos Concluídos: 12/45 (27%)                   │
│ ⏱️ Tempo Total de Estudo: 18h 32min                     │
│ 🏆 Trilhas Completas: 1/5                               │
│ 📥 Downloads Realizados: 23                             │
│                                                         │
│ [VER CERTIFICADOS] [VER HISTÓRICO]                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Roadmap de Implementação

### **Fase 1: MVP (2-3 semanas)**
- ✅ Hero section com "Continuar Assistindo"
- ✅ 3 carrosséis básicos (Novos, Continuar, Populares)
- ✅ Card de conteúdo com hover
- ✅ Página de detalhes (vídeo + download)
- ✅ Sistema de progresso básico
- ✅ Controle de acesso (apenas membros)

### **Fase 2: Enhancements (2-3 semanas)**
- ✅ Busca e filtros
- ✅ Mais categorias de carrosséis
- ✅ Trilhas de aprendizado
- ✅ Dashboard de progresso
- ✅ Certificados de conclusão

### **Fase 3: Advanced (1-2 meses)**
- ✅ Recomendações personalizadas
- ✅ Gamificação (badges, pontos)
- ✅ Social learning (comentários, discussões)
- ✅ Notificações (novos conteúdos)
- ✅ Analytics avançado

---

## 💡 Inspirações Visuais

### **Referências de Design:**
1. **Netflix** - Carrosséis, hero, cards
2. **Disney+** - Trilhas de conteúdo, categorias
3. **Skillshare** - Progresso de cursos
4. **Coursera** - Estrutura de módulos
5. **Duolingo** - Gamificação, progresso

### **Paleta de Cores:**
- **Netflix:** Vermelho (#E50914) → **Algor:** Verde Neon (#00FF94)
- **Background:** Preto (#0A0E14)
- **Accent:** Azul Elétrico (#00A3FF), Roxo (#8B5CF6)

---

## 🎯 Diferenciais do Algor Lab

### **1. Exclusividade**
- ✅ Acesso apenas para membros associados
- ✅ Conteúdo premium e curado
- ✅ Materiais para download

### **2. Foco em Governança de IA**
- ✅ Conteúdo especializado
- ✅ Trilhas estruturadas (ISO 42001, LGPD, PL 2338)
- ✅ Instrutores especialistas (Board)

### **3. Experiência Premium**
- ✅ Design Netflix-style
- ✅ Navegação intuitiva
- ✅ Progresso salvo automaticamente
- ✅ Certificados de conclusão

### **4. Comunidade**
- ✅ Networking entre membros
- ✅ Discussões e fóruns (futuro)
- ✅ Eventos exclusivos (futuro)

---

## 📋 Checklist de Implementação

### **Design**
- [ ] Criar mockups no Figma
- [ ] Definir componentes reutilizáveis
- [ ] Criar biblioteca de ícones
- [ ] Definir animações e transições

### **Frontend**
- [ ] Criar componentes React
- [ ] Implementar carrosséis
- [ ] Implementar sistema de busca
- [ ] Implementar player de vídeo
- [ ] Implementar download de arquivos
- [ ] Implementar responsividade

### **Backend**
- [ ] Criar modelo de dados (Content, Track, UserProgress)
- [ ] Criar API endpoints
- [ ] Implementar upload de arquivos
- [ ] Implementar sistema de progresso
- [ ] Implementar controle de acesso

### **Conteúdo**
- [ ] Organizar vídeos no YouTube
- [ ] Preparar PDFs para download
- [ ] Preparar planilhas
- [ ] Criar thumbnails
- [ ] Escrever descrições

---

## 🎉 Conclusão

O **Algor Lab** será uma experiência **extraordinária** que:
- 🎬 **Encanta** visualmente (Netflix-style)
- 🚀 **Engaja** com navegação intuitiva
- 💎 **Entrega valor** com conteúdo premium
- 🔒 **Exclusivo** para membros associados
- 📱 **Acessível** em qualquer dispositivo

**Próximo passo:** Criar mockups no Figma e validar com stakeholders.

---

**Criado por:** Antigravity AI  
**Data:** 04/02/2026  
**Versão:** 1.0
