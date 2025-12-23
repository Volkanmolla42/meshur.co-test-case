'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useFavoritesStore } from '@/store/favorites';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { Button } from '@/components/atoms/Button';

export default function FavoritesPage() {
    // Since this is a client component, we need to handle params differently
    // For now, we'll use a simple approach
    const t = useTranslations('favorites');
    const { getFavoriteProducts, ids } = useFavoritesStore();
    const favorites = getFavoriteProducts();

    // Extract locale from URL for now (client-side)
    const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'tr';

    return (
        <div className="min-h-[60vh] bg-gray-50 py-8 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                        {t('title')}
                    </h1>
                    {ids.length > 0 && (
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {t('itemCount', { count: ids.length })}
                        </p>
                    )}
                </div>

                {/* Content */}
                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-16 dark:border-gray-700 dark:bg-gray-900">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <Heart className="h-8 w-8 text-gray-400" />
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                            {t('empty')}
                        </h2>
                        <p className="mt-2 max-w-sm text-center text-gray-500 dark:text-gray-400">
                            {t('emptyDescription')}
                        </p>
                        <Link href={`/${locale}`} className="mt-6">
                            <Button>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                {t('exploreProducts')}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-lg bg-white p-6 dark:bg-gray-900">
                        <ProductGrid products={favorites} locale={locale} columns={4} />
                    </div>
                )}
            </div>
        </div>
    );
}
