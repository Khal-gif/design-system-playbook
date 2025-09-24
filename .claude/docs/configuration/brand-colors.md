# Brand Colors Configuration

Complete guide to configuring your brand identity within the Design System Law Book. Your primary color configuration cascades through the entire system, generating palettes, tokens, and component styling automatically.

## Overview

The system uses a single **primary color** configuration that generates:
- 50-950 color scales (light to dark)
- Semantic color tokens (background, foreground, muted, etc.)
- Component-specific color applications
- Tailwind CSS configuration
- TypeScript definitions

## Basic Configuration

### Edit design-config.json

```json
{
  "project": {
    "name": "Your Project",
    "version": "1.0.0"
  },
  
  "branding": {
    "primaryColor": {
      "hue": 220,        // 0-360: Color on the color wheel
      "saturation": 0.8, // 0-1: Color intensity (0 = gray, 1 = vivid)
      "lightness": 0.5   // 0-1: Color lightness (0 = black, 1 = white)
    }
  }
}
```

### Color Hue Reference

**Primary Colors:**
- **Red**: 0
- **Orange**: 30  
- **Yellow**: 60
- **Green**: 140
- **Cyan**: 180
- **Blue**: 220
- **Purple**: 280
- **Pink**: 320

**Brand Examples:**
```json
// Tech/Professional Blue
"primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 }

// Health/Nature Green  
"primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.4 }

// Creative Purple
"primaryColor": { "hue": 280, "saturation": 0.9, "lightness": 0.6 }

// Energy Orange
"primaryColor": { "hue": 30, "saturation": 0.8, "lightness": 0.55 }

// Finance Red
"primaryColor": { "hue": 0, "saturation": 0.7, "lightness": 0.5 }
```

## Advanced Configuration

### Secondary Color (Optional)

```json
{
  "branding": {
    "primaryColor": {
      "hue": 220,
      "saturation": 0.8,
      "lightness": 0.5
    },
    "secondaryColor": {
      "hue": 280,        // Complementary or accent color
      "saturation": 0.6,
      "lightness": 0.6
    }
  }
}
```

### Neutral Temperature

Controls the temperature of gray colors:

```json
{
  "branding": {
    "neutralTemperature": "cool"    // "cool", "warm", "neutral"
  }
}
```

**Temperature Examples:**
- **"cool"**: Slightly blue-tinted grays (tech, professional)
- **"warm"**: Slightly beige-tinted grays (creative, friendly)
- **"neutral"**: Pure grays (minimal, clean)

### Brand Personality

Affects color intensity and application:

```json
{
  "branding": {
    "brandPersonality": "professional"  // "professional", "playful", "elegant"
  }
}
```

**Personality Effects:**
- **"professional"**: Subdued colors, high contrast
- **"playful"**: Vivid colors, more saturation
- **"elegant"**: Muted colors, sophisticated palette

## Color Generation Process

### 1. Base Color Definition

Your primary color generates a complete scale:

```
Primary Hue: 220 (Blue)
Primary Sat: 0.8
Primary Light: 0.5

Generates:
├── primary-50   (very light)
├── primary-100  (light)
├── primary-200
├── primary-300
├── primary-400
├── primary-500  (your base color)
├── primary-600
├── primary-700
├── primary-800
├── primary-900
└── primary-950  (very dark)
```

### 2. Semantic Token Mapping

Generated colors automatically map to semantic tokens:

```css
/* Your brand blue becomes: */
--primary: hsl(220 80% 50%);
--primary-foreground: hsl(220 80% 98%);

/* Interactive states */
--primary-hover: hsl(220 80% 45%);    /* Slightly darker */
--primary-active: hsl(220 80% 40%);   /* Even darker */

/* Backgrounds */
--primary-50: hsl(220 80% 97%);       /* Very light backgrounds */
--primary-100: hsl(220 80% 94%);      /* Light backgrounds */
```

### 3. Component Integration

All components automatically use your brand colors:

```tsx
// Buttons use your primary color
<Button variant="default">  {/* bg-primary */}
  
// Links use your primary color
<a className="text-primary">

// Focus rings use your primary color
<input className="focus:ring-primary">
```

## Real-World Examples

### E-commerce Brand (Blue)

```json
{
  "branding": {
    "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 },
    "neutralTemperature": "cool",
    "brandPersonality": "professional"
  }
}
```

**Results in:**
- Blue "Add to Cart" buttons
- Blue links and navigation
- Cool gray backgrounds
- Professional, trustworthy feel

### Health/Wellness Brand (Green)

```json
{
  "branding": {
    "primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.45 },
    "neutralTemperature": "warm", 
    "brandPersonality": "professional"
  }
}
```

