# Development Workflows Guide

Step-by-step workflows for common development tasks within the Design System Law Book, from initial setup to component creation, validation, and deployment.

## Interactive Development Menu

The system includes an interactive workflow menu that guides you through common tasks:

```bash
.claude/commands/dev-workflow.sh
```

**Menu Options:**
1. 🎨 Configure Brand Colors
2. 🔧 Generate Design Tokens  
3. 🧩 Create New Component
4. ✅ Validate Design System
5. 📦 Setup Project Structure
6. 🚀 Deploy to Another Project

## Workflow 1: New Project Setup

### Starting from Design Playbook

**Step 1: Deploy System**
```bash
# From Design Playbook directory
.claude/commands/deploy-to-project.sh /path/to/your/new/project

# Interactive confirmation
> Continue? (y/N): y
```

**Step 2: Navigate to Project**
```bash
cd /path/to/your/new/project
```

**Step 3: Configure Brand**
```bash
nano design-config.json

# Set your primary color
{
  "branding": {
    "primaryColor": {
      "hue": 280,        # Your brand hue (0-360)
      "saturation": 0.8, # Color intensity
      "lightness": 0.5   # Color lightness
    }
  }
}
```

**Step 4: Generate Tokens**
```bash
.claude/commands/generate-tokens.sh

# Output:
# ✅ Generated src/globals.css
# ✅ Generated src/design-tokens.ts  
# ✅ Updated globals.css with @theme
# ✅ Created usage examples
```

**Step 5: Import Tokens**
```typescript
// In your main app file (App.tsx, layout.tsx, _app.tsx)
import './src/globals.css';
```

**Step 6: Verify Setup**
```bash
# Test validation
.claude/scripts/design-check.sh src/

# Test component generation
.claude/commands/new-component.sh TestButton button

# Interactive development menu
.claude/commands/dev-workflow.sh
```

## Workflow 2: Component Development

### Creating a New Component

**Step 1: Generate from Template**
```bash
.claude/commands/new-component.sh ComponentName template-type

# Examples:
.claude/commands/new-component.sh HeroButton button
.claude/commands/new-component.sh ProductCard card
.claude/commands/new-component.sh LoginForm form
```

**Step 2: Review Generated Component**
```bash
# Component created at src/components/ComponentName.tsx
cat src/components/HeroButton.tsx
```

**Step 3: Customize Component**
```tsx
// Edit the component while maintaining compliance
export const HeroButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ 
          variant, 
          size, 
          className: cn(
            "font-semibold",           // ✅ Approved weight
            "text-lg",                 // ✅ Approved size
            "px-8 py-4",              // ✅ 8-point grid spacing
            className
          )
        }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

**Step 4: Test Component**
```tsx
// Create test usage
const TestPage = () => (
  <div className="p-8 space-y-4">
    <HeroButton variant="default" size="lg">
      Primary Action
    </HeroButton>
    <HeroButton variant="outline" size="lg">
      Secondary Action
    </HeroButton>
  </div>
)
```

**Step 5: Validate Component**
```bash
# Validate the specific component
.claude/scripts/design-check.sh src/components/HeroButton.tsx

# Should output:
# ✅ No violations found
```

## Workflow 3: Brand Color Updates

### Changing Brand Colors Mid-Project

**Step 1: Update Configuration**
```bash
nano design-config.json

# Change primary color
{
  "branding": {
    "primaryColor": {
      "hue": 140,        # Change from blue (220) to green (140)
      "saturation": 0.7,
      "lightness": 0.5
    }
  }
}
```

**Step 2: Regenerate Tokens**
```bash
.claude/commands/generate-tokens.sh

# All files update automatically:
# src/globals.css       - New CSS custom properties
# src/design-tokens.ts - New TypeScript definitions
# globals.css with @theme   - New Tailwind colors
```

**Step 3: Restart Development Server**
```bash
# Your dev server to pick up new CSS
npm run dev
# or
yarn dev
# or  
pnpm dev
```

**Step 4: Verify Color Changes**
```bash
# Check all components use new colors
.claude/scripts/color-check.sh src/

