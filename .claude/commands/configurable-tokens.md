# Configurable Design Token System
## Reusable Across All Projects

> **Philosophy**: Define your primary color once, everything else cascades automatically. Copy this system to any project and customize instantly.

---

## 🎨 PROJECT CONFIGURATION

### Single Source of Truth: `design-config.json`

```json
{
  "project": {
    "name": "My Project",
    "version": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,        // Blue hue (0-360)
      "saturation": 0.8, // High saturation (0-1)
      "lightness": 0.5   // Medium lightness (0-1)
    },
    
    "secondaryColor": {
      "hue": 280,        // Purple hue (optional)
      "saturation": 0.6,
      "lightness": 0.6
    },
    
    "neutralTemperature": "cool", // "cool", "warm", or "neutral"
    "brandPersonality": "professional" // "professional", "playful", "elegant", "bold"
  },
  
  "typography": {
    "fontFamily": "Mulish", // Always Mulish, but configurable for future
    "scaleRatio": 1.25,     // Typography scale multiplier
    "baseSize": 16          // Base font size in px
  },
  
  "spacing": {
    "baseUnit": 4,          // Base spacing unit (4px for 8pt grid)
    "scaleRatio": 1.5       // How spacing grows between sizes
  },
  
  "borderRadius": {
    "baseRadius": 6         // Base border radius in px
  }
}
```

---

## 🧮 AUTOMATIC COLOR GENERATION SYSTEM

### From One Primary Color → Full Palette

```typescript
// Color generation engine
const generateColorPalette = (config: DesignConfig) => {
  const { hue, saturation, lightness } = config.branding.primaryColor;
  
  // Generate primary palette (50-950 scale)
  const primaryPalette = {
    50: `oklch(${0.95} ${saturation * 0.1} ${hue})`,
    100: `oklch(${0.90} ${saturation * 0.2} ${hue})`,
    200: `oklch(${0.82} ${saturation * 0.3} ${hue})`,
    300: `oklch(${0.73} ${saturation * 0.4} ${hue})`,
    400: `oklch(${0.65} ${saturation * 0.6} ${hue})`,
    500: `oklch(${lightness} ${saturation} ${hue})`,        // Your primary color
    600: `oklch(${lightness - 0.08} ${saturation * 1.1} ${hue})`,
    700: `oklch(${lightness - 0.15} ${saturation} ${hue})`,
    800: `oklch(${lightness - 0.22} ${saturation * 0.8} ${hue})`,
    900: `oklch(${lightness - 0.28} ${saturation * 0.6} ${hue})`,
    950: `oklch(${lightness - 0.35} ${saturation * 0.4} ${hue})`,
  };
  
  // Auto-generate neutral palette based on temperature
  const neutralPalette = generateNeutrals(config.branding.neutralTemperature, hue);
  
  // Auto-generate semantic colors
  const semanticColors = generateSemanticColors(primaryPalette, config.branding.brandPersonality);
  
  return {
    primary: primaryPalette,
    neutral: neutralPalette,
    semantic: semanticColors
  };
};

// Neutral generation based on temperature
const generateNeutrals = (temperature: string, brandHue: number) => {
  const neutralHue = temperature === 'cool' ? brandHue + 20 : 
                     temperature === 'warm' ? brandHue - 30 : 0;
  
  const baseSaturation = temperature === 'neutral' ? 0 : 0.02;
  
  return {
    0: `oklch(0.99 ${baseSaturation} ${neutralHue})`,
    50: `oklch(0.98 ${baseSaturation} ${neutralHue})`,
    100: `oklch(0.96 ${baseSaturation * 1.5} ${neutralHue})`,
    200: `oklch(0.92 ${baseSaturation * 1.5} ${neutralHue})`,
    300: `oklch(0.86 ${baseSaturation * 1.2} ${neutralHue})`,
    400: `oklch(0.64 ${baseSaturation} ${neutralHue})`,
    500: `oklch(0.45 ${baseSaturation} ${neutralHue})`,
    600: `oklch(0.32 ${baseSaturation} ${neutralHue})`,
    700: `oklch(0.25 ${baseSaturation} ${neutralHue})`,
    800: `oklch(0.15 ${baseSaturation} ${neutralHue})`,
    900: `oklch(0.09 ${baseSaturation} ${neutralHue})`,
    950: `oklch(0.05 ${baseSaturation} ${neutralHue})`,
  };
};

// Semantic color generation
const generateSemanticColors = (primaryPalette: any, personality: string) => {
  const intensity = personality === 'bold' ? 1.2 : 
                   personality === 'elegant' ? 0.8 : 1.0;
  
  return {
    success: `oklch(0.55 ${0.15 * intensity} 140)`,
    warning: `oklch(0.75 ${0.15 * intensity} 85)`,
    error: `oklch(0.55 ${0.18 * intensity} 25)`,
    info: primaryPalette[500], // Use primary for info
  };
};
```

