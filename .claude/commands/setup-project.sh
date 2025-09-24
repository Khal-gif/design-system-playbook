#!/bin/bash

# Project Setup Script
# Configures a project for Design System Law Book compliance

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🎨 Design System Project Setup${NC}"
echo -e "${BLUE}===============================${NC}"
echo ""

PROJECT_TYPE=${1:-"nextjs"}

case $PROJECT_TYPE in
    "nextjs")
        echo -e "${YELLOW}📦 Setting up Next.js project with Design System${NC}"
        ;;
    "react")
        echo -e "${YELLOW}📦 Setting up React project with Design System${NC}"
        ;;
    "vite")
        echo -e "${YELLOW}📦 Setting up Vite project with Design System${NC}"
        ;;
    *)
        echo -e "${YELLOW}📦 Setting up generic project with Design System${NC}"
        ;;
esac

echo ""

# 1. Create directory structure
echo -e "${BLUE}📁 Creating directory structure...${NC}"
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p public/fonts
echo -e "${GREEN}✅ Directories created${NC}"

# 2. Create globals.css with Design System setup
echo -e "${BLUE}🎨 Creating globals.css with Design System...${NC}"
cat > "src/globals.css" << 'EOF'
/* Design System Law Book - Global Styles */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  /* Mulish Font Family */
  --font-sans: 'Mulish', system-ui, sans-serif;
  
  /* OKLCH Color System */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.1 0 0);
  
  --color-card: oklch(0.98 0 0);
  --color-card-foreground: oklch(0.1 0 0);
  
  --color-popover: oklch(0.98 0 0);
  --color-popover-foreground: oklch(0.1 0 0);
  
  --color-primary: oklch(0.5 0.2 250);
  --color-primary-foreground: oklch(0.99 0 0);
  
  --color-secondary: oklch(0.96 0 0);
  --color-secondary-foreground: oklch(0.1 0 0);
  
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  
  --color-accent: oklch(0.96 0 0);
  --color-accent-foreground: oklch(0.1 0 0);
  
  --color-destructive: oklch(0.6 0.2 25);
  --color-destructive-foreground: oklch(0.99 0 0);
  
  --color-border: oklch(0.92 0 0);
  --color-input: oklch(0.92 0 0);
  --color-ring: oklch(0.5 0.2 250);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @theme {
    --color-background: oklch(0.05 0 0);
    --color-foreground: oklch(0.95 0 0);
    
    --color-card: oklch(0.05 0 0);
    --color-card-foreground: oklch(0.95 0 0);
    
    --color-popover: oklch(0.05 0 0);
    --color-popover-foreground: oklch(0.95 0 0);
    
    --color-primary: oklch(0.6 0.2 250);
    --color-primary-foreground: oklch(0.05 0 0);
    
    --color-secondary: oklch(0.1 0 0);
    --color-secondary-foreground: oklch(0.95 0 0);
    
    --color-muted: oklch(0.1 0 0);
    --color-muted-foreground: oklch(0.65 0 0);
    
    --color-accent: oklch(0.1 0 0);
    --color-accent-foreground: oklch(0.95 0 0);
    
    --color-destructive: oklch(0.6 0.2 25);
    --color-destructive-foreground: oklch(0.95 0 0);
    
    --color-border: oklch(0.15 0 0);
    --color-input: oklch(0.15 0 0);
  }
}

/* Base styles */
* {
  border-color: hsl(var(--border));
}

