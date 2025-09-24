#!/bin/bash

# AI-Optimized Design System Validation Helper
# Provides contextual feedback and suggestions for AI agents

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Get input (file path or stdin)
INPUT=${1:-"-"}

# Violation tracking
VIOLATIONS=0
SUGGESTIONS=()

# Function to add contextual suggestion
add_suggestion() {
    local violation="$1"
    local alternative="$2"
    local benefit="$3"
    local line_num="$4"
    
    SUGGESTIONS+=("Line $line_num: $violation → $alternative ($benefit)")
    ((VIOLATIONS++))
}

# Function to check typography violations
check_typography() {
    local content="$1"
    
    echo -e "${CYAN}🔤 Checking Typography...${NC}"
    
    # Check for forbidden font weights
    if echo "$content" | grep -q "font-thin\|font-light\|font-extrabold\|font-black"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "font-\(thin\|light\|extrabold\|black\)")
            case $violation in
                "font-thin"|"font-light") alt="font-normal (400)" ;;
                "font-extrabold"|"font-black") alt="font-bold (700)" ;;
            esac
            add_suggestion "$violation" "$alt" "maintains design system consistency" "$line_num"
        done < <(echo "$content" | grep -n "font-thin\|font-light\|font-extrabold\|font-black")
    fi
    
    # Check for oversized text
    if echo "$content" | grep -q "text-6xl\|text-7xl\|text-8xl\|text-9xl"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "text-[6-9]xl")
            add_suggestion "$violation" "text-5xl" "maximum allowed size is 48px" "$line_num"
        done < <(echo "$content" | grep -n "text-6xl\|text-7xl\|text-8xl\|text-9xl")
    fi
    
    # Check for arbitrary font sizes
    if echo "$content" | grep -q "text-\[[0-9]*px\]"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "text-\[[0-9]*px\]")
            add_suggestion "$violation" "text-base, text-lg, text-xl, etc." "use 8-point grid typography" "$line_num"
        done < <(echo "$content" | grep -n "text-\[[0-9]*px\]")
    fi
}

# Function to check spacing violations
check_spacing() {
    local content="$1"
    
    echo -e "${CYAN}📏 Checking Spacing...${NC}"
    
    # Check for arbitrary spacing
    if echo "$content" | grep -q "\(p\|m\|gap\)-\[[0-9]*px\]"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "\(p\|m\|gap\)-\[[0-9]*px\]")
            add_suggestion "$violation" "p-4, p-6, p-8, etc." "use 8-point grid spacing" "$line_num"
        done < <(echo "$content" | grep -n "\(p\|m\|gap\)-\[[0-9]*px\]")
    fi
    
    # Check for non-standard spacing classes (this is more permissive now)
    # We only flag truly problematic ones since p-5, p-7 etc are valid in Tailwind
    if echo "$content" | grep -q "\(p\|m\|gap\)-[0-9][0-9][0-9]\+"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "\(p\|m\|gap\)-[0-9][0-9][0-9]\+")
            add_suggestion "$violation" "p-16, p-24, p-32, etc." "use standard large spacing values" "$line_num"
        done < <(echo "$content" | grep -n "\(p\|m\|gap\)-[0-9][0-9][0-9]\+")
    fi
}

