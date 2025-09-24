# Design System Law Book
## Strict shadcn/ui + Tailwind v4 Enforcement Guide

> **Core Rules**: 
> 1. Every spacing value MUST be divisible by 8 or 4
> 2. Typography uses 8-point sizing convention
> 3. Font is ALWAYS Mulish with 4 weights

---

## 🔴 CRITICAL: SPACING GRID LAW

### The Only Legal Spacing Values

```
TAILWIND CLASS → PIXELS → ALLOWED?
p-0   → 0px   → ✅ (0÷8=0)
p-1   → 4px   → ✅ (4÷4=1)
p-2   → 8px   → ✅ (8÷8=1)
p-3   → 12px  → ✅ (12÷4=3)
p-4   → 16px  → ✅ (16÷8=2)
p-5   → 20px  → ✅ (20÷4=5)
p-6   → 24px  → ✅ (24÷8=3)
p-7   → 28px  → ✅ (28÷4=7)
p-8   → 32px  → ✅ (32÷8=4)
p-9   → 36px  → ✅ (36÷4=9)
p-10  → 40px  → ✅ (40÷8=5)
p-11  → 44px  → ✅ (44÷4=11)
p-12  → 48px  → ✅ (48÷8=6)
p-14  → 56px  → ✅ (56÷8=7)
p-16  → 64px  → ✅ (64÷8=8)
p-20  → 80px  → ✅ (80÷8=10)
p-24  → 96px  → ✅ (96÷8=12)
p-28  → 112px → ✅ (112÷8=14)
p-32  → 128px → ✅ (128÷8=16)
p-36  → 144px → ✅ (144÷8=18)
p-40  → 160px → ✅ (160÷8=20)
p-44  → 176px → ✅ (176÷8=22)
p-48  → 192px → ✅ (192÷8=24)
p-52  → 208px → ✅ (208÷8=26)
p-56  → 224px → ✅ (224÷8=28)
p-60  → 240px → ✅ (240÷8=30)
p-64  → 256px → ✅ (256÷8=32)

p-[25px] → 25px → ❌ (NOT DIVISIBLE BY 8 OR 4)
p-[15px] → 15px → ❌ (NOT DIVISIBLE BY 8 OR 4)
p-[30px] → 30px → ❌ (NOT DIVISIBLE BY 8 OR 4)
```

---

## 📐 PART 1: TYPOGRAPHY LAWS - MULISH 8-POINT SYSTEM

### Font Family Rule

**MANDATORY FONT**:
```css
/* globals.css - REQUIRED SETUP */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');

@import "tailwindcss";

@theme {
  --font-sans: 'Mulish', system-ui, sans-serif;
}
```

```tsx
✅ CORRECT:
<body className="font-sans">  /* Uses Mulish */

❌ WRONG:
<body className="font-mono">  /* Wrong font */
<body style={{ fontFamily: 'Arial' }}>  /* Never override */
```

### Typography Sizes - 8-Point System Only

**ALLOWED FONT SIZES (8-point grid)**:
```tsx
✅ USE ONLY THESE SIZES:
text-xs   → 12px  → ✅ (12÷4=3)   // Smallest allowed
text-sm   → 14px  → ✅ (14÷2=7)   // Small labels
text-base → 16px  → ✅ (16÷8=2)   // Body text
text-lg   → 18px  → ✅ (18÷2=9)   // Large body
text-xl   → 20px  → ✅ (20÷4=5)   // Small heading
text-2xl  → 24px  → ✅ (24÷8=3)   // Section heading
text-3xl  → 32px  → ✅ (32÷8=4)   // Major heading
text-4xl  → 40px  → ✅ (40÷8=5)   // Page title
text-5xl  → 48px  → ✅ (48÷8=6)   // Hero text

❌ NEVER USE (Not on 8-point grid):
text-6xl  → 60px  → ❌ (60÷8=7.5)
text-7xl  → 72px  → ✅ (72÷8=9)   // Use only if needed
text-8xl  → 96px  → ✅ (96÷8=12)  // Use only if needed
text-9xl  → 128px → ✅ (128÷8=16) // Use only if needed

CUSTOM SIZES NOT ALLOWED:
text-[22px] → ❌ (Not standard)
text-[30px] → ❌ (Not on grid)
```

