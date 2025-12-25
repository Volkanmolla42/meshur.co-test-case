/**
 * Locale Layout
 *
 * Provides locale-specific layout with Header and Footer
 */

import { routing } from '@/i18n/routing';
import { Footer } from '@/shared/layout/Footer';
import { Header } from '@/shared/layout/Header';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

/**
 * Generate static params for all supported locales
 */
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;

    // Validate locale
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering for this locale
    setRequestLocale(locale);

    return (
        <div className="flex min-h-screen flex-col">
            <Header locale={locale} />
            <main className="flex-1">{children}</main>
            <Footer locale={locale} />
        </div>
    );
}
