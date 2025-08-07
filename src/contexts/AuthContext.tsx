"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'guest' | 'user' | 'admin'

interface AuthContextType {
  currentRole: UserRole
  setRole: (role: UserRole) => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('guest')

  useEffect(() => {
    const savedRole = localStorage.getItem('mockUserRole') as UserRole
    if (savedRole && ['guest', 'user', 'admin'].includes(savedRole)) {
      setCurrentRole(savedRole)
    }
  }, [])

  const setRole = (role: UserRole) => {
    setCurrentRole(role)
    localStorage.setItem('mockUserRole', role)
  }

  const isAdmin = currentRole === 'admin'

  return (
    <AuthContext.Provider value={{ currentRole, setRole, isAdmin }}>
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