'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { cn } from '@/shared/lib/utils/cn';

interface CategoryChipProps {
    category: Category;
    locale: string;
    isActive?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function CategoryChip({
    category,
    locale,
    isActive = false,
    size = 'md',
}: CategoryChipProps) {
    return (
        <Link
            href={`/${locale}/c/${category.slug}`}
            className={cn(
                'flex shrink-0 items-center gap-2 rounded-full border transition-all',
                'hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20',
                isActive
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
                size === 'sm' && 'px-3 py-1.5',
                size === 'md' && 'px-4 py-2',
                size === 'lg' && 'px-5 py-2.5'
            )}
        >
            {category.image && (
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                    <Image
                        src={category.image.url}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="24px"
                    />
                </div>
            )}
            <span
                className={cn(
                    'whitespace-nowrap font-medium',
                    isActive ? 'text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-200',
                    size === 'sm' && 'text-xs',
                    size === 'md' && 'text-sm',
                    size === 'lg' && 'text-base'
                )}
            >
                {category.name}
            </span>
        </Link>
    );
}

interface CategoryChipsProps {
    categories: Category[];
    locale: string;
    activeSlug?: string;
}

export function CategoryChips({ categories, locale, activeSlug }: CategoryChipsProps) {
    return (
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
                <CategoryChip
                    key={category.id}
                    category={category}
                    locale={locale}
                    isActive={category.slug === activeSlug}
                />
            ))}
        </div>
    );
}
