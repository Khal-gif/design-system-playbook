#!/bin/bash

# Design Token Generator
# Generates CSS and TypeScript tokens from design-config.json

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🎨 Design Token Generator${NC}"
echo -e "${BLUE}========================${NC}"
echo ""

# Check if design-config.json exists
if [ ! -f "design-config.json" ]; then
    echo -e "${RED}❌ design-config.json not found${NC}"
    echo "Run this from your project root directory with design-config.json"
    exit 1
fi

# Read primary color from config
PRIMARY_COLOR=$(node -e "console.log(JSON.parse(require('fs').readFileSync('design-config.json')).branding.primaryColor)" 2>/dev/null || echo "#3B82F6")

echo -e "${CYAN}📋 Generating tokens for primary color: ${YELLOW}$PRIMARY_COLOR${NC}"

# Create src directory if it doesn't exist
mkdir -p src

# Generate CSS tokens
echo -e "${CYAN}📋 Generating CSS tokens...${NC}"
cat > src/tokens.css << EOF
/* Design System Tokens */
/* Generated from design-config.json */

:root {
  /* Primary color scale */
  --primary-50: oklch(0.97 0.02 240);
  --primary-100: oklch(0.94 0.05 240);
  --primary-200: oklch(0.86 0.09 240);
  --primary-300: oklch(0.76 0.14 240);
  --primary-400: oklch(0.65 0.18 240);
  --primary-500: ${PRIMARY_COLOR};
  --primary-600: oklch(0.55 0.22 240);
  --primary-700: oklch(0.48 0.20 240);
  --primary-800: oklch(0.42 0.17 240);
  --primary-900: oklch(0.35 0.15 240);
  --primary-950: oklch(0.23 0.12 240);

  /* Semantic color tokens */
  --background: oklch(1 0 0);
  --foreground: oklch(0.09 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.09 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.09 0 0);
  --primary: var(--primary-500);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.96 0 0);
  --secondary-foreground: oklch(0.15 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.96 0 0);
  --accent-foreground: oklch(0.15 0 0);
  --destructive: oklch(0.62 0.25 29);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.90 0 0);
  --input: oklch(0.90 0 0);
  --ring: var(--primary-500);

  /* Typography scale (8-point grid) */
  --font-size-xs: 12px;    /* 0.75rem */
  --font-size-sm: 14px;    /* 0.875rem */
  --font-size-base: 16px;  /* 1rem */
  --font-size-lg: 18px;    /* 1.125rem */
  --font-size-xl: 20px;    /* 1.25rem */
  --font-size-2xl: 24px;   /* 1.5rem */
  --font-size-3xl: 32px;   /* 2rem */
  --font-size-4xl: 40px;   /* 2.5rem */
  --font-size-5xl: 48px;   /* 3rem */

  /* Spacing scale (8-point grid) */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-7: 28px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-20: 80px;
  --spacing-24: 96px;
  --spacing-32: 128px;

  /* Component tokens */
  --button-height-sm: 32px;    /* h-8 */
  --button-height-md: 40px;    /* h-10 */
  --button-height-lg: 48px;    /* h-12 */
  --button-height-xl: 56px;    /* h-14 */
  
  --border-radius-sm: 4px;
  --border-radius-base: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --background: oklch(0.09 0 0);
    --foreground: oklch(0.98 0 0);
    --card: oklch(0.09 0 0);
    --card-foreground: oklch(0.98 0 0);
    --popover: oklch(0.09 0 0);
    --popover-foreground: oklch(0.98 0 0);
    --primary-foreground: oklch(0.09 0 0);
    --secondary: oklch(0.15 0 0);
    --secondary-foreground: oklch(0.98 0 0);
    --muted: oklch(0.15 0 0);
    --muted-foreground: oklch(0.64 0 0);
    --accent: oklch(0.15 0 0);
    --accent-foreground: oklch(0.98 0 0);
    --border: oklch(0.15 0 0);
    --input: oklch(0.15 0 0);
  }
}
EOF

# Generate TypeScript tokens
echo -e "${CYAN}📋 Generating TypeScript tokens...${NC}"
cat > src/design-tokens.ts << 'EOF'
/**
 * Design System Tokens
 * Generated from design-config.json
 */

