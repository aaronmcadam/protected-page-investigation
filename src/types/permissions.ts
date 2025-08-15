/**
 * All possible user roles in the system
 * Used for: AuthContext, role cookies, complete role switching, middleware checks
 */
export type UserRole = 'guest' | 'customer' | 'auditor' | 'editor' | 'superAdmin'

/**
 * Only admin roles that have access to admin panel and permissions
 * Used for: Permission matrix, admin-specific operations, type safety
 * Subset of UserRole - excludes 'guest' and 'customer'
 */
export type AdminRole = 'auditor' | 'editor' | 'superAdmin'

export interface Permission {
  key: string
  name: string
  description: string
  category: 'users' | 'settings'
}

export interface RoleDefinition {
  key: UserRole
  name: string
  description: string
  permissions: string[]
  isAdmin: boolean
}

export interface PermissionMatrix {
  [permissionKey: string]: {
    auditor: boolean
    editor: boolean
    superAdmin: boolean
  }
}

export interface PermissionMatrixProps {
  permissions: Permission[]
  matrix: PermissionMatrix
  onPermissionToggle: (permissionKey: string, role: AdminRole, enabled: boolean) => Promise<void>
}

declare global {
  interface Authorization {
    permission: 
      | 'users:read' | 'users:create' | 'users:update' | 'users:delete' | 'users:export'
      | 'settings:access' | 'permissions:read' | 'permissions:update' 
      | 'webhooks:read' | 'webhooks:update'
    role: AdminRole
  }
}