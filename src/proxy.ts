import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // In Batch 1, we just mock the authentication state.
  // We will protect /dashboard and /company routes.
  const path = request.nextUrl.pathname

  const isProtectedRoute =
    path.startsWith('/dashboard') ||
    path.startsWith('/company') ||
    path.startsWith('/setup-company')

  if (isProtectedRoute) {
    // Basic protection using Better Auth session cookie
    const sessionCookie =
      request.cookies.get('better-auth.session_token') ||
      request.cookies.get('__Secure-better-auth.session_token')

    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
