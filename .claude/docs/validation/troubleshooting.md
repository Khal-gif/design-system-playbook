# Design System Troubleshooting Guide

Complete guide to diagnosing and fixing common issues with the Design System Law Book, including validation errors, token generation problems, and deployment issues.

## Common Validation Violations

### Typography Violations

#### Font Weight Issues

**❌ Problem:** Using unapproved font weights
```tsx
className="font-light text-xl"        // font-light (300) not allowed
className="font-thin text-lg"         // font-thin (100) not allowed  
className="font-extrabold text-2xl"   // font-extrabold (800) not allowed
```

**✅ Solution:** Use only approved weights
```tsx
className="font-normal text-xl"       // 400 weight ✓
className="font-medium text-lg"       // 500 weight ✓
className="font-semibold text-2xl"    // 600 weight ✓
className="font-bold text-2xl"        // 700 weight ✓
```

**Quick Fix Command:**
```bash
# Find and replace common violations
find src/ -name "*.tsx" -exec sed -i 's/font-light/font-normal/g' {} \;
find src/ -name "*.tsx" -exec sed -i 's/font-thin/font-normal/g' {} \;
find src/ -name "*.tsx" -exec sed -i 's/font-extrabold/font-bold/g' {} \;
find src/ -name "*.tsx" -exec sed -i 's/font-black/font-bold/g' {} \;
```

#### Font Size Issues

**❌ Problem:** Using oversized or arbitrary text sizes
```tsx
className="text-6xl font-bold"        // text-6xl (60px) too large
className="text-7xl font-bold"        // text-7xl (72px) too large
className="text-[22px] font-medium"   // arbitrary size not allowed
```

**✅ Solution:** Use approved sizes only
```tsx
className="text-5xl font-bold"        // 48px - largest allowed ✓
className="text-4xl font-bold"        // 40px ✓
className="text-xl font-medium"       // 20px instead of 22px ✓
```

**Size Reference:**
```css
text-xs   = 12px  ✓    text-6xl  = 60px  ❌
text-sm   = 14px  ✓    text-7xl  = 72px  ❌
text-base = 16px  ✓    text-8xl  = 96px  ❌
text-lg   = 18px  ✓    text-9xl  = 128px ❌
text-xl   = 20px  ✓
text-2xl  = 24px  ✓
text-3xl  = 32px  ✓
text-4xl  = 40px  ✓
text-5xl  = 48px  ✓ (maximum)
```

#### Font Family Issues

**❌ Problem:** Using wrong font families
```tsx
className="font-serif text-lg"        // serif not allowed
className="font-mono text-base"       // monospace not allowed
```

**✅ Solution:** Always use Mulish (font-sans)
```tsx
className="font-sans text-lg"         // Mulish font ✓
className="font-sans text-base"       // Default and correct ✓
```

### Spacing Violations

#### Non-Grid Spacing

**❌ Problem:** Using spacing not divisible by 8 or 4
```tsx
className="p-[25px] m-[18px]"         // Arbitrary values
className="px-5 py-7"                 // p-5, p-7 not in 8-point grid
className="gap-5 space-y-7"           // gap-5, space-y-7 not allowed
```

**✅ Solution:** Use 8-point grid values only
```tsx
className="p-6 m-4"                   // p-6=24px, m-4=16px ✓
className="px-4 py-6"                 // px-4=16px, py-6=24px ✓  
className="gap-4 space-y-6"           // gap-4=16px, space-y-6=24px ✓
```

**8-Point Grid Reference:**
```css
p-0  = 0px    ✓    p-5  = 20px   ❌
p-1  = 4px    ✓    p-7  = 28px   ❌
p-2  = 8px    ✓    p-9  = 36px   ❌
p-3  = 12px   ✓    p-11 = 44px   ❌
p-4  = 16px   ✓    p-13 = 52px   ❌
p-6  = 24px   ✓    p-15 = 60px   ❌
p-8  = 32px   ✓
p-12 = 48px   ✓
p-16 = 64px   ✓
```

#### Component Height Issues

**❌ Problem:** Using non-standard component heights
```tsx
className="h-[42px] px-4"             // 42px not on 8-point grid
className="h-9 px-3"                  // h-9 (36px) not standard for components
className="h-[35px] py-2"             // 35px arbitrary value
```

**✅ Solution:** Use standard component heights
```tsx
className="h-8 px-4"                  // 32px button (small) ✓
className="h-10 px-6"                 // 40px button (default) ✓  
className="h-12 px-8"                 // 48px button (large) ✓
className="h-14 px-10"                // 56px button (extra large) ✓
```

**Standard Component Heights:**
```css
h-6  = 24px  ✓ (very small inputs)
h-8  = 32px  ✓ (small buttons)
h-10 = 40px  ✓ (default buttons/inputs)
h-12 = 48px  ✓ (large buttons)
h-14 = 56px  ✓ (extra large buttons)
```

### Color Violations

#### Hardcoded Colors

**❌ Problem:** Using hardcoded color values
```tsx
className="bg-white text-black"       // Hardcoded colors
className="bg-gray-100 text-gray-800" // Gray scale colors
className="border-gray-300"           // Hardcoded borders
```

