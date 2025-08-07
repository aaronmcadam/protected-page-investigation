import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from '@/components/ui/breadcrumb'

export default function UsersLoading() {
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
                <Skeleton className="h-4 w-12" />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          </CardHeader>
          <CardContent>
            {/* Table header */}
            <div className="flex gap-4 mb-4 pb-2 border-b">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            {/* Table rows */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex gap-4 py-3 border-b border-gray-100">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
            
            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}