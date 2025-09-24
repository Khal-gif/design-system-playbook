#!/bin/bash

# Development Workflow Script
# Interactive development commands for Design System compliance

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Show menu
show_menu() {
    clear
    echo -e "${BLUE}🎨 Design System Development Workflow${NC}"
    echo -e "${BLUE}=====================================${NC}"
    echo ""
    echo -e "${CYAN}📦 Project Setup:${NC}"
    echo -e "  1) Setup new project with Design System"
    echo -e "  2) Add Design System to existing project" 
    echo ""
    echo -e "${CYAN}🧩 Component Development:${NC}"
    echo -e "  3) Create new component"
    echo -e "  4) List available templates"
    echo -e "  5) Copy component from template"
    echo ""
    echo -e "${CYAN}✅ Validation & Review:${NC}"
    echo -e "  6) Check entire project"
    echo -e "  7) Check specific file/directory"
    echo -e "  8) Run typography check only"
    echo -e "  9) Run spacing check only"
    echo -e "  10) Run color check only"
    echo ""
    echo -e "${CYAN}📋 Workflows:${NC}"
    echo -e "  11) Start design review workflow"
    echo -e "  12) Component creation workflow"
    echo ""
    echo -e "${CYAN}🔧 Utilities:${NC}"
    echo -e "  13) Show Design System rules"
    echo -e "  14) Generate component report"
    echo -e "  15) Fix common violations (interactive)"
    echo ""
    echo -e "  0) Exit"
    echo ""
    echo -e "${YELLOW}Enter your choice [0-15]: ${NC}"
}

# Project setup
setup_project() {
    echo -e "${BLUE}📦 Project Setup${NC}"
    echo ""
    echo "Available project types:"
    echo "1) Next.js"
    echo "2) React" 
    echo "3) Vite"
    echo "4) Generic"
    echo ""
    read -p "Choose project type [1-4]: " type
    
    case $type in
        1) .claude/commands/setup-project.sh nextjs ;;
        2) .claude/commands/setup-project.sh react ;;
        3) .claude/commands/setup-project.sh vite ;;
        4) .claude/commands/setup-project.sh generic ;;
        *) echo -e "${RED}Invalid choice${NC}" ;;
    esac
}

# Create component
create_component() {
    echo -e "${BLUE}🧩 Create New Component${NC}"
    echo ""
    read -p "Component name (PascalCase): " name
    
    if [[ ! $name =~ ^[A-Z][a-zA-Z0-9]*$ ]]; then
        echo -e "${RED}❌ Invalid name. Use PascalCase (e.g., MyButton)${NC}"
        return
    fi
    
    echo ""
    echo "Available templates:"
    echo "1) Button - Interactive button component"
    echo "2) Card - Content card component"  
    echo "3) Form - Form field component"
    echo "4) Page - Full page component"
    echo "5) Custom - Basic component template"
    echo ""
    read -p "Choose template [1-5]: " template
    
    case $template in
        1) .claude/commands/new-component.sh "$name" button ;;
        2) .claude/commands/new-component.sh "$name" card ;;
        3) .claude/commands/new-component.sh "$name" form ;;
        4) .claude/commands/new-component.sh "$name" page ;;
        5) .claude/commands/new-component.sh "$name" custom ;;
        *) echo -e "${RED}Invalid choice${NC}" ;;
    esac
}

