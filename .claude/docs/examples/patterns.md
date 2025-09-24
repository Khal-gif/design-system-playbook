# Common Design Patterns

This guide covers common design patterns and how to implement them correctly using the Design System Law Book, ensuring consistency and best practices across all components.

## Layout Patterns

### Container Pattern
```tsx
// ✅ Standard container with proper centering and padding
const Container = ({ children, size = 'default' }) => {
  const sizeClasses = {
    sm: 'max-w-4xl',      // 896px - small content
    default: 'max-w-6xl', // 1152px - standard content  
    lg: 'max-w-7xl',      // 1280px - wide content
    full: 'max-w-none'    // Full width when needed
  }
  
  return (
    <div className={`
      ${sizeClasses[size]} mx-auto     // Centered with max-width
      px-6 sm:px-8                     // Responsive padding: 24px mobile, 32px desktop
    `}>
      {children}
    </div>
  )
}
```

### Grid Pattern
```tsx
// ✅ Responsive grid with 8-point spacing
const Grid = ({ children, cols = 3, gap = 'md' }) => {
  const gapClasses = {
    sm: 'gap-4',    // 16px gaps
    md: 'gap-6',    // 24px gaps
    lg: 'gap-8'     // 32px gaps
  }
  
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }
  
  return (
    <div className={`
      grid ${colClasses[cols]} ${gapClasses[gap]}
    `}>
      {children}
    </div>
  )
}

// Usage
<Grid cols={3} gap="lg">
  <Card title="Card 1">Content 1</Card>
  <Card title="Card 2">Content 2</Card>
  <Card title="Card 3">Content 3</Card>
</Grid>
```

### Stack Pattern
```tsx
// ✅ Vertical spacing with consistent gaps
const Stack = ({ children, gap = 'md', align = 'stretch' }) => {
  const gapClasses = {
    sm: 'space-y-2',    // 8px gaps
    md: 'space-y-4',    // 16px gaps
    lg: 'space-y-6',    // 24px gaps
    xl: 'space-y-8'     // 32px gaps
  }
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }
  
  return (
    <div className={`
      flex flex-col ${gapClasses[gap]} ${alignClasses[align]}
    `}>
      {children}
    </div>
  )
}
```

---

## Component Composition Patterns

### Modal Pattern
```tsx
// ✅ Modal with proper focus management and styling
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'max-w-md',     // 448px - small dialogs
    md: 'max-w-lg',     // 512px - standard modals
    lg: 'max-w-2xl',    // 672px - large content
    xl: 'max-w-4xl'     // 896px - very large modals
  }

  if (!isOpen) return null

  return (
    <div className="
      fixed inset-0 z-50                          // Overlay: full screen, high z-index
      bg-background/80 backdrop-blur-sm           // Background: semantic with blur
      flex items-center justify-center            // Layout: centered
      p-6                                         // Padding: 24px minimum spacing
    ">
      <div 
        className={`
          ${sizeClasses[size]}                    // Size: responsive max-width
          w-full                                  // Width: full within max-width
          bg-card border border-border            // Styling: semantic card colors
          rounded-lg shadow-lg                    // Visual: rounded corners, shadow
          p-6 space-y-6                          // Spacing: 24px padding, 24px gaps
          max-h-[90vh] overflow-y-auto           // Scroll: limit height, allow scroll
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          {title && (
            <h2 
              id="modal-title"
              className="
                font-sans font-semibold text-xl    // Typography: Mulish, 600, 20px
                text-card-foreground               // Color: semantic card text
              "
            >
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="
              h-8 w-8                              // Size: 32px touch target
              flex items-center justify-center     // Layout: centered icon
              text-muted-foreground               // Color: semantic muted
              hover:text-foreground               // Hover: semantic text
              hover:bg-muted rounded-base         // Hover: semantic background
              transition-colors duration-200      // Animation: smooth transition
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="text-card-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

// Usage
<Modal 
  isOpen={showModal} 
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
>
  <p className="text-base text-muted-foreground mb-6">
    Are you sure you want to delete this item?
  </p>
  <div className="flex gap-4 justify-end">
    <ButtonSecondary onClick={() => setShowModal(false)}>
      Cancel
    </ButtonSecondary>
    <ButtonPrimary onClick={handleDelete}>
      Delete
    </ButtonPrimary>
  </div>
</Modal>
```

### Dropdown Pattern
```tsx
// ✅ Dropdown with proper positioning and accessibility
const Dropdown = ({ trigger, children, align = 'left' }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  }

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {/* Menu */}
      {isOpen && (
        <div className={`
          absolute top-full mt-2 z-50           // Position: below trigger, high z-index
          ${alignClasses[align]}                // Alignment: configurable
          min-w-[200px]                         // Size: minimum usable width
          bg-popover border border-border       // Styling: semantic popover colors
          rounded-lg shadow-lg                  // Visual: rounded corners, shadow
          py-2                                  // Padding: 8px vertical
        `}>
          {children}
        </div>
      )}
    </div>
  )
}

