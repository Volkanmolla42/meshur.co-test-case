import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

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
  description: 'Kaliteli ve güvenilir alışveriş deneyimi. Türkiye\'nin en meşhur ürünleri şimdi kapınızda.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