### Font Weights - Exactly 4 Weights for Mulish

**ALLOWED FONT WEIGHTS**:
```tsx
✅ USE ONLY THESE 4 WEIGHTS:
font-normal     → 400  // Body text, descriptions
font-medium     → 500  // Subtle emphasis
font-semibold   → 600  // Headings, buttons
font-bold       → 700  // Strong emphasis, hero text

❌ NEVER USE:
font-thin       → 100  // Not in Mulish set
font-extralight → 200  // Not in Mulish set
font-light      → 300  // Not in Mulish set
font-extrabold  → 800  // Not in Mulish set
font-black      → 900  // Not in Mulish set
```

### Typography Hierarchy for Mini-Pages

```tsx
✅ CORRECT HIERARCHY (Using 4 weights):

/* Hero Section */
<h1 className="text-5xl font-bold">        // 48px, 700 - Maximum impact
  Hero Title
</h1>
<p className="text-xl font-normal">         // 20px, 400 - Hero subtitle
  Supporting hero text
</p>

/* Page Headers */
<h1 className="text-4xl font-bold">        // 40px, 700 - Page title
  Page Title
</h1>

/* Section Headers */
<h2 className="text-3xl font-semibold">    // 32px, 600 - Major sections
  Section Title
</h2>

/* Subsection Headers */
<h3 className="text-2xl font-semibold">    // 24px, 600 - Subsections
  Subsection Title
</h3>

/* Card Headers */
<h4 className="text-xl font-medium">       // 20px, 500 - Card titles
  Card Title
</h4>

/* Body Text */
<p className="text-base font-normal">      // 16px, 400 - Standard text
  Body content
</p>

/* Small Text */
<span className="text-sm font-normal">     // 14px, 400 - Helper text
  Helper text
</span>

/* Tiny Labels */
<span className="text-xs font-medium">     // 12px, 500 - Labels/badges
  LABEL
</span>

/* Buttons */
<Button className="font-semibold">         // 600 - Call to action
  Click Me
</Button>

/* Emphasized Body */
<p className="text-base font-medium">      // 16px, 500 - Important body
  Important information
</p>
```

### Line Height Rules (8-point grid)

**TAILWIND LINE HEIGHT CLASSES**:
```tsx
✅ ALLOWED (On grid):
leading-4  → 16px → ✅ (16÷8=2)
leading-5  → 20px → ✅ (20÷4=5)
leading-6  → 24px → ✅ (24÷8=3)
leading-7  → 28px → ✅ (28÷4=7)
leading-8  → 32px → ✅ (32÷8=4)
leading-9  → 36px → ✅ (36÷4=9)
leading-10 → 40px → ✅ (40÷8=5)

❌ AVOID:
leading-3  → 12px → ✅ (Too tight for most text)
Custom line heights not on grid
```

### Typography Component Examples

```tsx
✅ CORRECT MINI-PAGE STRUCTURE:

export function LandingPage() {
  return (
    <div className="font-sans"> {/* Mulish applied globally */}
      
      {/* Hero Section */}
      <section className="py-24"> {/* 96px padding */}
        <h1 className="text-5xl font-bold leading-tight">
          Build Amazing Products
        </h1>
        <p className="text-xl font-normal mt-4 text-muted-foreground">
          With our powerful platform
        </p>
        <Button className="mt-8 h-12 px-8 text-base font-semibold">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16"> {/* 64px padding */}
        <h2 className="text-3xl font-semibold mb-12">
          Key Features
        </h2>
        <div className="grid gap-8"> {/* 32px gap */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Feature Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base font-normal">
                Feature description text here.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold">
          Ready to Start?
        </h2>
        <p className="text-lg font-normal mt-4">
          Join thousands of users today
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Button className="font-semibold">
            Primary Action
          </Button>
          <Button variant="outline" className="font-medium">
            Secondary Action
          </Button>
        </div>
      </section>
    </div>
  );
}
```

