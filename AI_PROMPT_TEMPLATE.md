# ALGOR BRASIL - AI Prompt Template
> **Version:** 1.0  
> **Created:** 24/01/2026  
> **Purpose:** Standardized prompt for requesting new features/pages from AI agents

---

## How to Use This Template

When requesting new pages, components, or features from an AI (ChatGPT, Claude, Gemini, etc.), copy and customize this template. Replace `[placeholders]` with specific requirements.

---

## PROMPT TEMPLATE

```markdown
# CONTEXT

Create a [page/component/feature] for **ALGOR BRASIL** - the first Brazilian AI Governance Association, national branch of ALGOR UK.

## BRAND IDENTITY

**Positioning:** "The Science of Artificial Trust"  
We are NOT a generic AI consultancy. We are an INSTITUTE for AI standardization and certification.

**Target Audience:**
- C-Level Executives (CEOs, CTOs, CISOs)
- Data Protection Officers (DPOs)
- Corporate Legal Teams
- Compliance Managers

**Tone of Voice:**
- Premium institutional
- Scientific but accessible
- Absolute trust and authority
- No hype, only facts

**Value Proposition:**
1. **Executive Education** (ALGOR Academy) - ISO 42001 training
2. **Certification & Seal** - Algorithmic compliance auditing
3. **Elite Network** - AI Governance networking

---

## DESIGN SYSTEM (MANDATORY)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Deep Navy** | `#050A10` | Primary background |
| **Navy Dark** | `#0A1A2F` | Alternative dark, ambient glows |
| **Neon Green** | `#00FF94` | Primary accent, CTAs, PL 2338, Trust |
| **Electric Blue** | `#00A3FF` | Secondary accent, ISO 42001, Technology |
| **Purple** | `#8B5CF6` | Tertiary, Academy/Education |
| **Amber** | `#FFB000` | Warnings, Premium features |
| **Gold** | `#FFD700` | Board members, Elite badges |

### Visual Style

**Reference Inspiration:**
- Apple Vision Pro UI (glassmorphism)
- Power BI Premium Dark Mode (data dashboards)
- Stripe.com (subtle animations)
- Linear.app (minimalist premium)

**Required Visual Elements:**

1. **Glassmorphism Panels**
   ```tsx
   bg-white/[0.02] backdrop-blur-2xl border border-white/10 
   shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
   ```

2. **Luminous Borders**
   - Default: `border-white/10`
   - Hover: `border-[#00FF94]/50`
   - Active: `border-white/20`

3. **Colored Shadows** (NOT black)
   ```tsx
   shadow-[0_8px_32px_0_rgba(0,255,148,0.1)]  // Green glow
   shadow-[0_8px_32px_0_rgba(0,163,255,0.1)]  // Blue glow
   ```

4. **Grid Overlay** (decorative)
   ```tsx
   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[length:20px_20px]" />
   ```

5. **Ambient Glows** (background depth)
   ```tsx
   <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px]" />
   ```

6. **Micro-animations** (mandatory)
   - Hover: `scale-110`, `translate-y-[-5px]`
   - Transitions: `duration-500` or `duration-700`
   - Use Framer Motion for complex animations

7. **Live Status Indicators**
   ```tsx
   <span className="relative flex h-3 w-3">
     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF94] opacity-75" />
     <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF94]" />
   </span>
   ```

### Typography

**Font Stack:**
- **Display/Headlines:** Orbitron (Bold, 700) - Futuristic, institutional
- **Body Text:** Inter or Manrope (Light, 400) - Readability
- **Code/Data:** JetBrains Mono (Mono, 400) - Technical precision

**Scale:**
| Element | Size | Font | Weight |
|---------|------|------|--------|
| Hero Title | `text-5xl-7xl` | Orbitron | 700 |
| Section Heading | `text-3xl-5xl` | Orbitron | 700 |
| Card Title | `text-xl-2xl` | Orbitron | 600 |
| Body | `text-sm-base` | Inter | 400 |
| Caption | `text-xs` | Inter | 500 |
| Status Badge | `text-[10px] uppercase tracking-[0.2em]` | Mono | 700 |

