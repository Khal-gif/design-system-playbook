/**
 * Dashboard Component Templates
 * Built on shadcn/ui for dashboards and analytics interfaces
 * Follows Design System Law Book compliance
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Users, DollarSign, Eye, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Metric Card - Core dashboard component
interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
    period?: string
  }
  icon?: React.ComponentType<{ className?: string }>
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  variant = "default",
  className 
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border bg-card",
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5", 
    accent: "border-accent/20 bg-accent/5"
  }

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2"> {/* 8px bottom padding - on grid */}
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" /> {/* 16px icon - on grid */}
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold"> {/* 32px text - on grid */}
            {value}
          </div>
          {change && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              change.type === "increase" ? "text-secondary" : "text-destructive"
            )}>
              {change.type === "increase" ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {Math.abs(change.value)}%
              {change.period && (
                <span className="text-muted-foreground ml-1">
                  vs {change.period}
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Dashboard Stats Grid
export function StatsGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}> {/* 16px gap - on grid */}
      <MetricCard
        title="Total Revenue"
        value="$45,231"
        change={{ value: 20.1, type: "increase", period: "last month" }}
        icon={DollarSign}
        variant="primary"
      />
      <MetricCard
        title="Active Users"
        value="2,350"
        change={{ value: 12.5, type: "increase", period: "last month" }}
        icon={Users}
        variant="secondary"
      />
      <MetricCard
        title="Page Views"
        value="12,234"
        change={{ value: 5.2, type: "decrease", period: "last month" }}
        icon={Eye}
      />
      <MetricCard
        title="Conversion Rate"
        value="3.24%"
        change={{ value: 8.1, type: "increase", period: "last month" }}
        icon={TrendingUp}
        variant="accent"
      />
    </div>
  )
}

// Progress Card for Goals/KPIs
interface ProgressCardProps {
  title: string
  description?: string
  current: number
  target: number
  unit?: string
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
}

