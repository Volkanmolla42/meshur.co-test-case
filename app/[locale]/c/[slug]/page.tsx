import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getCategoryBySlug, getCategoryBreadcrumbs, getAllCategorySlugs } from '@/lib/api/categories';
import { getProducts } from '@/lib/api/products';
import { getBrands } from '@/lib/api/brands';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { Breadcrumb, BreadcrumbItem } from '@/components/molecules/Breadcrumb';
import { SortDropdown } from '@/components/molecules/SortDropdown';
import { CategoryFilters } from '@/components/molecules/CategoryFilters';
import { SortBy } from '@/types';

interface CategoryPageProps {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{
        page?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        inStock?: string;
        brandId?: string;
    }>;
}

export async function generateStaticParams() {
    const slugs = await getAllCategorySlugs();
    const locales = ['tr', 'en'];

    return locales.flatMap((locale) =>
        slugs.map((slug) => ({ locale, slug }))
    );
}

export async function generateMetadata({
    params,
}: CategoryPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const category = await getCategoryBySlug(slug);
    const t = await getTranslations({ locale, namespace: 'category' });

    if (!category) {
        return { title: 'Not Found' };
    }

    return {
        title: t('meta.title', { name: category.name }),
        description: t('meta.description', { name: category.name }),
        openGraph: {
            title: t('meta.title', { name: category.name }),
            description: t('meta.description', { name: category.name }),
            images: category.image ? [{ url: category.image.url }] : [],
        },
    };
}

export const revalidate = 120; // ISR: 2 minutes

export default async function CategoryPage({
    params,
    searchParams,
}: CategoryPageProps) {
    const { locale, slug } = await params;
    const query = await searchParams;
    setRequestLocale(locale);
    const t = await getTranslations('category');

    const category = await getCategoryBySlug(slug);
    if (!category) {
        notFound();
    }

    // Parse query params
    const currentPage = parseInt(query.page || '1', 10);
    const currentSort = parseInt(query.sort || '0', 10) as SortBy;
    const minPrice = query.minPrice ? parseFloat(query.minPrice) : undefined;
    const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : undefined;
    const inStock = query.inStock === 'true';
    const brandId = query.brandId ? parseInt(query.brandId, 10) : undefined;

    // Fetch data in parallel
    const [productsResponse, breadcrumbs, brands] = await Promise.all([
        getProducts({
            categorySlug: slug,
            page: currentPage,
            pageSize: 20,
            sortBy: currentSort,
            minPrice,
            maxPrice,
            inStock: inStock || undefined,
            brandId,
        }),
        getCategoryBreadcrumbs(slug),
        getBrands(),
    ]);

    // Build breadcrumb items
    const breadcrumbItems: BreadcrumbItem[] = breadcrumbs.map((cat) => ({
        label: cat.name,
        href: `/${locale}/c/${cat.slug}`,
    }));

    // Remove href from last item (current page)
    if (breadcrumbItems.length > 0) {
        breadcrumbItems[breadcrumbItems.length - 1].href = undefined;
    }

    // Build JSON-LD schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.name,
        description: `${category.name} kategorisindeki ürünler`,
        url: `https://meshur.co/${locale}/c/${slug}`,
        numberOfItems: productsResponse.total,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} locale={locale} className="mb-6" />

                {/* Category Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl">
                        {category.name}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('productsFound', { count: productsResponse.total })}
                    </p>
                </div>

                {/* Subcategories */}
                {category.children.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {category.children.map((child) => (
                            <a
                                key={child.id}
                                href={`/${locale}/c/${child.slug}`}
                                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-orange-500 hover:text-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-500"
                            >
                                {child.name}
                            </a>
                        ))}
                    </div>
                )}

                {/* Filters and Sort */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <CategoryFilters
                        brands={brands}
                        initialMinPrice={minPrice}
                        initialMaxPrice={maxPrice}
                        initialInStock={inStock}
                        initialBrandId={brandId}
                    />
                    <SortDropdown currentSort={currentSort} />
                </div>

                {/* Product Grid */}
                {productsResponse.data.length > 0 ? (
                    <>
                        <ProductGrid products={productsResponse.data} locale={locale} />

                        {/* Pagination */}
                        {productsResponse.totalPages > 1 && (
                            <div className="mt-8 flex justify-center gap-2">
                                {Array.from({ length: productsResponse.totalPages }, (_, i) => i + 1).map(
                                    (page) => (
                                        <a
                                            key={page}
                                            href={`/${locale}/c/${slug}?page=${page}${currentSort !== SortBy.Recommended ? `&sort=${currentSort}` : ''}${minPrice ? `&minPrice=${minPrice}` : ''}${maxPrice ? `&maxPrice=${maxPrice}` : ''}${inStock ? '&inStock=true' : ''}${brandId ? `&brandId=${brandId}` : ''}`}
                                            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${page === currentPage
                                                    ? 'bg-orange-500 text-white'
                                                    : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
                                                }`}
                                        >
                                            {page}
                                        </a>
                                    )
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            {t('productsFound', { count: 0 })}
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}
