"use client"

import { ReactNode } from 'react'
import { usePermissions } from '@/hooks/usePermissions'
import { UserRole, AdminRole } from '@/lib/permissions'

interface ProtectProps {
  permission?: string
  role?: UserRole
  adminLevel?: AdminRole
  fallback?: ReactNode
  children: ReactNode
}

export function Protect({ 
  permission, 
  role, 
  adminLevel, 
  fallback, 
  children 
}: ProtectProps) {
  const { hasPermission, hasRole, hasAdminLevel, ready } = usePermissions()

  // Don't render anything until auth is ready to prevent flicker
  if (!ready) {
    return null
  }

  // Check permission (highest priority)
  if (permission && !hasPermission(permission)) {
    return fallback || null
  }

  // Check admin level requirement
  if (adminLevel && !hasAdminLevel(adminLevel)) {
    return fallback || null
  }

  // Check specific role requirement
  if (role && !hasRole(role)) {
    return fallback || null
  }

  // All checks passed, render children
  return <>{children}</>
}