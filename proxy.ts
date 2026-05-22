import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const pathname = req.nextUrl.pathname;

    if (isAuth) {
      if (pathname === "/" || pathname === "/login" || pathname === "/signup") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }


    if (!isAuth) {
      const protectedPaths = ["/dashboard", "/words", "/reader", "/study", "/chat"];
      const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
      
      if (isProtectedPath) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {

      authorized: () => true,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/words/:path*",
    "/reader/:path*",
    "/study/:path*",
    "/chat/:path*",
    "/dashboard/:path*",
  ],
};