# Should show no violations - all components automatically use new brand color
```

## Workflow 4: Adding Custom Variants

### Extending Components with New Variants

**Step 1: Create Component Extension**
```tsx
// src/components/ExtendedButton.tsx
import { buttonVariants, ButtonProps } from "@/components/Button"
import { cva } from "class-variance-authority"

// Extend the existing variants
const extendedButtonVariants = cva(
  buttonVariants(),  // Include base variants
  {
    variants: {
      variant: {
        // Standard variants (inherited)
        default: "bg-primary text-primary-foreground",
        outline: "border bg-background",
        
        // New custom variants - following system patterns
        success: "bg-green-500 text-green-50 hover:bg-green-600",    // System success color
        warning: "bg-yellow-500 text-yellow-900 hover:bg-yellow-600", // System warning color
        danger: "bg-red-500 text-red-50 hover:bg-red-600",           // System error color
      }
    }
  }
)
```

**Step 2: Validate Custom Variants**
```bash
# Check that custom variants follow design system
.claude/scripts/design-check.sh src/components/ExtendedButton.tsx

# If violations found, fix using semantic tokens:
# ❌ bg-green-500  →  ✅ bg-success
# ❌ text-red-50   →  ✅ text-success-foreground
```

**Step 3: Update Token System (if needed)**
```css
/* src/custom-globals.css */
:root {
  /* Add semantic tokens for new variants */
  --success: var(--foundation-green-500);
  --success-foreground: var(--foundation-green-50);
  --warning: var(--foundation-yellow-500);
  --warning-foreground: var(--foundation-yellow-900);
  --danger: var(--foundation-red-500);
  --danger-foreground: var(--foundation-red-50);
}
```

## Workflow 5: Form Development

### Building Complex Forms

**Step 1: Generate Form Template**
```bash
.claude/commands/new-component.sh RegistrationForm form
```

**Step 2: Analyze Generated Structure**
```tsx
// Generated form includes:
// - Standard input heights (h-10)
// - Proper label spacing (space-y-2)  
// - Consistent form layout (space-y-4)
// - Semantic colors throughout
```

**Step 3: Add Form Fields**
```tsx
export const RegistrationForm = () => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your information to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">  {/* 16px spacing between fields */}
          
          {/* Field group with proper spacing */}
          <div className="space-y-2">  {/* 8px label-to-input spacing */}
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>
            <Input 
              type="text" 
              placeholder="Enter your full name"
            />
          </div>
          
          {/* Repeat pattern for other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input 
              type="email" 
              placeholder="Enter your email"
            />
          </div>
          
          {/* Button with proper spacing */}
          <Button type="submit" className="w-full mt-6">  {/* 24px top margin */}
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

**Step 4: Add Form Validation**
```tsx
// Add validation states following design system
const [errors, setErrors] = useState<Record<string, string>>({})

return (
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">
      Email Address
    </label>
    <Input 
      type="email"
      className={cn(
        errors.email && "border-destructive focus-visible:ring-destructive"
      )}
      placeholder="Enter your email"
    />
    {errors.email && (
      <p className="text-sm text-destructive">  {/* Semantic error color */}
        {errors.email}
      </p>
    )}
  </div>
)
```

## Workflow 6: Page Layout Development

### Building Complete Pages

**Step 1: Generate Page Template**
```bash
.claude/commands/new-component.sh LandingPage page
```

**Step 2: Review Generated Structure**
```tsx
// Generated page includes:
// - Hero section with proper spacing
// - Content sections following layout grid
// - Typography hierarchy demonstration
// - Semantic color usage throughout
```

**Step 3: Customize Page Sections**
```tsx
export const LandingPage = () => {
  return (
    <div className="font-sans min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 px-4">  {/* 96px vertical, 16px horizontal */}
        <div className="max-w-4xl mx-auto text-center">  {/* Container following scale */}
          <h1 className="text-5xl font-bold text-foreground mb-6">  {/* 48px text, 24px bottom margin */}
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8">  {/* 20px text, 32px bottom margin */}
            Build amazing things with our design system.
          </p>
          <div className="flex gap-4 justify-center">  {/* 16px gap */}
            <Button variant="default" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-muted">  {/* 64px vertical padding */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">  {/* 40px text, 48px bottom margin */}
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">  {/* 32px gap */}
            {/* Feature cards */}
          </div>
        </div>
      </section>
    </div>
  )
}
```

