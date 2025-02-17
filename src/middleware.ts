import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match both internationalized pathnames and direct paths that need to be redirected
  matcher: [
    // Match all pathnames except for
    // - /api, /_next, /_vercel, /static, /public, /favicon.ico
    '/((?!api|_next|_vercel|static|public|favicon.ico).*)',
  ],
};
