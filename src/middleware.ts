import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // In Batch 1, we just mock the authentication state.
  // We will protect /dashboard and /company routes.
  const path = request.nextUrl.pathname;
  
  // Basic mock protection: if user tries to access dashboard without being logged in
  // For UI mockup purposes, we won't strictly enforce this yet to allow testing,
  // but this is where Better Auth validation will go in Batch 2.
  
  if (path.startsWith('/dashboard') || path.startsWith('/company') || path.startsWith('/setup-company')) {
    // const session = await getSession();
    // if (!session) return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
