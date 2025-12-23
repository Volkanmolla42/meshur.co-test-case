import { Product, ProductVariant } from '@/types';

/**
 * Format price to locale-specific currency string
 */
export function formatPrice(price: number, locale: string = 'tr-TR', currency: string = 'TRY'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Get the lowest price from all variants
 */
export function getLowestPrice(variants: ProductVariant[]): number {
  if (!variants.length) return 0;
  return Math.min(...variants.map((v) => v.price));
}

/**
 * Get the highest compare-at price from all variants (for showing discount)
 */
export function getHighestCompareAtPrice(variants: ProductVariant[]): number | null {
  const compareAtPrices = variants
    .map((v) => v.compareAtPrice)
    .filter((p): p is number => p !== null && p !== undefined);
  
  if (!compareAtPrices.length) return null;
  return Math.max(...compareAtPrices);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(originalPrice: number, salePrice: number): number {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

/**
 * Get the main image URL from a product
 */
export function getMainImage(product: Product): string {
  const firstThumbnail = product.variants[0]?.thumbnails[0];
  return firstThumbnail?.url ?? '/images/placeholder-product.jpg';
}

/**
 * Get all unique images from a product
 */
export function getAllImages(product: Product): Array<{ url: string; alt: string }> {
  const images: Array<{ url: string; alt: string }> = [];
  const seenUrls = new Set<string>();

  for (const variant of product.variants) {
    for (const thumbnail of variant.thumbnails) {
      if (!seenUrls.has(thumbnail.url)) {
        seenUrls.add(thumbnail.url);
        images.push({
          url: thumbnail.url,
          alt: thumbnail.alt ?? product.name,
        });
      }
    }
  }

  return images;
}

/**
 * Check if any variant of the product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.variants.some((v) => v.stock > 0);
}

/**
 * Get total stock across all variants
 */
export function getTotalStock(product: Product): number {
  return product.variants.reduce((sum, v) => sum + v.stock, 0);
}

/**
 * Get unique option values grouped by title
 */
export function getOptionGroups(product: Product): Record<string, string[]> {
  const groups: Record<string, Set<string>> = {};

  for (const variant of product.variants) {
    for (const option of variant.options) {
      if (!groups[option.title]) {
        groups[option.title] = new Set();
      }
      groups[option.title].add(option.value);
    }
  }

  const result: Record<string, string[]> = {};
  for (const [title, values] of Object.entries(groups)) {
    result[title] = Array.from(values);
  }

  return result;
}

/**
 * Generate product URL
 */
export function getProductUrl(product: Product, locale: string): string {
  return `/${locale}/p/${product.slug}`;
}

/**
 * Check if product has discount
 */
export function hasDiscount(product: Product): boolean {
  return product.variants.some(
    (v) => v.compareAtPrice !== null && v.compareAtPrice !== undefined && v.compareAtPrice > v.price
  );
}
