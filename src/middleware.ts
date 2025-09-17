import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!token;

  const isOnDashboard = pathname.startsWith('/dashboard');
  
  if (isOnDashboard) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (isLoggedIn) {
      const isNewAccount = token.ifNewAccount as boolean;
      const isOnSetupPage = pathname.startsWith('/dashboard/setup-profile');

      if (isNewAccount && !isOnSetupPage) {
        return NextResponse.redirect(new URL('/dashboard/setup-profile', req.url));
      }
    }
  } else if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};