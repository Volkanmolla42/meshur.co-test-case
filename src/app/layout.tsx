/**
 * Root Layout
 */

import { routing } from '@/i18n/routing';
import { ClientProviders } from '@/shared/providers/client-providers';
import { ServerProviders } from '@/shared/providers/server-providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { getLocale, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        template: '%s | Meşhur',
        default: 'Meşhur - Türkiye\'nin En Meşhur Ürünleri',
    },
    description:
        'Kaliteli ve güvenilir alışveriş deneyimi. Türkiye\'nin en meşhur ürünleri şimdi kapınızda.',
    keywords: ['e-ticaret', 'pazaryeri', 'online alışveriş', 'güzellik', 'kozmetik'],
    authors: [{ name: 'Meşhur' }],
    creator: 'Meşhur',
    metadataBase: new URL('https://meshur.co'),
    openGraph: {
        type: 'website',
        locale: 'tr_TR',
        alternateLocale: 'en_US',
        siteName: 'Meşhur',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@meshur',
    },
    robots: {
        index: true,
        follow: true,
    },
};

/**
 * Generate static params for all supported locales
 */
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
};

/**
 * Root Layout Component
 */
export default async function RootLayout({ children }: Props) {
    const locale = await getLocale();

    // Validate locale
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering for this locale
    setRequestLocale(locale);

    return (
        <html
            lang={locale}
            className={`${geistSans.variable} ${geistMono.variable}`}
            suppressHydrationWarning
        >
            <body className="min-h-screen bg-background font-sans text-foreground antialiased">
                <ServerProviders locale={locale}>
                    <ClientProviders>{children}</ClientProviders>
                </ServerProviders>
            </body>
        </html>
    );
}