export const tokens = {
  colors: {
    primary: {
      50: 'oklch(0.97 0.02 240)',
      100: 'oklch(0.94 0.05 240)',
      200: 'oklch(0.86 0.09 240)',
      300: 'oklch(0.76 0.14 240)',
      400: 'oklch(0.65 0.18 240)',
      500: 'var(--primary)',
      600: 'oklch(0.55 0.22 240)',
      700: 'oklch(0.48 0.20 240)',
      800: 'oklch(0.42 0.17 240)',
      900: 'oklch(0.35 0.15 240)',
      950: 'oklch(0.23 0.12 240)',
    },
    semantic: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      card: 'var(--card)',
      cardForeground: 'var(--card-foreground)',
      popover: 'var(--popover)',
      popoverForeground: 'var(--popover-foreground)',
      primary: 'var(--primary)',
      primaryForeground: 'var(--primary-foreground)',
      secondary: 'var(--secondary)',
      secondaryForeground: 'var(--secondary-foreground)',
      muted: 'var(--muted)',
      mutedForeground: 'var(--muted-foreground)',
      accent: 'var(--accent)',
      accentForeground: 'var(--accent-foreground)',
      destructive: 'var(--destructive)',
      destructiveForeground: 'var(--destructive-foreground)',
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',
    }
  },
  
  typography: {
    fontSizes: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
      '3xl': 'var(--font-size-3xl)',
      '4xl': 'var(--font-size-4xl)',
      '5xl': 'var(--font-size-5xl)',
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  spacing: {
    0: 'var(--spacing-0)',
    1: 'var(--spacing-1)',
    2: 'var(--spacing-2)',
    3: 'var(--spacing-3)',
    4: 'var(--spacing-4)',
    5: 'var(--spacing-5)',
    6: 'var(--spacing-6)',
    7: 'var(--spacing-7)',
    8: 'var(--spacing-8)',
    10: 'var(--spacing-10)',
    12: 'var(--spacing-12)',
    16: 'var(--spacing-16)',
    20: 'var(--spacing-20)',
    24: 'var(--spacing-24)',
    32: 'var(--spacing-32)',
  },
  
  components: {
    button: {
      heights: {
        sm: 'var(--button-height-sm)',
        md: 'var(--button-height-md)', 
        lg: 'var(--button-height-lg)',
        xl: 'var(--button-height-xl)',
      }
    }
  }
} as const;

export type Tokens = typeof tokens;
EOF

echo ""
echo -e "${GREEN}🎉 Token Generation Complete!${NC}"
echo ""
echo -e "${GREEN}✅ Generated files:${NC}"
echo -e "${CYAN}  • src/tokens.css - CSS custom properties${NC}"
echo -e "${CYAN}  • src/design-tokens.ts - TypeScript definitions${NC}"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo -e "${YELLOW}1.${NC} Import src/tokens.css in your main CSS file"
echo -e "${YELLOW}2.${NC} Use semantic tokens: bg-primary, text-foreground"
echo -e "${YELLOW}3.${NC} Follow 8-point grid: p-4, p-6, p-8"
echo -e "${YELLOW}4.${NC} Use Mulish font with approved weights"
BLUE='\033[0;34m'
NC='\033[0m'

CONFIG_FILE="design-config.json"
OUTPUT_DIR="src"

echo -e "${BLUE}🎨 Design Token Generator${NC}"
echo -e "${BLUE}=========================${NC}"
echo ""

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo -e "${RED}❌ design-config.json not found${NC}"
    echo ""
    echo "Creating default configuration..."
    cat > "$CONFIG_FILE" << 'EOF'
{
  "project": {
    "name": "My Project",
    "version": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,
      "saturation": 0.8,
      "lightness": 0.5
    },
    
    "secondaryColor": {
      "hue": 280,
      "saturation": 0.6,
      "lightness": 0.6
    },
    
    "neutralTemperature": "cool",
    "brandPersonality": "professional"
  },
  
  "typography": {
    "fontFamily": "Mulish",
    "scaleRatio": 1.25,
    "baseSize": 16
  },
  
  "spacing": {
    "baseUnit": 4,
    "scaleRatio": 1.5
  },
  
  "borderRadius": {
    "baseRadius": 6
  }
}
EOF
    echo -e "${GREEN}✅ Created default design-config.json${NC}"
    echo -e "${YELLOW}💡 Edit this file to customize your brand colors${NC}"
    echo ""
fi

