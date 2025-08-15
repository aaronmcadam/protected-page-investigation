"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserRole, isAdminRole } from "@/lib/permissions";

interface AuthContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  isAdmin: boolean;
  ready: boolean;
}

/**
 * AuthProvider - Cookie-Based Authentication with Hydration Safety
 *
 * This provider manages user authentication state using cookies for persistence.
 * The implementation handles the complex timing issues that arise when using
 * server-side rendering (SSR) with client-side cookie-based authentication.
 *
 * ## The Problem:
 *
 * 1. **Server Render**: Server has no access to browser cookies during SSR
 *    - All components render assuming 'guest' role
 *    - HTML is sent to client with guest-level permissions
 *
 * 2. **Client Hydration**: React takes over, but cookies aren't read yet
 *    - Components are interactive but still think user is 'guest'
 *    - Permission checks return false, hiding admin features
 *
 * 3. **Cookie Loading**: useEffect runs and reads the actual user role
 *    - Now we know user is actually 'superAdmin'
 *    - But UI already rendered with guest permissions
 *
 * ## The Solution:
 *
 * The `ready` state prevents permission checks until cookies are loaded:
 *
 * ```typescript
 * const hasPermission = (permission: string) => {
 *   if (!ready) return false  // Wait for cookie to load
 *   return checkPermission(currentRole, permission)
 * }
 * ```
 *
 * ## Flow:
 *
 * 1. **Initial State**: `currentRole = 'guest'`, `ready = false`
 * 2. **Permission Checks**: All return `false` (waiting for ready)
 * 3. **useEffect Runs**: Loads role from cookie, sets `ready = true`
 * 4. **Re-render**: Permission checks now work with correct role
 *
 * ## Why Not Read Cookies Immediately?
 *
 * We can't read cookies during useState initialization because:
 * - `document.cookie` doesn't exist during SSR
 * - Would cause hydration mismatch between server and client
 * - useEffect is the safe way to access browser APIs after hydration
 *
 * ## Demo vs Production:
 *
 * - **Demo**: Uses cookies for simple persistence without backend
 * - **Production**: Would fetch permissions from GraphQL, then store in cookies
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to read cookie
function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Always start with 'guest' to match server-side rendering
  const [currentRole, setCurrentRole] = useState<UserRole>("guest");
  const [ready, setReady] = useState(false);

  // Read cookie after hydration to avoid mismatch
  useEffect(() => {
    const cookieRole = getCookie("userRole") as UserRole;
    if (
      cookieRole &&
      ["guest", "customer", "auditor", "editor", "superAdmin"].includes(
        cookieRole,
      )
    ) {
      setCurrentRole(cookieRole);
    }
    setReady(true);
  }, []);

  const setRole = (role: UserRole) => {
    // Check if we need to redirect BEFORE updating state
    if (typeof window !== "undefined") {
      const isOnAdminPage = window.location.pathname.startsWith("/admin");
      const switchingAwayFromAdmin =
        isAdminRole(currentRole) && !isAdminRole(role);

      if (isOnAdminPage && switchingAwayFromAdmin) {
        // Set cookie first, then redirect immediately
        document.cookie = `userRole=${role}; path=/; max-age=86400`;
        window.location.href = "/";
        return; // Don't update state, we're redirecting
      }
    }

    // Update state and cookie for normal role changes
    setCurrentRole(role);
    document.cookie = `userRole=${role}; path=/; max-age=86400`;
  };

  const isAdmin = isAdminRole(currentRole);

  return (
    <AuthContext.Provider value={{ currentRole, setRole, isAdmin, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Remove the old UserRole export since we're now importing from permissions
// export type { UserRole } from '@/lib/permissions'

