import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
    locale: string;
}

export function Footer({ locale }: FooterProps) {
    const t = useTranslations('footer');

    const footerLinks = {
        corporate: [
            { href: `/${locale}/about`, label: t('corporate.about') },
            { href: `/${locale}/careers`, label: t('corporate.careers') },
            { href: `/${locale}/press`, label: t('corporate.press') },
            { href: `/${locale}/blog`, label: t('corporate.blog') },
        ],
        customer: [
            { href: `/${locale}/help`, label: t('customer.help') },
            { href: `/${locale}/returns`, label: t('customer.returns') },
            { href: `/${locale}/shipping`, label: t('customer.shipping') },
            { href: `/${locale}/contact`, label: t('customer.contact') },
        ],
        legal: [
            { href: `/${locale}/terms`, label: t('legal.terms') },
            { href: `/${locale}/privacy`, label: t('legal.privacy') },
            { href: `/${locale}/cookies`, label: t('legal.cookies') },
        ],
    };

    return (
        <footer className="border-t border-gray-200 bg-gray-900 text-gray-300 dark:border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href={`/${locale}`} className="inline-block">
                            <span className="text-2xl font-bold text-orange-500">Meşhur</span>
                        </Link>
                        <p className="mt-4 max-w-sm text-sm text-gray-400">
                            Türkiye&apos;nin en meşhur ürünleri artık kapınızda. Kaliteli ve güvenilir
                            alışveriş deneyimi.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex gap-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-gray-700"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Corporate Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">{t('corporate.title')}</h3>
                        <ul className="space-y-3">
                            {footerLinks.corporate.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-orange-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">{t('customer.title')}</h3>
                        <ul className="space-y-3">
                            {footerLinks.customer.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-orange-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="mb-4 font-semibold text-white">{t('legal.title')}</h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-400 transition-colors hover:text-orange-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* App Download */}
                        <div className="mt-6">
                            <h4 className="mb-3 text-sm font-medium text-white">{t('apps.title')}</h4>
                            <div className="flex gap-2">
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-lg bg-gray-800 px-3 py-2 text-xs transition-colors hover:bg-gray-700"
                                >
                                    App Store
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-lg bg-gray-800 px-3 py-2 text-xs transition-colors hover:bg-gray-700"
                                >
                                    Google Play
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-800 pt-8">
                    <p className="text-center text-sm text-gray-500">{t('copyright')}</p>
                </div>
            </div>
        </footer>
    );
}
