#!/bin/bash

# Automatic Design System Compliance Checker
# Runs validation after every code change and provides instant feedback

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Target directory (default to current directory)
TARGET_DIR=${1:-.}

echo -e "${BLUE}🤖 Auto Design System Compliance Check${NC}"
echo -e "${BLUE}====================================${NC}"
echo ""

# Function to check a single file
check_file() {
    local file="$1"
    local violations=0
    local suggestions=()
    
    echo -e "${CYAN}🔍 Checking: $(basename "$file")${NC}"
    
    # Check for typography violations
    if grep -q "font-\(thin\|light\|extrabold\|black\)" "$file" 2>/dev/null; then
        violations=$((violations + 1))
        suggestions+=("❌ Font weight violation: Use font-normal, font-medium, font-semibold, or font-bold only")
    fi
    
    # Check for oversized text
    if grep -q "text-\(6xl\|7xl\|8xl\|9xl\)" "$file" 2>/dev/null; then
        violations=$((violations + 1))
        suggestions+=("❌ Text size violation: Maximum allowed is text-5xl (48px)")
    fi
    
    # Check for hardcoded colors
    if grep -q "\(bg\|text\)-\(white\|black\|gray-[0-9]\+\)" "$file" 2>/dev/null; then
        violations=$((violations + 1))
        suggestions+=("❌ Color violation: Use semantic tokens (bg-primary, text-foreground, bg-muted)")
    fi
    
    # Check for arbitrary spacing
    if grep -q "\(p\|m\|gap\)-\[[0-9]*px\]" "$file" 2>/dev/null; then
        violations=$((violations + 1))
        suggestions+=("❌ Spacing violation: Use 8-point grid classes (p-4, p-6, p-8, etc.)")
    fi
    
    # Check for non-standard button heights
    if grep -q "h-[0-9]\+" "$file" 2>/dev/null && ! grep -q "h-\(8\|10\|12\|14\)" "$file" 2>/dev/null; then
        if grep -q "button\|Button" "$file" 2>/dev/null; then
            violations=$((violations + 1))
            suggestions+=("❌ Button height violation: Use h-8, h-10, h-12, or h-14 for buttons")
        fi
    fi
    
    # Print results for this file
    if [ $violations -eq 0 ]; then
        echo -e "${GREEN}  ✅ Compliant - No violations found${NC}"
    else
        echo -e "${RED}  ❌ Found $violations violations:${NC}"
        for suggestion in "${suggestions[@]}"; do
            echo -e "    $suggestion"
        done
    fi
    
    echo ""
    return $violations
}

# Function to provide fix suggestions
provide_fixes() {
    echo -e "${CYAN}💡 Quick Fix Guide:${NC}"
    echo -e "${YELLOW}Typography Fixes:${NC}"
    echo -e "  font-thin → font-normal (400)"
    echo -e "  font-light → font-normal (400)" 
    echo -e "  font-extrabold → font-bold (700)"
    echo -e "  font-black → font-bold (700)"
    echo -e "  text-6xl → text-5xl (max 48px)"
    echo ""
    echo -e "${YELLOW}Color Fixes:${NC}"
    echo -e "  bg-white → bg-background"
    echo -e "  bg-black → bg-foreground"
    echo -e "  text-white → text-primary-foreground"
    echo -e "  text-black → text-foreground"
    echo -e "  bg-gray-500 → bg-muted"
    echo -e "  text-gray-600 → text-muted-foreground"
    echo ""
    echo -e "${YELLOW}Spacing Fixes:${NC}"
    echo -e "  p-[25px] → p-6 (24px)"
    echo -e "  m-[15px] → m-4 (16px)"
    echo -e "  gap-[10px] → gap-2 (8px)"
    echo ""
    echo -e "${YELLOW}Component Fixes:${NC}"
    echo -e "  h-9 → h-10 (40px) for buttons"
    echo -e "  h-11 → h-12 (48px) for buttons"
    echo ""
}

# Main checking logic
TOTAL_VIOLATIONS=0
TOTAL_FILES=0

# Find all relevant files
if [ -f "$TARGET_DIR" ]; then
    # Single file check
    if check_file "$TARGET_DIR"; then
        TOTAL_VIOLATIONS=$?
    fi
    TOTAL_FILES=1
else
    # Directory check - find all code files
    while IFS= read -r -d '' file; do
        if [[ "$file" == *.tsx ]] || [[ "$file" == *.jsx ]] || [[ "$file" == *.html ]] || [[ "$file" == *.css ]]; then
            TOTAL_FILES=$((TOTAL_FILES + 1))
            violations=$(check_file "$file" || echo $?)
            if [ "$violations" != "0" ]; then
                TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + violations))
            fi
        fi
    done < <(find "$TARGET_DIR" -type f \( -name "*.tsx" -o -name "*.jsx" -o -name "*.html" -o -name "*.css" \) -print0 2>/dev/null)
fi

# Final summary
echo -e "${BLUE}📊 Compliance Summary${NC}"
echo -e "${BLUE}===================${NC}"
echo -e "Files checked: $TOTAL_FILES"

if [ $TOTAL_VIOLATIONS -eq 0 ]; then
    echo -e "${GREEN}✅ PERFECT COMPLIANCE!"
    echo -e "   All files follow Design System Law Book rules${NC}"
    echo ""
    echo -e "${CYAN}🎉 Great job! Your code is design system compliant.${NC}"
else
    echo -e "${RED}❌ VIOLATIONS FOUND: $TOTAL_VIOLATIONS${NC}"
    echo ""
    provide_fixes
    echo -e "${CYAN}🔧 Run AI validation for detailed suggestions:${NC}"
    echo -e "${YELLOW}   ./.claude/scripts/ai-validation-helper.sh [file]${NC}"
fi

echo ""

# Return exit code based on violations (for CI/CD integration)
exit $TOTAL_VIOLATIONS