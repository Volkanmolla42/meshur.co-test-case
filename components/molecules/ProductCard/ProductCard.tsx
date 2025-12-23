'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import {
    formatPrice,
    getLowestPrice,
    getHighestCompareAtPrice,
    getMainImage,
    getDiscountPercentage,
    isInStock,
} from '@/lib/transformers/product';
import { useFavoritesStore } from '@/store/favorites';
import { useCartStore } from '@/store/cart';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';

interface ProductCardProps {
    product: Product;
    locale: string;
    priority?: boolean;
}

export function ProductCard({ product, locale, priority = false }: ProductCardProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const addToCart = useCartStore((state) => state.addItem);
    const price = getLowestPrice(product.variants);
    const compareAtPrice = getHighestCompareAtPrice(product.variants);
    const image = getMainImage(product);
    const isFav = isFavorite(product.id);
    const inStock = isInStock(product);
    const discountPercentage =
        compareAtPrice && compareAtPrice > price
            ? getDiscountPercentage(compareAtPrice, price)
            : null;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
        >
            {/* Image Container */}
            <Link
                href={`/${locale}/p/${product.slug}`}
                className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800"
            >
                <Image
                    src={image}
                    alt={product.name}
                    fill
                    priority={priority}
                    className={cn(
                        'object-contain p-4 transition-transform duration-300 group-hover:scale-105',
                        !inStock && 'opacity-50'
                    )}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Badges */}
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                    {product.badge && (
                        <Badge variant="success" size="sm">
                            {product.badge}
                        </Badge>
                    )}
                    {discountPercentage && (
                        <Badge variant="danger" size="sm">
                            %{discountPercentage}
                        </Badge>
                    )}
                    {!inStock && (
                        <Badge variant="default" size="sm">
                            Stokta Yok
                        </Badge>
                    )}
                </div>

                {/* Image pagination dots (for products with multiple images) */}
                {product.variants[0]?.thumbnails.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
                        {product.variants[0].thumbnails.slice(0, 4).map((_, idx) => (
                            <span
                                key={idx}
                                className={cn(
                                    'h-1.5 w-1.5 rounded-full',
                                    idx === 0 ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                                )}
                            />
                        ))}
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                {/* Brand */}
                {product.brand && (
                    <span className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                        {product.brand.name}
                    </span>
                )}

                {/* Product Name */}
                <Link href={`/${locale}/p/${product.slug}`}>
                    <h3 className="line-clamp-2 text-sm font-medium text-gray-900 transition-colors group-hover:text-orange-500 dark:text-gray-100">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                {product.rating && (
                    <div className="mt-1 flex items-center gap-1">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                    key={star}
                                    className={cn(
                                        'h-3.5 w-3.5',
                                        star <= Math.round(product.rating!)
                                            ? 'text-yellow-400'
                                            : 'text-gray-200 dark:text-gray-700'
                                    )}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({product.reviewCount})
                        </span>
                    </div>
                )}

                {/* Price */}
                <div className="mt-auto pt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(price)}
                        </span>
                        {compareAtPrice && compareAtPrice > price && (
                            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                {formatPrice(compareAtPrice)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite(product);
                }}
                className={cn(
                    'absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow-md transition-all',
                    'hover:scale-110 dark:bg-gray-800',
                    isFav && 'bg-red-50 dark:bg-red-900/30'
                )}
                aria-label={isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
            >
                <Heart
                    className={cn(
                        'h-5 w-5 transition-colors',
                        isFav ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                    )}
                />
            </button>

            {/* Add to Cart Button - Appears on hover */}
            {inStock && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product, product.variants[0]);
                    }}
                    className="absolute bottom-20 right-4 z-10 rounded-full bg-orange-500 p-3 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    aria-label="Sepete ekle"
                >
                    <ShoppingCart className="h-5 w-5" />
                </motion.button>
            )}
        </motion.article>
    );
}
