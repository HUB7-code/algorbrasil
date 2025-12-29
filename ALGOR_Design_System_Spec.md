# TECHNICAL SPECIFICATION: ALGOR DESIGN SYSTEM
> **Version:** 2.0 (Power BI Premium Dark Mode)
> **Last Updated:** 26/12/2025
> **Target Agent:** Google Antigravity Agent (Gemini 3 Pro)
> **Context:** Frontend Architecture & UI Implementation
> **Style Guide:** Power BI Premium Dark Mode + Material 3 Expressive

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
| **Deep Navy (Background)** | `#0A0E1A` | Primary background |
| **Navy Dark** | `#0A1A2F` | Alternative dark |
| **Panel Background** | `#131825` | Card/panel surfaces |
| **Electric Blue** | `#00A3FF` | Secondary accent, links |
| **Neon Green** | `#00FF94` | Primary accent, success, CTAs |
| **Amber Warning** | `#F59E0B` | Warnings, caution states |
| **Purple Accent** | `#8B5CF6` | Tertiary, knowledge section |
| **Error Red** | `#EF4444` | Errors, critical alerts |
| **Gold Premium** | `#FFD700` | PRO badges, premium features |

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

## 3. Glassmorphism System

### 3.1 Glass Panel Class
```css
.glass-panel {
  background: linear-gradient(135deg, rgba(19, 24, 37, 0.9) 0%, rgba(10, 14, 26, 0.9) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}
```

### 3.2 Card Variants

| Variant | Background | Border | Usage |
|---------|------------|--------|-------|
| **Default Glass** | `bg-[#131825]/90` | `border-white/[0.06]` | Standard panels |
| **Hover Glass** | Same | `border-[#00FF94]/30` | Interactive cards |
| **Active Glass** | `bg-white/[0.06]` | `border-white/[0.08]` | Selected states |
| **Gradient Glass** | `from-[#131825] to-[#0A0E1A]` | `border-white/10` | Hero cards |

---

## 4. Typography System

### 4.1 Font Stack
```css
--font-display: 'Google Sans', system-ui, sans-serif;
--font-serif: 'Playfair Display', Georgia, serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 4.2 Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| **Display** | `text-5xl` (3rem) | 500 (font-serif) | Page titles |
| **Headline** | `text-2xl-3xl` | 500 (font-serif) | Section headings |
| **Title** | `text-lg-xl` | 600 | Card titles |
| **Body** | `text-sm-base` | 400 | Paragraphs |
| **Caption** | `text-xs` | 500 | Labels, hints |
| **Mono** | `text-sm font-mono` | 400 | Data, codes |
| **Status** | `text-[10px] font-mono uppercase tracking-[0.2em]` | 700 | Status badges |

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

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Columns | Margins |
|------------|-------|---------|---------|
| **Mobile** | < 640px | 1 | 16px |
| **Tablet** | 640px - 1023px | 2 | 24px |
| **Desktop** | 1024px - 1599px | 3-4 | 32px |
| **Wide** | 1600px+ | 4-6 | Auto (max-width: 1600px) |

---

## 10. Implementation Checklist

Before finalizing any component, verify:

- [ ] **Colors:** Using Power BI Premium palette (no Aurora violet/pink)
- [ ] **Animation:** Using Framer Motion (not CSS animations for complex states)
- [ ] **Glassmorphism:** Cards have `backdrop-blur` and translucent backgrounds
- [ ] **Hover States:** Neon glow effects on interactive elements
- [ ] **Typography:** Display text uses serif font, data uses monospace
- [ ] **LED Indicators:** Status badges have ping animation
- [ ] **Borders:** Using thin white/[0.06] borders, neon on hover
- [ ] **Shadows:** Using colored glow shadows, not black drop-shadows
- [ ] **Accessibility:** Focus rings visible (double ring pattern)
- [ ] **Responsive:** Tested on mobile, tablet, desktop

---

*Document maintained by ALGOR Design System. Version 2.0*