---

## 🏗️ UNIVERSAL TOKEN ARCHITECTURE

### Foundation Tokens (Auto-Generated)

```typescript
// Auto-generated from config
const generateFoundationTokens = (config: DesignConfig) => {
  const colors = generateColorPalette(config);
  const spacing = generateSpacingScale(config.spacing);
  const typography = generateTypographyScale(config.typography);
  
  return {
    // Colors - Generated from your primary
    colors: {
      primary: colors.primary,
      neutral: colors.neutral,
      success: colors.semantic.success,
      warning: colors.semantic.warning,
      error: colors.semantic.error,
      info: colors.semantic.info,
    },
    
    // Spacing - Always 8pt grid, but configurable base
    spacing: spacing,
    
    // Typography - Always Mulish, but configurable scale
    typography: typography,
    
    // Fixed foundation values
    borderRadius: generateBorderRadiusScale(config.borderRadius.baseRadius),
    shadows: STANDARD_SHADOWS, // Always the same
    transitions: STANDARD_TRANSITIONS, // Always the same
  };
};

// Spacing generation (always 8pt grid)
const generateSpacingScale = (spacingConfig: SpacingConfig) => {
  const { baseUnit } = spacingConfig; // Always 4 for 8pt grid
  
  return {
    0: '0px',
    1: `${baseUnit * 1}px`,      // 4px
    2: `${baseUnit * 2}px`,      // 8px
    3: `${baseUnit * 3}px`,      // 12px
    4: `${baseUnit * 4}px`,      // 16px
    5: `${baseUnit * 5}px`,      // 20px
    6: `${baseUnit * 6}px`,      // 24px
    7: `${baseUnit * 7}px`,      // 28px
    8: `${baseUnit * 8}px`,      // 32px
    10: `${baseUnit * 10}px`,    // 40px
    12: `${baseUnit * 12}px`,    // 48px
    14: `${baseUnit * 14}px`,    // 56px
    16: `${baseUnit * 16}px`,    // 64px
    20: `${baseUnit * 20}px`,    // 80px
    24: `${baseUnit * 24}px`,    // 96px
    32: `${baseUnit * 32}px`,    // 128px
    // ... continue pattern
  };
};

// Typography generation (always Mulish)
const generateTypographyScale = (typographyConfig: TypographyConfig) => {
  const { baseSize, scaleRatio } = typographyConfig;
  
  return {
    xs: `${Math.round(baseSize * 0.75)}px`,    // 12px
    sm: `${Math.round(baseSize * 0.875)}px`,   // 14px
    base: `${baseSize}px`,                     // 16px
    lg: `${Math.round(baseSize * 1.125)}px`,   // 18px
    xl: `${Math.round(baseSize * 1.25)}px`,    // 20px
    '2xl': `${Math.round(baseSize * 1.5)}px`,  // 24px
    '3xl': `${Math.round(baseSize * 2)}px`,    // 32px
    '4xl': `${Math.round(baseSize * 2.5)}px`,  // 40px
    '5xl': `${Math.round(baseSize * 3)}px`,    // 48px
  };
};
```

---

## 🎯 SEMANTIC TOKEN LAYER (Universal)

### Same Semantic Structure, Different Colors

