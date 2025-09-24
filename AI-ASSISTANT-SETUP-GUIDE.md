# 🤖 AI Assistant Setup Instructions

## For AI Assistants (Claude, GPT, etc.)

When a user asks you to set up the design system environment, follow these exact steps:

### 1. **Environment Check**
```bash
# First, verify the project type
ls -la
# Look for: package.json (React/Next.js), requirements.txt (Python), etc.
```

**If no package.json exists:**
```bash
# Guide user to create React/Next.js project first
npx create-next-app@latest my-project --typescript --tailwind --eslint --app --src-dir
cd my-project
```

### 2. **Run the Boilerplate Script**
```bash
# From the Design Playbook directory
chmod +x setup-design-system.sh
./setup-design-system.sh /path/to/user/project

# Or if script is hosted online:
curl -sSL https://raw.githubusercontent.com/user/design-playbook/main/setup-design-system.sh | bash
```

### 3. **Verify Installation**
After running the script, check these files exist:
- ✅ `src/globals.css` (with design tokens)
- ✅ `components.json` (shadcn/ui config)
- ✅ `src/lib/utils.ts` (utilities)
- ✅ `src/components/ui/button.tsx` (and other shadcn components)
- ✅ `CLAUDE.md` (design system rules)
- ✅ `DESIGN_SYSTEM_CHECKLIST.md`

### 4. **Test the Setup**
```bash
npm run design:check
# Should output: "🎨 Design System Check - All components following rules ✅"
```

### 5. **Show User the Showcase**
Create a simple test page to demonstrate:
```tsx
// pages/design-showcase.tsx or app/design-showcase/page.tsx
import { DesignSystemShowcase } from '@/components/examples/DesignSystemShowcase'

export default function DesignShowcasePage() {
  return <DesignSystemShowcase />
}
```

---

## Standard Response Template

When user requests setup, use this template:

```
I'll set up the complete design system environment for your project. This includes:

🎨 **What will be installed:**
- shadcn/ui with all essential components
- Tailwind v4 with design tokens
- Mulish font (400, 500, 600, 700 weights only)
- 8-point grid system
- Semantic color tokens
- Complete TypeScript configuration

🚀 **Let me run the setup script now:**

[Run the setup-design-system.sh script here]

✅ **Setup complete! Your project now has:**
- Perfect design system compliance
- All shadcn/ui components installed
- Design tokens configured
- Example showcase component
- AI-readable rules in CLAUDE.md

🎯 **Next steps:**
1. Run `npm run design:check` to validate
2. View the showcase at `/design-showcase`
3. Start building with shadcn/ui components
4. Follow the 8pt grid and semantic colors

**Remember:** 
- Always use shadcn/ui as component foundation
- All spacing must be divisible by 8 or 4
- Use only Mulish font with 4 approved weights
- Use semantic colors (bg-primary, text-foreground, bg-muted)
```

---

## Troubleshooting Common Issues

### Issue: "npx shadcn@latest not found"
```bash
# Fix: Update npm and node
npm install -g npm@latest
npm install -g @shadcn/ui@latest
```

### Issue: "Tailwind classes not working"
```bash
# Fix: Ensure globals.css is imported in main app file
# In Next.js: app/globals.css or pages/_app.tsx
# In React: src/index.css or src/App.tsx
import './globals.css'
```

### Issue: "Font not loading"
```bash
# Fix: Verify font import in globals.css
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&display=swap');
```

### Issue: "Components not found"
```bash
# Fix: Check TypeScript path mappings in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue: "Design check fails"
```bash
# Check for common violations:
# 1. Arbitrary spacing values (p-[25px])
# 2. Non-semantic colors (bg-blue-500)
# 3. Wrong font weights (font-light, font-black)
# 4. Off-grid font sizes (text-[22px])
```

---

## Code Generation Rules for AI

When generating components after setup, ALWAYS:

### ✅ **DO:**
```tsx
// Use shadcn/ui components as base
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Use semantic colors
<div className="bg-primary text-primary-foreground">
<p className="text-muted-foreground">
<Button className="bg-secondary text-secondary-foreground">

// Use 8pt grid spacing
<div className="p-6 m-4 gap-8">  // 24px, 16px, 32px
<section className="py-12">       // 48px

// Use Mulish font with approved weights
<h1 className="text-4xl font-bold">      // 700 weight
<p className="text-base font-normal">    // 400 weight
<span className="text-sm font-medium">  // 500 weight

// Use standard button heights
<Button className="h-10 px-6">   // 40px height, 24px padding
<Button className="h-12 px-8">   // 48px height, 32px padding
```

### ❌ **DON'T:**
```tsx
// Never create custom components without shadcn base
<button className="px-4 py-2 bg-blue-500">

// Never use arbitrary spacing
<div className="p-[25px] m-[15px]">

// Never use hardcoded colors
<div className="bg-blue-500 text-white">
<p className="text-gray-600">

// Never use wrong font weights
<h1 className="font-light">    // Use font-normal (400)
<p className="font-black">     // Use font-bold (700)

// Never use arbitrary font sizes
<h1 className="text-[42px]">   // Use text-4xl (40px)

// Never use inline styles
<div style={{padding: '20px'}}>
```

---

## Success Validation

After setup, verify these checkpoints:

```bash
# 1. Check files exist
ls src/globals.css src/lib/utils.ts components.json CLAUDE.md

# 2. Check dependencies
npm list tailwindcss class-variance-authority clsx tailwind-merge lucide-react

# 3. Check components
ls src/components/ui/

# 4. Test build
npm run build

# 5. Verify showcase
# Should show typography scale, buttons, forms, spacing examples
```

**The setup is successful when:**
- All files are created
- Dependencies are installed  
- shadcn/ui components work
- Mulish font is loading
- Design tokens are applied
- Showcase component displays correctly
- Build completes without errors

---

## AI Assistant Workflow

1. **Assessment**: Check if project has package.json
2. **Setup**: Run the boilerplate script
3. **Verification**: Confirm all files and components
4. **Testing**: Create and show showcase component
5. **Documentation**: Point user to CLAUDE.md and checklist
6. **Ongoing**: Always enforce design system rules in future code generation

**Remember**: This setup creates a bulletproof design system foundation. Once installed, every component must follow the rules defined in CLAUDE.md.