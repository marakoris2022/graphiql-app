import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from './config';
import { MiddleWarePath, RoutePath } from './utils/utils';

const PUBLIC_PATHS: string[] = [RoutePath.SIGN_IN, RoutePath.SIGN_UP];

const protectedPaths = [
  RoutePath.REST_CLIENT_GET,
  RoutePath.REST_CLIENT_POST,
  RoutePath.REST_CLIENT_PUT,
  RoutePath.REST_CLIENT_PATCH,
  RoutePath.REST_CLIENT_DELETE,
  RoutePath.GRAPHIQL_CLIENT,
  RoutePath.HISTORY,
];

const protectedPathsRegex = new RegExp(
  `^(${protectedPaths.join('|').replace(/\//g, '\\/')})(\\/.*)?$`
);

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: MiddleWarePath.LOGIN,
    logoutPath: MiddleWarePath.LOGOUT,
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
        pathname !== '/404' &&
        pathname !== RoutePath.HOME
      ) {
        return NextResponse.redirect(new URL(RoutePath.NOT_FOUND, request.url));
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason) => {
      const currentPath = request.nextUrl.pathname;

      if (
        !PUBLIC_PATHS.includes(currentPath) &&
        currentPath !== RoutePath.HOME &&
        currentPath !== RoutePath.NOT_FOUND
      ) {
        if (protectedPathsRegex.test(currentPath)) {
          return NextResponse.redirect(new URL(RoutePath.HOME, request.url));
        }

        return NextResponse.redirect(new URL(RoutePath.NOT_FOUND, request.url));
      }

      return NextResponse.next();
    },
    handleError: async (error) => {
      return NextResponse.redirect(new URL(RoutePath.SIGN_IN, request.url));
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
