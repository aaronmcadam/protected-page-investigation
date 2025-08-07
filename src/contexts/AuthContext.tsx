"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'guest' | 'user' | 'admin'

interface AuthContextType {
  currentRole: UserRole
  setRole: (role: UserRole) => void
  isAdmin: boolean
  isHydrated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to read cookie
function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Always start with 'guest' to match server-side rendering
  const [currentRole, setCurrentRole] = useState<UserRole>('guest')
  const [isHydrated, setIsHydrated] = useState(false)

  // Read cookie after hydration to avoid mismatch
  useEffect(() => {
    const cookieRole = getCookie('userRole') as UserRole
    if (cookieRole && ['guest', 'user', 'admin'].includes(cookieRole)) {
      setCurrentRole(cookieRole)
    }
    setIsHydrated(true)
  }, [])

  const setRole = (role: UserRole) => {
    setCurrentRole(role)
    // Set cookie - single source of truth
    document.cookie = `userRole=${role}; path=/; max-age=86400`
    
    // If switching away from admin while on admin page, redirect to home
    if (typeof window !== 'undefined') {
      const isOnAdminPage = window.location.pathname.startsWith('/admin')
      const switchingAwayFromAdmin = currentRole === 'admin' && role !== 'admin'
      
      if (isOnAdminPage && switchingAwayFromAdmin) {
        window.location.href = '/'
      }
    }
  }

  const isAdmin = currentRole === 'admin'

  return (
    <AuthContext.Provider value={{ currentRole, setRole, isAdmin, isHydrated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}