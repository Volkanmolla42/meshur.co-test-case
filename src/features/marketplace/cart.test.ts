import { act, renderHook } from '@testing-library/react';
import { useCartStore } from './cart';
import { Product, ProductVariant } from '@/types';

// Mock product for testing
const mockVariant: ProductVariant = {
  id: 101,
  price: 150,
  compareAtPrice: 200,
  stock: 10,
  barcode: '123456789',
  sku: 'TEST-VAR-001',
  thumbnails: [],
  options: [{ id: 1, title: 'Size', value: 'M' }],
};

const mockVariant2: ProductVariant = {
  id: 102,
  price: 180,
  compareAtPrice: null,
  stock: 5,
  barcode: '987654321',
  sku: 'TEST-VAR-002',
  thumbnails: [],
  options: [{ id: 2, title: 'Size', value: 'L' }],
};

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  brandId: 1,
  brand: { id: 1, name: 'Test Brand', slug: 'test-brand', description: null, websiteUrl: null, logoUrl: null },
  categoryId: 1,
  category: null,
  variants: [mockVariant, mockVariant2],
  previewVideoId: null,
  status: 1,
  badge: null,
  rating: 4.5,
  reviewCount: 100,
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
};

const mockProduct2: Product = {
  ...mockProduct,
  id: 2,
  name: 'Test Product 2',
  slug: 'test-product-2',
  variants: [{ ...mockVariant, id: 201 }],
};

describe('useCartStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCartStore());
    act(() => {
      result.current.clearCart();
    });
  });

  describe('addItem', () => {
    it('should add an item to the cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
      });

      expect(result.current.variantIds).toContain(mockVariant.id);
      expect(result.current.items[mockVariant.id]).toBeDefined();
      expect(result.current.items[mockVariant.id].quantity).toBe(1);
    });

    it('should increase quantity when adding same variant', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
        result.current.addItem(mockProduct, mockVariant);
      });

      expect(result.current.variantIds).toHaveLength(1);
      expect(result.current.items[mockVariant.id].quantity).toBe(2);
    });

    it('should add with custom quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant, 5);
      });

      expect(result.current.items[mockVariant.id].quantity).toBe(5);
    });
  });

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
      });

      expect(result.current.variantIds).toContain(mockVariant.id);

      act(() => {
        result.current.removeItem(mockVariant.id);
      });

      expect(result.current.variantIds).not.toContain(mockVariant.id);
      expect(result.current.items[mockVariant.id]).toBeUndefined();
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
      });

      act(() => {
        result.current.updateQuantity(mockVariant.id, 10);
      });

      expect(result.current.items[mockVariant.id].quantity).toBe(10);
    });

    it('should remove item when quantity is 0', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
      });

      act(() => {
        result.current.updateQuantity(mockVariant.id, 0);
      });

      expect(result.current.variantIds).not.toContain(mockVariant.id);
    });
  });

  describe('clearCart', () => {
    it('should clear all items', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
        result.current.addItem(mockProduct2, mockProduct2.variants[0]);
      });

      expect(result.current.variantIds).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.variantIds).toHaveLength(0);
      expect(Object.keys(result.current.items)).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('should return correct cart count', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant, 3);
        result.current.addItem(mockProduct, mockVariant2, 2);
      });

      expect(result.current.getCartCount()).toBe(5);
    });

    it('should return correct cart total', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant, 2); // 150 * 2 = 300
        result.current.addItem(mockProduct, mockVariant2, 1); // 180 * 1 = 180
      });

      expect(result.current.getCartTotal()).toBe(480);
    });

    it('should return cart items array', () => {
      const { result } = renderHook(() => useCartStore());

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
        result.current.addItem(mockProduct, mockVariant2);
      });

      const items = result.current.getCartItems();
      expect(items).toHaveLength(2);
      expect(items[0].variantId).toBe(mockVariant.id);
      expect(items[1].variantId).toBe(mockVariant2.id);
    });

    it('should check if variant is in cart', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.isInCart(mockVariant.id)).toBe(false);

      act(() => {
        result.current.addItem(mockProduct, mockVariant);
      });

      expect(result.current.isInCart(mockVariant.id)).toBe(true);
      expect(result.current.isInCart(999)).toBe(false);
    });

    it('should return item quantity', () => {
      const { result } = renderHook(() => useCartStore());

      expect(result.current.getItemQuantity(mockVariant.id)).toBe(0);

      act(() => {
        result.current.addItem(mockProduct, mockVariant, 7);
      });

      expect(result.current.getItemQuantity(mockVariant.id)).toBe(7);
    });
  });
});