```typescript
// These semantic names stay the same across ALL projects
const generateSemanticTokens = (foundationTokens: FoundationTokens) => {
  return {
    // Background colors (always same structure)
    bg: {
      canvas: foundationTokens.colors.neutral[0],      // Main background
      surface: foundationTokens.colors.neutral[50],    // Cards/panels
      surfaceRaised: foundationTokens.colors.neutral[0], // Elevated surfaces
      subtle: foundationTokens.colors.neutral[100],    // Muted backgrounds
      
      // Interactive backgrounds
      primary: foundationTokens.colors.primary[500],   // Your brand color
      primaryHover: foundationTokens.colors.primary[600],
      primaryActive: foundationTokens.colors.primary[700],
      
      secondary: foundationTokens.colors.neutral[100],
      secondaryHover: foundationTokens.colors.neutral[200],
    },
    
    // Text colors (always same structure)
    text: {
      primary: foundationTokens.colors.neutral[900],    // Main text
      secondary: foundationTokens.colors.neutral[600],  // Secondary text
      tertiary: foundationTokens.colors.neutral[500],   // Muted text
      disabled: foundationTokens.colors.neutral[400],   // Disabled text
      inverse: foundationTokens.colors.neutral[0],      // Light on dark
      
      // Interactive text
      primaryAction: foundationTokens.colors.primary[500],
      primaryActionHover: foundationTokens.colors.primary[600],
    },
    
    // Border colors (always same structure)
    border: {
      default: foundationTokens.colors.neutral[200],
      subtle: foundationTokens.colors.neutral[100], 
      strong: foundationTokens.colors.neutral[300],
      interactive: foundationTokens.colors.primary[500],
      focus: foundationTokens.colors.primary[500],
    },
    
    // Status colors (always same structure)
    status: {
      success: foundationTokens.colors.success,
      warning: foundationTokens.colors.warning,
      error: foundationTokens.colors.error,
      info: foundationTokens.colors.info,
    },
    
    // Spacing (always same structure, different values)
    spacing: {
      componentXs: foundationTokens.spacing[1],    // 4px
      componentSm: foundationTokens.spacing[2],    // 8px
      componentMd: foundationTokens.spacing[4],    // 16px
      componentLg: foundationTokens.spacing[6],    // 24px
      componentXl: foundationTokens.spacing[8],    // 32px
      
      layoutXs: foundationTokens.spacing[4],       // 16px
      layoutSm: foundationTokens.spacing[6],       // 24px
      layoutMd: foundationTokens.spacing[8],       // 32px
      layoutLg: foundationTokens.spacing[12],      // 48px
      layoutXl: foundationTokens.spacing[16],      // 64px
      layout2xl: foundationTokens.spacing[24],     // 96px
    }
  };
};
```

---

## 🧩 COMPONENT TOKEN LAYER (Universal)

### Same Component Structure, Uses Your Colors

