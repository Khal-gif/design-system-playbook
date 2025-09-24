/**
 * Dashboard Navigation Components
 * Built on shadcn/ui following Design System Law Book
 * Includes sidebar, header, and breadcrumb navigation
 */

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  ChevronRight,
  LogOut,
  User,
  CreditCard,
  HelpCircle
} from "lucide-react"

// Sidebar Navigation Component
interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  active?: boolean
  children?: NavItem[]
}

interface SidebarProps {
  items: NavItem[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  className?: string
}

export function Sidebar({ items, collapsed = false, onCollapse, className }: SidebarProps) {
  return (
    <div className={cn(
      "flex h-full flex-col border-r bg-background",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Logo Section */}
      <div className="flex h-16 items-center border-b px-6"> {/* 64px height, 24px padding - on grid */}
        {!collapsed && (
          <h2 className="text-lg font-semibold">Dashboard</h2> {/* 18px text - on grid */}
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 p-4"> {/* 16px padding, 4px spacing - on grid */}
        {items.map((item, index) => (
          <NavItemComponent
            key={index}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Collapse Toggle */}
      {onCollapse && (
        <div className="border-t p-4"> {/* 16px padding - on grid */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCollapse(!collapsed)}
            className="w-full justify-start"
          >
            <Menu className="h-4 w-4" /> {/* 16px icon - on grid */}
            {!collapsed && <span className="ml-3">Collapse</span>}
          </Button>
        </div>
      )}
    </div>
  )
}

function NavItemComponent({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  return (
    <Button
      variant={item.active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start h-10", {/* 40px height - on grid */}
        collapsed && "px-2"
      )}
    >
      <item.icon className="h-4 w-4" /> {/* 16px icon - on grid */}
      {!collapsed && (
        <>
          <span className="ml-3">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Button>
  )
}

// Mobile Sidebar Sheet
interface MobileSidebarProps {
  items: NavItem[]
  trigger?: React.ReactNode
}

export function MobileSidebar({ items, trigger }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <Sidebar items={items} />
      </SheetContent>
    </Sheet>
  )
}

// Dashboard Header
interface DashboardHeaderProps {
  title: string
  description?: string
  user?: {
    name: string
    email: string
    avatar?: string
  }
  notifications?: number
  className?: string
}

export function DashboardHeader({ 
  title, 
  description, 
  user, 
  notifications = 0,
  className 
}: DashboardHeaderProps) {
  return (
    <header className={cn(
      "flex h-16 items-center justify-between border-b bg-background px-6", {/* 64px height, 24px padding - on grid */}
      className
    )}>
      <div className="flex items-center gap-4"> {/* 16px gap - on grid */}
        <MobileSidebar 
          items={[
            { title: "Dashboard", href: "/", icon: Home, active: true },
            { title: "Analytics", href: "/analytics", icon: BarChart3 },
            { title: "Users", href: "/users", icon: Users, badge: "12" },
            { title: "Settings", href: "/settings", icon: Settings },
          ]} 
        />
        <div>
          <h1 className="text-2xl font-bold">{title}</h1> {/* 24px text - on grid */}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4"> {/* 16px gap - on grid */}
        {/* Search Button */}
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <Search className="h-4 w-4" /> {/* 16px icon - on grid */}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"> {/* 20px badge - on grid */}
              {notifications > 9 ? "9+" : notifications}
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        {user && <UserMenu user={user} />}
      </div>
    </header>
  )
}

// User Dropdown Menu
function UserMenu({ user }: { user: { name: string; email: string; avatar?: string } }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full"> {/* 40px size - on grid */}
          <Avatar className="h-10 w-10"> {/* 40px avatar - on grid */}
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Breadcrumb Navigation
interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />}
          {item.href ? (
            <Button variant="ghost" size="sm" className="h-auto p-0 text-sm">
              {item.label}
            </Button>
          ) : (
            <span className="text-muted-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Page Header with Breadcrumbs
interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumbs, 
  actions, 
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-8", className)}> {/* 16px spacing, 32px bottom padding - on grid */}
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
      <div className="flex items-center justify-between">
        <div className="space-y-2"> {/* 8px spacing - on grid */}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1> {/* 32px text - on grid */}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <Separator />
    </div>
  )
}

// Usage Examples:
// const navigationItems = [
//   { title: "Dashboard", href: "/", icon: Home, active: true },
//   { title: "Analytics", href: "/analytics", icon: BarChart3 },
//   { title: "Users", href: "/users", icon: Users, badge: "12" },
//   { title: "Settings", href: "/settings", icon: Settings },
// ]
//
// <div className="flex h-screen">
//   <Sidebar items={navigationItems} />
//   <div className="flex-1 flex flex-col">
//     <DashboardHeader 
//       title="Dashboard"
//       description="Welcome back!"
//       user={{ 
//         name: "John Doe", 
//         email: "john@example.com" 
//       }}
//       notifications={3}
//     />
//     <main className="flex-1 p-6">
//       <PageHeader
//         title="Analytics"
//         description="View your analytics data"
//         breadcrumbs={[
//           { label: "Dashboard", href: "/" },
//           { label: "Analytics" }
//         ]}
//         actions={
//           <Button>
//             Export Data
//           </Button>
//         }
//       />
//       {/* Page content */}
//     </main>
//   </div>
// </div>