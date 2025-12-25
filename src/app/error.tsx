'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/ui/primitives/Button';

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application error:', error);
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
            <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Bir Hata Oluştu
                </h2>
                <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
                    Bir şeyler yanlış gitti. Lütfen daha sonra tekrar deneyin.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button onClick={reset} variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Tekrar Dene
                    </Button>
                    <Link href="/tr">
                        <Button>
                            <Home className="mr-2 h-4 w-4" />
                            Ana Sayfa
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
