import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  console.log('MIDDLEWARE HIT:', pathname);
  
  if (pathname.startsWith('/admin')) {
    // Get cookie using the request object (this is the safe way in middleware)
    const userRole = req.cookies.get('userRole')?.value;
    console.log('👤 User role:', userRole);
    
    // Check if user has admin access (auditor, editor, or superAdmin)
    const adminRoles = ['auditor', 'editor', 'superAdmin'];
    if (!adminRoles.includes(userRole || '')) {
      console.log('🚫 BLOCKING - User does not have admin access, showing 404');
      
      // Rewrite to 404 page to pretend admin pages don't exist
      return NextResponse.rewrite(new URL('/404', req.url));
    }
    
    console.log('✅ ALLOWING - User has admin access:', userRole);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
