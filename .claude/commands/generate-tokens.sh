#!/bin/bash

# Tailwind v4 Compatible Design Token Generator
# Generates CSS and TypeScript tokens with proper v4 format

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}🎨 Tailwind v4 Design Token Generator${NC}"
echo -e "${BLUE}===================================${NC}"
echo ""

# Check if design-config.json exists
if [ ! -f "design-config.json" ]; then
    echo -e "${RED}❌ design-config.json not found${NC}"
    echo "Run this from your project root directory with design-config.json"
    exit 1
fi

# Read brand colors from config
BRAND_COLORS=$(node -e "
const config = JSON.parse(require('fs').readFileSync('design-config.json'));
const colors = config.branding.brandColors || { primary: { hex: '#3B82F6' } };
console.log(JSON.stringify(colors));
" 2>/dev/null || echo '{"primary":{"hex":"#3B82F6"}}')

echo -e "${CYAN}📋 Generating Tailwind v4 tokens for brand colors...${NC}"

# Create src directory if it doesn't exist
mkdir -p src

# Generate Tailwind v4 CSS file
echo -e "${CYAN}📋 Generating Tailwind v4 CSS...${NC}"
cat > src/globals.css << EOF
@import "tailwindcss";

/* Design System Tokens for Tailwind v4 */
@theme {
  /* Typography - 8-point grid */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 2rem;        /* 32px */
  --font-size-4xl: 2.5rem;      /* 40px */
  --font-size-5xl: 3rem;        /* 48px */

  /* Font weights - only approved */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing - 8-point grid */
  --spacing-0: 0px;
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-7: 1.75rem;    /* 28px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */

$(node -e "
const colors = $BRAND_COLORS;
Object.keys(colors).forEach(colorName => {
  const color = colors[colorName];
  const hex = color.hex;
  console.log(\`
  /* \${color.name || colorName} brand color scale */
  --color-\${colorName}-50: oklch(0.97 0.02 240);
  --color-\${colorName}-100: oklch(0.94 0.05 240);
  --color-\${colorName}-200: oklch(0.86 0.09 240);
  --color-\${colorName}-300: oklch(0.76 0.14 240);
  --color-\${colorName}-400: oklch(0.65 0.18 240);
  --color-\${colorName}-500: \${hex};
  --color-\${colorName}-600: oklch(0.55 0.22 240);
  --color-\${colorName}-700: oklch(0.48 0.20 240);
  --color-\${colorName}-800: oklch(0.42 0.17 240);
  --color-\${colorName}-900: oklch(0.35 0.15 240);
  --color-\${colorName}-950: oklch(0.23 0.12 240);\`);
});
" 2>/dev/null)

  /* Semantic color tokens */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.09 0 0);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.09 0 0);
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.09 0 0);
$(node -e "
const colors = $BRAND_COLORS;
Object.keys(colors).forEach(colorName => {
  console.log(\`  --color-\${colorName}: var(--color-\${colorName}-500);\`);
  console.log(\`  --color-\${colorName}-foreground: oklch(0.98 0 0);\`);
});
" 2>/dev/null)
  --color-secondary: oklch(0.96 0 0);
  --color-secondary-foreground: oklch(0.15 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  --color-accent: oklch(0.96 0 0);
  --color-accent-foreground: oklch(0.15 0 0);
  --color-destructive: oklch(0.62 0.25 29);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-border: oklch(0.90 0 0);
  --color-input: oklch(0.90 0 0);
  --color-ring: var(--color-primary-500);

  /* Creative combinations - for multi-brand usage */
$(node -e "
const colors = $BRAND_COLORS;
const colorKeys = Object.keys(colors);
if (colorKeys.length > 1) {
  console.log('  /* Brand color combinations */');
  colorKeys.forEach((colorName, index) => {
    const role = colors[colorName].role || colorName;
    console.log(\`  --color-\${role.replace(/-/g, '')}: var(--color-\${colorName});\`);
  });
}
" 2>/dev/null)

  /* Component-specific tokens */
  --size-button-sm: 2rem;      /* 32px - h-8 */
  --size-button-md: 2.5rem;    /* 40px - h-10 */
  --size-button-lg: 3rem;      /* 48px - h-12 */
  --size-button-xl: 3.5rem;    /* 56px - h-14 */

  --radius-sm: 0.25rem;        /* 4px */
  --radius-base: 0.5rem;       /* 8px */
  --radius-lg: 0.75rem;        /* 12px */
  --radius-xl: 1rem;           /* 16px */
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.09 0 0);
    --color-foreground: oklch(0.98 0 0);
    --color-card: oklch(0.09 0 0);
    --color-card-foreground: oklch(0.98 0 0);
    --color-popover: oklch(0.09 0 0);
    --color-popover-foreground: oklch(0.98 0 0);
    --color-primary-foreground: oklch(0.09 0 0);
    --color-secondary: oklch(0.15 0 0);
    --color-secondary-foreground: oklch(0.98 0 0);
    --color-muted: oklch(0.15 0 0);
    --color-muted-foreground: oklch(0.64 0 0);
    --color-accent: oklch(0.15 0 0);
    --color-accent-foreground: oklch(0.98 0 0);
    --color-border: oklch(0.15 0 0);
    --color-input: oklch(0.15 0 0);
  }
}

/* Font family setup */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground font-sans;
    font-family: 'Mulish', system-ui, sans-serif;
  }
}
EOF

# Generate TypeScript tokens for v4
echo -e "${CYAN}📋 Generating TypeScript tokens...${NC}"
cat > src/design-tokens.ts << 'EOF'
/**
 * Tailwind v4 Design System Tokens
 * Generated from design-config.json
 */

export const designTokens = {
  colors: {
    // Primary brand colors
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
      DEFAULT: 'var(--color-primary)',
    },
    
    // Semantic colors
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    card: {
      DEFAULT: 'var(--color-card)',
      foreground: 'var(--color-card-foreground)',
    },
    popover: {
      DEFAULT: 'var(--color-popover)',
      foreground: 'var(--color-popover-foreground)',
    },
    primary: {
      DEFAULT: 'var(--color-primary)',
      foreground: 'var(--color-primary-foreground)',
    },
    secondary: {
      DEFAULT: 'var(--color-secondary)',
      foreground: 'var(--color-secondary-foreground)',
    },
    muted: {
      DEFAULT: 'var(--color-muted)',
      foreground: 'var(--color-muted-foreground)',
    },
    accent: {
      DEFAULT: 'var(--color-accent)',
      foreground: 'var(--color-accent-foreground)',
    },
    destructive: {
      DEFAULT: 'var(--color-destructive)',
      foreground: 'var(--color-destructive-foreground)',
    },
    border: 'var(--color-border)',
    input: 'var(--color-input)',
    ring: 'var(--color-ring)',
  },
  
  fontSize: {
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
  
  fontWeight: {
    normal: 'var(--font-weight-normal)',    // 400
    medium: 'var(--font-weight-medium)',    // 500
    semibold: 'var(--font-weight-semibold)', // 600
    bold: 'var(--font-weight-bold)',        // 700
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
  
  borderRadius: {
    sm: 'var(--radius-sm)',
    base: 'var(--radius-base)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },
  
  components: {
    button: {
      height: {
        sm: 'var(--size-button-sm)',
        md: 'var(--size-button-md)',
        lg: 'var(--size-button-lg)',
        xl: 'var(--size-button-xl)',
      }
    }
  }
} as const

export type DesignTokens = typeof designTokens
EOF

# No tailwind.config.js needed for v4!
echo -e "${CYAN}📋 Tailwind v4 uses @theme instead of config files${NC}"

echo ""
echo -e "${GREEN}🎉 Tailwind v4 Token Generation Complete!${NC}"
echo ""
echo -e "${GREEN}✅ Generated files:${NC}"
echo -e "${CYAN}  • src/globals.css - Tailwind v4 with @theme tokens${NC}"
echo -e "${CYAN}  • src/design-tokens.ts - TypeScript definitions${NC}"
echo ""
echo -e "${CYAN}Usage in Tailwind v4:${NC}"
echo -e "${YELLOW}1.${NC} Import src/globals.css in your app"
echo -e "${YELLOW}2.${NC} Use semantic classes: bg-primary, text-foreground"
echo -e "${YELLOW}3.${NC} Install: npm install tailwindcss@next"
echo -e "${YELLOW}4.${NC} All tokens work automatically with @theme"
echo ""
echo -e "${BLUE}🎨 Your design system is now Tailwind v4 compatible!${NC}"