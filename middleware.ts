import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  if (pathname.startsWith("/admin")) {
    const cookie = request.headers.get("cookie") || "";
    const hasAccessToken = cookie.includes("sb-access-token") || cookie.includes("sb-refresh-token");
    const isLoginPage = pathname === "/admin/login";

    if (!hasAccessToken && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    if (hasAccessToken && isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
