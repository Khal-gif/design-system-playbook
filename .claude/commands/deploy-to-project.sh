#!/bin/bash

# Universal Design System Deployment
# Copies the complete Design Law Book system to any project

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get target directory
TARGET_DIR=${1}

if [ -z "$TARGET_DIR" ]; then
    echo -e "${RED}❌ Target directory required${NC}"
    echo ""
    echo "Usage: ./deploy-to-project.sh /path/to/your/project"
    echo ""
    echo "Examples:"
    echo "  ./deploy-to-project.sh ~/projects/my-ecommerce-app"
    echo "  ./deploy-to-project.sh /Users/user/Desktop/my-landing-page"
    echo "  ./deploy-to-project.sh ../new-project"
    exit 1
fi

# Create target directory if it doesn't exist
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${YELLOW}📁 Creating target directory: $TARGET_DIR${NC}"
    mkdir -p "$TARGET_DIR"
fi

# Resolve absolute path
TARGET_DIR=$(cd "$TARGET_DIR" && pwd)

echo -e "${BLUE}🚀 Design System Universal Deployment${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""
echo -e "${CYAN}📁 Target Project: ${YELLOW}$TARGET_DIR${NC}"
echo ""

# Get current script directory (where the Design Playbook is)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DESIGN_PLAYBOOK_DIR="$( cd "$SCRIPT_DIR/../.." && pwd )"

echo -e "${CYAN}📦 Source: ${YELLOW}$DESIGN_PLAYBOOK_DIR${NC}"
echo ""

# Step 1: Copy .claude directory
echo -e "${CYAN}📋 Step 1: Copying .claude system...${NC}"
if [ -d "$DESIGN_PLAYBOOK_DIR/.claude" ]; then
    cp -r "$DESIGN_PLAYBOOK_DIR/.claude" "$TARGET_DIR/"
    echo -e "${GREEN}✅ .claude directory copied${NC}"
else
    echo -e "${RED}❌ Source .claude directory not found${NC}"
    exit 1
fi

# Step 2: Copy core system files
echo -e "${CYAN}📋 Step 2: Copying core system files...${NC}"

# Core files to deploy
declare -a CORE_FILES=(
    "CLAUDE.md"
    "PLAYBOOK.md" 
    "system-config.json"
    "QUICK-REFERENCE.md"
)

for file in "${CORE_FILES[@]}"; do
    if [ -f "$DESIGN_PLAYBOOK_DIR/$file" ]; then
        cp "$DESIGN_PLAYBOOK_DIR/$file" "$TARGET_DIR/"
        echo -e "${GREEN}✅ $file copied${NC}"
    else
        echo -e "${YELLOW}⚠️ $file not found (optional)${NC}"
    fi
done

# Step 3: Create design-config.json
echo -e "${CYAN}📋 Step 3: Creating design-config.json...${NC}"
cat > "$TARGET_DIR/design-config.json" << 'EOF'
{
  "version": "2.0.0",
  "designSystem": {
    "name": "Design System Law Book",
    "version": "2.0.0"
  },
  "branding": {
    "brandColors": {
      "primary": {
        "name": "Primary",
        "hex": "#3B82F6",
        "role": "primary-actions",
        "usage": "buttons, links, focus states, primary CTAs"
      },
      "secondary": {
        "name": "Secondary", 
        "hex": "#10B981",
        "role": "secondary-actions",
        "usage": "success states, secondary CTAs, confirmations"
      },
      "accent": {
        "name": "Accent",
        "hex": "#F59E0B", 
        "role": "highlights",
        "usage": "badges, notifications, highlights, warnings"
      },
      "neutral": {
        "name": "Neutral",
        "hex": "#6B7280",
        "role": "supporting",
        "usage": "text, borders, backgrounds, subtle elements"
      }
    },
    "colorPalette": {
      "temperature": "balanced",
      "contrast": "wcag-aa",
      "personality": "professional-creative"
    }
  },
  "typography": {
    "fontFamily": "Mulish",
    "baseSize": 16,
    "scaleRatio": "8-point-grid",
    "weights": [400, 500, 600, 700],
    "hierarchy": {
      "display": "48px",
      "h1": "40px", 
      "h2": "32px",
      "h3": "24px",
      "h4": "20px",
      "h5": "18px",
      "body": "16px",
      "small": "14px",
      "caption": "12px"
    }
  },
  "spacing": {
    "system": "8-point-grid",
    "baseUnit": 4,
    "scale": [4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128, 160, 192, 224, 256]
  },
  "layout": {
    "maxWidth": "1440px",
    "containerPadding": {
      "mobile": "16px",
      "tablet": "24px", 
      "desktop": "32px"
    },
    "gridColumns": 12,
    "gridGap": "24px"
  },
  "components": {
    "borderRadius": {
      "sm": "4px",
      "base": "8px", 
      "lg": "12px",
      "xl": "16px"
    },
    "shadows": {
      "sm": "0 1px 2px rgba(0,0,0,0.05)",
      "base": "0 4px 6px rgba(0,0,0,0.07)",
      "lg": "0 10px 15px rgba(0,0,0,0.1)",
      "xl": "0 25px 50px rgba(0,0,0,0.25)"
    }
  },
  "project": {
    "name": "New Project",
    "type": "web-application",
    "framework": "universal"
  },
  "creative": {
    "designPrinciples": [
      "hierarchy-first",
      "semantic-color-usage", 
      "consistent-spacing",
      "accessible-contrast",
      "scalable-typography"
    ],
    "colorCombinations": {
      "recommended": [
        ["primary", "neutral"],
        ["primary", "secondary", "neutral"],
        ["primary", "accent", "neutral"],
        ["primary", "secondary", "accent", "neutral"]
      ]
    },
    "visualGuidance": {
      "emphasis": "Use primary for main actions, secondary for supporting actions",
      "hierarchy": "Larger elements use darker shades, smaller use lighter",
      "interaction": "Hover states use 10% opacity overlay",
      "accessibility": "Maintain 4.5:1 contrast for text, 3:1 for UI elements"
    }
  }
}
EOF
echo -e "${GREEN}✅ design-config.json created${NC}"

