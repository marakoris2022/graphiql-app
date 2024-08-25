import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";

const PUBLIC_PATHS = ["/sign-in", "/sign-up", "/"];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      const pathname = request.nextUrl.pathname;

      if (PUBLIC_PATHS.includes(pathname) && pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      console.info("Missing or malformed credentials", { reason });

      const currentPath = request.nextUrl.pathname;

      if (!PUBLIC_PATHS.includes(currentPath)) {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      return NextResponse.redirect(new URL("/sign-in", request.url));
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
