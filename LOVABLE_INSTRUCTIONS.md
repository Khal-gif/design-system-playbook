# Design System Instructions for Lovable AI
*Optimized guidelines for AI-assisted web development*

---

## 🎯 Quick Start for Lovable

When building with Lovable, **ALWAYS** follow these 4 core rules:

1. **8-Point Grid**: All spacing must be divisible by 8 or 4
2. **Mulish Font**: Only use Mulish with weights 400, 500, 600, 700
3. **shadcn/ui First**: Never build custom components from scratch
4. **Semantic Colors**: Only use design tokens, never hardcoded colors

---

## 🚀 Essential Setup Commands

```bash
# Install Tailwind v4
npm install tailwindcss@next

# Install shadcn/ui components (run these first)
npx shadcn-ui@latest add button card input label textarea select dialog sheet dropdown-menu alert form checkbox radio-group switch slider navigation-menu breadcrumb tabs accordion table badge avatar separator skeleton

# Add to your globals.css
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Mulish', system-ui, sans-serif;
}
```

---

## ⚡ Lovable-Specific Guidelines

### For Component Generation
When Lovable asks you to create components, **ALWAYS**:

1. **Start with shadcn/ui** - Never build buttons, cards, forms from scratch
2. **Use approved spacing** - Only p-1, p-2, p-3, p-4, p-6, p-8, p-10, p-12, etc.
3. **Use approved typography** - text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl ONLY
4. **Use semantic colors** - bg-background, bg-primary, text-foreground, text-muted-foreground

### Component Templates for Lovable

#### ✅ CORRECT Button Pattern
```tsx
import { Button } from "@/components/ui/button"

// Primary button
<Button className="h-12 px-8 font-semibold">
  Primary Action
</Button>

// Secondary button  
<Button variant="outline" className="h-10 px-6 font-medium">
  Secondary Action
</Button>
```

#### ✅ CORRECT Form Pattern
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactForm() {
  return (
    <Card className="w-full max-w-md p-6">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-semibold">Get in Touch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium">Name</Label>
            <Input className="h-10" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Email</Label>
            <Input className="h-10" type="email" placeholder="your@email.com" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Message</Label>
            <Input className="h-24" placeholder="Your message..." />
          </div>
        </div>
        <Button className="w-full h-12 font-semibold">
          Send Message
        </Button>
      </CardContent>
    </Card>
  )
}
```

#### ✅ CORRECT Layout Pattern
```tsx
export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header - Always 8pt grid spacing */}
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <Button variant="outline" size="sm">Settings</Button>
        </div>
      </header>

      {/* Main Content - Proper grid spacing */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
```

#### ✅ CORRECT Card Pattern
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeatureCard({ title, description, action }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2 pb-4">
        <CardTitle className="text-xl font-semibold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full h-10 font-medium">
          {action}
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## 🎨 Design Token Quick Reference

### Spacing (8-Point Grid Only)
```tsx
// ✅ ALLOWED - All divisible by 8 or 4
p-0 (0px), p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), 
p-6 (24px), p-8 (32px), p-10 (40px), p-12 (48px), p-16 (64px)

// ❌ FORBIDDEN - Not on 8pt grid
p-5 (20px), p-7 (28px), p-9 (36px), p-11 (44px), p-[25px]
```

### Typography (Mulish Only)
```tsx
// ✅ ALLOWED SIZES
text-xs (12px), text-sm (14px), text-base (16px), text-lg (18px)
text-xl (20px), text-2xl (24px), text-3xl (32px), text-4xl (40px), text-5xl (48px)

// ✅ ALLOWED WEIGHTS
font-normal (400), font-medium (500), font-semibold (600), font-bold (700)

// ❌ FORBIDDEN
text-6xl, text-7xl, text-[22px], font-thin, font-light, font-extrabold
```

### Colors (Semantic Tokens Only)
```tsx
// ✅ BACKGROUNDS
bg-background, bg-card, bg-muted, bg-popover
bg-primary, bg-secondary, bg-destructive, bg-accent

// ✅ TEXT
text-foreground, text-muted-foreground, text-card-foreground
text-primary, text-secondary, text-destructive, text-accent

