# Automatic Validation System

Complete guide to the automated validation system that enforces Design System Law Book compliance through scripts, git hooks, and CI/CD integration.

## Overview

The validation system automatically checks your code against design system rules:

1. **Typography Rules** - Mulish font, approved weights/sizes only
2. **Spacing Rules** - 8-point grid compliance for all spacing
3. **Color Rules** - Semantic tokens only, no hardcoded colors
4. **Component Rules** - Standard heights, proper structure

## Validation Architecture

### Three-Level Validation

**Level 1: Development (Real-time)**
- AI suggestions during development
- Editor integration via settings.json
- Interactive feedback

**Level 2: Pre-commit (Git hooks)**
- Automatic validation before commits
- Prevents violations from entering repository
- Quick feedback loop

**Level 3: CI/CD (Build-time)**
- Full project validation in pipeline
- Blocks deployments with violations
- Team-wide enforcement

## Main Validation Script

### design-check.sh

The primary validation script that runs all checks:

```bash
.claude/scripts/design-check.sh [directory]

# Examples:
.claude/scripts/design-check.sh src/              # Check src directory
.claude/scripts/design-check.sh src/components/   # Check components only
.claude/scripts/design-check.sh .                 # Check entire project
```

**What it validates:**
- **Typography**: Font family, weights, sizes
- **Spacing**: 8-point grid compliance
- **Colors**: Semantic token usage
- **Structure**: Component patterns

**Output format:**
```bash
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ✅ Typography: Compliant
  ✅ Spacing: Compliant  
  ✅ Colors: Compliant
  ✅ Structure: Compliant

📄 Checking: src/components/Card.tsx
  ❌ FONT WEIGHT VIOLATION:
    Line 12: className="font-light text-xl"
    → Should use: font-normal, font-medium, font-semibold, or font-bold
  
  ❌ ARBITRARY SPACING:
    Line 18: className="px-[18px] py-[10px]"
    → Should use: px-4 py-2 (16px, 8px) following 8-point grid

==================
❌ Found 2 violations in 1 file
💡 Refer to CLAUDE.md for correct usage
```

**Exit codes:**
- `0` - All files pass validation
- `1` - Violations found

## Individual Validation Scripts

### Typography Validation

**typography-check.sh**

```bash
.claude/scripts/typography-check.sh src/
```

**Validates:**

✅ **Allowed Font Families:**
```css
font-sans     /* Mulish - the only approved font */
```

❌ **Forbidden Font Families:**
```css
font-serif    /* Times, Georgia */
font-mono     /* Courier, Menlo */
font-display  /* Custom display fonts */
```

✅ **Allowed Font Weights:**
```css
font-normal    /* 400 - body text */
font-medium    /* 500 - labels, UI elements */
font-semibold  /* 600 - subheadings */
font-bold      /* 700 - headings */
```

❌ **Forbidden Font Weights:**
```css
font-thin      /* 100 - too light */
font-light     /* 300 - too light */
font-extrabold /* 800 - too heavy */
font-black     /* 900 - too heavy */
```

✅ **Allowed Font Sizes (8-point scale):**
```css
text-xs        /* 12px */
text-sm        /* 14px */
text-base      /* 16px */
text-lg        /* 18px */
text-xl        /* 20px */
text-2xl       /* 24px */
text-3xl       /* 32px */
text-4xl       /* 40px */
text-5xl       /* 48px */
```

❌ **Forbidden Font Sizes:**
```css
text-6xl       /* 60px - too large */
text-7xl       /* 72px - too large */
text-[22px]    /* Arbitrary sizes */
text-[1.375rem] /* Arbitrary rem values */
```

### Spacing Validation

**spacing-check.sh**

```bash
.claude/scripts/spacing-check.sh src/
```

**8-Point Grid Rules:**

✅ **Allowed Spacing Classes:**
```css
/* Padding: values divisible by 8 or 4 */
p-0   p-1   p-2   p-3   p-4   p-6   p-8   p-12  p-16  p-24  p-32
px-0  px-1  px-2  px-3  px-4  px-6  px-8  px-12 px-16 px-24 px-32
py-0  py-1  py-2  py-3  py-4  py-6  py-8  py-12 py-16 py-24 py-32

/* Margin: same as padding */
m-0   m-1   m-2   m-3   m-4   m-6   m-8   m-12  m-16  m-24  m-32

/* Gap: grid spacing */
gap-0 gap-1 gap-2 gap-3 gap-4 gap-6 gap-8 gap-12 gap-16 gap-24

/* Heights: 8-point scale */
h-6   h-8   h-10  h-12  h-14  h-16  h-20  h-24  h-32  h-40  h-48
```

