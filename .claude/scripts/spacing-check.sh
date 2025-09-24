#!/bin/bash

# Spacing Validation Script
# Checks for spacing values that aren't divisible by 8 or 4

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TARGET_DIR=${1:-"src"}

echo -e "${GREEN}📏 Spacing Grid Compliance Check${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "📁 Scanning: ${YELLOW}$TARGET_DIR${NC}"
echo ""

VIOLATIONS=0

# Valid spacing values (divisible by 8 or 4)
VALID_SPACING="0 1 2 3 4 5 6 7 8 9 10 11 12 14 16 20 24 28 32 36 40 44 48 52 56 60 64"

check_spacing_file() {
    local file="$1"
    local file_violations=0
    
    echo -e "${YELLOW}📄 Checking: $file${NC}"
    
    # Check for arbitrary spacing values
    if grep -n "[mp][xy]\?-\[\[0-9\]*px\]" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ ARBITRARY SPACING VALUES:${NC}"
        grep -n "[mp][xy]\?-\[\[0-9\]*px\]" "$file" | while IFS=':' read -r line_num content; do
            # Extract the pixel value
            pixel_val=$(echo "$content" | grep -o '\[[0-9]*px\]' | grep -o '[0-9]*')
            if [ ! -z "$pixel_val" ]; then
                remainder_8=$((pixel_val % 8))
                remainder_4=$((pixel_val % 4))
                if [ $remainder_8 -ne 0 ] && [ $remainder_4 -ne 0 ]; then
                    echo -e "    Line $line_num: ${pixel_val}px not divisible by 8 or 4"
                    ((file_violations++))
                fi
            fi
        done
    fi
    
    # Check for non-standard spacing classes
    for spacing in 13 15 17 18 19 21 22 23 25 26 27 29 30 31 33 34 35 37 38 39 41 42 43 45 46 47 49 50 51 53 54 55 57 58 59 61 62 63; do
        if grep -n "[mp][xy]\?-${spacing}\b" "$file" > /dev/null 2>&1; then
            echo -e "  ${RED}❌ INVALID SPACING CLASS:${NC}"
            grep -n "[mp][xy]\?-${spacing}\b" "$file" | while IFS=':' read -r line_num content; do
                echo -e "    Line $line_num: ${spacing} not on 8-point grid"
                ((file_violations++))
            done
        fi
    done
    
    # Check gap values
    for gap in 1 3 5 7 9 11 13 14 15 17 18 19 21 22 23 25 26 27 29 30 31; do
        if grep -n "gap-${gap}\b" "$file" > /dev/null 2>&1; then
            echo -e "  ${RED}❌ INVALID GAP VALUE:${NC}"
            grep -n "gap-${gap}\b" "$file" | while IFS=':' read -r line_num content; do
                echo -e "    Line $line_num: gap-${gap} not on 8-point grid"
                ((file_violations++))
            done
        fi
    done
    
    if [ $file_violations -eq 0 ]; then
        echo -e "  ${GREEN}✅ All spacing values comply with 8-point grid${NC}"
    else
        VIOLATIONS=$((VIOLATIONS + file_violations))
    fi
    
    echo ""
}

# Find and check all relevant files
find "$TARGET_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | while read file; do
    check_spacing_file "$file"
done

echo -e "${GREEN}==================${NC}"
if [ $VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✅ All spacing values comply with 8-point grid!${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $VIOLATIONS spacing violations${NC}"
    echo -e "${YELLOW}💡 Use only spacing values divisible by 8 or 4${NC}"
    echo -e "${YELLOW}💡 Valid classes: p-0, p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12, etc.${NC}"
    exit 1
fi