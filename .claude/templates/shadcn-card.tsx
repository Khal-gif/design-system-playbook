/**
 * Brand Card Component Template  
 * Built on shadcn/ui Card with brand styling
 * Follows Design System Law Book compliance
 */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BrandCardProps {
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
  badge?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
  hoverable?: boolean
}

export function BrandCard({ 
  title,
  description,
  children,
  footer,
  badge,
  variant = "default",
  className,
  hoverable = false
}: BrandCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    primary: "border-primary/20 bg-primary/5 hover:border-primary/40",
    secondary: "border-secondary/20 bg-secondary/5 hover:border-secondary/40", 
    accent: "border-accent/20 bg-accent/5 hover:border-accent/40"
  }

  return (
    <Card className={cn(
      "relative transition-all duration-200",
      variantStyles[variant],
      hoverable && "hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      {badge && (
        <Badge 
          className="absolute -top-2 left-4"
          variant={variant === "default" ? "secondary" : "default"}
        >
          {badge}
        </Badge>
      )}
      
      <CardHeader className="pb-4"> {/* 16px bottom padding - on grid */}
        <CardTitle className="text-xl font-semibold"> {/* 20px text - on grid */}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-base"> {/* 16px text - on grid */}
            {description}
          </CardDescription>
        )}
      </CardHeader>
      
      {children && (
        <CardContent className="pb-6"> {/* 24px bottom padding - on grid */}
          {children}
        </CardContent>
      )}
      
      {footer && (
        <CardFooter className="pt-4"> {/* 16px top padding - on grid */}
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

// Feature Card Variant
export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  className
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description: string
  features?: string[]
  className?: string
}) {
  return (
    <BrandCard
      title={title}
      description={description}
      variant="primary"
      hoverable
      className={className}
    >
      {Icon && (
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6"> {/* 48px x 48px, 24px margin - on grid */}
          <Icon className="w-6 h-6 text-primary" />
        </div>
      )}
      
      {features && (
        <ul className="space-y-3 mt-4"> {/* 12px spacing, 16px top margin - on grid */}
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </BrandCard>
  )
}

// Pricing Card Variant
export function PricingCard({
  plan,
  price,
  period = "month",
  description,
  features,
  popular = false,
  buttonText = "Get Started",
  onButtonClick,
  className
}: {
  plan: string
  price: number | string
  period?: string
  description: string
  features: string[]
  popular?: boolean
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}) {
  return (
    <BrandCard
      title={plan}
      badge={popular ? "Most Popular" : undefined}
      variant={popular ? "accent" : "default"}
      hoverable
      className={className}
      footer={
        <Button 
          className="w-full"
          variant={popular ? "default" : "outline"}
          size="lg"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      }
    >
      <div className="text-center mb-6"> {/* 24px bottom margin - on grid */}
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-4xl font-bold text-foreground"> {/* 40px text - on grid */}
            ${price}
          </span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <ul className="space-y-4"> {/* 16px spacing - on grid */}
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-secondary-foreground" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </BrandCard>
  )
}

// Usage Examples:
// <BrandCard title="Basic Card" description="Simple card example">
//   <p>Card content goes here</p>
// </BrandCard>
//
// <FeatureCard
//   icon={StarIcon}
//   title="Premium Feature" 
//   description="Advanced functionality"
//   features={["Feature 1", "Feature 2", "Feature 3"]}
// />
//
// <PricingCard
//   plan="Professional"
//   price={99}
//   description="For growing businesses"
//   features={["10 users", "100GB storage", "Priority support"]}
//   popular={true}
// />