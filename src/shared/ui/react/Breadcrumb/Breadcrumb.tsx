'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/cn';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    locale: string;
    className?: string;
}

export function Breadcrumb({ items, locale, className }: BreadcrumbProps) {
    const t = useTranslations('category.breadcrumb');

    const allItems: BreadcrumbItem[] = [
        { label: t('home'), href: `/${locale}` },
        ...items,
    ];

    return (
        <nav
            aria-label="Breadcrumb"
            className={cn('flex items-center gap-1 text-sm', className)}
        >
            {allItems.map((item, index) => {
                const isLast = index === allItems.length - 1;
                const isFirst = index === 0;

                return (
                    <div key={index} className="flex items-center gap-1">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                        )}
                        {isLast ? (
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {item.label}
                            </span>
                        ) : item.href ? (
                            <Link
                                href={item.href}
                                className={cn(
                                    'text-gray-500 transition-colors hover:text-orange-500 dark:text-gray-400',
                                    isFirst && 'flex items-center gap-1'
                                )}
                            >
                                {isFirst && <Home className="h-4 w-4" />}
                                <span className={isFirst ? 'sr-only sm:not-sr-only' : ''}>
                                    {item.label}
                                </span>
                            </Link>
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