---

## STRUCTURE

[Insert detailed wireframe/structure here - be specific about sections, layout, components]

**Example:**
```
1. HERO SECTION
   - 3D Neural Globe background (Three.js)
   - Headline: "Liderando a Era da Governança de IA"
   - 3 Glassmorphism stat cards (ISO 42001, Members, LGPD)
   - 2 CTAs: Primary (Green) + Secondary (Ghost)

2. ABOUT SECTION
   - Grid 2 columns
   - Left: Institutional text + trust badges
   - Right: 3 animated cards with metrics

3. [Continue with all sections...]
```

---

## TECHNICAL REQUIREMENTS

### Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React

### Performance
- Lazy load heavy images (`next/image` with `loading="lazy"`)
- Dynamic imports for 3D components: `dynamic(() => import(), { ssr: false })`
- Font optimization with `next/font/google`

### Accessibility
- WCAG AA contrast minimum
- ARIA labels on interactive elements
- Keyboard navigation functional
- Focus rings visible: `focus:ring-2 focus:ring-[#00FF94]/30`

---

## ASSET REFERENCES

Use real assets from `/public` directory:

**3D Icons (Transparent):**
- `/icon_audit_shield_alpha_1769190142041.png` - PL 2338, Regulation
- `/icon_iso_badge_alpha_1769190154805.png` - ISO 42001
- `/icon_global_network_alpha_*.png` - Networking

**Implementation:**
```tsx
<img 
  src="/icon_audit_shield_alpha_1769190142041.png"
  className="w-16 h-20 object-contain opacity-90 group-hover:scale-110 
             transition-transform duration-700 
             drop-shadow-[0_0_25px_rgba(0,255,148,0.4)] 
             mix-blend-screen"
/>
```

**Full Images:**
- `/images/educacao-executiva-full.png`
- `/images/certificacao-selo-full.png`
- `/images/rede-membros-full.png`
- `/images/nosso-processo.png`

---

## CRITICAL DIFFERENTIATORS

🚫 **DO NOT:**
1. Use generic placeholder text ("Lorem ipsum")
2. Create flat, 2D designs without depth
3. Use black drop-shadows
4. Ignore hover states
5. Mix font families randomly

✅ **DO:**
1. Use real assets from `/public`
2. Add depth with glassmorphism + shadows + glows
3. Implement micro-animations on ALL interactive elements
4. Use Orbitron for headlines, Inter for body
5. Follow 4px spacing scale (gap-4, p-8, mb-12, etc.)
6. Test responsive behavior (mobile 1-col, tablet 2-col, desktop 3-4 col)

---

## EXAMPLE OUTPUT STRUCTURE

```tsx
'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function [ComponentName]() {
  return (
    <section className="relative min-h-screen bg-[#050A10] text-white">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00FF94]/8 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Card Example */}
        <motion.div
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF94]/30 to-[#0A1A2F] rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700" />
          
          <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-8 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[length:20px_20px]" />
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="font-orbitron text-4xl font-bold text-white mb-4">
                [Your Content]
              </h2>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## VALIDATION CHECKLIST

Before submitting, verify:

- [ ] Uses glassmorphism (`bg-white/[0.02]` + `backdrop-blur-2xl`)
- [ ] Borders are subtle white (`border-white/10`)
- [ ] Shadows use colored glows, not black
- [ ] Typography uses Orbitron for headlines
- [ ] All interactive elements have hover animations
- [ ] 3D assets use `mix-blend-screen`
- [ ] Grid overlay present on glass panels
- [ ] Ambient glows in background
- [ ] Responsive tested (mobile/tablet/desktop)
- [ ] No placeholder content

---

**Template Version:** 1.0  
**Maintained by:** ALGOR Design System Team  
**Last Updated:** 24/01/2026
```

---

## Quick Reference Card

**One-liner for simple requests:**
> "Create a [feature] for ALGOR BRASIL using glassmorphism (bg-white/[0.02] + backdrop-blur-2xl), Orbitron font for headlines, neon green (#00FF94) accents, and Framer Motion animations. Reference: Apple Vision Pro UI + Power BI Dark Mode."