**✅ Solution:** Use semantic color tokens
```tsx
className="bg-background text-foreground"     // Semantic background/text ✓
className="bg-muted text-muted-foreground"   // Semantic muted colors ✓
className="border-border"                     // Semantic borders ✓
```

#### Brand Color Issues

**❌ Problem:** Using hardcoded brand colors
```tsx
className="bg-blue-500 text-white"    // Hardcoded blue
className="text-red-600"              // Hardcoded red
className="bg-green-400"              // Hardcoded green
```

**✅ Solution:** Use semantic brand tokens
```tsx
className="bg-primary text-primary-foreground"  // Your brand color ✓
className="text-destructive"                     // Semantic red ✓
className="bg-success text-success-foreground"  // Semantic green ✓
```

#### Arbitrary Color Values

**❌ Problem:** Using arbitrary hex/rgb values
```tsx
className="bg-[#ffffff] text-[#333333]"        // Arbitrary hex
className="bg-[rgb(255,255,255)]"              // Arbitrary RGB
```

**✅ Solution:** Use semantic tokens
```tsx
className="bg-background text-foreground"      // Semantic tokens ✓
```

## Token Generation Issues

### Tokens Not Generating

**Problem:** `generate-tokens.sh` fails or creates empty files

**Diagnostic Steps:**

1. **Check configuration file exists:**
```bash
ls -la design-config.json
```

2. **Validate configuration syntax:**
```bash
# Check JSON is valid
cat design-config.json | jq .

# Should output formatted JSON, not errors
```

3. **Check bc calculator is installed:**
```bash
which bc

# If not found:
# macOS: brew install bc
# Linux: sudo apt-get install bc
```

4. **Run token generation with verbose output:**
```bash
bash -x .claude/commands/generate-tokens.sh
```

**Common Fixes:**

**Invalid JSON configuration:**
```json
// ❌ Invalid - trailing comma
{
  "branding": {
    "primaryColor": {
      "hue": 220,
      "saturation": 0.8,
      "lightness": 0.5,
    }
  }
}

// ✅ Valid - no trailing comma
{
  "branding": {
    "primaryColor": {
      "hue": 220,
      "saturation": 0.8,
      "lightness": 0.5
    }
  }
}
```

**Missing bc calculator:**
```bash
# macOS
brew install bc

# Ubuntu/Debian
sudo apt-get install bc

# CentOS/RHEL
sudo yum install bc

# Alpine Linux
apk add bc
```

### Color Values Out of Range

**Problem:** Invalid color values in configuration

**❌ Invalid Values:**
```json
{
  "primaryColor": {
    "hue": 380,        // > 360
    "saturation": 1.2, // > 1.0
    "lightness": -0.1  // < 0.0
  }
}
```

**✅ Valid Values:**
```json
{
  "primaryColor": {
    "hue": 220,        // 0-360
    "saturation": 0.8, // 0.0-1.0
    "lightness": 0.5   // 0.0-1.0
  }
}
```

### Generated Files Missing

**Problem:** Token files not created in expected locations

**Check file creation:**
```bash
ls -la src/globals.css
ls -la src/design-tokens.ts
ls -la globals.css with @theme
```

**Common Causes:**
1. **Missing src/ directory:**
```bash
mkdir -p src/
.claude/commands/generate-tokens.sh
```

2. **Permission issues:**
```bash
chmod +w src/
chmod +x .claude/commands/generate-tokens.sh
```

3. **Script not executable:**
```bash
chmod +x .claude/commands/*.sh
```

## Deployment Issues

### Scripts Not Executable

**Problem:** Permission denied when running commands

**Error:**
```bash
.claude/commands/deploy-to-project.sh /path/to/project
-bash: .claude/commands/deploy-to-project.sh: Permission denied
```

**Solution:**
```bash
# Make all scripts executable
chmod +x .claude/scripts/*.sh
chmod +x .claude/commands/*.sh

# Verify permissions
ls -la .claude/scripts/
ls -la .claude/commands/
```

### Target Directory Issues

**Problem:** Deployment fails with "Directory not found"

**Common Causes:**

1. **Relative path issues:**
```bash
# ❌ Relative path might not exist
.claude/commands/deploy-to-project.sh ../new-project

# ✅ Use absolute path
.claude/commands/deploy-to-project.sh /full/path/to/new-project
```

2. **Directory doesn't exist:**
```bash
# Create directory first
mkdir -p /path/to/new-project
.claude/commands/deploy-to-project.sh /path/to/new-project
```

### Pre-commit Hook Not Working

**Problem:** Git commits succeed despite violations

**Check hook installation:**
```bash
ls -la .git/hooks/pre-commit
cat .git/hooks/pre-commit
```

**Reinstall hook:**
```bash
# Manual installation
cp .claude/templates/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# Or re-deploy system
.claude/commands/deploy-to-project.sh .
```

## Validation Script Issues

### False Positives

**Problem:** Validation reports violations that don't exist

**Common Causes:**

