'use client';

import { Product } from '@/types';
import { ProductCard } from '@/components/molecules/ProductCard';
import { ProductGridSkeleton } from '@/components/atoms/Skeleton';
import { cn } from '@/lib/utils/cn';

interface ProductGridProps {
    products: Product[];
    locale: string;
    isLoading?: boolean;
    columns?: 2 | 3 | 4 | 5 | 6;
    className?: string;
}

export function ProductGrid({
    products,
    locale,
    isLoading = false,
    columns = 4,
    className,
}: ProductGridProps) {
    if (isLoading) {
        return <ProductGridSkeleton count={columns * 2} />;
    }

    if (products.length === 0) {
        return (
            <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Ürün bulunamadı</p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'grid gap-4',
                columns === 2 && 'grid-cols-2',
                columns === 3 && 'grid-cols-2 md:grid-cols-3',
                columns === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
                columns === 5 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
                columns === 6 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
                className
            )}
        >
            {products.map((product, index) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    priority={index < 4}
                />
            ))}
        </div>
    );
}