**Results in:**
- Green call-to-action buttons
- Natural, healthy color palette
- Warm gray supporting colors
- Trustworthy, organic feel

### Creative Agency (Purple)

```json
{
  "branding": {
    "primaryColor": { "hue": 280, "saturation": 0.9, "lightness": 0.6 },
    "neutralTemperature": "cool",
    "brandPersonality": "playful"
  }
}
```

**Results in:**
- Vibrant purple interactive elements
- High saturation, energetic palette
- Cool supporting grays
- Creative, bold personality

## Applying Changes

### 1. Edit Configuration

```bash
cd /path/to/your/project
nano design-config.json
```

### 2. Regenerate Tokens

```bash
.claude/commands/generate-tokens.sh
```

### 3. Restart Development Server

```bash
# Your tokens are now updated
npm run dev
```

### 4. Verify Changes

```bash
# Check that all components use new colors
.claude/scripts/design-check.sh src/
```

## Token Output Examples

### CSS Custom Properties (globals.css)

```css
:root {
  /* Your configured primary color */
  --primary: 220 80% 50%;
  --primary-foreground: 220 80% 98%;
  
  /* Generated scale */
  --primary-50: 220 80% 97%;
  --primary-100: 220 80% 94%;
  --primary-200: 220 80% 87%;
  --primary-300: 220 80% 77%;
  --primary-400: 220 80% 63%;
  --primary-500: 220 80% 50%;  /* Your base */
  --primary-600: 220 80% 40%;
  --primary-700: 220 80% 33%;
  --primary-800: 220 80% 27%;
  --primary-900: 220 80% 23%;
  --primary-950: 220 80% 15%;
}
```

### TypeScript Definitions (design-tokens.ts)

```typescript
export const designTokens = {
  colors: {
    primary: {
      50: 'hsl(220 80% 97%)',
      100: 'hsl(220 80% 94%)', 
      500: 'hsl(220 80% 50%)',  // Your configured color
      900: 'hsl(220 80% 23%)',
      950: 'hsl(220 80% 15%)'
    }
  }
} as const;
```

### Tailwind Configuration (globals.css with @theme)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: 'hsl(var(--primary-50))',
          500: 'hsl(var(--primary-500))',  // Your color
          900: 'hsl(var(--primary-900))'
        }
      }
    }
  }
};
```

## Multi-Project Management

### Same System, Different Colors

**Project A (E-commerce):**
```json
{ "primaryColor": { "hue": 220, "saturation": 0.8, "lightness": 0.5 } }
```

**Project B (Health):**
```json
{ "primaryColor": { "hue": 140, "saturation": 0.7, "lightness": 0.45 } }
```

**Project C (Creative):**
```json
{ "primaryColor": { "hue": 280, "saturation": 0.9, "lightness": 0.6 } }
```

Each project gets the same design system structure with their unique brand colors applied consistently throughout.

### Updating Colors Across Projects

1. **Update master template** (Design Playbook)
2. **Re-deploy to projects** using `deploy-to-project.sh`
3. **Configure each project's colors**
4. **Regenerate tokens** in each project

## Color Accessibility

The system automatically generates accessible color combinations:

### Contrast Ratios
- **Text on primary backgrounds**: Automatically calculated foreground colors
- **Interactive states**: Proper contrast maintained in hover/active states  
- **Focus indicators**: High contrast focus rings

### WCAG Compliance
```css
/* System ensures these meet WCAG AA standards */
.primary-button {
  background: hsl(var(--primary));           /* Your brand color */
  color: hsl(var(--primary-foreground));     /* High contrast text */
}

.primary-button:focus {
  outline: 2px solid hsl(var(--primary));    /* Visible focus ring */
}
```

## Troubleshooting

### Colors Not Updating

```bash
# Regenerate tokens
.claude/commands/generate-tokens.sh

# Restart development server
npm run dev

# Check token files were created
ls -la src/globals.css src/design-tokens.ts
```

### Invalid Color Values

```bash
# Validate configuration
.claude/scripts/design-check.sh design-config.json
```

Common issues:
- **Hue**: Must be 0-360
- **Saturation**: Must be 0-1 (not 0-100)
- **Lightness**: Must be 0-1 (not 0-100)

### Components Not Using Brand Colors

Check that components use semantic tokens:
```tsx
// ✅ Correct - uses semantic tokens
<button className="bg-primary text-primary-foreground">

// ❌ Wrong - hardcoded color
<button className="bg-blue-500 text-white">
```

This brand configuration system ensures every project maintains perfect consistency while expressing your unique brand identity through color.