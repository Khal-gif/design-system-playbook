# Getting Started with Design System Law Book

## Overview

The Design System Law Book is a comprehensive system that gives you perfect design consistency across all projects while allowing brand customization. Think of it as a professional design system that you can deploy to any project in minutes.

## What You'll Get

### ✅ **Instant Professional Design System**
- Strict typography rules (Mulish font, 4 weights only)
- Perfect spacing (8-point grid system)
- Semantic color system (your brand colors applied consistently)
- Automated validation (catches violations before they ship)

### ✅ **Brand Flexibility**
- Configure your primary color once
- Entire system adapts to your brand
- Different colors for each project, same structure everywhere

### ✅ **Developer Experience**
- Pre-built component templates
- Interactive development workflows
- Automated code generation
- AI integration for smart suggestions

## Quick Start (5 Minutes)

### Step 1: Deploy to Your Project

```bash
# From your Design Playbook directory
.claude/commands/deploy-to-project.sh /path/to/your/project

# Example:
.claude/commands/deploy-to-project.sh ~/projects/my-ecommerce-site
```

This copies the entire design system to your project.

### Step 2: Configure Your Brand

```bash
# Go to your project
cd ~/projects/my-ecommerce-site

# Edit the configuration file
nano design-config.json
```

**Set your brand color:**
```json
{
  "branding": {
    "primaryColor": {
      "hue": 220,        // Blue: 220, Purple: 280, Green: 140, Red: 0
      "saturation": 0.8, // How vivid (0.0 = gray, 1.0 = super vivid)
      "lightness": 0.5   // How light (0.0 = black, 1.0 = white)
    }
  }
}
```

### Step 3: Generate Design Tokens

```bash
.claude/commands/generate-tokens.sh
```

This creates:
- `src/globals.css` - Your brand colors as CSS custom properties
- `src/design-tokens.ts` - TypeScript definitions
- `globals.css with @theme` - Updated Tailwind configuration

### Step 4: Import Tokens

```typescript
// In your main app file (App.tsx, layout.tsx, _app.tsx, etc.)
import './src/globals.css';
```

### Step 5: Start Building

```bash
# Interactive development menu
.claude/commands/dev-workflow.sh

# Or create your first component
.claude/commands/new-component.sh Hero button
```

## Understanding the System

### File Structure After Deployment

```
your-project/
├── .claude/                    # Design system engine
│   ├── scripts/               # Validation scripts
│   │   ├── design-check.sh    # Main validator
│   │   ├── typography-check.sh # Font validation
│   │   ├── spacing-check.sh   # 8-point grid validation
│   │   └── color-check.sh     # Semantic color validation
│   ├── templates/             # Component blueprints
│   │   ├── button-template.tsx
│   │   ├── card-template.tsx
│   │   ├── form-template.tsx
│   │   └── page-template.tsx
│   ├── commands/              # Development tools
│   │   ├── new-component.sh   # Component generator
│   │   ├── generate-tokens.sh # Token generator
│   │   └── dev-workflow.sh    # Interactive menu
│   └── workflows/             # Step-by-step guides
├── CLAUDE.md                  # Complete rule book (AI reads this)
├── design-config.json         # Your brand configuration
├── src/globals.css            # Generated CSS (your colors)
├── src/design-tokens.ts      # TypeScript definitions
└── globals.css with @theme        # Auto-configured Tailwind
```

### What Each File Does

**`CLAUDE.md`** - The complete Design System Law Book. AI reads this to understand all rules.

**`design-config.json`** - Your project configuration. Change your brand colors here.

**`src/globals.css`** - Generated CSS custom properties with your exact brand colors.

**`.claude/scripts/`** - Validation scripts that catch violations automatically.

**`.claude/templates/`** - Pre-built component templates that follow all rules.

**`.claude/commands/`** - Development tools for creating components and managing tokens.

## Your First Component

### Using the Component Generator

```bash
# Create a button component
.claude/commands/new-component.sh PrimaryButton button

# This creates: src/components/PrimaryButton.tsx
```

**Generated component:**
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base classes - Design System compliant
  "font-sans inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground font-semibold", // Uses YOUR brand color
        outline: "border bg-background font-medium",
      },
      size: {
        sm: "h-8 px-4 text-sm",      // 32px height (8-point grid)
        default: "h-10 px-6 text-base", // 40px height
        lg: "h-12 px-8 text-base",   // 48px height
      },
    }
  }
)

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Using the Component