## Workflow 7: Validation and Testing

### Pre-Commit Validation Workflow

**Step 1: Run Complete Validation**
```bash
# Full design system check
.claude/scripts/design-check.sh src/

# Individual checks for detailed feedback
.claude/scripts/typography-check.sh src/
.claude/scripts/spacing-check.sh src/
.claude/scripts/color-check.sh src/
```

**Step 2: Fix Violations**
```bash
# If violations found:
# ❌ Line 25: className="font-light text-6xl"
# ❌ Line 30: className="p-[18px] bg-gray-500"

# Fix to:
# ✅ Line 25: className="font-medium text-5xl"
# ✅ Line 30: className="p-4 bg-muted"
```

**Step 3: Re-validate**
```bash
.claude/scripts/design-check.sh src/

# Should output:
# ✅ All files comply with Design System Law Book!
```

**Step 4: Commit Changes**
```bash
git add .
git commit -m "Add new component following design system rules"

# Pre-commit hook automatically runs validation
# ✅ Design System compliance check passed
```

## Workflow 8: Multi-Project Synchronization

### Updating Design System Across Projects

**Step 1: Update Master Template (Design Playbook)**
```bash
# Make improvements to Design Playbook
# Update scripts, templates, or documentation
```

**Step 2: Deploy Updates to Projects**
```bash
# Re-deploy to existing projects
.claude/commands/deploy-to-project.sh /path/to/project-1
.claude/commands/deploy-to-project.sh /path/to/project-2
.claude/commands/deploy-to-project.sh /path/to/project-3

# Each project gets updated system while keeping their brand colors
```

**Step 3: Regenerate Tokens in Each Project**
```bash
# In each project directory
cd /path/to/project-1
.claude/commands/generate-tokens.sh

cd /path/to/project-2  
.claude/commands/generate-tokens.sh

cd /path/to/project-3
.claude/commands/generate-tokens.sh
```

**Step 4: Validate All Projects**
```bash
# Check each project for compliance
.claude/scripts/design-check.sh /path/to/project-1/src/
.claude/scripts/design-check.sh /path/to/project-2/src/
.claude/scripts/design-check.sh /path/to/project-3/src/
```

## Integration with Package.json Scripts

### Adding Workflow Scripts

The deployment automatically adds these scripts to your `package.json`:

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

### Using npm/yarn Scripts

```bash
# Run workflows through package manager
npm run design:check          # Full validation
npm run design:generate       # Regenerate tokens  
npm run design:workflow       # Interactive menu

# Or with yarn
yarn design:check
yarn design:generate
yarn design:workflow
```

## Troubleshooting Common Workflows

### Component Not Rendering Correctly

**1. Check token imports:**
```typescript
// Make sure tokens are imported
import './src/globals.css';
```

**2. Verify token generation:**
```bash
ls -la src/globals.css src/design-tokens.ts
.claude/commands/generate-tokens.sh
```

**3. Check design system compliance:**
```bash
.claude/scripts/design-check.sh src/components/YourComponent.tsx
```

### Colors Not Updating After Brand Change

**1. Regenerate tokens:**
```bash
.claude/commands/generate-tokens.sh
```

**2. Restart dev server:**
```bash
npm run dev  # or yarn dev, pnpm dev
```

**3. Clear cache:**
```bash
rm -rf node_modules/.cache
npm start
```

### Validation Failing Unexpectedly

**1. Check file permissions:**
```bash
chmod +x .claude/scripts/*.sh
chmod +x .claude/commands/*.sh
```

**2. Verify file structure:**
```bash
ls -la .claude/scripts/design-check.sh
ls -la design-config.json
```

**3. Run individual checks:**
```bash
.claude/scripts/typography-check.sh src/
.claude/scripts/spacing-check.sh src/  
.claude/scripts/color-check.sh src/
```

This workflow system ensures consistent development practices across all projects while maintaining the flexibility needed for different requirements and team structures.