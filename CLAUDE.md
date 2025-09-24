# Engineering Design Playbook
*A Complete Guide to Design System Implementation*

## Core Principles
Every project MUST follow these 4 non-negotiable rules:

1. **8-Point Grid**: All spacing divisible by 8 or 4
2. **Mulish Font**: Only font allowed with exactly 4 weights (400, 500, 600, 700)
3. **shadcn/ui Components**: Every component uses shadcn/ui as foundation
4. **Semantic Colors**: No hardcoded colors, only design tokens

---

## Essential Setup

### Installation Commands
```bash
# Install Tailwind v4
npm install tailwindcss@next

# Install core shadcn/ui components
npx shadcn-ui@latest add button card input label textarea select dialog sheet dropdown-menu alert form checkbox radio-group switch slider navigation-menu breadcrumb tabs accordion table badge avatar separator skeleton
```

### Project Structure
```
your-project/
├── CLAUDE.md                     # This playbook (AI reads for rules)
├── src/
│   ├── globals.css              # Tailwind v4 with design tokens
│   └── components/
│       ├── ui/                  # shadcn/ui components only
│       ├── atoms/               # Custom atomic components
│       ├── molecules/           # Combined components
│       └── organisms/           # Complex components
```

## shadcn/ui Foundation Rule

**CRITICAL: Every component MUST use shadcn/ui as foundation. Never build from scratch.**

Why this matters:
- Pre-built accessibility and keyboard navigation
- Consistent architecture and behavior
- Professional quality and semantic colors
- Standardized styling approach

### Component Development Rules

#### Wrong vs Right Approach
```tsx
// ❌ WRONG: Custom components from scratch
const CustomButton = ({ children }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded">
    {children}
  </button>
)

// ✅ CORRECT: shadcn/ui foundation
import { Button } from "@/components/ui/button"

<Button variant="default" size="default">
  Click me
</Button>

// ✅ CORRECT: Extend with custom styling
<Button 
  variant="outline" 
  size="lg"
  className="bg-gradient-to-r from-primary to-secondary"
>
  Custom styled button
</Button>
```

---

## Foundation Rules

### Typography System

#### Font Setup (Mandatory)
```css
/* globals.css - REQUIRED SETUP */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Mulish', system-ui, sans-serif;
}
```

#### Approved Font Sizes (8-Point Grid Only)
```tsx
✅ ALLOWED SIZES:
text-xs   → 12px  // Labels, captions
text-sm   → 14px  // Small text, helper text
text-base → 16px  // Body text (default)
text-lg   → 18px  // Large body text
text-xl   → 20px  // Small headings
text-2xl  → 24px  // Section headings
text-3xl  → 32px  // Major headings
text-4xl  → 40px  // Page titles
text-5xl  → 48px  // Hero text (maximum)

❌ FORBIDDEN:
text-6xl, text-7xl, text-8xl, text-9xl, text-[22px], text-[30px]
```

#### Font Weights (Only 4 Allowed)
```tsx
✅ ALLOWED WEIGHTS:
font-normal     → 400  // Body text
font-medium     → 500  // Subtle emphasis
font-semibold   → 600  // Headings, buttons
font-bold       → 700  // Strong emphasis

❌ FORBIDDEN:
font-thin, font-extralight, font-light, font-extrabold, font-black
```

### Spacing System (8-Point Grid)

#### Legal Spacing Values
```tsx
✅ ALLOWED SPACING (All divisible by 8 or 4):
p-0 → 0px     p-1 → 4px     p-2 → 8px     p-3 → 12px
p-4 → 16px    p-6 → 24px    p-8 → 32px    p-10 → 40px
p-12 → 48px   p-16 → 64px   p-20 → 80px   p-24 → 96px

❌ FORBIDDEN:
p-5 (20px), p-7 (28px), p-9 (36px), p-11 (44px), p-[25px], p-[15px]
```

#### Component Heights (8pt Grid)
```tsx
// Button heights
h-8  → 32px  // Small
h-10 → 40px  // Default
h-12 → 48px  // Large
h-14 → 56px  // Extra Large
```

### Color System

#### Semantic Color Tokens Only
```tsx
✅ CORRECT COLORS:
// Backgrounds
bg-background, bg-card, bg-muted, bg-popover

// Text
text-foreground, text-muted-foreground, text-card-foreground

// Brand/Actions
bg-primary, bg-secondary, bg-destructive, bg-accent
text-primary, text-secondary, text-destructive, text-accent

❌ FORBIDDEN:
bg-white, bg-gray-50, bg-blue-500, text-black, text-gray-600, bg-[#ffffff]
```

#### Design Token Configuration
```css
/* globals.css - Color Tokens */
@theme {
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.1 0 0);
  --color-primary: oklch(0.5 0.2 250);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-secondary: oklch(0.6 0.15 200);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
}
```

---

## Development Workflow

