#!/bin/bash

# Update all documentation for Tailwind v4 only
# Replaces old v3 references with v4 syntax

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}📝 Updating Documentation for Tailwind v4 Only${NC}"
echo -e "${BLUE}===============================================${NC}"
echo ""

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DOCS_DIR="$SCRIPT_DIR/../docs"

# Files to update
FILES_TO_UPDATE=(
    "$DOCS_DIR/getting-started/README.md"
    "$DOCS_DIR/getting-started/deployment.md"
    "$DOCS_DIR/configuration/brand-colors.md"
    "$DOCS_DIR/configuration/token-system.md"
    "$DOCS_DIR/configuration/customization.md"
    "$DOCS_DIR/development/commands.md"
    "$DOCS_DIR/development/workflows.md"
    "$DOCS_DIR/validation/troubleshooting.md"
    "$DOCS_DIR/examples/projects.md"
    "$DOCS_DIR/INSTRUCTIONS.md"
)

echo -e "${CYAN}📋 Updating file references...${NC}"

for file in "${FILES_TO_UPDATE[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${YELLOW}Updating: $(basename "$file")${NC}"
        
        # Replace tokens.css with globals.css
        sed -i.backup 's/tokens\.css/globals.css/g' "$file"
        
        # Replace tailwind.config.js references with @theme
        sed -i.backup 's/tailwind\.config\.js/globals.css with @theme/g' "$file"
        
        # Replace old Tailwind imports
        sed -i.backup 's/@tailwind base;/@import "tailwindcss";/g' "$file"
        sed -i.backup 's/@tailwind components;//g' "$file"
        sed -i.backup 's/@tailwind utilities;//g' "$file"
        
        # Update installation instructions
        sed -i.backup 's/npm install tailwindcss/npm install tailwindcss@next/g' "$file"
        
        # Update config references
        sed -i.backup 's/tailwind.config.js - Updated Tailwind config/globals.css - Tailwind v4 with @theme tokens/g' "$file"
        sed -i.backup 's/tailwind.config.js - Updated Tailwind configuration/globals.css - Tailwind v4 configuration/g' "$file"
        
        # Remove .backup file
        rm -f "$file.backup"
        
        echo -e "    ${GREEN}✅ Updated${NC}"
    else
        echo -e "    ${RED}❌ File not found: $file${NC}"
    fi
done

echo ""
echo -e "${CYAN}📋 Adding Tailwind v4 installation notes...${NC}"

# Update the main instructions file with v4 requirements
INSTRUCTIONS_FILE="$DOCS_DIR/INSTRUCTIONS.md"
if [ -f "$INSTRUCTIONS_FILE" ]; then
    # Add v4 installation section if it doesn't exist
    if ! grep -q "Tailwind v4 Installation" "$INSTRUCTIONS_FILE"; then
        cat >> "$INSTRUCTIONS_FILE" << 'EOF'

## Tailwind v4 Installation

This Design System Law Book requires **Tailwind CSS v4** for proper functionality.

### Install Tailwind v4:
```bash
npm install tailwindcss@next
```

### No tailwind.config.js needed!
Tailwind v4 uses `@theme` blocks directly in CSS files instead of JavaScript configuration.

### Your globals.css structure:
```css
@import "tailwindcss";

@theme {
  --color-primary: #3B82F6;
  --spacing-4: 1rem;
  /* All design tokens defined here */
}
```

All your existing Tailwind classes work exactly the same - just the configuration method is different.
EOF
        echo -e "  ${GREEN}✅ Added v4 installation guide${NC}"
    fi
fi

echo ""
echo -e "${CYAN}📋 Creating v4 migration guide...${NC}"

# Create migration guide
cat > "$DOCS_DIR/TAILWIND-V4-MIGRATION.md" << 'EOF'
# Tailwind v4 Migration Guide

The Design System Law Book now uses **Tailwind CSS v4 exclusively**. This guide explains the changes and migration path.

## What Changed

### 1. Configuration Method
**v3 (Old):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6'
      }
    }
  }
}
```

**v4 (New):**
```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary: #3B82F6;
}
```

### 2. CSS Imports
**v3 (Old):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4 (New):**
```css
@import "tailwindcss";
```

### 3. Installation
**v3 (Old):**
```bash
npm install tailwindcss
```

**v4 (New):**
```bash
npm install tailwindcss@next
```

## Migration Steps

### For Existing Projects:

1. **Uninstall old Tailwind:**
```bash
npm uninstall tailwindcss
```

2. **Install Tailwind v4:**
```bash
npm install tailwindcss@next
```

3. **Remove tailwind.config.js:**
```bash
rm tailwind.config.js
```

4. **Update your CSS file:**
Replace your current CSS imports with:
```css
@import "tailwindcss";

@theme {
  /* Your design tokens go here */
}
```

5. **Run token generation:**
```bash
./.claude/commands/generate-tokens.sh
```

### For New Projects:

Just follow the standard deployment process - it now uses v4 by default!

```bash
./.claude/commands/deploy-to-project.sh ~/my-new-project
```

## Benefits of v4

1. **No JavaScript config needed** - everything in CSS
2. **Better performance** - native CSS custom properties
3. **Simpler setup** - fewer files to manage
4. **Same classes** - all your existing Tailwind classes work unchanged
5. **Better TypeScript support** - tokens are real CSS variables

## Troubleshooting

### "Cannot resolve tailwindcss"
Make sure you installed the v4 beta:
```bash
npm install tailwindcss@next
```

### "Invalid @theme syntax"
Ensure you're using `@theme` blocks, not JavaScript config:
```css
@theme {
  --color-primary: #3B82F6;
}
```

### Classes not working
Verify your CSS import is correct:
```css
@import "tailwindcss";
```

All your existing component classes (`bg-primary`, `text-foreground`, etc.) work exactly the same!
EOF

echo -e "${GREEN}✅ Created Tailwind v4 migration guide${NC}"

echo ""
echo -e "${GREEN}🎉 Documentation Update Complete!${NC}"
echo ""
echo -e "${CYAN}Updated files:${NC}"
for file in "${FILES_TO_UPDATE[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✅ $(basename "$file")${NC}"
    fi
done
echo -e "${GREEN}  ✅ TAILWIND-V4-MIGRATION.md (new)${NC}"
echo ""
echo -e "${BLUE}🎨 Your Design System is now Tailwind v4 only!${NC}"