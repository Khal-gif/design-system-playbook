# API Patterns

## API Design Philosophy

All API patterns must align with the Design System Law Book's consistency principles and provide predictable, type-safe interfaces.

## Component API Patterns

### Design System Component Props

```typescript
// Base props interface following design system constraints
interface DesignSystemProps {
  className?: string;
}

// Typography component props
interface TypographyProps extends DesignSystemProps {
  // Font sizes - only allow approved 8-point grid sizes
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  
  // Font weights - only allow approved Mulish weights
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  
  // Never allow arbitrary font values
  // ❌ fontSize?: number | string;
  // ❌ fontWeight?: number | string;
}

// Spacing component props
interface SpacingProps extends DesignSystemProps {
  // Padding - only allow 8-point grid values
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  
  // Margin - only allow 8-point grid values  
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
  
  // Gap - only allow 8-point grid values
  gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16;
  
  // Never allow arbitrary spacing
  // ❌ padding?: number | string;
  // ❌ margin?: number | string;
}

// Color component props
interface ColorProps extends DesignSystemProps {
  // Background colors - only semantic tokens
  bg?: 'background' | 'card' | 'muted' | 'popover' | 'primary' | 'secondary' | 'destructive' | 'accent';
  
  // Text colors - only semantic tokens
  color?: 'foreground' | 'muted-foreground' | 'card-foreground' | 'popover-foreground' | 'primary-foreground' | 'secondary-foreground' | 'destructive-foreground';
  
  // Never allow hardcoded colors
  // ❌ backgroundColor?: string;
  // ❌ textColor?: string;
}
```

### Button API Pattern

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Variants following design system
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  // Sizes - only approved heights on 8-point grid
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon';
  
  // Controlled rendering
  asChild?: boolean;
  
  // Standard HTML props
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  
  // Never allow arbitrary sizing
  // ❌ height?: number | string;
  // ❌ width?: number | string;
  // ❌ fontSize?: number | string;
}

