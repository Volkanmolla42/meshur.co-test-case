'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/cn';

interface SearchBarProps {
    locale: string;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
}

export function SearchBar({
    locale,
    className,
    placeholder,
    defaultValue = '',
}: SearchBarProps) {
    const t = useTranslations('common');
    const router = useRouter();
    const [query, setQuery] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (query.trim()) {
                router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
            }
        },
        [query, locale, router]
    );

    const handleClear = useCallback(() => {
        setQuery('');
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                'relative flex items-center',
                className
            )}
        >
            <div
                className={cn(
                    'flex w-full items-center gap-2 rounded-full border bg-gray-50 px-4 py-2.5 transition-all',
                    'dark:bg-gray-800',
                    isFocused
                        ? 'border-orange-500 ring-2 ring-orange-500/20'
                        : 'border-gray-200 dark:border-gray-700'
                )}
            >
                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={placeholder ?? t('search')}
                    className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none dark:text-gray-100 dark:placeholder-gray-400"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="shrink-0 rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </button>
                )}
            </div>
        </form>
    );
}
