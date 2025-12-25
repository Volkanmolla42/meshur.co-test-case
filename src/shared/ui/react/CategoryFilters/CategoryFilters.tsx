'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/primitives/Button';
import { cn } from '@/shared/lib/utils/cn';
import { Brand } from '@/types';

interface CategoryFiltersProps {
    brands?: Brand[];
    className?: string;
    initialMinPrice?: number;
    initialMaxPrice?: number;
    initialInStock?: boolean;
    initialBrandId?: number;
}

export function CategoryFilters({
    brands = [],
    className,
    initialMinPrice,
    initialMaxPrice,
    initialInStock = false,
    initialBrandId,
}: CategoryFiltersProps) {
    const t = useTranslations('category.filterLabels');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [minPrice, setMinPrice] = useState(initialMinPrice?.toString() || '');
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice?.toString() || '');
    const [inStock, setInStock] = useState(initialInStock);
    const [selectedBrandId, setSelectedBrandId] = useState<number | undefined>(initialBrandId);
    const [isOpen, setIsOpen] = useState(false);

    const hasActiveFilters = minPrice || maxPrice || inStock || selectedBrandId;

    const applyFilters = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (minPrice) {
            params.set('minPrice', minPrice);
        } else {
            params.delete('minPrice');
        }

        if (maxPrice) {
            params.set('maxPrice', maxPrice);
        } else {
            params.delete('maxPrice');
        }

        if (inStock) {
            params.set('inStock', 'true');
        } else {
            params.delete('inStock');
        }

        if (selectedBrandId) {
            params.set('brandId', selectedBrandId.toString());
        } else {
            params.delete('brandId');
        }

        params.delete('page'); // Reset to page 1
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    }, [router, pathname, searchParams, minPrice, maxPrice, inStock, selectedBrandId]);

    const clearFilters = useCallback(() => {
        setMinPrice('');
        setMaxPrice('');
        setInStock(false);
        setSelectedBrandId(undefined);

        const params = new URLSearchParams(searchParams.toString());
        params.delete('minPrice');
        params.delete('maxPrice');
        params.delete('inStock');
        params.delete('brandId');
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    }, [router, pathname, searchParams]);

    return (
        <div className={cn('relative', className)}>
            {/* Mobile Filter Toggle */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600 lg:hidden"
            >
                <Filter className="h-4 w-4" />
                {t('price')}
                {hasActiveFilters && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                        !
                    </span>
                )}
            </button>

            {/* Desktop Filter Panel / Mobile Overlay */}
            <div
                className={cn(
                    'lg:block',
                    isOpen
                        ? 'fixed inset-0 z-50 flex items-end justify-center bg-black/50 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent'
                        : 'hidden'
                )}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsOpen(false);
                }}
            >
                <div className="w-full max-w-md rounded-t-2xl bg-white p-6 dark:bg-gray-800 lg:max-w-none lg:rounded-lg lg:border lg:border-gray-200 lg:p-4 lg:dark:border-gray-700">
                    {/* Mobile Header */}
                    <div className="mb-4 flex items-center justify-between lg:hidden">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t('price')}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Price Range */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('priceRange')}
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder={t('minPrice')}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder={t('maxPrice')}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>

                        {/* In Stock Toggle */}
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                {t('inStock')}
                            </span>
                        </label>

                        {/* Brand Filter */}
                        {brands.length > 0 && (
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('brand')}
                                </label>
                                <div className="max-h-40 space-y-1 overflow-y-auto">
                                    {brands.map((brand) => (
                                        <label
                                            key={brand.id}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <input
                                                type="radio"
                                                name="brand"
                                                checked={selectedBrandId === brand.id}
                                                onChange={() =>
                                                    setSelectedBrandId(
                                                        selectedBrandId === brand.id ? undefined : brand.id
                                                    )
                                                }
                                                className="h-4 w-4 border-gray-300 text-orange-500 focus:ring-orange-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                                {brand.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                disabled={!hasActiveFilters}
                                className="flex-1"
                            >
                                {t('clearFilters')}
                            </Button>
                            <Button size="sm" onClick={applyFilters} className="flex-1">
                                {t('applyFilters')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
