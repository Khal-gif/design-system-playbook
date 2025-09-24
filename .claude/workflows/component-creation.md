# Component Creation Workflow

Step-by-step process for creating design system compliant components.

## 1. Pre-Creation Planning

### Component Analysis Checklist
- [ ] **Purpose**: What problem does this component solve?
- [ ] **Variants**: What visual states/sizes are needed?
- [ ] **Props**: What configuration options should it have?
- [ ] **Accessibility**: What a11y requirements must be met?
- [ ] **Responsive**: How should it behave across screen sizes?

### Design System Integration
- [ ] Check if similar component already exists
- [ ] Review typography hierarchy needs
- [ ] Plan spacing using 8-point grid
- [ ] Choose semantic colors only
- [ ] Plan Mulish font weight usage

## 2. Component Creation Steps

### Step 1: Create Component File
```bash
# Use template generator
.claude/commands/new-component.sh ButtonName

# Or manually create in components directory
touch src/components/ButtonName.tsx
```

### Step 2: Implement Base Structure
```tsx
// Follow the template pattern
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface ButtonNameProps {
  // Define props with design system constraints
}

const ButtonName = forwardRef<HTMLElement, ButtonNameProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base design system classes
          "font-sans", // Mulish
          className
        )}
        {...props}
      />
    )
  }
)
```

### Step 3: Apply Design System Rules
- [ ] **Typography**: Use only `font-normal/medium/semibold/bold`
- [ ] **Sizes**: Stick to `text-xs` through `text-5xl`
- [ ] **Spacing**: Use 8-point grid (`p-4`, `p-6`, `p-8`, etc.)
- [ ] **Colors**: Semantic only (`bg-background`, `text-foreground`)
- [ ] **Heights**: Standard button heights (`h-8`, `h-10`, `h-12`, `h-14`)

### Step 4: Create Variants
```tsx
const buttonVariants = cva(
  // Base classes with design system compliance
  "font-sans inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground font-semibold",
        secondary: "bg-secondary text-secondary-foreground font-medium",
        outline: "border bg-background font-medium",
      },
      size: {
        sm: "h-8 px-4 text-sm",      // 32px height
        default: "h-10 px-6 text-base", // 40px height  
        lg: "h-12 px-8 text-base",   // 48px height
        xl: "h-14 px-12 text-lg",    // 56px height
      },
    }
  }
)
```

## 3. Validation Process

### Step 1: Run Design System Checks
```bash
# Check the new component
.claude/scripts/design-check.sh src/components/ButtonName.tsx

# Run specific checks
.claude/scripts/typography-check.sh src/components/ButtonName.tsx
.claude/scripts/spacing-check.sh src/components/ButtonName.tsx
.claude/scripts/color-check.sh src/components/ButtonName.tsx
```

### Step 2: Manual Review Checklist
- [ ] **Font Family**: Only Mulish (`font-sans`)
- [ ] **Font Weights**: Only 400, 500, 600, 700
- [ ] **Font Sizes**: Only approved sizes (12-48px)
- [ ] **Spacing**: All values divisible by 8 or 4
- [ ] **Colors**: Semantic colors only
- [ ] **Responsive**: Proper breakpoint scaling
- [ ] **Accessibility**: Proper ARIA labels, focus states

### Step 3: Test Component
```bash
# Add to Storybook (if available)
# Test all variants and states
# Verify responsive behavior
# Test with screen readers
```

## 4. Documentation & Integration

### Step 1: Add Component Examples
```tsx
// Create usage examples
<ButtonName variant="default" size="default">
  Primary Action
</ButtonName>

<ButtonName variant="outline" size="sm">
  Secondary Action  
</ButtonName>
```

### Step 2: Export Component
```tsx
// In src/components/index.ts
export { ButtonName } from './ButtonName'
```

### Step 3: Update Documentation
- [ ] Add to component library docs
- [ ] Include usage examples
- [ ] Document props and variants
- [ ] Add accessibility notes

## 5. Final Validation

### Complete Design System Audit
```bash
# Full project check
.claude/scripts/design-check.sh src/

# Verify no regressions
npm run build  # or your build command
npm run lint   # or your lint command
npm test       # or your test command
```

### Pre-Commit Checklist
- [ ] All design system checks pass
- [ ] Component follows naming conventions
- [ ] TypeScript types are correct
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] No console errors in browser

## Quick Reference Commands

```bash
# Create new component
.claude/commands/new-component.sh ComponentName

# Validate component
.claude/scripts/design-check.sh src/components/ComponentName.tsx

# Full project validation  
.claude/scripts/design-check.sh src/

# Review typography specifically
.claude/scripts/typography-check.sh src/components/ComponentName.tsx
```

## Common Patterns

### Button Component Template
```tsx
const buttonVariants = cva(
  "font-sans inline-flex items-center justify-center rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground font-semibold",
        secondary: "bg-secondary text-secondary-foreground font-medium", 
        outline: "border bg-background font-medium",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        default: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-base", 
      },
    },
  }
)
```

### Card Component Template  
```tsx
<Card className="p-6">
  <CardHeader className="space-y-2">
    <CardTitle className="text-xl font-semibold">
      Title
    </CardTitle>
    <CardDescription className="text-sm font-normal text-muted-foreground">
      Description
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <p className="text-base font-normal">Content</p>
  </CardContent>
</Card>
```

This workflow ensures every component follows the Design System Law Book from creation to deployment.