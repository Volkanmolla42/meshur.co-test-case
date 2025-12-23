import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { searchProducts } from '@/lib/api/products';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { SearchIcon } from 'lucide-react';

interface SearchPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
    params,
    searchParams,
}: SearchPageProps): Promise<Metadata> {
    const { locale } = await params;
    const { q: query } = await searchParams;
    const t = await getTranslations({ locale, namespace: 'search' });

    if (!query) {
        return {
            title: t('title'),
        };
    }

    const products = await searchProducts(query);

    return {
        title: t('meta.title', { query }),
        description: t('meta.description', { query, count: products.length }),
    };
}

export default async function SearchPage({ params, searchParams }: SearchPageProps) {
    const { locale } = await params;
    const { q: query } = await searchParams;
    setRequestLocale(locale);
    const t = await getTranslations('search');

    // Empty query state
    if (!query?.trim()) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                        <SearchIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {t('title')}
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {t('emptyQuery')}
                    </p>
                </div>
            </main>
        );
    }

    // Search for products
    const products = await searchProducts(query, 50);

    // No results state
    if (products.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {t('resultsFor', { query })}
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                        <SearchIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {t('noResults')}
                    </h2>
                    <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
                        {t('noResultsDescription', { query })}
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {t('resultsFor', { query })}
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {t('resultsCount', { count: products.length })}
                </p>
            </div>

            {/* Product Grid */}
            <ProductGrid products={products} locale={locale} />
        </main>
    );
}
