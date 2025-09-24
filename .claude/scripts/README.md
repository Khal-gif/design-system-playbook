# Design System Validation Scripts

Executable scripts to automatically check your code for compliance with the Design System Law Book.

## Available Scripts

### 🎨 Main Design Check
```bash
.claude/scripts/design-check.sh [directory]
```
Comprehensive check for all design system violations.

**Example:**
```bash
.claude/scripts/design-check.sh src/components
.claude/scripts/design-check.sh .  # Check entire project
```

### 📏 Spacing Check
```bash
.claude/scripts/spacing-check.sh [directory]
```
Validates 8-point grid spacing compliance.

**Catches:**
- Arbitrary spacing like `p-[25px]`
- Invalid classes like `p-13`, `gap-5`
- Non-grid-compliant values

### 🔤 Typography Check
```bash
.claude/scripts/typography-check.sh [directory]
```
Ensures Mulish font system compliance.

**Catches:**
- Wrong font weights (`font-thin`, `font-black`)
- Oversized text (`text-6xl`, `text-7xl`)
- Arbitrary sizes like `text-[22px]`
- Non-Mulish fonts

### 🎨 Color Check
```bash
.claude/scripts/color-check.sh [directory]
```
Validates semantic color usage.

**Catches:**
- Hardcoded colors (`bg-white`, `text-black`)
- Arbitrary hex values `bg-[#ffffff]`
- Non-semantic color usage

## Usage Examples

### Check specific component
```bash
.claude/scripts/design-check.sh src/components/Button.tsx
```

### Check all components
```bash
.claude/scripts/design-check.sh src/components
```

### Run individual checks
```bash
.claude/scripts/spacing-check.sh src/
.claude/scripts/typography-check.sh src/
.claude/scripts/color-check.sh src/
```

### Integration with Git Hooks

Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
.claude/scripts/design-check.sh src/
if [ $? -ne 0 ]; then
    echo "❌ Design system violations found. Fix before committing."
    exit 1
fi
```

### Integration with Package.json
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

## Output Examples

### ✅ Clean Code
```
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ✅ No violations found

==================
✅ All files comply with Design System Law Book!
```

### ❌ Violations Found
```
🎨 Design System Compliance Check
==================================
📁 Scanning: src/components

📄 Checking: src/components/Button.tsx
  ❌ FONT WEIGHT VIOLATION:
    Line 10: className="font-light text-xl"
  ❌ ARBITRARY SPACING:
    Line 15: className="px-[18px] py-[10px]"

==================
❌ Found 2 violations
💡 Refer to CLAUDE.md for correct usage
```

## Rules Reference

### ✅ Allowed
- **Fonts:** Mulish only
- **Weights:** `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700)
- **Sizes:** `text-xs` to `text-5xl` (12px-48px)
- **Spacing:** Values divisible by 8 or 4
- **Colors:** Semantic only (`bg-background`, `text-foreground`, etc.)

### ❌ Forbidden
- **Fonts:** Arial, system fonts, `font-mono`, `font-serif`
- **Weights:** `font-thin`, `font-light`, `font-extrabold`, `font-black`
- **Sizes:** `text-6xl+`, arbitrary `text-[22px]`
- **Spacing:** `p-[25px]`, `gap-5`, non-grid values
- **Colors:** `bg-white`, `text-black`, `bg-[#ffffff]`

## Integration Tips

1. **Run before commits** to catch violations early
2. **Add to CI/CD** for automated checking
3. **Use with VSCode** via terminal integration
4. **Combine with linting** for comprehensive code quality

All scripts return exit code 0 for success, 1 for violations found.