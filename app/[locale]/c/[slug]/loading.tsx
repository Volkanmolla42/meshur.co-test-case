import { Skeleton } from '@/components/atoms/Skeleton';

export default function CategoryLoading() {
    return (
        <main className="container mx-auto px-4 py-6">
            {/* Breadcrumb skeleton */}
            <div className="mb-6 flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Header skeleton */}
            <div className="mb-6">
                <Skeleton className="h-8 w-48 md:h-10" />
                <Skeleton className="mt-2 h-4 w-32" />
            </div>

            {/* Subcategories skeleton */}
            <div className="mb-6 flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full" />
                ))}
            </div>

            {/* Filters skeleton */}
            <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Product grid skeleton */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-square w-full rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                ))}
            </div>
        </main>
    );
}
