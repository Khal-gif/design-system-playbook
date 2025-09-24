/**
 * Dashboard Layout Components
 * Built on shadcn/ui following Design System Law Book
 * Responsive layouts for dashboard applications
 */

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Sidebar, DashboardHeader, PageHeader } from "./dashboard-navigation"
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  ShoppingCart,
  Bell,
  Calendar
} from "lucide-react"

// Main Dashboard Layout
interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    avatar?: string
  }
  sidebarCollapsed?: boolean
  onSidebarCollapse?: (collapsed: boolean) => void
  className?: string
}

export function DashboardLayout({ 
  children, 
  user,
  sidebarCollapsed: controlledCollapsed,
  onSidebarCollapse,
  className 
}: DashboardLayoutProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false)
  const collapsed = controlledCollapsed ?? internalCollapsed
  const setCollapsed = onSidebarCollapse ?? setInternalCollapsed

  const navigationItems = [
    { title: "Dashboard", href: "/", icon: Home, active: true },
    { title: "Analytics", href: "/analytics", icon: BarChart3, badge: "New" },
    { title: "Orders", href: "/orders", icon: ShoppingCart, badge: "23" },
    { title: "Users", href: "/users", icon: Users },
    { title: "Calendar", href: "/calendar", icon: Calendar },
    { title: "Reports", href: "/reports", icon: FileText },
    { title: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Sidebar */}
      <Sidebar 
        items={navigationItems}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="hidden md:flex"
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          title="Dashboard"
          user={user}
          notifications={5}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6"> {/* 24px padding - on grid */}
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

// Two Column Layout
interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode
  rightColumn: React.ReactNode
  leftWidth?: "sm" | "md" | "lg"
  className?: string
}

export function TwoColumnLayout({ 
  leftColumn, 
  rightColumn, 
  leftWidth = "md",
  className 
}: TwoColumnLayoutProps) {
  const widthClasses = {
    sm: "lg:col-span-1", // 1/3 width
    md: "lg:col-span-2", // 2/3 width  
    lg: "lg:col-span-3"  // 3/4 width
  }

  const rightWidthClasses = {
    sm: "lg:col-span-3", // 3/4 width
    md: "lg:col-span-2", // 1/3 width
    lg: "lg:col-span-1"  // 1/4 width
  }

  return (
    <div className={cn(
      "grid gap-6 lg:grid-cols-4", {/* 24px gap - on grid */}
      className
    )}>
      <div className={widthClasses[leftWidth]}>
        {leftColumn}
      </div>
      <div className={rightWidthClasses[leftWidth]}>
        {rightColumn}
      </div>
    </div>
  )
}

// Three Column Layout  
interface ThreeColumnLayoutProps {
  leftColumn: React.ReactNode
  centerColumn: React.ReactNode
  rightColumn: React.ReactNode
  className?: string
}

export function ThreeColumnLayout({ 
  leftColumn, 
  centerColumn, 
  rightColumn, 
  className 
}: ThreeColumnLayoutProps) {
  return (
    <div className={cn(
      "grid gap-6 lg:grid-cols-12", {/* 24px gap - on grid */}
      className
    )}>
      <div className="lg:col-span-3">
        {leftColumn}
      </div>
      <div className="lg:col-span-6">
        {centerColumn}
      </div>
      <div className="lg:col-span-3">
        {rightColumn}
      </div>
    </div>
  )
}

// Responsive Grid Layout
interface GridLayoutProps {
  children: React.ReactNode
  columns?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg"
  className?: string
}

export function GridLayout({ 
  children, 
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
  className 
}: GridLayoutProps) {
  const gapClasses = {
    sm: "gap-4", // 16px
    md: "gap-6", // 24px  
    lg: "gap-8"  // 32px
  }

  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2", 
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  }

  return (
    <div className={cn(
      "grid",
      gapClasses[gap],
      columns.sm && gridCols[columns.sm],
      columns.md && `md:${gridCols[columns.md]}`,
      columns.lg && `lg:${gridCols[columns.lg]}`,
      columns.xl && `xl:${gridCols[columns.xl]}`,
      className
    )}>
      {children}
    </div>
  )
}

// Dashboard Page Wrapper
interface DashboardPageProps {
  title: string
  description?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function DashboardPage({ 
  title, 
  description, 
  breadcrumbs, 
  actions, 
  children, 
  className 
}: DashboardPageProps) {
  return (
    <div className={cn("space-y-8", className)}> {/* 32px spacing - on grid */}
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        actions={actions}
      />
      <div className="space-y-6"> {/* 24px spacing - on grid */}
        {children}
      </div>
    </div>
  )
}

// Content Section Wrapper
interface ContentSectionProps {
  title?: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ContentSection({ 
  title, 
  description, 
  actions, 
  children, 
  className 
}: ContentSectionProps) {
  return (
    <section className={cn("space-y-4", className)}> {/* 16px spacing - on grid */}
      {(title || description || actions) && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight">{title}</h2> {/* 24px text - on grid */}
            )}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

// Responsive Container
interface ContainerProps {
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl" | "full"
  className?: string
}

export function Container({ children, size = "lg", className }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-2xl",   // 672px
    md: "max-w-4xl",   // 896px
    lg: "max-w-6xl",   // 1152px
    xl: "max-w-7xl",   // 1280px
    full: "max-w-full"
  }

  return (
    <div className={cn(
      "mx-auto px-4 sm:px-6 lg:px-8", {/* Responsive padding - on grid */}
      sizeClasses[size],
      className
    )}>
      {children}
    </div>
  )
}

// Usage Examples:
// 
// Basic Dashboard Layout:
// <DashboardLayout user={{ name: "John Doe", email: "john@example.com" }}>
//   <DashboardPage 
//     title="Analytics Dashboard"
//     description="View your analytics and performance metrics"
//     breadcrumbs={[
//       { label: "Dashboard", href: "/" },
//       { label: "Analytics" }
//     ]}
//   >
//     <ContentSection title="Key Metrics">
//       <GridLayout columns={{ sm: 1, md: 2, lg: 4 }}>
//         <MetricCard title="Revenue" value="$45,231" />
//         <MetricCard title="Users" value="2,350" />
//         <MetricCard title="Orders" value="1,234" />
//         <MetricCard title="Growth" value="+12%" />
//       </GridLayout>
//     </ContentSection>
//   </DashboardPage>
// </DashboardLayout>
//
// Two Column Layout:
// <TwoColumnLayout
//   leftColumn={
//     <ContentSection title="Main Content">
//       <ChartCard title="Revenue Trends">
//         <div className="h-64 bg-muted/50 rounded" />
//       </ChartCard>
//     </ContentSection>
//   }
//   rightColumn={
//     <ContentSection title="Sidebar">
//       <UserProfileCard user={user} />
//       <CalendarWidget events={events} />
//     </ContentSection>
//   }
// />
//
// Three Column Layout:
// <ThreeColumnLayout
//   leftColumn={<QuickActionsPanel actions={actions} />}
//   centerColumn={<DataTableCard data={tableData} />}
//   rightColumn={<ActivityFeed activities={activities} />}
// />