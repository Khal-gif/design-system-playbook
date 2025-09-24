#!/bin/bash

# Design System Setup Script for Lovale
# This script integrates the Design System Law Book with any React/Next.js project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎨 Design System Law Book - Lovale Integration Setup${NC}"
echo -e "${BLUE}===============================================${NC}"

# Check if we're in the right directory
if [[ ! -f "design-config.json" ]]; then
    echo -e "${RED}❌ Error: design-config.json not found. Please run this script from the Design Playbook directory.${NC}"
    exit 1
fi

# Get target project path
if [[ $# -eq 0 ]]; then
    read -p "Enter the path to your Lovale project directory: " PROJECT_PATH
else
    PROJECT_PATH=$1
fi

# Validate project path
if [[ ! -d "$PROJECT_PATH" ]]; then
    echo -e "${RED}❌ Error: Project directory not found: $PROJECT_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Target project: $PROJECT_PATH${NC}"

# Check if it's a valid React/Next.js project
if [[ ! -f "$PROJECT_PATH/package.json" ]]; then
    echo -e "${RED}❌ Error: No package.json found. Is this a valid React/Next.js project?${NC}"
    exit 1
fi

cd "$PROJECT_PATH"

echo -e "${YELLOW}📦 Installing required dependencies...${NC}"

# Install Tailwind CSS v4 and required dependencies
npm install tailwindcss@next @tailwindcss/typography
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react @radix-ui/react-icons

# Install shadcn/ui CLI if not already installed
if ! command -v shadcn &> /dev/null; then
    echo -e "${YELLOW}🔧 Installing shadcn/ui CLI...${NC}"
    npm install -g shadcn@latest
fi

echo -e "${YELLOW}🎨 Setting up design system files...${NC}"

# Copy design system files
DESIGN_PLAYBOOK_PATH=$(dirname "$(realpath "$0")")
cp "$DESIGN_PLAYBOOK_PATH/CLAUDE.md" ./
cp "$DESIGN_PLAYBOOK_PATH/design-config.json" ./

# Create .claude directory for automation scripts
mkdir -p .claude/commands
mkdir -p .claude/scripts

# Create globals.css with design tokens
echo -e "${YELLOW}📝 Creating globals.css with design tokens...${NC}"

cat > ./src/globals.css << 'EOF'
/* Design System Law Book - Tailwind v4 Implementation */
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  /* Font Family - Mulish Only */
  --font-sans: 'Mulish', system-ui, sans-serif;
  
  /* Typography - 8-Point Grid System */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 2rem;        /* 32px */
  --font-size-4xl: 2.5rem;      /* 40px */
  --font-size-5xl: 3rem;        /* 48px */

  /* Font Weights - Only 4 Approved */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights - 8-Point Grid */
  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Colors - Semantic Tokens */
  --color-background: oklch(0.99 0 0);
  --color-foreground: oklch(0.1 0 0);
  
  --color-card: oklch(0.98 0 0);
  --color-card-foreground: oklch(0.1 0 0);
  
  --color-popover: oklch(0.98 0 0);
  --color-popover-foreground: oklch(0.1 0 0);
  
  --color-primary: oklch(0.6 0.15 250);     /* #3B82F6 */
  --color-primary-foreground: oklch(0.99 0 0);
  
  --color-secondary: oklch(0.65 0.12 165);  /* #10B981 */
  --color-secondary-foreground: oklch(0.99 0 0);
  
  --color-accent: oklch(0.7 0.15 80);       /* #F59E0B */
  --color-accent-foreground: oklch(0.1 0 0);
  
  --color-muted: oklch(0.96 0 0);
  --color-muted-foreground: oklch(0.45 0 0);
  
  --color-destructive: oklch(0.62 0.25 30);
  --color-destructive-foreground: oklch(0.99 0 0);
  
  --color-border: oklch(0.85 0 0);
  --color-input: oklch(0.85 0 0);
  --color-ring: oklch(0.6 0.15 250);
  
  /* Spacing - 8-Point Grid System */
  --spacing-0: 0;
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
  --spacing-14: 3.5rem;    /* 56px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */
  --spacing-40: 10rem;     /* 160px */
  --spacing-48: 12rem;     /* 192px */
  --spacing-56: 14rem;     /* 224px */
  --spacing-64: 16rem;     /* 256px */

  /* Border Radius */
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-3xl: 1.5rem;    /* 24px */
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Dark Mode Support */
  &.dark {
    --color-background: oklch(0.1 0 0);
    --color-foreground: oklch(0.99 0 0);
    
    --color-card: oklch(0.15 0 0);
    --color-card-foreground: oklch(0.99 0 0);
    
    --color-popover: oklch(0.15 0 0);
    --color-popover-foreground: oklch(0.99 0 0);
    
    --color-muted: oklch(0.2 0 0);
    --color-muted-foreground: oklch(0.6 0 0);
    
    --color-border: oklch(0.25 0 0);
    --color-input: oklch(0.25 0 0);
  }
}

/* Global Styles */
* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: var(--font-sans);
}
EOF

# Initialize shadcn/ui
echo -e "${YELLOW}🔧 Initializing shadcn/ui...${NC}"

if [[ ! -f "components.json" ]]; then
    cat > components.json << 'EOF'
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
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
EOF
fi

# Create utils file for cn function
mkdir -p lib
cat > lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# Install essential shadcn/ui components
echo -e "${YELLOW}📦 Installing essential shadcn/ui components...${NC}"

components=(
  "button"
  "card" 
  "input"
  "label"
  "form"
  "dialog"
  "sheet"
  "dropdown-menu"
  "alert"
  "badge"
  "avatar"
  "separator"
  "skeleton"
)

