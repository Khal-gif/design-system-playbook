# Advanced Customization Guide

Complete guide to customizing the Design System Law Book beyond basic brand colors, including typography modifications, spacing adjustments, component overrides, and adding new design patterns while maintaining system integrity.

## Overview

While the Design System Law Book enforces strict consistency, it provides several controlled customization points:

1. **Brand Configuration** - Colors, personality, temperature
2. **Typography Scaling** - Adjust size relationships while keeping Mulish
3. **Spacing Modifications** - Adjust 8-point grid scaling
4. **Component Extensions** - Add new variants while following patterns
5. **Project-Specific Overrides** - Controlled deviations for specific needs

## Brand Configuration Deep Dive

### Full Brand Configuration

```json
{
  "project": {
    "name": "Advanced Project",
    "version": "2.0.0",
    "created": "2024-01-18",
    "designSystemVersion": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,
      "saturation": 0.8,
      "lightness": 0.5
    },
    "secondaryColor": {
      "hue": 280,
      "saturation": 0.6,
      "lightness": 0.6
    },
    "neutralTemperature": "cool",        // "cool", "warm", "neutral"
    "brandPersonality": "professional",  // "professional", "playful", "elegant"
    "accentColors": {
      "success": { "hue": 140, "saturation": 0.7, "lightness": 0.5 },
      "warning": { "hue": 45, "saturation": 0.8, "lightness": 0.55 },
      "error": { "hue": 0, "saturation": 0.7, "lightness": 0.5 },
      "info": { "hue": 200, "saturation": 0.7, "lightness": 0.5 }
    }
  },
  
  "typography": {
    "fontFamily": "Mulish",     // Always Mulish
    "scaleRatio": 1.25,         // 1.2 = tight, 1.25 = default, 1.3 = loose
    "baseSize": 16,             // 14-18px acceptable
    "lineHeightRatio": 1.6      // 1.4-1.8 acceptable
  },
  
  "spacing": {
    "baseUnit": 4,              // Always 4px for 8-point grid
    "scaleRatio": 1.5,          // 1.2-1.8 acceptable
    "componentDensity": "medium" // "compact", "medium", "loose"
  },
  
  "borderRadius": {
    "baseRadius": 6,            // 4-8px acceptable
    "scaleRatio": 1.5           // How much each level increases
  },
  
  "validation": {
    "strict": true,             // Enforce all rules strictly
    "enforceCompliance": true,  // Exit on violations
    "exitOnViolations": true,   // Fail builds on violations
    "allowOverrides": false     // Allow escape hatches
  }
}
```

## Typography Customization

### 8-Point Grid Typography

All typography must follow the 8-point and 4-point grid system:

```json
{
  "typography": {
    "baseSize": 16,             // Always 16px (divisible by 8)
    "scaleType": "8-point-grid", // Fixed scale following grid
    "lineHeightMultiple": 1.5   // Creates 24px line height (16×1.5=24, divisible by 8)
  }
}
```

**8-Point Grid Typography Scale:**
```css
:root {
  --font-size-xs: 0.75rem;     /* 12px ✅ (12÷4=3) */
  --font-size-sm: 0.875rem;    /* 14px ❌ → Use 16px */
  --font-size-base: 1rem;      /* 16px ✅ (16÷8=2) */
  --font-size-lg: 1.5rem;      /* 24px ✅ (24÷8=3) */
  --font-size-xl: 2rem;        /* 32px ✅ (32÷8=4) */
  --font-size-2xl: 2.5rem;     /* 40px ✅ (40÷8=5) */
  --font-size-3xl: 3rem;       /* 48px ✅ (48÷8=6) - MAXIMUM */
}
```

**Corrected Typography Scale:**
```css
/* All sizes divisible by 8 or 4 */
text-xs:   12px  ✅ (12÷4=3)
text-sm:   16px  ✅ (16÷8=2) [same as base for grid compliance]
text-base: 16px  ✅ (16÷8=2) [standard body text]  
text-lg:   24px  ✅ (24÷8=3) [large text]
text-xl:   32px  ✅ (32÷8=4) [headings]
text-2xl:  40px  ✅ (40÷8=5) [large headings]
text-3xl:  48px  ✅ (48÷8=6) [maximum allowed size]
```

### 8-Point Grid Line Heights