# List templates
list_templates() {
    echo -e "${BLUE}📋 Available Templates${NC}"
    echo ""
    if [ -d ".claude/templates" ]; then
        ls -la .claude/templates/ | grep -E '\.(tsx|ts|jsx|js)$' | while read -r line; do
            filename=$(echo "$line" | awk '{print $9}')
            echo -e "${GREEN}📄${NC} $filename"
        done
    else
        echo -e "${RED}No templates directory found${NC}"
    fi
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Check specific target
check_target() {
    echo -e "${BLUE}🔍 Design System Check${NC}"
    echo ""
    read -p "Enter file or directory path (default: src): " target
    target=${target:-"src"}
    
    if [ ! -e "$target" ]; then
        echo -e "${RED}❌ Path not found: $target${NC}"
        return
    fi
    
    echo ""
    echo -e "${YELLOW}Running comprehensive check on: $target${NC}"
    .claude/scripts/design-check.sh "$target"
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Individual checks
run_typography_check() {
    echo -e "${BLUE}🔤 Typography Check${NC}"
    echo ""
    read -p "Enter path (default: src): " target
    target=${target:-"src"}
    
    .claude/scripts/typography-check.sh "$target"
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

run_spacing_check() {
    echo -e "${BLUE}📏 Spacing Check${NC}"
    echo ""
    read -p "Enter path (default: src): " target
    target=${target:-"src"}
    
    .claude/scripts/spacing-check.sh "$target"
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

run_color_check() {
    echo -e "${BLUE}🎨 Color Check${NC}"
    echo ""
    read -p "Enter path (default: src): " target
    target=${target:-"src"}
    
    .claude/scripts/color-check.sh "$target"
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Show rules
show_rules() {
    echo -e "${BLUE}📖 Design System Law Book Rules${NC}"
    echo -e "${BLUE}===============================${NC}"
    echo ""
    
    echo -e "${GREEN}✅ TYPOGRAPHY RULES:${NC}"
    echo -e "Font Family: Mulish only (font-sans)"
    echo -e "Font Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)"
    echo -e "Font Sizes: text-xs (12px) to text-5xl (48px)"
    echo -e "Max Size: 48px (text-5xl)"
    echo ""
    
    echo -e "${GREEN}✅ SPACING RULES:${NC}"
    echo -e "System: 8-point grid"
    echo -e "Valid Values: Divisible by 8 or 4"
    echo -e "Examples: p-0, p-1, p-2, p-3, p-4, p-6, p-8, p-12, etc."
    echo -e "Invalid: p-5, p-7, p-[25px], gap-5, m-[30px]"
    echo ""
    
    echo -e "${GREEN}✅ COLOR RULES:${NC}"
    echo -e "System: Semantic tokens only"
    echo -e "Backgrounds: bg-background, bg-card, bg-muted"
    echo -e "Text: text-foreground, text-muted-foreground"  
    echo -e "Accents: bg-primary, bg-secondary, bg-destructive"
    echo -e "Format: OKLCH preferred"
    echo ""
    
    echo -e "${RED}❌ FORBIDDEN:${NC}"
    echo -e "Fonts: font-thin, font-light, font-extrabold, font-black"
    echo -e "Sizes: text-6xl+, text-[22px] (arbitrary)"
    echo -e "Spacing: p-[25px], gap-5, non-grid values"
    echo -e "Colors: bg-white, text-black, bg-gray-500"
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Generate report
generate_report() {
    echo -e "${BLUE}📊 Component Report Generator${NC}"
    echo ""
    
    read -p "Enter directory to analyze (default: src): " target
    target=${target:-"src"}
    
    if [ ! -d "$target" ]; then
        echo -e "${RED}❌ Directory not found: $target${NC}"
        return
    fi
    
    report_file="design-system-report-$(date +%Y%m%d-%H%M%S).md"
    
    echo -e "${YELLOW}Generating report...${NC}"
    
    cat > "$report_file" << EOF
# Design System Compliance Report

**Generated:** $(date)
**Directory:** $target
**Rules:** Design System Law Book

## Summary

EOF
    
    # Count files
    total_files=$(find "$target" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) | wc -l)
    echo "**Total Files Analyzed:** $total_files" >> "$report_file"
    echo "" >> "$report_file"
    
    # Run checks and capture results
    echo "## Typography Violations" >> "$report_file"
    .claude/scripts/typography-check.sh "$target" >> "$report_file" 2>&1 || true
    echo "" >> "$report_file"
    
    echo "## Spacing Violations" >> "$report_file"
    .claude/scripts/spacing-check.sh "$target" >> "$report_file" 2>&1 || true
    echo "" >> "$report_file"
    
    echo "## Color Violations" >> "$report_file"
    .claude/scripts/color-check.sh "$target" >> "$report_file" 2>&1 || true
    echo "" >> "$report_file"
    
    echo "## Recommendations" >> "$report_file"
    echo "1. Fix all typography violations first (highest priority)" >> "$report_file"
    echo "2. Correct spacing issues to align with 8-point grid" >> "$report_file"
    echo "3. Replace hardcoded colors with semantic tokens" >> "$report_file"
    echo "4. Set up pre-commit hooks to prevent future violations" >> "$report_file"
    
    echo -e "${GREEN}✅ Report generated: $report_file${NC}"
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Design review workflow
design_review() {
    echo -e "${BLUE}📋 Design Review Workflow${NC}"
    echo ""
    echo "Opening design review workflow..."
    
    if [ -f ".claude/workflows/design-review.md" ]; then
        if command -v code >/dev/null 2>&1; then
            code .claude/workflows/design-review.md
        else
            echo -e "${YELLOW}Please open: .claude/workflows/design-review.md${NC}"
        fi
    else
        echo -e "${RED}Design review workflow not found${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Component creation workflow  
component_workflow() {
    echo -e "${BLUE}🧩 Component Creation Workflow${NC}"
    echo ""
    echo "Opening component creation workflow..."
    
    if [ -f ".claude/workflows/component-creation.md" ]; then
        if command -v code >/dev/null 2>&1; then
            code .claude/workflows/component-creation.md
        else
            echo -e "${YELLOW}Please open: .claude/workflows/component-creation.md${NC}"
        fi
    else
        echo -e "${RED}Component creation workflow not found${NC}"
    fi
    
    echo ""
    echo -e "${YELLOW}Press Enter to continue...${NC}"
    read
}

# Main loop
while true; do
    show_menu
    read choice
    
    case $choice in
        1) setup_project ;;
        2) setup_project ;;
        3) create_component ;;
        4) list_templates ;;
        5) list_templates ;;
        6) .claude/scripts/design-check.sh src/; echo ""; echo -e "${YELLOW}Press Enter to continue...${NC}"; read ;;
        7) check_target ;;
        8) run_typography_check ;;
        9) run_spacing_check ;;
        10) run_color_check ;;
        11) design_review ;;
        12) component_workflow ;;
        13) show_rules ;;
        14) generate_report ;;
        15) echo -e "${YELLOW}Interactive fixer coming soon...${NC}"; echo ""; echo -e "${YELLOW}Press Enter to continue...${NC}"; read ;;
        0) echo -e "${GREEN}Goodbye! 👋${NC}"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}"; sleep 1 ;;
    esac
done