---

## 🎨 PART 2: COLOR LAWS (60/30/10 RULE)

### Rule: Semantic Colors Only

**TAILWIND COLOR CLASSES**:
```tsx
✅ BACKGROUNDS (60% - Neutral):
bg-background      // Main background
bg-card           // Card background  
bg-muted          // Muted sections
bg-popover        // Popover background

✅ TEXT (30% - Complementary):
text-foreground        // Primary text
text-muted-foreground  // Secondary text
text-card-foreground   // Card text
text-popover-foreground // Popover text

✅ ACCENT (10% - Brand):
bg-primary        // Primary actions
bg-secondary      // Secondary actions
bg-destructive    // Destructive actions
bg-accent         // Accent elements

❌ NEVER USE:
bg-white, bg-gray-50, bg-gray-100, bg-blue-500, bg-red-600
text-black, text-gray-600, text-blue-400
bg-[#ffffff], text-[#333333]
```

### Color Implementation with OKLCH (Tailwind v4)
```css
/* globals.css - CORRECT v4 SETUP WITH MULISH */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  /* Font */
  --font-sans: 'Mulish', system-ui, sans-serif;
  
  /* Colors */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.1 0 0);
  --color-card: oklch(0.98 0 0);
  --color-card-foreground: oklch(0.1 0 0);
  --color-primary: oklch(0.5 0.2 250);
  --color-primary-foreground: oklch(0.99 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
}
```

---

## 🧩 PART 3: COMPONENT ATOMS

### Buttons - Strict Sizing with Mulish

**HEIGHT RULES (8pt grid)**:
```tsx
✅ ALLOWED BUTTON HEIGHTS:
<Button className="h-8 text-sm font-medium">    // 32px height, 14px text
<Button className="h-10 text-base font-semibold"> // 40px height, 16px text - DEFAULT
<Button className="h-12 text-base font-semibold"> // 48px height, 16px text
<Button className="h-14 text-lg font-bold">     // 56px height, 18px text

❌ FORBIDDEN:
<Button className="h-9">   // 36px (36÷8=4.5) not clean
<Button className="h-11">  // 44px (use h-10 or h-12)
<Button className="h-13">  // 52px not standard
```

**PADDING RULES (8pt grid)**:
```tsx
✅ ALLOWED HORIZONTAL PADDING:
<Button className="px-4">  // 16px (16÷8=2) ✓
<Button className="px-6">  // 24px (24÷8=3) ✓ DEFAULT
<Button className="px-8">  // 32px (32÷8=4) ✓
<Button className="px-12"> // 48px (48÷8=6) ✓

❌ FORBIDDEN:
<Button className="px-5">     // 20px - use px-4 or px-6
<Button className="px-7">     // 28px - use px-6 or px-8
<Button className="px-[18px]"> // arbitrary value
```

### Forms with Mulish Typography

**FORM STRUCTURE PATTERN**:
```tsx
✅ CORRECT (8pt grid + Mulish weights):
<form className="space-y-6 font-sans">          {/* 24px sections */}
  <div className="space-y-4">                   {/* 16px fields */}
    <div className="space-y-2">                 {/* 8px label gap */}
      <Label className="text-sm font-medium">   {/* 14px, 500 weight */}
        Email Address
      </Label>
      <Input 
        className="h-10 text-base font-normal"  {/* 40px, 16px text */}
        placeholder="Enter your email"
      />
      <p className="text-xs font-normal text-muted-foreground">
        We'll never share your email.          {/* 12px helper */}
      </p>
    </div>
  </div>
  <Button className="h-12 w-full text-base font-semibold">
    Submit Form                                 {/* 48px, 600 weight */}
  </Button>
</form>
```

### Cards with Typography Hierarchy

