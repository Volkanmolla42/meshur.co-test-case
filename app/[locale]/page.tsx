import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Truck, Shield, Clock, RotateCcw } from 'lucide-react';
import { getFeaturedProducts, getBestSellingProducts } from '@/lib/api/products';
import { getFeaturedCategories } from '@/lib/api/categories';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { CategoryChips } from '@/components/molecules/CategoryChip';
import { Button } from '@/components/atoms/Button';

interface HomePageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            locale: locale === 'tr' ? 'tr_TR' : 'en_US',
            url: `https://meshur.co/${locale}`,
            siteName: 'Meşhur',
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: t('meta.title'),
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.description'),
        },
        alternates: {
            canonical: `https://meshur.co/${locale}`,
            languages: {
                tr: 'https://meshur.co/tr',
                en: 'https://meshur.co/en',
            },
        },
    };
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;

export default async function HomePage({ params }: HomePageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });
    const tCommon = await getTranslations({ locale, namespace: 'common' });

    // Fetch data in parallel
    const [featuredProducts, bestSellers, categories] = await Promise.all([
        getFeaturedProducts(8),
        getBestSellingProducts(8),
        getFeaturedCategories(6),
    ]);

    const trustBadges = [
        {
            icon: Truck,
            title: t('trustBadges.freeShipping'),
            description: t('trustBadges.freeShippingDesc'),
        },
        {
            icon: Shield,
            title: t('trustBadges.securePayment'),
            description: t('trustBadges.securePaymentDesc'),
        },
        {
            icon: Clock,
            title: t('trustBadges.fastDelivery'),
            description: t('trustBadges.fastDeliveryDesc'),
        },
        {
            icon: RotateCcw,
            title: t('trustBadges.easyReturn'),
            description: t('trustBadges.easyReturnDesc'),
        },
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-r from-orange-500 to-orange-600 py-16 text-white lg:py-24">
                <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-3xl font-bold leading-tight lg:text-5xl">
                            {t('hero.title')}
                        </h1>
                        <p className="mt-4 text-lg text-orange-100 lg:text-xl">
                            {t('hero.subtitle')}
                        </p>
                        <div className="mt-8">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="bg-white text-orange-600 hover:bg-orange-50"
                            >
                                {t('hero.cta')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="border-b border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {trustBadges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                    <badge.icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {badge.title}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {badge.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Chips */}
            <section className="bg-white py-6 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <CategoryChips categories={categories} locale={locale} />
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-gray-50 py-12 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('bestSellers')}
                        </h2>
                        <Link
                            href={`/${locale}/products`}
                            className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
                        >
                            {tCommon('seeAll')}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <ProductGrid products={featuredProducts} locale={locale} columns={4} />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="bg-white py-12 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {t('newArrivals')}
                        </h2>
                        <Link
                            href={`/${locale}/products?sort=newest`}
                            className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
                        >
                            {tCommon('seeAll')}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <ProductGrid products={bestSellers} locale={locale} columns={4} />
                </div>
            </section>

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'Meşhur',
                        url: 'https://meshur.co',
                        potentialAction: {
                            '@type': 'SearchAction',
                            target: {
                                '@type': 'EntryPoint',
                                urlTemplate: `https://meshur.co/${locale}/search?q={search_term_string}`,
                            },
                            'query-input': 'required name=search_term_string',
                        },
                    }),
                }}
            />
        </div>
    );
}
