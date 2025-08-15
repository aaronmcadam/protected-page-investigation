# Permission System Usage Guide

## Overview

The complete Permission Management system has been implemented with:

- **5 Role System**: Guest, Customer, Auditor, Editor, Super Admin
- **10 Permissions**: Granular CRUD permissions for users and settings
- **Permission Matrix**: Visual admin interface for managing permissions
- **Protect Component**: Conditional rendering based on permissions
- **Enhanced Role Switcher**: Detailed role descriptions

## Role Hierarchy

```
Guest (no access) 
  ↓
Customer (public access only)
  ↓  
Auditor (read-only admin + exports)
  ↓
Editor (user management, no delete)
  ↓
Super Admin (full system control)
```

## Permission Structure

### User Management (5 permissions)
- `users:read` - View user list and details
- `users:create` - Add new users  
- `users:update` - Edit existing users
- `users:delete` - Remove users (Super Admin only)
- `users:export` - Export user data (Auditor + Super Admin)

### System Settings (5 permissions)  
- `settings:access` - Access settings page (Super Admin only)
- `permissions:read` - View permission matrix (Super Admin only)
- `permissions:update` - Edit permissions (Super Admin only)
- `webhooks:read` - View webhook config (Super Admin only)
- `webhooks:update` - Edit webhooks (Super Admin only)

## Type System Design

### UserRole vs AdminRole

```typescript
// UserRole - All possible roles (used for auth state, cookies, role switching)
export type UserRole = 'guest' | 'customer' | 'auditor' | 'editor' | 'superAdmin'

// AdminRole - Only admin roles (used for permission matrix, admin operations)  
export type AdminRole = 'auditor' | 'editor' | 'superAdmin'
```

### isAdminRole() Helper Benefits

```typescript
// Without helper - error prone and not type-safe
if (['auditor', 'editor', 'superAdmin'].includes(role)) {
  // TypeScript doesn't know role is AdminRole here
}

// With helper - type-safe and maintainable
if (isAdminRole(role)) {
  // TypeScript knows role is AdminRole here
  // Can safely use admin-specific operations
}
```

## Usage Examples

### 1. Conditional UI with Protect Component

```tsx
import { Protect } from '@/components/permissions'

// Show create button only to editors and super admins
<Protect permission="users:create">
  <Button>Add User</Button>
</Protect>

// Show with fallback for unauthorized users
<Protect 
  permission="users:delete"
  fallback={<p>Contact admin to delete users</p>}
>
  <DeleteUserButton />
</Protect>

// Role-based protection
<Protect role="superAdmin">
  <DangerousAction />
</Protect>
```

### 2. Permission Checking in Components

```tsx
import { usePermissions } from '@/hooks/usePermissions'

function UserActions({ userId }: { userId: string }) {
  const { hasPermission, hasRole } = usePermissions()
  
  return (
    <div className="flex gap-2">
      {hasPermission('users:update') && (
        <Button onClick={() => editUser(userId)}>Edit</Button>
      )}
      
      {hasPermission('users:delete') && (
        <Button variant="destructive" onClick={() => deleteUser(userId)}>
          Delete
        </Button>
      )}
      
      {hasRole('superAdmin') && (
        <Button variant="outline">Admin Actions</Button>
      )}
    </div>
  )
}
```

### 3. Navigation Protection

```tsx
import { Protect } from '@/components/permissions'

function AdminNavigation() {
  return (
    <nav>
      {/* All admin roles can access users */}
      <Protect permission="users:read">
        <NavLink href="/admin/users">Users</NavLink>
      </Protect>
      
      {/* Only super admins can access settings */}
      <Protect permission="settings:access">
        <NavLink href="/admin/settings">Settings</NavLink>
      </Protect>
    </nav>
  )
}
```

### 4. Permission Matrix Configuration

The Permission Matrix component allows Super Admins to:

- ✅ View all permissions in a clear table format
- ✅ Toggle permissions for each role with interactive checkboxes  
- ✅ Search and filter permissions
- ✅ See permission descriptions via tooltips
- ✅ Real-time optimistic updates with error rollback

Access via: `/admin/settings` (Super Admin only)

### 5. Role Switching (Demo Mode)

The Role Switcher component now shows:

- **Role icons**: Meaningful icons representing each role's function
  - 👤➖ Guest: UserMinus (limited access visitor)
  - 👤 Customer: User (authenticated user)  
  - 👁️ Auditor: Eye (read-only oversight)
  - ✏️ Editor: Edit (user management)
  - 🛡️ Super Admin: Shield (full control)
- **Role names & descriptions**: Clear explanation in dropdown
- **Color-coded styling**: Visual hierarchy by permission level
- **Active state indicators**: Current role highlighted
- **Smooth transitions**: Between role capabilities

## Testing the System

1. **Start as Guest**: No admin access, 404 on `/admin`
2. **Switch to Customer**: Still no admin access  
3. **Switch to Auditor**: Can access users page, see export button
4. **Switch to Editor**: Can create/edit users, no export/delete
5. **Switch to Super Admin**: Full access including settings

## Key Features

✅ **Permission-first architecture** (following industry best practices)  
✅ **Hydration-safe rendering** (no flicker on load)  
✅ **Enterprise-grade UX** (tooltips, search, clear hierarchy)  
✅ **Type-safe permissions** (TypeScript interfaces)  
✅ **Optimistic updates** (instant UI feedback)  
✅ **Scalable design** (easy to add new roles/permissions)

## Next Steps

The permission system is fully functional and ready for:

1. **Backend API integration** for persisting permission changes
2. **Additional permission categories** as features grow
3. **Role-based data filtering** in list components
4. **Audit logging** for permission changes
5. **Real-time permission updates** via WebSockets/Server-Sent Events

The foundation supports all these enhancements without architectural changes.