```css
/* Line heights must also follow 8-point grid */
16px text → 24px line-height ✅ (24÷8=3) [1.5x ratio]
24px text → 32px line-height ✅ (32÷8=4) [1.33x ratio]
32px text → 40px line-height ✅ (40÷8=5) [1.25x ratio]
48px text → 56px line-height ✅ (56÷8=7) [1.17x ratio]
```

### Font Loading Optimization

Add to your project after token generation:

```css
/* src/font-loading.css */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');

:root {
  --font-family-primary: 'Mulish', 'Inter', system-ui, sans-serif;
}
```

## Spacing System Customization

### 8-Point Grid Spacing System

All spacing must follow the strict 8-point and 4-point grid:

```json
{
  "spacing": {
    "baseUnit": 4,              // Always 4px base unit
    "gridSystem": "8-point",    // Strict grid compliance
    "allowedValues": [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96, 112, 128]
  }
}
```

**8-Point Grid Spacing Scale:**
```css
/* All Tailwind spacing classes that follow the grid */
p-0  = 0px   ✅ (0÷8=0)
p-1  = 4px   ✅ (4÷4=1)
p-2  = 8px   ✅ (8÷8=1)
p-3  = 12px  ✅ (12÷4=3)
p-4  = 16px  ✅ (16÷8=2)
p-5  = 20px  ✅ (20÷4=5)
p-6  = 24px  ✅ (24÷8=3)
p-7  = 28px  ✅ (28÷4=7)
p-8  = 32px  ✅ (32÷8=4)
p-10 = 40px  ✅ (40÷8=5)
p-12 = 48px  ✅ (48÷8=6)
p-16 = 64px  ✅ (64÷8=8)
p-20 = 80px  ✅ (80÷8=10)
p-24 = 96px  ✅ (96÷8=12)
```

**Forbidden Arbitrary Spacing:**
```css
p-[25px]  ❌ (25÷4=6.25, not whole number)
p-[18px]  ❌ (18÷4=4.5, not whole number)  
p-[30px]  ❌ (30÷4=7.5, not whole number)
p-[22px]  ❌ (22÷4=5.5, not whole number)
```

### Component Density (Grid-Compliant)

```json
{
  "spacing": {
    "componentDensity": "compact"  // All options follow grid
  }
}
```

**Density Variations (All Grid-Compliant):**
- **"compact"**: p-4 (16px) instead of p-6 (24px)
- **"medium"**: p-6 (24px) - standard
- **"loose"**: p-8 (32px) instead of p-6 (24px)

All variations maintain 8-point grid compliance.

## Border Radius Customization

### 8-Point Grid Border Radius

All border radius values must follow the 8-point and 4-point grid:

```json
{
  "borderRadius": {
    "baseRadius": 8,            // Always divisible by 8 or 4
    "gridCompliant": true,      // Enforce grid compliance
    "allowedValues": [0, 4, 8, 12, 16, 24, 32, 48]
  }
}
```

**8-Point Grid Border Radius Scale:**
```css
:root {
  --radius-none: 0px;          /* 0px ✅ (0÷8=0) */
  --radius-sm: 0.25rem;        /* 4px ✅ (4÷4=1) */
  --radius-base: 0.5rem;       /* 8px ✅ (8÷8=1) */
  --radius-md: 0.75rem;        /* 12px ✅ (12÷4=3) */
  --radius-lg: 1rem;           /* 16px ✅ (16÷8=2) */
  --radius-xl: 1.5rem;         /* 24px ✅ (24÷8=3) */
  --radius-2xl: 2rem;          /* 32px ✅ (32÷8=4) */
  --radius-3xl: 3rem;          /* 48px ✅ (48÷8=6) */
  --radius-full: 9999px;       /* Full circle - special case */
}
```

**Component Usage (Grid-Compliant):**
```css
/* Buttons */
rounded-sm   = 4px   ✅ (small buttons)
rounded-base = 8px   ✅ (standard buttons) 
rounded-md   = 12px  ✅ (large buttons)

/* Cards */
rounded-lg   = 16px  ✅ (standard cards)
rounded-xl   = 24px  ✅ (feature cards)
rounded-2xl  = 32px  ✅ (hero cards)

/* Form Elements */
rounded-base = 8px   ✅ (inputs, selects)
rounded-md   = 12px  ✅ (textareas)
```

