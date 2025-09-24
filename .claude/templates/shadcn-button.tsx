/**
 * Brand Button Component Template
 * Built on shadcn/ui Button with brand color variants
 * Follows Design System Law Book compliance
 */

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const brandButtonVariants = cva(
  "transition-all duration-200 font-medium", // Base classes - 8-point grid compliance
  {
    variants: {
      brand: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-2 focus:ring-secondary focus:ring-offset-2",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-2 focus:ring-accent focus:ring-offset-2",
        neutral: "bg-neutral text-neutral-foreground hover:bg-neutral/90 focus:ring-2 focus:ring-neutral focus:ring-offset-2",
        gradient: "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl"
      },
      size: {
        sm: "h-8 px-4 text-sm",     // 32px height - on grid
        md: "h-10 px-6 text-base",  // 40px height - on grid  
        lg: "h-12 px-8 text-lg",    // 48px height - on grid
        xl: "h-14 px-10 text-xl"    // 56px height - on grid
      }
    },
    defaultVariants: {
      brand: "primary",
      size: "md"
    }
  }
)

interface BrandButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brandButtonVariants> {
  brand?: "primary" | "secondary" | "accent" | "neutral" | "gradient"
  size?: "sm" | "md" | "lg" | "xl"
  asChild?: boolean
}

export function BrandButton({ 
  brand, 
  size, 
  className, 
  children, 
  ...props 
}: BrandButtonProps) {
  return (
    <Button 
      className={cn(brandButtonVariants({ brand, size }), className)}
      {...props}
    >
      {children}
    </Button>
  )
}

// Usage Examples:
// <BrandButton brand="primary" size="lg">Primary Action</BrandButton>
// <BrandButton brand="gradient" size="xl">Hero CTA</BrandButton>
// <BrandButton brand="secondary" variant="outline">Secondary Action</BrandButton>