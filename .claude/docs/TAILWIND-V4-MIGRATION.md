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
