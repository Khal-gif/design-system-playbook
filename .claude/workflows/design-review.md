# Design Review Workflow

Comprehensive process for reviewing code against the Design System Law Book.

## Pre-Review Setup

### Automated Checks
```bash
# Run all design system validations
.claude/scripts/design-check.sh src/

# Individual system checks
.claude/scripts/typography-check.sh src/
.claude/scripts/spacing-check.sh src/
.claude/scripts/color-check.sh src/
```

### Review Preparation
- [ ] Pull latest changes
- [ ] Run build process
- [ ] Clear browser cache
- [ ] Test in multiple browsers/devices

## 1. Typography Review

### Automated Check
```bash
.claude/scripts/typography-check.sh src/
```

### Manual Verification Checklist
- [ ] **Font Family**: All text uses Mulish (`font-sans`)
- [ ] **Font Weights**: Only 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- [ ] **Font Sizes**: 
  - [ ] `text-xs` (12px) for labels/badges
  - [ ] `text-sm` (14px) for helper text
  - [ ] `text-base` (16px) for body text
  - [ ] `text-lg` (18px) for large body
  - [ ] `text-xl` (20px) for small headings
  - [ ] `text-2xl` (24px) for section headings
  - [ ] `text-3xl` (32px) for major headings
  - [ ] `text-4xl` (40px) for page titles
  - [ ] `text-5xl` (48px) for hero text
  - [ ] NO `text-6xl` or larger
- [ ] **Hierarchy**: Clear size/weight progression
- [ ] **Line Heights**: On 8-point grid when specified

### Common Violations to Check
```tsx
❌ font-thin, font-light, font-extrabold, font-black
❌ text-6xl, text-7xl, text-8xl, text-9xl
❌ text-[22px], text-[30px] (arbitrary sizes)
❌ font-mono, font-serif
❌ style={{ fontFamily: 'Arial' }}

✅ font-normal, font-medium, font-semibold, font-bold
✅ text-xs through text-5xl
✅ font-sans (Mulish)
```

## 2. Spacing Review

### Automated Check
```bash
.claude/scripts/spacing-check.sh src/
```

### Manual Verification Checklist
- [ ] **Padding**: All `p-*` values divisible by 8 or 4
- [ ] **Margins**: All `m-*` values divisible by 8 or 4  
- [ ] **Gaps**: All `gap-*` values on grid
- [ ] **Heights**: Component heights on 8-point grid
- [ ] **Widths**: Fixed widths on grid when used

### Valid Spacing Classes
```bash
✅ p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-7, p-8, p-9, p-10, p-11, p-12
✅ p-14, p-16, p-20, p-24, p-28, p-32, p-36, p-40, p-44, p-48, p-52, p-56, p-60, p-64
✅ gap-2, gap-4, gap-6, gap-8, gap-10, gap-12, gap-16

❌ p-13, p-15, p-17, p-18, p-19, p-21, p-22, p-23, p-25, p-26, p-27
❌ gap-1, gap-3, gap-5, gap-7, gap-9, gap-11, gap-13, gap-14, gap-15
❌ p-[25px], m-[30px], gap-[18px] (arbitrary values)
```

## 3. Color Review

### Automated Check  
```bash
.claude/scripts/color-check.sh src/
```

### Manual Verification Checklist
- [ ] **Semantic Usage**: Only design system color tokens
- [ ] **60/30/10 Rule**: Proper color distribution
  - [ ] 60% Neutral backgrounds (`bg-background`, `bg-card`, `bg-muted`)
  - [ ] 30% Text colors (`text-foreground`, `text-muted-foreground`)
  - [ ] 10% Accent colors (`bg-primary`, `bg-secondary`, `bg-destructive`)
- [ ] **No Hardcoded Colors**: No direct color values

### Valid Color Classes
```bash
✅ Backgrounds:
bg-background, bg-card, bg-muted, bg-popover

✅ Text:  
text-foreground, text-muted-foreground, text-card-foreground, text-popover-foreground

✅ Accents:
bg-primary, bg-secondary, bg-destructive, bg-accent

❌ Forbidden:
bg-white, bg-gray-50, bg-blue-500, text-black, text-gray-600
bg-[#ffffff], text-[#333333], bg-[rgb(255,255,255)]
```

## 4. Component Structure Review

