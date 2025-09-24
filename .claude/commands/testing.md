# Testing Guidelines

## Testing Philosophy

All testing must align with the Design System Law Book and ensure component reliability across the design system.

## Test Structure

### Component Testing Hierarchy
```
tests/
├── components/           # Component-specific tests
│   ├── Button.test.tsx
│   ├── Card.test.tsx
│   └── Form.test.tsx
├── design-system/       # Design system compliance tests
│   ├── typography.test.ts
│   ├── spacing.test.ts
│   └── colors.test.ts
└── integration/         # Full workflow tests
    ├── component-creation.test.ts
    └── design-validation.test.ts
```

## Design System Testing Rules

### Typography Testing
```typescript
describe('Typography Compliance', () => {
  it('should only use Mulish font family', () => {
    const element = render(<MyComponent />);
    expect(element).toHaveStyle({ fontFamily: 'Mulish' });
  });

  it('should only use approved font weights', () => {
    const validWeights = [400, 500, 600, 700];
    const computedStyle = getComputedStyle(element);
    expect(validWeights).toContain(Number(computedStyle.fontWeight));
  });

  it('should use 8-point grid font sizes', () => {
    const validSizes = [12, 14, 16, 18, 20, 24, 32, 40, 48];
    const fontSize = parseInt(getComputedStyle(element).fontSize);
    expect(validSizes).toContain(fontSize);
  });
});
```

### Spacing Testing
```typescript
describe('Spacing Compliance', () => {
  it('should use 8-point grid spacing', () => {
    const element = render(<MyComponent />);
    const padding = getComputedStyle(element).padding;
    
    // Extract padding values and verify they're divisible by 4 or 8
    const paddingValues = extractPaddingValues(padding);
    paddingValues.forEach(value => {
      expect(value % 4 === 0 || value % 8 === 0).toBe(true);
    });
  });

  it('should not use arbitrary spacing values', () => {
    const element = render(<MyComponent className="p-[25px]" />);
    // This should not be allowed - test should catch this
    expect(() => validateSpacing(element)).toThrow();
  });
});
```

### Color Testing
```typescript
describe('Color Compliance', () => {
  it('should only use semantic color tokens', () => {
    const element = render(<MyComponent />);
    const semanticColors = [
      'hsl(var(--background))',
      'hsl(var(--foreground))',
      'hsl(var(--primary))',
      'hsl(var(--muted-foreground))'
    ];
    
    const backgroundColor = getComputedStyle(element).backgroundColor;
    expect(semanticColors.some(color => 
      backgroundColor.includes(color.split('(')[1])
    )).toBe(true);
  });

  it('should not use hardcoded colors', () => {
    const forbiddenPatterns = [
      /rgb\(\d+,\s*\d+,\s*\d+\)/,
      /#[0-9a-fA-F]{3,6}/,
      /white|black/
    ];
    
    const styles = getComputedStyle(element);
    forbiddenPatterns.forEach(pattern => {
      expect(styles.backgroundColor).not.toMatch(pattern);
      expect(styles.color).not.toMatch(pattern);
    });
  });
});
```

## Component Testing Patterns

### Button Component Tests
```typescript
describe('Button Component', () => {
  it('should render with approved heights only', () => {
    const validHeights = [32, 40, 48, 56]; // h-8, h-10, h-12, h-14
    
    validHeights.forEach(height => {
      const { container } = render(<Button size={getSizeForHeight(height)} />);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveStyle({ height: `${height}px` });
    });
  });

  it('should use proper font weights', () => {
    const { container } = render(<Button variant="default" />);
    const button = container.firstChild as HTMLElement;
    
    // Primary buttons should use font-semibold (600)
    expect(getComputedStyle(button).fontWeight).toBe('600');
  });

  it('should maintain 8-point grid padding', () => {
    const validPadding = [16, 24, 32, 48]; // px-4, px-6, px-8, px-12
    
    validPadding.forEach(padding => {
      const { container } = render(
        <Button className={`px-${padding/4}`} />
      );
      const button = container.firstChild as HTMLElement;
      const computedPadding = parseInt(getComputedStyle(button).paddingLeft);
      expect(computedPadding).toBe(padding);
    });
  });
});
```

