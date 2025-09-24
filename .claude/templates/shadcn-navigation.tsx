/**
 * Navigation Component Templates
 * Built on shadcn/ui Navigation components with brand styling  
 * Follows Design System Law Book compliance
 */

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

interface NavItem {
  title: string
  href: string
  description?: string
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface BrandNavbarProps {
  logo?: React.ReactNode
  items: NavItem[]
  sections?: NavSection[]
  cta?: {
    text: string
    href: string
    variant?: "default" | "outline" | "secondary"
  }
  className?: string
}

export function BrandNavbar({ 
  logo, 
  items, 
  sections = [], 
  cta,
  className 
}: BrandNavbarProps) {
  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container flex h-16 items-center justify-between"> {/* 64px height - on grid */}
        
        {/* Logo */}
        <div className="flex items-center">
          {logo}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8"> {/* 32px spacing - on grid */}
          <NavigationMenu>
            <NavigationMenuList className="space-x-4"> {/* 16px spacing - on grid */}
              
              {/* Simple Nav Items */}
              {items.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className={cn(navigationMenuTriggerStyle(), "bg-transparent")}
                  >
                    {item.title}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Dropdown Sections */}
              {sections.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-6 w-96"> {/* 12px gap, 24px padding, 384px width - on grid */}
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                            <div className="mb-2 mt-4 text-lg font-medium"> {/* 8px, 16px margins - on grid */}
                              {section.title}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore our {section.title.toLowerCase()} options
                            </p>
                          </div>
                        </NavigationMenuLink>
                      </div>
                      
                      <div className="grid gap-2"> {/* 8px gap - on grid */}
                        {section.items.map((item) => (
                          <NavigationMenuLink key={item.href} asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {item.title}
                                {item.badge && (
                                  <Badge variant="secondary" className="ml-2 text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          {cta && (
            <Button 
              asChild 
              variant={cta.variant || "default"}
              className="h-10 px-6" {/* 40px height, 24px padding - on grid */}
            >
              <a href={cta.href}>{cta.text}</a>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80"> {/* 320px width - on grid */}
              <SheetHeader className="pb-6"> {/* 24px bottom padding - on grid */}
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              
              <div className="flex flex-col space-y-4"> {/* 16px spacing - on grid */}
                {/* Mobile Nav Items */}
                {items.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="justify-start h-12 px-4" {/* 48px height, 16px padding - on grid */}
                    asChild
                  >
                    <a href={item.href}>
                      {item.title}
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </Button>
                ))}

                {/* Mobile Sections */}
                {sections.map((section) => (
                  <div key={section.title} className="space-y-2"> {/* 8px spacing - on grid */}
                    <h4 className="font-medium text-sm text-muted-foreground px-4">
                      {section.title}
                    </h4>
                    {section.items.map((item) => (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className="justify-start h-10 px-8 w-full" {/* 40px height, 32px padding - on grid */}
                        asChild
                      >
                        <a href={item.href}>
                          {item.title}
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </a>
                      </Button>
                    ))}
                  </div>
                ))}

                {/* Mobile CTA */}
                {cta && (
                  <div className="pt-4 border-t"> {/* 16px padding - on grid */}
                    <Button 
                      asChild 
                      variant={cta.variant || "default"}
                      className="w-full h-12" {/* 48px height - on grid */}
                    >
                      <a href={cta.href}>{cta.text}</a>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

// Footer Component
interface FooterSection {
  title: string
  links: { title: string; href: string }[]
}

interface BrandFooterProps {
  logo?: React.ReactNode
  description?: string
  sections: FooterSection[]
  socialLinks?: { name: string; href: string; icon: React.ReactNode }[]
  bottomText?: string
  className?: string
}

export function BrandFooter({
  logo,
  description,
  sections,
  socialLinks = [],
  bottomText,
  className
}: BrandFooterProps) {
  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container py-12"> {/* 48px padding - on grid */}
        <div className="grid gap-8 lg:grid-cols-5"> {/* 32px gap - on grid */}
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4"> {/* 16px bottom margin - on grid */}
              {logo}
            </div>
            {description && (
              <p className="text-muted-foreground text-sm leading-6 mb-6"> {/* 24px bottom margin - on grid */}
                {description}
              </p>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4"> {/* 16px spacing - on grid */}
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0" {/* 40px x 40px - on grid */}
                    asChild
                  >
                    <a href={social.href} aria-label={social.name}>
                      {social.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4"> {/* 16px bottom margin - on grid */}
                {section.title}
              </h3>
              <ul className="space-y-3"> {/* 12px spacing - on grid */}
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Button
                      variant="link"
                      className="h-auto p-0 font-normal text-sm text-muted-foreground hover:text-foreground"
                      asChild
                    >
                      <a href={link.href}>{link.title}</a>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        {bottomText && (
          <div className="border-t mt-12 pt-8"> {/* 48px margin, 32px padding - on grid */}
            <p className="text-center text-sm text-muted-foreground">
              {bottomText}
            </p>
          </div>
        )}
      </div>
    </footer>
  )
}

// Usage Examples:
// <BrandNavbar
//   logo={<img src="/logo.png" alt="Brand" className="h-8" />}
//   items={[
//     { title: "Home", href: "/" },
//     { title: "About", href: "/about" },
//     { title: "Blog", href: "/blog", badge: "New" }
//   ]}
//   sections={[
//     {
//       title: "Products",
//       items: [
//         { title: "Web App", href: "/products/web", description: "Build web applications" },
//         { title: "Mobile App", href: "/products/mobile", description: "Create mobile apps" }
//       ]
//     }
//   ]}
//   cta={{ text: "Get Started", href: "/signup" }}
// />
//
// <BrandFooter
//   logo={<img src="/logo.png" alt="Brand" className="h-8" />}
//   description="Building the future of web development."
//   sections={[
//     {
//       title: "Product",
//       links: [
//         { title: "Features", href: "/features" },
//         { title: "Pricing", href: "/pricing" }
//       ]
//     }
//   ]}
//   bottomText="© 2024 Brand Name. All rights reserved."
// />