import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";
import { RoutePath } from "./utils/utils";

const PUBLIC_PATHS: string[] = [RoutePath.SIGN_IN, RoutePath.SIGN_UP];
const protectedPathsRegex =
  /^(\/GET|\/POST|\/PUT|\/PATCH|\/DELETE|\/GRAPHQL|\/HEAD|\/CONNECT|\/OPTIONS|\/TRACE|\/history)(\/.*)?$/;

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

      if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL(RoutePath.HOME, request.url));
      }

      if (
        !protectedPathsRegex.test(pathname) &&
        pathname !== "/404" &&
        pathname !== RoutePath.HOME
      ) {
        return NextResponse.redirect(new URL("/404", request.url));
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

      if (
        !PUBLIC_PATHS.includes(currentPath) &&
        currentPath !== RoutePath.HOME &&
        currentPath !== "/404"
      ) {
        if (protectedPathsRegex.test(currentPath)) {
          return NextResponse.redirect(new URL(RoutePath.HOME, request.url));
        }

        return NextResponse.redirect(new URL("/404", request.url));
      }

      return NextResponse.next();
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });

      return NextResponse.redirect(new URL(RoutePath.SIGN_IN, request.url));
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\.).*)", "/api/login", "/api/logout"],
};