### Form Component Tests
```typescript
describe('Form Components', () => {
  it('should render inputs with h-10 height (40px)', () => {
    const { container } = render(<FormInput />);
    const input = container.querySelector('input');
    expect(input).toHaveStyle({ height: '40px' });
  });

  it('should use proper label typography', () => {
    const { container } = render(
      <FormField>
        <FormLabel>Email Address</FormLabel>
        <FormInput />
      </FormField>
    );
    
    const label = container.querySelector('label');
    const computedStyle = getComputedStyle(label!);
    
    expect(computedStyle.fontSize).toBe('14px'); // text-sm
    expect(computedStyle.fontWeight).toBe('500'); // font-medium
  });
});
```

## Design System Automation Tests

### Validation Script Tests
```typescript
describe('Design System Scripts', () => {
  it('should catch typography violations', async () => {
    const testFile = createTempFile(`
      <div className="font-light text-6xl">
        Invalid Typography
      </div>
    `);
    
    const result = await runScript('typography-check.sh', testFile);
    expect(result.exitCode).toBe(1);
    expect(result.output).toContain('FONT WEIGHT VIOLATION');
    expect(result.output).toContain('FONT SIZE TOO LARGE');
  });

  it('should catch spacing violations', async () => {
    const testFile = createTempFile(`
      <div className="p-[25px] gap-5">
        Invalid Spacing
      </div>
    `);
    
    const result = await runScript('spacing-check.sh', testFile);
    expect(result.exitCode).toBe(1);
    expect(result.output).toContain('ARBITRARY SPACING');
    expect(result.output).toContain('INVALID GAP VALUE');
  });

  it('should catch color violations', async () => {
    const testFile = createTempFile(`
      <div className="bg-white text-black">
        Invalid Colors
      </div>
    `);
    
    const result = await runScript('color-check.sh', testFile);
    expect(result.exitCode).toBe(1);
    expect(result.output).toContain('HARDCODED BACKGROUND COLORS');
    expect(result.output).toContain('HARDCODED TEXT COLORS');
  });
});
```

## Visual Regression Testing

### Component Visual Tests
```typescript
describe('Visual Regression', () => {
  it('should match design system typography snapshots', async () => {
    const page = await browser.newPage();
    
    await page.setContent(`
      <div style="font-family: Mulish">
        <h1 class="text-5xl font-bold">Hero Title</h1>
        <h2 class="text-3xl font-semibold">Section Title</h2>
        <p class="text-base font-normal">Body text</p>
        <span class="text-sm font-normal">Helper text</span>
      </div>
    `);
    
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot({
      threshold: 0.1,
      customDiffConfig: { threshold: 0.1 }
    });
  });

  it('should maintain 8-point grid spacing visually', async () => {
    const page = await browser.newPage();
    
    await page.setContent(`
      <div class="p-8 space-y-4">
        <div class="p-4 bg-gray-100">Item 1</div>
        <div class="p-6 bg-gray-100">Item 2</div>
        <div class="p-8 bg-gray-100">Item 3</div>
      </div>
    `);
    
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchImageSnapshot();
  });
});
```

## Accessibility Testing

### A11y Design System Tests
```typescript
describe('Accessibility Compliance', () => {
  it('should meet minimum font size requirements', () => {
    const { container } = render(<MyComponent />);
    
    // Body text minimum 16px
    const bodyText = container.querySelector('[class*="text-base"]');
    expect(getComputedStyle(bodyText!).fontSize).toBe('16px');
    
    // Helper text minimum 14px
    const helperText = container.querySelector('[class*="text-sm"]');
    expect(getComputedStyle(helperText!).fontSize).toBe('14px');
  });

  it('should maintain proper color contrast', async () => {
    const { container } = render(<MyComponent />);
    const element = container.firstChild as HTMLElement;
    
    const contrastRatio = await calculateContrastRatio(element);
    expect(contrastRatio).toBeGreaterThan(4.5); // WCAG AA standard
  });

  it('should have proper touch targets (44px minimum)', () => {
    const { container } = render(<Button size="sm" />);
    const button = container.firstChild as HTMLElement;
    
    // Even small buttons should be at least h-8 (32px) for our system
    // But interactive elements should ideally be 44px+
    const height = parseInt(getComputedStyle(button).height);
    expect(height).toBeGreaterThanOrEqual(32);
  });
});
```

