/**
 * Navigation Utilities with Internationalization
 *
 * This module provides type-safe navigation utilities that integrate
 * with next-intl for locale-aware routing.
 *
 * @see https://next-intl-docs.vercel.app/docs/routing/navigation
 */

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Type-safe navigation utilities
 *
 * These are drop-in replacements for Next.js navigation APIs:
 * - Link: Use instead of next/link
 * - redirect: Use instead of next/navigation redirect
 * - usePathname: Use instead of next/navigation usePathname
 * - useRouter: Use instead of next/navigation useRouter
 * - getPathname: Get pathname for a given route
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
