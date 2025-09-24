# Component Examples

Complete examples of components built with the Design System Law Book, showing proper implementation of typography, spacing, colors, and structure.

## Button Components

### Primary Button
```tsx
// ✅ Compliant Implementation
const ButtonPrimary = ({ children, size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',      // 32px height, 8-point grid padding
    md: 'h-10 px-6 text-base',   // 40px height, standard
    lg: 'h-12 px-8 text-lg',     // 48px height, larger padding
    xl: 'h-14 px-10 text-xl'     // 56px height, maximum size
  }

  return (
    <button
      className={`
        font-sans font-semibold                    // Typography: Mulish, 600 weight
        ${sizeClasses[size]}                       // Component: standard heights
        bg-primary text-primary-foreground         // Colors: semantic tokens
        rounded-base shadow-sm                     // Styling: 8px radius, subtle shadow
        hover:bg-primary/90                        // Interaction: semantic hover
        focus-visible:ring-2 focus-visible:ring-primary  // A11y: focus states
        disabled:opacity-50 disabled:pointer-events-none  // States: proper disabled
        transition-colors duration-200             // Animation: smooth transitions
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// Usage Examples
<ButtonPrimary size="sm">Small Action</ButtonPrimary>
<ButtonPrimary size="md">Primary Action</ButtonPrimary>
<ButtonPrimary size="lg">Important Action</ButtonPrimary>
```

### Secondary Button
```tsx
// ✅ Compliant Implementation
const ButtonSecondary = ({ children, size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-10 px-6 text-base',
    lg: 'h-12 px-8 text-lg'
  }

  return (
    <button
      className={`
        font-sans font-medium                      // Typography: Mulish, 500 weight
        ${sizeClasses[size]}                       // Component: standard heights
        bg-secondary text-secondary-foreground     // Colors: semantic secondary
        border border-border                       // Border: semantic border color
        rounded-base shadow-sm                     // Styling: consistent with primary
        hover:bg-secondary/80                      // Interaction: semantic hover
        focus-visible:ring-2 focus-visible:ring-ring  // A11y: ring color
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

### Outline Button
```tsx
// ✅ Compliant Implementation
const ButtonOutline = ({ children, size = 'md', ...props }) => {
  const sizeClasses = {
    sm: 'h-8 px-4 text-sm',
    md: 'h-10 px-6 text-base',
    lg: 'h-12 px-8 text-lg'
  }

  return (
    <button
      className={`
        font-sans font-medium                      // Typography: Mulish, 500 weight
        ${sizeClasses[size]}                       // Component: standard heights
        bg-transparent text-foreground             // Colors: transparent with text
        border-2 border-primary                    // Border: primary color, 2px
        rounded-base                               // Styling: consistent radius
        hover:bg-primary hover:text-primary-foreground  // Interaction: fill on hover
        focus-visible:ring-2 focus-visible:ring-primary  // A11y: focus states
      `}
      {...props}
    >
      {children}
    </button>
  )
}
```

---

## Form Components

### Text Input
```tsx
// ✅ Compliant Implementation
const TextInput = ({ label, error, className, ...props }) => {
  return (
    <div className="space-y-2">                   {/* Spacing: 8px gap */}
      {label && (
        <label className="
          text-sm font-medium                      // Typography: 14px, 500 weight
          text-foreground                          // Color: semantic text
        ">
          {label}
        </label>
      )}
      <input
        className={`
          font-sans font-normal                    // Typography: Mulish, 400 weight
          h-10 px-4 text-base                      // Size: 40px height, 16px padding
          bg-background text-foreground            // Colors: semantic background/text
          border border-input                      // Border: semantic input border
          rounded-base                             // Styling: 8px border radius
          placeholder:text-muted-foreground        // Placeholder: muted semantic
          focus-visible:ring-2 focus-visible:ring-ring  // Focus: semantic ring
          focus-visible:border-primary             // Focus: primary border
          disabled:opacity-50                      // State: proper disabled
          ${error ? 'border-destructive ring-destructive/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="
          text-xs font-normal                      // Typography: 12px, 400 weight
          text-destructive                         // Color: semantic error
        ">
          {error}
        </p>
      )}
    </div>
  )
}

// Usage Examples
<TextInput label="Email Address" placeholder="Enter your email" />
<TextInput label="Password" type="password" />
<TextInput label="Username" error="Username is already taken" />
```

### Select Dropdown
```tsx
// ✅ Compliant Implementation
const Select = ({ label, options, className, ...props }) => {
  return (
    <div className="space-y-2">                   {/* Spacing: 8px gap */}
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        className={`
          font-sans font-normal                    // Typography: Mulish, 400 weight
          h-10 px-4 text-base                      // Size: consistent with inputs
          bg-background text-foreground            // Colors: semantic tokens
          border border-input rounded-base         // Border: semantic with radius
          focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:border-primary
          ${className}
        `}
        {...props}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
```

---

## Card Components

### Basic Card
```tsx
// ✅ Compliant Implementation
const Card = ({ title, children, className }) => {
  return (
    <div className={`
      bg-card text-card-foreground              // Colors: semantic card colors
      border border-border                      // Border: semantic border
      rounded-lg shadow-sm                      // Styling: 12px radius, subtle shadow
      p-6                                       // Padding: 24px (8-point grid)
      space-y-4                                 // Content spacing: 16px gaps
      ${className}
    `}>
      {title && (
        <h3 className="
          font-sans font-semibold text-xl        // Typography: Mulish, 600, 20px
          text-card-foreground                   // Color: semantic card text
        ">
          {title}
        </h3>
      )}
      <div className="text-base text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

// Usage Examples
<Card title="User Profile">
  <p>Manage your account settings and preferences.</p>
</Card>
```

### Product Card (E-commerce)
```tsx
// ✅ Compliant Implementation
const ProductCard = ({ product }) => {
  return (
    <div className="
      bg-card border border-border rounded-lg   // Card structure
      overflow-hidden shadow-sm                 // Styling
      hover:shadow-md transition-shadow         // Interaction
    ">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-48 object-cover"     // Image: consistent height
      />
      <div className="p-6 space-y-4">           {/* Content: 24px padding, 16px gaps */}
        <h3 className="
          font-sans font-semibold text-lg        // Typography: Mulish, 600, 18px
          text-card-foreground
        ">
          {product.name}
        </h3>
        <p className="
          text-sm text-muted-foreground          // Typography: 14px, muted
          line-clamp-2
        ">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="
            font-sans font-bold text-xl          // Typography: Mulish, 700, 20px
            text-primary                         // Color: brand primary
          ">
            ${product.price}
          </span>
          <ButtonPrimary size="sm">
            Add to Cart
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}
```

---

## Navigation Components

### Header Navigation
```tsx
// ✅ Compliant Implementation
const Header = ({ logo, navigation, actions }) => {
  return (
    <header className="
      bg-background border-b border-border      // Background: semantic with border
      sticky top-0 z-50                        // Position: sticky header
    ">
      <div className="
        max-w-7xl mx-auto px-6                  // Container: centered, 24px padding
        h-16                                    // Height: 64px (8-point grid)
        flex items-center justify-between       // Layout: space between
      ">
        {/* Logo */}
        <div className="flex items-center space-x-4">  {/* Logo area: 16px gap */}
          <img src={logo} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">     {/* Nav: 32px gaps */}
          {navigation.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="
                font-sans font-medium text-base       // Typography: Mulish, 500, 16px
                text-foreground hover:text-primary    // Color: semantic with hover
                transition-colors duration-200        // Animation: smooth transition
              "
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">  {/* Actions: 16px gap */}
          {actions}
        </div>
      </div>
    </header>
  )
}
```

---

## Layout Components

### Page Layout
```tsx
// ✅ Compliant Implementation
const PageLayout = ({ children, sidebar }) => {
  return (
    <div className="min-h-screen bg-background">    {/* Full height, semantic bg */}
      <div className="
        max-w-7xl mx-auto                           // Container: centered
        grid grid-cols-1 lg:grid-cols-4             // Grid: responsive columns
        gap-8                                       // Gap: 32px (8-point grid)
        p-6                                         // Padding: 24px all sides
      ">
        {/* Main Content */}
        <main className="lg:col-span-3 space-y-8"> {/* Content: 32px vertical gaps */}
          {children}
        </main>

        {/* Sidebar */}
        {sidebar && (
          <aside className="lg:col-span-1 space-y-6"> {/* Sidebar: 24px gaps */}
            {sidebar}
          </aside>
        )}
      </div>
    </div>
  )
}
```

### Content Section
```tsx
// ✅ Compliant Implementation
const ContentSection = ({ title, description, children, className }) => {
  return (
    <section className={`space-y-6 ${className}`}>  {/* Section: 24px gaps */}
      {title && (
        <div className="space-y-2">                  {/* Header: 8px gap */}
          <h2 className="
            font-sans font-bold text-3xl             // Typography: Mulish, 700, 32px
            text-foreground                          // Color: semantic text
          ">
            {title}
          </h2>
          {description && (
            <p className="
              text-lg text-muted-foreground          // Typography: 18px, muted
              max-w-3xl                              // Width: readable line length
            ">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="space-y-4">                   {/* Content: 16px gaps */}
        {children}
      </div>
    </section>
  )
}
```

---

## Common Patterns

### Loading States
```tsx
// ✅ Compliant Implementation
const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <ButtonPrimary disabled={loading} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        </svg>
      )}
      {children}
    </ButtonPrimary>
  )
}
```

### Error States
```tsx
// ✅ Compliant Implementation
const ErrorAlert = ({ title, message, onDismiss }) => {
  return (
    <div className="
      bg-destructive/10 border border-destructive/20  // Background: semantic destructive
      rounded-base p-4                                // Structure: 8px radius, 16px padding
      space-y-2                                       // Content: 8px gaps
    ">
      <h4 className="font-sans font-semibold text-sm text-destructive">
        {title}
      </h4>
      <p className="text-sm text-destructive/80">
        {message}
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-xs font-medium text-destructive hover:underline"
        >
          Dismiss
        </button>
      )}
    </div>
  )
}
```

### Success States
```tsx
// ✅ Compliant Implementation - using semantic color system
const SuccessAlert = ({ title, message }) => {
  return (
    <div className="
      bg-green-50 border border-green-200             // Success colors
      rounded-base p-4 space-y-2                      // Structure consistent
    ">
      <h4 className="font-sans font-semibold text-sm text-green-800">
        {title}
      </h4>
      <p className="text-sm text-green-700">
        {message}
      </p>
    </div>
  )
}
```

## Validation Examples

### ❌ Common Violations
```tsx
// DON'T: Multiple design system violations
const BadButton = () => (
  <button className="
    font-light text-6xl                         // ❌ Wrong font weight and size
    bg-gray-500 text-white                      // ❌ Hardcoded colors
    p-[25px] h-[45px]                          // ❌ Arbitrary spacing/height
    rounded-[13px]                              // ❌ Non-standard radius
  ">
    Bad Example
  </button>
)
```

### ✅ Compliant Corrections
```tsx
// DO: Follow design system rules
const GoodButton = () => (
  <button className="
    font-sans font-semibold text-5xl           // ✅ Mulish, approved weight, max size
    bg-primary text-primary-foreground         // ✅ Semantic colors
    p-6 h-12                                   // ✅ 8-point grid spacing
    rounded-lg                                 // ✅ Standard radius (12px)
  ">
    Good Example
  </button>
)
```

## Component Testing

### Validation Script Usage
```bash
# Validate specific component
./.claude/scripts/ai-validation-helper.sh src/components/Button.tsx

# Check all components
./.claude/scripts/design-check.sh src/components/

# Typography-specific check
./.claude/scripts/typography-check.sh src/components/
```

### Expected Validation Output
```
✅ Perfect! Code follows design system rules.
   All typography, spacing, colors, and components are compliant.
```

These examples demonstrate the complete implementation of the Design System Law Book across different component types, ensuring consistency, accessibility, and maintainability in every project.