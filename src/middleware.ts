import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // find path from request object
  const path: string = request.nextUrl.pathname;

  const isPublicPath: boolean = path === "/login" || path === "/signup";

  const token: string = request.cookies.get("token")?.value || "";

  // if user is logged in, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:path*"],
};
