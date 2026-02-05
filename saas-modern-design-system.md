# Design System - SaaS Modern Landing Pages

> Baseado nas referencias visuais: AdElevate e Quso.ai
> Estilo: Clean, Arejado, Tech-forward, Trust-building

---

## Cores (Color Tokens)

### Paleta Principal - Azul/Violeta Tech

#### Primary (Azul)
```css
--color-primary-50: #EFF6FF
--color-primary-100: #DBEAFE
--color-primary-200: #BFDBFE
--color-primary-300: #93C5FD
--color-primary-400: #60A5FA
--color-primary-500: #3B82F6
--color-primary-600: #2563EB
--color-primary-700: #1D4ED8
--color-primary-800: #1E40AF
--color-primary-900: #1E3A8A
```

#### Accent (Violeta/Roxo)
```css
--color-accent-50: #F5F3FF
--color-accent-100: #EDE9FE
--color-accent-200: #DDD6FE
--color-accent-300: #C4B5FD
--color-accent-400: #A78BFA
--color-accent-500: #8B5CF6
--color-accent-600: #7C3AED
--color-accent-700: #6D28D9
--color-accent-800: #5B21B6
--color-accent-900: #4C1D95
```

#### Background & Surface
```css
--color-bg-primary: #FFFFFF
--color-bg-secondary: #F8FAFC
--color-bg-tertiary: #F1F5F9
--color-bg-muted: #E2E8F0
--color-bg-elevated: #FFFFFF
--color-bg-hero: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)
```

#### Neutros
```css
--color-neutral-50: #F8FAFC
--color-neutral-100: #F1F5F9
--color-neutral-200: #E2E8F0
--color-neutral-300: #CBD5E1
--color-neutral-400: #94A3B8
--color-neutral-500: #64748B
--color-neutral-600: #475569
--color-neutral-700: #334155
--color-neutral-800: #1E293B
--color-neutral-900: #0F172A
```

#### Cores de Status
```css
--color-success-50: #F0FDF4
--color-success-100: #DCFCE7
--color-success-500: #22C55E
--color-success-600: #16A34A

--color-error-50: #FEF2F2
--color-error-100: #FEE2E2
--color-error-500: #EF4444
--color-error-600: #DC2626

--color-warning-50: #FFFBEB
--color-warning-100: #FEF3C7
--color-warning-500: #F59E0B
--color-warning-600: #D97706

--color-info-50: #EFF6FF
--color-info-100: #DBEAFE
--color-info-500: #3B82F6
--color-info-600: #2563EB
```

#### Cores de Redes Sociais
```css
--color-facebook: #1877F2
--color-instagram: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)
--color-whatsapp: #25D366
--color-youtube: #FF0000
--color-tiktok: #000000
--color-linkedin: #0A66C2
--color-twitter-x: #000000
--color-meta: #0081FB
```

---

### Tokens Semanticos

#### Texto
```css
--text-primary: var(--color-neutral-900)
--text-secondary: var(--color-neutral-700)
--text-tertiary: var(--color-neutral-600)
--text-muted: var(--color-neutral-500)
--text-placeholder: var(--color-neutral-400)
--text-disabled: var(--color-neutral-300)
--text-inverse: #FFFFFF
--text-brand: var(--color-primary-600)
--text-accent: var(--color-accent-600)
--text-link: var(--color-primary-600)
--text-link-hover: var(--color-primary-700)
```

#### Superficies
```css
--surface-page: var(--color-bg-primary)
--surface-elevated: var(--color-bg-elevated)
--surface-sunken: var(--color-bg-tertiary)
--surface-overlay: rgba(15, 23, 42, 0.5)
--surface-glass: rgba(255, 255, 255, 0.8)
--surface-glass-border: rgba(255, 255, 255, 0.5)
```

#### Bordas
```css
--border-default: var(--color-neutral-200)
--border-subtle: var(--color-neutral-100)
--border-strong: var(--color-neutral-300)
--border-focus: var(--color-primary-500)
--border-error: var(--color-error-500)
--border-accent: var(--color-accent-500)
```

---

## Tipografia

