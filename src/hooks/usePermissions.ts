"use client"

import { useAuth } from '@/contexts/AuthContext'
import { hasPermission as checkPermission, UserRole, AdminRole } from '@/lib/permissions'

export function usePermissions() {
  const { currentRole, ready } = useAuth()

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!ready) return false
    return checkPermission(currentRole, permission)
  }

  // Check if user has a specific role
  const hasRole = (role: UserRole): boolean => {
    if (!ready) return false
    return currentRole === role
  }

  // Check if user has any of the specified permissions
  const hasAnyPermission = (permissions: string[]): boolean => {
    if (!ready) return false
    return permissions.some(permission => hasPermission(permission))
  }

  // Check if user has all of the specified permissions
  const hasAllPermissions = (permissions: string[]): boolean => {
    if (!ready) return false
    return permissions.every(permission => hasPermission(permission))
  }

  // Check if user is an admin (has any admin role)
  // Note: This works before 'ready' because it only checks the role, 
  // not granular permissions that might be customized in cookies
  const isAdmin = (): boolean => {
    return ['auditor', 'editor', 'superAdmin'].includes(currentRole)
  }

  // Check if user has admin role of specific level or higher
  const hasAdminLevel = (minLevel: AdminRole): boolean => {
    if (!ready) return false
    
    const adminHierarchy: AdminRole[] = ['auditor', 'editor', 'superAdmin']
    const currentIndex = adminHierarchy.indexOf(currentRole as AdminRole)
    const requiredIndex = adminHierarchy.indexOf(minLevel)
    
    return currentIndex >= 0 && currentIndex >= requiredIndex
  }

  return {
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
    isAdmin,
    hasAdminLevel,
    ready,
    currentRole
  }
}