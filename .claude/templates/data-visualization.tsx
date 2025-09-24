/**
 * Data Visualization Components
 * Simple chart components using CSS and shadcn/ui
 * No external chart libraries - pure CSS with Design System compliance
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Simple Bar Chart using CSS
interface BarChartData {
  label: string
  value: number
  color?: "primary" | "secondary" | "accent" | "neutral"
}

interface SimpleBarChartProps {
  title: string
  description?: string
  data: BarChartData[]
  maxValue?: number
  showValues?: boolean
  className?: string
}

export function SimpleBarChart({ 
  title, 
  description, 
  data, 
  maxValue,
  showValues = true,
  className 
}: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent",
    neutral: "bg-neutral"
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4"> {/* 16px bottom padding - on grid */}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4"> {/* 16px spacing - on grid */}
          {data.map((item, index) => (
            <div key={index} className="space-y-2"> {/* 8px spacing - on grid */}
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                {showValues && (
                  <span className="text-muted-foreground">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="relative">
                <div className="w-full bg-muted rounded-full h-2"> {/* 8px height - on grid */}
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-500", {/* 8px height - on grid */}
                      colorClasses[item.color || "primary"]
                    )}
                    style={{ width: `${(item.value / max) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Simple Line Trend using CSS
interface TrendData {
  period: string
  value: number
}

interface SimpleTrendProps {
  title: string
  description?: string
  data: TrendData[]
  trend?: "up" | "down" | "neutral"
  color?: "primary" | "secondary" | "accent"
  className?: string
}

export function SimpleTrend({ 
  title, 
  description, 
  data, 
  trend = "neutral",
  color = "primary",
  className 
}: SimpleTrendProps) {
  const max = Math.max(...data.map(d => d.value))
  const min = Math.min(...data.map(d => d.value))
  const range = max - min || 1

  const trendColors = {
    up: "text-secondary bg-secondary/10 border-secondary/20",
    down: "text-destructive bg-destructive/10 border-destructive/20", 
    neutral: "text-muted-foreground bg-muted border-border"
  }

  const lineColors = {
    primary: "from-primary/20 to-primary/5 border-primary",
    secondary: "from-secondary/20 to-secondary/5 border-secondary",
    accent: "from-accent/20 to-accent/5 border-accent"
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          <Badge className={trendColors[trend]}>
            {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {trend}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Simple sparkline effect */}
          <div className="relative h-24 w-full"> {/* 96px height - on grid */}
            <div className={cn(
              "absolute inset-0 rounded-lg border bg-gradient-to-b",
              lineColors[color]
            )}>
              <div className="relative h-full w-full p-2"> {/* 8px padding - on grid */}
                {data.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-2 h-2 bg-current rounded-full" {/* 8px dot - on grid */}
                    style={{
                      left: `${(index / (data.length - 1)) * 100}%`,
                      bottom: `${((point.value - min) / range) * 80 + 10}%`,
                      transform: 'translate(-50%, 50%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Data points */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"> {/* 16px gap - on grid */}
            {data.slice(-4).map((point, index) => (
              <div key={index} className="space-y-1">
                <div className="text-lg font-semibold"> {/* 18px text - on grid */}
                  {point.value.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">
                  {point.period}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Donut Chart using CSS
interface DonutChartData {
  label: string
  value: number
  color: "primary" | "secondary" | "accent" | "neutral" | "muted"
}

interface SimpleDonutChartProps {
  title: string
  description?: string
  data: DonutChartData[]
  centerText?: string
  centerValue?: string | number
  className?: string
}

export function SimpleDonutChart({ 
  title, 
  description, 
  data, 
  centerText,
  centerValue,
  className 
}: SimpleDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  const colorClasses = {
    primary: "fill-primary",
    secondary: "fill-secondary",
    accent: "fill-accent", 
    neutral: "fill-neutral",
    muted: "fill-muted-foreground"
  }

  const bgColorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    neutral: "bg-neutral", 
    muted: "bg-muted-foreground"
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-8"> {/* 32px gap - on grid */}
          {/* Chart */}
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90"> {/* 120px - on grid */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                className="text-muted"
                opacity="0.1"
              />
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100
                const angle = (percentage / 100) * 360
                const radius = 50
                const strokeDasharray = 2 * Math.PI * radius
                const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

                const segment = (
                  <circle
                    key={index}
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="none"
                    strokeWidth="20"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className={colorClasses[item.color]}
                    style={{
                      transform: `rotate(${currentAngle}deg)`,
                      transformOrigin: '60px 60px'
                    }}
                  />
                )
                currentAngle += angle
                return segment
              })}
            </svg>
            
            {/* Center text */}
            {(centerText || centerValue) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {centerValue && (
                  <div className="text-2xl font-bold">{centerValue}</div> {/* 24px text - on grid */}
                )}
                {centerText && (
                  <div className="text-xs text-muted-foreground">{centerText}</div>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3"> {/* 12px spacing - on grid */}
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3"> {/* 12px gap - on grid */}
                <div className={cn("w-3 h-3 rounded-full", bgColorClasses[item.color])} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {((item.value / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Stats Comparison Card
interface ComparisonData {
  label: string
  current: number
  previous: number
  unit?: string
}

interface StatsComparisonProps {
  title: string
  description?: string
  data: ComparisonData[]
  className?: string
}

export function StatsComparison({ 
  title, 
  description, 
  data, 
  className 
}: StatsComparisonProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6"> {/* 24px spacing - on grid */}
          {data.map((item, index) => {
            const change = item.current - item.previous
            const changePercentage = item.previous ? ((change / item.previous) * 100) : 0
            const isPositive = change >= 0

            return (
              <div key={index} className="space-y-2"> {/* 8px spacing - on grid */}
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium">{item.label}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold"> {/* 24px text - on grid */}
                      {item.current.toLocaleString()}{item.unit}
                    </div>
                    <div className={cn(
                      "text-xs font-medium flex items-center gap-1",
                      isPositive ? "text-secondary" : "text-destructive"
                    )}>
                      <span>{isPositive ? "+" : ""}{change.toLocaleString()}{item.unit}</span>
                      <span>({isPositive ? "+" : ""}{changePercentage.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex h-2 bg-muted rounded-full overflow-hidden"> {/* 8px height - on grid */}
                    <div 
                      className="bg-muted-foreground rounded-full"
                      style={{ width: `${(item.previous / Math.max(item.current, item.previous)) * 100}%` }}
                    />
                    <div 
                      className={cn(
                        "rounded-full",
                        isPositive ? "bg-secondary" : "bg-destructive"
                      )}
                      style={{ width: `${(item.current / Math.max(item.current, item.previous)) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Previous: {item.previous.toLocaleString()}{item.unit}</span>
                  <span>Current: {item.current.toLocaleString()}{item.unit}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Usage Examples:
// <SimpleBarChart
//   title="Monthly Revenue"
//   description="Revenue by month"
//   data={[
//     { label: "Jan", value: 45000, color: "primary" },
//     { label: "Feb", value: 52000, color: "secondary" },
//     { label: "Mar", value: 48000, color: "accent" }
//   ]}
//   showValues={true}
// />
//
// <SimpleTrend
//   title="User Growth"
//   description="Daily active users"
//   data={[
//     { period: "Week 1", value: 1200 },
//     { period: "Week 2", value: 1350 },
//     { period: "Week 3", value: 1480 },
//     { period: "Week 4", value: 1650 }
//   ]}
//   trend="up"
//   color="primary"
// />
//
// <SimpleDonutChart
//   title="Traffic Sources"
//   description="Where your visitors come from"
//   data={[
//     { label: "Organic", value: 45, color: "primary" },
//     { label: "Direct", value: 30, color: "secondary" },
//     { label: "Social", value: 15, color: "accent" },
//     { label: "Referral", value: 10, color: "neutral" }
//   ]}
//   centerText="Total"
//   centerValue="2.5K"
// />