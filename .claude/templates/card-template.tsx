import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-sans text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "font-sans text-sm font-normal text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

/*
DESIGN SYSTEM COMPLIANT USAGE:

<Card className="p-6">                          // 24px padding
  <CardHeader className="space-y-2">            // 8px gap
    <CardTitle className="text-xl font-semibold">
      Card Title                                 // 20px, 600 weight
    </CardTitle>
    <CardDescription className="text-sm font-normal text-muted-foreground">
      Supporting description text                // 14px, 400 weight
    </CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">           // 16px gap
    <p className="font-sans text-base font-normal">
      Main content goes here.                    // 16px, 400 weight
    </p>
    <div className="text-sm font-medium text-muted-foreground">
      Additional information                     // 14px, 500 weight
    </div>
  </CardContent>
  <CardFooter>
    <Button className="font-semibold">
      Take Action                                // 600 weight
    </Button>
  </CardFooter>
</Card>
*/