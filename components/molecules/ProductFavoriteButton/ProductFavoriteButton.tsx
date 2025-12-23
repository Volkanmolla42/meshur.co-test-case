'use client';

import { Heart } from 'lucide-react';
import { useFavoritesStore } from '@/store/favorites';
import { Button } from '@/components/atoms/Button';
import { Product } from '@/types';
import { cn } from '@/lib/utils/cn';

interface ProductFavoriteButtonProps {
    product: Product;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'button' | 'icon';
}

export function ProductFavoriteButton({
    product,
    size = 'lg',
    variant = 'button',
}: ProductFavoriteButtonProps) {
    const { toggleFavorite, isFavorite } = useFavoritesStore();
    const isFav = isFavorite(product.id);

    if (variant === 'icon') {
        return (
            <button
                onClick={() => toggleFavorite(product)}
                className={cn(
                    'rounded-full p-2 transition-all hover:scale-110',
                    isFav
                        ? 'bg-red-50 dark:bg-red-900/30'
                        : 'bg-white shadow-md dark:bg-gray-800'
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
        );
    }

    return (
        <Button
            size={size}
            variant="outline"
            onClick={() => toggleFavorite(product)}
            className={cn(isFav && 'border-red-500 bg-red-50 dark:bg-red-900/30')}
            aria-label={isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
        >
            <Heart
                className={cn(
                    'h-5 w-5',
                    isFav ? 'fill-red-500 text-red-500' : ''
                )}
            />
        </Button>
    );
}