# Step 4: Make all scripts executable
echo -e "${CYAN}📋 Step 4: Making scripts executable...${NC}"
find "$TARGET_DIR/.claude" -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true
echo -e "${GREEN}✅ All scripts are now executable${NC}"

# Step 5: Create src directory and basic tokens
echo -e "${CYAN}📋 Step 5: Creating Tailwind v4 design tokens...${NC}"
mkdir -p "$TARGET_DIR/src"

cat > "$TARGET_DIR/src/globals.css" << 'EOF'
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

  /* Multi-Brand Color System */
  /* Primary brand color scale */
  --color-primary-50: oklch(0.97 0.02 240);
  --color-primary-100: oklch(0.94 0.05 240);
  --color-primary-200: oklch(0.86 0.09 240);
  --color-primary-300: oklch(0.76 0.14 240);
  --color-primary-400: oklch(0.65 0.18 240);
  --color-primary-500: #3B82F6;
  --color-primary-600: oklch(0.55 0.22 240);
  --color-primary-700: oklch(0.48 0.20 240);
  --color-primary-800: oklch(0.42 0.17 240);
  --color-primary-900: oklch(0.35 0.15 240);
  --color-primary-950: oklch(0.23 0.12 240);

  /* Secondary brand color scale */
  --color-secondary-50: oklch(0.96 0.02 160);
  --color-secondary-100: oklch(0.92 0.05 160);
  --color-secondary-200: oklch(0.84 0.09 160);
  --color-secondary-300: oklch(0.74 0.14 160);
  --color-secondary-400: oklch(0.63 0.18 160);
  --color-secondary-500: #10B981;
  --color-secondary-600: oklch(0.53 0.22 160);
  --color-secondary-700: oklch(0.46 0.20 160);
  --color-secondary-800: oklch(0.40 0.17 160);
  --color-secondary-900: oklch(0.33 0.15 160);
  --color-secondary-950: oklch(0.21 0.12 160);

  /* Accent brand color scale */
  --color-accent-50: oklch(0.96 0.02 60);
  --color-accent-100: oklch(0.92 0.05 60);
  --color-accent-200: oklch(0.84 0.09 60);
  --color-accent-300: oklch(0.74 0.14 60);
  --color-accent-400: oklch(0.63 0.18 60);
  --color-accent-500: #F59E0B;
  --color-accent-600: oklch(0.53 0.22 60);
  --color-accent-700: oklch(0.46 0.20 60);
  --color-accent-800: oklch(0.40 0.17 60);
  --color-accent-900: oklch(0.33 0.15 60);
  --color-accent-950: oklch(0.21 0.12 60);

  /* Neutral brand color scale */
  --color-neutral-50: oklch(0.97 0.01 240);
  --color-neutral-100: oklch(0.94 0.02 240);
  --color-neutral-200: oklch(0.86 0.04 240);
  --color-neutral-300: oklch(0.76 0.06 240);
  --color-neutral-400: oklch(0.65 0.08 240);
  --color-neutral-500: #6B7280;
  --color-neutral-600: oklch(0.55 0.10 240);
  --color-neutral-700: oklch(0.48 0.08 240);
  --color-neutral-800: oklch(0.42 0.06 240);
  --color-neutral-900: oklch(0.35 0.04 240);
  --color-neutral-950: oklch(0.23 0.02 240);

  /* Semantic color tokens */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.09 0 0);
  --color-card: oklch(1 0 0);
  --color-card-foreground: oklch(0.09 0 0);
  --color-popover: oklch(1 0 0);
  --color-popover-foreground: oklch(0.09 0 0);
  --color-primary: var(--color-primary-500);
  --color-primary-foreground: oklch(0.98 0 0);
  --color-secondary: var(--color-secondary-500);
  --color-secondary-foreground: oklch(0.98 0 0);
  --color-accent: var(--color-accent-500);
  --color-accent-foreground: oklch(0.98 0 0);
  --color-neutral: var(--color-neutral-500);
  --color-neutral-foreground: oklch(0.98 0 0);
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  --color-destructive: oklch(0.62 0.25 29);
  --color-destructive-foreground: oklch(0.98 0 0);
  --color-border: oklch(0.90 0 0);
  --color-input: oklch(0.90 0 0);
  --color-ring: var(--color-primary-500);
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
echo -e "${GREEN}✅ Tailwind v4 design tokens created${NC}"