### Familia de Fontes
```css
--font-family-base: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-family-display: 'Plus Jakarta Sans', 'Inter', sans-serif;
--font-family-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Tamanhos de Fonte
```css
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
--text-5xl: 3rem
--text-6xl: 3.75rem
--text-7xl: 4.5rem
--text-8xl: 6rem
```

### Pesos de Fonte
```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
--font-extrabold: 800
```

### Altura de Linha
```css
--leading-none: 1
--leading-tight: 1.2
--leading-snug: 1.35
--leading-normal: 1.5
--leading-relaxed: 1.65
--leading-loose: 1.8
```

### Letter Spacing
```css
--tracking-tighter: -0.04em
--tracking-tight: -0.02em
--tracking-normal: 0
--tracking-wide: 0.02em
--tracking-wider: 0.05em
```

---

## Espacamento (8px Grid System)

### Escala de Espacamento
```css
--space-0: 0
--space-px: 1px
--space-0-5: 0.125rem
--space-1: 0.25rem
--space-1-5: 0.375rem
--space-2: 0.5rem
--space-2-5: 0.625rem
--space-3: 0.75rem
--space-4: 1rem
--space-5: 1.25rem
--space-6: 1.5rem
--space-8: 2rem
--space-10: 2.5rem
--space-12: 3rem
--space-14: 3.5rem
--space-16: 4rem
--space-20: 5rem
--space-24: 6rem
--space-32: 8rem
--space-40: 10rem
```

### Tokens Semanticos de Espacamento
```css
--spacing-component-xs: var(--space-2)
--spacing-component-sm: var(--space-3)
--spacing-component-md: var(--space-4)
--spacing-component-lg: var(--space-6)
--spacing-component-xl: var(--space-8)

--spacing-gap-xs: var(--space-2)
--spacing-gap-sm: var(--space-3)
--spacing-gap-md: var(--space-4)
--spacing-gap-lg: var(--space-6)
--spacing-gap-xl: var(--space-8)
--spacing-gap-2xl: var(--space-12)

--spacing-section-sm: var(--space-12)
--spacing-section-md: var(--space-16)
--spacing-section-lg: var(--space-20)
--spacing-section-xl: var(--space-24)
--spacing-section-2xl: var(--space-32)
```

---

## Border Radius
```css
--radius-none: 0
--radius-sm: 0.25rem
--radius-default: 0.5rem
--radius-md: 0.75rem
--radius-lg: 1rem
--radius-xl: 1.25rem
--radius-2xl: 1.5rem
--radius-3xl: 2rem
--radius-full: 9999px

--radius-button: var(--radius-default)
--radius-button-pill: var(--radius-full)
--radius-input: var(--radius-default)
--radius-card: var(--radius-xl)
--radius-card-lg: var(--radius-2xl)
--radius-modal: var(--radius-2xl)
--radius-badge: var(--radius-full)
--radius-avatar: var(--radius-full)
--radius-floating-element: var(--radius-xl)
```

---

## Sombras
```css
--shadow-xs: 0 1px 2px 0 rgba(15, 23, 42, 0.04);
--shadow-sm: 0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06);
--shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05);
--shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04);
--shadow-xl: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
--shadow-2xl: 0 25px 50px -12px rgba(15, 23, 42, 0.15);

--shadow-primary: 0 4px 14px 0 rgba(59, 130, 246, 0.35);
--shadow-primary-lg: 0 8px 25px 0 rgba(59, 130, 246, 0.30);

--shadow-accent: 0 4px 14px 0 rgba(139, 92, 246, 0.35);
--shadow-accent-lg: 0 8px 25px 0 rgba(139, 92, 246, 0.30);

--shadow-card: var(--shadow-md);
--shadow-card-hover: var(--shadow-xl);
--shadow-floating: var(--shadow-xl);
--shadow-dropdown: var(--shadow-lg);
--shadow-modal: var(--shadow-2xl);
--shadow-button-primary: var(--shadow-primary);
--shadow-button-primary-hover: var(--shadow-primary-lg);
```

---

## Transicoes e Animacoes

### Duracoes
```css
--duration-fast: 150ms
--duration-base: 200ms
--duration-slow: 300ms
--duration-slower: 500ms
```

### Easings
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1)
--ease-in: cubic-bezier(0.4, 0, 1, 1)
--ease-out: cubic-bezier(0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Gradientes
```css
--gradient-hero: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 30%, #EFF6FF 70%, #E0E7FF 100%);
--gradient-glow-primary: radial-gradient(ellipse 50% 50% at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
--gradient-glow-accent: radial-gradient(ellipse 50% 50% at 50% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
--gradient-mesh: radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.05) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(236, 72, 153, 0.05) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.05) 0px, transparent 50%);

--gradient-primary-button: linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-primary-600) 100%);
--gradient-accent-button: linear-gradient(135deg, var(--color-accent-500) 0%, var(--color-accent-600) 100%);
```

---

## Breakpoints
```css
--breakpoint-sm: 640px
--breakpoint-md: 768px
--breakpoint-lg: 1024px
--breakpoint-xl: 1280px
--breakpoint-2xl: 1536px
```

---

Versao: 1.0
Ultima Atualizacao: 04/02/2026