```tsx
// In your page
import { PrimaryButton } from '@/components/PrimaryButton'

export default function HomePage() {
  return (
    <div className="p-8 space-y-4"> {/* 8-point grid spacing */}
      <h1 className="text-4xl font-bold text-foreground"> {/* Mulish font, semantic color */}
        Welcome to Your App
      </h1>
      <p className="text-lg text-muted-foreground"> {/* Approved sizes, semantic color */}
        Built with Design System Law Book
      </p>
      <div className="flex gap-4"> {/* 8-point grid gap */}
        <PrimaryButton variant="default" size="lg">
          Get Started
        </PrimaryButton>
        <PrimaryButton variant="outline" size="lg">
          Learn More
        </PrimaryButton>
      </div>
    </div>
  )
}
```

## Validation

### Automatic Validation

```bash
# Check your entire project
.claude/scripts/design-check.sh src/

# Check specific areas
.claude/scripts/typography-check.sh src/    # Font compliance
.claude/scripts/spacing-check.sh src/       # 8-point grid
.claude/scripts/color-check.sh src/         # Semantic colors
```

### What Gets Validated

**Typography:**
- ✅ Only Mulish font family
- ✅ Only weights 400, 500, 600, 700
- ✅ Only sizes 12px-48px on 8-point scale
- ❌ Catches: font-light, text-6xl, text-[22px]

**Spacing:**
- ✅ Only values divisible by 8 or 4
- ✅ Standard Tailwind classes: p-4, p-6, p-8
- ❌ Catches: p-[25px], gap-5, arbitrary values

**Colors:**
- ✅ Only semantic tokens: bg-primary, text-foreground
- ✅ Your brand color applied consistently
- ❌ Catches: bg-white, text-black, bg-gray-500

## Package.json Integration

The deployment automatically adds these scripts:

```json
{
  "scripts": {
    "design:check": ".claude/scripts/design-check.sh src",
    "design:typography": ".claude/scripts/typography-check.sh src",
    "design:spacing": ".claude/scripts/spacing-check.sh src",
    "design:colors": ".claude/scripts/color-check.sh src",
    "design:generate": ".claude/commands/generate-tokens.sh",
    "design:workflow": ".claude/commands/dev-workflow.sh"
  }
}
```

Use them like:
```bash
npm run design:check
npm run design:generate
```

## Git Integration

Pre-commit hooks are automatically installed:

```bash
# Every commit automatically runs:
.claude/scripts/design-check.sh src/

# Prevents commits with design system violations
```

## Common Patterns

### Page Layout
```tsx
export default function Page() {
  return (
    <div className="font-sans"> {/* Always Mulish */}
      {/* Hero with proper spacing */}
      <section className="py-24 px-4"> {/* 8-point grid: 96px, 16px */}
        <h1 className="text-5xl font-bold"> {/* Max approved size, approved weight */}
          Page Title
        </h1>
        <p className="text-xl font-normal mt-4"> {/* Approved size, approved weight */}
          Page description
        </p>
      </section>
      
      {/* Content with proper spacing */}
      <section className="py-16 px-4"> {/* 8-point grid: 64px, 16px */}
        <div className="space-y-8"> {/* 8-point grid: 32px gap */}
          {/* Your content */}
        </div>
      </section>
    </div>
  )
}
```

### Component Structure
```tsx
// Always follow this pattern
export const MyComponent = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        // Base styles with design system classes
        "font-sans",           // Always Mulish
        "p-6",                // 8-point grid spacing
        "text-base font-normal", // Approved typography
        "bg-card text-card-foreground", // Semantic colors
        className
      )}
      {...props}
    />
  )
}
```

## Next Steps

1. **Deploy to your first project** → [Deployment Guide](./deployment.md)
2. **Learn about brand configuration** → [Brand Colors Guide](../configuration/brand-colors.md)
3. **Understand the token system** → [Token System Guide](../configuration/token-system.md)
4. **Build your first component** → [First Component Guide](./first-component.md)
5. **Set up development workflow** → [Development Guide](../development/workflows.md)

## Troubleshooting

### Common Issues

**"Command not found"** → Scripts need to be executable:
```bash
chmod +x .claude/scripts/*.sh
chmod +x .claude/commands/*.sh
```

**"Design violations found"** → Run specific checks:
```bash
.claude/scripts/typography-check.sh src/  # Shows font issues
.claude/scripts/spacing-check.sh src/     # Shows spacing issues
.claude/scripts/color-check.sh src/       # Shows color issues
```

**"Tokens not updating"** → Regenerate tokens:
```bash
.claude/commands/generate-tokens.sh
# Then restart your dev server
```

See [Troubleshooting Guide](../validation/troubleshooting.md) for more solutions.