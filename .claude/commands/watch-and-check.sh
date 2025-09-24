#!/bin/bash

# File Watcher with Automatic Design System Compliance Checking
# Watches for file changes and runs compliance check automatically

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Target directory to watch (default to current directory)
WATCH_DIR=${1:-"."}

echo -e "${BLUE}👀 Design System File Watcher${NC}"
echo -e "${BLUE}=============================${NC}"
echo ""
echo -e "${CYAN}📁 Watching directory: ${YELLOW}$WATCH_DIR${NC}"
echo -e "${CYAN}🔍 Will auto-check: .tsx, .jsx, .html, .css files${NC}"
echo -e "${CYAN}⏰ Press Ctrl+C to stop watching${NC}"
echo ""

# Check if fswatch is available (better file watching)
if command -v fswatch >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Using fswatch for optimal file monitoring${NC}"
    echo ""
    
    # Use fswatch for efficient file monitoring
    fswatch -o "$WATCH_DIR" --event Created --event Updated --event Renamed | while read num; do
        echo -e "${YELLOW}📝 File change detected - Running compliance check...${NC}"
        echo ""
        "$SCRIPT_DIR/auto-check.sh" "$WATCH_DIR"
        echo -e "${CYAN}⏰ $(date '+%H:%M:%S') - Waiting for next change...${NC}"
        echo ""
    done
    
elif command -v inotifywait >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Using inotifywait for file monitoring${NC}"
    echo ""
    
    # Use inotifywait (Linux)
    while inotifywait -r -e modify,create,move "$WATCH_DIR" 2>/dev/null; do
        echo -e "${YELLOW}📝 File change detected - Running compliance check...${NC}"
        echo ""
        "$SCRIPT_DIR/auto-check.sh" "$WATCH_DIR"
        echo -e "${CYAN}⏰ $(date '+%H:%M:%S') - Waiting for next change...${NC}"
        echo ""
    done
    
else
    echo -e "${YELLOW}⚠️  No file watcher found - using basic polling${NC}"
    echo -e "${YELLOW}   Install fswatch for better performance: brew install fswatch${NC}"
    echo ""
    
    # Fallback: Basic polling method
    LAST_CHECK=$(find "$WATCH_DIR" -name "*.tsx" -o -name "*.jsx" -o -name "*.html" -o -name "*.css" | xargs ls -lt 2>/dev/null | head -1)
    
    while true; do
        sleep 2
        CURRENT_CHECK=$(find "$WATCH_DIR" -name "*.tsx" -o -name "*.jsx" -o -name "*.html" -o -name "*.css" | xargs ls -lt 2>/dev/null | head -1)
        
        if [ "$CURRENT_CHECK" != "$LAST_CHECK" ]; then
            echo -e "${YELLOW}📝 File change detected - Running compliance check...${NC}"
            echo ""
            "$SCRIPT_DIR/auto-check.sh" "$WATCH_DIR"
            echo -e "${CYAN}⏰ $(date '+%H:%M:%S') - Waiting for next change...${NC}"
            echo ""
            LAST_CHECK="$CURRENT_CHECK"
        fi
    done
fi