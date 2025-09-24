#!/bin/bash

# Color Validation Script
# Checks for semantic color usage and OKLCH compliance

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TARGET_DIR=${1:-"src"}

echo -e "${GREEN}🎨 Color System Compliance Check${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "📁 Scanning: ${YELLOW}$TARGET_DIR${NC}"
echo ""

VIOLATIONS=0

check_color_file() {
    local file="$1"
    local file_violations=0
    
    echo -e "${YELLOW}📄 Checking: $file${NC}"
    
    # Create a temporary file without comments for checking
    local temp_file=$(mktemp)
    
    # Remove single-line comments (//) and multi-line comments (/* */) and JSX comments ({/* */})
    sed -e 's|//.*$||g' -e 's|/\*.*\*/||g' -e 's|{\s*/\*.*\*/\s*}||g' "$file" > "$temp_file"
    
    # For multi-line comments, use a more complex approach
    # Remove /* ... */ blocks that span multiple lines
    perl -0pe 's|/\*.*?\*/||gs' "$temp_file" > "${temp_file}.tmp" && mv "${temp_file}.tmp" "$temp_file"
    perl -0pe 's|{\s*/\*.*?\*/\s*}||gs' "$temp_file" > "${temp_file}.tmp" && mv "${temp_file}.tmp" "$temp_file"
    
    # Check for forbidden background colors (excluding comments)
    if grep -nE "bg-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+|red-[0-9]+|orange-[0-9]+|amber-[0-9]+|yellow-[0-9]+|lime-[0-9]+|green-[0-9]+|emerald-[0-9]+|teal-[0-9]+|cyan-[0-9]+|sky-[0-9]+|blue-[0-9]+|indigo-[0-9]+|violet-[0-9]+|purple-[0-9]+|fuchsia-[0-9]+|pink-[0-9]+|rose-[0-9]+)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ HARDCODED BACKGROUND COLORS (use semantic):${NC}"
        grep -nE "bg-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+|red-[0-9]+|orange-[0-9]+|amber-[0-9]+|yellow-[0-9]+|lime-[0-9]+|green-[0-9]+|emerald-[0-9]+|teal-[0-9]+|cyan-[0-9]+|sky-[0-9]+|blue-[0-9]+|indigo-[0-9]+|violet-[0-9]+|purple-[0-9]+|fuchsia-[0-9]+|pink-[0-9]+|rose-[0-9]+)" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: Use bg-background, bg-card, bg-muted, etc."
            ((file_violations++))
        done
    fi
    
    # Check for forbidden text colors (excluding comments)
    if grep -nE "text-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+|red-[0-9]+|orange-[0-9]+|amber-[0-9]+|yellow-[0-9]+|lime-[0-9]+|green-[0-9]+|emerald-[0-9]+|teal-[0-9]+|cyan-[0-9]+|sky-[0-9]+|blue-[0-9]+|indigo-[0-9]+|violet-[0-9]+|purple-[0-9]+|fuchsia-[0-9]+|pink-[0-9]+|rose-[0-9]+)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ HARDCODED TEXT COLORS (use semantic):${NC}"
        grep -nE "text-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+|red-[0-9]+|orange-[0-9]+|amber-[0-9]+|yellow-[0-9]+|lime-[0-9]+|green-[0-9]+|emerald-[0-9]+|teal-[0-9]+|cyan-[0-9]+|sky-[0-9]+|blue-[0-9]+|indigo-[0-9]+|violet-[0-9]+|purple-[0-9]+|fuchsia-[0-9]+|pink-[0-9]+|rose-[0-9]+)" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: Use text-foreground, text-muted-foreground, etc."
            ((file_violations++))
        done
    fi
    
    # Check for arbitrary color values (excluding comments)
    if grep -nE "(bg|text|border)-\[#[0-9a-fA-F]+\]" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ ARBITRARY HEX COLORS (use semantic):${NC}"
        grep -nE "(bg|text|border)-\[#[0-9a-fA-F]+\]" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for RGB/HSL colors (excluding comments)
    if grep -nE "(bg|text|border)-\[(rgb|hsl)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ RGB/HSL COLORS (use OKLCH semantic):${NC}"
        grep -nE "(bg|text|border)-\[(rgb|hsl)" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for inline color styles (excluding comments)
    if grep -nE "style=.*color:" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ INLINE COLOR STYLES (use Tailwind semantic):${NC}"
        grep -nE "style=.*color:" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for good semantic color usage
    semantic_colors_found=false
    if grep -qE "(bg|text)-(background|foreground|card|muted|popover|primary|secondary|destructive|accent)" "$file"; then
        semantic_colors_found=true
    fi
    
    # Check for border colors (excluding comments)
    if grep -nE "border-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ HARDCODED BORDER COLORS:${NC}"
        grep -nE "border-(white|black|gray-[0-9]+|slate-[0-9]+|zinc-[0-9]+|neutral-[0-9]+|stone-[0-9]+)" "$temp_file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: Use border, border-muted, etc."
            ((file_violations++))
        done
    fi
    
    # Clean up temporary file
    rm -f "$temp_file"
    
    if [ $file_violations -eq 0 ]; then
        if [ "$semantic_colors_found" = true ]; then
            echo -e "  ${GREEN}✅ Using semantic colors correctly${NC}"
        else
            echo -e "  ${GREEN}✅ No color violations found${NC}"
        fi
    else
        VIOLATIONS=$((VIOLATIONS + file_violations))
    fi
    
    echo ""
}

# Find and check all relevant files
find "$TARGET_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | while read file; do
    check_color_file "$file"
done

echo -e "${GREEN}==================${NC}"
if [ $VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✅ All colors follow semantic naming!${NC}"
    echo -e "${GREEN}🎨 60/30/10 rule with OKLCH colors${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $VIOLATIONS color violations${NC}"
    echo -e "${YELLOW}💡 Use semantic colors:${NC}"
    echo -e "${YELLOW}   - Backgrounds: bg-background, bg-card, bg-muted${NC}"
    echo -e "${YELLOW}   - Text: text-foreground, text-muted-foreground${NC}"
    echo -e "${YELLOW}   - Actions: bg-primary, bg-secondary, bg-destructive${NC}"
    exit 1
fi