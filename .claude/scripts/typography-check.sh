#!/bin/bash

# Typography Validation Script
# Checks for Mulish font compliance and 8-point typography system

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

TARGET_DIR=${1:-"src"}

echo -e "${GREEN}🔤 Typography Compliance Check${NC}"
echo -e "${GREEN}==============================${NC}"
echo -e "📁 Scanning: ${YELLOW}$TARGET_DIR${NC}"
echo ""

VIOLATIONS=0

check_typography_file() {
    local file="$1"
    local file_violations=0
    
    echo -e "${YELLOW}📄 Checking: $file${NC}"
    
    # Check for forbidden font weights
    if grep -nE "font-(thin|extralight|light|extrabold|black)" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ FORBIDDEN FONT WEIGHTS (only 400,500,600,700 allowed):${NC}"
        grep -nE "font-(thin|extralight|light|extrabold|black)" "$file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for forbidden large font sizes
    if grep -nE "text-(6xl|7xl|8xl|9xl)" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ FONT SIZE TOO LARGE (max: text-5xl/48px):${NC}"
        grep -nE "text-(6xl|7xl|8xl|9xl)" "$file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for arbitrary font sizes
    if grep -nE "text-\[[0-9]+px\]" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ ARBITRARY FONT SIZES (use standard classes):${NC}"
        grep -nE "text-\[[0-9]+px\]" "$file" | while IFS=':' read -r line_num content; do
            pixel_val=$(echo "$content" | grep -oE '\[[0-9]+px\]' | grep -oE '[0-9]+')
            if [ ! -z "$pixel_val" ]; then
                case $pixel_val in
                    12) echo -e "    Line $line_num: Use text-xs instead of [$pixel_val px]" ;;
                    14) echo -e "    Line $line_num: Use text-sm instead of [$pixel_val px]" ;;
                    16) echo -e "    Line $line_num: Use text-base instead of [$pixel_val px]" ;;
                    18) echo -e "    Line $line_num: Use text-lg instead of [$pixel_val px]" ;;
                    20) echo -e "    Line $line_num: Use text-xl instead of [$pixel_val px]" ;;
                    24) echo -e "    Line $line_num: Use text-2xl instead of [$pixel_val px]" ;;
                    32) echo -e "    Line $line_num: Use text-3xl instead of [$pixel_val px]" ;;
                    40) echo -e "    Line $line_num: Use text-4xl instead of [$pixel_val px]" ;;
                    48) echo -e "    Line $line_num: Use text-5xl instead of [$pixel_val px]" ;;
                    *) echo -e "    Line $line_num: ${pixel_val}px not on 8-point grid" ;;
                esac
            fi
            ((file_violations++))
        done
    fi
    
    # Check for wrong font family
    if grep -nE "font-(mono|serif)" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ WRONG FONT FAMILY (must use Mulish):${NC}"
        grep -nE "font-(mono|serif)" "$file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for inline font styles
    if grep -nE "style=.*font" "$file" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ INLINE FONT STYLES (use Tailwind classes):${NC}"
        grep -nE "style=.*font" "$file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for non-Mulish font imports (excluding the allowed Google Fonts import)
    if grep -nE "@import.*font" "$file" | grep -v "Mulish" > /dev/null 2>&1; then
        echo -e "  ${RED}❌ NON-MULISH FONT IMPORT:${NC}"
        grep -nE "@import.*font" "$file" | grep -v "Mulish" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
            ((file_violations++))
        done
    fi
    
    # Check for forbidden line heights
    if grep -nE "leading-[13](\s|$|\")" "$file" > /dev/null 2>&1; then
        echo -e "  ${YELLOW}⚠️  TIGHT LINE HEIGHT (may be too small):${NC}"
        grep -nE "leading-[13](\s|$|\")" "$file" | while IFS=':' read -r line_num content; do
            echo -e "    Line $line_num: $content"
        done
    fi
    
    if [ $file_violations -eq 0 ]; then
        echo -e "  ${GREEN}✅ Typography complies with Mulish 8-point system${NC}"
    else
        VIOLATIONS=$((VIOLATIONS + file_violations))
    fi
    
    echo ""
}

# Find and check all relevant files
find "$TARGET_DIR" -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" -o -name "*.css" \) | while read file; do
    check_typography_file "$file"
done

echo -e "${GREEN}==================${NC}"
if [ $VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✅ All typography complies with Design System!${NC}"
    echo -e "${GREEN}📖 Using Mulish with 8-point system${NC}"
    exit 0
else
    echo -e "${RED}❌ Found $VIOLATIONS typography violations${NC}"
    echo -e "${YELLOW}💡 Rules:${NC}"
    echo -e "${YELLOW}   - Font: Mulish only${NC}"
    echo -e "${YELLOW}   - Sizes: text-xs,sm,base,lg,xl,2xl,3xl,4xl,5xl${NC}"
    echo -e "${YELLOW}   - Weights: font-normal,medium,semibold,bold${NC}"
    exit 1
fi