// ❌ FORBIDDEN
bg-white, bg-gray-50, bg-blue-500, text-black, bg-[#ffffff]
```

---

## 🛠️ Lovable Development Patterns

### Responsive Design Pattern
```tsx
// Always mobile-first, use breakpoint scaling
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
    Responsive Title
  </h1>
  <div className="grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
    {/* Content */}
  </div>
</div>
```

### State Management Pattern
```tsx
// Use shadcn/ui components with proper state
const [isLoading, setIsLoading] = useState(false)

return (
  <Button 
    className="h-12 px-8 font-semibold" 
    disabled={isLoading}
    onClick={handleSubmit}
  >
    {isLoading ? "Loading..." : "Submit"}
  </Button>
)
```

### Navigation Pattern
```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export function Navigation() {
  return (
    <nav className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="font-bold text-xl">Logo</div>
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Button variant="ghost">Home</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="ghost">About</Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button variant="default">Get Started</Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
```

---

## ❌ Common Mistakes to Avoid in Lovable

### DON'T Build Custom Components
```tsx
// ❌ WRONG - Never build from scratch
const CustomButton = () => (
  <button className="px-4 py-2 bg-blue-500 rounded">
    Click me
  </button>
)

// ✅ CORRECT - Always use shadcn/ui
import { Button } from "@/components/ui/button"
<Button>Click me</Button>
```

### DON'T Use Arbitrary Values
```tsx
// ❌ WRONG - Arbitrary spacing/colors
<div className="p-[15px] bg-[#ff0000] text-[22px]">

// ✅ CORRECT - Design system values
<div className="p-4 bg-primary text-xl">
```

### DON'T Break Typography Rules
```tsx
// ❌ WRONG - Off-grid sizes, wrong weights
<h1 className="text-6xl font-thin">

// ✅ CORRECT - On-grid sizes, approved weights  
<h1 className="text-5xl font-bold">
```

---

## 🎯 Lovable Success Checklist

Before Lovable generates any component, verify:

- [ ] Uses shadcn/ui foundation (Button, Card, Input, etc.)
- [ ] All spacing follows 8pt grid (p-4, p-6, p-8, etc.)
- [ ] Uses only Mulish font with 4 approved weights
- [ ] Uses semantic color tokens (bg-primary, text-foreground)
- [ ] Component height follows grid (h-8, h-10, h-12, h-14)
- [ ] Responsive design with proper breakpoints
- [ ] Accessibility with proper focus states
- [ ] TypeScript interfaces for props

---

## 💡 Lovable Prompting Tips

### Effective Prompts for Lovable:
```
✅ "Create a contact form using shadcn/ui components with proper 8pt grid spacing"
✅ "Build a dashboard layout with shadcn/ui Card components following our design system"
✅ "Generate a landing page hero section with Mulish typography and semantic colors"

❌ "Create a custom blue button with 15px padding"
❌ "Make a form with Arial font and hardcoded colors" 
❌ "Build components from scratch without libraries"
```

### Template Requests:
- "Landing page with hero section, features grid, and CTA"
- "Dashboard with sidebar navigation and data cards"
- "Contact form with validation and success states"
- "E-commerce product card grid with filtering"
- "Blog layout with article cards and pagination"

---

## 🚀 Quick Implementation Guide

1. **Start every project** with shadcn/ui setup
2. **Always use** the approved spacing scale
3. **Only use** Mulish typography system
4. **Stick to** semantic color tokens
5. **Build responsive** with mobile-first approach
6. **Include accessibility** features by default
7. **Test components** at different screen sizes

---

## 📞 Need Help?

If Lovable generates code that violates these rules:
1. **Stop and revise** the prompt
2. **Specify shadcn/ui** components explicitly  
3. **Mention 8pt grid** spacing requirements
4. **Request Mulish** typography specifically
5. **Ask for semantic colors** only

Remember: **Every component must follow these rules for consistency and maintainability.**

---

*This guide ensures Lovable generates perfectly compliant components that match your design system. Always reference these patterns when building with AI assistance.*