# Step 6: Setup shadcn/ui configuration
echo -e "${CYAN}📋 Step 6: Setting up shadcn/ui configuration...${NC}"

# Create components.json for shadcn/ui
cat > "$TARGET_DIR/components.json" << 'EOF'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
EOF
echo -e "${GREEN}✅ shadcn/ui configuration created${NC}"

# Create lib/utils.ts with cn function
mkdir -p "$TARGET_DIR/src/lib"
cat > "$TARGET_DIR/src/lib/utils.ts" << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Brand-aware component variants for multi-brand support
export const brandVariants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90", 
  accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  neutral: "bg-neutral text-neutral-foreground hover:bg-neutral/90"
}
EOF
echo -e "${GREEN}✅ Utils library with brand variants created${NC}"

# Create components directory structure
mkdir -p "$TARGET_DIR/src/components/ui"
echo -e "${GREEN}✅ shadcn/ui directory structure created${NC}"

# Step 7: Create AI persona quick access
echo -e "${CYAN}📋 Step 7: Setting up AI personas...${NC}"

# Create quick persona reference
cat > "$TARGET_DIR/.claude/AI-PERSONAS-QUICK.md" << 'EOF'
# AI Persona Quick Access

## Instant Commands
```bash
🤝 @TeamConsult [complex question]     # Full team collaboration
🎯 @ProductOwner [business question]   # Strategic decisions  
🎨 @DesignEngineer [technical question] # Implementation guidance
⚙️ @BackendExpert [system question]    # Architecture & performance
📈 @MarketingConsultant [growth question] # Market strategy
⚖️ @ComplianceManager [legal question] # Risk & compliance
👤 @UXManager [user question]          # Experience design
🧠 @BehavioralDoctor [psychology question] # User behavior
```

## Quick Examples
- 🤝 @TeamConsult How should we implement dark mode?
- 🎯 @ProductOwner What's the ROI of building custom components?
- 🎨 @DesignEngineer Should we use CSS-in-JS or Tailwind?
EOF

echo -e "${GREEN}✅ AI personas quick reference created${NC}"

# Step 8: Create project README
echo -e "${CYAN}📋 Step 8: Creating project README...${NC}"
cat > "$TARGET_DIR/DESIGN-SYSTEM-README.md" << 'EOF'
# Design System Setup Complete

Your project now includes the **Design System Law Book** - a comprehensive design system that enforces strict consistency with **shadcn/ui** as the component foundation.

## Quick Start

### 1. Install Dependencies
```bash
# Install Tailwind v4 and shadcn/ui dependencies
npm install tailwindcss@next
npm install clsx tailwind-merge
npm install class-variance-authority
npm install @radix-ui/react-slot
```

### 2. Install shadcn/ui Components
```bash
# Essential components (install these first)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add alert
```

### 3. Import Design Tokens
```css
/* In your main CSS file */
@import './src/globals.css';
```

### 4. Use shadcn/ui Components (MANDATORY)
```jsx
// ✅ CORRECT: Always use shadcn/ui as base
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

<Card className="p-6"> {/* 24px padding - on grid */}
  <CardHeader>
    <CardTitle className="text-2xl font-bold"> {/* 24px text - on grid */}
      Component Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <Button 
      variant="default" 
      size="default"
      className="h-10 px-6" {/* 40px height, 24px padding - on grid */}
    >
      Brand Action
    </Button>
  </CardContent>
</Card>

// ❌ WRONG: Never build from scratch
<button className="bg-blue-500 text-white px-4 py-2 rounded">
  Custom Button
</button>
```

## Core Rules

1. **shadcn/ui First**: Every component MUST use shadcn/ui as foundation
2. **8-Point Grid**: All spacing divisible by 8 or 4 (4px, 8px, 12px, 16px, 24px, 32px...)
3. **Typography**: Mulish font, weights 400/500/600/700 only, 8-point grid sizes
4. **Semantic Colors**: Use tokens (bg-primary, text-foreground) not hardcoded colors
5. **Standard Heights**: Components use h-8, h-10, h-12, h-14 only

