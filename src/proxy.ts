/**
 * Proxy for Internationalization (Next.js 16+)
 *
 * This proxy handles:
 * - Locale detection from Accept-Language header
 * - Locale-based routing and redirects
 * - Cookie-based locale persistence
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/middleware
 */

import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

/**
 * Create and export the internationalization middleware
 */
export default createMiddleware(routing);

/**
 * Middleware configuration
 */
export const config = {
  matcher: [
    // Match all pathnames
    '/',
    // Match all pathnames within supported locales
    '/(tr|en)/:path*',
    // Match all other pathnames except static files
    '/((?!_next|api|.*\\.[\\w]+$).*)',
  ],
};
