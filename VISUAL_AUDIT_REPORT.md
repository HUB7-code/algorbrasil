# AUDITORIA VISUAL - POWER BI PREMIUM DARK MODE
**Data:** 27/12/2025  
**Objetivo:** Identificar páginas/componentes fora do padrão e aplicar correções

---

## ✅ PÁGINAS JÁ CONFORMES (Recentemente Atualizadas)

1. **`/solutions/enterprise`** - ✅ Redesenhada (V16.2.1)
2. **`/dashboard` (Main)** - ✅ Power BI Premium desde V15
3. **`/dashboard/clients`** - ✅ Conforme
4. **`/dashboard/report-iso42001`** - ✅ A4 Print-ready
5. **`EnterpriseLeadModal`** - ✅ Refinado (V16.2.1)

---

## ⚠️ PÁGINAS QUE PRECISAM REVISÃO

### 🔴 CRÍTICO (Inconsistências Visuais Graves)

1. **`/calculadora` (Calculator Page)**
   - **Problema:** Usa cores genéricas (blue-500, emerald-500, purple-500) em vez da paleta brand
   - **Correção:** Substituir por `#00A3FF`, `#00FF94`, `#F59E0B`
   - **Impacto:** Alta visibilidade (página de conversão)

2. **`/scanner` (Public Scanner)**
   - **Status:** Não auditado ainda
   - **Prioridade:** Alta (Persona A entry point)

3. **`/hub` (Knowledge Hub)**
   - **Status:** Criado recentemente mas precisa validação
   - **Prioridade:** Média

### 🟡 MODERADO (Pequenos Ajustes)

4. **`SpecialistContactModal`**
   - **Status:** Não auditado
   - **Prioridade:** Média

5. **`CreateOrganizationModal`**
   - **Status:** Não auditado
   - **Prioridade:** Baixa (uso interno)

6. **`/dashboard/risks`**
   - **Status:** Não auditado
   - **Prioridade:** Média

7. **`/dashboard/inventory`**
   - **Status:** Não auditado
   - **Prioridade:** Média

### 🟢 BAIXA PRIORIDADE

8. **Páginas de Políticas** (`/policies/*`)
   - **Razão:** Conteúdo legal, design secundário
   - **Prioridade:** Baixa

9. **`/onboarding`**
   - **Status:** Fluxo interno
   - **Prioridade:** Baixa

---

## 📋 PLANO DE AÇÃO

### Fase 1: Páginas Críticas de Conversão
- [ ] `/calculadora` - Atualizar paleta de cores
- [ ] `/scanner` - Validar design system

### Fase 2: Modais e Componentes
- [ ] `SpecialistContactModal`
- [ ] Outros modais do dashboard

### Fase 3: Páginas Internas
- [ ] `/dashboard/risks`
- [ ] `/dashboard/inventory`

---

## 🎨 PADRÃO POWER BI PREMIUM

### Cores Oficiais
```
Brand Green:   #00FF94  (Success, Growth, AI)
Brand Blue:    #00A3FF  (Technology, Trust)
Warning Gold:  #F59E0B  (Risk, Alerts)
Background:    #0A0E1A  (Deep Navy)
Surface:       #0A1A2F  (Cards)
Border:        rgba(255,255,255,0.05-0.1)
```

### Componentes
- **Cards:** `bg-[#0A1A2F]/60 border border-white/5 rounded-2xl`
- **Buttons:** `bg-[#00FF94] text-[#0A1A2F] rounded-xl`
- **Glassmorphism:** `backdrop-blur-xl bg-gradient-to-b from-[#131825] to-[#0A0E1A]`
- **Typography:** Serif para títulos, Sans para corpo

---

**Próximo Passo:** Corrigir `/calculadora` primeiro (maior impacto de conversão)