**CARD STRUCTURE**:
```tsx
✅ CORRECT (Mulish hierarchy):
<Card className="p-6">                          {/* 24px padding */}
  <CardHeader className="space-y-2">            {/* 8px gap */}
    <CardTitle className="text-xl font-semibold">
      Card Title                                 {/* 20px, 600 weight */}
    </CardTitle>
    <CardDescription className="text-sm font-normal text-muted-foreground">
      Supporting description text                {/* 14px, 400 weight */}
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">           {/* 16px gap */}
    <p className="text-base font-normal">
      Main content goes here.                    {/* 16px, 400 weight */}
    </p>
    <div className="text-sm font-medium text-muted-foreground">
      Additional information                     {/* 14px, 500 weight */}
    </div>
  </CardContent>
  <CardFooter>
    <Button className="font-semibold">
      Take Action                                {/* 600 weight */}
    </Button>
  </CardFooter>
</Card>
```

---

## 📱 PART 4: RESPONSIVE TYPOGRAPHY

### Responsive Font Sizes (8-point steps)

```tsx
✅ CORRECT RESPONSIVE SCALING:
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
  {/* 32px → 40px → 48px (all on 8pt grid) */}
</h1>

<h2 className="text-2xl md:text-3xl font-semibold">
  {/* 24px → 32px */}
</h2>

<p className="text-base md:text-lg font-normal">
  {/* 16px → 18px */}
</p>


❌ WRONG:
<h1 className="text-[30px] md:text-[45px]">
  {/* Not on grid */}
</h1>
```

### Responsive Font Weights

```tsx
✅ CORRECT WEIGHT CHANGES:
<h1 className="font-semibold md:font-bold">
  {/* 600 → 700 for larger screens */}
</h1>

<p className="font-normal md:font-medium">
  {/* 400 → 500 for emphasis */}
</p>

❌ WRONG:
<h1 className="font-light md:font-black">
  {/* Not in allowed weights */}
</h1>
```

---

## 🏗️ PART 5: LAYOUT WITH 8-POINT GRID

### Page Section Spacing

```tsx
✅ CORRECT SECTION PADDING:
<section className="py-8">    {/* 32px */}
<section className="py-12">   {/* 48px */}
<section className="py-16">   {/* 64px */}
<section className="py-24">   {/* 96px */}
<section className="py-32">   {/* 128px */}

❌ WRONG:
<section className="py-[30px]"> {/* Not on grid */}
<section className="py-18">     {/* 72px (72÷8=9) ✓ but non-standard */}
```

### Container Padding

```tsx
✅ CORRECT:
<div className="container px-4 md:px-6 lg:px-8">
  {/* 16px → 24px → 32px (all on grid) */}
</div>

<div className="max-w-screen-xl mx-auto px-4">
  {/* 16px padding */}
</div>

❌ WRONG:
<div className="container px-[18px]">  {/* Not on grid */}
```

### Grid and Flex Gaps

```tsx
✅ CORRECT GAP VALUES:
gap-2   → 8px   ✓
gap-4   → 16px  ✓
gap-6   → 24px  ✓
gap-8   → 32px  ✓
gap-10  → 40px  ✓
gap-12  → 48px  ✓
gap-16  → 64px  ✓

<div className="grid grid-cols-3 gap-6">
  {/* 24px gap between items */}
</div>

<div className="flex gap-4">
  {/* 16px gap between items */}
</div>

❌ WRONG:
gap-5   → 20px  (use gap-4 or gap-6)
gap-7   → 28px  (use gap-6 or gap-8)
gap-[22px]      (arbitrary value)
```

---

## ⚡ PART 6: PERFORMANCE WITH TYPOGRAPHY

### Font Loading Strategy

```tsx
✅ CORRECT FONT LOADING:
/* In app/layout.tsx */
import { Mulish } from 'next/font/google'

const mulish = Mulish({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
})

export default function Layout({ children }) {
  return (
    <html className={mulish.variable}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}

❌ WRONG:
/* Loading all weights */
weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
```

---

## ♿ PART 7: ACCESSIBILITY WITH MULISH

### Minimum Font Sizes

