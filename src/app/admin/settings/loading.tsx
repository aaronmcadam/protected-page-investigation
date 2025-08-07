import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb'

export default function SettingsLoading() {
  return (
    <>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Skeleton className="h-4 w-12" />
              </BreadcrumbItem>
              <Skeleton className="h-4 w-4" />
              <BreadcrumbItem>
                <Skeleton className="h-4 w-16" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-6">
          {/* Permissions Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-6 w-11 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Webhooks Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-20 w-full" />
              </div>
              <Skeleton className="h-9 w-20" />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}