❌ **Forbidden Spacing Classes:**
```css
/* Values not divisible by 4 */
p-5   p-7   p-9   p-11  p-13  p-15
gap-5 gap-7 gap-9 gap-11

/* Arbitrary values */
p-[25px]    px-[18px]   py-[15px]
m-[22px]    gap-[14px]  h-[42px]

/* Non-grid heights */
h-[25px]    h-[35px]    h-[45px]
```

**Grid Calculation:**
```bash
# 8-point base unit = 4px
p-0  = 0px    ✅ (0 × 4)
p-1  = 4px    ✅ (1 × 4)  
p-2  = 8px    ✅ (2 × 4)
p-3  = 12px   ✅ (3 × 4)
p-4  = 16px   ✅ (4 × 4)
p-5  = 20px   ❌ (not standard Tailwind 8-point scale)
p-6  = 24px   ✅ (6 × 4)
```

### Color Validation

**color-check.sh**

```bash
.claude/scripts/color-check.sh src/
```

**Semantic Color Rules:**

✅ **Allowed Semantic Colors:**
```css
/* Backgrounds */
bg-background      /* Main page background */
bg-card            /* Card backgrounds */
bg-popover         /* Overlay backgrounds */
bg-primary         /* Brand primary color */
bg-secondary       /* Secondary color */
bg-muted           /* Muted backgrounds */
bg-accent          /* Accent backgrounds */

/* Text Colors */
text-foreground           /* Main text */
text-muted-foreground     /* Secondary text */
text-primary              /* Primary brand text */
text-secondary            /* Secondary text */
text-destructive          /* Error text */

/* Borders */
border-border      /* Default borders */
border-input       /* Input borders */
ring-ring          /* Focus rings */
```

❌ **Forbidden Color Classes:**
```css
/* Hardcoded colors */
bg-white           /* Use bg-background */
bg-black           /* Use bg-foreground */
text-white         /* Use text-primary-foreground */
text-black         /* Use text-foreground */

/* Gray scale colors */
bg-gray-50         /* Use bg-muted */
bg-gray-100        /* Use bg-accent */
text-gray-600      /* Use text-muted-foreground */
border-gray-300    /* Use border-border */

/* Brand colors */
bg-blue-500        /* Use bg-primary */
text-red-600       /* Use text-destructive */
bg-green-400       /* Use semantic success token */

/* Arbitrary colors */
bg-[#ffffff]       /* Use semantic tokens */
text-[#333333]     /* Use semantic tokens */
border-[#e5e5e5]   /* Use semantic tokens */
```

## Git Hook Integration

### Pre-commit Hook (Automatic)

Deployment automatically installs this pre-commit hook:

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Auto-installed by Design System deployment

echo "🎨 Checking Design System compliance..."

if [ -f ".claude/scripts/design-check.sh" ]; then
    .claude/scripts/design-check.sh src/
    if [ $? -ne 0 ]; then
        echo "❌ Design System violations found. Fix before committing."
        echo "💡 Run: .claude/scripts/design-check.sh src/"
        echo "💡 Or use: git commit --no-verify (not recommended)"
        exit 1
    fi
    echo "✅ Design System compliance check passed"
else
    echo "⚠️  Design System scripts not found"
fi
```

**What happens on commit:**

```bash
git add .
git commit -m "Add new button component"

# Output:
🎨 Checking Design System compliance...
📁 Scanning: src/

❌ FONT WEIGHT VIOLATION:
  src/components/Button.tsx:15 - font-light not allowed

❌ Design System violations found. Fix before committing.
💡 Run: .claude/scripts/design-check.sh src/
```

### Bypassing Hook (Emergency)

```bash
# Skip validation (not recommended)
git commit --no-verify -m "Emergency fix"

