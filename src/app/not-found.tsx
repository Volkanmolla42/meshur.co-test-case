import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Home } from 'lucide-react';
import { Button } from '@/shared/ui/primitives/Button';

export default async function NotFound() {
    // Default to Turkish if no locale available
    const t = await getTranslations({ locale: 'tr', namespace: 'errors.404' });

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-orange-500">404</h1>
                <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                    {t('title')}
                </h2>
                <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
                    {t('description')}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link href="/tr">
                        <Button>
                            <Home className="mr-2 h-4 w-4" />
                            {t('backHome')}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
