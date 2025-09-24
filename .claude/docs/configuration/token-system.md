# Design Token System Architecture

Complete guide to the three-layer token architecture that powers the Design System Law Book: Foundation → Semantic → Component tokens that automatically adapt to your brand configuration.

## Token Architecture Overview

The system uses a hierarchical token structure that transforms your single primary color into a complete design system:

```
Foundation Tokens (Raw Values)
    ↓
Semantic Tokens (Contextual Meaning)  
    ↓
Component Tokens (Specific Applications)
```

## Layer 1: Foundation Tokens

**Raw design values** generated from your brand configuration.

### Color Foundations

Generated from `design-config.json`:

```json
{
  "branding": {
    "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 }
  }
}
```

**Generates foundation colors:**
```css
:root {
  /* Foundation: Generated color scales */
  --foundation-primary-50: 220 80% 97%;
  --foundation-primary-100: 220 80% 94%;
  --foundation-primary-200: 220 80% 87%;
  --foundation-primary-300: 220 80% 77%;
  --foundation-primary-400: 220 80% 63%;
  --foundation-primary-500: 220 80% 50%;  /* Your configured color */
  --foundation-primary-600: 220 80% 40%;
  --foundation-primary-700: 220 80% 33%;
  --foundation-primary-800: 220 80% 27%;
  --foundation-primary-900: 220 80% 23%;
  --foundation-primary-950: 220 80% 15%;
  
  /* Foundation: Neutral scales */
  --foundation-neutral-50: 210 20% 98%;
  --foundation-neutral-100: 210 20% 96%;
  --foundation-neutral-200: 210 16% 93%;
  --foundation-neutral-300: 210 14% 89%;
  --foundation-neutral-400: 210 14% 83%;
  --foundation-neutral-500: 210 11% 71%;
  --foundation-neutral-600: 210 7% 56%;
  --foundation-neutral-700: 210 9% 31%;
  --foundation-neutral-800: 210 10% 23%;
  --foundation-neutral-900: 210 11% 15%;
  --foundation-neutral-950: 210 11% 9%;
}
```

### Typography Foundations

Fixed hierarchy following Mulish system:

```css
:root {
  /* Foundation: Font family */
  --foundation-font-family: 'Mulish', system-ui, sans-serif;
  
  /* Foundation: Font weights (only approved weights) */
  --foundation-font-weight-normal: 400;
  --foundation-font-weight-medium: 500;
  --foundation-font-weight-semibold: 600;
  --foundation-font-weight-bold: 700;
  
  /* Foundation: Font sizes (8-point scale) */
  --foundation-font-size-xs: 0.75rem;    /* 12px */
  --foundation-font-size-sm: 0.875rem;   /* 14px */
  --foundation-font-size-base: 1rem;     /* 16px */
  --foundation-font-size-lg: 1.125rem;   /* 18px */
  --foundation-font-size-xl: 1.25rem;    /* 20px */
  --foundation-font-size-2xl: 1.5rem;    /* 24px */
  --foundation-font-size-3xl: 2rem;      /* 32px */
  --foundation-font-size-4xl: 2.5rem;    /* 40px */
  --foundation-font-size-5xl: 3rem;      /* 48px */
}
```

### Spacing Foundations

8-point grid system:

```css
:root {
  /* Foundation: 8-point spacing scale */
  --foundation-space-0: 0;
  --foundation-space-1: 0.25rem;   /* 4px */
  --foundation-space-2: 0.5rem;    /* 8px */
  --foundation-space-3: 0.75rem;   /* 12px */
  --foundation-space-4: 1rem;      /* 16px */
  --foundation-space-6: 1.5rem;    /* 24px */
  --foundation-space-8: 2rem;      /* 32px */
  --foundation-space-12: 3rem;     /* 48px */
  --foundation-space-16: 4rem;     /* 64px */
  --foundation-space-24: 6rem;     /* 96px */
}
```

## Layer 2: Semantic Tokens

**Contextual meaning** assigned to foundation tokens.

### Color Semantics

Foundation colors get semantic meaning:

```css
:root {
  /* Semantic: Primary brand colors */
  --primary: var(--foundation-primary-500);
  --primary-foreground: var(--foundation-neutral-50);
  --primary-muted: var(--foundation-primary-100);
  --primary-muted-foreground: var(--foundation-primary-700);
  
  /* Semantic: Neutral interface colors */
  --background: var(--foundation-neutral-50);
  --foreground: var(--foundation-neutral-900);
  --card: var(--foundation-neutral-50);
  --card-foreground: var(--foundation-neutral-900);
  --popover: var(--foundation-neutral-50);
  --popover-foreground: var(--foundation-neutral-900);
  
  /* Semantic: Interactive states */
  --muted: var(--foundation-neutral-100);
  --muted-foreground: var(--foundation-neutral-500);
  --accent: var(--foundation-neutral-100);
  --accent-foreground: var(--foundation-neutral-900);
  
  /* Semantic: Borders and separators */
  --border: var(--foundation-neutral-200);
  --input: var(--foundation-neutral-200);
  --ring: var(--foundation-primary-500);
}
```