```tsx
✅ ACCESSIBLE SIZES:
Body text: text-base (16px minimum)
Helper text: text-sm (14px minimum)
Labels: text-xs (12px absolute minimum)

❌ INACCESSIBLE:
<p className="text-[10px]">  {/* Too small */}
<span className="text-[11px]"> {/* Too small */}
```

### Font Weight Contrast

```tsx
✅ GOOD CONTRAST:
/* Heading vs body */
<h2 className="text-2xl font-semibold">Heading</h2>
<p className="text-base font-normal">Body text</p>

/* Important vs regular */
<span className="font-medium">Important</span>
<span className="font-normal">Regular</span>

❌ POOR CONTRAST:
/* Too similar */
<h2 className="font-normal">Heading</h2>
<p className="font-normal">Body</p>
```

---

## 🤖 AI ENFORCEMENT CHECKLIST

### Typography Validation
```javascript
// AI should check EVERY text element:

function validateTypography(element) {
  const checks = {
    // Font family
    usesMulish: element.fontFamily === 'Mulish',
    
    // Font sizes (must be on 8pt grid)
    fontSize: [12, 14, 16, 18, 20, 24, 32, 40, 48].includes(element.fontSize),
    
    // Font weights (only 4 allowed)
    fontWeight: [400, 500, 600, 700].includes(element.fontWeight),
    
    // Line height (on grid)
    lineHeight: element.lineHeight % 4 === 0,
    
    // Hierarchy
    hasProperHierarchy: checkHierarchy(element)
  };
  
  return Object.values(checks).every(check => check === true);
}

function checkHierarchy(page) {
  // H1 should be larger than H2
  // H2 should be larger than H3
  // Headings should be heavier than body
  return page.h1.size > page.h2.size && 
         page.h1.weight >= page.body.weight;
}
```

### Review Output for Typography
```
TYPOGRAPHY REVIEW: [PASS ✅ / FAIL ❌]

FONT VIOLATIONS:
- Using Arial at line 10 → Change to Mulish
- text-6xl at line 25 → Change to text-5xl (48px max)
- font-light at line 30 → Change to font-normal (400)
- font-extrabold at line 35 → Change to font-bold (700)

SIZE VIOLATIONS (Not on 8pt grid):
- text-[22px] at line 40 → Use text-xl (20px) or text-2xl (24px)
- text-[30px] at line 45 → Use text-3xl (32px)

WEIGHT VIOLATIONS (Not in 400/500/600/700):
- font-thin → Use font-normal (400)
- font-black → Use font-bold (700)

HIERARCHY ISSUES:
- H2 (text-3xl) larger than H1 (text-2xl) → Fix hierarchy
- All text same weight → Add weight variation

FIX PRIORITY:
1. [CRITICAL] Change font to Mulish
2. [HIGH] Fix sizes to 8pt grid
3. [HIGH] Use only 4 weights
4. [MEDIUM] Fix hierarchy
```

---

## 📋 TYPOGRAPHY DECISION TREE

```
For ANY text element:

FONT FAMILY:
└─ Is it Mulish? → YES → ✅
   └─ NO → ❌ MUST BE MULISH

FONT SIZE:
└─ Is it 12/14/16/18/20/24/32/40/48px? → YES → ✅
   └─ NO → ❌ ROUND TO NEAREST 8PT VALUE

FONT WEIGHT:
└─ Is it 400/500/600/700? → YES → ✅
   └─ NO → ❌ USE NEAREST ALLOWED WEIGHT

HIERARCHY:
└─ Is each level distinct? → YES → ✅
   └─ NO → ❌ ADD SIZE/WEIGHT VARIATION
```

---

## 🎯 FINAL TYPOGRAPHY LAW

**Every text element must:**
1. Use Mulish font family
2. Use sizes on 8-point grid (12, 16, 24, 32, 40, 48px)
3. Use only 4 weights (400, 500, 600, 700)
4. Maintain clear hierarchy
5. Follow accessibility minimums

**No exceptions.**