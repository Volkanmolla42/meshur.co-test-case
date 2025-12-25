/**
 * Request-Scoped Internationalization Configuration
 *
 * This module provides request-scoped i18n configuration for Server Components
 * and Server Actions in Next.js.
 *
 * @see https://next-intl-docs.vercel.app/docs/usage/configuration
 */

import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

/**
 * Request configuration for next-intl
 */
export default getRequestConfig(async ({ requestLocale }) => {
  // Get the locale from the request
  let locale = await requestLocale;

  // Validate and fallback to default
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Load messages for the requested locale
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    // Fallback to default locale if message file not found
    messages = (await import(`../../messages/${routing.defaultLocale}.json`))
      .default;
  }

  return {
    locale,
    messages,
    timeZone: 'Europe/Istanbul',
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
        long: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        },
      },
      number: {
        currency: {
          style: 'currency',
          currency: 'TRY',
        },
        percent: {
          style: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
    },
  };
});
