# 🎯 DESIGN SYSTEM SPECIFICATIONS
*Core rules extracted from CLAUDE.md for Lovable integration*

---

## 🧩 COMPONENT FOUNDATION RULES

### **MANDATORY: shadcn/ui Base**
```
CRITICAL RULE: Every single component MUST use shadcn/ui as foundation
- NEVER build components from scratch
- ALWAYS extend shadcn/ui components
- Use shadcn/ui Button, Card, Input, Form, etc.
```

**✅ CORRECT shadcn/ui Usage:**
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Button variant="default" size="default">Click me</Button>
<Card><CardHeader><CardTitle>Title</CardTitle></CardHeader></Card>
```

**❌ FORBIDDEN:**
```tsx
// Never build custom without shadcn/ui base
<button className="px-4 py-2 bg-blue-500">Custom Button</button>
<div className="border rounded p-4">Custom Card</div>
```

---

## 📐 SPACING SYSTEM RULES

### **MANDATORY: 8-Point Grid System**
```
Every spacing value MUST be divisible by 8 or 4
Approved values: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128px
```

**✅ APPROVED Tailwind Classes:**
```
p-1 (4px)   p-2 (8px)   p-3 (12px)  p-4 (16px)
p-5 (20px)  p-6 (24px)  p-7 (28px)  p-8 (32px)
p-10 (40px) p-12 (48px) p-14 (56px) p-16 (64px)
p-20 (80px) p-24 (96px) p-32 (128px)
```

**❌ FORBIDDEN:**
```tsx
p-[25px]     // Not on grid
p-[15px]     // Not divisible by 8 or 4
p-[30px]     // Not on grid
style={{padding: '22px'}}  // Arbitrary values
```

**✅ CORRECT Spacing:**
```tsx
<div className="p-6 m-4 gap-8">        // 24px, 16px, 32px
<section className="py-12">            // 48px
<Card className="p-6">                 // 24px padding
```

---

## 📝 TYPOGRAPHY SYSTEM RULES

### **MANDATORY: Mulish Font Only**
```
Font Family: Mulish (ONLY)
Font Weights: 400, 500, 600, 700 (ONLY these 4)
Font Sizes: 8-point grid alignment required
```

**✅ APPROVED Font Sizes:**
```
text-xs   → 12px  ✅ (12÷4=3)
text-sm   → 14px  ✅ (14÷2=7)
text-base → 16px  ✅ (16÷8=2)
text-lg   → 18px  ✅ (18÷2=9)
text-xl   → 20px  ✅ (20÷4=5)
text-2xl  → 24px  ✅ (24÷8=3)
text-3xl  → 32px  ✅ (32÷8=4)
text-4xl  → 40px  ✅ (40÷8=5)
text-5xl  → 48px  ✅ (48÷8=6)
```

**✅ APPROVED Font Weights:**
```
font-normal    → 400  // Body text
font-medium    → 500  // Subtle emphasis
font-semibold  → 600  // Headings, buttons
font-bold      → 700  // Strong emphasis
```

**❌ FORBIDDEN Font Weights:**
```
font-thin       → 100  // Not allowed
font-light      → 300  // Not allowed
font-extrabold  → 800  // Not allowed
font-black      → 900  // Not allowed
```

**✅ CORRECT Typography:**
```tsx
<h1 className="text-4xl font-bold">Page Title</h1>         // 40px, 700
<h2 className="text-3xl font-semibold">Section</h2>        // 32px, 600
<p className="text-base font-normal">Body text</p>         // 16px, 400
<span className="text-sm font-medium">Label</span>         // 14px, 500
```

---

## 🎨 COLOR SYSTEM RULES

### **MANDATORY: Semantic Colors Only**
```
NO hardcoded colors allowed
Use ONLY semantic tokens: primary, secondary, accent, background, foreground, muted
```

**✅ APPROVED Color Classes:**
```
// Backgrounds
bg-background      bg-card         bg-muted        bg-popover
bg-primary        bg-secondary     bg-accent       bg-destructive

// Text Colors
text-foreground           text-muted-foreground
text-primary-foreground   text-secondary-foreground
text-accent-foreground    text-destructive-foreground

