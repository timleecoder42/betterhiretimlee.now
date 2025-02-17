import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all paths that need language routing
  matcher: [
    '/',
    '/(en|zh|ja)/:path*',
    // Match specific routes without language prefix that need redirection
    '/about',
    '/blog',
    '/blog/:path*',
  ],
};