### Typography Semantics

Foundation typography gets contextual roles:

```css
:root {
  /* Semantic: Heading hierarchy */
  --text-heading-1: var(--foundation-font-size-5xl) var(--foundation-font-weight-bold);
  --text-heading-2: var(--foundation-font-size-4xl) var(--foundation-font-weight-bold);
  --text-heading-3: var(--foundation-font-size-3xl) var(--foundation-font-weight-semibold);
  --text-heading-4: var(--foundation-font-size-2xl) var(--foundation-font-weight-semibold);
  --text-heading-5: var(--foundation-font-size-xl) var(--foundation-font-weight-semibold);
  --text-heading-6: var(--foundation-font-size-lg) var(--foundation-font-weight-medium);
  
  /* Semantic: Body text */
  --text-body-large: var(--foundation-font-size-lg) var(--foundation-font-weight-normal);
  --text-body-base: var(--foundation-font-size-base) var(--foundation-font-weight-normal);
  --text-body-small: var(--foundation-font-size-sm) var(--foundation-font-weight-normal);
  
  /* Semantic: UI text */
  --text-label: var(--foundation-font-size-sm) var(--foundation-font-weight-medium);
  --text-caption: var(--foundation-font-size-xs) var(--foundation-font-weight-normal);
}
```

### Spacing Semantics

Foundation spacing gets contextual purpose:

```css
:root {
  /* Semantic: Component spacing */
  --spacing-component-xs: var(--foundation-space-2);   /* 8px - tight spacing */
  --spacing-component-sm: var(--foundation-space-3);   /* 12px - small spacing */
  --spacing-component-md: var(--foundation-space-4);   /* 16px - default spacing */
  --spacing-component-lg: var(--foundation-space-6);   /* 24px - loose spacing */
  --spacing-component-xl: var(--foundation-space-8);   /* 32px - extra loose */
  
  /* Semantic: Layout spacing */
  --spacing-layout-xs: var(--foundation-space-4);      /* 16px - tight sections */
  --spacing-layout-sm: var(--foundation-space-8);      /* 32px - small sections */
  --spacing-layout-md: var(--foundation-space-12);     /* 48px - default sections */
  --spacing-layout-lg: var(--foundation-space-16);     /* 64px - large sections */
  --spacing-layout-xl: var(--foundation-space-24);     /* 96px - hero sections */
}
```

## Layer 3: Component Tokens

**Specific applications** for individual components.

### Button Component Tokens

```css
:root {
  /* Component: Button primary */
  --button-primary-background: var(--primary);
  --button-primary-foreground: var(--primary-foreground);
  --button-primary-background-hover: var(--foundation-primary-600);
  --button-primary-background-active: var(--foundation-primary-700);
  
  /* Component: Button secondary */
  --button-secondary-background: var(--muted);
  --button-secondary-foreground: var(--muted-foreground);
  --button-secondary-background-hover: var(--foundation-neutral-200);
  --button-secondary-background-active: var(--foundation-neutral-300);
  
  /* Component: Button sizing */
  --button-height-sm: 2rem;      /* 32px - h-8 */
  --button-height-md: 2.5rem;    /* 40px - h-10 */
  --button-height-lg: 3rem;      /* 48px - h-12 */
  --button-padding-x-sm: var(--spacing-component-md);    /* 16px */
  --button-padding-x-md: var(--spacing-component-lg);    /* 24px */
  --button-padding-x-lg: var(--spacing-component-xl);    /* 32px */
}
```

### Form Component Tokens

```css
:root {
  /* Component: Input fields */
  --input-background: var(--background);
  --input-foreground: var(--foreground);
  --input-border: var(--border);
  --input-border-focus: var(--ring);
  --input-height: 2.5rem;        /* 40px - h-10 */
  --input-padding-x: var(--spacing-component-sm);  /* 12px */
  
  /* Component: Labels */
  --label-color: var(--foreground);
  --label-font: var(--text-label);
  --label-spacing: var(--spacing-component-xs);    /* 8px margin-bottom */
}
```

### Card Component Tokens

```css
:root {
  /* Component: Card structure */
  --card-background: var(--card);
  --card-foreground: var(--card-foreground);
  --card-border: var(--border);
  --card-border-radius: 0.5rem;  /* 8px */
  --card-padding: var(--spacing-component-lg);     /* 24px */
  --card-gap: var(--spacing-component-md);         /* 16px between elements */
}
```

