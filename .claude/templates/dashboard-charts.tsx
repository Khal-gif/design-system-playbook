/**
 * Dashboard Chart Components
 * Built on shadcn/ui with chart library wrappers
 * Following Design System Law Book compliance
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"

// Simple Chart Wrapper for any chart library
interface ChartContainerProps {
  title: string
  description?: string
  period?: string
  trend?: {
    value: number
    type: "up" | "down"
    label?: string
  }
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ChartContainer({
  title,
  description,
  period,
  trend,
  actions,
  children,
  className
}: ChartContainerProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2"> {/* 8px bottom padding - on grid */}
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle> {/* 18px text - on grid */}
          {description && (
            <CardDescription className="text-sm">{description}</CardDescription>
          )}
        </div>
        <div className="flex items-center gap-2"> {/* 8px gap - on grid */}
          {period && (
            <Badge variant="outline" className="text-xs">
              {period}
            </Badge>
          )}
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-medium",
              trend.type === "up" ? "text-secondary" : "text-destructive"
            )}>
              {trend.type === "up" ? (
                <TrendingUp className="h-4 w-4 mr-1" /> {/* 16px icon - on grid */}
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {trend.value}%
              {trend.label && (
                <span className="text-muted-foreground ml-1">{trend.label}</span>
              )}
            </div>
          )}
          {actions}
        </div>
      </CardHeader>
      <CardContent className="pt-4"> {/* 16px top padding - on grid */}
        {children}
      </CardContent>
    </Card>
  )
}

// Mock Chart Components (replace with your preferred chart library)

// Line Chart Placeholder
interface LineChartData {
  name: string
  value: number
  trend?: "up" | "down"
}

interface SimpleLineChartProps {
  data: LineChartData[]
  height?: number
  color?: "primary" | "secondary" | "accent"
  className?: string
}

