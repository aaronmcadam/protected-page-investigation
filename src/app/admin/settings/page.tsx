import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PermissionTable } from "@/components/permissions/PermissionTable"
import { Protect } from "@/components/permissions/Protect"
import { Lock, Key, ShieldX } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      
      <Protect 
        permission="settings:access"
        fallback={
          <div className="flex flex-1 flex-col gap-6 p-4 pt-0 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldX className="h-5 w-5 text-destructive" />
                  Access Denied
                </CardTitle>
                <CardDescription>
                  You don&apos;t have permission to access system settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    Access to system settings is restricted to users with elevated privileges. 
                    Please contact your system administrator if you believe you should have access to this area.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        }
      >
        <div className="flex flex-1 flex-col gap-6 p-4 pt-0 max-w-4xl">
        {/* Permission Management - Only accessible to Super Admins */}
        <Protect 
          permission="permissions:read"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  Permission Management
                </CardTitle>
                <CardDescription>
                  Manage role permissions and access control for admin users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    You don&apos;t have permission to view or modify system permissions. 
                    Please contact your system administrator or support team if you need access to this feature.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          }
        >
          <PermissionTable />
        </Protect>

        {/* Webhook Configuration - Only accessible to Super Admins */}
        <Protect 
          permission="webhooks:read"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  Webhooks
                </CardTitle>
                <CardDescription>
                  Configure webhook endpoints for external integrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Key className="h-4 w-4" />
                  <AlertDescription>
                    Webhook configuration requires advanced system permissions. 
                    Contact your IT administrator or submit a support request to gain access to webhook management features.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configure webhook endpoints for external integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Protect 
                  permission="webhooks:update"
                  fallback={
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-app.com/webhook" 
                      disabled 
                    />
                  }
                >
                  <Input id="webhook-url" placeholder="https://your-app.com/webhook" />
                </Protect>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable webhooks</Label>
                  <p className="text-sm text-muted-foreground">
                    Send events to your webhook endpoint
                  </p>
                </div>
                <Protect 
                  permission="webhooks:update"
                  fallback={<Switch disabled />}
                >
                  <Switch />
                </Protect>
              </div>
            </CardContent>
          </Card>
        </Protect>
        </div>
      </Protect>
    </>
  )
}