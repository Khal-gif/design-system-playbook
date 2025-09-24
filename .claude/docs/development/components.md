# Component Development Guide

Complete guide to building design system compliant components using the templates, patterns, and validation tools provided by the Design System Law Book.

## Component Creation Workflow

### 1. Generate Component from Template

```bash
# Create a new component using the generator
.claude/commands/new-component.sh ComponentName template-type

# Examples:
.claude/commands/new-component.sh PrimaryButton button
.claude/commands/new-component.sh UserCard card
.claude/commands/new-component.sh ContactForm form
.claude/commands/new-component.sh HeroSection page
```

### 2. Available Component Templates

The system includes pre-built templates that follow all design system rules:

#### Button Template
```bash
.claude/commands/new-component.sh MyButton button
```
**Generates:** `src/components/MyButton.tsx`
- Proper sizing (h-8, h-10, h-12, h-14 only)
- Semantic colors (bg-primary, text-primary-foreground)
- Approved typography (font-medium, font-semibold)
- Consistent padding following 8-point grid

#### Card Template
```bash
.claude/commands/new-component.sh ProductCard card
```
**Generates:** `src/components/ProductCard.tsx`
- Standard padding (p-6)
- Proper content hierarchy
- Semantic background colors
- Consistent spacing between elements

#### Form Template
```bash
.claude/commands/new-component.sh RegistrationForm form
```
**Generates:** `src/components/RegistrationForm.tsx`
- Standard input heights (h-10)
- Proper label spacing
- Consistent form layout
- Validation states

#### Page Template
```bash
.claude/commands/new-component.sh LandingPage page
```
**Generates:** `src/components/LandingPage.tsx`
- Complete page structure
- Hero section with proper spacing
- Content sections following layout grid
- Typography hierarchy demonstration

## Component Architecture Patterns

### Base Component Structure

All components follow this pattern:

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

// 1. Define variants using cva
const componentVariants = cva(
  // Base classes - always design system compliant
  "font-sans",  // Always Mulish
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",  // Semantic colors
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border bg-background hover:bg-accent",
      },
      size: {
        sm: "h-8 px-4 text-sm",      // 8-point grid heights
        default: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// 2. Component props interface
export interface ComponentProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof componentVariants> {}

// 3. Component implementation
export const Component = React.forwardRef<HTMLButtonElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Component.displayName = "Component"
```

### Design System Compliance Rules

#### Typography Requirements
```tsx
// ✅ Always use these classes
"font-sans"           // Mulish font family
"font-normal"         // 400 weight
"font-medium"         // 500 weight  
"font-semibold"       // 600 weight
"font-bold"           // 700 weight
"text-xs"             // 12px
"text-sm"             // 14px
"text-base"           // 16px
"text-lg"             // 18px
"text-xl"             // 20px
"text-2xl"            // 24px
"text-3xl"            // 32px
"text-4xl"            // 40px
"text-5xl"            // 48px

// ❌ Never use these
"font-serif"          // Wrong font family
"font-mono"           // Wrong font family
"font-thin"           // Unapproved weight
"font-light"          // Unapproved weight
"font-extrabold"      // Unapproved weight
"font-black"          // Unapproved weight
"text-6xl"            // Too large
"text-[22px]"         // Arbitrary size
```

#### Spacing Requirements
```tsx
// ✅ Always use 8-point grid
"p-0"   "p-1"   "p-2"   "p-3"   "p-4"   "p-6"   "p-8"   "p-12"  "p-16"  "p-24"
"m-0"   "m-1"   "m-2"   "m-3"   "m-4"   "m-6"   "m-8"   "m-12"  "m-16"  "m-24"
"gap-0" "gap-1" "gap-2" "gap-3" "gap-4" "gap-6" "gap-8" "gap-12" "gap-16" "gap-24"

// Heights must follow 8-point grid
"h-6"   "h-8"   "h-10"  "h-12"  "h-14"  "h-16"  "h-20"  "h-24"

// ❌ Never use these
"p-5"               // Not divisible by 4
"gap-7"             // Not divisible by 4
"h-[42px]"          // Arbitrary value
"p-[25px]"          // Arbitrary spacing
"mt-[18px]"         // Non-grid spacing
```

#### Color Requirements
```tsx
// ✅ Always use semantic tokens
"bg-background"           // Main background
"bg-card"                 // Card backgrounds
"bg-primary"              // Primary brand color
"bg-secondary"            // Secondary color
"bg-muted"                // Muted backgrounds
"bg-accent"               // Accent backgrounds

"text-foreground"         // Main text
"text-muted-foreground"   // Secondary text
"text-primary"            // Primary brand text
"text-secondary"          // Secondary text

"border-border"           // Default borders
"border-input"            // Input borders
"ring-ring"               // Focus rings

// ❌ Never use these
"bg-white"                // Hardcoded color
"bg-black"                // Hardcoded color
"bg-gray-100"             // Hardcoded gray
"text-blue-500"           // Hardcoded blue
"bg-[#ffffff]"            // Arbitrary hex
"border-gray-300"         // Hardcoded border
```

## Component Examples

### Button Component (Complete)

```tsx
// src/components/Button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: Design system compliant classes
  "font-sans inline-flex items-center justify-center rounded-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",     // 40px height - 8-point grid
        sm: "h-8 px-4 text-sm",        // 32px height - 8-point grid
        lg: "h-12 px-8",               // 48px height - 8-point grid
        icon: "h-10 w-10",             // Square button
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Input Component (Complete)

```tsx
// src/components/Input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Design system compliant input styling
          "font-sans flex h-10 w-full rounded-base border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

### Card Component (Complete)

```tsx
// src/components/Card.tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "font-sans rounded-base border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}  // 24px padding
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-sans text-2xl font-semibold leading-none tracking-tight",  // Design system typography
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-base text-muted-foreground", className)}  // Design system typography
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)}  // Consistent padding
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}  // Consistent padding
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

