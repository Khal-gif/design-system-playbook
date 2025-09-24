#!/bin/bash

# Project Sync System
# Syncs Design System updates to all deployed projects while preserving project-specific configs

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Get the script directory (Design Playbook location)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DESIGN_PLAYBOOK_DIR="$( cd "$SCRIPT_DIR/../.." && pwd )"

echo -e "${BLUE}🔄 Design System Project Sync${NC}"
echo -e "${BLUE}=============================${NC}"
echo ""

# Function to check if directory is a Design System project
is_design_system_project() {
    local dir="$1"
    [ -f "$dir/.claude/settings.json" ] && [ -f "$dir/CLAUDE.md" ] && [ -f "$dir/design-config.json" ]
}

# Function to backup project-specific files
backup_project_files() {
    local project_dir="$1"
    local backup_dir="$project_dir/.claude/backup-$(date +%Y%m%d-%H%M%S)"
    
    echo -e "  ${CYAN}📋 Creating backup...${NC}"
    mkdir -p "$backup_dir"
    
    # Backup project-specific files
    [ -f "$project_dir/design-config.json" ] && cp "$project_dir/design-config.json" "$backup_dir/"
    [ -f "$project_dir/src/globals.css" ] && cp "$project_dir/src/globals.css" "$backup_dir/"
    [ -d "$project_dir/src/components" ] && cp -r "$project_dir/src/components" "$backup_dir/" 2>/dev/null || true
    
    echo -e "  ${GREEN}✅ Backup created: $(basename "$backup_dir")${NC}"
}

# Function to sync core system files
sync_core_files() {
    local project_dir="$1"
    
    echo -e "  ${CYAN}📋 Syncing core system files...${NC}"
    
    # Sync CLAUDE.md (always update - contains latest rules)
    cp "$DESIGN_PLAYBOOK_DIR/CLAUDE.md" "$project_dir/"
    echo -e "    ${GREEN}✅ CLAUDE.md${NC}"
    
    # Sync .claude/settings.json
    cp "$DESIGN_PLAYBOOK_DIR/.claude/settings.json" "$project_dir/.claude/"
    echo -e "    ${GREEN}✅ .claude/settings.json${NC}"
    
    # Sync all scripts
    cp "$DESIGN_PLAYBOOK_DIR/.claude/scripts/"* "$project_dir/.claude/scripts/" 2>/dev/null || true
    echo -e "    ${GREEN}✅ .claude/scripts/${NC}"
    
    # Sync all commands (including new ds shortcuts)
    cp "$DESIGN_PLAYBOOK_DIR/.claude/commands/"* "$project_dir/.claude/commands/" 2>/dev/null || true
    echo -e "    ${GREEN}✅ .claude/commands/${NC}"
    
    # Sync documentation
    cp -r "$DESIGN_PLAYBOOK_DIR/.claude/docs" "$project_dir/.claude/" 2>/dev/null || true
    echo -e "    ${GREEN}✅ .claude/docs/${NC}"
    
    # Sync templates
    cp -r "$DESIGN_PLAYBOOK_DIR/.claude/templates" "$project_dir/.claude/" 2>/dev/null || true
    echo -e "    ${GREEN}✅ .claude/templates/${NC}"
    
    # Make all scripts executable
    find "$project_dir/.claude" -name "*.sh" -exec chmod +x {} \; 2>/dev/null || true
    echo -e "    ${GREEN}✅ Made all scripts executable${NC}"
}

# Function to update tokens while preserving brand colors
update_tokens() {
    local project_dir="$1"
    
    echo -e "  ${CYAN}📋 Updating design tokens...${NC}"
    
    if [ -f "$project_dir/design-config.json" ]; then
        # Run token generation to update with latest format
        cd "$project_dir"
        if [ -f ".claude/commands/generate-tokens.sh" ]; then
            ./.claude/commands/generate-tokens.sh
            echo -e "    ${GREEN}✅ Tokens regenerated with latest format${NC}"
        else
            echo -e "    ${YELLOW}⚠️  Token generator not found${NC}"
        fi
        cd - > /dev/null
    else
        echo -e "    ${YELLOW}⚠️  No design-config.json found${NC}"
    fi
}

# Function to update package.json scripts
update_package_scripts() {
    local project_dir="$1"
    
    echo -e "  ${CYAN}📋 Updating package.json scripts...${NC}"
    
    if [ -f "$project_dir/package.json" ]; then
        # Add new design system scripts
        cd "$project_dir"
        node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.scripts = pkg.scripts || {};
        
        // Add new scripts (preserve existing ones)
        pkg.scripts['design:check'] = pkg.scripts['design:check'] || './.claude/scripts/design-check.sh src/';
        pkg.scripts['design:auto'] = './.claude/commands/auto-check.sh';
        pkg.scripts['design:watch'] = './.claude/commands/watch-and-check.sh';
        pkg.scripts['design:ai'] = './.claude/scripts/ai-validation-helper.sh';
        pkg.scripts['design:tokens'] = './.claude/commands/generate-tokens.sh';
        pkg.scripts['design:component'] = './.claude/commands/new-component.sh';
        
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
        " 2>/dev/null && echo -e "    ${GREEN}✅ Package.json scripts updated${NC}" || echo -e "    ${YELLOW}⚠️  Node.js not available${NC}"
        cd - > /dev/null
    else
        echo -e "    ${YELLOW}⚠️  No package.json found${NC}"
    fi
}

