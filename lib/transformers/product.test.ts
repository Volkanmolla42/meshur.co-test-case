import {
  formatPrice,
  getLowestPrice,
  getHighestCompareAtPrice,
  getDiscountPercentage,
  isInStock,
  hasDiscount,
  getTotalStock,
} from './product';
import type { Product, ProductVariant } from '@/types';

describe('Product Transformers', () => {
  describe('formatPrice', () => {
    it('should format price in Turkish locale', () => {
      const result = formatPrice(1299.9, 'tr-TR', 'TRY');
      expect(result).toContain('1.299,90');
      expect(result).toContain('₺');
    });

    it('should format price in US locale', () => {
      const result = formatPrice(1299.9, 'en-US', 'USD');
      expect(result).toContain('1,299.90');
      expect(result).toContain('$');
    });

    it('should handle zero price', () => {
      const result = formatPrice(0);
      expect(result).toContain('0,00');
    });
  });

  describe('getLowestPrice', () => {
    const variants: ProductVariant[] = [
      { id: 1, price: 100, compareAtPrice: null, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
      { id: 2, price: 50, compareAtPrice: null, stock: 5, barcode: '', sku: '', thumbnails: [], options: [] },
      { id: 3, price: 150, compareAtPrice: null, stock: 0, barcode: '', sku: '', thumbnails: [], options: [] },
    ];

    it('should return the lowest price', () => {
      expect(getLowestPrice(variants)).toBe(50);
    });

    it('should return 0 for empty array', () => {
      expect(getLowestPrice([])).toBe(0);
    });
  });

  describe('getHighestCompareAtPrice', () => {
    it('should return the highest compare at price', () => {
      const variants: ProductVariant[] = [
        { id: 1, price: 100, compareAtPrice: 120, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
        { id: 2, price: 50, compareAtPrice: 80, stock: 5, barcode: '', sku: '', thumbnails: [], options: [] },
        { id: 3, price: 150, compareAtPrice: 200, stock: 0, barcode: '', sku: '', thumbnails: [], options: [] },
      ];
      expect(getHighestCompareAtPrice(variants)).toBe(200);
    });

    it('should return null if no compare at prices', () => {
      const variants: ProductVariant[] = [
        { id: 1, price: 100, compareAtPrice: null, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
      ];
      expect(getHighestCompareAtPrice(variants)).toBeNull();
    });
  });

  describe('getDiscountPercentage', () => {
    it('should calculate correct discount percentage', () => {
      expect(getDiscountPercentage(100, 75)).toBe(25);
      expect(getDiscountPercentage(200, 100)).toBe(50);
      expect(getDiscountPercentage(150, 120)).toBe(20);
    });

    it('should return 0 for zero original price', () => {
      expect(getDiscountPercentage(0, 50)).toBe(0);
    });

    it('should round to nearest integer', () => {
      expect(getDiscountPercentage(100, 67)).toBe(33);
    });
  });

  describe('isInStock', () => {
    it('should return true if any variant has stock', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: null, stock: 0, barcode: '', sku: '', thumbnails: [], options: [] },
          { id: 2, price: 50, compareAtPrice: null, stock: 5, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(isInStock(product)).toBe(true);
    });

    it('should return false if all variants have zero stock', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: null, stock: 0, barcode: '', sku: '', thumbnails: [], options: [] },
          { id: 2, price: 50, compareAtPrice: null, stock: 0, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(isInStock(product)).toBe(false);
    });
  });

  describe('getTotalStock', () => {
    it('should sum all variant stocks', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: null, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
          { id: 2, price: 50, compareAtPrice: null, stock: 5, barcode: '', sku: '', thumbnails: [], options: [] },
          { id: 3, price: 150, compareAtPrice: null, stock: 3, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(getTotalStock(product)).toBe(18);
    });
  });

  describe('hasDiscount', () => {
    it('should return true if any variant has discount', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: 120, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(hasDiscount(product)).toBe(true);
    });

    it('should return false if no discount', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: null, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(hasDiscount(product)).toBe(false);
    });

    it('should return false if compare at price is lower than price', () => {
      const product = {
        variants: [
          { id: 1, price: 100, compareAtPrice: 80, stock: 10, barcode: '', sku: '', thumbnails: [], options: [] },
        ],
      } as unknown as Product;
      expect(hasDiscount(product)).toBe(false);
    });
  });
});