```typescript
// These component tokens work with ANY primary color
const generateComponentTokens = (semanticTokens: SemanticTokens) => {
  return {
    // Button tokens (structure always the same)
    button: {
      // Primary button uses your brand color
      primaryBg: semanticTokens.bg.primary,
      primaryBgHover: semanticTokens.bg.primaryHover,
      primaryBgActive: semanticTokens.bg.primaryActive,
      primaryText: semanticTokens.text.inverse,
      
      // Secondary button uses neutral
      secondaryBg: semanticTokens.bg.secondary,
      secondaryBgHover: semanticTokens.bg.secondaryHover,
      secondaryText: semanticTokens.text.primary,
      secondaryBorder: semanticTokens.border.default,
      
      // Sizing (always the same 8pt grid)
      heightSm: '32px',    // 8 * 4
      heightMd: '40px',    // 10 * 4  
      heightLg: '48px',    // 12 * 4
      heightXl: '56px',    // 14 * 4
      
      paddingSm: `0 ${semanticTokens.spacing.componentMd}`,  // 0 16px
      paddingMd: `0 ${semanticTokens.spacing.componentLg}`,  // 0 24px
      paddingLg: `0 ${semanticTokens.spacing.componentXl}`,  // 0 32px
      
      // Typography (always Mulish)
      fontFamily: 'Mulish, system-ui, sans-serif',
      fontWeightPrimary: '600',    // semibold
      fontWeightSecondary: '500',  // medium
    },
    
    // Form tokens
    form: {
      inputBg: semanticTokens.bg.surface,
      inputBorder: semanticTokens.border.default,
      inputBorderFocus: semanticTokens.border.focus,
      inputText: semanticTokens.text.primary,
      inputPlaceholder: semanticTokens.text.tertiary,
      
      labelText: semanticTokens.text.secondary,
      helperText: semanticTokens.text.tertiary,
      errorText: semanticTokens.status.error,
      
      // Sizing (always 8pt grid)
      inputHeight: '40px',
      inputPaddingX: semanticTokens.spacing.componentSm,  // 8px
      fieldGap: semanticTokens.spacing.componentSm,       // 8px
      groupGap: semanticTokens.spacing.componentMd,       // 16px
    },
    
    // Card tokens
    card: {
      bg: semanticTokens.bg.surface,
      border: semanticTokens.border.subtle,
      
      titleText: semanticTokens.text.primary,
      bodyText: semanticTokens.text.secondary,
      
      // Spacing (always 8pt grid)
      padding: semanticTokens.spacing.componentLg,        // 24px
      headerGap: semanticTokens.spacing.componentSm,      // 8px
      contentGap: semanticTokens.spacing.componentMd,     // 16px
      
      // Typography (always Mulish)
      titleSize: '20px',       // text-xl
      titleWeight: '600',      // font-semibold
      bodySize: '14px',        // text-sm
      bodyWeight: '400',       // font-normal
    }
  };
};
```

---

## 🚀 UNIVERSAL PROJECT SETUP

### 1. Project Configuration Template

```bash
# Copy design system to new project
cp -r /path/to/design-playbook/.claude /new-project/

# Customize for project
cat > /new-project/design-config.json << 'EOF'
{
  "project": {
    "name": "E-commerce App",
    "version": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,        // Blue brand
      "saturation": 0.8,
      "lightness": 0.5
    },
    
    "neutralTemperature": "cool",
    "brandPersonality": "professional"
  }
}
EOF
```

### 2. Auto-Generate Tokens Command

```bash
# New command: generate-tokens.sh
#!/bin/bash
.claude/commands/generate-tokens.sh

# Reads design-config.json
# Outputs CSS custom properties
# Updates Tailwind config
# Generates TypeScript tokens
```

### 3. Universal Validation (Works for Any Color)

```bash
# These scripts work regardless of primary color
.claude/scripts/design-check.sh src/
.claude/scripts/typography-check.sh src/    # Always checks Mulish
.claude/scripts/spacing-check.sh src/       # Always checks 8pt grid
.claude/scripts/color-check.sh src/         # Checks semantic usage
```

---

## 🎨 EXAMPLE: THREE DIFFERENT PROJECTS

### Project A: Blue E-commerce
```json
{
  "branding": {
    "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 }
  }
}
```
**Result**: Blue buttons, blue focus rings, blue links - everything else identical.

### Project B: Green Health App
```json
{
  "branding": {
    "primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.4 }
  }
}
```
**Result**: Green buttons, green focus rings, green links - everything else identical.

### Project C: Purple Creative App
```json
{
  "branding": {
    "primaryColor": { "hue": 280, "saturation": 0.9, "lightness": 0.6 }
  }
}
```
**Result**: Purple buttons, purple focus rings, purple links - everything else identical.

---

## ✅ WHAT THIS GIVES YOU

### ✅ **One Configuration File**
- Change primary color in one place
- Everything else cascades automatically

### ✅ **Consistent Structure** 
- Same semantic tokens across all projects
- Same component architecture
- Same 8-point grid system
- Same Mulish typography

### ✅ **Universal Scripts**
- Same validation scripts work everywhere
- Same templates work everywhere
- Same workflows work everywhere

### ✅ **Brand Flexibility**
- Each project gets unique brand color
- Maintains design system consistency
- Professional color palettes auto-generated

### ✅ **Copy-Paste Reusability**
- Copy `.claude/` folder to new project
- Update `design-config.json` 
- Run token generation
- Ready to build

This creates a **reusable design system architecture** where you define your primary color once and get a complete, consistent design system that works across all your projects.