### Daily Commands
```bash
# Development server
npm run dev

# Add shadcn component
npx shadcn@latest add [component-name]

# Quality checks
npm run type-check
npm run lint
npm test

# Build
npm run build
```

### Git Workflow
```bash
# 1. Create feature branch
git checkout -b feat/component-name

# 2. Make changes following playbook rules

# 3. Commit with standard format
git commit -m "feat: add user authentication component"

# 4. Push and create PR
git push origin feat/component-name
```

### Component Creation Process
1. **Check if shadcn/ui component exists** - Use it if available
2. **Create component structure** - Follow atomic design hierarchy  
3. **Apply 8pt grid spacing** - All measurements divisible by 8 or 4
4. **Use Mulish typography** - Only approved sizes and weights
5. **Use semantic colors** - No hardcoded color values
6. **Write tests** - Ensure functionality and accessibility
7. **Document component** - Add JSDoc and examples

---

## Implementation Examples

### Complete Form Example
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <Card className="w-96 p-6">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-semibold text-center">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input 
              className="h-10"
              type="email" 
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Password</Label>
            <Input 
              className="h-10"
              type="password" 
              placeholder="Enter your password"
            />
          </div>
        </div>
        <Button className="w-full h-12 font-semibold">
          Sign In
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Dashboard Layout Example
```tsx
export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <Button variant="outline" size="sm">
            Settings
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </main>
    </div>
  )
}
```

### Standard Component Patterns
```tsx
// Form Field Pattern
<div className="space-y-2">
  <Label className="text-sm font-medium">Email</Label>
  <Input className="h-10" placeholder="Enter email" />
  <p className="text-xs text-muted-foreground">Helper text</p>
</div>

// Card Pattern  
<Card className="p-6">
  <CardHeader className="space-y-2">
    <CardTitle className="text-xl font-semibold">Title</CardTitle>
    <CardDescription className="text-sm">Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>

// Button Group Pattern
<div className="flex gap-4">
  <Button variant="default">Primary</Button>
  <Button variant="outline">Secondary</Button>
</div>
```
---

## Quality Assurance

### Pre-Commit Checklist
Before committing any code, verify:

**Foundation Compliance:**
- [ ] All spacing follows 8pt grid (divisible by 8 or 4)
- [ ] Only Mulish font with 4 approved weights used
- [ ] All components use shadcn/ui foundation
- [ ] Only semantic color tokens used
- [ ] No arbitrary Tailwind values (`[25px]`, `[#ffffff]`)

**Component Quality:**
- [ ] Component under 200 lines
- [ ] Props have TypeScript interfaces
- [ ] Accessibility requirements met
- [ ] Tests written and passing
- [ ] Documentation added

**Performance:**
- [ ] Images use Next/Image component
- [ ] Lists have unique keys
- [ ] No unnecessary re-renders

### Validation Commands
```bash
# Check for spacing violations
grep -r "p-5\|p-7\|p-9\|p-11\|p-\[.*px\]" --include="*.tsx" .

# Check for font violations  
grep -r "font-thin\|font-light\|font-black\|text-\[.*px\]" --include="*.tsx" .

# Check for color violations
grep -r "bg-white\|bg-gray-\|text-black\|bg-\[#" --include="*.tsx" .
```

### Accessibility Requirements
- **Touch Targets**: Minimum 44px (use `h-12` or larger on mobile)
- **Color Contrast**: 4.5:1 minimum ratio
- **Focus States**: Visible focus indicators on all interactive elements
- **Semantic HTML**: Use proper HTML elements (`<button>`, `<nav>`, `<main>`)
- **ARIA Labels**: Add when semantic HTML isn't enough

### Common Violations & Fixes

#### Typography Fixes
```tsx
// ❌ Wrong
<h1 className="text-6xl font-light">Title</h1>

// ✅ Fixed  
<h1 className="text-5xl font-bold">Title</h1>
```

#### Spacing Fixes
```tsx
// ❌ Wrong
<div className="p-5 m-7 gap-[25px]">

// ✅ Fixed
<div className="p-4 m-6 gap-6">
```

#### Color Fixes
```tsx
// ❌ Wrong
<button className="bg-blue-500 text-white">

// ✅ Fixed  
<Button variant="default">
```

#### Component Fixes
```tsx
// ❌ Wrong
<div className="border rounded p-4">

// ✅ Fixed
<Card className="p-4">
```

---

## Success Metrics

**Foundation Compliance (Must be 100%):**
- ✅ 8-point grid adherence
- ✅ Mulish typography usage  
- ✅ shadcn/ui component foundation
- ✅ Semantic color tokens
- ✅ WCAG 2.1 AA accessibility

**Development Efficiency:**
- 📈 40% faster component development
- 📈 60% fewer design inconsistencies  
- 📈 85% developer satisfaction
- 📈 30% reduction in bug reports

---

*This playbook ensures consistent, accessible, and maintainable UI components. Every rule exists for a reason - follow them exactly for best results.*