## Token Generation Process

### 1. Configuration Input

```json
{
  "branding": {
    "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 }
  }
}
```

### 2. Foundation Generation

Script `generate-tokens.sh` creates:
- Color scales (50-950) from your primary color
- Fixed typography scale (Mulish + 4 weights)  
- Fixed spacing scale (8-point grid)

### 3. Semantic Mapping

Foundation values get semantic names:
- `foundation-primary-500` → `primary`
- `foundation-neutral-100` → `muted`
- `foundation-space-4` → `spacing-component-md`

### 4. Component Applications

Semantic tokens apply to specific components:
- `primary` → `button-primary-background`
- `muted` → `input-background`
- `spacing-component-lg` → `card-padding`

### 5. Output Files

**globals.css:**
```css
:root {
  --primary: 220 80% 50%;
  --button-primary-background: var(--primary);
}
```

**design-tokens.ts:**
```typescript
export const designTokens = {
  colors: {
    primary: 'hsl(220 80% 50%)'
  },
  components: {
    button: {
      primary: {
        background: 'hsl(var(--primary))'
      }
    }
  }
} as const;
```

**globals.css with @theme:**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))'
      },
      spacing: {
        'component-md': 'var(--spacing-component-md)'
      }
    }
  }
};
```

## Usage Examples

### Using Semantic Tokens (Recommended)

```tsx
// ✅ Use semantic tokens - automatically adapts to brand
const Button = ({ children, ...props }) => {
  return (
    <button 
      className="bg-primary text-primary-foreground p-component-md"
      {...props}
    >
      {children}
    </button>
  );
};
```

### Using Foundation Tokens (Advanced)

```tsx
// ⚠️ Use foundation tokens only when semantic doesn't fit
const SpecialButton = ({ children }) => {
  return (
    <button 
      style={{
        backgroundColor: 'hsl(var(--foundation-primary-600))', // Specific shade
        color: 'hsl(var(--foundation-neutral-50))'
      }}
    >
      {children}
    </button>
  );
};
```

### Using Component Tokens (Specific)

```tsx
// 🎯 Use component tokens for precise control
const ButtonPrimary = ({ children }) => {
  return (
    <button 
      style={{
        backgroundColor: 'var(--button-primary-background)',
        color: 'var(--button-primary-foreground)',
        height: 'var(--button-height-md)',
        paddingInline: 'var(--button-padding-x-md)'
      }}
    >
      {children}
    </button>
  );
};
```

## Token Customization

### Override Semantic Tokens

Create `src/token-overrides.css`:

```css
:root {
  /* Override semantic tokens while keeping foundations */
  --primary: var(--foundation-primary-600);        /* Darker primary */
  --muted: var(--foundation-neutral-50);           /* Lighter muted */
  --card-padding: var(--spacing-component-xl);     /* More card padding */
}
```

### Extend Component Tokens

```css
:root {
  /* Add new component tokens */
  --button-danger-background: var(--foundation-red-500);
  --button-danger-foreground: var(--foundation-red-50);
  --button-success-background: var(--foundation-green-500);
  --button-success-foreground: var(--foundation-green-50);
}
```

## Multi-Project Token Management

### Same Architecture, Different Brands

**Project A (Blue Brand):**
```json
{ "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 } }
```
Results in: `--primary: 220 80% 50%`

**Project B (Green Brand):**  
```json
{ "primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.45 } }
```
Results in: `--primary: 140 70% 45%`

**Same components, different colors:**
```tsx
// This button works identically in both projects
<button className="bg-primary text-primary-foreground">
  Submit
</button>
```

### Synchronizing Token Updates

1. **Update foundation/semantic mappings** in Design Playbook
2. **Re-deploy to all projects** with `deploy-to-project.sh`
3. **Regenerate tokens** in each project with their brand colors
4. **All projects get updates** while maintaining their unique brands

## Token Validation

### Automated Checks

```bash
# Validate token usage
.claude/scripts/color-check.sh src/

# Checks for:
# ✅ bg-primary, text-foreground (semantic tokens)
# ❌ bg-blue-500, text-white (hardcoded values)
```

### Token Compliance Rules

**✅ Always Use:**
- Semantic tokens: `bg-primary`, `text-foreground`
- Component spacing: `p-component-md`, `gap-component-lg`
- Typography hierarchy: `text-heading-2`, `text-body-base`

**❌ Never Use:**
- Hardcoded colors: `bg-blue-500`, `text-gray-600`
- Arbitrary values: `p-[18px]`, `text-[22px]`
- Non-system fonts: `font-serif`, `font-mono`

This three-layer token architecture ensures every project maintains perfect consistency while expressing unique brand identity through configurable foundation values.