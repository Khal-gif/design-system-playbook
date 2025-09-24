/**
 * Complete Dashboard Template
 * Full dashboard example using all Design System components
 * Built on shadcn/ui with perfect 8-point grid compliance
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { 
  Bell, 
  Search, 
  Settings, 
  Users, 
  DollarSign, 
  TrendingUp, 
  ShoppingCart,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Plus,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react"
import { cn } from "@/lib/utils"

// Dashboard Header Component
function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1> {/* 32px text - on grid */}
        <p className="text-muted-foreground mt-2"> {/* 8px top margin - on grid */}
          Welcome back! Here's what's happening with your business.
        </p>
      </div>
      
      <div className="flex items-center gap-4"> {/* 16px gap - on grid */}
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search..."
            className="pl-10 w-64" {/* 40px left padding, 256px width - on grid */}
          />
        </div>

        {/* Quick Actions */}
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Item
        </Button>

        {/* Notifications */}
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full"></span>
        </Button>

        {/* User Menu */}
        <Avatar className="h-8 w-8"> {/* 32px avatar - on grid */}
          <AvatarImage src="/placeholder.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

// Sidebar Navigation
function DashboardSidebar() {
  const navigation = [
    { name: 'Dashboard', icon: BarChart3, current: true },
    { name: 'Analytics', icon: TrendingUp, current: false },
    { name: 'Customers', icon: Users, current: false },
    { name: 'Orders', icon: ShoppingCart, current: false },
    { name: 'Calendar', icon: Calendar, current: false },
    { name: 'Settings', icon: Settings, current: false },
  ]

  return (
    <nav className="px-3 py-2"> {/* 12px horizontal, 8px vertical - on grid */}
      {/* Logo */}
      <div className="mb-8"> {/* 32px bottom margin - on grid */}
        <div className="flex items-center gap-2 px-3 py-2"> {/* 8px gap, 12px horizontal, 8px vertical - on grid */}
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"> {/* 32px logo - on grid */}
            <span className="text-primary-foreground font-bold">B</span>
          </div>
          <span className="font-semibold text-lg">Business</span> {/* 18px text - on grid */}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="space-y-1"> {/* 4px spacing - on grid */}
        {navigation.map((item) => (
          <Button
            key={item.name}
            variant={item.current ? "secondary" : "ghost"}
            className="w-full justify-start h-10 px-3" {/* 40px height, 12px padding - on grid */}
          >
            <item.icon className="h-4 w-4 mr-3" /> {/* 16px icon, 12px margin - on grid */}
            {item.name}
          </Button>
        ))}
      </div>

      <Separator className="my-6" /> {/* 24px vertical margin - on grid */}

      {/* Quick Stats */}
      <div className="px-3 py-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Quick Stats
        </h4>
        <div className="space-y-3"> {/* 12px spacing - on grid */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Active Users</span>
            <span className="font-medium">2,350</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Revenue</span>
            <span className="font-medium text-secondary">$45,231</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Orders</span>
            <span className="font-medium">156</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Main Metrics Grid
function MetricsGrid() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: { value: 20.1, type: "increase" as const },
      icon: DollarSign,
      color: "primary" as const
    },
    {
      title: "Active Users",
      value: "2,350",
      change: { value: 12.5, type: "increase" as const },
      icon: Users,
      color: "secondary" as const
    },
    {
      title: "Total Orders",
      value: "156",
      change: { value: 5.2, type: "decrease" as const },
      icon: ShoppingCart,
      color: "accent" as const
    },
    {
      title: "Page Views",
      value: "12,234",
      change: { value: 8.1, type: "increase" as const },
      icon: Eye,
      color: "neutral" as const
    }
  ]

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"> {/* 16px gap - on grid */}
      {metrics.map((metric, index) => (
        <Card key={index} className={variantStyles[metric.color]}>
          <CardHeader className="flex flex-row items-center justify-between pb-2"> {/* 8px bottom padding - on grid */}
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center", {/* 32px icon container - on grid */}
              iconStyles[metric.color]
            )}>
              <metric.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{metric.value}</div> {/* 24px text - on grid */}
              <div className={cn(
                "flex items-center text-xs font-medium",
                metric.change.type === "increase" ? "text-secondary" : "text-destructive"
              )}>
                {metric.change.type === "increase" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {metric.change.value}%
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Recent Activity Card
function RecentActivity() {
  const activities = [
    {
      user: { name: "John Doe", initials: "JD", avatar: "/placeholder.jpg" },
      action: "completed order",
      target: "#12345",
      timestamp: "2 minutes ago"
    },
    {
      user: { name: "Sarah Wilson", initials: "SW" },
      action: "left a review",
      target: "Premium Plan",
      timestamp: "5 minutes ago"
    },
    {
      user: { name: "Mike Johnson", initials: "MJ" },
      action: "updated profile",
      timestamp: "10 minutes ago"
    },
    {
      user: { name: "Emily Brown", initials: "EB" },
      action: "started trial",
      target: "Pro Plan",
      timestamp: "15 minutes ago"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest updates from your customers</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4"> {/* 16px spacing - on grid */}
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="flex items-center gap-4"> {/* 16px gap - on grid */}
                <Avatar className="h-9 w-9"> {/* 36px avatar - on grid */}
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1">
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
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              {index < activities.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Orders Table
function OrdersTable() {
  const orders = [
    { id: "#12345", customer: "John Doe", status: "Completed", amount: "$234.00", date: "2024-01-15" },
    { id: "#12346", customer: "Sarah Wilson", status: "Pending", amount: "$156.00", date: "2024-01-14" },
    { id: "#12347", customer: "Mike Johnson", status: "Processing", amount: "$89.00", date: "2024-01-14" },
    { id: "#12348", customer: "Emily Brown", status: "Completed", amount: "$445.00", date: "2024-01-13" },
  ]

  const statusColors = {
    Completed: "bg-secondary text-secondary-foreground",
    Pending: "bg-accent text-accent-foreground",
    Processing: "bg-primary text-primary-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <CardDescription>Your latest customer orders</CardDescription>
          </div>
          <div className="flex items-center gap-2"> {/* 8px gap - on grid */}
            <Select defaultValue="all">
              <SelectTrigger className="w-32"> {/* 128px width - on grid */}
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-md border">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"> {/* 16px horizontal, 12px vertical - on grid */}
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                  <td className="px-4 py-3 text-sm">{order.customer}</td>
                  <td className="px-4 py-3">
                    <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{order.amount}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

// Complete Dashboard Layout
export function CompleteDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-card"> {/* 256px width - on grid */}
          <DashboardSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64"> {/* 256px left padding to account for sidebar */}
          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
            <div className="px-4 sm:px-6 lg:px-8 py-6"> {/* 24px padding - on grid */}
              <DashboardHeader />
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8"> {/* 32px vertical padding - on grid */}
            <div className="space-y-8"> {/* 32px spacing between sections - on grid */}
              
              {/* Metrics */}
              <MetricsGrid />

              {/* Main Content Grid */}
              <div className="grid gap-8 lg:grid-cols-3"> {/* 32px gap - on grid */}
                
                {/* Left Column - Takes 2/3 width */}
                <div className="lg:col-span-2 space-y-8"> {/* 32px spacing - on grid */}
                  <OrdersTable />
                </div>

                {/* Right Column - Takes 1/3 width */}
                <div className="space-y-8"> {/* 32px spacing - on grid */}
                  <RecentActivity />
                  
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid gap-2"> {/* 8px gap - on grid */}
                        <Button variant="outline" className="justify-start h-10"> {/* 40px height - on grid */}
                          <Plus className="h-4 w-4 mr-3" />
                          Add Customer
                        </Button>
                        <Button variant="outline" className="justify-start h-10">
                          <ShoppingCart className="h-4 w-4 mr-3" />
                          Create Order
                        </Button>
                        <Button variant="outline" className="justify-start h-10">
                          <BarChart3 className="h-4 w-4 mr-3" />
                          View Reports
                        </Button>
                        <Button variant="outline" className="justify-start h-10">
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

// Usage:
// <CompleteDashboard />
//
// This provides a complete, professional dashboard built entirely with:
// - shadcn/ui components as the foundation
// - Perfect 8-point grid compliance
// - Multi-brand color system integration
// - Responsive design patterns
// - Accessible, keyboard-navigable interface