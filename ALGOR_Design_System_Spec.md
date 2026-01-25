# TECHNICAL SPECIFICATION: ALGOR DESIGN SYSTEM
> **Version:** 3.0 (Premium Glassmorphism + Power BI Dark)
> **Last Updated:** 24/01/2026
> **Target Agent:** Google Antigravity Agent (Gemini 3 Pro / Claude 4.5 Sonnet)
> **Context:** Frontend Architecture & UI Implementation
> **Style Guide:** Apple Vision Pro UI + Power BI Premium Dark Mode

---

## 1. Stack & Architecture Standards

### 1.1 Core Technologies
The agent must enforce the following technology stack:

| Technology | Version | Usage |
|------------|---------|-------|
| **Framework** | React 19+ | Functional Components, Hooks |
| **Build Tool** | Next.js 15 (App Router) | SSR, Routing |
| **Language** | TypeScript (Strict Mode) | Type safety |
| **Styling** | Tailwind CSS + Custom CSS | Utility-first |
| **Animation** | Framer Motion 11+ | Spring physics, gestures |
| **Icons** | Lucide React + Material Symbols | Dual iconography |
| **Charts** | Recharts 3.x | Data visualization |

### 1.2 Design Philosophy

**Primary Aesthetic:** "Power BI Premium Dark Mode"
- Deep navy backgrounds with ambient lighting
- Glassmorphism panels with neon accent borders
- Data-rich dashboards with animated KPIs
- LED status indicators and real-time feedback

**Dashboard Pattern:** "Bloomberg Terminal meets Cyber-Security"
- High information density
- Monospace fonts for data
- Color-coded status indicators
- Animated transitions

---

## 2. Color System

### 2.1 Core Palette

| Token | Hex Code | Usage |
|-------|----------|-------|
| **Deep Navy (Background)** | `#050A10` | Primary background (Updated v3.0) |
| **Navy Dark** | `#0A1A2F` | Alternative dark, ambient glows |
| **Panel Background** | `rgba(255,255,255,0.02)` | Glass card surfaces (Translucent) |
| **Electric Blue** | `#00A3FF` | Secondary accent, links, ISO badge |
| **Neon Green** | `#00FF94` | Primary accent, success, CTAs, PL 2338 |
| **Amber Warning** | `#FFB000` | Warnings, premium features |
| **Purple Accent** | `#8B5CF6` | Tertiary, Academy/Education |
| **Error Red** | `#EF4444` | Errors, critical alerts |
| **Gold Premium** | `#FFD700` | Board members, elite badges |

### 2.2 Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| **Primary Text** | `text-white` | Headlines, important |
| **Secondary Text** | `text-gray-400` | Body text |
| **Muted Text** | `text-gray-500` | Labels, captions |
| **Disabled Text** | `text-gray-600` | Inactive states |
| **Accent Text** | `text-[#00FF94]` | Highlighted, links |

### 2.3 Border Colors

| State | Value |
|-------|-------|
| **Default** | `border-white/[0.06]` or `border-white/10` |
| **Hover** | `border-white/20` or `border-[#00FF94]/30` |
| **Active** | `border-[#00FF94]/50` |
| **Focused** | `focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30` |

---

## 3. Glassmorphism System (v3.0)

### 3.1 Philosophy
**"Frosted Glass Transparency"** - Inspired by Apple Vision Pro UI
- Translucent backgrounds that reveal underlying layers
- Heavy blur effects for depth perception
- Subtle borders for definition
- Colored shadows instead of black drop-shadows

### 3.2 Glass Panel Classes

