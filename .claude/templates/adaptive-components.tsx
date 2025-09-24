/**
 * Adaptive Components System
 * Components that shape themselves based on user context and intent
 * Learning from usage patterns to optimize user experience
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { contextualDesignSystem } from "./context-aware-system"

interface AdaptiveProps {
  userContext?: {
    intent: string
    userType: string
    urgency: string
    emotionalTone: string
    complexity: string
  }
  usageData?: {
    previousInteractions: string[]
    conversionRate: number
    timeOnPage: number
    userSatisfaction: number
  }
  onInteraction?: (event: string, outcome: 'success' | 'friction' | 'abandon') => void
}

// Context-Aware Button that adapts to user intent
interface AdaptiveButtonProps extends AdaptiveProps {
  children: React.ReactNode
  primary?: boolean
  className?: string
}

export function AdaptiveButton({ 
  children, 
  primary, 
  userContext,
  usageData,
  onInteraction,
  className 
}: AdaptiveButtonProps) {
  // Context-driven adaptations
  const adaptations = {
    // Productivity users prefer efficiency
    productivity: {
      size: "default",
      variant: primary ? "default" : "outline",
      style: "minimal-efficient",
      animation: "none",
      reasoning: "Productivity users value quick, distraction-free interactions"
    },
    
    // Creative users enjoy visual flair  
    creative: {
      size: "lg",
      variant: primary ? "default" : "ghost",
      style: "expressive-bold",
      animation: "hover-lift",
      reasoning: "Creative users appreciate visual feedback and expressive design"
    },
    
    // Marketing contexts need conversion focus
    marketing: {
      size: "lg", 
      variant: primary ? "default" : "outline",
      style: "conversion-optimized",
      animation: "attention-pulse",
      reasoning: "Marketing buttons optimize for attention and conversion"
    },
    
    // Data-heavy interfaces stay subtle
    'data-heavy': {
      size: "sm",
      variant: primary ? "default" : "ghost", 
      style: "data-supportive",
      animation: "subtle-feedback",
      reasoning: "Data interfaces need buttons that don't compete with information"
    }
  }

  // Urgency adaptations
  const urgencyAdaptations = {
    immediate: {
      animation: "pulse-urgent",
      size: "lg",
      prominence: "high",
      reasoning: "Immediate actions need strong visual prominence"
    },
    experimental: {
      animation: "gentle-hover",
      size: "default",
      prominence: "medium", 
      reasoning: "Experimental contexts benefit from approachable, non-threatening styling"
    }
  }

  // Select adaptation based on context
  const contextAdaptation = adaptations[userContext?.intent || 'productivity']
  const urgencyAdaptation = urgencyAdaptations[userContext?.urgency || 'planned']
  
  // Combine adaptations
  const finalStyle = {
    ...contextAdaptation,
    ...urgencyAdaptation
  }

  // Learning from usage data
  let dynamicVariant = finalStyle.variant
  if (usageData?.conversionRate < 0.1 && primary) {
    // Low conversion rate - make more prominent
    dynamicVariant = "default"
    finalStyle.size = "lg"
  }

  // Track interactions
  const handleClick = () => {
    onInteraction?.('click', 'success')
    // Log successful interaction pattern
  }

  const handleHover = () => {
    onInteraction?.('hover', 'success')
  }

  return (
    <Button
      variant={dynamicVariant as any}
      size={finalStyle.size as any}
      onClick={handleClick}
      onMouseEnter={handleHover}
      className={cn(
        // Context-driven styling
        finalStyle.style === 'minimal-efficient' && "focus:ring-1 transition-none",
        finalStyle.style === 'expressive-bold' && "shadow-lg hover:shadow-xl transition-all duration-300",
        finalStyle.style === 'conversion-optimized' && "font-semibold ring-2 ring-primary/20",
        finalStyle.style === 'data-supportive' && "opacity-80 hover:opacity-100",
        
        // Animation adaptations
        finalStyle.animation === 'hover-lift' && "hover:translate-y-[-2px]",
        finalStyle.animation === 'attention-pulse' && "animate-pulse-slow",
        finalStyle.animation === 'pulse-urgent' && "animate-pulse",
        finalStyle.animation === 'subtle-feedback' && "hover:bg-muted/50",
        
        className
      )}
      data-context={userContext?.intent}
      data-adaptation-reasoning={finalStyle.reasoning}
    >
      {children}
    </Button>
  )
}

// Context-Aware Card that adapts layout and emphasis
interface AdaptiveCardProps extends AdaptiveProps {
  title: string
  description?: string
  content: React.ReactNode
  actions?: React.ReactNode
  priority?: 'high' | 'medium' | 'low'
  className?: string
}

export function AdaptiveCard({
  title,
  description,
  content,
  actions,
  priority = 'medium',
  userContext,
  usageData,
  onInteraction,
  className
}: AdaptiveCardProps) {
  // Context-driven card adaptations
  const cardAdaptations = {
    productivity: {
      layout: 'compact-information',
      spacing: 'tight',
      emphasis: 'content-first',
      visual: 'minimal-chrome',
      reasoning: 'Productivity users need maximum information density'
    },
    creative: {
      layout: 'visual-showcase', 
      spacing: 'generous',
      emphasis: 'visual-first',
      visual: 'expressive-styling',
      reasoning: 'Creative users value visual impact and brand expression'
    },
    'data-heavy': {
      layout: 'structured-grid',
      spacing: 'organized',
      emphasis: 'data-clarity',
      visual: 'supportive-neutral',
      reasoning: 'Data-heavy contexts need clear structure without visual competition'
    },
    marketing: {
      layout: 'conversion-focused',
      spacing: 'action-oriented', 
      emphasis: 'call-to-action',
      visual: 'attention-grabbing',
      reasoning: 'Marketing cards optimize for user engagement and conversion'
    }
  }

  const adaptation = cardAdaptations[userContext?.intent || 'productivity']

  // Priority-based styling
  const priorityStyles = {
    high: 'border-primary/50 bg-primary/5 shadow-md',
    medium: 'border-border bg-card',
    low: 'border-border/50 bg-muted/30'
  }

  // Usage-based adjustments
  let dynamicPadding = adaptation.spacing === 'tight' ? 'p-4' : 'p-6'
  if (usageData?.timeOnPage < 10 && adaptation.layout === 'compact-information') {
    // Users leaving quickly - reduce information density
    dynamicPadding = 'p-6'
  }

  // Track card interactions
  const trackInteraction = (event: string) => {
    onInteraction?.(event, 'success')
  }

  return (
    <Card 
      className={cn(
        priorityStyles[priority],
        
        // Layout adaptations
        adaptation.layout === 'compact-information' && 'space-y-2',
        adaptation.layout === 'visual-showcase' && 'space-y-6 overflow-hidden',
        adaptation.layout === 'structured-grid' && 'grid-card',
        adaptation.layout === 'conversion-focused' && 'text-center space-y-4',
        
        // Visual adaptations
        adaptation.visual === 'minimal-chrome' && 'border-0 shadow-none',
        adaptation.visual === 'expressive-styling' && 'shadow-xl hover:shadow-2xl transition-shadow',
        adaptation.visual === 'supportive-neutral' && 'bg-background border-muted',
        adaptation.visual === 'attention-grabbing' && 'border-primary shadow-primary/10',
        
        className
      )}
      onMouseEnter={() => trackInteraction('card-hover')}
      onClick={() => trackInteraction('card-click')}
      data-context={userContext?.intent}
      data-adaptation={adaptation.layout}
    >
      <CardHeader className={cn(
        dynamicPadding,
        adaptation.spacing === 'tight' && 'pb-2',
        adaptation.spacing === 'generous' && 'pb-6'
      )}>
        <CardTitle className={cn(
          // Context-driven typography
          adaptation.emphasis === 'content-first' && 'text-lg font-semibold',
          adaptation.emphasis === 'visual-first' && 'text-2xl font-bold',
          adaptation.emphasis === 'data-clarity' && 'text-base font-medium text-muted-foreground',
          adaptation.emphasis === 'call-to-action' && 'text-xl font-bold text-primary'
        )}>
          {title}
        </CardTitle>
        
        {description && (
          <CardDescription className={cn(
            adaptation.layout === 'compact-information' && 'text-xs',
            adaptation.layout === 'visual-showcase' && 'text-lg',
            adaptation.emphasis === 'call-to-action' && 'text-base font-medium'
          )}>
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className={cn(
        dynamicPadding,
        'pt-0',
        adaptation.layout === 'structured-grid' && 'grid gap-4',
        adaptation.layout === 'conversion-focused' && 'text-center'
      )}>
        {content}
        
        {actions && (
          <div className={cn(
            'mt-4 flex gap-2',
            adaptation.layout === 'conversion-focused' && 'justify-center mt-6',
            adaptation.layout === 'compact-information' && 'mt-2'
          )}>
            {actions}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Context-Aware Navigation that adapts to user behavior
interface AdaptiveNavigationProps extends AdaptiveProps {
  items: Array<{
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    badge?: string
    priority?: 'high' | 'medium' | 'low'
  }>
  className?: string
}

export function AdaptiveNavigation({ 
  items, 
  userContext, 
  usageData,
  onInteraction,
  className 
}: AdaptiveNavigationProps) {
  // Context-driven navigation adaptations
  const navAdaptations = {
    productivity: {
      layout: 'compact-sidebar',
      style: 'keyboard-optimized',
      grouping: 'frequency-based',
      reasoning: 'Productivity users need quick access to frequently used features'
    },
    creative: {
      layout: 'visual-tabs',
      style: 'brand-expressive',
      grouping: 'workflow-based',
      reasoning: 'Creative users prefer visual navigation that reflects their workflow'
    },
    'data-heavy': {
      layout: 'hierarchical-tree',
      style: 'information-dense',
      grouping: 'category-based',
      reasoning: 'Data-heavy interfaces need clear information architecture'
    },
    marketing: {
      layout: 'prominent-horizontal',
      style: 'conversion-focused',
      grouping: 'funnel-based',
      reasoning: 'Marketing navigation guides users through conversion funnel'
    }
  }

  const adaptation = navAdaptations[userContext?.intent || 'productivity']

  // Sort items based on context and usage
  const adaptiveItems = [...items].sort((a, b) => {
    // Priority-based sorting
    if (a.priority !== b.priority) {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']
    }
    
    // Usage-based sorting (if we have usage data)
    if (usageData?.previousInteractions) {
      const aUsage = usageData.previousInteractions.filter(i => i.includes(a.label)).length
      const bUsage = usageData.previousInteractions.filter(i => i.includes(b.label)).length
      return bUsage - aUsage
    }
    
    return 0
  })

  return (
    <nav 
      className={cn(
        // Layout adaptations
        adaptation.layout === 'compact-sidebar' && 'flex flex-col space-y-1',
        adaptation.layout === 'visual-tabs' && 'flex space-x-6 border-b',
        adaptation.layout === 'hierarchical-tree' && 'space-y-2',
        adaptation.layout === 'prominent-horizontal' && 'flex justify-center space-x-8 py-4',
        
        // Style adaptations
        adaptation.style === 'keyboard-optimized' && 'focus-within:ring-2 ring-primary',
        adaptation.style === 'brand-expressive' && 'bg-gradient-to-r from-primary/10 to-accent/10',
        adaptation.style === 'information-dense' && 'text-sm',
        adaptation.style === 'conversion-focused' && 'bg-background border rounded-lg p-2',
        
        className
      )}
      data-context={userContext?.intent}
      data-adaptation={adaptation.layout}
    >
      {adaptiveItems.map((item, index) => (
        <AdaptiveButton
          key={item.href}
          userContext={userContext}
          primary={item.priority === 'high'}
          onInteraction={(event, outcome) => {
            onInteraction?.(event, outcome)
            // Track navigation patterns
          }}
          className={cn(
            adaptation.layout === 'compact-sidebar' && 'justify-start w-full',
            adaptation.layout === 'visual-tabs' && 'border-b-2 border-transparent hover:border-primary',
            adaptation.style === 'keyboard-optimized' && `accesskey-${index + 1}`
          )}
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="h-4 w-4" />}
            <span>{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </div>
        </AdaptiveButton>
      ))}
    </nav>
  )
}

// Usage Analytics Hook for tracking component performance
export function useAdaptiveAnalytics(componentId: string) {
  const trackInteraction = (event: string, outcome: 'success' | 'friction' | 'abandon', metadata?: any) => {
    // Record interaction for learning system
    contextualDesignSystem.recordUsagePattern(componentId, { 
      type: event, 
      timestamp: Date.now(),
      ...metadata 
    }, outcome)
  }

  const getOptimizedProps = (baseProps: any, userContext: any) => {
    // Get context-optimized component configuration
    const optimal = contextualDesignSystem.getOptimalComponent(componentId, userContext)
    return { ...baseProps, ...optimal }
  }

  const getPerformanceInsights = () => {
    // Get usage analytics and optimization suggestions
    return contextualDesignSystem.analyzeUsagePatterns()
  }

  return {
    trackInteraction,
    getOptimizedProps,
    getPerformanceInsights
  }
}

// Context Provider for adaptive components
interface AdaptiveContextProviderProps {
  children: React.ReactNode
  userContext: any
  onContextChange?: (newContext: any) => void
}

export function AdaptiveContextProvider({ 
  children, 
  userContext, 
  onContextChange 
}: AdaptiveContextProviderProps) {
  // Context learning and adaptation logic
  const updateContext = (newSignals: any) => {
    // Merge new signals with existing context
    const updatedContext = {
      ...userContext,
      ...contextualDesignSystem.detectUserIntent(newSignals.userInput || '')
    }
    
    onContextChange?.(updatedContext)
  }

  // Provide context to all adaptive components
  return (
    <div data-adaptive-context={JSON.stringify(userContext)}>
      {children}
    </div>
  )
}

// Export adaptive component system
export {
  AdaptiveButton,
  AdaptiveCard, 
  AdaptiveNavigation,
  useAdaptiveAnalytics,
  AdaptiveContextProvider
}