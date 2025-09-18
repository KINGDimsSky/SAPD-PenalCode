import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isLoggedIn = !!token;
  const userRole = token?.role as string;
  const isNewAccount = token?.ifNewAccount as boolean;

  if (isLoggedIn && isNewAccount && pathname !== '/setup-profile') {
    return NextResponse.redirect(new URL('/setup-profile', req.url));
  }

  if (pathname.startsWith('/admin')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (userRole !== 'Admin') {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (pathname.startsWith('/factions') || pathname.startsWith('/setup-profile')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  
  if ((pathname === '/login' || pathname.startsWith('/register')) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};