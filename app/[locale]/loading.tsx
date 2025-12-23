import { ProductGridSkeleton } from '@/components/atoms/Skeleton';

export default function HomeLoading() {
    return (
        <div className="flex flex-col">
            {/* Hero Skeleton */}
            <section className="bg-linear-to-r from-orange-500 to-orange-600 py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-white/20" />
                        <div className="mx-auto mt-4 h-6 w-1/2 animate-pulse rounded-lg bg-white/20" />
                        <div className="mx-auto mt-8 h-12 w-48 animate-pulse rounded-full bg-white/20" />
                    </div>
                </div>
            </section>

            {/* Trust Badges Skeleton */}
            <section className="border-b border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3">
                                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                                    <div className="h-3 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Skeleton */}
            <section className="bg-white py-6 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex gap-2 overflow-hidden">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="h-10 w-32 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Skeleton */}
            <section className="bg-gray-50 py-12 dark:bg-gray-950">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="h-8 w-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
                        <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <ProductGridSkeleton count={8} />
                </div>
            </section>
        </div>
    );
}
