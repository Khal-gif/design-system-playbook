/**
 * Flexible Layout Templates  
 * Supports both dashboard and landing page layouts
 * Built on shadcn/ui with Design System compliance
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// Universal Container - Works for both dashboards and landing pages
interface UniversalContainerProps {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  className?: string
}

export function UniversalContainer({ 
  children, 
  maxWidth = "2xl", 
  className 
}: UniversalContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-2xl",      // 672px
    md: "max-w-4xl",      // 896px  
    lg: "max-w-6xl",      // 1152px
    xl: "max-w-7xl",      // 1280px
    "2xl": "max-w-screen-2xl", // 1536px
    full: "max-w-none"
  }

  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8", // Responsive padding - 16px → 24px → 32px - on grid
      maxWidthClasses[maxWidth],
      className
    )}>
      {children}
    </div>
  )
}

// Dashboard Layout - Sidebar + Main Content
interface DashboardLayoutProps {
  sidebar: React.ReactNode
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ 
  sidebar, 
  header, 
  children, 
  className 
}: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-card"> {/* 256px width - on grid */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 flex flex-col pt-6 pb-4 overflow-y-auto"> {/* 24px top, 16px bottom - on grid */}
              {sidebar}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64"> {/* 256px left padding to account for sidebar */}
          {/* Header */}
          {header && (
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
              <div className="px-4 sm:px-6 lg:px-8 py-4"> {/* 16px padding - on grid */}
                {header}
              </div>
            </div>
          )}

          {/* Page Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8"> {/* 32px vertical padding - on grid */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Landing Page Layout - Hero + Sections
interface LandingPageLayoutProps {
  hero: React.ReactNode
  sections?: React.ReactNode[]
  footer?: React.ReactNode
  className?: string
}

export function LandingPageLayout({ 
  hero, 
  sections = [], 
  footer, 
  className 
}: LandingPageLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Hero Section */}
      <section className="relative">
        {hero}
      </section>

      {/* Content Sections */}
      {sections.map((section, index) => (
        <section 
          key={index} 
          className="py-16 lg:py-24" // 64px → 96px padding - on grid
        >
          <UniversalContainer>
            {section}
          </UniversalContainer>
        </section>
      ))}

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-muted/50">
          {footer}
        </footer>
      )}
    </div>
  )
}

// Grid System - Flexible for both dashboards and landing pages
interface FlexibleGridProps {
  children: React.ReactNode
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: 4 | 6 | 8 | 12 | 16 // Only allow grid-compliant gaps
  className?: string
}

export function FlexibleGrid({ 
  children, 
  columns = { default: 1, md: 2, lg: 3 },
  gap = 6, // 24px default - on grid
  className 
}: FlexibleGridProps) {
  const gridClasses = [
    `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    `gap-${gap}` // Ensures grid-compliant gaps
  ].filter(Boolean).join(" ")

  return (
    <div className={cn("grid", gridClasses, className)}>
      {children}
    </div>
  )
}

// Feature Section - Works for landing pages and dashboard overviews
interface FeatureSectionProps {
  title: string
  description?: string
  features: {
    icon?: React.ComponentType<{ className?: string }>
    title: string
    description: string
    badge?: string
  }[]
  layout?: "grid" | "list"
  className?: string
}

export function FeatureSection({ 
  title, 
  description, 
  features, 
  layout = "grid",
  className 
}: FeatureSectionProps) {
  return (
    <div className={className}>
      {/* Section Header */}
      <div className="text-center mb-12"> {/* 48px bottom margin - on grid */}
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-4"> {/* 32px text, 16px margin - on grid */}
          {title}
        </h2>
        {description && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto"> {/* 18px text - on grid */}
            {description}
          </p>
        )}
      </div>

      {/* Features */}
      {layout === "grid" ? (
        <FlexibleGrid 
          columns={{ default: 1, md: 2, lg: 3 }}
          gap={8} // 32px gap - on grid
        >
          {features.map((feature, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-4"> {/* 16px bottom padding - on grid */}
                <div className="flex items-center gap-4 mb-4"> {/* 16px gap and margin - on grid */}
                  {feature.icon && (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center"> {/* 48px box - on grid */}
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle> {/* 20px text - on grid */}
                    {feature.badge && (
                      <Badge variant="secondary" className="mt-1">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-base"> {/* 16px text - on grid */}
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </FlexibleGrid>
      ) : (
        <div className="space-y-8"> {/* 32px spacing - on grid */}
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-6"> {/* 24px gap - on grid */}
              {feature.icon && (
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"> {/* 48px box - on grid */}
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2"> {/* 12px gap, 8px margin - on grid */}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  {feature.badge && (
                    <Badge variant="secondary">{feature.badge}</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// CTA Section - Universal for both dashboards and landing pages
interface CTASectionProps {
  title: string
  description?: string
  primaryAction?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }
  variant?: "default" | "primary" | "gradient"
  className?: string
}

export function CTASection({ 
  title, 
  description, 
  primaryAction, 
  secondaryAction,
  variant = "default",
  className 
}: CTASectionProps) {
  const variantStyles = {
    default: "bg-muted/50",
    primary: "bg-primary/5 border border-primary/20",
    gradient: "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
  }

  return (
    <div className={cn(
      "rounded-lg p-8 lg:p-12 text-center", // 32px → 48px padding - on grid
      variantStyles[variant],
      className
    )}>
      <h2 className="text-3xl font-bold tracking-tight mb-4"> {/* 32px text, 16px margin - on grid */}
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"> {/* 18px text, 32px margin - on grid */}
          {description}
        </p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center"> {/* 16px gap - on grid */}
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            variant={primaryAction.variant || "default"}
            size="lg"
            className="h-12 px-8" // 48px height, 32px padding - on grid
          >
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant={secondaryAction.variant || "outline"}
            size="lg"
            className="h-12 px-8"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  )
}

// Usage Examples:

// Dashboard Usage:
// <DashboardLayout
//   sidebar={<DashboardSidebar />}
//   header={<DashboardHeader />}
// >
//   <FlexibleGrid columns={{ default: 1, lg: 2, xl: 3 }} gap={6}>
//     <MetricCard title="Revenue" value="$45,231" />
//     <MetricCard title="Users" value="2,350" />
//   </FlexibleGrid>
// </DashboardLayout>

// Landing Page Usage:
// <LandingPageLayout
//   hero={<HeroSection />}
//   sections={[
//     <FeatureSection
//       title="Key Features"
//       description="Everything you need to succeed"
//       features={featureList}
//       layout="grid"
//     />,
//     <CTASection
//       title="Ready to get started?"
//       description="Join thousands of satisfied customers"
//       variant="gradient"
//       primaryAction={{ label: "Start Free Trial", onClick: () => {} }}
//       secondaryAction={{ label: "View Pricing", onClick: () => {} }}
//     />
//   ]}
//   footer={<Footer />}
// />