**Forbidden Arbitrary Radius:**
```css
rounded-[6px]   ❌ (6÷4=1.5, not whole number)
rounded-[10px]  ❌ (10÷4=2.5, not whole number)
rounded-[14px]  ❌ (14÷4=3.5, not whole number)
```

## Component Extensions

### Adding New Button Variants

Create `src/component-extensions.css`:

```css
:root {
  /* Extend button tokens with new variants */
  --button-success-background: hsl(var(--success));
  --button-success-foreground: hsl(var(--success-foreground));
  --button-success-background-hover: hsl(var(--success-600));
  
  --button-warning-background: hsl(var(--warning));
  --button-warning-foreground: hsl(var(--warning-foreground));
  --button-warning-background-hover: hsl(var(--warning-600));
  
  --button-danger-background: hsl(var(--error));
  --button-danger-foreground: hsl(var(--error-foreground));
  --button-danger-background-hover: hsl(var(--error-600));
}
```

### Extended Button Component

```tsx
// src/components/ExtendedButton.tsx
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  // Base classes - unchanged
  "font-sans inline-flex items-center justify-center font-medium",
  {
    variants: {
      variant: {
        // Standard variants
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border bg-background",
        
        // Custom variants following system patterns
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground", 
        danger: "bg-error text-error-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        // Standard sizes - unchanged
        sm: "h-8 px-4 text-sm",      // 8-point grid
        default: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-base",
        
        // Custom sizes following 8-point grid
        xs: "h-6 px-3 text-xs",      // 24px height
        xl: "h-14 px-10 text-lg"     // 56px height
      }
    }
  }
)
```

### Adding Form Variations

```css
:root {
  /* Extended input variants */
  --input-success-border: hsl(var(--success));
  --input-success-focus-ring: hsl(var(--success) / 0.3);
  
  --input-error-border: hsl(var(--error));
  --input-error-focus-ring: hsl(var(--error) / 0.3);
  
  /* Size variations following 8-point grid */
  --input-height-sm: 2rem;     /* 32px - h-8 */
  --input-height-md: 2.5rem;   /* 40px - h-10 (default) */
  --input-height-lg: 3rem;     /* 48px - h-12 */
}
```

## Project-Specific Overrides

### Creating Override Files

**1. Create override file:**
```bash
# In your deployed project
touch src/design-overrides.css
```

**2. Add controlled overrides:**
```css
/* src/design-overrides.css */
:root {
  /* Override specific semantic tokens */
  --card-padding: var(--spacing-component-xl);     /* More padding */
  --button-height-default: 3rem;                   /* Taller buttons */
  --input-border-radius: var(--radius-lg);         /* More rounded inputs */
  
  /* Add project-specific tokens */
  --hero-padding-y: var(--spacing-layout-xl);      /* Hero section spacing */
  --sidebar-width: 18rem;                          /* Fixed sidebar width */
}
```

**3. Import in main CSS:**
```css
/* src/globals.css - after generated tokens */
@import './design-overrides.css';
```

### Validation Escape Hatches

For rare cases requiring system violations:

```json
{
  "validation": {
    "allowOverrides": true      // Enable escape hatches
  }
}
```

**Use escape hatch classes:**
```tsx
// Emergency override - use sparingly
<div className="ds-override p-[18px] text-[22px]">
  This content has specific requirements
</div>
```

**Add to validation config:**
```css
/* These classes bypass validation */
.ds-override,
.ds-legacy,
.ds-external {
  /* Validation scripts ignore these classes */
}
```

## Dark Mode Integration

### Automatic Dark Mode Tokens

Add dark mode variants to your configuration:

```css
/* src/dark-mode.css */
@media (prefers-color-scheme: dark) {
  :root {
    /* Dark mode semantic tokens */
    --background: var(--foundation-neutral-950);
    --foreground: var(--foundation-neutral-50);
    --card: var(--foundation-neutral-900);
    --card-foreground: var(--foundation-neutral-100);
    --muted: var(--foundation-neutral-800);
    --muted-foreground: var(--foundation-neutral-400);
    --border: var(--foundation-neutral-800);
    --input: var(--foundation-neutral-800);
  }
}

/* Manual dark mode toggle */
[data-theme="dark"] {
  /* Same dark tokens for manual control */
}
```

### Dark Mode Toggle Implementation

