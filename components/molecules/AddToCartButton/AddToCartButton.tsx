'use client';

import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { useCartStore } from '@/store/cart';
import { Product, ProductVariant } from '@/types';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils/cn';

interface AddToCartButtonProps {
    product: Product;
    variant?: ProductVariant;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    showText?: boolean;
    className?: string;
}

export function AddToCartButton({
    product,
    variant,
    size = 'lg',
    fullWidth = true,
    disabled = false,
    showText = true,
    className,
}: AddToCartButtonProps) {
    const addItem = useCartStore((state) => state.addItem);
    const isInCart = useCartStore((state) => state.isInCart);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);

    // Use the first variant if none specified
    const selectedVariant = variant ?? product.variants[0];
    const alreadyInCart = selectedVariant ? isInCart(selectedVariant.id) : false;

    const handleAddToCart = useCallback(() => {
        if (!selectedVariant || disabled || isAdding) return;

        setIsAdding(true);

        // Add to cart
        addItem(product, selectedVariant);

        // Show success feedback
        setTimeout(() => {
            setIsAdding(false);
            setJustAdded(true);

            // Reset after animation
            setTimeout(() => {
                setJustAdded(false);
            }, 2000);
        }, 300);
    }, [product, selectedVariant, disabled, isAdding, addItem]);

    // Determine button state and appearance
    const getButtonContent = () => {
        if (isAdding) {
            return (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {showText && <span className="ml-2">Ekleniyor...</span>}
                </>
            );
        }

        if (justAdded || alreadyInCart) {
            return (
                <>
                    <Check className="h-5 w-5" />
                    {showText && <span className="ml-2">Sepette</span>}
                </>
            );
        }

        return (
            <>
                <ShoppingCart className="h-5 w-5" />
                {showText && <span className="ml-2">Sepete Ekle</span>}
            </>
        );
    };

    return (
        <Button
            size={size}
            fullWidth={fullWidth}
            disabled={disabled || isAdding}
            onClick={handleAddToCart}
            className={cn(
                'transition-all duration-300',
                justAdded && 'bg-green-500 hover:bg-green-600',
                alreadyInCart && !justAdded && 'bg-green-600 hover:bg-green-700',
                className
            )}
        >
            {getButtonContent()}
        </Button>
    );
}