// Borders
border-border     border-input     border-ring
```

**❌ FORBIDDEN Colors:**
```tsx
bg-white          bg-black         bg-gray-100
bg-blue-500       bg-red-600       bg-green-400
text-gray-600     text-blue-400    text-red-500
bg-[#ffffff]      text-[#333333]   // Arbitrary values
```

**✅ CORRECT Color Usage:**
```tsx
<div className="bg-background text-foreground">
<Card className="bg-card border-border">
<Button className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
```

---

## 🔧 COMPONENT SIZE RULES

### **MANDATORY: Standard Component Heights**
```
Button Heights: h-8 (32px), h-10 (40px), h-12 (48px), h-14 (56px)
Input Heights: h-10 (40px) standard
Card Padding: p-6 (24px) standard
```

**✅ APPROVED Component Sizing:**
```tsx
// Buttons
<Button className="h-8 px-4">Small</Button>        // 32px height
<Button className="h-10 px-6">Medium</Button>       // 40px height
<Button className="h-12 px-8">Large</Button>        // 48px height

// Inputs
<Input className="h-10" />                          // 40px height

// Cards
<Card className="p-6">                              // 24px padding
```

**❌ FORBIDDEN Sizing:**
```tsx
<Button className="h-9">           // 36px not on grid
<Button style={{height: '42px'}}>  // Arbitrary height
<Input className="h-11" />          // Non-standard
```

---

## 📏 LAYOUT SYSTEM RULES

### **MANDATORY: Grid-Based Layouts**
```
All gaps, margins, and padding follow 8-point grid
Section spacing: py-8 (32px), py-12 (48px), py-16 (64px), py-24 (96px)
```

**✅ CORRECT Layout Spacing:**
```tsx
<section className="py-16 px-8">           // 64px, 32px
  <div className="space-y-8">              // 32px vertical rhythm
    <h2 className="text-3xl font-semibold mb-6">Title</h2>  // 24px margin
    <div className="grid gap-6">           // 24px gap
```

---

## 🏗️ FORM SYSTEM RULES

### **MANDATORY: shadcn/ui Form Components**
```
Use Form, FormField, FormItem, FormLabel, FormControl, FormMessage
Input height: h-10 (40px)
Form spacing: space-y-6 (24px between groups)
Label spacing: space-y-2 (8px label to input)
```

**✅ CORRECT Form Structure:**
```tsx
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

<form className="space-y-6">               // 24px between sections
  <div className="space-y-2">              // 8px label gap
    <Label className="text-sm font-medium">Email</Label>
    <Input className="h-10" type="email" />
  </div>
  <Button className="h-12 w-full font-semibold">Submit</Button>
</form>
```

---

## ⚡ RESPONSIVE SYSTEM RULES

### **MANDATORY: Grid-Compliant Responsive Scaling**
```
Scale proportionally while maintaining grid alignment
Mobile: smaller grid values, Desktop: larger grid values
```

**✅ CORRECT Responsive Scaling:**
```tsx
<div className="p-4 md:p-6 lg:p-8">       // 16px → 24px → 32px
<h1 className="text-2xl md:text-3xl lg:text-4xl">  // 24px → 32px → 40px
<div className="space-y-4 md:space-y-6 lg:space-y-8">  // Proportional gaps
```

---

## ♿ ACCESSIBILITY SYSTEM RULES

### **MANDATORY: WCAG 2.1 AA Compliance**
```
Every component MUST meet accessibility standards
Touch targets, color contrast, keyboard navigation, screen readers
```

**✅ TOUCH TARGET REQUIREMENTS:**
```
Minimum touch target: 44px × 44px
Interactive elements must be easily tappable
Adequate spacing between touch targets
```

**✅ CORRECT Touch Target Sizing:**
```tsx
// Buttons with proper touch targets
<Button className="h-12 px-6">Large Action</Button>      // 48px height ✅
<Button className="h-11 px-4">Medium Action</Button>     // 44px height ✅
<Button className="h-10 px-4">Small Action</Button>      // 40px height ❌ Use h-11 or larger

// Icon buttons need adequate size
<Button size="icon" className="h-11 w-11">              // 44px × 44px ✅
  <Icon className="h-4 w-4" />
</Button>

// Links with adequate spacing
<div className="space-y-3">                             // 12px gap minimum ✅
  <a className="block py-2">Link 1</a>                  // 16px vertical padding ✅
  <a className="block py-2">Link 2</a>
</div>
```

**❌ FORBIDDEN Touch Targets:**
```tsx
<Button className="h-8">Small</Button>                  // 32px too small
<Button className="p-1">Tiny</Button>                   // 4px padding too small
<div className="space-y-1">                             // 4px gap too small
  <button>Action 1</button>
  <button>Action 2</button>
</div>
```

**✅ COLOR CONTRAST REQUIREMENTS:**
```
Text contrast: Minimum 4.5:1 ratio
UI elements: Minimum 3:1 ratio
Focus indicators: High contrast and visible
```

**✅ CORRECT Contrast Usage:**
```tsx
// High contrast text combinations
<div className="bg-background text-foreground">         // Primary text ✅
<div className="bg-primary text-primary-foreground">    // Button text ✅
<p className="text-muted-foreground">Helper text</p>    // Secondary text ✅

// Proper focus states
<Button className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Accessible Button
</Button>

// Error states with sufficient contrast
<div className="text-destructive bg-destructive/10">    // Error text ✅
  Error message
</div>
```

**❌ FORBIDDEN Contrast:**
```tsx
<p className="text-gray-400">Low contrast text</p>      // Poor readability
<div className="bg-gray-100 text-gray-300">            // Insufficient contrast
<Button className="focus:outline-none">                // No focus indicator
```

**✅ KEYBOARD NAVIGATION REQUIREMENTS:**
```
All interactive elements must be keyboard accessible
Logical tab order maintained
Focus states clearly visible
Escape/Enter key handling for dialogs/dropdowns
```

**✅ CORRECT Keyboard Navigation:**
```tsx
// Proper tabindex and keyboard handling
<Button 
  className="focus:ring-2 focus:ring-primary"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Keyboard Accessible
</Button>

// Custom interactive elements
<div
  role="button"
  tabIndex={0}
  className="focus:outline-none focus:ring-2 focus:ring-primary"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Custom Interactive Element
</div>

// Modal with focus management
<Dialog>
  <DialogContent className="focus:outline-none">
    <DialogTitle>Modal Title</DialogTitle>
    <DialogDescription>Modal content</DialogDescription>
  </DialogContent>
</Dialog>
```

**✅ SEMANTIC HTML REQUIREMENTS:**
```
Use proper HTML elements for their intended purpose
Headings in logical order (h1 → h2 → h3)
Form labels properly associated
Lists for grouped content
```

**✅ CORRECT Semantic Structure:**
```tsx
// Proper heading hierarchy
<main>
  <h1 className="text-4xl font-bold">Page Title</h1>
  <section>
    <h2 className="text-3xl font-semibold">Section Title</h2>
    <h3 className="text-2xl font-semibold">Subsection</h3>
  </section>
</main>

// Proper form structure
<form className="space-y-6">
  <div className="space-y-2">
    <Label htmlFor="email">Email Address</Label>
    <Input id="email" type="email" />
    <p className="text-sm text-muted-foreground">
      We'll never share your email
    </p>
  </div>
</form>

// Proper list structure
<nav>
  <ul className="space-y-2">
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

**❌ FORBIDDEN Semantic Issues:**
```tsx
// Wrong heading order
<h1>Page Title</h1>
<h3>Skipped h2</h3>                                     // ❌ Skipped hierarchy

// Unlabeled form inputs
<Input placeholder="Email" />                           // ❌ No label

// Div as button without accessibility
<div onClick={handleClick}>Click me</div>               // ❌ Not keyboard accessible

// Missing list structure
<div>
  <div>Item 1</div>                                     // ❌ Should be <ul><li>
  <div>Item 2</div>
</div>
```

**✅ ARIA LABEL REQUIREMENTS:**
```
Screen reader support for complex components
Descriptive labels for icon-only buttons
Status announcements for dynamic content
```

**✅ CORRECT ARIA Usage:**
```tsx
// Icon buttons with labels
<Button size="icon" aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Complex components with descriptions
<Input 
  aria-describedby="password-help"
  type="password"
/>
<div id="password-help" className="text-sm text-muted-foreground">
  Password must be at least 8 characters
</div>

// Loading states
<Button disabled aria-label="Saving changes">
  <Loader className="mr-2 h-4 w-4 animate-spin" />
  Saving...
</Button>

// Status announcements
<div role="status" aria-live="polite">
  {status && <span className="sr-only">{status}</span>}
</div>
```

**✅ RESPONSIVE ACCESSIBILITY:**
```
Mobile: Larger touch targets (h-12 minimum for primary actions)
Desktop: Standard sizing acceptable (h-10 minimum)
High contrast mode support
```

**✅ CORRECT Responsive Accessibility:**
```tsx
// Touch-friendly mobile buttons
<Button className="h-12 w-full sm:h-10 sm:w-auto">     // 48px mobile, 40px desktop
  Mobile Action
</Button>

// Adequate spacing on all devices
<div className="space-y-4 sm:space-y-3">               // Larger gaps on mobile
  <Button className="h-12 sm:h-10">Action 1</Button>
  <Button className="h-12 sm:h-10">Action 2</Button>
</div>
```

---

## 🚨 CRITICAL VALIDATION RULES

### **AUTOMATIC COMPLIANCE CHECKS**
```
Every element must pass these checks:
1. Uses shadcn/ui component base ✅
2. All spacing divisible by 8 or 4 ✅
3. Uses Mulish font with approved weights ✅
4. Uses semantic color tokens ✅
5. Follows standard component heights ✅
6. Meets WCAG 2.1 AA accessibility standards ✅
7. Touch targets minimum 44px × 44px ✅
8. Proper keyboard navigation support ✅
9. Sufficient color contrast ratios ✅
10. Semantic HTML structure ✅
```

**Validation Command:**
```bash
npm run design:check  // Must pass before deployment
```

---

## 📋 IMPLEMENTATION CHECKLIST

**Before Creating Any Component:**

**Design System Compliance:**
- [ ] Based on shadcn/ui component?
- [ ] All spacing on 8pt grid?
- [ ] Using Mulish font only?
- [ ] Using approved font weights (400,500,600,700)?
- [ ] Using semantic color tokens?
- [ ] Standard component heights?

**Accessibility Compliance:**
- [ ] Touch targets minimum 44px × 44px?
- [ ] Color contrast ratios meet WCAG 2.1 AA?
- [ ] Keyboard navigation supported?
- [ ] Focus states clearly visible?
- [ ] Proper semantic HTML elements?
- [ ] Form labels properly associated?
- [ ] ARIA labels for complex components?
- [ ] Screen reader compatible?
- [ ] Logical heading hierarchy?
- [ ] Status announcements for dynamic content?

**ZERO EXCEPTIONS. PERFECT DESIGN SYSTEM + ACCESSIBILITY COMPLIANCE REQUIRED.**