export function ProgressCard({
  title,
  description,
  current,
  target,
  unit = "",
  variant = "default",
  className
}: ProgressCardProps) {
  const percentage = Math.round((current / target) * 100)
  const isOverTarget = current > target

  return (
    <Card className={className}>
      <CardHeader className="pb-4"> {/* 16px bottom padding - on grid */}
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{title}</CardTitle> {/* 16px text - on grid */}
          <Badge variant={isOverTarget ? "default" : "secondary"}>
            {percentage}%
          </Badge>
        </div>
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4"> {/* 16px spacing - on grid */}
          <Progress value={Math.min(percentage, 100)} className="h-2" /> {/* 8px height - on grid */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {current.toLocaleString()}{unit} of {target.toLocaleString()}{unit}
            </span>
            <span className={cn(
              "font-medium",
              isOverTarget ? "text-secondary" : "text-foreground"
            )}>
              {isOverTarget ? `+${current - target}${unit} over` : `${target - current}${unit} to go`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Activity Feed Component
interface Activity {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  target?: string
  timestamp: string
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        <CardDescription>Latest updates from your team</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4"> {/* 16px spacing - on grid */}
          {activities.map((activity, index) => (
            <div key={activity.id}>
              <div className="flex items-center gap-4"> {/* 16px gap - on grid */}
                <Avatar className="h-9 w-9"> {/* 36px avatar - on grid */}
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{activity.user.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {activity.action}
                    </span>
                    {activity.target && (
                      <span className="font-medium text-sm">{activity.target}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
              {index < activities.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Data Table Card
interface DataTableProps {
  title: string
  description?: string
  headers: string[]
  data: (string | number | React.ReactNode)[][]
  actions?: React.ReactNode
  className?: string
}

export function DataTableCard({ 
  title, 
  description, 
  headers, 
  data, 
  actions,
  className 
}: DataTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription className="mt-2">{description}</CardDescription>
            )}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground" {/* 16px horizontal, 12px vertical - on grid */}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b last:border-0 hover:bg-muted/50">
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className="px-4 py-3 text-sm" {/* 16px horizontal, 12px vertical - on grid */}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Panel
interface QuickAction {
  label: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "outline" | "secondary"
  onClick: () => void
}

interface QuickActionsPanelProps {
  actions: QuickAction[]
  className?: string
}

export function QuickActionsPanel({ actions, className }: QuickActionsPanelProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-2"> {/* 8px gap - on grid */}
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || "outline"}
              className="justify-start h-12 px-4" {/* 48px height, 16px padding - on grid */}
              onClick={action.onClick}
            >
              <action.icon className="h-4 w-4 mr-3" /> {/* 16px icon, 12px margin - on grid */}
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Notification Card Component
interface NotificationCardProps {
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  onDismiss?: () => void
  className?: string
}

export function NotificationCard({ 
  title, 
  message, 
  type, 
  timestamp, 
  onDismiss, 
  className 
}: NotificationCardProps) {
  const typeStyles = {
    info: "border-l-primary bg-primary/5",
    success: "border-l-secondary bg-secondary/5",
    warning: "border-l-accent bg-accent/5", 
    error: "border-l-destructive bg-destructive/5"
  }

  const typeIcons = {
    info: Eye,
    success: TrendingUp,
    warning: TrendingDown,
    error: TrendingDown
  }

  const Icon = typeIcons[type]

  return (
    <Card className={cn(
      "border-l-4", 
      typeStyles[type], 
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{title}</h4>
              <p className="text-sm text-muted-foreground">{message}</p>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Chart Container Component (for chart libraries like Recharts)
interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  period?: string
  className?: string
}

export function ChartCard({ 
  title, 
  description, 
  children, 
  actions, 
  period, 
  className 
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </div>
        <div className="flex items-center gap-2">
          {period && (
            <Badge variant="outline" className="text-xs">
              {period}
            </Badge>
          )}
          {actions}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  )
}

// User Profile Card
interface UserProfileCardProps {
  user: {
    name: string
    email: string
    avatar?: string
    role: string
    status: "online" | "offline" | "away"
  }
  stats?: {
    label: string
    value: string | number
  }[]
  actions?: React.ReactNode
  className?: string
}

export function UserProfileCard({ user, stats, actions, className }: UserProfileCardProps) {
  const statusColors = {
    online: "bg-secondary",
    offline: "bg-muted-foreground",
    away: "bg-accent"
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-base font-semibold">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
              statusColors[user.status]
            )} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-base">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="mt-1 text-xs">
              {user.role}
            </Badge>
          </div>
        </div>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Calendar Widget
interface CalendarEvent {
  id: string
  title: string
  time: string
  type: "meeting" | "task" | "reminder"
  color?: string
}

interface CalendarWidgetProps {
  events: CalendarEvent[]
  date?: string
  className?: string
}

export function CalendarWidget({ events, date, className }: CalendarWidgetProps) {
  const today = date || new Date().toLocaleDateString()
  
  const typeColors = {
    meeting: "border-l-primary",
    task: "border-l-secondary", 
    reminder: "border-l-accent"
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Today's Schedule</CardTitle>
        <CardDescription>{today}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {events.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No events scheduled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border-l-4 bg-muted/50",
                  typeColors[event.type]
                )}
              >
                <div className="text-xs font-medium text-muted-foreground min-w-12">
                  {event.time}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{event.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Status Overview Component
interface StatusItem {
  label: string
  status: "operational" | "warning" | "error" | "maintenance"
  description?: string
}

interface StatusOverviewProps {
  title: string
  items: StatusItem[]
  className?: string
}

export function StatusOverview({ title, items, className }: StatusOverviewProps) {
  const statusConfig = {
    operational: { color: "bg-secondary", text: "Operational" },
    warning: { color: "bg-accent", text: "Warning" },
    error: { color: "bg-destructive", text: "Error" },
    maintenance: { color: "bg-muted-foreground", text: "Maintenance" }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    statusConfig[item.status].color
                  )} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-1 ml-5">
                    {item.description}
                  </p>
                )}
              </div>
              <Badge 
                variant={item.status === 'operational' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {statusConfig[item.status].text}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Usage Examples:
// <StatsGrid className="mb-6" />
// 
// <div className="grid gap-6 lg:grid-cols-3">
//   <div className="lg:col-span-2 space-y-6">
//     <ChartCard
//       title="Revenue Overview"
//       description="Monthly revenue trends"
//       period="Last 6 months"
//     >
//       {/* Your chart component here */}
//       <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
//         Chart Component
//       </div>
//     </ChartCard>
//     
//     <DataTableCard
//       title="Recent Orders"
//       description="Latest customer orders"
//       headers={["Order ID", "Customer", "Status", "Amount"]}
//       data={[
//         ["#12345", "John Doe", <Badge>Completed</Badge>, "$234.00"],
//         ["#12346", "Jane Smith", <Badge variant="secondary">Pending</Badge>, "$156.00"]
//       ]}
//     />
//   </div>
//   
//   <div className="space-y-6">
//     <UserProfileCard
//       user={{
//         name: "John Doe",
//         email: "john@example.com", 
//         role: "Administrator",
//         status: "online"
//       }}
//       stats={[
//         { label: "Projects", value: 12 },
//         { label: "Tasks", value: 48 }
//       ]}
//     />
//     
//     <ProgressCard
//       title="Monthly Goal"
//       description="Revenue target"
//       current={42500}
//       target={50000}
//       unit="$"
//       variant="primary"
//     />
//     
//     <CalendarWidget
//       events={[
//         { id: "1", title: "Team Meeting", time: "10:00", type: "meeting" },
//         { id: "2", title: "Code Review", time: "14:30", type: "task" }
//       ]}
//     />
//     
//     <StatusOverview
//       title="System Status"
//       items={[
//         { label: "API Server", status: "operational" },
//         { label: "Database", status: "operational" },
//         { label: "CDN", status: "warning", description: "Higher latency detected" }
//       ]}
//     />
//   </div>
// </div>