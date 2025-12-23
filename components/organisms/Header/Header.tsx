'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
    Search,
    Heart,
    ShoppingCart,
    User,
    Menu,
    Globe,
    Moon,
    Sun,
    HelpCircle,
    ChevronDown,
} from 'lucide-react';
import { SearchBar } from '@/components/molecules/SearchBar';
import { useThemeStore } from '@/store/theme';
import { useFavoritesStore } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

// Hook to track if component is mounted (client-side only)
const emptySubscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
    return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}

interface HeaderProps {
    locale: string;
}

export function Header({ locale }: HeaderProps) {
    const t = useTranslations('common');
    const { setTheme, resolvedTheme, initializeTheme } = useThemeStore();
    const favoriteCount = useFavoritesStore((state) => state.ids.length);
    const cartCount = useCartStore((state) => state.getCartCount());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mounted = useIsMounted();

    useEffect(() => {
        initializeTheme();
    }, [initializeTheme]);

    const toggleTheme = useCallback(() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }, [setTheme, resolvedTheme]);

    const otherLocale = locale === 'tr' ? 'en' : 'tr';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            {/* Top Bar */}
            <div className="hidden border-b border-gray-100 bg-gray-50 py-1.5 text-xs dark:border-gray-800 dark:bg-gray-950 lg:block">
                <div className="container mx-auto flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 dark:text-gray-400">
                            Ücretsiz kargo için 150 TL ve üzeri alışveriş yapın
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${locale}/seller`}
                            className="text-gray-600 hover:text-orange-500 dark:text-gray-400"
                        >
                            Satıcı Portalı
                        </Link>
                        <Link
                            href={`/${locale}/help`}
                            className="flex items-center gap-1 text-gray-600 hover:text-orange-500 dark:text-gray-400"
                        >
                            <HelpCircle className="h-3.5 w-3.5" />
                            {t('support')}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center gap-4 lg:h-20 lg:gap-8">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden"
                        aria-label="Menu"
                    >
                        <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                    </button>

                    {/* Logo */}
                    <Link href={`/${locale}`} className="shrink-0">
                        <span className="text-2xl font-bold text-orange-500">Meşhur</span>
                    </Link>

                    {/* Categories Button - Desktop */}
                    <button className="hidden items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 lg:flex">
                        <Menu className="h-5 w-5" />
                        {t('categories')}
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Search Bar - Desktop */}
                    <div className="hidden flex-1 lg:block">
                        <SearchBar locale={locale} className="max-w-2xl" />
                    </div>

                    {/* Right Actions */}
                    <div className="ml-auto flex items-center gap-2 lg:gap-3">
                        {/* Language Switcher */}
                        <Link
                            href={`/${otherLocale}`}
                            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:flex"
                        >
                            <Globe className="h-4 w-4" />
                            {otherLocale.toUpperCase()}
                        </Link>

                        {/* Theme Toggle */}
                        {mounted && (
                            <button
                                onClick={toggleTheme}
                                className="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:block"
                                aria-label={resolvedTheme === 'dark' ? t('lightMode') : t('darkMode')}
                            >
                                {resolvedTheme === 'dark' ? (
                                    <Sun className="h-5 w-5" />
                                ) : (
                                    <Moon className="h-5 w-5" />
                                )}
                            </button>
                        )}

                        {/* Login */}
                        <Link
                            href={`/${locale}/login`}
                            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:flex"
                        >
                            <User className="h-5 w-5" />
                            {t('login')}
                        </Link>

                        {/* Favorites */}
                        <Link
                            href={`/${locale}/favorites`}
                            className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            aria-label={t('favorites')}
                        >
                            <Heart className="h-5 w-5" />
                            {favoriteCount > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                    {favoriteCount > 9 ? '9+' : favoriteCount}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <Link
                            href={`/${locale}/cart`}
                            className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            aria-label={t('cart')}
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {mounted && cartCount > 0 && (
                                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Search */}
                        <button
                            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
                            aria-label={t('search')}
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="pb-3 lg:hidden">
                    <SearchBar locale={locale} />
                </div>
            </div>
        </header>
    );
}
