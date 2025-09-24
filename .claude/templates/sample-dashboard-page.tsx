/**
 * Complete Sample Dashboard Page
 * Demonstrates all dashboard components working together
 * Following Design System Law Book compliance
 */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import all our dashboard components
import { 
  MetricCard, 
  StatsGrid, 
  ProgressCard,
  ActivityFeed, 
  DataTableCard,
  QuickActionsPanel,
  NotificationCard,
  UserProfileCard,
  CalendarWidget,
  StatusOverview
} from "./dashboard-components"

import { 
  DashboardLayout,
  TwoColumnLayout,
  GridLayout,
  DashboardPage,
  ContentSection
} from "./dashboard-layout"

import { 
  ChartContainer,
  SimpleLineChart,
  SimpleBarChart,
  SimpleDonutChart,
  KPIChart
} from "./dashboard-charts"

import { 
  Download, 
  FileText, 
  Plus, 
  Settings, 
  Users,
  BarChart3,
  RefreshCw,
  Search
} from "lucide-react"

// Sample data for the dashboard
const sampleUser = {
  name: "John Doe",
  email: "john@company.com",
  avatar: "/avatars/john.jpg",
  role: "Administrator",
  status: "online" as const
}

const sampleActivities = [
  {
    id: "1",
    user: {
      name: "Alice Smith",
      initials: "AS",
      avatar: "/avatars/alice.jpg"
    },
    action: "created a new report",
    target: "Q4 Analytics",
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    user: {
      name: "Bob Johnson",
      initials: "BJ"
    },
    action: "updated the user permissions for",
    target: "Marketing Team",
    timestamp: "15 minutes ago"
  },
  {
    id: "3",
    user: {
      name: "Carol Williams",
      initials: "CW"
    },
    action: "completed the task",
    target: "Server Maintenance",
    timestamp: "1 hour ago"
  }
]

const sampleTableData = [
  ["#12345", "John Smith", <Badge key="1">Completed</Badge>, "$1,234.00"],
  ["#12346", "Jane Doe", <Badge key="2" variant="secondary">Pending</Badge>, "$856.00"],
  ["#12347", "Bob Wilson", <Badge key="3">Completed</Badge>, "$2,100.00"],
  ["#12348", "Alice Brown", <Badge key="4" variant="outline">Processing</Badge>, "$650.00"],
  ["#12349", "Charlie Davis", <Badge key="5" variant="destructive">Failed</Badge>, "$1,890.00"]
]

const sampleQuickActions = [
  { 
    label: "Create New Report", 
    icon: FileText, 
    variant: "default" as const,
    onClick: () => console.log("Create report") 
  },
  { 
    label: "Add New User", 
    icon: Users, 
    variant: "outline" as const,
    onClick: () => console.log("Add user") 
  },
  { 
    label: "View Analytics", 
    icon: BarChart3, 
    variant: "outline" as const,
    onClick: () => console.log("View analytics") 
  },
  { 
    label: "System Settings", 
    icon: Settings, 
    variant: "outline" as const,
    onClick: () => console.log("Settings") 
  }
]

const sampleCalendarEvents = [
  { id: "1", title: "Team Standup", time: "09:00", type: "meeting" as const },
  { id: "2", title: "Code Review", time: "10:30", type: "task" as const },
  { id: "3", title: "Client Call", time: "14:00", type: "meeting" as const },
  { id: "4", title: "Deploy Reminder", time: "16:00", type: "reminder" as const }
]

const sampleStatusItems = [
  { label: "API Server", status: "operational" as const },
  { label: "Database", status: "operational" as const },
  { label: "CDN", status: "warning" as const, description: "Increased latency detected" },
  { label: "Payment Gateway", status: "operational" as const },
  { label: "Email Service", status: "maintenance" as const, description: "Scheduled maintenance until 2 PM" }
]

const sampleChartData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 }
]

const sampleBarData = [
  { category: "Desktop", value: 45 },
  { category: "Mobile", value: 35 },
  { category: "Tablet", value: 20 }
]

const sampleDonutData = [
  { label: "Direct", value: 4500 },
  { label: "Referral", value: 2300 },
  { label: "Social", value: 1800 },
  { label: "Email", value: 900 }
]