# Read configuration
echo -e "${YELLOW}📖 Reading configuration...${NC}"
PROJECT_NAME=$(cat "$CONFIG_FILE" | grep -o '"name":[^,]*' | cut -d'"' -f4)
PRIMARY_HUE=$(cat "$CONFIG_FILE" | grep -o '"hue":[^,]*' | head -1 | cut -d':' -f2 | tr -d ' ,')
PRIMARY_SAT=$(cat "$CONFIG_FILE" | grep -o '"saturation":[^,]*' | head -1 | cut -d':' -f2 | tr -d ' ,')
PRIMARY_LIGHT=$(cat "$CONFIG_FILE" | grep -o '"lightness":[^,]*' | head -1 | cut -d':' -f2 | tr -d ' ,')
NEUTRAL_TEMP=$(cat "$CONFIG_FILE" | grep -o '"neutralTemperature":[^,]*' | cut -d'"' -f4)

echo -e "Project: ${YELLOW}$PROJECT_NAME${NC}"
echo -e "Primary Color: ${YELLOW}HSL($PRIMARY_HUE, ${PRIMARY_SAT}, ${PRIMARY_LIGHT})${NC}"
echo -e "Neutral Temperature: ${YELLOW}$NEUTRAL_TEMP${NC}"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Generate CSS custom properties
echo -e "${BLUE}🎨 Generating CSS custom properties...${NC}"

# Calculate neutral hue based on temperature
NEUTRAL_HUE=$PRIMARY_HUE
if [ "$NEUTRAL_TEMP" = "cool" ]; then
    NEUTRAL_HUE=$((PRIMARY_HUE + 20))
elif [ "$NEUTRAL_TEMP" = "warm" ]; then
    NEUTRAL_HUE=$((PRIMARY_HUE - 30))
else
    NEUTRAL_HUE=0
fi

# Calculate neutral saturation
if [ "$NEUTRAL_TEMP" = "neutral" ]; then
    NEUTRAL_SAT="0"
else
    NEUTRAL_SAT="0.02"
fi

cat > "$OUTPUT_DIR/tokens.css" << EOF
/* Auto-generated Design Tokens */
/* Generated from design-config.json */
/* Primary Color: HSL($PRIMARY_HUE, $PRIMARY_SAT, $PRIMARY_LIGHT) */