# Function to sync a single project
sync_project() {
    local project_dir="$1"
    
    echo -e "${PURPLE}📁 Syncing: ${YELLOW}$(basename "$project_dir")${NC}"
    echo -e "   Path: $project_dir"
    
    # Create backup
    backup_project_files "$project_dir"
    
    # Sync core files
    sync_core_files "$project_dir"
    
    # Update tokens
    update_tokens "$project_dir"
    
    # Update package.json
    update_package_scripts "$project_dir"
    
    echo -e "   ${GREEN}✅ Project synced successfully${NC}"
    echo ""
}

# Main execution
if [ $# -eq 0 ]; then
    # Auto-discover projects
    echo -e "${CYAN}🔍 Auto-discovering Design System projects...${NC}"
    echo ""
    
    PROJECT_COUNT=0
    COMMON_LOCATIONS=(
        "$HOME/Desktop"
        "$HOME/Documents"
        "$HOME/projects"
        "$HOME/work"
        "$HOME/dev"
    )
    
    for location in "${COMMON_LOCATIONS[@]}"; do
        if [ -d "$location" ]; then
            echo -e "${CYAN}🔍 Searching in: $location${NC}"
            
            # Find projects (max depth 2 to avoid deep scanning)
            while IFS= read -r -d '' dir; do
                if is_design_system_project "$dir"; then
                    echo -e "  ${GREEN}Found: $(basename "$dir")${NC}"
                    sync_project "$dir"
                    PROJECT_COUNT=$((PROJECT_COUNT + 1))
                fi
            done < <(find "$location" -maxdepth 2 -name ".claude" -type d -exec dirname {} \; -print0 2>/dev/null)
        fi
    done
    
    if [ $PROJECT_COUNT -eq 0 ]; then
        echo -e "${YELLOW}⚠️  No Design System projects found in common locations${NC}"
        echo ""
        echo -e "${CYAN}Manual usage:${NC}"
        echo -e "${YELLOW}  $0 /path/to/project1 /path/to/project2${NC}"
        echo ""
        echo -e "${CYAN}To sync a specific project:${NC}"
        echo -e "${YELLOW}  $0 ~/Desktop/my-landing-page${NC}"
    else
        echo -e "${GREEN}🎉 Sync Complete!${NC}"
        echo -e "${CYAN}📊 Projects synced: ${YELLOW}$PROJECT_COUNT${NC}"
    fi
    
else
    # Sync specific projects provided as arguments
    echo -e "${CYAN}📋 Syncing specified projects...${NC}"
    echo ""
    
    for project_path in "$@"; do
        if [ ! -d "$project_path" ]; then
            echo -e "${RED}❌ Directory not found: $project_path${NC}"
            continue
        fi
        
        if ! is_design_system_project "$project_path"; then
            echo -e "${RED}❌ Not a Design System project: $project_path${NC}"
            echo -e "   ${YELLOW}(Missing .claude/settings.json, CLAUDE.md, or design-config.json)${NC}"
            continue
        fi
        
        sync_project "$project_path"
    done
    
    echo -e "${GREEN}🎉 Sync Complete!${NC}"
fi

echo ""
echo -e "${BLUE}📋 What was synced:${NC}"
echo -e "${GREEN}  ✅ CLAUDE.md (latest rules and automation)${NC}"
echo -e "${GREEN}  ✅ All .claude/ scripts and commands${NC}"
echo -e "${GREEN}  ✅ ds shortcut system${NC}"
echo -e "${GREEN}  ✅ auto-check and watch capabilities${NC}"
echo -e "${GREEN}  ✅ Updated documentation${NC}"
echo -e "${GREEN}  ✅ Design tokens (regenerated with latest format)${NC}"
echo -e "${GREEN}  ✅ Package.json scripts${NC}"
echo ""
echo -e "${CYAN}📋 Preserved:${NC}"
echo -e "${YELLOW}  🔒 Your design-config.json (brand colors)${NC}"
echo -e "${YELLOW}  🔒 Your custom components${NC}"
echo -e "${YELLOW}  🔒 Project-specific files${NC}"
echo -e "${YELLOW}  🔒 Backups created in .claude/backup-*${NC}"
echo ""
echo -e "${BLUE}🚀 Your projects now have all the latest Design System features!${NC}"