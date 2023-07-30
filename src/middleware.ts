import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJWT } from "./helpers/jwtActions";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // find path from request object
  const path: string = request.nextUrl.pathname;

  const isPublicPath: boolean =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgotpassword";

  const token: string = request.cookies.get("token")?.value || "";

  const verifiedToken =
    token && (await verifyJWT(token).catch((error: any) => console.log(error)));

  if (isPublicPath && !verifiedToken) {
    return;
  }

  if (!verifiedToken) {
    // Set the token to an empty string to clear it
    const redirectUrl = new URL("/login", request.nextUrl);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  }
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail",
    "/forgotpassword",
  ],
};