// Main Dashboard Page Component
export function SampleDashboardPage() {
  return (
    <DashboardLayout user={sampleUser}>
      <DashboardPage
        title="Analytics Dashboard"
        description="Monitor your key metrics and performance indicators"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Analytics" }
        ]}
        actions={
          <div className="flex items-center gap-2"> {/* 8px gap - on grid */}
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> {/* 16px icon, 8px margin - on grid */}
              Refresh
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        }
      >
        {/* Key Metrics Section */}
        <ContentSection title="Key Metrics" className="mb-8"> {/* 32px margin - on grid */}
          <StatsGrid />
        </ContentSection>

        {/* KPI Charts Section */}
        <ContentSection title="Performance Overview" className="mb-8">
          <GridLayout columns={{ sm: 1, md: 2, lg: 4 }} gap="md">
            <KPIChart
              title="Total Revenue"
              value="$45,231"
              change={{ value: 12.5, type: "increase", period: "last month" }}
              chartData={[100, 120, 110, 140, 160, 150, 180]}
              variant="primary"
            />
            <KPIChart
              title="Active Users"
              value="2,350"
              change={{ value: 8.2, type: "increase", period: "last month" }}
              chartData={[80, 95, 85, 110, 125, 115, 130]}
              variant="secondary"
            />
            <KPIChart
              title="Conversion Rate"
              value="3.24"
              unit="%"
              change={{ value: 2.1, type: "decrease", period: "last month" }}
              chartData={[95, 88, 92, 85, 80, 88, 85]}
              chartType="bar"
            />
            <KPIChart
              title="Page Views"
              value="12.4K"
              change={{ value: 15.3, type: "increase", period: "last month" }}
              chartData={[200, 250, 220, 280, 320, 300, 350]}
              variant="accent"
            />
          </GridLayout>
        </ContentSection>

        {/* Main Content Area */}
        <TwoColumnLayout
          leftWidth="md"
          leftColumn={
            <div className="space-y-8"> {/* 32px spacing - on grid */}
              {/* Charts Section */}
              <ContentSection title="Analytics">
                <div className="space-y-6"> {/* 24px spacing - on grid */}
                  <ChartContainer
                    title="Revenue Trends"
                    description="Monthly revenue over the past 6 months"
                    period="Last 6 months"
                    trend={{ value: 12.5, type: "up", label: "vs previous period" }}
                    actions={
                      <Button variant="ghost" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <SimpleLineChart
                      data={sampleChartData}
                      height={300}
                      color="primary"
                    />
                  </ChartContainer>

                  <div className="grid gap-6 md:grid-cols-2"> {/* 24px gap - on grid */}
                    <ChartContainer
                      title="Traffic Sources"
                      description="Breakdown by source type"
                    >
                      <SimpleDonutChart
                        data={sampleDonutData}
                        size={180}
                        centerContent={
                          <div className="text-center">
                            <div className="text-2xl font-bold">9.5K</div> {/* 24px text - on grid */}
                            <div className="text-xs text-muted-foreground">Total</div>
                          </div>
                        }
                      />
                    </ChartContainer>

                    <ChartContainer
                      title="Device Usage"
                      description="User device preferences"
                    >
                      <SimpleBarChart
                        data={sampleBarData}
                        height={240}
                        orientation="vertical"
                      />
                    </ChartContainer>
                  </div>
                </div>
              </ContentSection>

              {/* Data Table Section */}
              <ContentSection>
                <DataTableCard
                  title="Recent Orders"
                  description="Latest customer orders and transactions"
                  headers={["Order ID", "Customer", "Status", "Amount"]}
                  data={sampleTableData}
                  actions={
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  }
                />
              </ContentSection>
            </div>
          }
          rightColumn={
            <div className="space-y-6"> {/* 24px spacing - on grid */}
              {/* User Profile */}
              <UserProfileCard
                user={sampleUser}
                stats={[
                  { label: "Projects", value: 12 },
                  { label: "Tasks", value: 48 }
                ]}
                actions={
                  <>
                    <Button size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </>
                }
              />

              {/* Progress Card */}
              <ProgressCard
                title="Monthly Revenue Goal"
                description="Track progress toward monthly target"
                current={42500}
                target={50000}
                unit="$"
                variant="primary"
              />

              {/* Calendar Widget */}
              <CalendarWidget
                events={sampleCalendarEvents}
                date="Today, Dec 19"
              />

              {/* Quick Actions */}
              <QuickActionsPanel actions={sampleQuickActions} />

              {/* System Status */}
              <StatusOverview
                title="System Health"
                items={sampleStatusItems}
              />

              {/* Recent Activity */}
              <ActivityFeed activities={sampleActivities} />

              {/* Notifications */}
              <div className="space-y-3"> {/* 12px spacing - on grid */}
                <h3 className="text-lg font-semibold">Recent Notifications</h3> {/* 18px text - on grid */}
                <NotificationCard
                  title="System Update"
                  message="New features have been deployed successfully."
                  type="success"
                  timestamp="5 minutes ago"
                  onDismiss={() => console.log("Dismissed")}
                />
                <NotificationCard
                  title="Storage Warning"
                  message="Database storage is approaching 80% capacity."
                  type="warning"
                  timestamp="1 hour ago"
                />
              </div>
            </div>
          }
        />
      </DashboardPage>
    </DashboardLayout>
  )
}

// Alternative Compact Dashboard Layout
export function CompactDashboardPage() {
  return (
    <DashboardLayout user={sampleUser}>
      <DashboardPage
        title="Executive Dashboard"
        description="High-level overview for leadership"
      >
        {/* Compact Stats */}
        <StatsGrid className="mb-6" /> {/* 24px margin - on grid */}

        {/* Three Column Layout */}
        <div className="grid gap-6 lg:grid-cols-3"> {/* 24px gap - on grid */}
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <ChartContainer
              title="Performance Overview"
              period="Last 30 days"
            >
              <SimpleLineChart
                data={sampleChartData}
                height={200}
                color="primary"
              />
            </ChartContainer>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-4"> {/* 16px spacing - on grid */}
            <ProgressCard
              title="Goals Progress"
              current={75}
              target={100}
              unit="%"
            />
            <QuickActionsPanel actions={sampleQuickActions.slice(0, 2)} />
            <StatusOverview
              title="Status"
              items={sampleStatusItems.slice(0, 3)}
            />
          </div>
        </div>
      </DashboardPage>
    </DashboardLayout>
  )
}

// Usage:
// <SampleDashboardPage />
// or
// <CompactDashboardPage />

export default SampleDashboardPage