for component in "${components[@]}"; do
    echo -e "  Installing $component..."
    npx shadcn add "$component" --yes || echo -e "${YELLOW}    Warning: Could not install $component (may already exist)${NC}"
done

# Create design system validation script
cat > .claude/commands/ds << 'EOF'
#!/bin/bash

# Design System CLI Tool
# Usage: ./ds [command]

case "$1" in
    "check"|"auto")
        echo "🤖 Design System Compliance Check"
        echo "================================="
        
        # Check for typography violations
        echo "🔍 Checking typography..."
        violations=0
        
        # Check for non-Mulish fonts
        if grep -r "font-family.*[^Mulish]" --include="*.tsx" --include="*.jsx" --include="*.css" src/ 2>/dev/null; then
            echo "❌ Found non-Mulish font usage"
            ((violations++))
        fi
        
        # Check for arbitrary font sizes
        if grep -r "text-\[.*px\]" --include="*.tsx" --include="*.jsx" src/ 2>/dev/null; then
            echo "❌ Found arbitrary font sizes (use text-xs, text-sm, text-base, etc.)"
            ((violations++))
        fi
        
        # Check for forbidden font weights
        if grep -r "font-\(thin\|light\|extrabold\|black\)" --include="*.tsx" --include="*.jsx" src/ 2>/dev/null; then
            echo "❌ Found forbidden font weights (use: font-normal, font-medium, font-semibold, font-bold)"
            ((violations++))
        fi
        
        # Check for spacing violations
        echo "🔍 Checking spacing..."
        
        # Check for arbitrary spacing
        if grep -r "\(p\|m\|gap\)-\[.*px\]" --include="*.tsx" --include="*.jsx" src/ 2>/dev/null; then
            echo "❌ Found arbitrary spacing values (use 8-point grid)"
            ((violations++))
        fi
        
        # Check for hardcoded colors
        echo "🔍 Checking colors..."
        
        if grep -r "bg-\(white\|black\|gray-[0-9]\|blue-[0-9]\|red-[0-9]\)" --include="*.tsx" --include="*.jsx" src/ 2>/dev/null; then
            echo "❌ Found hardcoded colors (use semantic tokens: bg-primary, bg-secondary, bg-background)"
            ((violations++))
        fi
        
        if [[ $violations -eq 0 ]]; then
            echo "✅ All checks passed! Design system compliance maintained."
        else
            echo "❌ Found $violations violation(s). Please fix before committing."
            exit 1
        fi
        ;;
        
    "watch")
        echo "👁️  Watching for design system violations..."
        # This would implement file watching (requires additional setup)
        echo "File watching requires additional setup. Use 'ds check' for manual validation."
        ;;
        
    "ai")
        if [[ -z "$2" ]]; then
            echo "Usage: ds ai <file>"
            exit 1
        fi
        echo "🧠 AI-powered validation for $2"
        echo "This feature requires integration with Claude AI"
        ;;
        
    *)
        echo "Design System CLI Tool"
        echo "Usage:"
        echo "  ds check    - Run compliance check"
        echo "  ds auto     - Same as check"
        echo "  ds watch    - Watch files for violations"
        echo "  ds ai <file> - AI-powered suggestions"
        ;;
esac
EOF

chmod +x .claude/commands/ds

# Create package.json scripts
echo -e "${YELLOW}📝 Adding design system scripts to package.json...${NC}"

# Add scripts to package.json using node
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = pkg.scripts || {};
pkg.scripts['design:check'] = './.claude/commands/ds check';
pkg.scripts['design:auto'] = './.claude/commands/ds auto';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Create example component following design system rules
mkdir -p src/components/examples
cat > src/components/examples/DesignSystemShowcase.tsx << 'EOF'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DesignSystemShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Typography Showcase */}
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          Design System Typography
        </h1>
        <h2 className="text-3xl font-semibold text-foreground">
          Section Heading
        </h2>
        <h3 className="text-2xl font-semibold text-foreground">
          Subsection Heading
        </h3>
        <p className="text-base font-normal text-foreground">
          This is body text using Mulish font family with normal weight (400). 
          It follows the 8-point grid system and uses semantic color tokens.
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          This is smaller text with medium weight for emphasis.
        </p>
      </section>

      {/* Button Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">
          Button Components
        </h2>
        <div className="flex gap-4 flex-wrap">
          <Button className="h-10 px-6 font-semibold">
            Primary Action
          </Button>
          <Button variant="outline" className="h-10 px-6 font-medium">
            Secondary Action
          </Button>
          <Button variant="ghost" className="h-10 px-6 font-medium">
            Ghost Button
          </Button>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">
          Card Components
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold">
                Feature Card
              </CardTitle>
              <CardDescription className="text-sm font-normal">
                This card follows the design system rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base font-normal">
                All spacing uses the 8-point grid system.
              </p>
              <Badge className="font-medium">
                New Feature
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Spacing Showcase */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold text-foreground">
          Spacing System
        </h2>
        <div className="space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-medium">16px padding (p-4)</p>
          </div>
          <div className="bg-secondary/10 p-6 rounded-lg">
            <p className="font-medium">24px padding (p-6)</p>
          </div>
          <div className="bg-accent/10 p-8 rounded-lg">
            <p className="font-medium">32px padding (p-8)</p>
          </div>
        </div>
      </section>
    </div>
  )
}
EOF

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Create project setup script for Lovale integration", "status": "completed", "activeForm": "Creating project setup script for Lovale integration"}, {"content": "Generate globals.css with design tokens", "status": "completed", "activeForm": "Generating globals.css with design tokens"}, {"content": "Create component configuration files", "status": "completed", "activeForm": "Creating component configuration files"}, {"content": "Set up validation and automation scripts", "status": "completed", "activeForm": "Setting up validation and automation scripts"}]