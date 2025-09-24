import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PageTemplate() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Build Amazing Products
          </h1>
          <p className="text-lg md:text-xl font-normal mt-4 text-muted-foreground max-w-2xl mx-auto">
            With our powerful platform that follows strict design system principles
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" className="font-semibold">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="font-medium">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Key Features
            </h2>
            <p className="text-lg font-normal text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build with confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Design System
                </CardTitle>
                <CardDescription className="text-sm font-normal">
                  Strict typography and spacing rules ensure consistency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base font-normal text-muted-foreground">
                  Every component follows the 8-point grid system with Mulish typography
                  and semantic color usage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Automated Validation
                </CardTitle>
                <CardDescription className="text-sm font-normal">
                  Scripts check your code for design system compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base font-normal text-muted-foreground">
                  Catch violations early with automated spacing, typography, and color checks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Component Templates
                </CardTitle>
                <CardDescription className="text-sm font-normal">
                  Pre-built templates following all design system rules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-base font-normal text-muted-foreground">
                  Start with compliant components and maintain consistency across your app.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              Design System Principles
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Typography Hierarchy
              </h3>
              <p className="text-base font-normal text-muted-foreground mb-4">
                Every text element uses Mulish font with only 4 weights (400, 500, 600, 700) 
                and sizes from the 8-point scale.
              </p>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">LABEL TEXT (12px, 500)</p>
                <p className="text-sm font-normal">Helper text (14px, 400)</p>
                <p className="text-base font-normal">Body text (16px, 400)</p>
                <p className="text-lg font-normal">Large body (18px, 400)</p>
                <p className="text-xl font-medium">Small heading (20px, 500)</p>
                <p className="text-2xl font-semibold">Section heading (24px, 600)</p>
                <p className="text-3xl font-semibold">Major heading (32px, 600)</p>
                <p className="text-4xl font-bold">Page title (40px, 700)</p>
                <p className="text-5xl font-bold">Hero text (48px, 700)</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Spacing System
              </h3>
              <p className="text-base font-normal text-muted-foreground mb-4">
                All spacing values must be divisible by 8 or 4, following the strict 8-point grid.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-2 bg-muted rounded text-center">
                  <div className="text-sm font-medium">p-2</div>
                  <div className="text-xs font-normal text-muted-foreground">8px</div>
                </div>
                <div className="p-4 bg-muted rounded text-center">
                  <div className="text-sm font-medium">p-4</div>
                  <div className="text-xs font-normal text-muted-foreground">16px</div>
                </div>
                <div className="p-6 bg-muted rounded text-center">
                  <div className="text-sm font-medium">p-6</div>
                  <div className="text-xs font-normal text-muted-foreground">24px</div>
                </div>
                <div className="p-8 bg-muted rounded text-center">
                  <div className="text-sm font-medium">p-8</div>
                  <div className="text-xs font-normal text-muted-foreground">32px</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6 lg:px-8 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build?
          </h2>
          <p className="text-lg font-normal mb-8 max-w-2xl mx-auto opacity-90">
            Start using the design system and maintain perfect consistency across your project.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="font-semibold"
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="font-medium border-primary-foreground/20 hover:bg-primary-foreground/10"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

/*
DESIGN SYSTEM COMPLIANCE NOTES:

✅ Typography:
- All text uses font-sans (Mulish)
- Only approved weights: font-normal (400), font-medium (500), font-semibold (600), font-bold (700)
- Only approved sizes: text-xs through text-5xl (12px-48px)
- Clear hierarchy maintained

✅ Spacing:
- All padding/margins on 8-point grid: py-24, py-16, px-4, px-6, px-8
- Gap values divisible by 8 or 4: gap-4, gap-6, gap-8
- Container padding responsive: px-4 md:px-6 lg:px-8

✅ Colors:
- Semantic colors only: bg-muted, text-muted-foreground, bg-primary, text-primary-foreground
- No hardcoded colors like bg-white or text-black
- Proper 60/30/10 distribution

✅ Components:
- Button heights on grid: size="lg" (h-12)
- Proper font weights for buttons: font-semibold, font-medium
- Card structure follows template pattern
- Form elements would use approved heights (h-10 for inputs)

This template demonstrates proper design system usage across all elements.
*/