# 🚀 Design System Implementation Guide

## Quick Setup (5 Minutes)

### 1. Run the Setup Script
```bash
# From the Design Playbook directory
chmod +x setup-design-system.sh
./setup-design-system.sh /path/to/your/project

# Or run directly in your project directory
curl -sSL https://path-to-your-playbook/setup-design-system.sh | bash
```

### 2. Verify Installation
```bash
cd /path/to/your/lovale/project
npm run design:check
```

### 3. Start Using the System
```tsx
// Example: Create a new component following the rules
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MyComponent() {
  return (
    <Card className="p-6">  {/* 24px padding - on 8pt grid */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">  {/* 20px, 600 weight */}
          Perfect Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base font-normal mb-4">  {/* 16px, 400 weight, 16px margin */}
          This component follows all design system rules.
        </p>
        <Button className="h-10 px-6 font-semibold">  {/* 40px height, 24px padding */}
          Take Action
        </Button>
      </CardContent>
    </Card>
  )
}
```

## What Gets Installed

### 📁 Files Added to Your Project
```
your-project/
├── CLAUDE.md                 # Complete design system rules (AI reads this)
├── design-config.json        # Brand configuration
├── components.json           # shadcn/ui configuration
├── tailwind.config.ts        # Tailwind v4 configuration
├── tsconfig.json             # TypeScript configuration
├── src/ (or app/)
│   ├── globals.css          # Design tokens + Tailwind v4 + Mulish font
│   ├── lib/
│   │   └── utils.ts         # cn() utility function
│   └── components/
│       ├── ui/              # shadcn/ui components (Button, Card, Input, etc.)
│       └── examples/
│           └── DesignSystemShowcase.tsx
└── .claude/
    └── commands/
        └── ds               # Design system CLI tool
```

### 📦 Dependencies Installed
- `tailwindcss@next` - Tailwind v4 with @theme support
- `@tailwindcss/typography` - Typography plugin
- `class-variance-authority` - Component variant system  
- `clsx` + `tailwind-merge` - Class utility functions
- `lucide-react` - Icon system (required by shadcn/ui)
- `@radix-ui/*` - Primitive components (installed by shadcn/ui)
- Essential shadcn/ui components: button, card, input, label, form, dialog, sheet

### ⚡ Scripts Added
```json
{
  "scripts": {
    "design:check": "Validate design system compliance",
    "design:auto": "Same as design:check"
  }
}
```

## Daily Usage

### ✅ Before Coding
```bash
# Check current compliance
npm run design:check
```

### 🎨 While Coding
**Follow These Rules:**
- Use only shadcn/ui components as base
- All spacing must be divisible by 8 or 4
- Use only Mulish font with weights: 400, 500, 600, 700
- Use semantic colors: `bg-primary`, `text-foreground`, `bg-muted`
- Button heights: `h-8`, `h-10`, `h-12`, `h-14` only

### 🔍 After Coding
```bash
# Validate your work
npm run design:check

# If violations found, fix them before committing
```

## shadcn/ui Setup Guide

### 🏗️ Manual Setup (If Script Fails)

**Step 1: Initialize shadcn/ui**
```bash
# In your React/Next.js project
npx shadcn@latest init

# Choose these options:
# ✓ TypeScript: Yes
# ✓ Style: Default  
# ✓ Base color: Neutral
# ✓ CSS variables: Yes
# ✓ Tailwind prefix: No prefix
# ✓ Components path: src/components
# ✓ Utils path: src/lib/utils
```

**Step 2: Install Essential Components**
```bash
# Core components (install in this order)
npx shadcn@latest add button
npx shadcn@latest add card  
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add form

# Layout components
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add separator
npx shadcn@latest add skeleton

# Data components
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add avatar

# Navigation components
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tabs
npx shadcn@latest add breadcrumb
```

