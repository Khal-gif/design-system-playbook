#!/bin/bash

# Main Design System Compliance Checker
# Scans files for violations of the Design System Law Book

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default target directory
TARGET_DIR=${1:-"src"}

if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}❌ Directory '$TARGET_DIR' not found${NC}"
    echo "Usage: ./design-check.sh [directory]"
    echo "Example: ./design-check.sh src/components"
    exit 1
fi

echo -e "${GREEN}🎨 Design System Compliance Check${NC}"
echo -e "${GREEN}==================================${NC}"
echo -e "📁 Scanning: ${YELLOW}$TARGET_DIR${NC}"
echo ""

VIOLATIONS=0

# Function to check file for violations
check_file() {
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
    
    # Check for forbidden font weights (excluding comments)
    if grep -n "font-\(thin\|extralight\|light\|extrabold\|black\)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ FONT WEIGHT VIOLATION:${NC}"
        grep -n "font-\(thin\|extralight\|light\|extrabold\|black\)" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for forbidden font sizes (excluding comments)
    if grep -n "text-\(6xl\|7xl\|8xl\|9xl\)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ FONT SIZE VIOLATION (too large):${NC}"
        grep -n "text-\(6xl\|7xl\|8xl\|9xl\)" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for arbitrary font sizes (excluding comments)
    if grep -n "text-\[\[0-9\]*px\]" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ ARBITRARY FONT SIZE:${NC}"
        grep -n "text-\[\[0-9\]*px\]" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for arbitrary spacing (excluding comments)
    if grep -n "[mp][xy]\?-\[\[0-9\]*px\]" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ ARBITRARY SPACING:${NC}"
        grep -n "[mp][xy]\?-\[\[0-9\]*px\]" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for forbidden colors (excluding comments)
    if grep -n "bg-\(white\|gray-[0-9]*\|blue-[0-9]*\|red-[0-9]*\|green-[0-9]*\)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ HARDCODED COLOR:${NC}"
        grep -n "bg-\(white\|gray-[0-9]*\|blue-[0-9]*\|red-[0-9]*\|green-[0-9]*\)" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for forbidden text colors (excluding comments)
    if grep -n "text-\(black\|white\|gray-[0-9]*\|blue-[0-9]*\|red-[0-9]*\)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ HARDCODED TEXT COLOR:${NC}"
        grep -n "text-\(black\|white\|gray-[0-9]*\|blue-[0-9]*\|red-[0-9]*\)" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for wrong font family (excluding comments)
    if grep -n "font-\(mono\|serif\)" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ WRONG FONT FAMILY (must be Mulish):${NC}"
        grep -n "font-\(mono\|serif\)" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Check for inline styles that might override (excluding comments)
    if grep -n "style={{.*font" "$temp_file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ INLINE FONT STYLES:${NC}"
        grep -n "style={{.*font" "$temp_file" | while read line; do
            echo -e "    Line: $line"
            ((file_violations++))
        done
    fi
    
    # Clean up temporary file
    rm -f "$temp_file"
    
    if [ $file_violations -eq 0 ]; then
        echo -e "  ${GREEN}✅ No violations found${NC}"
    else
        VIOLATIONS=$((VIOLATIONS + file_violations))
    fi
    
    echo ""
}

# Find and check all relevant files
find "$TARGET_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | while read file; do
    check_file "$file"
done

echo -e "${GREEN}==================${NC}"
if [ $VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✅ All files comply with Design System Law Book!${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $VIOLATIONS violations${NC}"
    echo -e "${YELLOW}💡 Refer to CLAUDE.md for correct usage${NC}"
    exit 1
fi