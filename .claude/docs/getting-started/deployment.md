# Project Deployment Guide

## Overview

This guide shows how to deploy the Design System Law Book to any project. The deployment is completely automated and takes less than 2 minutes.

## Before You Deploy

### Prerequisites
- Design Playbook directory (where you created the system)
- Target project directory (where you want to deploy)
- Basic command line knowledge

### What Gets Deployed
- ✅ Complete `.claude/` system (scripts, templates, workflows)
- ✅ `CLAUDE.md` with full Design System Law Book
- ✅ Project-specific configuration files
- ✅ Package.json scripts (if package.json exists)
- ✅ Git pre-commit hooks (if .git exists)
- ✅ Documentation and examples

## Deployment Steps

### Step 1: Run Deployment Command

From your Design Playbook directory:

```bash
.claude/commands/deploy-to-project.sh /path/to/your/target/project
```

**Examples:**
```bash
# Deploy to a project in your home directory
.claude/commands/deploy-to-project.sh ~/projects/my-ecommerce-app

# Deploy to a work project
.claude/commands/deploy-to-project.sh /Users/john/work/client-website

# Deploy to a relative path
.claude/commands/deploy-to-project.sh ../my-new-app

# Deploy to current directory (if you're in the target project)
.claude/commands/deploy-to-project.sh .
```

### Step 2: Review Deployment Summary

The script shows what it will deploy:

```
🚀 Design System Universal Deployment
=====================================

📁 Target Project: /Users/john/projects/my-app

⚠️  This will deploy the complete Design System Law Book to your project:

  ✅ Complete .claude/ folder (scripts, workflows, templates, commands)
  ✅ CLAUDE.md with full Design System Law Book
  ✅ Configurable token system
  ✅ Validation scripts
  ✅ Component templates
  ✅ Development workflows

Continue? (y/N):
```

Type `y` and press Enter to continue.

### Step 3: Automatic Deployment Process

The script automatically:

1. **Backs up existing files** (if they exist)
2. **Copies complete .claude/ directory**
3. **Copies CLAUDE.md** 
4. **Makes all scripts executable**
5. **Creates project configuration** (`design-config.json`)
6. **Generates project documentation** (`DESIGN-SYSTEM.md`)
7. **Adds npm scripts** (if package.json exists)
8. **Installs git hooks** (if .git repository exists)

### Step 4: Deployment Complete

You'll see a success message:

```
🎉 Design System Law Book deployed successfully!

📋 Deployment Summary:
  ✅ Complete .claude/ system deployed
  ✅ CLAUDE.md with full Design Law Book
  ✅ Project configuration created
  ✅ Scripts made executable
  ✅ Documentation generated
  ✅ Package.json scripts added (if available)
  ✅ Git hooks installed (if git repo)

🎯 Next Steps:

1. Configure Your Brand:
   cd /Users/john/projects/my-app
   Edit design-config.json with your brand colors

2. Generate Design Tokens:
   .claude/commands/generate-tokens.sh

3. Start Development:
   .claude/commands/dev-workflow.sh
```

## Post-Deployment Setup

### Step 1: Configure Your Brand

Navigate to your project and edit the configuration:

```bash
cd /path/to/your/project
nano design-config.json
```

**Default configuration created:**
```json
{
  "project": {
    "name": "My Project",
    "version": "1.0.0",
    "created": "2024-01-18",
    "designSystemVersion": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,        // Blue - change this!
      "saturation": 0.8,
      "lightness": 0.5
    },
    
    "neutralTemperature": "cool",
    "brandPersonality": "professional"
  }
}
```

**Change your primary color:**
```json
{
  "branding": {
    "primaryColor": {
      "hue": 280,        // Purple brand
      "saturation": 0.9, // Very vivid
      "lightness": 0.6   // Medium light
    }
  }
}
```

**Color Reference:**
- **Red**: 0
- **Orange**: 30
- **Yellow**: 60
- **Green**: 140
- **Cyan**: 180
- **Blue**: 220
- **Purple**: 280
- **Pink**: 320

### Step 2: Generate Design Tokens

```bash
.claude/commands/generate-tokens.sh
```

This creates your brand-specific files:
```
src/globals.css              # CSS with your brand colors
src/design-tokens.ts         # TypeScript definitions
globals.css with @theme           # Updated Tailwind config
src/token-usage-examples.tsx # Usage examples
```

### Step 3: Import Tokens in Your App

Add to your main app file:

```typescript
// App.tsx, layout.tsx, _app.tsx, or main.tsx
import './src/globals.css';
```

### Step 4: Verify Deployment

Check that everything works:

```bash
# Test validation
.claude/scripts/design-check.sh src/

# Test component generation
.claude/commands/new-component.sh TestButton button

# Test interactive menu
.claude/commands/dev-workflow.sh
```

## What Gets Created

### File Structure After Deployment

