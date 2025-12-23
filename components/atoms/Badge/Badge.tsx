import { cn } from '@/lib/utils/cn';

export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'orange';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-md',

                // Variants
                variant === 'default' &&
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100',
                variant === 'success' &&
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
                variant === 'warning' &&
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
                variant === 'danger' &&
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
                variant === 'info' &&
                'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
                variant === 'orange' &&
                'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',

                // Sizes
                size === 'sm' && 'px-2 py-0.5 text-xs',
                size === 'md' && 'px-2.5 py-1 text-sm',

                className
            )}
        >
            {children}
        </span>
    );
}
