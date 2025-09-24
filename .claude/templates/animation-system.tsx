/**
 * Animation System for Design System Law Book
 * Built on shadcn/ui with Tailwind CSS animations
 * Perfect 8-point grid compliance and semantic color integration
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { TrendingUp, Star, ArrowRight, Zap, Users, DollarSign } from "lucide-react"

// Animation Variants - Grid-compliant durations and easings
export const animations = {
  // Duration classes - all on 8-point timing scale
  durations: {
    instant: "duration-75",      // 75ms
    fast: "duration-150",        // 150ms  
    normal: "duration-300",      // 300ms
    slow: "duration-500",        // 500ms
    slower: "duration-700",      // 700ms
    slowest: "duration-1000"     // 1000ms
  },
  
  // Easing functions - professional motion
  easings: {
    linear: "ease-linear",
    in: "ease-in",
    out: "ease-out", 
    inOut: "ease-in-out"
  },

  // Transforms - 8-point grid compliant
  transforms: {
    scale: {
      sm: "scale-95",      // 95%
      default: "scale-105", // 105% 
      lg: "scale-110"      // 110%
    },
    translate: {
      sm: "translate-y-1",    // 4px
      default: "translate-y-2", // 8px
      lg: "translate-y-4"     // 16px
    }
  }
}

// Animated Button - Enhanced shadcn/ui Button
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  animation?: "hover-lift" | "hover-scale" | "hover-glow" | "pulse" | "bounce"
  children: React.ReactNode
}

export function AnimatedButton({ 
  variant = "default", 
  size = "default",
  animation = "hover-lift",
  className,
  children,
  ...props 
}: AnimatedButtonProps) {
  const animationClasses = {
    "hover-lift": "hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out",
    "hover-scale": "hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out",
    "hover-glow": "hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300 ease-out",
    "pulse": "animate-pulse",
    "bounce": "hover:animate-bounce"
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(animationClasses[animation], className)}
      {...props}
    >
      {children}
    </Button>
  )
}

// Animated Card - Enhanced shadcn/ui Card
interface AnimatedCardProps {
  children: React.ReactNode
  animation?: "hover-lift" | "hover-scale" | "fade-in" | "slide-up" | "rotate-in"
  delay?: number
  className?: string
}

export function AnimatedCard({ 
  children, 
  animation = "hover-lift", 
  delay = 0,
  className 
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const animationClasses = {
    "hover-lift": "hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out",
    "hover-scale": "hover:scale-[1.02] transition-transform duration-200 ease-out",
    "fade-in": cn(
      "transition-all duration-500 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    ),
    "slide-up": cn(
      "transition-all duration-700 ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    ),
    "rotate-in": cn(
      "transition-all duration-500 ease-out",
      isVisible ? "opacity-100 rotate-0" : "opacity-0 rotate-3"
    )
  }

  return (
    <Card className={cn(animationClasses[animation], className)}>
      {children}
    </Card>
  )
}

// Animated Metric Card - Dashboard metrics with counting animation
interface AnimatedMetricCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  icon?: React.ComponentType<{ className?: string }>
  variant?: "primary" | "secondary" | "accent" | "neutral"
  countDuration?: number
  className?: string
}

export function AnimatedMetricCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  icon: Icon,
  variant = "primary",
  countDuration = 2000,
  className
}: AnimatedMetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const startTime = Date.now()
    const startValue = 0
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / countDuration, 1)
      
      // Easing function for smooth counting
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(startValue + (value - startValue) * easeOut))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate)
    }, 300) // Start counting after card appears
    
    return () => clearTimeout(timer)
  }, [value, countDuration])

  const variantStyles = {
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5",
    accent: "border-accent/20 bg-accent/5", 
    neutral: "border-border bg-card"
  }

  const iconStyles = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    accent: "text-accent bg-accent/10",
    neutral: "text-muted-foreground bg-muted"
  }

  return (
    <Card className={cn(
      "hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-out transform",
      variantStyles[variant],
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className={cn(
            "h-8 w-8 rounded-lg flex items-center justify-center transition-colors duration-200",
            iconStyles[variant]
          )}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline gap-2">
          <div className="text-3xl font-bold tabular-nums"> {/* Monospace numbers for smooth counting */}
            {prefix}{displayValue.toLocaleString()}{suffix}
          </div>
          {change && (
            <div className={cn(
              "flex items-center text-sm font-medium transition-all duration-300",
              change.type === "increase" ? "text-secondary" : "text-destructive",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
              <TrendingUp className={cn(
                "h-4 w-4 mr-1 transition-transform duration-300",
                change.type === "decrease" && "rotate-180"
              )} />
              {Math.abs(change.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Animated Progress Bar
interface AnimatedProgressProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  color?: "primary" | "secondary" | "accent"
  duration?: number
  className?: string
}

export function AnimatedProgress({
  value,
  max = 100,
  label,
  showValue = true,
  color = "primary",
  duration = 1500,
  className
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const percentage = Math.min((value / max) * 100, 100)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage)
    }, 200)
    return () => clearTimeout(timer)
  }, [percentage])

  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary", 
    accent: "bg-accent"
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex justify-between text-sm">
          <span className="font-medium">{label}</span>
          {showValue && (
            <span className="text-muted-foreground tabular-nums">
              {value.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-2 rounded-full transition-all ease-out",
              colorClasses[color]
            )}
            style={{ 
              width: `${animatedValue}%`,
              transitionDuration: `${duration}ms`
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Loading Skeleton with Shimmer Effect
interface AnimatedSkeletonProps {
  className?: string
  lines?: number
}

export function AnimatedSkeleton({ className, lines = 1 }: AnimatedSkeletonProps) {
  return (
    <div className={cn("animate-pulse", className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "bg-muted rounded-md",
            index === 0 ? "h-4" : "h-3 mt-2", // 16px first line, 12px others, 8px gap
            index === lines - 1 && lines > 1 ? "w-3/4" : "w-full" // Last line shorter
          )}
        />
      ))}
    </div>
  )
}

// Staggered Animation Container
interface StaggeredContainerProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function StaggeredContainer({ 
  children, 
  delay = 100, 
  className 
}: StaggeredContainerProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    childrenArray.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCount(prev => prev + 1)
      }, index * delay)
    })
  }, [childrenArray.length, delay])

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-500 ease-out",
            index < visibleCount
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