1. **Comments triggering validation:**
```tsx
// This comment mentions font-light but doesn't use it
const Button = () => (
  <button className="font-medium text-base">  {/* Correct usage */}
    Click me
  </button>
)
```

**Solution:** Use more specific regex patterns or ignore comments.

2. **String literals triggering validation:**
```tsx
const errorMessage = "Use font-light for this design"  // String, not CSS class
```

### False Negatives

**Problem:** Real violations not caught by validation

**Diagnostic Steps:**

1. **Test specific violation:**
```bash
echo 'className="font-light"' | .claude/scripts/typography-check.sh -
```

2. **Check file is being scanned:**
```bash
.claude/scripts/design-check.sh src/components/Problem.tsx --verbose
```

3. **Verify violation exists:**
```bash
grep -n "font-light" src/components/Problem.tsx
```

## Build and Development Issues

### Tokens Not Loading

**Problem:** CSS custom properties not available

**Check import:**
```typescript
// Make sure tokens are imported in main app file
import './src/globals.css';  // Add this line
```

**Verify file exists:**
```bash
ls -la src/globals.css
```

**Check CSS content:**
```bash
head -20 src/globals.css
# Should show :root { --primary: ...; }
```

### Development Server Issues

**Problem:** Changes not reflected after token regeneration

**Solution:**
```bash
# Regenerate tokens
.claude/commands/generate-tokens.sh

# Clear cache and restart
rm -rf node_modules/.cache
npm start  # or yarn dev, pnpm dev
```

### TypeScript Errors

**Problem:** TypeScript can't find design token types

**Check TypeScript definitions:**
```bash
ls -la src/design-tokens.ts
```

**Import types correctly:**
```typescript
import { designTokens } from './design-tokens';
// or
import type { DesignTokens } from './design-tokens';
```

## Component Issues

### Component Generation Fails

**Problem:** `new-component.sh` doesn't create files

**Check template exists:**
```bash
ls -la .claude/templates/button-template.tsx
ls -la .claude/templates/card-template.tsx
```

**Check output directory:**
```bash
ls -la src/components/
mkdir -p src/components/  # Create if missing
```

**Run with different template:**
```bash
.claude/commands/new-component.sh TestButton button
```

### Components Not Following Rules

**Problem:** Generated components have violations

**Re-deploy system to get latest templates:**
```bash
.claude/commands/deploy-to-project.sh .
```

**Manually validate template:**
```bash
.claude/scripts/design-check.sh .claude/templates/
```

## Multi-Project Synchronization Issues

### Inconsistent Behavior Across Projects

**Problem:** Same configuration produces different results

**Check system versions:**
```bash
# In each project
cat .designsystemrc
# Compare "version" and "deployed" fields
```

**Re-deploy to sync versions:**
```bash
.claude/commands/deploy-to-project.sh /path/to/project-1
.claude/commands/deploy-to-project.sh /path/to/project-2
```

### Brand Colors Not Updating

**Problem:** Token regeneration doesn't apply new colors

1. **Verify configuration changed:**
```bash
cat design-config.json
# Check primaryColor values
```

2. **Clear and regenerate:**
```bash
rm src/globals.css src/design-tokens.ts
.claude/commands/generate-tokens.sh
```

3. **Restart development server:**
```bash
npm run dev  # or yarn dev
```

## Emergency Fixes

### Quick Violation Fixes

**Mass fix font weights:**
```bash
find src/ -name "*.tsx" -type f -exec sed -i.bak \
  -e 's/font-thin/font-normal/g' \
  -e 's/font-light/font-normal/g' \
  -e 's/font-extrabold/font-bold/g' \
  -e 's/font-black/font-bold/g' {} \;
```

**Mass fix text sizes:**
```bash
find src/ -name "*.tsx" -type f -exec sed -i.bak \
  -e 's/text-6xl/text-5xl/g' \
  -e 's/text-7xl/text-5xl/g' \
  -e 's/text-8xl/text-5xl/g' {} \;
```

**Mass fix hardcoded colors:**
```bash
find src/ -name "*.tsx" -type f -exec sed -i.bak \
  -e 's/bg-white/bg-background/g' \
  -e 's/text-black/text-foreground/g' \
  -e 's/bg-gray-100/bg-muted/g' {} \;
```

### Bypass Validation (Emergency Only)

**Skip pre-commit hook:**
```bash
git commit --no-verify -m "Emergency fix - will address violations later"
```

**Disable validation temporarily:**
```bash
chmod -x .git/hooks/pre-commit
# Remember to re-enable: chmod +x .git/hooks/pre-commit
```

### Recovery Commands

**Reset to clean state:**
```bash
# Re-deploy entire system
.claude/commands/deploy-to-project.sh .

# Regenerate all tokens
.claude/commands/generate-tokens.sh

# Full validation check
.claude/scripts/design-check.sh src/
```

**Restore from backup:**
```bash
# Deployment creates backups automatically
ls -la *.backup.*
cp CLAUDE.md.backup.20240118-143022 CLAUDE.md
```

This troubleshooting guide covers the most common issues encountered when using the Design System Law Book. For issues not covered here, check the validation output carefully and refer to the complete rule documentation in `CLAUDE.md`.