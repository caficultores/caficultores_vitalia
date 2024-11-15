import { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";
import { auth } from "./auth";

const intlMiddleware = createIntlMiddleware(routing);

const authMiddleware = auth((req) => {
  // TODO: improve this, I think this is not the best way but it works: Andrey
  const privateRoutes = [
    'cupper-dashboard',
    'grower-dashboard',
  ];
  const isPrivateRoute = privateRoutes.some(route => req.nextUrl.pathname.includes(route));
  if (isPrivateRoute && !!!req.auth) {
    return Response.redirect(new URL(`/login`, req.nextUrl));
  }
  return intlMiddleware(req);
});

export default async function middleware(req: NextRequest) {
  return (authMiddleware as unknown as (req: NextRequest) => Promise<NextRequest>)(req);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/', '/(es|en)/:path*', "/((?!api|_next/static|_next/image|images|favicon.ico).*)"],
};


