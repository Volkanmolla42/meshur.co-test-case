'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cart';
import { Button } from '@/components/atoms/Button';
import { formatPrice, getMainImage } from '@/lib/transformers/product';
import { useSyncExternalStore } from 'react';

// Hook to track if component is mounted (client-side only)
const emptySubscribe = () => () => { };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
    return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}

interface CartPageClientProps {
    locale: string;
}

export function CartPageClient({ locale }: CartPageClientProps) {
    const t = useTranslations('cart');
    const isMounted = useIsMounted();
    const { getCartItems, getCartTotal, updateQuantity, removeItem, clearCart } =
        useCartStore();

    const items = isMounted ? getCartItems() : [];
    const total = isMounted ? getCartTotal() : 0;
    const currencyLocale = locale === 'tr' ? 'tr-TR' : 'en-US';
    const currency = locale === 'tr' ? 'TRY' : 'USD';

    // Empty cart state
    if (!isMounted || items.length === 0) {
        return (
            <main className="container mx-auto px-4 py-8">
                <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {t('title')}
                </h1>
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {t('empty')}
                    </h2>
                    <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
                        {t('emptyDescription')}
                    </p>
                    <Link href={`/${locale}`}>
                        <Button className="mt-6">{t('continueShopping')}</Button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {t('title')}
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('itemCount', { count: items.length })}
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={clearCart}>
                    {t('clearCart')}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
                        {items.map((item) => (
                            <CartItemRow
                                key={item.variantId}
                                item={item}
                                locale={locale}
                                currencyLocale={currencyLocale}
                                currency={currency}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                                tQuantity={t('quantity')}
                                tRemove={t('remove')}
                            />
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {t('subtotal')}
                        </h2>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                    {t('subtotal')}
                                </span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {formatPrice(total, currencyLocale, currency)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">
                                    {t('shipping')}
                                </span>
                                <span className="font-medium text-green-600">
                                    {t('freeShipping')}
                                </span>
                            </div>
                            <hr className="border-gray-200 dark:border-gray-700" />
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {t('total')}
                                </span>
                                <span className="text-xl font-bold text-orange-500">
                                    {formatPrice(total, currencyLocale, currency)}
                                </span>
                            </div>
                        </div>
                        <Button fullWidth className="mt-6">
                            {t('checkout')}
                        </Button>
                        <Link
                            href={`/${locale}`}
                            className="mt-3 block text-center text-sm text-gray-500 hover:text-orange-500 dark:text-gray-400"
                        >
                            {t('continueShopping')}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

function CartItemRow({
    item,
    locale,
    currencyLocale,
    currency,
    onUpdateQuantity,
    onRemove,
    tQuantity,
    tRemove,
}: {
    item: CartItem;
    locale: string;
    currencyLocale: string;
    currency: string;
    onUpdateQuantity: (variantId: number, quantity: number) => void;
    onRemove: (variantId: number) => void;
    tQuantity: string;
    tRemove: string;
}) {
    const image = getMainImage(item.product);
    const itemTotal = item.variant.price * item.quantity;

    return (
        <div className="flex gap-4 p-4 sm:p-6">
            {/* Product Image */}
            <Link
                href={`/${locale}/p/${item.product.slug}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 sm:h-32 sm:w-32"
            >
                {image ? (
                    <Image
                        src={image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                )}
            </Link>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <Link
                        href={`/${locale}/p/${item.product.slug}`}
                        className="font-medium text-gray-900 hover:text-orange-500 dark:text-gray-100 dark:hover:text-orange-400"
                    >
                        {item.product.name}
                    </Link>
                    {item.product.brand && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.product.brand.name}
                        </p>
                    )}
                    {item.variant.options.length > 0 && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.variant.options.map((o) => o.value).join(' / ')}
                        </p>
                    )}
                </div>

                <div className="mt-2 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {tQuantity}:
                        </span>
                        <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.variantId, item.quantity - 1)}
                                className="p-2 text-gray-500 hover:text-orange-500 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
                                className="p-2 text-gray-500 hover:text-orange-500"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                            {formatPrice(itemTotal, currencyLocale, currency)}
                        </span>
                        <button
                            type="button"
                            onClick={() => onRemove(item.variantId)}
                            className="text-gray-400 hover:text-red-500"
                            title={tRemove}
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