### Button Components
- [ ] **Heights**: Only `h-8`, `h-10`, `h-12`, `h-14`
- [ ] **Padding**: Only `px-4`, `px-6`, `px-8`, `px-12`
- [ ] **Font Weights**: `font-medium` or `font-semibold` for buttons
- [ ] **Sizes**: Consistent with design system

### Form Components
- [ ] **Input Heights**: `h-10` standard, `h-8` compact
- [ ] **Label Typography**: `text-sm font-medium`
- [ ] **Helper Text**: `text-xs font-normal text-muted-foreground`
- [ ] **Field Spacing**: `space-y-2` for label gaps, `space-y-4` for field gaps

### Card Components
- [ ] **Padding**: `p-6` standard, or multiples of 8
- [ ] **Title Typography**: `text-xl font-semibold`
- [ ] **Description**: `text-sm font-normal text-muted-foreground`
- [ ] **Content Spacing**: `space-y-4` for sections

## 5. Responsive Design Review

### Typography Scaling
- [ ] **Responsive Sizes**: Proper scaling across breakpoints
  ```tsx
  ✅ text-3xl md:text-4xl lg:text-5xl
  ✅ text-2xl md:text-3xl  
  ✅ text-base md:text-lg
  
  ❌ text-[30px] md:text-[45px]
  ```

### Spacing Scaling  
- [ ] **Container Padding**: `px-4 md:px-6 lg:px-8`
- [ ] **Section Spacing**: `py-12 md:py-16 lg:py-24`
- [ ] **Grid Gaps**: `gap-4 md:gap-6 lg:gap-8`

### Font Weight Adjustments
- [ ] **Responsive Weights**: 
  ```tsx
  ✅ font-semibold md:font-bold (more emphasis on larger screens)
  ✅ font-normal md:font-medium
  ```

## 6. Accessibility Review

### Typography Accessibility
- [ ] **Minimum Sizes**: 
  - [ ] Body text: 16px minimum (`text-base`)
  - [ ] Helper text: 14px minimum (`text-sm`)  
  - [ ] Labels: 12px minimum (`text-xs`)
- [ ] **Weight Contrast**: Clear hierarchy with weight differences
- [ ] **Color Contrast**: Semantic colors provide proper contrast

### Interactive Elements
- [ ] **Focus States**: Visible focus indicators
- [ ] **Touch Targets**: Minimum 44px height for buttons
- [ ] **ARIA Labels**: Proper accessibility labels

## 7. Performance Review

### Font Loading
- [ ] **Mulish Loading**: Efficient loading strategy
- [ ] **Weight Optimization**: Only 4 weights loaded (400, 500, 600, 700)
- [ ] **Display Swap**: `display: swap` for font loading

### CSS Optimization
- [ ] **Purging**: Unused classes removed in production
- [ ] **Critical CSS**: Above-fold content properly styled

## Review Completion Checklist

### Automated Validation
```bash
# All checks must pass
.claude/scripts/design-check.sh src/
echo $?  # Should return 0
```

### Final Manual Checks
- [ ] Visual consistency across components
- [ ] Proper typography hierarchy
- [ ] Consistent spacing patterns
- [ ] Semantic color usage
- [ ] Responsive behavior
- [ ] Accessibility compliance

### Sign-Off Process
- [ ] All automated checks pass
- [ ] Manual review completed
- [ ] Screenshots/recordings captured
- [ ] Issues documented and tracked
- [ ] Approval given or changes requested

## Review Report Template

```markdown
# Design Review Report

**Date**: [DATE]
**Reviewer**: [NAME]  
**Scope**: [COMPONENTS/PAGES REVIEWED]

## Automated Checks
- [ ] Typography: PASS/FAIL
- [ ] Spacing: PASS/FAIL  
- [ ] Colors: PASS/FAIL
- [ ] Overall: PASS/FAIL

## Manual Review
- [ ] Design System Compliance: PASS/FAIL
- [ ] Responsive Design: PASS/FAIL
- [ ] Accessibility: PASS/FAIL

## Issues Found
1. [Issue description with line numbers]
2. [Issue description with line numbers]

## Recommendations
- [Recommendation 1]
- [Recommendation 2]

## Status: APPROVED / NEEDS CHANGES
```

This workflow ensures comprehensive design system compliance before code reaches production.