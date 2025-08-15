import { Permission, RoleDefinition, PermissionMatrix, UserRole, AdminRole } from '@/types/permissions'

// Re-export types for easier imports
export type { UserRole, AdminRole } from '@/types/permissions'

// Permission definitions with human-readable names and descriptions
export const PERMISSIONS: Permission[] = [
  // User Management Permissions
  {
    key: 'users:read',
    name: 'View users',
    description: 'View the list of users and their details',
    category: 'users'
  },
  {
    key: 'users:create',
    name: 'Create new users',
    description: 'Add new user accounts to the system',
    category: 'users'
  },
  {
    key: 'users:update',
    name: 'Edit user details',
    description: 'Modify existing user information and settings',
    category: 'users'
  },
  {
    key: 'users:delete',
    name: 'Delete users',
    description: 'Remove user accounts from the system permanently',
    category: 'users'
  },
  {
    key: 'users:export',
    name: 'Export user data',
    description: 'Download user information and generate reports',
    category: 'users'
  },

  // System Settings Permissions
  {
    key: 'settings:access',
    name: 'Access settings',
    description: 'View and navigate to system configuration pages',
    category: 'settings'
  },
  {
    key: 'permissions:read',
    name: 'View permissions',
    description: 'See the current permission matrix and role configurations',
    category: 'settings'
  },
  {
    key: 'permissions:update',
    name: 'Manage permissions',
    description: 'Modify role permissions and access control settings',
    category: 'settings'
  },
  {
    key: 'webhooks:read',
    name: 'View webhooks',
    description: 'See webhook configurations and their status',
    category: 'settings'
  },
  {
    key: 'webhooks:update',
    name: 'Manage webhooks',
    description: 'Configure webhook endpoints and settings',
    category: 'settings'
  }
]

// Role definitions with descriptions for role switcher
export const ROLES: RoleDefinition[] = [
  {
    key: 'guest',
    name: 'Guest',
    description: 'Unauthenticated visitor with no access to protected content',
    permissions: [],
    isAdmin: false
  },
  {
    key: 'customer',
    name: 'Customer',
    description: 'Authenticated user with access to public features only',
    permissions: [],
    isAdmin: false
  },
  {
    key: 'auditor',
    name: 'Auditor',
    description: 'Read-only admin access with reporting and export capabilities',
    permissions: [
      'users:read',
      'users:export'
    ],
    isAdmin: true
  },
  {
    key: 'editor',
    name: 'Editor',
    description: 'User management focused role with create and update capabilities',
    permissions: [
      'users:read',
      'users:create', 
      'users:update'
    ],
    isAdmin: true
  },
  {
    key: 'superAdmin',
    name: 'Super Admin',
    description: 'Complete system control with access to all features and settings',
    permissions: [
      'users:read',
      'users:create',
      'users:update',
      'users:delete',
      'users:export',
      'settings:access',
      'permissions:read',
      'permissions:update',
      'webhooks:read',
      'webhooks:update'
    ],
    isAdmin: true
  }
]

// Default permission matrix mapping permissions to roles
export const PERMISSION_MATRIX: PermissionMatrix = {
  'users:read': { auditor: true, editor: true, superAdmin: true },
  'users:create': { auditor: false, editor: true, superAdmin: true },
  'users:update': { auditor: false, editor: true, superAdmin: true },
  'users:delete': { auditor: false, editor: false, superAdmin: true },
  'users:export': { auditor: true, editor: false, superAdmin: true },
  'settings:access': { auditor: false, editor: false, superAdmin: true },
  'permissions:read': { auditor: false, editor: false, superAdmin: true },
  'permissions:update': { auditor: false, editor: false, superAdmin: true },
  'webhooks:read': { auditor: false, editor: false, superAdmin: true },
  'webhooks:update': { auditor: false, editor: false, superAdmin: true }
}

// Get current permission matrix from cookie or default
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function getCurrentPermissionMatrix(): PermissionMatrix {
  const cookie = getCookie('permissionMatrix')
  if (cookie) {
    try {
      return JSON.parse(cookie)
    } catch (error) {
      console.error('Failed to parse permission matrix from cookie:', error)
    }
  }
  return PERMISSION_MATRIX
}

// Helper functions
export const getRoleDefinition = (role: UserRole): RoleDefinition | undefined => {
  return ROLES.find(r => r.key === role)
}

export const getPermissionsByCategory = (category: 'users' | 'settings'): Permission[] => {
  return PERMISSIONS.filter(p => p.category === category)
}

export const hasPermission = (role: UserRole, permission: string): boolean => {
  if (role === 'superAdmin') return true
  
  // Check if role is an admin role first
  if (!isAdminRole(role)) {
    const roleDefinition = getRoleDefinition(role)
    return roleDefinition?.permissions.includes(permission) ?? false
  }
  
  // For admin roles, check the current permission matrix (including cookie overrides)
  const currentMatrix = getCurrentPermissionMatrix()
  return currentMatrix[permission]?.[role as AdminRole] ?? false
}

/**
 * Type guard to check if a user role is an admin role
 * This provides TypeScript type narrowing - after this check,
 * TypeScript knows the role is AdminRole, not just UserRole
 * 
 * Use cases:
 * - Permission matrix operations (only admin roles have permissions)
 * - Admin-specific UI components
 * - Type-safe admin role operations
 */
export const isAdminRole = (role: UserRole): role is AdminRole => {
  return ['auditor', 'editor', 'superAdmin'].includes(role)
}

/**
 * Get all admin roles for use in permission matrix and admin components
 * Returns roles that have admin panel access and permissions
 */
export const getAdminRoles = (): AdminRole[] => {
  return ['auditor', 'editor', 'superAdmin']
}