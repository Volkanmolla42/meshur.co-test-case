import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '@/lib/api/products';
import { Badge } from '@/components/atoms/Badge';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { ProductFavoriteButton } from '@/components/molecules/ProductFavoriteButton';
import { AddToCartButton } from '@/components/molecules/AddToCartButton';
import {
    formatPrice,
    getLowestPrice,
    getHighestCompareAtPrice,
    getAllImages,
    isInStock,
    getDiscountPercentage,
} from '@/lib/transformers/product';

interface ProductPageProps {
    params: Promise<{ locale: string; slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Enable ISR with 120 second revalidation
export const revalidate = 120;

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Ürün Bulunamadı',
        };
    }

    const image = product.variants[0]?.thumbnails[0]?.url;

    return {
        title: product.name,
        description: product.description ?? `${product.name} - Meşhur'da en uygun fiyatlarla`,
        openGraph: {
            title: product.name,
            description: product.description ?? undefined,
            type: 'website',
            url: `https://meshur.co/${locale}/p/${slug}`,
            images: image ? [{ url: image, width: 600, height: 600, alt: product.name }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: product.name,
            description: product.description ?? undefined,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { locale, slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: 'product' });
    const images = getAllImages(product);
    const price = getLowestPrice(product.variants);
    const compareAtPrice = getHighestCompareAtPrice(product.variants);
    const inStock = isInStock(product);
    const discountPercentage =
        compareAtPrice && compareAtPrice > price
            ? getDiscountPercentage(compareAtPrice, price)
            : null;

    // Get related products
    const relatedProducts = await getRelatedProducts(product.id, product.categoryId, 4);

    const features = [
        { icon: Truck, label: t('freeShipping') },
        { icon: Shield, label: t('securePayment') },
        { icon: RotateCcw, label: 'Kolay İade' },
    ];

    return (
        <div className="bg-white dark:bg-gray-900">
            {/* Breadcrumb */}
            <nav className="border-b border-gray-200 bg-gray-50 py-3 dark:border-gray-800 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <Link
                                href={`/${locale}`}
                                className="text-gray-500 hover:text-orange-500 dark:text-gray-400"
                            >
                                Ana Sayfa
                            </Link>
                        </li>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        {product.category && (
                            <>
                                <li>
                                    <Link
                                        href={`/${locale}/c/${product.category.slug}`}
                                        className="text-gray-500 hover:text-orange-500 dark:text-gray-400"
                                    >
                                        {product.category.name}
                                    </Link>
                                </li>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </>
                        )}
                        <li className="truncate font-medium text-gray-900 dark:text-white">
                            {product.name}
                        </li>
                    </ol>
                </div>
            </nav>

            {/* Product Detail */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Image
                                src={images[0]?.url ?? '/placeholder.jpg'}
                                alt={images[0]?.alt ?? product.name}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Badges */}
                            <div className="absolute left-4 top-4 flex flex-col gap-2">
                                {product.badge && <Badge variant="success">{product.badge}</Badge>}
                                {discountPercentage && (
                                    <Badge variant="danger">%{discountPercentage}</Badge>
                                )}
                            </div>
                        </div>
                        {/* Thumbnail Gallery */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-transparent bg-gray-100 transition-colors hover:border-orange-500 dark:bg-gray-800"
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.alt}
                                            fill
                                            className="object-contain p-1"
                                            sizes="80px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        {/* Brand */}
                        {product.brand && (
                            <Link
                                href={`/${locale}/brands/${product.brand.slug}`}
                                className="mb-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                            >
                                {product.brand.name}
                            </Link>
                        )}

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        {product.rating && (
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`h-5 w-5 ${star <= Math.round(product.rating!)
                                                ? 'text-yellow-400'
                                                : 'text-gray-200 dark:text-gray-700'
                                                }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {product.rating} ({product.reviewCount} değerlendirme)
                                </span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="mt-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {formatPrice(price)}
                                </span>
                                {compareAtPrice && compareAtPrice > price && (
                                    <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                                        {formatPrice(compareAtPrice)}
                                    </span>
                                )}
                            </div>
                            {/* Stock Status */}
                            <p
                                className={`mt-2 text-sm font-medium ${inStock ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {inStock ? t('inStock') : t('outOfStock')}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                            <AddToCartButton product={product} disabled={!inStock} />
                            <ProductFavoriteButton product={product} />
                        </div>

                        {/* Features */}
                        <div className="mt-8 grid grid-cols-3 gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 text-center">
                                    <feature.icon className="h-6 w-6 text-green-600" />
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        {feature.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="mt-8">
                                <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                                    {t('description')}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="border-t border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-950">
                    <div className="container mx-auto px-4">
                        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                            {t('relatedProducts')}
                        </h2>
                        <ProductGrid products={relatedProducts} locale={locale} columns={4} />
                    </div>
                </section>
            )}

            {/* JSON-LD Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Product',
                        name: product.name,
                        description: product.description,
                        image: images.map((img) => img.url),
                        brand: product.brand
                            ? { '@type': 'Brand', name: product.brand.name }
                            : undefined,
                        offers: {
                            '@type': 'Offer',
                            price: price,
                            priceCurrency: 'TRY',
                            availability: inStock
                                ? 'https://schema.org/InStock'
                                : 'https://schema.org/OutOfStock',
                            url: `https://meshur.co/${locale}/p/${slug}`,
                        },
                        aggregateRating: product.rating
                            ? {
                                '@type': 'AggregateRating',
                                ratingValue: product.rating,
                                reviewCount: product.reviewCount,
                            }
                            : undefined,
                    }),
                }}
            />
        </div>
    );
}
