/**
 * Internationalization Routing Configuration
 *
 * This module defines the routing configuration for next-intl, specifying
 * supported locales and the default locale for the application.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing
 */

import { defineRouting } from 'next-intl/routing';

/**
 * Routing configuration for internationalization
 *
 * Locales:
 * - 'tr': Turkish (default)
 * - 'en': English
 */
export const routing = defineRouting({
  /**
   * List of all supported locales
   */
  locales: ['tr', 'en'],

  /**
   * Default locale
   */
  defaultLocale: 'tr',

  /**
   * Locale prefix strategy
   * 'always': Always show locale in URL (e.g., /tr/about, /en/about)
   */
  localePrefix: 'always',
});

/**
 * Type helper for locale values
 */
export type Locale = (typeof routing.locales)[number];

/**
 * Locale display names
 */
export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
};

/**
 * Export locales array for convenience
 */
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;

