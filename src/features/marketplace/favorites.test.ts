import { act, renderHook } from '@testing-library/react';
import { useFavoritesStore } from './favorites';
import { Product } from '@/types';

// Mock product for testing
const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  slug: 'test-product',
  description: 'Test description',
  brandId: 1,
  brand: { id: 1, name: 'Test Brand', slug: 'test-brand', description: null, websiteUrl: null, logoUrl: null },
  categoryId: 1,
  category: null,
  variants: [
    {
      id: 1,
      price: 100,
      compareAtPrice: null,
      stock: 10,
      barcode: '123456',
      sku: 'TEST-001',
      thumbnails: [],
      options: [],
    },
  ],
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
};

describe('useFavoritesStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useFavoritesStore());
    act(() => {
      result.current.clearFavorites();
    });
  });

  it('should start with empty favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());
    expect(result.current.ids).toHaveLength(0);
    expect(Object.keys(result.current.items)).toHaveLength(0);
  });

  it('should add a product to favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct);
    });

    expect(result.current.ids).toContain(mockProduct.id);
    expect(result.current.items[mockProduct.id]).toEqual(mockProduct);
  });

  it('should not add duplicate products', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct);
      result.current.addFavorite(mockProduct);
    });

    expect(result.current.ids).toHaveLength(1);
  });

  it('should remove a product from favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct);
    });

    expect(result.current.ids).toContain(mockProduct.id);

    act(() => {
      result.current.removeFavorite(mockProduct.id);
    });

    expect(result.current.ids).not.toContain(mockProduct.id);
    expect(result.current.items[mockProduct.id]).toBeUndefined();
  });

  it('should toggle favorite status', () => {
    const { result } = renderHook(() => useFavoritesStore());

    // Add
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    expect(result.current.isFavorite(mockProduct.id)).toBe(true);

    // Remove
    act(() => {
      result.current.toggleFavorite(mockProduct);
    });
    expect(result.current.isFavorite(mockProduct.id)).toBe(false);
  });

  it('should correctly check if product is favorite', () => {
    const { result } = renderHook(() => useFavoritesStore());

    expect(result.current.isFavorite(mockProduct.id)).toBe(false);

    act(() => {
      result.current.addFavorite(mockProduct);
    });

    expect(result.current.isFavorite(mockProduct.id)).toBe(true);
    expect(result.current.isFavorite(999)).toBe(false);
  });

  it('should get all favorite products', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct);
      result.current.addFavorite(mockProduct2);
    });

    const favorites = result.current.getFavoriteProducts();
    expect(favorites).toHaveLength(2);
    expect(favorites[0].id).toBe(mockProduct.id);
    expect(favorites[1].id).toBe(mockProduct2.id);
  });

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct);
      result.current.addFavorite(mockProduct2);
    });

    expect(result.current.ids).toHaveLength(2);

    act(() => {
      result.current.clearFavorites();
    });

    expect(result.current.ids).toHaveLength(0);
    expect(Object.keys(result.current.items)).toHaveLength(0);
  });

  it('should maintain order when adding products', () => {
    const { result } = renderHook(() => useFavoritesStore());

    act(() => {
      result.current.addFavorite(mockProduct2);
      result.current.addFavorite(mockProduct);
    });

    expect(result.current.ids[0]).toBe(mockProduct2.id);
    expect(result.current.ids[1]).toBe(mockProduct.id);
  });
});
