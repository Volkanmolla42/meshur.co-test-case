'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SortBy } from '@/types';
import { cn } from '@/lib/utils/cn';

interface SortDropdownProps {
    currentSort?: SortBy;
    className?: string;
}

const sortOptions = [
    { value: SortBy.Recommended, key: 'recommended' },
    { value: SortBy.PriceLowToHigh, key: 'priceLowToHigh' },
    { value: SortBy.PriceHighToLow, key: 'priceHighToLow' },
    { value: SortBy.Newest, key: 'newest' },
    { value: SortBy.BestSelling, key: 'bestSelling' },
    { value: SortBy.TopRated, key: 'topRated' },
] as const;

export function SortDropdown({ currentSort = SortBy.Recommended, className }: SortDropdownProps) {
    const t = useTranslations('category');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentOption = sortOptions.find((opt) => opt.value === currentSort) || sortOptions[0];

    const handleSelect = useCallback(
        (sortBy: SortBy) => {
            const params = new URLSearchParams(searchParams.toString());
            if (sortBy === SortBy.Recommended) {
                params.delete('sort');
            } else {
                params.set('sort', sortBy.toString());
            }
            params.delete('page'); // Reset to page 1 on sort change
            router.push(`${pathname}?${params.toString()}`);
            setIsOpen(false);
        },
        [router, pathname, searchParams]
    );

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className={cn('relative', className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-600"
            >
                <span className="text-gray-500 dark:text-gray-400">{t('sortBy')}:</span>
                <span>{t(`sortOptions.${currentOption.key}`)}</span>
                <ChevronDown
                    className={cn(
                        'h-4 w-4 transition-transform',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={cn(
                                'w-full px-4 py-2 text-left text-sm transition-colors',
                                option.value === currentSort
                                    ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'
                                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                            )}
                        >
                            {t(`sortOptions.${option.key}`)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