## Test Utilities

### Design System Test Helpers
```typescript
// Test utilities for design system validation
export const designSystemTestUtils = {
  // Validate typography
  expectValidTypography: (element: HTMLElement) => {
    const style = getComputedStyle(element);
    
    // Font family
    expect(style.fontFamily).toContain('Mulish');
    
    // Font weight
    const validWeights = ['400', '500', '600', '700'];
    expect(validWeights).toContain(style.fontWeight);
    
    // Font size (8-point grid)
    const validSizes = [12, 14, 16, 18, 20, 24, 32, 40, 48];
    const fontSize = parseInt(style.fontSize);
    expect(validSizes).toContain(fontSize);
  },

  // Validate spacing
  expectValidSpacing: (element: HTMLElement) => {
    const style = getComputedStyle(element);
    
    ['padding', 'margin'].forEach(property => {
      const values = extractSpacingValues(style[property as any]);
      values.forEach(value => {
        expect(value % 4 === 0 || value % 8 === 0).toBe(true);
      });
    });
  },

  // Validate semantic colors
  expectSemanticColors: (element: HTMLElement) => {
    const style = getComputedStyle(element);
    
    // Should use CSS custom properties
    const colorProperties = [style.backgroundColor, style.color];
    colorProperties.forEach(color => {
      if (color && color !== 'rgba(0, 0, 0, 0)') {
        expect(color).toMatch(/var\(--/);
      }
    });
  }
};

// Component generation test helpers
export const componentTestUtils = {
  // Test generated components
  testGeneratedComponent: async (componentName: string, type: string) => {
    await runScript('new-component.sh', componentName, type);
    
    const componentPath = `src/components/${componentName}.tsx`;
    expect(fs.existsSync(componentPath)).toBe(true);
    
    // Run design system validation
    const validation = await runScript('design-check.sh', componentPath);
    expect(validation.exitCode).toBe(0);
  }
};
```

## Integration with CI/CD

### GitHub Actions Example
```yaml
name: Design System Tests

on: [push, pull_request]

jobs:
  design-system-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Run Design System Validation
        run: |
          .claude/scripts/design-check.sh src/
          
      - name: Run Component Tests
        run: npm test -- --testPathPattern="design-system"
        
      - name: Run Visual Regression Tests
        run: npm run test:visual
```

## Test Commands

### NPM Scripts
```json
{
  "scripts": {
    "test": "jest",
    "test:design-system": "jest --testPathPattern=design-system",
    "test:components": "jest --testPathPattern=components",
    "test:visual": "jest --testPathPattern=visual",
    "test:a11y": "jest --testPathPattern=accessibility",
    "validate:design": ".claude/scripts/design-check.sh src/",
    "validate:typography": ".claude/scripts/typography-check.sh src/",
    "validate:spacing": ".claude/scripts/spacing-check.sh src/",
    "validate:colors": ".claude/scripts/color-check.sh src/"
  }
}
```

## Testing Checklist

### Pre-Commit Testing
- [ ] All design system validation scripts pass
- [ ] Component tests pass
- [ ] Typography compliance verified
- [ ] Spacing validation confirmed
- [ ] Color usage validated
- [ ] Accessibility requirements met
- [ ] Visual regression tests pass

### Component Creation Testing
- [ ] Generated component follows templates
- [ ] Design system rules automatically applied
- [ ] Proper TypeScript types included
- [ ] Component exports correctly
- [ ] Validation scripts pass on new component

This testing framework ensures your Design System Law Book is automatically enforced through comprehensive test coverage.