```tsx
// src/components/ThemeToggle.tsx
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  return (
    <button
      className="bg-muted text-muted-foreground h-10 px-4 rounded-base"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

## Animation and Transitions

### System-Consistent Animations

```css
/* src/animations.css */
:root {
  /* Animation tokens following system principles */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Animation distances following spacing */
  --animation-distance-sm: var(--spacing-component-xs);   /* 8px */
  --animation-distance-md: var(--spacing-component-sm);   /* 12px */
}

/* Apply to components */
.button-primary {
  transition: all var(--transition-base);
}

.card {
  transition: 
    transform var(--transition-base),
    box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(calc(var(--animation-distance-sm) * -1));
  box-shadow: 0 8px 24px hsl(var(--primary) / 0.1);
}
```

## Responsive Design Extensions

### System-Consistent Breakpoints

```css
/* src/responsive.css */
:root {
  /* Responsive tokens following 8-point grid */
  --breakpoint-sm: 40rem;      /* 640px */
  --breakpoint-md: 48rem;      /* 768px */
  --breakpoint-lg: 64rem;      /* 1024px */
  --breakpoint-xl: 80rem;      /* 1280px */
  
  /* Responsive spacing multipliers */
  --spacing-mobile-multiplier: 0.75;    /* Tighter on mobile */
  --spacing-desktop-multiplier: 1.25;   /* Looser on desktop */
}

@media (max-width: 40rem) {
  :root {
    /* Mobile adjustments */
    --spacing-component-md: calc(var(--foundation-space-4) * var(--spacing-mobile-multiplier));
    --button-height-default: 2.75rem;   /* Slightly taller for touch */
  }
}

@media (min-width: 64rem) {
  :root {
    /* Desktop enhancements */
    --spacing-layout-md: calc(var(--foundation-space-12) * var(--spacing-desktop-multiplier));
  }
}
```

## Testing Customizations

### Validate Custom Configurations

```bash
# Test token generation with custom config
.claude/commands/generate-tokens.sh

# Validate all customizations follow rules
.claude/scripts/design-check.sh src/

# Test specific overrides
.claude/scripts/spacing-check.sh src/design-overrides.css
```

### Custom Validation Rules

Add project-specific validation:

```bash
# .claude/scripts/project-validation.sh
#!/bin/bash
echo "🎨 Project-specific validation..."

# Check override files exist
if [ ! -f "src/design-overrides.css" ]; then
  echo "⚠️  Missing design overrides file"
fi

# Check dark mode implementation
if ! grep -q "prefers-color-scheme: dark" src/*.css; then
  echo "⚠️  Dark mode not implemented"
fi

echo "✅ Project validation complete"
```

## Synchronizing Customizations

### Sharing Customizations Across Projects

**1. Document custom patterns:**
```bash
# .claude/docs/project-customizations.md
# Project-Specific Customizations
- Extended button variants: success, warning, danger
- Custom spacing for hero sections
- Dark mode implementation
- Animation system
```

**2. Create reusable override templates:**
```bash
# .claude/templates/customization-templates/
├── dark-mode-template.css
├── extended-buttons-template.tsx
├── animation-system-template.css
└── responsive-adjustments-template.css
```

**3. Update deployment script:**
```bash
# Add to deploy-to-project.sh
cp .claude/templates/customization-templates/* "$TARGET_DIR/src/"
```

## Component Styling Guidelines

### 8-Point Grid Shadow & Elevation System

All shadow offset and blur values must follow the 8-point and 4-point grid:

```css
:root {
  /* 8-Point Grid Elevation System */
  --shadow-xs: 0 0 0 1px rgb(0 0 0 / 0.05);                      /* 0px offset ✅ */
  --shadow-sm: 0 2px 4px 0 rgb(0 0 0 / 0.1);                     /* 2px,4px ❌ → Use 4px,8px */
  --shadow-md: 0 4px 8px -2px rgb(0 0 0 / 0.1);                  /* 4px,8px ✅ (grid-compliant) */
  --shadow-lg: 0 8px 16px -4px rgb(0 0 0 / 0.1);                 /* 8px,16px ✅ (grid-compliant) */
  --shadow-xl: 0 16px 32px -8px rgb(0 0 0 / 0.1);                /* 16px,32px ✅ (grid-compliant) */
  --shadow-2xl: 0 24px 48px -12px rgb(0 0 0 / 0.25);             /* 24px,48px ✅ (grid-compliant) */
  
  /* Grid-Compliant Colored Shadows */
  --shadow-primary: 0 4px 16px 0 rgb(var(--primary) / 0.15);     /* 4px,16px ✅ */
  --shadow-success: 0 4px 16px 0 rgb(34 197 94 / 0.15);          /* 4px,16px ✅ */
  --shadow-warning: 0 4px 16px 0 rgb(245 158 11 / 0.15);         /* 4px,16px ✅ */
  --shadow-error: 0 4px 16px 0 rgb(239 68 68 / 0.15);            /* 4px,16px ✅ */
}
```

**8-Point Grid Shadow Values:**
```css
/* Y-offset and blur must be divisible by 8 or 4 */
0 4px 8px    ✅ (4÷4=1, 8÷8=1)
0 8px 16px   ✅ (8÷8=1, 16÷8=2)
0 16px 32px  ✅ (16÷8=2, 32÷8=4)
0 24px 48px  ✅ (24÷8=3, 48÷8=6)