**Standard Glass Panel:**
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.02); /* Ultra-subtle white tint */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
}
```

**Tailwind Implementation:**
```tsx
className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
```

### 3.3 Card Variants

| Variant | Background | Border | Shadow | Usage |
|---------|------------|--------|--------|-------|
| **Default Glass** | `bg-white/[0.02]` | `border-white/10` | `shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]` | Standard panels |
| **Hover Glass** | Same | `border-[#00FF94]/50` | `shadow-[0_8px_32px_0_rgba(0,255,148,0.1)]` | Interactive cards |
| **Active Glass** | `bg-white/[0.06]` | `border-white/20` | Enhanced glow | Selected states |
| **Deep Glass** | `bg-[#0A111A]/90` | `border-white/10` | Standard | Legacy/Fallback |

### 3.4 Production Patterns

**Hero Card (Institute Page Style):**
```tsx
<div className="relative group perspective-1000 cursor-default">
  {/* Ambient Glow */}
  <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF94]/30 to-[#0A1A2F] rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" />
  
  {/* Glass Container */}
  <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 rounded-2xl group-hover:border-[#00FF94]/50 transition-all duration-500 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:shadow-[0_8px_32px_0_rgba(0,255,148,0.1)]">
    {/* Decorative Grid Background */}
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[length:20px_20px]" />
    
    {/* Content */}
    <div className="relative z-10">
      {/* Your content here */}
    </div>
  </div>
</div>
```

**Pillar Card (Offerings Style):**
```tsx
<div className="group relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#00FF94]/50 hover:to-[#00FF94]/5 transition-all duration-500">
  <div className="relative h-full bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[23px] p-10 overflow-hidden shadow-lg">
    {/* Ambient Glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF94]/5 rounded-full blur-2xl group-hover:bg-[#00FF94]/10 transition-all" />
    
    {/* Content */}
  </div>
</div>
```

### 3.5 Avatar/Badge Glass
```tsx
<div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/10 flex items-center justify-center">
  PhD
</div>
```

---

## 4. Typography System

### 4.1 Font Stack (v3.0)
```css
--font-orbitron: 'Orbitron', sans-serif; /* Display, Headlines, Tech */
--font-body: 'Inter', 'Manrope', system-ui, sans-serif; /* Body text */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* Code, Data */
```

**Next.js Implementation:**
```tsx
import { Orbitron, Inter } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
```

### 4.2 Scale

| Token | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| **Display** | `text-5xl-7xl` | 700 | Orbitron | Hero titles |
| **Headline** | `text-3xl-5xl` | 700 | Orbitron | Section headings |
| **Title** | `text-xl-2xl` | 600 | Orbitron | Card titles |
| **Body** | `text-sm-base` | 400 | Inter/Manrope | Paragraphs |
| **Caption** | `text-xs` | 500 | Inter | Labels, hints |
| **Mono** | `text-sm font-mono` | 400 | JetBrains Mono | Data, codes |
| **Status** | `text-[10px] font-mono uppercase tracking-[0.2em]` | 700 | JetBrains Mono | Status badges |

---

## 5. Animation System (Framer Motion)

### 5.1 Container Variants
```typescript
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { type: "spring", stiffness: 100 } 
    }
};
```

### 5.2 Hover Effects
```typescript
whileHover={{ scale: 1.02, borderColor: "#00FF9450" }}
whileTap={{ scale: 0.98 }}
```

### 5.3 LED Status Indicator
```tsx
<div className="relative flex h-2.5 w-2.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF94]" />
</div>
```

---

## 6. Component Patterns

### 6.1 Input Fields
```tsx
<input
    className="w-full h-14 bg-[#131825] border border-white/10 rounded-xl px-4 
               text-white focus:border-[#00FF94]/50 focus:ring-1 focus:ring-[#00FF94]/30 
               outline-none transition-all placeholder:text-gray-600 hover:border-white/20"
/>
```

### 6.2 Primary Button
```tsx
<motion.button
    whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(0,255,148,0.3)" }}
    whileTap={{ scale: 0.99 }}
    className="w-full h-14 rounded-xl bg-gradient-to-r from-[#00FF94] to-[#00CC76] 
               text-[#0A0E1A] font-bold tracking-wide border border-[#00FF94]/50 
               shadow-[0_0_30px_rgba(0,255,148,0.2)]"
>
```

### 6.3 Navigation Item (Sidebar)
```tsx
<motion.div
    className={`flex items-center gap-3 px-3 py-2.5 mx-2 rounded-xl text-sm font-medium 
                transition-all ${active ? 'bg-white/[0.06] text-white border border-white/[0.08]' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'}`}
    whileHover={{ x: 4 }}
>
```

### 6.4 Quick Stat Card
```tsx
<motion.div
    className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#131825] to-[#0A0E1A] 
               border border-white/[0.06] p-5 group hover:border-opacity-20"
    whileHover={{ scale: 1.02, borderColor: "#00FF9430" }}
>
```

---

## 7. Ambient Lighting Effects

### 7.1 Background Glows
```tsx
<div className="fixed inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px]" />
    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00A3FF]/8 rounded-full blur-[150px]" />
    <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#8B5CF6]/5 rounded-full blur-[120px]" />
</div>
```

### 7.2 Card Glow Effect (On Hover)
```tsx
<div 
    className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] 
               pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
    style={{ backgroundColor: "#00FF9410" }}