# Function to check color violations
check_colors() {
    local content="$1"
    
    echo -e "${CYAN}🎨 Checking Colors...${NC}"
    
    # Check for hardcoded colors
    if echo "$content" | grep -q "bg-white\|bg-black\|text-white\|text-black"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "bg-white\|bg-black\|text-white\|text-black")
            case $violation in
                "bg-white") alt="bg-background" ;;
                "bg-black") alt="bg-foreground" ;;
                "text-white") alt="text-primary-foreground" ;;
                "text-black") alt="text-foreground" ;;
            esac
            add_suggestion "$violation" "$alt" "use semantic color tokens" "$line_num"
        done < <(echo "$content" | grep -n "bg-white\|bg-black\|text-white\|text-black")
    fi
    
    # Check for gray scale colors
    if echo "$content" | grep -q "\(bg\|text\|border\)-gray-[0-9]\+"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "\(bg\|text\|border\)-gray-[0-9]\+")
            add_suggestion "$violation" "bg-muted, text-muted-foreground, border-border" "use semantic color tokens" "$line_num"
        done < <(echo "$content" | grep -n "\(bg\|text\|border\)-gray-[0-9]\+")
    fi
    
    # Check for brand colors
    if echo "$content" | grep -q "\(bg\|text\)-\(blue\|red\|green\|yellow\|purple\|pink\|indigo\)-[0-9]\+"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "\(bg\|text\)-\(blue\|red\|green\|yellow\|purple\|pink\|indigo\)-[0-9]\+")
            add_suggestion "$violation" "bg-primary, text-primary" "use brand color tokens" "$line_num"
        done < <(echo "$content" | grep -n "\(bg\|text\)-\(blue\|red\|green\|yellow\|purple\|pink\|indigo\)-[0-9]\+")
    fi
    
    # Check for arbitrary colors
    if echo "$content" | grep -q "\(bg\|text\|border\)-\[#[0-9a-fA-F]\+\]"; then
        while IFS= read -r line; do
            line_num=$(echo "$line" | cut -d: -f1)
            violation=$(echo "$line" | grep -o "\(bg\|text\|border\)-\[#[0-9a-fA-F]\+\]")
            add_suggestion "$violation" "semantic color tokens" "use design system colors" "$line_num"
        done < <(echo "$content" | grep -n "\(bg\|text\|border\)-\[#[0-9a-fA-F]\+\]")
    fi
}

# Function to check component patterns
check_components() {
    local content="$1"
    
    echo -e "${CYAN}🧩 Checking Component Patterns...${NC}"
    
    # Check for non-standard button heights
    if echo "$content" | grep -q "h-[0-9]\+" | grep -v "h-[68]" | grep -v "h-1[024]"; then
        while IFS= read -r line; do
            if echo "$line" | grep -q "button\|Button"; then
                line_num=$(echo "$line" | cut -d: -f1)
                violation=$(echo "$line" | grep -o "h-[0-9]\+")
                add_suggestion "$violation" "h-8, h-10, h-12, or h-14" "use standard button heights" "$line_num"
            fi
        done < <(echo "$content" | grep -n "h-[0-9]\+")
    fi
}

# Main validation function
validate_content() {
    local content="$1"
    
    echo -e "${BLUE}🎨 AI Design System Validation${NC}"
    echo -e "${BLUE}===============================${NC}"
    echo
    
    check_typography "$content"
    check_spacing "$content"
    check_colors "$content"
    check_components "$content"
    
    echo
    
    if [ $VIOLATIONS -eq 0 ]; then
        echo -e "${GREEN}✅ Perfect! Code follows design system rules.${NC}"
        echo -e "${GREEN}   All typography, spacing, colors, and components are compliant.${NC}"
        return 0
    else
        echo -e "${RED}❌ Found $VIOLATIONS design system violations${NC}"
        echo
        echo -e "${YELLOW}💡 AI Suggestions:${NC}"
        
        for suggestion in "${SUGGESTIONS[@]}"; do
            echo -e "${YELLOW}   • $suggestion${NC}"
        done
        
        echo
        echo -e "${CYAN}📖 Quick Fix Guide:${NC}"
        echo -e "${CYAN}   Typography: Use font-sans with font-normal/medium/semibold/bold${NC}"
        echo -e "${CYAN}   Spacing: Use 8-point grid (p-4, p-6, p-8, etc.)${NC}"
        echo -e "${CYAN}   Colors: Use semantic tokens (bg-primary, text-foreground, etc.)${NC}"
        echo -e "${CYAN}   Components: Use standard heights and patterns${NC}"
        echo
        echo -e "${PURPLE}🤖 For AI: Apply these suggestions to make the code compliant${NC}"
        
        return 1
    fi
}

# Process input
if [ "$INPUT" = "-" ]; then
    # Read from stdin
    content=$(cat)
    validate_content "$content"
else
    # Read from file
    if [ ! -f "$INPUT" ]; then
        echo -e "${RED}❌ File not found: $INPUT${NC}"
        exit 1
    fi
    
    content=$(cat "$INPUT")
    echo -e "${BLUE}📄 Validating: $INPUT${NC}"
    echo
    validate_content "$content"
fi