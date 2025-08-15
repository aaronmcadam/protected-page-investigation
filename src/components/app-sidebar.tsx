"use client"

import { Settings, Users, Package, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Protect } from "@/components/permissions"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Navigation items
const navigationItems = [
  {
    title: "Back to Home",
    url: "/",
    icon: ArrowLeft,
  },
]

// Admin items
const adminItems = [
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild isActive={pathname === '/admin'}>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Package className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                // Settings requires special permission check
                if (item.title === "Settings") {
                  return (
                    <Protect key={item.title} permission="settings:access">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Protect>
                  )
                }
                
                // Users requires users:read permission (available to all admin roles)
                if (item.title === "Users") {
                  return (
                    <Protect key={item.title} permission="users:read">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname === item.url}>
                          <Link href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </Protect>
                  )
                }
                
                // Fallback for any other admin items
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}