const DropdownItem = ({ children, onClick, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="
      w-full px-4 py-2 text-left             // Layout: full width, proper padding
      font-sans font-normal text-sm          // Typography: Mulish, 400, 14px
      text-popover-foreground                // Color: semantic popover text
      hover:bg-accent hover:text-accent-foreground  // Hover: semantic accent
      disabled:opacity-50 disabled:pointer-events-none  // Disabled state
      transition-colors duration-200         // Animation: smooth transition
    "
  >
    {children}
  </button>
)
```

---

## Data Display Patterns

### Table Pattern
```tsx
// ✅ Data table with proper styling and accessibility
const Table = ({ columns, data }) => (
  <div className="
    bg-card border border-border rounded-lg    // Container: semantic card styling
    overflow-hidden                           // Visual: clean edges
  ">
    <div className="overflow-x-auto">          {/* Scroll: horizontal when needed */}
      <table className="w-full">
        <thead className="
          bg-muted                             // Header: semantic muted background
          border-b border-border               // Border: semantic border
        ">
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className="
                  px-6 py-3 text-left          // Spacing: 24px horizontal, 12px vertical
                  font-sans font-semibold text-sm  // Typography: Mulish, 600, 14px
                  text-muted-foreground        // Color: semantic muted text
                  uppercase tracking-wider     // Style: uppercase with letter spacing
                "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">  {/* Dividers: semantic border */}
          {data.map((row, index) => (
            <tr
              key={index}
              className="
                hover:bg-muted/50              // Hover: semantic muted with opacity
                transition-colors duration-200 // Animation: smooth transition
              "
            >
              {columns.map(column => (
                <td
                  key={column.key}
                  className="
                    px-6 py-4                  // Spacing: 24px horizontal, 16px vertical
                    font-sans font-normal text-sm  // Typography: Mulish, 400, 14px
                    text-card-foreground       // Color: semantic card text
                  "
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

// Usage
const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
]

const data = [
  { name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
]

<Table columns={columns} data={data} />
```

### Badge Pattern
```tsx
// ✅ Status badges with semantic colors
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md' 
}) => {
  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',      // 8px horizontal, 4px vertical, 12px text
    md: 'px-3 py-1 text-sm',      // 12px horizontal, 4px vertical, 14px text
    lg: 'px-4 py-2 text-sm'       // 16px horizontal, 8px vertical, 14px text
  }

  return (
    <span className={`
      inline-flex items-center                 // Layout: inline, centered content
      font-sans font-medium                    // Typography: Mulish, 500 weight
      rounded-full border                      // Styling: fully rounded, border
      ${variantClasses[variant]}               // Colors: variant-based
      ${sizeClasses[size]}                     // Size: configurable
    `}>
      {children}
    </span>
  )
}

// Usage Examples
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Inactive</Badge>
```

---

## Form Patterns

### Form Group Pattern
```tsx
// ✅ Form field group with proper spacing and layout
const FormGroup = ({ 
  label, 
  description, 
  error, 
  required = false,
  children 
}) => (
  <div className="space-y-2">                 {/* Group spacing: 8px gaps */}
    {label && (
      <label className="
        block                                  // Display: block for proper layout
        font-sans font-medium text-sm          // Typography: Mulish, 500, 14px
        text-foreground                        // Color: semantic text
      ">
        {label}
        {required && (
          <span className="text-destructive ml-1">*</span>  {/* Required indicator */}
        )}
      </label>
    )}
    
    {description && (
      <p className="
        font-sans font-normal text-xs          // Typography: Mulish, 400, 12px
        text-muted-foreground                  // Color: semantic muted
      ">
        {description}
      </p>
    )}
    
    {children}
    
    {error && (
      <p className="
        font-sans font-normal text-xs          // Typography: Mulish, 400, 12px
        text-destructive                       // Color: semantic error
        flex items-center gap-1                // Layout: icon + text
      ">
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>
    )}
  </div>
)

// Usage
<FormGroup 
  label="Email Address" 
  description="We'll never share your email"
  required
  error={errors.email}
>
  <TextInput 
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={setEmail}
  />
</FormGroup>
```

### Multi-Step Form Pattern
```tsx
// ✅ Multi-step form with progress indicator
const MultiStepForm = ({ steps, currentStep, onStepChange }) => (
  <div className="space-y-8">                 {/* Form spacing: 32px gaps */}
    {/* Progress Indicator */}
    <div className="flex items-center space-x-4">  {/* Progress: 16px gaps */}
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            h-8 w-8                            // Size: 32px circle
            rounded-full flex items-center justify-center  // Shape: perfect circle
            font-sans font-semibold text-sm    // Typography: Mulish, 600, 14px
            transition-colors duration-200     // Animation: smooth transition
            ${index <= currentStep 
              ? 'bg-primary text-primary-foreground'      // Active: primary colors
              : 'bg-muted text-muted-foreground'          // Inactive: muted colors
            }
          `}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className={`
              w-12 h-0.5 mx-4                 // Connector: 48px wide, 2px thick
              ${index < currentStep 
                ? 'bg-primary' 
                : 'bg-border'
              }
            `} />
          )}
        </div>
      ))}
    </div>

    {/* Step Content */}
    <div className="
      bg-card border border-border rounded-lg  // Container: semantic card
      p-6 space-y-6                          // Spacing: 24px padding, 24px gaps
    ">
      <h2 className="
        font-sans font-bold text-2xl          // Typography: Mulish, 700, 24px
        text-card-foreground                  // Color: semantic card text
      ">
        {steps[currentStep].title}
      </h2>
      {steps[currentStep].content}
    </div>

    {/* Navigation */}
    <div className="flex justify-between">
      <ButtonSecondary 
        onClick={() => onStepChange(currentStep - 1)}
        disabled={currentStep === 0}
      >
        Previous
      </ButtonSecondary>
      <ButtonPrimary 
        onClick={() => onStepChange(currentStep + 1)}
        disabled={currentStep === steps.length - 1}
      >
        Next
      </ButtonPrimary>
    </div>
  </div>
)
```

---

## Navigation Patterns

### Breadcrumb Pattern
```tsx
// ✅ Breadcrumb navigation with proper separators
const Breadcrumb = ({ items }) => (
  <nav className="flex items-center space-x-2 text-sm">  {/* Navigation: 8px gaps */}
    {items.map((item, index) => (
      <div key={index} className="flex items-center space-x-2">
        {index > 0 && (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />  {/* Separator */}
        )}
        {index === items.length - 1 ? (
          <span className="
            font-sans font-medium                // Typography: Mulish, 500
            text-foreground                      // Color: semantic text (current)
          ">
            {item.label}
          </span>
        ) : (
          <a
            href={item.href}
            className="
              font-sans font-normal              // Typography: Mulish, 400
              text-muted-foreground              // Color: semantic muted
              hover:text-foreground              // Hover: semantic text
              transition-colors duration-200     // Animation: smooth transition
            "
          >
            {item.label}
          </a>
        )}
      </div>
    ))}
  </nav>
)

// Usage
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Laptops', href: '/products/laptops' },
  { label: 'MacBook Pro' }  // Current page (no href)
]

<Breadcrumb items={breadcrumbItems} />
```

### Tab Pattern
```tsx
// ✅ Tab navigation with proper states
const Tabs = ({ tabs, activeTab, onTabChange }) => (
  <div>
    {/* Tab Headers */}
    <div className="
      border-b border-border                   // Bottom border: semantic border
      flex space-x-8                          // Layout: horizontal, 32px gaps
    ">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            font-sans font-medium text-sm      // Typography: Mulish, 500, 14px
            pb-3 px-1                          // Spacing: 12px bottom, 4px horizontal
            border-b-2 transition-colors       // Border: 2px bottom, animated
            ${activeTab === tab.id
              ? 'border-primary text-primary'           // Active: primary colors
              : 'border-transparent text-muted-foreground hover:text-foreground'  // Inactive: muted with hover
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* Tab Content */}
    <div className="py-6">                    {/* Content spacing: 24px vertical */}
      {tabs.find(tab => tab.id === activeTab)?.content}
    </div>
  </div>
)
```

## Best Practices Summary

### ✅ Always Do
- Use 8-point grid for all spacing (4px, 8px, 12px, 16px, 24px, 32px...)
- Use Mulish font with approved weights (400, 500, 600, 700)
- Use semantic color tokens (bg-primary, text-foreground, etc.)
- Use standard component heights (h-8, h-10, h-12, h-14)
- Include proper focus states for accessibility
- Add smooth transitions for interactions
- Follow consistent naming patterns

### ❌ Never Do
- Use arbitrary spacing values (p-[25px], gap-[13px])
- Use hardcoded colors (bg-gray-500, text-white)
- Use forbidden font weights (thin, light, extrabold, black)
- Use oversized text (text-6xl, text-7xl, text-8xl, text-9xl)
- Skip focus states or accessibility attributes
- Mix different design patterns within the same component

### 🔍 Validation
```bash
# Always validate your patterns
./.claude/scripts/design-check.sh src/

# Get AI-powered feedback
./.claude/scripts/ai-validation-helper.sh src/components/

# Check specific aspects
./.claude/scripts/typography-check.sh src/
./.claude/scripts/spacing-check.sh src/
./.claude/scripts/color-check.sh src/
```

These patterns ensure consistency, accessibility, and maintainability across all your projects while following the strict rules of the Design System Law Book.