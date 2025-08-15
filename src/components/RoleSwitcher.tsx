"use client";

import { useAuth } from "@/contexts/AuthContext";
import { ROLES } from "@/lib/permissions";
import { UserRole } from "@/lib/permissions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Shield, UserMinus, Eye, Edit } from "lucide-react";

/**
 * RoleSwitcher - Role Selection with Loading State
 * 
 * This component handles the tricky timing around cookie-based authentication.
 * Without the skeleton state, users would see a flicker:
 * 1. Component renders with 'guest' role (default)
 * 2. Cookie loads, role changes to 'superAdmin' 
 * 3. User sees: Guest → SuperAdmin (jarring flash)
 * 
 * With skeleton state:
 * 1. Component renders with skeleton (ready = false)
 * 2. Cookie loads, ready becomes true
 * 3. User sees: Skeleton → SuperAdmin (smooth transition)
 */
export function RoleSwitcher() {
  const { currentRole, setRole, ready } = useAuth();

  const roleIcons = {
    guest: UserMinus,
    customer: User,
    auditor: Eye,
    editor: Edit,
    superAdmin: Shield,
  };

  const roleIconStyles = {
    guest: "bg-gray-100 text-gray-500",
    customer: "bg-blue-100 text-blue-600",
    auditor: "bg-green-100 text-green-600",
    editor: "bg-orange-100 text-orange-600",
    superAdmin: "bg-red-100 text-red-600",
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-12 px-3 bg-white/95 backdrop-blur-sm border-gray-200 hover:bg-gray-50 data-[state=open]:bg-gray-50"
            disabled={!ready}
          >
            {!ready ? (
              // Skeleton state while loading role from cookie
              <>
                <div className="h-8 w-8 rounded-lg bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground opacity-50" />
              </>
            ) : (
              // Normal state with loaded role
              (() => {
                const currentRoleData = ROLES.find((role) => role.key === currentRole);
                const CurrentRoleIcon = roleIcons[currentRole];
                return (
                  <>
                    <div
                      className={`h-8 w-8 rounded-lg flex items-center justify-center ${roleIconStyles[currentRole]}`}
                    >
                      <CurrentRoleIcon className="h-4 w-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                      <span className="truncate font-medium">
                        {currentRoleData?.name}
                      </span>
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                  </>
                );
              })()
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[280px] rounded-lg"
          side="bottom"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-sm font-medium text-muted-foreground">
            Switch Role
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {ROLES.map((role, index) => {
              const RoleIcon = roleIcons[role.key];
              const isActive = currentRole === role.key;
              const isLast = index === ROLES.length - 1;

              return (
                <div key={role.key}>
                  <DropdownMenuItem
                    onClick={() => handleRoleChange(role.key)}
                    className="cursor-pointer p-3 items-start"
                  >
                    <RoleIcon className="mr-3 h-4 w-4 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col flex-1">
                      <span className="font-medium">{role.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {role.description}
                      </span>
                    </div>
                    {isActive && (
                      <div className="ml-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                    )}
                  </DropdownMenuItem>
                  {!isLast && <DropdownMenuSeparator />}
                </div>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

