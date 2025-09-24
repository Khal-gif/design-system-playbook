# Design System Automation Overview

Complete executable automation system for the Design System Law Book.

## 🗂️ Directory Structure

```
.claude/
├── scripts/           # Executable validation scripts
│   ├── design-check.sh      # Main comprehensive checker
│   ├── spacing-check.sh     # 8-point grid validation
│   ├── typography-check.sh  # Mulish font system validation  
│   ├── color-check.sh       # Semantic color validation
│   └── README.md            # Scripts documentation
├── workflows/         # Step-by-step processes
│   ├── component-creation.md  # Component development workflow
│   └── design-review.md       # Code review process
├── templates/         # Design system compliant templates
│   ├── button-template.tsx    # Button component template
│   ├── card-template.tsx      # Card component template
│   ├── form-template.tsx      # Form component template
│   └── page-template.tsx      # Full page template
├── commands/          # Project automation commands
│   ├── new-component.sh       # Component generator
│   ├── setup-project.sh       # Project setup automation
│   └── dev-workflow.sh        # Interactive development menu
└── OVERVIEW.md        # This file
```

## 🚀 Quick Start

### 1. Interactive Development Menu
```bash
.claude/commands/dev-workflow.sh
```
Full interactive menu for all design system operations.

### 2. Setup New Project
```bash
.claude/commands/setup-project.sh nextjs
```
Configures project with Design System Law Book compliance.

### 3. Create Components
```bash
.claude/commands/new-component.sh MyButton button
.claude/commands/new-component.sh UserCard card  
.claude/commands/new-component.sh LoginForm form
```

### 4. Validate Design System
```bash
.claude/scripts/design-check.sh src/
```

## 📋 Available Commands

### Validation Scripts
| Script | Purpose | Usage |
|--------|---------|-------|
| `design-check.sh` | Comprehensive validation | `.claude/scripts/design-check.sh src/` |
| `typography-check.sh` | Font compliance | `.claude/scripts/typography-check.sh src/` |
| `spacing-check.sh` | 8-point grid | `.claude/scripts/spacing-check.sh src/` |
| `color-check.sh` | Semantic colors | `.claude/scripts/color-check.sh src/` |

### Development Commands
| Command | Purpose | Usage |
|---------|---------|-------|
| `dev-workflow.sh` | Interactive menu | `.claude/commands/dev-workflow.sh` |
| `new-component.sh` | Generate components | `.claude/commands/new-component.sh Name type` |
| `setup-project.sh` | Setup new project | `.claude/commands/setup-project.sh nextjs` |

### Component Types
- `button` - Interactive button with variants
- `card` - Content card with header/body/footer
- `form` - Form fields with validation
- `page` - Full page layout template
- `custom` - Basic component template

## 🎯 Design System Rules

### Typography (Mulish Only)
```bash
✅ Weights: font-normal (400), font-medium (500), font-semibold (600), font-bold (700)
✅ Sizes: text-xs (12px) → text-5xl (48px)  
❌ Forbidden: font-thin, font-light, text-6xl+, text-[22px]
```

### Spacing (8-Point Grid)
```bash
✅ Valid: p-0, p-1, p-2, p-3, p-4, p-6, p-8, p-12, gap-4, gap-8
❌ Invalid: p-5, p-7, p-[25px], gap-5, gap-[18px]
```

### Colors (Semantic Only)
```bash
✅ Semantic: bg-background, text-foreground, bg-primary, text-muted-foreground
❌ Hardcoded: bg-white, text-black, bg-gray-500, text-[#333333]
```

## 🔄 Workflows

### Component Creation Workflow
1. **Planning** - Define purpose, variants, props
2. **Creation** - Use template generator
3. **Implementation** - Apply design system rules
4. **Validation** - Run automated checks
5. **Documentation** - Add examples and exports
6. **Testing** - Verify functionality

### Design Review Workflow
1. **Automated Checks** - Run all validation scripts
2. **Typography Review** - Font, weights, sizes, hierarchy
3. **Spacing Review** - 8-point grid compliance
4. **Color Review** - Semantic token usage
5. **Component Review** - Structure and patterns
6. **Responsive Review** - Cross-device behavior
7. **Accessibility Review** - a11y compliance
8. **Final Sign-off** - Approval or change requests

## 📦 Templates

### Button Template
- Variants: default, destructive, outline, secondary, ghost, link
- Sizes: sm (h-8), default (h-10), lg (h-12), xl (h-14)
- Typography: font-semibold/font-medium
- Full Design System compliance

### Card Template
- Structure: CardHeader, CardContent, CardFooter
- Typography: text-xl font-semibold titles, text-sm descriptions
- Spacing: p-6 padding, space-y-2/space-y-4 gaps
- Semantic colors throughout

### Form Template
- Components: Form, FormField, FormLabel, FormInput, FormTextarea
- Heights: h-10 inputs (40px), proper touch targets
- Typography: text-sm font-medium labels, text-xs helpers
- Accessibility: proper focus states, ARIA labels

### Page Template
- Complete page with hero, features, content, CTA sections
- Responsive typography scaling
- Proper spacing hierarchy (py-24, py-16, py-12)
- Semantic color distribution (60/30/10 rule)

## 🔧 Integration

### Package.json Scripts
```json
{
  "scripts": {
    "design-check": ".claude/scripts/design-check.sh src",
    "design-spacing": ".claude/scripts/spacing-check.sh src",
    "design-typography": ".claude/scripts/typography-check.sh src", 
    "design-colors": ".claude/scripts/color-check.sh src"
  }
}
```

### Pre-commit Hooks
```bash
#!/bin/bash
.claude/scripts/design-check.sh src/
if [ $? -ne 0 ]; then
    echo "❌ Design system violations found"
    exit 1
fi
```

### CI/CD Integration
```yaml
- name: Design System Check
  run: .claude/scripts/design-check.sh src/
```

## 📊 Validation Output

### Success Example
```
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ✅ No violations found

==================
✅ All files comply with Design System Law Book!
```

### Failure Example
```
📄 Checking: src/components/Button.tsx
  ❌ FONT WEIGHT VIOLATION:
    Line 10: className="font-light text-xl"
  ❌ ARBITRARY SPACING:
    Line 15: className="px-[18px] py-[10px]"

==================
❌ Found 2 violations
💡 Refer to CLAUDE.md for correct usage
```

## 🎓 Best Practices

### Development Flow
1. Start with `dev-workflow.sh` interactive menu
2. Use component templates for consistency
3. Run validation scripts before commits
4. Follow the design review checklist
5. Keep semantic colors and 8-point grid

### Project Setup
1. Run `setup-project.sh` for new projects
2. Install pre-commit hooks
3. Add npm scripts for validation
4. Configure Tailwind with Design System theme
5. Import Mulish fonts properly

### Component Development
1. Use `new-component.sh` generator
2. Start with appropriate template
3. Follow typography hierarchy rules
4. Maintain 8-point spacing grid
5. Use semantic color tokens only

### Code Review
1. Run automated checks first
2. Follow manual review checklist  
3. Verify responsive behavior
4. Check accessibility compliance
5. Document any exceptions clearly

This system provides complete automation for maintaining Design System Law Book compliance throughout your development workflow.