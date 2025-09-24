#!/bin/bash

# Component Generator Script
# Creates a new component following Design System Law Book

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if component name is provided
if [ $# -eq 0 ]; then
    echo -e "${RED}❌ Component name required${NC}"
    echo "Usage: ./new-component.sh ComponentName [type]"
    echo ""
    echo "Types:"
    echo "  button    - Interactive button component"
    echo "  card      - Content card component"
    echo "  form      - Form field component"
    echo "  page      - Full page component"
    echo "  custom    - Basic component template"
    echo ""
    echo "Example: ./new-component.sh MyButton button"
    exit 1
fi

COMPONENT_NAME=$1
COMPONENT_TYPE=${2:-"custom"}
COMPONENTS_DIR="src/components"
TEMPLATE_DIR=".claude/templates"

# Validate component name
if [[ ! $COMPONENT_NAME =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
    echo -e "${RED}❌ Invalid component name${NC}"
    echo "Component name must:"
    echo "  - Start with a capital letter"
    echo "  - Contain only letters and numbers"
    echo "  - Follow PascalCase convention"
    echo ""
    echo "Examples: Button, UserCard, NavigationMenu"
    exit 1
fi

# Create components directory if it doesn't exist
mkdir -p "$COMPONENTS_DIR"

# Determine template and file extension
case $COMPONENT_TYPE in
    "button")
        TEMPLATE_FILE="$TEMPLATE_DIR/button-template.tsx"
        ;;
    "card")
        TEMPLATE_FILE="$TEMPLATE_DIR/card-template.tsx"
        ;;
    "form")
        TEMPLATE_FILE="$TEMPLATE_DIR/form-template.tsx"
        ;;
    "page")
        TEMPLATE_FILE="$TEMPLATE_DIR/page-template.tsx"
        ;;
    "custom")
        TEMPLATE_FILE=""
        ;;
    *)
        echo -e "${RED}❌ Unknown component type: $COMPONENT_TYPE${NC}"
        echo "Available types: button, card, form, page, custom"
        exit 1
        ;;
esac

COMPONENT_FILE="$COMPONENTS_DIR/$COMPONENT_NAME.tsx"

# Check if component already exists
if [ -f "$COMPONENT_FILE" ]; then
    echo -e "${RED}❌ Component already exists: $COMPONENT_FILE${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Creating Design System compliant component${NC}"
echo -e "${BLUE}=============================================${NC}"
echo -e "📛 Name: ${YELLOW}$COMPONENT_NAME${NC}"
echo -e "📁 Type: ${YELLOW}$COMPONENT_TYPE${NC}"
echo -e "📄 File: ${YELLOW}$COMPONENT_FILE${NC}"
echo ""

# Generate component based on type
if [ "$COMPONENT_TYPE" = "custom" ]; then
    # Create basic custom component
    cat > "$COMPONENT_FILE" << EOF
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ${COMPONENT_NAME}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

const $COMPONENT_NAME = React.forwardRef<HTMLDivElement, ${COMPONENT_NAME}Props>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base Design System classes
          "font-sans",                    // Mulish font
          // Add your styling here following Design System rules:
          // - Spacing: p-4, p-6, p-8 (8-point grid)
          // - Typography: text-base font-normal (approved sizes/weights)
          // - Colors: bg-background text-foreground (semantic only)
          className
        )}
        {...props}
      />
    )
  }
)
$COMPONENT_NAME.displayName = "$COMPONENT_NAME"

export { $COMPONENT_NAME }

/*
DESIGN SYSTEM COMPLIANCE CHECKLIST:

✅ Font Family: 
   - Uses font-sans (Mulish)

✅ Font Weights (choose one):
   - font-normal (400)   - Body text, descriptions
   - font-medium (500)   - Subtle emphasis  
   - font-semibold (600) - Headings, buttons
   - font-bold (700)     - Strong emphasis

✅ Font Sizes (choose appropriate):
   - text-xs (12px)   - Labels/badges
   - text-sm (14px)   - Helper text  
   - text-base (16px) - Body text
   - text-lg (18px)   - Large body
   - text-xl (20px)   - Small headings
   - text-2xl (24px)  - Section headings
   - text-3xl (32px)  - Major headings
   - text-4xl (40px)  - Page titles
   - text-5xl (48px)  - Hero text

✅ Spacing (8-point grid):
   - Padding: p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12, etc.
   - Margins: m-0, m-1, m-2, m-3, m-4, m-5, m-6, m-8, m-10, m-12, etc.
   - Gaps: gap-2, gap-4, gap-6, gap-8, gap-10, gap-12, gap-16

✅ Colors (semantic only):
   - Backgrounds: bg-background, bg-card, bg-muted, bg-popover
   - Text: text-foreground, text-muted-foreground
   - Accents: bg-primary, bg-secondary, bg-destructive

❌ Avoid:
   - font-thin, font-light, font-extrabold, font-black
   - text-6xl and larger
   - Arbitrary values: text-[22px], p-[25px]
   - Hardcoded colors: bg-white, text-black, bg-gray-500
*/
EOF

else
    # Copy from template
    if [ ! -f "$TEMPLATE_FILE" ]; then
        echo -e "${RED}❌ Template not found: $TEMPLATE_FILE${NC}"
        exit 1
    fi
    
    # Copy template and replace component name
    cp "$TEMPLATE_FILE" "$COMPONENT_FILE"
    
    # Replace template placeholders if needed
    if [ "$COMPONENT_TYPE" != "page" ]; then
        sed -i.bak "s/Template/$COMPONENT_NAME/g" "$COMPONENT_FILE" 2>/dev/null || sed -i "s/Template/$COMPONENT_NAME/g" "$COMPONENT_FILE"
        rm -f "$COMPONENT_FILE.bak" 2>/dev/null || true
    fi
fi

echo -e "${GREEN}✅ Component created successfully!${NC}"
echo ""

# Run design system validation
echo -e "${BLUE}🔍 Running design system validation...${NC}"
if [ -f ".claude/scripts/design-check.sh" ]; then
    .claude/scripts/design-check.sh "$COMPONENT_FILE"
else
    echo -e "${YELLOW}⚠️  Design validation scripts not found${NC}"
    echo -e "${YELLOW}💡 Run manually: .claude/scripts/design-check.sh $COMPONENT_FILE${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Next steps:${NC}"
echo -e "1. ${YELLOW}Edit the component:${NC} $COMPONENT_FILE"
echo -e "2. ${YELLOW}Add to exports:${NC} Update src/components/index.ts"
echo -e "3. ${YELLOW}Test component:${NC} Create stories/tests"
echo -e "4. ${YELLOW}Validate design:${NC} .claude/scripts/design-check.sh $COMPONENT_FILE"
echo ""
echo -e "${BLUE}📖 Design System Rules:${NC}"
echo -e "- Font: Mulish only (font-sans)"
echo -e "- Weights: 400, 500, 600, 700 only"
echo -e "- Sizes: text-xs to text-5xl (12-48px)"
echo -e "- Spacing: 8-point grid (divisible by 8 or 4)"
echo -e "- Colors: Semantic tokens only"