// Usage example with type safety
const MyButton: React.FC<ButtonProps> = ({ 
  variant = 'default', 
  size = 'default',
  children,
  ...props 
}) => {
  return (
    <Button 
      variant={variant}  // ✅ Type-safe, design system compliant
      size={size}        // ✅ Only allows approved sizes
      className={cn(
        // Base classes enforcing design system
        "font-sans",     // ✅ Mulish font
        // Font weight determined by variant automatically
        variant === 'default' && "font-semibold",
        variant === 'outline' && "font-medium",
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
```

### Form Component API Pattern

```typescript
interface FormFieldProps extends DesignSystemProps {
  // Required accessibility
  label: string;
  id: string;
  
  // Optional helper text
  description?: string;
  error?: string;
  
  // Visual state
  required?: boolean;
  disabled?: boolean;
  
  // Never allow custom sizing - enforce h-10 standard
  // ❌ height?: number | string;
}

interface FormInputProps extends 
  React.InputHTMLAttributes<HTMLInputElement>, 
  FormFieldProps {
  
  // Input-specific props
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  
  // Always enforce design system height
  // height is controlled by component, not props
}

interface FormTextareaProps extends 
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  FormFieldProps {
  
  // Textarea-specific props
  rows?: number;
  
  // Enforce minimum height but allow growth
  // minHeight controlled by component
}

// Implementation with design system enforcement
const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  description,
  error,
  required,
  disabled,
  className,
  ...props
}) => {
  return (
    <FormField className="space-y-2"> {/* 8px gap */}
      <FormLabel 
        htmlFor={id}
        className="text-sm font-medium" // 14px, 500 weight - design system compliant
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </FormLabel>
      
      <FormInputElement
        id={id}
        className={cn(
          // Enforce design system classes
          "font-sans",           // Mulish font
          "h-10",               // 40px height - design system standard
          "text-base",          // 16px font size
          "font-normal",        // 400 weight
          "px-3 py-2",         // 12px horizontal, 8px vertical - 8-point grid
          disabled && "opacity-50",
          error && "border-destructive",
          className
        )}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={description ? `${id}-description` : undefined}
        {...props}
      />
      
      {description && (
        <FormDescription 
          id={`${id}-description`}
          className="text-xs font-normal text-muted-foreground" // 12px helper text
        >
          {description}
        </FormDescription>
      )}
      
      {error && (
        <FormMessage className="text-xs font-medium text-destructive">
          {error}
        </FormMessage>
      )}
    </FormField>
  );
};
```

### Card Component API Pattern

```typescript
interface CardProps extends DesignSystemProps {
  // Card variants
  variant?: 'default' | 'outlined' | 'elevated';
  
  // Padding options - only 8-point grid values
  padding?: 'none' | 'sm' | 'default' | 'lg';
  
  // Content structure
  children: React.ReactNode;
  
  // Never allow arbitrary padding
  // ❌ customPadding?: number | string;
}

interface CardHeaderProps extends DesignSystemProps {
  children: React.ReactNode;
  
  // Spacing between title and description
  spacing?: 'sm' | 'default';
}

interface CardTitleProps extends DesignSystemProps {
  // Heading level for accessibility
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  // Size controlled by design system
  // Always text-xl font-semibold for card titles
  children: React.ReactNode;
}

interface CardDescriptionProps extends DesignSystemProps {
  children: React.ReactNode;
  
  // Always text-sm font-normal text-muted-foreground
}

// Implementation enforcing design system
const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  padding = 'default',
  children,
  className,
  ...props 
}) => {
  return (
    <div
      className={cn(
        // Base card styles
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        
        // Padding options - all on 8-point grid
        padding === 'none' && "p-0",
        padding === 'sm' && "p-4",     // 16px
        padding === 'default' && "p-6", // 24px
        padding === 'lg' && "p-8",     // 32px
        
        // Variant styles
        variant === 'outlined' && "border-2",
        variant === 'elevated' && "shadow-md",
        
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  spacing = 'default',
  className,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "flex flex-col",
        spacing === 'sm' && "space-y-1",    // 4px gap
        spacing === 'default' && "space-y-2", // 8px gap - design system standard
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ 
  as: Comp = 'h3',
  children,
  className,
  ...props 
}) => {
  return (
    <Comp
      className={cn(
        // Design system typography for card titles
        "font-sans text-xl font-semibold leading-none tracking-tight", // 20px, 600 weight
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
```

## API Validation Patterns

### Runtime Validation

```typescript
// Design system prop validators
const validateSpacing = (value: unknown): boolean => {
  const validSpacingValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64];
  return typeof value === 'number' && validSpacingValues.includes(value);
};

const validateTypography = (size?: string, weight?: string): boolean => {
  const validSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
  const validWeights = ['normal', 'medium', 'semibold', 'bold'];
  
  return (
    (!size || validSizes.includes(size)) &&
    (!weight || validWeights.includes(weight))
  );
};

const validateSemanticColor = (color?: string): boolean => {
  const validColors = [
    'background', 'card', 'muted', 'popover',
    'primary', 'secondary', 'destructive', 'accent',
    'foreground', 'muted-foreground', 'card-foreground', 'popover-foreground'
  ];
  
  return !color || validColors.includes(color);
};

// Component with validation
const ValidatedButton: React.FC<ButtonProps> = (props) => {
  // Runtime validation in development
  if (process.env.NODE_ENV === 'development') {
    if (props.size && !['sm', 'default', 'lg', 'xl', 'icon'].includes(props.size)) {
      console.error(`Invalid button size: ${props.size}. Must be one of: sm, default, lg, xl, icon`);
    }
    
    if (props.variant && !['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'].includes(props.variant)) {
      console.error(`Invalid button variant: ${props.variant}`);
    }
  }
  
  return <Button {...props} />;
};
```

### TypeScript Utility Types

```typescript
// Design system utility types
type SpacingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24;
type TypographySize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type SemanticColor = 
  | 'background' | 'card' | 'muted' | 'popover'
  | 'primary' | 'secondary' | 'destructive' | 'accent'
  | 'foreground' | 'muted-foreground' | 'card-foreground' | 'popover-foreground';

// Generic design system props
type WithSpacing<T = {}> = T & {
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
};

type WithTypography<T = {}> = T & {
  size?: TypographySize;
  weight?: TypographyWeight;
};

type WithSemanticColors<T = {}> = T & {
  bg?: SemanticColor;
  color?: SemanticColor;
};

// Compose design system props
type DesignSystemComponent<T = {}> = WithSpacing<WithTypography<WithSemanticColors<T>>>;

// Usage example
interface MyComponentProps extends DesignSystemComponent<{
  title: string;
  description?: string;
}> {}

const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  description,
  size = 'base',
  weight = 'normal',
  p = 4,
  bg = 'card'
}) => {
  return (
    <div className={cn(
      `p-${p}`,
      `bg-${bg}`,
      `text-${size}`,
      `font-${weight}`
    )}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};
```

## API Documentation Patterns

### Component API Documentation

```typescript
/**
 * Button Component
 * 
 * A design system compliant button component that enforces:
 * - Mulish typography with approved weights
 * - 8-point grid sizing (h-8, h-10, h-12, h-14)
 * - Semantic color usage
 * 
 * @example
 * ```tsx
 * // Primary button (default)
 * <Button size="default">Save Changes</Button>
 * 
 * // Secondary button
 * <Button variant="outline" size="lg">Cancel</Button>
 * 
 * // Small button for compact spaces
 * <Button variant="secondary" size="sm">Edit</Button>
 * ```
 */
interface ButtonProps {
  /**
   * Button appearance variant
   * 
   * - `default`: Primary button (bg-primary, font-semibold)
   * - `destructive`: Dangerous actions (bg-destructive, font-semibold)  
   * - `outline`: Secondary button (border, font-medium)
   * - `secondary`: Alternative button (bg-secondary, font-medium)
   * - `ghost`: Minimal button (font-medium)
   * - `link`: Text link style (font-medium)
   * 
   * @default "default"
   */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  
  /**
   * Button size following 8-point grid
   * 
   * - `sm`: 32px height (h-8), 14px text
   * - `default`: 40px height (h-10), 16px text  
   * - `lg`: 48px height (h-12), 16px text
   * - `xl`: 56px height (h-14), 18px text
   * - `icon`: 40x40px square for icons
   * 
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon';
  
  /**
   * Whether to render as a child component
   * Useful for rendering as Link or other components
   */
  asChild?: boolean;
}
```

### API Change Management

```typescript
// Version-aware API patterns
interface ButtonPropsV1 {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

interface ButtonPropsV2 extends Omit<ButtonPropsV1, 'variant' | 'size'> {
  /**
   * @deprecated Use `variant` instead. Will be removed in v3.0
   */
  type?: 'primary' | 'secondary';
  
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'icon';
}

// Migration helper
const migrateButtonProps = (props: ButtonPropsV1): ButtonPropsV2 => {
  const { variant: oldVariant, size: oldSize, ...rest } = props;
  
  return {
    ...rest,
    variant: oldVariant === 'primary' ? 'default' : 'secondary',
    size: oldSize === 'small' ? 'sm' : oldSize === 'large' ? 'lg' : 'default'
  };
};
```

## API Testing Patterns

```typescript
describe('Button API', () => {
  it('should only accept valid variants', () => {
    const validVariants = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'];
    
    validVariants.forEach(variant => {
      expect(() => {
        render(<Button variant={variant as any}>Test</Button>);
      }).not.toThrow();
    });
    
    // TypeScript should catch invalid variants at compile time
    // Runtime validation for development mode
    expect(() => {
      // @ts-expect-error - Testing invalid variant
      render(<Button variant="invalid">Test</Button>);
    }).not.toThrow(); // Component should render but warn in development
  });
  
  it('should enforce 8-point grid sizing', () => {
    const sizeMap = {
      sm: 32,     // h-8
      default: 40, // h-10
      lg: 48,     // h-12
      xl: 56      // h-14
    };
    
    Object.entries(sizeMap).forEach(([size, expectedHeight]) => {
      const { container } = render(<Button size={size as any}>Test</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button).toHaveStyle({ height: `${expectedHeight}px` });
    });
  });
});
```

This API pattern system ensures type safety, design system compliance, and predictable component behavior while maintaining flexibility for future enhancements.