/**
 * Context-Driven Templates
 * Complete page templates that adapt based on user intent and usage patterns
 * Demonstrates the full context-aware design system in action
 */

import { AdaptiveButton, AdaptiveCard, AdaptiveNavigation, AdaptiveContextProvider } from "./adaptive-components"
import { contextualDesignSystem } from "./context-aware-system"
import { useLearningFeedback } from "./learning-feedback-system"
import { useState, useEffect } from "react"

// Context-Aware Landing Page
interface AdaptiveLandingPageProps {
  userIntent?: string
  industry?: string
  brandPersonality?: string
  urgency?: string
}

export function AdaptiveLandingPage({ 
  userIntent = "marketing",
  industry = "tech",
  brandPersonality = "professional",
  urgency = "planned"
}: AdaptiveLandingPageProps) {
  const [userContext, setUserContext] = useState({
    intent: userIntent,
    userType: 'business',
    urgency,
    emotionalTone: brandPersonality,
    complexity: 'moderate',
    industry,
    devicePrimary: 'desktop',
    sessionStart: Date.now(),
    sessionId: `session-${Date.now()}`
  })

  const { trackInteraction } = useLearningFeedback('landing-page', 'template')

  // Detect user context from behavior
  useEffect(() => {
    const detectUserBehavior = () => {
      // Analyze scroll patterns, time spent, interactions
      // Update context based on actual behavior vs stated intent
    }
    
    detectUserBehavior()
  }, [])

  // Get context-specific adaptations
  const heroAdaptation = contextualDesignSystem.getOptimalComponent('hero-section', userContext)
  const ctaAdaptation = contextualDesignSystem.getOptimalComponent('cta-button', userContext)
  const colorPalette = contextualDesignSystem.getContextualColorPalette(userContext)
  const typography = contextualDesignSystem.getContextualTypography(userContext)

  // Context-driven content strategy
  const contentStrategy = {
    productivity: {
      headline: "Streamline Your Workflow",
      subheading: "Eliminate inefficiencies and focus on what matters most",
      ctaText: "Start Free Trial",
      socialProof: "Used by 50,000+ professionals",
      benefits: ["Save 4+ hours daily", "Integrate with your tools", "Data-driven insights"]
    },
    creative: {
      headline: "Unleash Your Creative Vision", 
      subheading: "Transform ideas into stunning reality with tools that inspire",
      ctaText: "Explore Creative Suite",
      socialProof: "Trusted by top creative agencies",
      benefits: ["Unlimited creative freedom", "Collaborative workflows", "Industry-leading tools"]
    },
    'data-heavy': {
      headline: "Turn Data Into Decisions",
      subheading: "Advanced analytics and visualization for data-driven teams",
      ctaText: "View Demo",
      socialProof: "Processing 1B+ data points daily",
      benefits: ["Real-time analytics", "Custom dashboards", "Enterprise security"]
    },
    marketing: {
      headline: "Grow Your Business",
      subheading: "Marketing tools that deliver measurable results",
      ctaText: "Get Started Free",
      socialProof: "10,000+ successful campaigns",
      benefits: ["2x conversion rates", "Complete attribution", "Advanced automation"]
    }
  }

  const content = contentStrategy[userContext.intent] || contentStrategy.marketing

  return (
    <AdaptiveContextProvider 
      userContext={userContext} 
      onContextChange={setUserContext}
    >
      <div className="min-h-screen bg-background text-foreground">
        {/* Adaptive Navigation */}
        <AdaptiveNavigation
          items={[
            { label: "Features", href: "#features", priority: "high" },
            { label: "Pricing", href: "#pricing", priority: "high" },
            { label: "Resources", href: "#resources", priority: "medium" },
            { label: "Contact", href: "#contact", priority: "low" }
          ]}
          userContext={userContext}
          onInteraction={(event, outcome) => 
            trackInteraction('click', outcome, userContext, { element: 'navigation' })
          }
          className="border-b"
        />

        {/* Context-Adaptive Hero Section */}
        <section className={`py-24 px-6 ${
          colorPalette.distribution.primary > 10 ? 'bg-primary/5' : 'bg-background'
        }`}>
          <div className="max-w-6xl mx-auto text-center">
            {/* Adaptive Typography */}
            <h1 className={`mb-6 ${
              typography.hierarchy === 'expressive-bold' ? 'text-6xl font-bold' : 
              typography.hierarchy === 'subtle-efficient' ? 'text-4xl font-semibold' :
              'text-5xl font-bold'
            }`}>
              {content.headline}
            </h1>
            
            <p className={`mb-8 max-w-3xl mx-auto ${
              typography.sizing === 'information-dense' ? 'text-lg' : 'text-xl'
            } text-muted-foreground`}>
              {content.subheading}
            </p>

            {/* Context-Adaptive CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <AdaptiveButton
                primary
                userContext={userContext}
                onInteraction={(event, outcome) => 
                  trackInteraction(event as any, outcome, userContext, { element: 'primary-cta' })
                }
                className="text-lg px-8 py-4"
              >
                {content.ctaText}
              </AdaptiveButton>
              
              <AdaptiveButton
                userContext={userContext}
                onInteraction={(event, outcome) => 
                  trackInteraction(event as any, outcome, userContext, { element: 'secondary-cta' })
                }
                className="text-lg px-8 py-4"
              >
                {userContext.intent === 'data-heavy' ? 'View Demo' : 'Learn More'}
              </AdaptiveButton>
            </div>

            {/* Social Proof - adapted to context */}
            <p className="text-sm text-muted-foreground">
              {content.socialProof}
            </p>
          </div>
        </section>

        {/* Context-Adaptive Features Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {userContext.intent === 'productivity' ? 'Boost Your Productivity' :
               userContext.intent === 'creative' ? 'Creative Tools You\'ll Love' :
               userContext.intent === 'data-heavy' ? 'Powerful Analytics Features' :
               'Everything You Need to Succeed'}
            </h2>
            
            <div className={`grid gap-8 ${
              userContext.intent === 'data-heavy' ? 'md:grid-cols-2' : 'md:grid-cols-3'
            }`}>
              {content.benefits.map((benefit, index) => (
                <AdaptiveCard
                  key={index}
                  title={benefit}
                  description={`Detailed description of ${benefit.toLowerCase()}`}
                  content={
                    <div className="space-y-4">
                      <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                        Feature Illustration
                      </div>
                      {userContext.intent === 'data-heavy' && (
                        <div className="text-sm text-muted-foreground">
                          Technical specs and metrics
                        </div>
                      )}
                    </div>
                  }
                  priority={index === 0 ? 'high' : 'medium'}
                  userContext={userContext}
                  onInteraction={(event, outcome) => 
                    trackInteraction(event as any, outcome, userContext, { 
                      element: 'feature-card',
                      cardIndex: index 
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Adaptive Testimonials/Proof Section */}
        {(userContext.intent === 'marketing' || userContext.urgency === 'immediate') && (
          <section className="py-16 px-6 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">
                {userContext.urgency === 'immediate' ? 'See Immediate Results' : 'Trusted by Industry Leaders'}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map(i => (
                  <AdaptiveCard
                    key={i}
                    title={`${userContext.urgency === 'immediate' ? 'Quick Win' : 'Success Story'} ${i}`}
                    content={
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          {userContext.urgency === 'immediate' 
                            ? "Saw 40% improvement in first week"
                            : "Long-term partnership success story"
                          }
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full"></div>
                          <div className="text-left">
                            <div className="font-semibold">Customer Name</div>
                            <div className="text-sm text-muted-foreground">Job Title</div>
                          </div>
                        </div>
                      </div>
                    }
                    userContext={userContext}
                    onInteraction={(event, outcome) => 
                      trackInteraction(event as any, outcome, userContext, { 
                        element: 'testimonial',
                        testimonialIndex: i 
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Context-Adaptive Final CTA */}
        <section className={`py-24 px-6 text-center ${
          userContext.urgency === 'immediate' ? 'bg-primary text-primary-foreground' : 'bg-background'
        }`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              {userContext.urgency === 'immediate' ? 'Start Now - Don\'t Wait' :
               userContext.intent === 'creative' ? 'Begin Your Creative Journey' :
               'Ready to Get Started?'}
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              {userContext.urgency === 'immediate' ? 'Join thousands who transformed their workflow today' :
               'Take the first step towards achieving your goals'}
            </p>
            
            <AdaptiveButton
              primary
              userContext={userContext}
              onInteraction={(event, outcome) => 
                trackInteraction(event as any, outcome, userContext, { element: 'final-cta' })
              }
              className={`text-lg px-12 py-4 ${
                userContext.urgency === 'immediate' ? 'animate-pulse' : ''
              }`}
            >
              {userContext.urgency === 'immediate' ? 'Start Free Trial Now' : content.ctaText}
            </AdaptiveButton>

            {userContext.urgency !== 'immediate' && (
              <p className="mt-6 text-sm opacity-75">
                No credit card required • Cancel anytime
              </p>
            )}
          </div>
        </section>
      </div>
    </AdaptiveContextProvider>
  )
}

// Context-Aware Dashboard Template
export function AdaptiveDashboard({ 
  userType = 'developer',
  complexity = 'moderate' 
}: {
  userType?: string
  complexity?: string
}) {
  const [userContext, setUserContext] = useState({
    intent: 'productivity',
    userType,
    complexity,
    emotionalTone: 'professional',
    urgency: 'planned',
    devicePrimary: 'desktop',
    sessionStart: Date.now(),
    sessionId: `dashboard-${Date.now()}`
  })

  const { trackInteraction, getRecommendations } = useLearningFeedback('dashboard', 'template')
  const recommendations = getRecommendations(userContext)

  // Get adaptive dashboard configuration
  const dashboardConfig = contextualDesignSystem.getOptimalComponent('dashboard-layout', userContext)
  const navConfig = contextualDesignSystem.getOptimalComponent('navigation', userContext)

  // Context-driven dashboard layouts
  const layoutStrategy = {
    developer: {
      sidebar: 'persistent-detailed',
      mainArea: 'code-focused',
      widgets: ['terminal', 'metrics', 'recent-commits', 'build-status'],
      density: 'high'
    },
    designer: {
      sidebar: 'collapsible-visual',
      mainArea: 'canvas-centered', 
      widgets: ['color-palette', 'recent-designs', 'inspiration', 'feedback'],
      density: 'medium'
    },
    business: {
      sidebar: 'minimal-navigation',
      mainArea: 'metrics-heavy',
      widgets: ['kpi-overview', 'revenue-chart', 'team-performance', 'alerts'],
      density: 'balanced'
    },
    'end-user': {
      sidebar: 'guided-simple',
      mainArea: 'task-oriented',
      widgets: ['quick-actions', 'recent-activity', 'help-tips', 'notifications'],
      density: 'low'
    }
  }

  const layout = layoutStrategy[userContext.userType] || layoutStrategy['end-user']

  return (
    <AdaptiveContextProvider userContext={userContext}>
      <div className="h-screen flex bg-background">
        {/* Adaptive Sidebar */}
        <aside className={`${
          layout.sidebar === 'persistent-detailed' ? 'w-64' :
          layout.sidebar === 'collapsible-visual' ? 'w-56' :
          layout.sidebar === 'minimal-navigation' ? 'w-48' :
          'w-52'
        } border-r bg-card`}>
          
          {/* Dashboard Logo/Title */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold">
              {userContext.userType === 'developer' ? 'Dev Console' :
               userContext.userType === 'designer' ? 'Design Studio' :
               userContext.userType === 'business' ? 'Analytics Hub' :
               'Dashboard'}
            </h1>
          </div>

          {/* Adaptive Navigation */}
          <AdaptiveNavigation
            items={[
              { label: "Overview", href: "/", icon: () => <div>📊</div>, priority: "high" },
              { label: layout.widgets[0].replace('-', ' '), href: "/primary", priority: "high" },
              { label: layout.widgets[1].replace('-', ' '), href: "/secondary", priority: "medium" },
              { label: layout.widgets[2].replace('-', ' '), href: "/tertiary", priority: "medium" },
              { label: "Settings", href: "/settings", priority: "low" }
            ]}
            userContext={userContext}
            onInteraction={(event, outcome) => 
              trackInteraction(event as any, outcome, userContext, { element: 'sidebar-nav' })
            }
            className="p-4"
          />

          {/* Context-specific quick actions */}
          <div className="absolute bottom-4 left-4 right-4">
            <AdaptiveButton
              userContext={userContext}
              onInteraction={(event, outcome) => 
                trackInteraction(event as any, outcome, userContext, { element: 'quick-action' })
              }
              className="w-full"
            >
              {userContext.userType === 'developer' ? '+ New Project' :
               userContext.userType === 'designer' ? '+ New Design' :
               userContext.userType === 'business' ? 'Generate Report' :
               'Quick Start'}
            </AdaptiveButton>
          </div>
        </aside>

        {/* Main Dashboard Area */}
        <main className="flex-1 overflow-auto">
          {/* Header with contextual actions */}
          <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {userContext.userType === 'developer' ? 'Development Overview' :
               userContext.userType === 'designer' ? 'Design Workspace' :
               userContext.userType === 'business' ? 'Business Metrics' :
               'Welcome Back'}
            </h2>
            
            <div className="flex items-center gap-3">
              {userContext.userType === 'developer' && (
                <AdaptiveButton
                  userContext={userContext}
                  className="text-sm"
                >
                  Deploy
                </AdaptiveButton>
              )}
              
              <AdaptiveButton
                userContext={userContext}
                onInteraction={(event, outcome) => 
                  trackInteraction(event as any, outcome, userContext, { element: 'header-action' })
                }
              >
                {userContext.urgency === 'immediate' ? 'Urgent Actions' : 'View All'}
              </AdaptiveButton>
            </div>
          </header>

          {/* Adaptive Dashboard Widgets */}
          <div className={`p-6 grid gap-6 ${
            layout.density === 'high' ? 'grid-cols-4' :
            layout.density === 'medium' ? 'grid-cols-3' :
            layout.density === 'low' ? 'grid-cols-2' :
            'grid-cols-3'
          }`}>
            
            {layout.widgets.map((widget, index) => (
              <AdaptiveCard
                key={widget}
                title={widget.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                content={
                  <div className="space-y-4">
                    {/* Context-specific widget content */}
                    {widget.includes('metric') || widget.includes('kpi') ? (
                      <div className="text-3xl font-bold text-primary">
                        {Math.floor(Math.random() * 100)}%
                      </div>
                    ) : widget.includes('chart') ? (
                      <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded"></div>
                    ) : widget.includes('recent') || widget.includes('activity') ? (
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="text-sm p-2 bg-muted/50 rounded">
                            Recent item {i}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-20 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                        {widget} widget
                      </div>
                    )}
                  </div>
                }
                priority={index < 2 ? 'high' : 'medium'}
                userContext={userContext}
                onInteraction={(event, outcome) => 
                  trackInteraction(event as any, outcome, userContext, { 
                    element: 'dashboard-widget',
                    widget 
                  })
                }
              />
            ))}
          </div>

          {/* Learning Recommendations Panel */}
          {recommendations.length > 0 && (
            <div className="mx-6 mb-6">
              <AdaptiveCard
                title="Optimization Suggestions"
                description="Based on usage patterns and performance data"
                content={
                  <div className="space-y-3">
                    {recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="p-3 bg-accent/10 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="text-sm">
                            <div className="font-medium">{rec.recommendation}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Impact: {rec.impact} • Confidence: {Math.round(rec.confidence * 100)}%
                            </div>
                          </div>
                          <AdaptiveButton
                            userContext={userContext}
                            className="text-xs px-3 py-1"
                          >
                            Apply
                          </AdaptiveButton>
                        </div>
                      </div>
                    ))}
                  </div>
                }
                userContext={userContext}
                className="border-accent/30"
              />
            </div>
          )}
        </main>
      </div>
    </AdaptiveContextProvider>
  )
}

// Export context-driven templates
export {
  AdaptiveLandingPage,
  AdaptiveDashboard
}

// Usage Examples:
// <AdaptiveLandingPage userIntent="productivity" urgency="immediate" />
// <AdaptiveDashboard userType="developer" complexity="complex" />
// <AdaptiveLandingPage userIntent="creative" brandPersonality="playful" />
// <AdaptiveDashboard userType="business" complexity="simple" />