// Floating Action Button with Pulse
interface FloatingActionButtonProps {
  children: React.ReactNode
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  pulse?: boolean
  className?: string
  onClick?: () => void
}

export function FloatingActionButton({
  children,
  position = "bottom-right",
  pulse = false,
  className,
  onClick
}: FloatingActionButtonProps) {
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",    // 24px from edges - on grid
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6", 
    "top-left": "top-6 left-6"
  }

  return (
    <Button
      className={cn(
        "fixed z-50 h-14 w-14 rounded-full shadow-lg", // 56px FAB - on grid
        "hover:scale-110 hover:shadow-xl",
        "transition-all duration-300 ease-out",
        positionClasses[position],
        pulse && "animate-pulse",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

// Notification Toast with Slide Animation
interface NotificationToastProps {
  title: string
  description?: string
  type?: "success" | "error" | "warning" | "info"
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function NotificationToast({
  title,
  description,
  type = "info",
  isVisible,
  onClose,
  duration = 5000
}: NotificationToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  const typeStyles = {
    success: "bg-secondary border-secondary/20 text-secondary-foreground",
    error: "bg-destructive border-destructive/20 text-destructive-foreground",
    warning: "bg-accent border-accent/20 text-accent-foreground",
    info: "bg-primary border-primary/20 text-primary-foreground"
  }

  return (
    <div
      className={cn(
        "fixed top-6 right-6 z-50 max-w-md", // 24px from edges - on grid
        "transform transition-all duration-300 ease-out",
        isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-full scale-95"
      )}
    >
      <Card className={cn("shadow-lg", typeStyles[type])}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onClose}
            >
              ×
            </Button>
          </div>
          {description && (
            <CardDescription className={cn(
              type === "info" ? "text-primary-foreground/80" : "text-inherit/80"
            )}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

// Usage Examples:
// <AnimatedButton animation="hover-lift">Hover me!</AnimatedButton>
// <AnimatedCard animation="slide-up" delay={200}>Card content</AnimatedCard>
// <AnimatedMetricCard title="Revenue" value={45231} prefix="$" />
// <AnimatedProgress value={75} max={100} label="Progress" />
// <StaggeredContainer delay={150}>
//   <div>Item 1</div>
//   <div>Item 2</div>
//   <div>Item 3</div>
// </StaggeredContainer>
// <FloatingActionButton position="bottom-right" pulse>
//   <Plus className="h-6 w-6" />
// </FloatingActionButton>