# AI Design System - Quick Reference

## 🚀 Instant Commands

### AI Persona Consultation
```bash
🤝 @TeamConsult [complex question]     # Full team collaboration
🎯 @ProductOwner [business question]   # Strategic decisions  
🎨 @DesignEngineer [technical question] # Implementation guidance
⚙️ @BackendExpert [system question]    # Architecture & performance
📈 @MarketingConsultant [growth question] # Market strategy
⚖️ @ComplianceManager [legal question] # Risk & compliance
👤 @UXManager [user question]          # Experience design
🧠 @BehavioralDoctor [psychology question] # User behavior
```

### Development Commands
```bash
npm run design:check     # Validate compliance
npm run design:watch     # Real-time monitoring
npm run design:auto      # Auto-fix violations
npm run design:tokens    # Generate design tokens
```

## ⚡ Design Rules (Non-Negotiable)

### Typography
- **Font**: Mulish only
- **Weights**: 400, 500, 600, 700 only
- **Sizes**: 12, 14, 16, 18, 20, 24, 32, 40, 48px only
- **Max Size**: text-5xl (48px)

### Spacing
- **Grid**: 8px base unit
- **Allowed**: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96px
- **Classes**: p-1, p-2, p-3, p-4, p-5, p-6, p-8, p-10, p-12, p-16, p-20, p-24
- **Forbidden**: Arbitrary values like p-[25px]

### Colors
- **Use**: bg-primary, text-foreground, bg-background, text-muted-foreground
- **Forbidden**: bg-blue-500, text-gray-600, bg-[#ffffff]

### Components
- **Foundation**: shadcn/ui mandatory
- **Pattern**: Extend, never replace
- **Heights**: h-8, h-10, h-12, h-14 only

## 🎯 Common Use Cases

### New Component
```tsx
// 1. Install shadcn base
npx shadcn@latest add button

// 2. Extend with brand variants  
import { Button } from "@/components/ui/button"
<Button variant="outline" size="lg" className="font-semibold">
  Action
</Button>
```

### Team Decision
```bash
🤝 @TeamConsult 
Should we prioritize mobile-first design or desktop features for Q1 launch?
```

### Technical Question
```bash
🎨 @DesignEngineer 
What's the best way to handle responsive breakpoints in our component API?
```

### Business Question
```bash
🎯 @ProductOwner 
What's the ROI of implementing dark mode vs building new user onboarding?
```

## 🔧 File Structure

```
Design Playbook/
├── CLAUDE.md              # Complete design system rules
├── PLAYBOOK.md            # Strategic overview & impact
├── system-config.json     # Unified configuration
├── QUICK-REFERENCE.md     # This file
└── .claude/               # Automation scripts
```

## ✅ Validation Checklist

Before every commit:
- [ ] Typography uses Mulish with approved weights
- [ ] All spacing on 8px grid
- [ ] Colors use semantic tokens only  
- [ ] Components built on shadcn/ui
- [ ] Run `npm run design:check`

## 🎨 Examples

### Perfect Button
```tsx
<Button className="h-10 px-6 bg-primary text-primary-foreground font-semibold">
  Primary Action
</Button>
```

### Perfect Card
```tsx
<Card className="p-6">
  <CardHeader className="space-y-2">
    <CardTitle className="text-xl font-semibold">Title</CardTitle>
    <CardDescription className="text-sm font-normal">Description</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    <p className="text-base font-normal">Content</p>
  </CardContent>
</Card>
```

### Perfect Form
```tsx
<form className="space-y-6">
  <div className="space-y-2">
    <Label className="text-sm font-medium">Email</Label>
    <Input className="h-10" type="email" />
  </div>
  <Button className="h-12 w-full font-semibold">Submit</Button>
</form>
```

## 🚨 Common Violations

### ❌ Wrong
```tsx
<button style={{padding: '15px'}} className="bg-blue-500">
  Custom Button
</button>

<div className="p-[25px] text-[22px] font-light">
  Content
</div>
```

### ✅ Correct  
```tsx
<Button className="h-10 px-6 bg-primary">
  Standard Button  
</Button>

<div className="p-6 text-xl font-normal">
  Content
</div>
```

---

**Everything you need in one place. For complete details, see CLAUDE.md and PLAYBOOK.md**