body {
  font-family: var(--font-sans);
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Typography hierarchy enforcement */
.typography-scale {
  /* Enforce proper scaling */
  font-size: clamp(1rem, 2.5vw, 1.125rem); /* Responsive base size */
}
EOF
echo -e "${GREEN}✅ globals.css created with Design System${NC}"

# 3. Create utils.ts
echo -e "${BLUE}🔧 Creating utility functions...${NC}"
cat > "src/lib/utils.ts" << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Design System validation helpers
export const designSystem = {
  // Validate font weights (only 4 allowed)
  fontWeights: [400, 500, 600, 700] as const,
  
  // Validate font sizes (8-point system)
  fontSizes: {
    'xs': 12,   // text-xs
    'sm': 14,   // text-sm  
    'base': 16, // text-base
    'lg': 18,   // text-lg
    'xl': 20,   // text-xl
    '2xl': 24,  // text-2xl
    '3xl': 32,  // text-3xl
    '4xl': 40,  // text-4xl
    '5xl': 48,  // text-5xl
  } as const,
  
  // Validate spacing (8-point grid)
  spacing: [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256] as const,
  
  // Check if value is on 8-point grid
  isValidSpacing: (value: number): boolean => {
    return value % 8 === 0 || value % 4 === 0;
  },
  
  // Check if font size is approved
  isValidFontSize: (size: number): boolean => {
    return Object.values(designSystem.fontSizes).includes(size);
  },
  
  // Check if font weight is approved  
  isValidFontWeight: (weight: number): boolean => {
    return designSystem.fontWeights.includes(weight as any);
  }
} as const;
EOF
echo -e "${GREEN}✅ utils.ts created${NC}"

# 4. No tailwind.config.js needed for v4!
echo -e "${BLUE}⚙️ Tailwind v4 uses @theme in globals.css (no config file needed)...${NC}"
echo -e "${GREEN}✅ Configuration handled by @theme blocks in globals.css${NC}"

# 5. Create package.json scripts
# 5. Create package.json scripts
echo -e "${BLUE}📝 Adding Design System scripts to package.json...${NC}"
if [ -f "package.json" ]; then
    # Add design system scripts
    npm pkg set scripts.design-check=".claude/scripts/design-check.sh src"
    npm pkg set scripts.design-spacing=".claude/scripts/spacing-check.sh src"  
    npm pkg set scripts.design-typography=".claude/scripts/typography-check.sh src"
    npm pkg set scripts.design-colors=".claude/scripts/color-check.sh src"
    echo -e "${GREEN}✅ Scripts added to package.json${NC}"
else
    echo -e "${YELLOW}⚠️  No package.json found - scripts not added${NC}"
fi

# 6. Create basic component index
echo -e "${BLUE}📦 Creating component exports...${NC}"
cat > "src/components/index.ts" << 'EOF'
// Design System Components
// All components follow the Design System Law Book

// Export UI components here
// export { Button } from './ui/button'
// export { Card } from './ui/card'
// export { Form } from './ui/form'
EOF
echo -e "${GREEN}✅ Component index created${NC}"

# 7. Create pre-commit hook
echo -e "${BLUE}🔗 Setting up pre-commit hook...${NC}"
if [ -d ".git" ]; then
    mkdir -p .git/hooks
    cat > ".git/hooks/pre-commit" << 'EOF'
#!/bin/bash
# Design System Pre-commit Hook
# Validates design system compliance before commits

echo "🎨 Checking Design System compliance..."

# Run design system validation
if [ -f ".claude/scripts/design-check.sh" ]; then
    .claude/scripts/design-check.sh src/
    if [ $? -ne 0 ]; then
        echo "❌ Design System violations found. Fix before committing."
        echo "💡 Run: .claude/scripts/design-check.sh src/"
        exit 1
    fi
    echo "✅ Design System compliance check passed"
else
    echo "⚠️  Design System scripts not found"
fi
EOF
    chmod +x .git/hooks/pre-commit
    echo -e "${GREEN}✅ Pre-commit hook installed${NC}"
else
    echo -e "${YELLOW}⚠️  Not a git repository - pre-commit hook not installed${NC}"
fi

# 8. Create .designsystemrc
echo -e "${BLUE}⚙️ Creating Design System config...${NC}"
cat > ".designsystemrc" << 'EOF'
{
  "version": "1.0.0",
  "name": "Design System Law Book",
  "rules": {
    "typography": {
      "fontFamily": "Mulish",
      "weights": [400, 500, 600, 700],
      "sizes": [12, 14, 16, 18, 20, 24, 32, 40, 48],
      "maxSize": 48
    },
    "spacing": {
      "system": "8-point",
      "allowedValues": "divisibleBy4Or8"
    },
    "colors": {
      "system": "semantic",
      "allowHardcoded": false,
      "preferredFormat": "oklch"
    },
    "validation": {
      "strict": true,
      "autofix": false
    }
  }
}
EOF
echo -e "${GREEN}✅ Design System config created${NC}"

echo ""
echo -e "${GREEN}🎉 Design System project setup complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo -e "1. ${YELLOW}Install dependencies:${NC}"
echo -e "   npm install tailwindcss tailwindcss-animate class-variance-authority clsx tailwind-merge"
echo -e "2. ${YELLOW}Create your first component:${NC}"
echo -e "   .claude/commands/new-component.sh MyButton button"
echo -e "3. ${YELLOW}Validate design system:${NC}"  
echo -e "   npm run design-check"
echo -e "4. ${YELLOW}Import globals.css in your app:${NC}"
echo -e "   import './src/globals.css'"
echo ""
echo -e "${BLUE}📖 Design System Rules:${NC}"
echo -e "✅ Font: Mulish only (weights: 400,500,600,700)"
echo -e "✅ Sizes: 12px-48px on 8-point scale"
echo -e "✅ Spacing: 8-point grid (divisible by 8 or 4)"
echo -e "✅ Colors: Semantic tokens only (OKLCH)"
echo -e "✅ Validation: Pre-commit hooks enabled"
echo ""
echo -e "${GREEN}Happy building! 🚀${NC}"