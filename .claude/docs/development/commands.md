# Commands Reference Guide

Complete reference for all executable commands, scripts, and development tools included in the Design System Law Book.

## Overview of Commands

The system includes two types of commands:

1. **`.claude/commands/`** - High-level development tools and generators
2. **`.claude/scripts/`** - Low-level validation and automation scripts

## Development Commands (.claude/commands/)

### deploy-to-project.sh
**Purpose:** Deploy the complete design system to any project

```bash
.claude/commands/deploy-to-project.sh /path/to/your/project

# Examples:
.claude/commands/deploy-to-project.sh ~/projects/ecommerce-app
.claude/commands/deploy-to-project.sh /Users/john/work/client-website
.claude/commands/deploy-to-project.sh ../new-project
.claude/commands/deploy-to-project.sh .    # Current directory
```

**What it does:**
- Copies complete `.claude/` system
- Copies `CLAUDE.md` design law book
- Creates project-specific configuration (`design-config.json`)
- Makes all scripts executable
- Adds npm scripts (if package.json exists)
- Installs git hooks (if .git exists)
- Creates documentation (`DESIGN-SYSTEM.md`)

**Output:**
```
🎉 Design System Law Book deployed successfully!

📋 Deployment Summary:
  ✅ Complete .claude/ system deployed
  ✅ CLAUDE.md with full Design Law Book
  ✅ Project configuration created
  ✅ Scripts made executable
  ✅ Documentation generated
```

### generate-tokens.sh
**Purpose:** Generate design tokens from configuration

```bash
.claude/commands/generate-tokens.sh

# Options (advanced):
.claude/commands/generate-tokens.sh --config custom-config.json
.claude/commands/generate-tokens.sh --output custom-tokens/
```

**What it does:**
- Reads `design-config.json`
- Generates color palette from primary color
- Creates CSS custom properties (`src/globals.css`)
- Creates TypeScript definitions (`src/design-tokens.ts`)
- Updates Tailwind configuration (`globals.css with @theme`)
- Creates usage examples (`src/token-usage-examples.tsx`)

**Generated Files:**
```
src/
├── globals.css                 # CSS custom properties
├── design-tokens.ts           # TypeScript definitions
├── token-usage-examples.tsx   # Usage examples
└── ...

globals.css with @theme             # Updated Tailwind config
```

**Output:**
```
🎨 Generating Design Tokens...

✅ Generated src/globals.css (45 color variables)
✅ Generated src/design-tokens.ts (TypeScript definitions)
✅ Updated globals.css with @theme (brand colors added)
✅ Created src/token-usage-examples.tsx

🚀 Tokens generated successfully!
   Import tokens: import './src/globals.css';
```

### new-component.sh
**Purpose:** Generate new components from templates

```bash
.claude/commands/new-component.sh ComponentName template-type

# Examples:
.claude/commands/new-component.sh PrimaryButton button
.claude/commands/new-component.sh UserCard card  
.claude/commands/new-component.sh ContactForm form
.claude/commands/new-component.sh HeroSection page

# Advanced options:
.claude/commands/new-component.sh MyButton button --output src/ui/
.claude/commands/new-component.sh ProductCard card --force  # Overwrite existing
```

**Available Templates:**
- **button** - Button component with variants and sizes
- **card** - Card component with header, content, footer
- **form** - Form component with inputs and validation
- **page** - Complete page template with sections

**What it does:**
- Reads template from `.claude/templates/`
- Replaces template variables with component name
- Creates component file at `src/components/ComponentName.tsx`
- Follows design system patterns
- Includes TypeScript types and proper exports

**Output:**
```
🧩 Creating Component: PrimaryButton (button template)

✅ Created src/components/PrimaryButton.tsx
✅ Component follows design system rules
✅ TypeScript types included
✅ Ready to use and customize

📝 Next steps:
   1. Import: import { PrimaryButton } from '@/components/PrimaryButton'
   2. Use: <PrimaryButton variant="default">Click me</PrimaryButton>
   3. Validate: .claude/scripts/design-check.sh src/components/PrimaryButton.tsx
```

### dev-workflow.sh
**Purpose:** Interactive development menu

```bash
.claude/commands/dev-workflow.sh
```

**Interactive Menu:**
```
🎨 Design System Development Workflow
====================================

Select an option:

1) 🎨 Configure Brand Colors
2) 🔧 Generate Design Tokens
3) 🧩 Create New Component
4) ✅ Validate Design System
5) 📦 Setup Project Structure
6) 🚀 Deploy to Another Project
7) 📖 View Documentation
8) ❌ Exit

Enter your choice (1-8):
```

