'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            className,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center font-medium transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'disabled:pointer-events-none disabled:opacity-50',

                    // Variants
                    variant === 'primary' &&
                    'bg-orange-500 text-white hover:bg-orange-600 focus-visible:ring-orange-500 rounded-full',
                    variant === 'secondary' &&
                    'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 rounded-full',
                    variant === 'outline' &&
                    'border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 rounded-full',
                    variant === 'ghost' &&
                    'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg',
                    variant === 'danger' &&
                    'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 rounded-full',

                    // Sizes
                    size === 'sm' && 'h-8 px-3 text-sm gap-1.5',
                    size === 'md' && 'h-10 px-5 text-sm gap-2',
                    size === 'lg' && 'h-12 px-7 text-base gap-2',
                    size === 'icon' && 'h-10 w-10 p-0',

                    // Full width
                    fullWidth && 'w-full',

                    // Loading state
                    isLoading && 'cursor-wait',

                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