```
your-project/
├── .claude/                    # Complete design system
│   ├── scripts/               # Validation automation
│   │   ├── design-check.sh    # Main validator
│   │   ├── typography-check.sh
│   │   ├── spacing-check.sh
│   │   └── color-check.sh
│   ├── templates/             # Component blueprints
│   │   ├── button-template.tsx
│   │   ├── card-template.tsx
│   │   ├── form-template.tsx
│   │   └── page-template.tsx
│   ├── commands/              # Development tools
│   │   ├── new-component.sh
│   │   ├── generate-tokens.sh
│   │   ├── deploy-to-project.sh
│   │   └── dev-workflow.sh
│   ├── workflows/             # Step-by-step guides
│   ├── docs/                  # This documentation
│   └── settings.json          # AI configuration
├── CLAUDE.md                  # Complete Design System Law Book
├── design-config.json         # Your project configuration
├── .designsystemrc           # System identification
├── DESIGN-SYSTEM.md          # Project-specific docs
└── .git/hooks/pre-commit     # Auto-validation hook
```

### Package.json Scripts (Auto-Added)

If your project has `package.json`, these scripts are added:

```json
{
  "scripts": {
    "design:check": ".claude/scripts/design-check.sh src",
    "design:typography": ".claude/scripts/typography-check.sh src",
    "design:spacing": ".claude/scripts/spacing-check.sh src",
    "design:colors": ".claude/scripts/color-check.sh src",
    "design:generate": ".claude/commands/generate-tokens.sh",
    "design:workflow": ".claude/commands/dev-workflow.sh"
  }
}
```

### Git Hooks (Auto-Installed)

If your project is a git repository, a pre-commit hook is installed:

```bash
#!/bin/bash
# Runs automatically before every commit

echo "🎨 Checking Design System compliance..."

.claude/scripts/design-check.sh src/
if [ $? -ne 0 ]; then
    echo "❌ Design System violations found. Fix before committing."
    exit 1
fi
echo "✅ Design System compliance check passed"
```

## Multiple Project Deployment

### Deploy to Multiple Projects

```bash
# Deploy to several projects at once
.claude/commands/deploy-to-project.sh ~/projects/ecommerce-app
.claude/commands/deploy-to-project.sh ~/projects/marketing-site  
.claude/commands/deploy-to-project.sh ~/projects/admin-dashboard
```

### Each Project Gets:
- ✅ Same design system structure
- ✅ Same validation rules
- ✅ Same component templates
- ✅ Different brand colors (configured per project)
- ✅ Independent token generation

### Project-Specific Customization

**Project A (E-commerce):**
```json
{ "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 } }
```
→ Blue buttons, blue links, blue focus rings

**Project B (Health):**
```json  
{ "primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.4 } }
```
→ Green buttons, green links, green focus rings

**Project C (Creative):**
```json
{ "primaryColor": { "hue": 280, "saturation": 0.9, "lightness": 0.6 } }
```
→ Purple buttons, purple links, purple focus rings

## Updating Existing Deployments

### Update System

Re-run deployment to get latest updates:

```bash
.claude/commands/deploy-to-project.sh /path/to/existing/project
```

The script automatically backs up existing files before updating.

### Update Tokens Only

If you only changed brand colors:

```bash
cd /path/to/project
.claude/commands/generate-tokens.sh
```

### Update Specific Components

Re-generate components with latest templates:

```bash
.claude/commands/new-component.sh MyButton button --force
```

## Troubleshooting Deployment

### Common Issues

**"Permission denied"**
```bash
chmod +x .claude/commands/deploy-to-project.sh
```

**"Directory not found"**
```bash
# Use absolute paths
.claude/commands/deploy-to-project.sh ~/projects/my-app
# Not relative paths that might not exist
```

**"Scripts not executable after deployment"**
```bash
cd /path/to/deployed/project
chmod +x .claude/scripts/*.sh
chmod +x .claude/commands/*.sh
```

**"Tokens not generating"**
```bash
# Make sure bc calculator is installed (for color calculations)
# macOS:
brew install bc

# Linux:
sudo apt-get install bc
```

### Verification Checklist

After deployment, verify:

- [ ] `.claude/` directory exists with all subdirectories
- [ ] `CLAUDE.md` exists and contains the full rule book
- [ ] `design-config.json` exists with project configuration
- [ ] Scripts are executable: `ls -la .claude/scripts/`
- [ ] Token generation works: `.claude/commands/generate-tokens.sh`
- [ ] Component generation works: `.claude/commands/new-component.sh Test button`
- [ ] Validation works: `.claude/scripts/design-check.sh src/`

## Best Practices

### 1. Clean Deployment
- Deploy to clean/new projects when possible
- Back up important files before deployment
- Test in a branch before deploying to main

### 2. Team Deployment
- Deploy to shared repository
- Commit the `.claude/` system to git
- Team members get same system automatically
- Configure brand colors together

### 3. Multiple Projects
- Use consistent project structure
- Keep Design Playbook as master template
- Update all projects when system improves
- Document project-specific configurations

### 4. Continuous Updates
- Re-deploy periodically for system updates
- Keep design-config.json in version control
- Regenerate tokens when brand evolves
- Share improvements across projects

This deployment system ensures every project gets the exact same professional design system with your unique brand colors applied consistently throughout.