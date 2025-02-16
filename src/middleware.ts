import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

// Specify each path explicitly for static analysis
export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (inside /public)
    // - .*\\..*\$ (files with extensions like favicon.ico)
    '/((?!api|_next|static|.*\\..*$).*)',
    // Match all paths that start with supported locales
    '/',
    '/en/:path*',
    '/zh/:path*',
    '/ja/:path*',
  ],
};