/* Forbidden non-grid values */
0 3px 6px    ❌ (3÷4=0.75, not whole number)
0 5px 10px   ❌ (5÷4=1.25, not whole number)  
0 12px 24px  ✅ (12÷4=3, 24÷8=3) [acceptable]
```

**Usage Examples:**
```tsx
// Subtle elements
<div className="shadow-xs border rounded-base" />

// Buttons and inputs
<Button className="shadow-sm" />
<Input className="shadow-sm" />

// Cards
<Card className="shadow-md hover:shadow-lg transition-shadow" />

// Modals and overlays
<Modal className="shadow-xl" />

// Brand emphasis
<Button className="shadow-primary bg-primary text-primary-foreground" />
```

### Focus States & Accessibility

```css
:root {
  /* Focus ring system */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--primary);
}
```

**Standard Focus Patterns:**
```tsx
// Interactive elements
<Button className="
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-primary 
  focus-visible:ring-offset-2
" />

// Form inputs
<Input className="
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-ring 
  focus-visible:ring-offset-2
" />

// Error states
<Input error className="
  border-destructive
  focus-visible:ring-destructive
" />
```

### Interactive States

**Hover Effects:**
```tsx
// Standard button hover
<Button className="
  hover:bg-primary/90        // 10% darker
  hover:shadow-md            // Slight elevation
  transition-all duration-200
" />

// Card hover effects
<Card className="
  cursor-pointer
  hover:shadow-lg            // More prominent shadow
  hover:-translate-y-1       // Lift effect
  transition-all duration-300 ease-out
" />
```

**Active States:**
```tsx
<Button className="
  active:scale-95            // Slight compress
  active:shadow-sm           // Reduce shadow
  active:duration-75         // Quick feedback
" />
```

**Disabled States:**
```tsx
<Button disabled className="
  disabled:opacity-50        // 50% opacity
  disabled:cursor-not-allowed
  disabled:hover:bg-primary  // No hover effect
" />
```

### Animation & Transition System

```css
:root {
  /* Standard timing scale */
  --duration-75: 75ms;       /* Instant feedback */
  --duration-150: 150ms;     /* Fast interactions */
  --duration-200: 200ms;     /* Default speed */
  --duration-300: 300ms;     /* Slower, deliberate */
  --duration-500: 500ms;     /* Dramatic effects */
  
  /* Easing curves */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**Usage Patterns:**
```tsx
// Quick interactive feedback
<Button className="
  transition-colors duration-150 ease-in-out
  hover:bg-primary/90
" />

// Smooth layout changes
<Card className="
  transition-all duration-300 ease-out
  hover:shadow-lg hover:-translate-y-1
" />

// Loading states
<div className="animate-pulse duration-2000" />
```

### Dark Mode Styling Adjustments

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Stronger shadows for dark mode */
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.5);
    
    /* Glowing effects */
    --shadow-primary: 0 0 20px rgb(var(--primary) / 0.3);
  }
}
```

### Performance Considerations

**Efficient Animations:**
```tsx
// ✅ Transform and opacity are performant
<div className="
  transition-transform duration-300
  hover:scale-105
" />

// ❌ Avoid animating layout properties
<div className="
  hover:w-full                    // Triggers layout reflow
" />
```

**Reduced Motion Support:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This customization system allows controlled flexibility while maintaining design system integrity across all projects.