**What each option does:**
1. **Configure Brand Colors** - Opens `design-config.json` in editor
2. **Generate Design Tokens** - Runs token generation
3. **Create New Component** - Interactive component generator
4. **Validate Design System** - Runs design system validation
5. **Setup Project Structure** - Creates missing directories
6. **Deploy to Another Project** - Guided deployment process
7. **View Documentation** - Shows available documentation
8. **Exit** - Closes the menu

### setup-project.sh
**Purpose:** Setup project structure for specific frameworks

```bash
.claude/commands/setup-project.sh framework-type

# Examples:
.claude/commands/setup-project.sh nextjs
.claude/commands/setup-project.sh react
.claude/commands/setup-project.sh vite
.claude/commands/setup-project.sh remix
```

**What it does:**
- Creates framework-specific directory structure
- Adds appropriate configuration files
- Sets up build scripts
- Configures imports and exports
- Adds framework-specific examples

## Validation Scripts (.claude/scripts/)

### design-check.sh
**Purpose:** Comprehensive design system validation

```bash
.claude/scripts/design-check.sh [directory]

# Examples:
.claude/scripts/design-check.sh src/
.claude/scripts/design-check.sh src/components/
.claude/scripts/design-check.sh src/components/Button.tsx
.claude/scripts/design-check.sh .    # Entire project
```

**What it checks:**
- Typography compliance (font family, weights, sizes)
- Spacing compliance (8-point grid)
- Color compliance (semantic tokens only)
- Component structure patterns

**Output Examples:**

**✅ Success:**
```
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ✅ No violations found

📄 Checking: src/components/Card.tsx
  ✅ No violations found

==================
✅ All files comply with Design System Law Book!
```

**❌ Violations Found:**
```
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ❌ FONT WEIGHT VIOLATION:
    Line 10: className="font-light text-xl"
    → Should use: font-normal, font-medium, font-semibold, or font-bold

  ❌ ARBITRARY SPACING:
    Line 15: className="px-[18px] py-[10px]"
    → Should use: px-4 py-2 or px-6 py-3 (8-point grid)

==================
❌ Found 2 violations
💡 Refer to CLAUDE.md for correct usage
```

**Exit Codes:**
- `0` - All files comply
- `1` - Violations found

### typography-check.sh
**Purpose:** Validate typography compliance only

```bash
.claude/scripts/typography-check.sh [directory]

# Examples:
.claude/scripts/typography-check.sh src/
.claude/scripts/typography-check.sh src/components/Header.tsx
```

**What it checks:**
- Font family must be Mulish (`font-sans`)
- Only approved weights: 400, 500, 600, 700
- Only approved sizes: 12px-48px (text-xs to text-5xl)
- No arbitrary font sizes like `text-[22px]`

**Violations Caught:**
```
❌ FONT FAMILY: font-serif, font-mono, font-display
❌ FONT WEIGHT: font-thin, font-light, font-extrabold, font-black  
❌ FONT SIZE: text-6xl, text-7xl, text-8xl, text-9xl
❌ ARBITRARY: text-[22px], text-[1.375rem]
```

### spacing-check.sh
**Purpose:** Validate 8-point grid spacing compliance

```bash
.claude/scripts/spacing-check.sh [directory]

# Examples:
.claude/scripts/spacing-check.sh src/
.claude/scripts/spacing-check.sh src/pages/
```

**What it checks:**
- All spacing values divisible by 8 or 4
- No arbitrary spacing like `p-[25px]`
- No invalid Tailwind classes like `p-5`, `gap-7`
- Heights follow 8-point grid

**Violations Caught:**
```
❌ ARBITRARY SPACING: p-[25px], m-[18px], gap-[14px]
❌ INVALID CLASSES: p-5, p-7, gap-5, gap-7, h-[42px]
❌ NON-GRID VALUES: p-13, m-15, gap-9
```

### color-check.sh  
**Purpose:** Validate semantic color usage

```bash
.claude/scripts/color-check.sh [directory]

# Examples:
.claude/scripts/color-check.sh src/
.claude/scripts/color-check.sh src/styles/
```

**What it checks:**
- Only semantic color tokens used
- No hardcoded colors like `bg-white`, `text-black`
- No arbitrary hex values like `bg-[#ffffff]`
- No gray scale colors like `bg-gray-500`

**Violations Caught:**
```
❌ HARDCODED COLORS: bg-white, bg-black, text-gray-600
❌ ARBITRARY HEX: bg-[#ffffff], text-[#333333]
❌ GRAY SCALE: bg-gray-100, text-gray-700
❌ BRAND COLORS: bg-blue-500, text-red-600
```