## Multi-Brand Color System

Your design-config.json supports 1-4 brand colors:

```json
{
  "branding": {
    "brandColors": {
      "primary": { "hex": "#3B82F6", "role": "primary-actions" },
      "secondary": { "hex": "#10B981", "role": "secondary-actions" },
      "accent": { "hex": "#F59E0B", "role": "highlights" },
      "neutral": { "hex": "#6B7280", "role": "supporting" }
    }
  }
}
```

## Available Templates

Check `.claude/templates/` for ready-to-use components:
- `shadcn-button.tsx` - Brand button variants
- `shadcn-card.tsx` - Pricing cards, feature cards
- `shadcn-form.tsx` - Contact forms, registration forms
- `shadcn-navigation.tsx` - Navbar and footer components

## Validation & Automation

```bash
# Check design system compliance
npm run design:check

# Auto-fix violations  
npm run design:auto

# Watch and validate on changes
npm run design:watch

# Generate tokens from brand colors
npm run design:tokens
```

## Documentation

- **Complete Rules**: `CLAUDE.md` - Full design system law book
- **Templates**: `.claude/templates/` - shadcn/ui component examples  
- **Scripts**: `.claude/scripts/` - Validation and automation
- **Commands**: `.claude/commands/` - Development tools

## Next Steps

1. Customize your brand colors in `design-config.json`
2. Run `npm run design:tokens` to generate branded tokens
3. Install additional shadcn/ui components as needed
4. Build components using templates in `.claude/templates/`
5. Use `npm run design:check` to validate compliance

**Remember: Every component must use shadcn/ui as the base!**

🎯 Your design system is now ready for professional, accessible, consistent development!
EOF
echo -e "${GREEN}✅ Project README created${NC}"

echo ""
echo -e "${GREEN}🎉 AI-Powered Design System Deployment Complete!${NC}"
echo ""
echo -e "${CYAN}📁 Your project at ${YELLOW}$TARGET_DIR${NC} ${CYAN}now includes:${NC}"
echo -e "${GREEN}  ✅ Complete .claude/ system with AI automation${NC}"
echo -e "${GREEN}  ✅ CLAUDE.md - Complete design system rules${NC}"
echo -e "${GREEN}  ✅ PLAYBOOK.md - Strategic overview & business impact${NC}"
echo -e "${GREEN}  ✅ system-config.json - Unified configuration${NC}"
echo -e "${GREEN}  ✅ QUICK-REFERENCE.md - Instant commands guide${NC}"
echo -e "${GREEN}  ✅ AI Persona System - 7 expert consultants${NC}"
echo -e "${GREEN}  ✅ Multi-brand color configuration (1-4 colors)${NC}"
echo -e "${GREEN}  ✅ Tailwind v4 design tokens with brand colors${NC}"
echo -e "${GREEN}  ✅ shadcn/ui configuration & utilities${NC}"
echo -e "${GREEN}  ✅ Professional component templates${NC}"
echo ""
echo -e "${CYAN}🎭 New AI Features:${NC}"
echo -e "${YELLOW}  🤝 @TeamConsult - Multi-expert collaboration${NC}"
echo -e "${YELLOW}  🎯 @ProductOwner - Strategic business decisions${NC}"
echo -e "${YELLOW}  🎨 @DesignEngineer - Technical implementation${NC}"
echo -e "${YELLOW}  ⚙️ @BackendExpert - System architecture${NC}"
echo -e "${YELLOW}  📈 @MarketingConsultant - Growth strategy${NC}"
echo -e "${YELLOW}  ⚖️ @ComplianceManager - Risk management${NC}"
echo -e "${YELLOW}  👤 @UXManager - User experience${NC}"
echo -e "${YELLOW}  🧠 @BehavioralDoctor - Behavioral psychology${NC}"
echo ""
echo -e "${CYAN}Next steps:${NC}"
echo -e "${YELLOW}1.${NC} cd \"$TARGET_DIR\""
echo -e "${YELLOW}2.${NC} npm install tailwindcss@next clsx tailwind-merge class-variance-authority"
echo -e "${YELLOW}3.${NC} npx shadcn-ui@latest add button card input form"
echo -e "${YELLOW}4.${NC} Edit design-config.json with your brand colors"
echo -e "${YELLOW}5.${NC} npm run design:tokens to generate branded tokens"
echo -e "${YELLOW}6.${NC} Import src/globals.css in your app"
echo -e "${YELLOW}7.${NC} Start building with shadcn/ui components!"
echo ""
echo -e "${BLUE}🎨 Happy coding with your Design System Law Book!${NC}"