# Or disable hook temporarily
chmod -x .git/hooks/pre-commit
```

## CI/CD Pipeline Integration

### GitHub Actions Example

```yaml
# .github/workflows/design-system.yml
name: Design System Validation

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  validate-design-system:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Make scripts executable
      run: |
        chmod +x .claude/scripts/*.sh
        chmod +x .claude/commands/*.sh
    
    - name: Install bc calculator
      run: sudo apt-get install -y bc
    
    - name: Validate Design System
      run: |
        echo "🎨 Running Design System validation..."
        .claude/scripts/design-check.sh src/
    
    - name: Validate Typography
      run: |
        echo "🔤 Validating Typography..."
        .claude/scripts/typography-check.sh src/
    
    - name: Validate Spacing
      run: |
        echo "📏 Validating Spacing..."
        .claude/scripts/spacing-check.sh src/
    
    - name: Validate Colors
      run: |
        echo "🎨 Validating Colors..."
        .claude/scripts/color-check.sh src/
    
    - name: Comment PR with results
      if: failure()
      uses: actions/github-script@v6
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: '❌ Design System validation failed. Please run `.claude/scripts/design-check.sh src/` locally and fix violations before merging.'
          })
```

### GitLab CI Example

```yaml
# .gitlab-ci.yml
stages:
  - validate

design-system-check:
  stage: validate
  image: node:18-alpine
  before_script:
    - apk add --no-cache bash bc
    - chmod +x .claude/scripts/*.sh
    - chmod +x .claude/commands/*.sh
  script:
    - echo "🎨 Design System validation..."
    - .claude/scripts/design-check.sh src/
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_BRANCH == "main"
  artifacts:
    reports:
      junit: design-system-report.xml
    when: always
```

## Package.json Script Integration

### Automatic Script Addition

Deployment adds these scripts to your `package.json`:

```json
{
  "scripts": {
    "design:check": ".claude/scripts/design-check.sh src",
    "design:typography": ".claude/scripts/typography-check.sh src",
    "design:spacing": ".claude/scripts/spacing-check.sh src",
    "design:colors": ".claude/scripts/color-check.sh src",
    "precommit": "npm run design:check",
    "prepare": "husky install || true"
  }
}
```

### Using npm Scripts

```bash
# Full validation
npm run design:check

# Individual checks
npm run design:typography
npm run design:spacing  
npm run design:colors

# As part of other scripts
npm run build && npm run design:check
```

## IDE Integration

### VS Code Integration

**settings.json configuration:**
```json
{
  "emerald.lint.run": "onSave",
  "emerald.validate.enable": true,
  "tasks.json": {
    "version": "2.0.0",
    "tasks": [
      {
        "label": "Design System Check",
        "type": "shell", 
        "command": ".claude/scripts/design-check.sh",
        "args": ["src/"],
        "group": "build",
        "presentation": {
          "echo": true,
          "reveal": "always",
          "focus": false,
          "panel": "shared"
        }
      }
    ]
  }
}
```

**Keyboard shortcut (keybindings.json):**
```json
[
  {
    "key": "cmd+shift+d",
    "command": "workbench.action.tasks.runTask",
    "args": "Design System Check"
  }
]
```

### Terminal Integration

**Add to .bashrc/.zshrc:**
```bash
# Design System aliases
alias dscheck='.claude/scripts/design-check.sh src/'
alias dstypo='.claude/scripts/typography-check.sh src/'  
alias dsspace='.claude/scripts/spacing-check.sh src/'
alias dscolor='.claude/scripts/color-check.sh src/'
alias dsgen='.claude/commands/generate-tokens.sh'
```

## Validation Performance

### Optimization Tips

**1. Directory Targeting:**
```bash
# Faster - check specific directories
.claude/scripts/design-check.sh src/components/

# Slower - check everything
.claude/scripts/design-check.sh .
```

**2. File Type Filtering:**
```bash
# Check only relevant files
find src/ -name "*.tsx" -o -name "*.jsx" | xargs .claude/scripts/design-check.sh
```

**3. Parallel Validation:**
```bash
# Run checks in parallel
.claude/scripts/typography-check.sh src/ &
.claude/scripts/spacing-check.sh src/ &  
.claude/scripts/color-check.sh src/ &
wait
```

### Performance Benchmarks

**Typical validation times:**
- Small project (50 components): ~2 seconds
- Medium project (200 components): ~8 seconds  
- Large project (500+ components): ~20 seconds

## Troubleshooting Validation

### Common Issues

**"Permission denied"**
```bash
chmod +x .claude/scripts/*.sh
```

**"bc: command not found"**
```bash
# macOS
brew install bc

# Ubuntu/Debian
sudo apt-get install bc

# CentOS/RHEL
sudo yum install bc
```

**"No violations found but manual review shows issues"**
```bash
# Check script is running correctly
.claude/scripts/design-check.sh src/ --verbose

# Check file is being processed
grep -n "font-light" src/components/Problem.tsx
```

### Validation Debugging

**Enable verbose output:**
```bash
# Add to beginning of validation script
set -x  # Enable debug mode
```

**Check specific violations:**
```bash
# Test typography detection
echo 'className="font-light"' | .claude/scripts/typography-check.sh -

# Test spacing detection  
echo 'className="p-[25px]"' | .claude/scripts/spacing-check.sh -

# Test color detection
echo 'className="bg-gray-500"' | .claude/scripts/color-check.sh -
```

This automatic validation system ensures consistent design system compliance across all development workflows, from local development to production deployment.