@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  /* Font System - Always Mulish */
  --font-sans: 'Mulish', system-ui, sans-serif;
  
  /* Foundation Color Tokens - Generated from Primary */
  
  /* Primary Palette */
  --color-primary-50: oklch(0.95 $(echo "$PRIMARY_SAT * 0.1" | bc -l) $PRIMARY_HUE);
  --color-primary-100: oklch(0.90 $(echo "$PRIMARY_SAT * 0.2" | bc -l) $PRIMARY_HUE);
  --color-primary-200: oklch(0.82 $(echo "$PRIMARY_SAT * 0.3" | bc -l) $PRIMARY_HUE);
  --color-primary-300: oklch(0.73 $(echo "$PRIMARY_SAT * 0.4" | bc -l) $PRIMARY_HUE);
  --color-primary-400: oklch(0.65 $(echo "$PRIMARY_SAT * 0.6" | bc -l) $PRIMARY_HUE);
  --color-primary-500: oklch($PRIMARY_LIGHT $PRIMARY_SAT $PRIMARY_HUE);
  --color-primary-600: oklch($(echo "$PRIMARY_LIGHT - 0.08" | bc -l) $(echo "$PRIMARY_SAT * 1.1" | bc -l) $PRIMARY_HUE);
  --color-primary-700: oklch($(echo "$PRIMARY_LIGHT - 0.15" | bc -l) $PRIMARY_SAT $PRIMARY_HUE);
  --color-primary-800: oklch($(echo "$PRIMARY_LIGHT - 0.22" | bc -l) $(echo "$PRIMARY_SAT * 0.8" | bc -l) $PRIMARY_HUE);
  --color-primary-900: oklch($(echo "$PRIMARY_LIGHT - 0.28" | bc -l) $(echo "$PRIMARY_SAT * 0.6" | bc -l) $PRIMARY_HUE);
  --color-primary-950: oklch($(echo "$PRIMARY_LIGHT - 0.35" | bc -l) $(echo "$PRIMARY_SAT * 0.4" | bc -l) $PRIMARY_HUE);
  
  /* Neutral Palette - Temperature: $NEUTRAL_TEMP */
  --color-neutral-0: oklch(0.99 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-50: oklch(0.98 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-100: oklch(0.96 $(echo "$NEUTRAL_SAT * 1.5" | bc -l) $NEUTRAL_HUE);
  --color-neutral-200: oklch(0.92 $(echo "$NEUTRAL_SAT * 1.5" | bc -l) $NEUTRAL_HUE);
  --color-neutral-300: oklch(0.86 $(echo "$NEUTRAL_SAT * 1.2" | bc -l) $NEUTRAL_HUE);
  --color-neutral-400: oklch(0.64 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-500: oklch(0.45 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-600: oklch(0.32 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-700: oklch(0.25 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-800: oklch(0.15 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-900: oklch(0.09 $NEUTRAL_SAT $NEUTRAL_HUE);
  --color-neutral-950: oklch(0.05 $NEUTRAL_SAT $NEUTRAL_HUE);
  
  /* Semantic Color Tokens - Universal Structure */
  
  /* Background Colors */
  --color-background: var(--color-neutral-0);
  --color-foreground: var(--color-neutral-950);
  
  --color-card: var(--color-neutral-0);
  --color-card-foreground: var(--color-neutral-950);
  
  --color-popover: var(--color-neutral-0);
  --color-popover-foreground: var(--color-neutral-950);
  
  --color-primary: var(--color-primary-500);
  --color-primary-foreground: var(--color-neutral-0);
  
  --color-secondary: var(--color-neutral-100);
  --color-secondary-foreground: var(--color-neutral-900);
  
  --color-muted: var(--color-neutral-100);
  --color-muted-foreground: var(--color-neutral-500);
  
  --color-accent: var(--color-neutral-100);
  --color-accent-foreground: var(--color-neutral-900);
  
  --color-destructive: oklch(0.55 0.18 25);
  --color-destructive-foreground: var(--color-neutral-0);
  
  /* Interactive States */
  --color-primary-hover: var(--color-primary-600);
  --color-primary-active: var(--color-primary-700);
  --color-secondary-hover: var(--color-neutral-200);
  
  /* Borders */
  --color-border: var(--color-neutral-200);
  --color-input: var(--color-neutral-200);
  --color-ring: var(--color-primary-500);
  
  /* Status Colors */
  --color-success: oklch(0.55 0.15 140);
  --color-warning: oklch(0.75 0.15 85);
  --color-error: oklch(0.55 0.18 25);
  --color-info: var(--color-primary-500);
  
  /* Spacing Tokens - 8-Point Grid (Always Same) */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  --space-11: 44px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-28: 112px;
  --space-32: 128px;
  --space-36: 144px;
  --space-40: 160px;
  --space-44: 176px;
  --space-48: 192px;
  --space-52: 208px;
  --space-56: 224px;
  --space-60: 240px;
  --space-64: 256px;
  
  /* Typography Tokens - Mulish 8-Point Scale (Always Same) */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
  --font-size-4xl: 40px;
  --font-size-5xl: 48px;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Component Tokens - Use Semantic Colors */
  
  /* Button Tokens */
  --button-primary-bg: var(--color-primary);
  --button-primary-bg-hover: var(--color-primary-hover);
  --button-primary-text: var(--color-primary-foreground);
  --button-secondary-bg: var(--color-secondary);
  --button-secondary-bg-hover: var(--color-secondary-hover);
  --button-secondary-text: var(--color-secondary-foreground);
  
  --button-height-sm: 32px;
  --button-height-md: 40px;
  --button-height-lg: 48px;
  --button-height-xl: 56px;
  
  --button-padding-sm: 0 var(--space-4);
  --button-padding-md: 0 var(--space-6);
  --button-padding-lg: 0 var(--space-8);
  
  /* Form Tokens */
  --input-bg: var(--color-card);
  --input-border: var(--color-border);
  --input-border-focus: var(--color-ring);
  --input-height: 40px;
  --input-padding-x: var(--space-3);
  
  --label-color: var(--color-muted-foreground);
  --helper-color: var(--color-muted-foreground);
  --error-color: var(--color-destructive);
  
  /* Card Tokens */
  --card-bg: var(--color-card);
  --card-border: var(--color-border);
  --card-padding: var(--space-6);
  --card-header-gap: var(--space-2);
  --card-content-gap: var(--space-4);
  
  /* Border Radius */
  --radius: 6px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: var(--color-neutral-950);
    --color-foreground: var(--color-neutral-50);
    
    --color-card: var(--color-neutral-900);
    --color-card-foreground: var(--color-neutral-50);
    
    --color-popover: var(--color-neutral-900);
    --color-popover-foreground: var(--color-neutral-50);
    
    --color-secondary: var(--color-neutral-800);
    --color-secondary-foreground: var(--color-neutral-50);
    
    --color-muted: var(--color-neutral-800);
    --color-muted-foreground: var(--color-neutral-400);
    
    --color-accent: var(--color-neutral-800);
    --color-accent-foreground: var(--color-neutral-50);
    
    --color-border: var(--color-neutral-800);
    --color-input: var(--color-neutral-800);
    
    --button-secondary-bg-hover: var(--color-neutral-700);
  }
}

/* Base Styles */
* {
  border-color: hsl(var(--border));
}

body {
  font-family: var(--font-sans);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
EOF

echo -e "${GREEN}✅ Generated tokens.css${NC}"

# Generate TypeScript token definitions
echo -e "${BLUE}🔧 Generating TypeScript tokens...${NC}"

cat > "$OUTPUT_DIR/design-tokens.ts" << 'EOF'
/**
 * Design Tokens
 * Auto-generated from design-config.json
 * 
 * These tokens provide type-safe access to your design system values
 */

// Foundation Tokens
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px', 
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
} as const;

export const typography = {
  fontFamily: {
    primary: 'Mulish, system-ui, sans-serif',
  },
  fontSize: {
    xs: '12px',
    sm: '14px', 
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600', 
    bold: '700',
  },
} as const;

// Semantic Tokens
export const colors = {
  background: 'var(--color-background)',
  foreground: 'var(--color-foreground)',
  
  primary: 'var(--color-primary)',
  primaryForeground: 'var(--color-primary-foreground)',
  
  secondary: 'var(--color-secondary)',
  secondaryForeground: 'var(--color-secondary-foreground)',
  
  muted: 'var(--color-muted)',
  mutedForeground: 'var(--color-muted-foreground)',
  
  border: 'var(--color-border)',
  ring: 'var(--color-ring)',
  
  destructive: 'var(--color-destructive)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
} as const;

// Component Tokens
export const button = {
  height: {
    sm: '32px',
    md: '40px', 
    lg: '48px',
    xl: '56px',
  },
  padding: {
    sm: `0 ${spacing[4]}`,
    md: `0 ${spacing[6]}`,
    lg: `0 ${spacing[8]}`,
  },
  fontWeight: {
    primary: typography.fontWeight.semibold,
    secondary: typography.fontWeight.medium,
  },
} as const;

export const form = {
  input: {
    height: '40px',
    paddingX: spacing[3],
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  helper: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
  },
} as const;

export const card = {
  padding: spacing[6],
  headerGap: spacing[2], 
  contentGap: spacing[4],
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
  },
} as const;

// Validation helpers
export const designSystem = {
  spacing: Object.values(spacing).map(v => parseInt(v)),
  fontSizes: Object.values(typography.fontSize).map(v => parseInt(v)),
  fontWeights: Object.values(typography.fontWeight).map(v => parseInt(v)),
  
  isValidSpacing: (value: number): boolean => {
    return value % 4 === 0;
  },
  
  isValidFontSize: (size: number): boolean => {
    return designSystem.fontSizes.includes(size);
  },
  
  isValidFontWeight: (weight: number): boolean => {
    return designSystem.fontWeights.includes(weight);
  },
} as const;
EOF

echo -e "${GREEN}✅ Generated design-tokens.ts${NC}"

# Update Tailwind config
echo -e "${BLUE}⚙️ Updating Tailwind config...${NC}"

cat > "tailwind.config.js" << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Mulish', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'], 
        'base': ['16px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['32px', '40px'],
        '4xl': ['40px', '48px'],
        '5xl': ['48px', '56px'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600', 
        bold: '700',
      },
      colors: {
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover))",
          foreground: "hsl(var(--color-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
EOF

echo -e "${GREEN}✅ Updated tailwind.config.js${NC}"

# Generate component usage examples
echo -e "${BLUE}📖 Generating usage examples...${NC}"

cat > "$OUTPUT_DIR/token-usage-examples.tsx" << 'EOF'
/**
 * Token Usage Examples
 * Shows how to use generated design tokens in components
 */

import { button, form, card, colors, spacing, typography } from './design-tokens';

// Button component using tokens
export const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  return (
    <button
      className={cn(
        // Base styles using tokens
        "font-sans rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        
        // Size variants using component tokens
        size === 'sm' && `h-8 px-4 text-sm font-medium`,
        size === 'md' && `h-10 px-6 text-base font-semibold`, 
        size === 'lg' && `h-12 px-8 text-base font-semibold`,
        
        // Color variants using semantic tokens
        variant === 'primary' && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === 'outline' && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Form component using tokens
export const FormField = ({ label, children, helper, error }) => {
  return (
    <div className="space-y-2"> {/* Using spacing token: 8px */}
      <label className="text-sm font-medium"> {/* Using typography tokens */}
        {label}
      </label>
      {children}
      {helper && (
        <p className="text-xs text-muted-foreground"> {/* Using semantic color */}
          {helper}
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive"> {/* Using semantic color */}
          {error}
        </p>
      )}
    </div>
  );
};

// Input component using tokens
export const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        // Using component tokens
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2", // h-10 = 40px from tokens
        "text-base font-normal", // Typography tokens
        "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-muted-foreground", // Semantic color
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

// Card component using tokens
export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm", // Using semantic colors
        "p-6", // Using spacing token: 24px
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn("flex flex-col space-y-2", className)} // Using spacing token: 8px
      {...props}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={cn(
        "font-sans text-xl font-semibold leading-none tracking-tight", // Using typography tokens
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground", // Using typography and semantic color tokens
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};

// Usage in a page component
export const ExamplePage = () => {
  return (
    <div className="font-sans p-8 space-y-8"> {/* Using tokens: Mulish font, 32px padding, 32px gap */}
      
      {/* Hero Section */}
      <section className="space-y-4"> {/* 16px gap */}
        <h1 className="text-4xl font-bold text-foreground"> {/* Typography + semantic color */}
          Welcome to Your App
        </h1>
        <p className="text-lg text-muted-foreground"> {/* Typography + semantic color */}
          Built with configurable design tokens
        </p>
        <div className="flex gap-4"> {/* 16px gap */}
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Card Example */}
      <Card>
        <CardHeader>
          <CardTitle>Your Brand Color</CardTitle>
          <CardDescription>
            This entire design system cascades from your primary color configuration
          </CardDescription>
        </CardHeader>
        <div className="p-6 pt-0"> {/* Card content padding */}
          <div className="h-20 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">
              Primary Color
            </span>
          </div>
        </div>
      </Card>

      {/* Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Form Example</CardTitle>
          <CardDescription>
            All form components use consistent tokens
          </CardDescription>
        </CardHeader>
        <div className="p-6 pt-0 space-y-4"> {/* 16px gap */}
          <FormField 
            label="Email Address"
            helper="We'll never share your email"
          >
            <Input 
              type="email" 
              placeholder="Enter your email"
            />
          </FormField>
          
          <FormField label="Message">
            <textarea 
              className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your message"
            />
          </FormField>
          
          <Button variant="primary" size="md" className="w-full">
            Submit Form
          </Button>
        </div>
      </Card>
    </div>
  );
};
EOF

echo -e "${GREEN}✅ Generated token-usage-examples.tsx${NC}"

echo ""
echo -e "${GREEN}🎉 Token generation complete!${NC}"
echo ""
echo -e "${BLUE}📋 Generated Files:${NC}"
echo -e "  📄 ${YELLOW}tokens.css${NC} - CSS custom properties with your brand colors"
echo -e "  📄 ${YELLOW}design-tokens.ts${NC} - TypeScript token definitions"  
echo -e "  📄 ${YELLOW}tailwind.config.js${NC} - Updated Tailwind configuration"
echo -e "  📄 ${YELLOW}token-usage-examples.tsx${NC} - Component usage examples"
echo ""
echo -e "${BLUE}🎨 Your Brand Configuration:${NC}"
echo -e "  Primary Color: ${YELLOW}HSL($PRIMARY_HUE, ${PRIMARY_SAT}, ${PRIMARY_LIGHT})${NC}"
echo -e "  Neutral Temperature: ${YELLOW}$NEUTRAL_TEMP${NC}"
echo ""
echo -e "${BLUE}📖 Next Steps:${NC}"
echo -e "1. ${YELLOW}Import tokens:${NC} Add 'import \"./src/tokens.css\"' to your app"
echo -e "2. ${YELLOW}Use components:${NC} Copy examples from token-usage-examples.tsx"
echo -e "3. ${YELLOW}Validate design:${NC} Run '.claude/scripts/design-check.sh src/'"
echo -e "4. ${YELLOW}Customize colors:${NC} Edit design-config.json and re-run this script"
echo ""
echo -e "${GREEN}🚀 Your design system is ready to use!${NC}"
EOF