/>
```

---

## 8. Iconography

### 8.1 Lucide React (Primary)
```tsx
import { ShieldCheck, Activity, ArrowRight } from "lucide-react";

<ShieldCheck className="w-5 h-5 text-[#00FF94]" />
```

### 8.2 Material Symbols (Secondary)
```tsx
<span 
    className="material-symbols-rounded text-[20px]"
    style={{ 
        color: active ? accentColor : undefined,
        fontVariationSettings: active ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400"
    }}
>
    fact_check
</span>
```

### 8.3 Hyper-Realistic 3D (Premium)
For high-impact areas (Landing Page Stats, Hero Sections), use 3D glass renders with the "Neon/Black" technique.

**Implementation Standard:**
1.  **Source:** 3D Renders (Glass/Neon material) on **Pure Black (#000000)** background.
2.  **Blend Mode:** Apply `mix-blend-mode: screen` via CSS to transparentize the black background.
3.  **Masking:** Apply `radial-gradient` mask to eliminate bounding box edges.

```tsx
<div className="relative w-32 h-32">
    <Image 
        src="/assets/3d-icon-black.png" 
        fill 
        style={{ 
            mixBlendMode: 'screen',
            maskImage: 'radial-gradient(circle, black 50%, transparent 80%)'
        }} 
    />
</div>
```

---

## 9. Transparent 3D Assets (v3.0)

### 9.1 Asset Naming Convention
All 3D icons follow this pattern in `/public`:
- `icon_[name]_transparent.png` - Standard transparent PNG
- `icon_[name]_alpha_[timestamp].png` - Alpha channel optimized
- `icon_[name]_glass_[timestamp].png` - Glass material variant

### 9.2 Implementation Pattern
```tsx
<img 
  src="/icon_audit_shield_alpha_1769190142041.png" 
  alt="Shield" 
  className="w-16 h-20 object-contain opacity-90 group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_25px_rgba(0,255,148,0.4)] mix-blend-screen" 
/>
```

**Key Properties:**
- `mix-blend-screen` - Removes any residual black background
- `drop-shadow-[0_0_25px_rgba(...)]` - Colored glow instead of black shadow
- `object-contain` - Preserves aspect ratio
- `opacity-90` - Slight transparency for glass integration

### 9.3 Available Assets
| Asset | Path | Color Theme | Usage |
|-------|------|-------------|-------|
| **Audit Shield** | `/icon_audit_shield_alpha_*.png` | Green | PL 2338, Regulation |
| **ISO Badge** | `/icon_iso_badge_alpha_*.png` | Blue | ISO 42001, Standards |
| **Global Network** | `/icon_global_network_alpha_*.png` | Multi | Networking, Members |
| **Audit Docs** | `/icon_audit_docs_3d_navy.png` | Navy | Documentation |

---

## 10. AI Prompt Template (For Future Development)

When requesting new pages/features from AI, use this structure:

```markdown
# CONTEXT
Create a [page/component] for ALGOR BRASIL - the first Brazilian AI Governance Association.

**Brand Identity:**
- Positioning: "The Science of Artificial Trust"
- Audience: C-Level, CTOs, DPOs, Corporate Legal
- Tone: Premium institutional, scientific but accessible