## Advanced Command Options

### Command Line Arguments

**deploy-to-project.sh:**
```bash
# Standard deployment
.claude/commands/deploy-to-project.sh /path/to/project

# Skip confirmation (automation)
.claude/commands/deploy-to-project.sh /path/to/project --yes

# Custom source directory
.claude/commands/deploy-to-project.sh /path/to/project --source /custom/playbook/
```

**generate-tokens.sh:**
```bash
# Standard generation
.claude/commands/generate-tokens.sh

# Custom config file
.claude/commands/generate-tokens.sh --config custom-design-config.json

# Custom output directory
.claude/commands/generate-tokens.sh --output src/design-system/

# Verbose output
.claude/commands/generate-tokens.sh --verbose
```

**new-component.sh:**
```bash
# Standard component
.claude/commands/new-component.sh Button button

# Custom output directory
.claude/commands/new-component.sh Button button --output src/ui/

# Overwrite existing
.claude/commands/new-component.sh Button button --force

# Use custom template
.claude/commands/new-component.sh Button --template ./custom-button-template.tsx
```

### Validation Script Options

**design-check.sh:**
```bash
# Standard check
.claude/scripts/design-check.sh src/

# Exit immediately on first violation
.claude/scripts/design-check.sh src/ --fail-fast

# Show line numbers in output
.claude/scripts/design-check.sh src/ --line-numbers

# Check specific file types only
.claude/scripts/design-check.sh src/ --extensions tsx,ts,jsx,js

# Ignore specific directories
.claude/scripts/design-check.sh src/ --ignore node_modules,dist,build
```

## Integration with Git Hooks

### Pre-commit Hook (Auto-installed)

The deployment automatically installs this pre-commit hook:

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🎨 Checking Design System compliance..."

.claude/scripts/design-check.sh src/
if [ $? -ne 0 ]; then
    echo "❌ Design System violations found. Fix before committing."
    echo "💡 Run: .claude/scripts/design-check.sh src/"
    exit 1
fi
echo "✅ Design System compliance check passed"
```

### Manual Git Hook Setup

```bash
# If not automatically installed
cp .claude/templates/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
# .github/workflows/design-system-check.yml
name: Design System Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Make scripts executable
        run: |
          chmod +x .claude/scripts/*.sh
          chmod +x .claude/commands/*.sh
      
      - name: Validate Design System
        run: .claude/scripts/design-check.sh src/
      
      - name: Validate Typography
        run: .claude/scripts/typography-check.sh src/
      
      - name: Validate Spacing  
        run: .claude/scripts/spacing-check.sh src/
      
      - name: Validate Colors
        run: .claude/scripts/color-check.sh src/
```

## Package.json Integration

### Auto-added Scripts

Deployment automatically adds these to your `package.json`:

```json
{
  "scripts": {
    "design:check": ".claude/scripts/design-check.sh src",
    "design:typography": ".claude/scripts/typography-check.sh src", 
    "design:spacing": ".claude/scripts/spacing-check.sh src",
    "design:colors": ".claude/scripts/color-check.sh src",
    "design:generate": ".claude/commands/generate-tokens.sh",
    "design:workflow": ".claude/commands/dev-workflow.sh",
    "design:component": ".claude/commands/new-component.sh"
  }
}
```

### Using with Package Managers

```bash
# npm
npm run design:check
npm run design:generate  
npm run design:workflow

# yarn
yarn design:check
yarn design:generate
yarn design:workflow

# pnpm
pnpm design:check
pnpm design:generate
pnpm design:workflow
```

## Troubleshooting Commands

### Permission Issues

```bash
# Make scripts executable
chmod +x .claude/scripts/*.sh
chmod +x .claude/commands/*.sh

# Check permissions
ls -la .claude/scripts/
ls -la .claude/commands/
```

### Command Not Found

```bash
# Check file exists
ls -la .claude/commands/deploy-to-project.sh

# Check current directory
pwd
ls -la .claude/

# Run with full path
/absolute/path/to/project/.claude/commands/deploy-to-project.sh
```

### Validation Failing

```bash
# Check if bc calculator is installed (needed for color calculations)
which bc

# macOS - install bc
brew install bc

# Linux - install bc
sudo apt-get install bc

# Check script syntax
bash -n .claude/scripts/design-check.sh
```

This commands reference provides complete documentation for using all tools included in the Design System Law Book, ensuring consistent development workflows across all projects.