**Step 3: Configure Tailwind v4 with Design Tokens**
```css
/* src/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  /* Font Configuration */
  --font-sans: 'Mulish', system-ui, sans-serif;
  
  /* Design System Colors (60/30/10 Rule) */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.09 0 0);
  --color-card: oklch(0.98 0 0);
  --color-card-foreground: oklch(0.09 0 0);
  --color-popover: oklch(0.99 0 0);
  --color-popover-foreground: oklch(0.09 0 0);
  
  /* Brand Colors */
  --color-primary: oklch(0.5 0.2 250);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-secondary: oklch(0.6 0.15 140);
  --color-secondary-foreground: oklch(0.99 0 0);
  --color-accent: oklch(0.65 0.2 35);
  --color-accent-foreground: oklch(0.09 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  
  /* System Colors */
  --color-destructive: oklch(0.5 0.3 25);
  --color-destructive-foreground: oklch(0.99 0 0);
  --color-border: oklch(0.85 0 0);
  --color-input: oklch(0.85 0 0);
  --color-ring: oklch(0.5 0.2 250);
  
  /* Spacing (8-Point Grid) */
  --spacing-0: 0;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  
  /* Border Radius */
  --radius: 0.5rem;
}

/* Dark mode variables */
.dark {
  --color-background: oklch(0.09 0 0);
  --color-foreground: oklch(0.99 0 0);
  --color-card: oklch(0.1 0 0);
  --color-card-foreground: oklch(0.99 0 0);
  --color-popover: oklch(0.09 0 0);
  --color-popover-foreground: oklch(0.99 0 0);
  --color-muted: oklch(0.15 0 0);
  --color-muted-foreground: oklch(0.6 0 0);
  --color-border: oklch(0.2 0 0);
  --color-input: oklch(0.2 0 0);
}

/* Base styles */
* {
  border-color: var(--color-border);
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

**Step 4: Update components.json**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Step 5: Verify TypeScript Configuration**
```json
// tsconfig.json - Add these path mappings
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 🎯 shadcn/ui Component Usage Examples

**Perfect Button Implementation**
```tsx
import { Button } from "@/components/ui/button"

// ✅ CORRECT: Using shadcn/ui with design system compliance
<Button variant="default" size="default" className="h-10 px-6 font-semibold">
  Primary Action
</Button>

<Button variant="outline" size="lg" className="h-12 px-8 font-medium">
  Secondary Action  
</Button>

<Button variant="ghost" size="sm" className="h-8 px-4 font-medium">
  Subtle Action
</Button>

// ❌ WRONG: Custom button without shadcn/ui base
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Don't do this
</button>
```

**Perfect Form Implementation**
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function LoginForm() {
  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-semibold">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input 
            id="email" 
            type="email" 
            className="h-10"
            placeholder="your@email.com" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input 
            id="password" 
            type="password" 
            className="h-10"
            placeholder="••••••••" 
          />
        </div>
        <Button className="w-full h-12 font-semibold mt-6">
          Sign In
        </Button>
      </CardContent>
    </Card>
  )
}
```

**Perfect Layout with Cards**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="p-6 hover:shadow-md transition-shadow">
          <CardHeader className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">
              {feature.title}
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {feature.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feature.popular && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                Popular
              </Badge>
            )}
            <Button variant="outline" className="w-full h-10 font-medium">
              Learn More
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

### 🔧 Advanced shadcn/ui Customization

**Creating Brand Variants**
```tsx
// lib/variants.ts
import { cva, type VariantProps } from "class-variance-authority"

const brandButtonVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom brand variants
        gradient: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90"
      },
      size: {
        default: "h-10 px-6",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BrandButtonProps extends VariantProps<typeof brandButtonVariants> {
  // Add custom props
}
```

**Extending shadcn/ui Components**
```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { brandButtonVariants, type BrandButtonProps } from "@/lib/variants"

interface CustomButtonProps extends BrandButtonProps {
  children: React.ReactNode
  className?: string
  loading?: boolean
}

export function BrandButton({ 
  variant, 
  size, 
  className, 
  loading, 
  children,
  ...props 
}: CustomButtonProps) {
  return (
    <Button
      className={cn(brandButtonVariants({ variant, size }), className)}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

// Usage
<BrandButton variant="gradient" size="lg" loading={isSubmitting}>
  Submit Form
</BrandButton>
```

## Design System Rules Summary

### 📝 Typography (STRICT)
```tsx
✅ CORRECT:
<h1 className="text-4xl font-bold">Title</h1>        // 40px, 700 weight
<p className="text-base font-normal">Body text</p>   // 16px, 400 weight
<span className="text-sm font-medium">Label</span>   // 14px, 500 weight

❌ WRONG:
<h1 className="text-[42px] font-black">Title</h1>    // Arbitrary size, wrong weight
<p style={{fontSize: '18px'}}>Body text</p>          // Inline styles
```

### 📏 Spacing (8-Point Grid)
```tsx
✅ CORRECT:
<div className="p-6 m-4 gap-8">     // 24px, 16px, 32px - all on grid
<section className="py-12">         // 48px - perfect for sections

❌ WRONG:
<div className="p-[25px]">          // Not on 8pt grid
<section className="py-[50px]">     // Not on 8pt grid
```

### 🎨 Colors (Semantic Only)
```tsx
✅ CORRECT:
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
<button className="bg-secondary text-secondary-foreground">

❌ WRONG:
<div className="bg-blue-500 text-white">
<p className="text-gray-600">
<button className="bg-green-400">
```

### 🧩 Components (shadcn/ui Base)
```tsx
✅ CORRECT:
import { Button } from "@/components/ui/button"
<Button variant="outline" size="lg">Click me</Button>

❌ WRONG:
<button className="px-4 py-2 bg-blue-500">Click me</button>
```

## Troubleshooting

### Common Issues

**"Module not found" errors:**
```bash
# Reinstall dependencies
npm install
```

**Design check fails:**
```bash
# See specific violations
npm run design:check
# Fix each violation manually
```

**shadcn/ui component not found:**
```bash
# Install missing component
npx shadcn add [component-name]
```

**Tailwind classes not working:**
```bash
# Verify globals.css is imported in your app
# Check that Tailwind v4 is installed: npm list tailwindcss
```

## Advanced Usage

### Custom Component Example
```tsx
// Create components that extend shadcn/ui
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BrandButtonProps {
  variant?: "primary" | "secondary" | "accent"
  children: React.ReactNode
  className?: string
}

export function BrandButton({ variant = "primary", children, className, ...props }: BrandButtonProps) {
  return (
    <Button
      className={cn(
        "h-10 px-6 font-semibold", // Standard button sizing
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground", 
        variant === "accent" && "bg-accent text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
```

### Form Component Example
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ContactForm() {
  return (
    <Card className="p-6 max-w-md mx-auto">     {/* 24px padding */}
      <CardHeader className="space-y-2">        {/* 8px gap */}
        <CardTitle className="text-2xl font-semibold">
          Contact Us
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">       {/* 16px gap */}
        <div className="space-y-2">             {/* 8px label-input gap */}
          <Label htmlFor="name" className="text-sm font-medium">
            Name
          </Label>
          <Input 
            id="name" 
            className="h-10"                     {/* 40px height */}
            placeholder="Your name" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input 
            id="email" 
            type="email"
            className="h-10" 
            placeholder="your@email.com" 
          />
        </div>
        <Button className="w-full h-12 font-semibold mt-6">  {/* 48px height, 24px top margin */}
          Send Message
        </Button>
      </CardContent>
    </Card>
  )
}
```

## Success Checklist

- [ ] Setup script ran successfully
- [ ] `npm run design:check` passes
- [ ] Can see example components in your project
- [ ] Mulish font is loading correctly
- [ ] shadcn/ui components are working
- [ ] All new components follow the rules
- [ ] Design system validation is part of your workflow

**Your Lovale project now has enterprise-grade design system compliance with zero exceptions and perfect consistency! 🎉**