## DESIGN SYSTEM (MANDATORY)

### Colors
- Background: Deep Navy (#050A10, #0A1A2F)
- Primary Accent: Neon Green (#00FF94) - Trust/Certification
- Secondary: Electric Blue (#00A3FF) - Technology/Standards
- Tertiary: Purple (#8B5CF6) - Education/Academy

### Visual Style
**Reference:** Apple Vision Pro UI + Power BI Premium Dark Mode

**Required Elements:**
1. Glassmorphism: `bg-white/[0.02]` + `backdrop-blur-2xl`
2. Luminous Borders: `border-white/10` → `hover:border-[#00FF94]/50`
3. Deep Shadows: `shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]`
4. Grid Overlay: `bg-[url('/grid.svg')] opacity-[0.05]`
5. Ambient Glows: Blurred circles (`blur-[120px]`) with neon colors
6. Micro-animations: Hover `scale-110`, `translate-y-[-5px]`, 500ms transitions
7. Live Indicators: Pulsing dots (`animate-ping`) for active status

### Typography
- Display/Headlines: **Orbitron** (Bold, 700)
- Body: **Inter/Manrope** (Light, 400)
- Mono: **JetBrains Mono** (Code/Data)

## STRUCTURE
[Detailed wireframe here]

## TECHNICAL REQUIREMENTS
- Framework: Next.js 14+ (App Router)
- Animation: Framer Motion
- Styling: Tailwind CSS
- TypeScript: Strict mode

## CRITICAL DIFFERENTIATORS
1. No generic placeholders - use real assets from `/public`
2. Avoid flat UI - always add depth (shadows, glows, layers)
3. Micro-animations are mandatory - hover states must "wow"
4. Orbitron for impact, Inter for readability
5. Consistent spacing - 4px scale (gap-4, p-8, mb-12)
```

---

## 11. Responsive Breakpoints

| Breakpoint | Width | Columns | Margins |
|------------|-------|---------|---------|
| **Mobile** | < 640px | 1 | 16px |
| **Tablet** | 640px - 1023px | 2 | 24px |
| **Desktop** | 1024px - 1599px | 3-4 | 32px |
| **Wide** | 1600px+ | 4-6 | Auto (max-width: 1600px) |

---

## 12. Implementation Checklist (v3.0)

Before finalizing any component, verify:

- [ ] **Colors:** Using refined palette (#050A10 background, not #0A0E1A)
- [ ] **Glassmorphism:** Cards use `bg-white/[0.02]` + `backdrop-blur-2xl` (not solid backgrounds)
- [ ] **Borders:** Subtle `border-white/10`, neon on hover (`border-[#00FF94]/50`)
- [ ] **Shadows:** Colored glows `shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]`, not black drop-shadows
- [ ] **Typography:** Orbitron for display/headlines, Inter for body text
- [ ] **Animation:** Using Framer Motion with spring physics
- [ ] **Hover States:** Neon glow effects + scale transformations (1.02-1.1)
- [ ] **LED Indicators:** Status badges have `animate-ping` effect
- [ ] **3D Assets:** Using `_alpha` versions with `mix-blend-screen`
- [ ] **Grid Overlay:** Decorative grid at `opacity-[0.05]` on glass panels
- [ ] **Ambient Glows:** Background blur circles for depth
- [ ] **Accessibility:** Focus rings visible, ARIA labels present
- [ ] **Responsive:** Tested on mobile (1 col), tablet (2 col), desktop (3-4 col)
- [ ] **Performance:** Lazy loading for heavy assets, dynamic imports for 3D

---

**Document Version:** 3.0 (Premium Glassmorphism Era)  
**Maintained by:** ALGOR Design System Team  
**Last Major Update:** 24/01/2026  
**Breaking Changes from v2.0:**
- Glassmorphism backgrounds changed from `bg-[#131825]/90` to `bg-white/[0.02]`
- Typography shifted from Google Sans/Playfair to Orbitron/Inter
- Shadow system now uses colored glows instead of black shadows
- 3D assets require `mix-blend-screen` for proper transparency