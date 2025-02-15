import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Add cache control headers
  if (response) {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=60');
  }

  return response;
}

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
    '/en/:path*',
    '/zh/:path*',
    '/ja/:path*',
  ],
};
