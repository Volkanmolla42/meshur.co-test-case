import { Skeleton } from '@/components/atoms/Skeleton';

export default function SearchLoading() {
    return (
        <main className="container mx-auto px-4 py-8">
            {/* Header skeleton */}
            <div className="mb-8">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="mt-2 h-4 w-32" />
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