## Component Usage Examples

### Button Usage

```tsx
// In your components
import { Button } from "@/components/Button"

export function ButtonExamples() {
  return (
    <div className="space-y-4 p-6">  {/* 8-point grid spacing */}
      {/* Primary actions */}
      <Button variant="default" size="lg">
        Get Started
      </Button>
      
      {/* Secondary actions */}
      <Button variant="outline" size="default">
        Learn More
      </Button>
      
      {/* Destructive actions */}
      <Button variant="destructive" size="sm">
        Delete Account
      </Button>
      
      {/* Icon button */}
      <Button variant="ghost" size="icon">
        <svg>...</svg>
      </Button>
    </div>
  )
}
```

### Card Usage

```tsx
// In your components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Button } from "@/components/Button"

export function CardExample() {
  return (
    <Card className="w-80">  {/* Fixed width following grid */}
      <CardHeader>
        <CardTitle>Product Title</CardTitle>  {/* 24px font, semibold */}
        <CardDescription>
          Product description with proper typography hierarchy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">  {/* 16px spacing between elements */}
          <p className="text-base text-foreground">
            Main content with semantic colors and approved typography.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  )
}
```

### Form Usage

```tsx
// In your components
import { Input } from "@/components/Input"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"

export function FormExample() {
  return (
    <Card className="w-96">  {/* 384px width following scale */}
      <CardHeader>
        <CardTitle>Contact Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">  {/* 16px spacing between fields */}
          <div className="space-y-2">   {/* 8px spacing for labels */}
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input 
              type="text" 
              placeholder="Enter your name"
              className="w-full"  // h-10 height from component
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Submit Form
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

## Component Validation

### Automated Validation

```bash
# Validate component compliance
.claude/scripts/design-check.sh src/components/

# Check specific component
.claude/scripts/design-check.sh src/components/Button.tsx

# Check typography in components
.claude/scripts/typography-check.sh src/components/

# Check spacing in components
.claude/scripts/spacing-check.sh src/components/

# Check colors in components  
.claude/scripts/color-check.sh src/components/
```

### Manual Review Checklist

Before committing components:

**Typography ✅**
- [ ] Uses `font-sans` (Mulish)
- [ ] Uses only approved weights: 400, 500, 600, 700
- [ ] Uses only approved sizes: xs through 5xl
- [ ] No arbitrary text sizes like `text-[22px]`

**Spacing ✅**
- [ ] All padding/margin follows 8-point grid
- [ ] Heights use approved values: h-6, h-8, h-10, h-12, h-14, h-16
- [ ] No arbitrary spacing like `p-[25px]`
- [ ] Uses standard gap values: gap-1, gap-2, gap-4, gap-6, gap-8

**Colors ✅**
- [ ] Uses semantic tokens: bg-primary, text-foreground, etc.
- [ ] No hardcoded colors: bg-white, text-black, bg-gray-500
- [ ] No arbitrary hex values: bg-[#ffffff]
- [ ] Proper contrast ratios maintained

**Component Structure ✅**
- [ ] Uses forwardRef pattern
- [ ] Includes proper TypeScript types
- [ ] Uses cva for variant management
- [ ] Includes displayName
- [ ] Exports component and types

## Integration with AI

### AI Component Generation

When working with Claude Code, the AI automatically:

1. **Uses templates**: References `.claude/templates/` for component structure
2. **Follows patterns**: Maintains consistent architecture across components
3. **Validates compliance**: Suggests corrections for violations
4. **Imports correctly**: Uses proper import statements and utilities

### Component Generation Prompts

**Effective prompts:**
- "Create a notification toast component following the design system"
- "Build a data table component with sorting and filtering"
- "Make a modal dialog component with proper accessibility"

**AI will automatically:**
- Use semantic colors
- Follow 8-point grid spacing  
- Apply Mulish typography with approved weights
- Include proper TypeScript types
- Follow the established component architecture

This component development system ensures every component maintains perfect consistency while providing the flexibility needed for your specific use cases.