export function SimpleLineChart({ 
  data, 
  height = 300, 
  color = "primary",
  className 
}: SimpleLineChartProps) {
  const colorClasses = {
    primary: "border-primary bg-primary/10",
    secondary: "border-secondary bg-secondary/10", 
    accent: "border-accent bg-accent/10"
  }

  return (
    <div className={cn("relative", className)} style={{ height }}>
      {/* Mock chart - replace with actual chart component */}
      <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2"> {/* 8px spacing - on grid */}
          <div className={cn(
            "w-16 h-16 rounded-lg mx-auto border-2", {/* 64px square - on grid */}
            colorClasses[color]
          )} />
          <p className="text-sm text-muted-foreground">Line Chart</p>
          <p className="text-xs text-muted-foreground">{data.length} data points</p>
        </div>
      </div>
      {/* Data points overlay */}
      <div className="absolute bottom-4 left-4 flex gap-4"> {/* 16px positioning and gap - on grid */}
        {data.slice(0, 3).map((point, index) => (
          <div key={index} className="text-xs">
            <div className="font-medium">{point.name}</div>
            <div className="text-muted-foreground">{point.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Bar Chart Placeholder
interface BarChartData {
  category: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: BarChartData[]
  height?: number
  orientation?: "vertical" | "horizontal"
  className?: string
}

export function SimpleBarChart({ 
  data, 
  height = 300, 
  orientation = "vertical",
  className 
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className={cn("space-y-4", className)}> {/* 16px spacing - on grid */}
      <div style={{ height }}>
        {orientation === "vertical" ? (
          <div className="flex items-end justify-between h-full gap-2 p-4"> {/* 8px gap, 16px padding - on grid */}
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-primary rounded-t-sm transition-all duration-300"
                  style={{ 
                    height: `${(item.value / maxValue) * 100}%`,
                    minHeight: '8px' /* 8px minimum - on grid */
                  }}
                />
                <div className="text-xs mt-2 text-center"> {/* 8px margin - on grid */}
                  <div className="font-medium">{item.category}</div>
                  <div className="text-muted-foreground">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full gap-2 p-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm font-medium text-right"> {/* 80px width - on grid */}
                  {item.category}
                </div>
                <div className="flex-1 bg-muted rounded-full h-6 relative"> {/* 24px height - on grid */}
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300"
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-sm text-muted-foreground"> {/* 48px width - on grid */}
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Donut Chart Placeholder
interface DonutChartData {
  label: string
  value: number
  color?: string
}

interface SimpleDonutChartProps {
  data: DonutChartData[]
  size?: number
  centerContent?: React.ReactNode
  className?: string
}

export function SimpleDonutChart({ 
  data, 
  size = 200, 
  centerContent,
  className 
}: SimpleDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-muted-foreground"]

  return (
    <div className={cn("flex items-center gap-8", className)}> {/* 32px gap - on grid */}
      {/* Chart */}
      <div className="relative" style={{ width: size, height: size }}>
        <div className="w-full h-full rounded-full bg-muted flex items-center justify-center">
          {centerContent || (
            <div className="text-center">
              <div className="text-2xl font-bold">{total}</div> {/* 24px text - on grid */}
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3"> {/* 12px spacing - on grid */}
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1)
          return (
            <div key={index} className="flex items-center gap-3"> {/* 12px gap - on grid */}
              <div className={cn(
                "w-3 h-3 rounded-full", {/* 12px square - on grid */}
                colors[index % colors.length]
              )} />
              <div className="flex-1">
                <div className="text-sm font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">
                  {item.value} ({percentage}%)
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Area Chart Placeholder
interface AreaChartData {
  period: string
  value1: number
  value2?: number
}

interface SimpleAreaChartProps {
  data: AreaChartData[]
  height?: number
  showComparison?: boolean
  className?: string
}

export function SimpleAreaChart({ 
  data, 
  height = 300, 
  showComparison = false,
  className 
}: SimpleAreaChartProps) {
  return (
    <div className={cn("relative", className)} style={{ height }}>
      <div className="w-full h-full bg-gradient-to-t from-primary/10 to-transparent rounded-lg flex items-end justify-between p-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-xs font-medium mb-2">{item.period}</div> {/* 8px margin - on grid */}
            <div className="flex flex-col gap-1"> {/* 4px gap - on grid */}
              <div className="w-2 bg-primary rounded-full" style={{ 
                height: `${Math.max(item.value1 / 10, 4)}px` /* Minimum 4px height */
              }} />
              {showComparison && item.value2 && (
                <div className="w-2 bg-secondary rounded-full" style={{ 
                  height: `${Math.max(item.value2 / 10, 4)}px`
                }} />
              )}
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              {item.value1}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="absolute top-4 right-4 flex gap-4"> {/* 16px positioning and gap - on grid */}
        <div className="flex items-center gap-2"> {/* 8px gap - on grid */}
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-xs">Primary</span>
        </div>
        {showComparison && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full" />
            <span className="text-xs">Secondary</span>
          </div>
        )}
      </div>
    </div>
  )
}

// KPI Chart Card (combines metric with mini chart)
interface KPIChartProps {
  title: string
  value: string | number
  unit?: string
  change: {
    value: number
    type: "increase" | "decrease"
    period?: string
  }
  chartData: number[]
  chartType?: "line" | "bar"
  variant?: "default" | "primary" | "secondary" | "accent"
  className?: string
}

export function KPIChart({
  title,
  value,
  unit = "",
  change,
  chartData,
  chartType = "line",
  variant = "default",
  className
}: KPIChartProps) {
  const variantStyles = {
    default: "border-border",
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5",
    accent: "border-accent/20 bg-accent/5"
  }

  const max = Math.max(...chartData)
  const min = Math.min(...chartData)

  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardContent className="p-6"> {/* 24px padding - on grid */}
        <div className="flex items-start justify-between">
          <div className="space-y-2"> {/* 8px spacing - on grid */}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="flex items-baseline gap-2"> {/* 8px gap - on grid */}
              <span className="text-3xl font-bold"> {/* 32px text - on grid */}
                {value}{unit}
              </span>
              <div className={cn(
                "flex items-center text-sm font-medium",
                change.type === "increase" ? "text-secondary" : "text-destructive"
              )}>
                {change.type === "increase" ? "+" : "-"}
                {Math.abs(change.value)}%
                {change.period && (
                  <span className="text-muted-foreground ml-1">vs {change.period}</span>
                )}
              </div>
            </div>
          </div>

          {/* Mini Chart */}
          <div className="w-20 h-12"> {/* 80px x 48px - on grid */}
            {chartType === "line" ? (
              <div className="w-full h-full relative">
                <svg className="w-full h-full">
                  <polyline
                    points={chartData.map((value, index) => 
                      `${(index / (chartData.length - 1)) * 80},${48 - ((value - min) / (max - min)) * 48}`
                    ).join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex items-end justify-between h-full gap-1"> {/* 4px gap - on grid */}
                {chartData.map((value, index) => (
                  <div
                    key={index}
                    className="bg-primary rounded-t-sm flex-1"
                    style={{ height: `${((value - min) / (max - min)) * 100}%` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Usage Examples:
// <ChartContainer
//   title="Revenue Trends"
//   description="Monthly revenue over time"
//   period="Last 12 months"
//   trend={{ value: 12.5, type: "up", label: "vs last period" }}
// >
//   <SimpleLineChart
//     data={[
//       { name: "Jan", value: 4000 },
//       { name: "Feb", value: 3000 },
//       { name: "Mar", value: 5000 }
//     ]}
//     color="primary"
//   />
// </ChartContainer>
//
// <SimpleBarChart
//   data={[
//     { category: "Desktop", value: 45 },
//     { category: "Mobile", value: 35 },
//     { category: "Tablet", value: 20 }
//   ]}
//   orientation="horizontal"
// />
//
// <KPIChart
//   title="Total Sales"
//   value="$24,500"
//   change={{ value: 12, type: "increase", period: "last month" }}
//   chartData={[100, 120, 110, 140, 160, 150, 180]}
//   variant="primary"
// />