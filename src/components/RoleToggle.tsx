"use client"

import { useAuth, UserRole } from '@/contexts/AuthContext'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, User, Shield, UserX } from 'lucide-react'

export function RoleToggle() {
  const { currentRole, setRole, isHydrated } = useAuth()

  const roles: { 
    value: UserRole
    label: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    initials: string
  }[] = [
    { 
      value: 'guest', 
      label: 'Guest', 
      description: 'No access',
      icon: UserX,
      initials: 'G'
    },
    { 
      value: 'user', 
      label: 'User', 
      description: 'Basic access',
      icon: User,
      initials: 'U'
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      description: 'Full access',
      icon: Shield,
      initials: 'A'
    }
  ]

  const currentRoleData = roles.find(role => role.value === currentRole)

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole)
  }

  return (
    <div className="fixed top-4 right-4 z-50" suppressHydrationWarning>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 px-3 bg-white/95 backdrop-blur-sm border-gray-200 hover:bg-gray-50 data-[state=open]:bg-gray-50"
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg bg-gray-100 text-gray-600 font-medium">
                {currentRoleData?.initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
              <span className="truncate font-medium">{currentRoleData?.label}</span>
              <span className="text-muted-foreground truncate text-xs">
                {currentRoleData?.description}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground">
            Switch Role (Demo)
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {roles.map((role) => {
              const RoleIcon = role.icon
              const isActive = currentRole === role.value
              
              return (
                <DropdownMenuItem
                  key={role.value}
                  onClick={() => handleRoleChange(role.value)}
                  className="cursor-pointer"
                >
                  <RoleIcon className="mr-2 h-4 w-4" />
                  <span>{role.label}</span>
                  {isActive && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}