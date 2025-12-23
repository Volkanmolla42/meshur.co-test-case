import productsData from '@/data/products.json';
import { Product, ProductFilters, PaginatedResponse, SortBy } from '@/types';

// Type assertion for imported JSON
const products = productsData as Product[];

/**
 * Get all products with optional filtering, sorting, and pagination
 */
export async function getProducts(
  filters?: ProductFilters
): Promise<PaginatedResponse<Product>> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  let filtered = [...products];

  // Filter by category
  if (filters?.categorySlug) {
    const categorySlug = filters.categorySlug;
    filtered = filtered.filter(
      (p) => p.category?.slug === categorySlug || 
             p.categoryId === parseInt(categorySlug, 10)
    );
  }

  // Filter by brand
  if (filters?.brandId) {
    filtered = filtered.filter((p) => p.brandId === filters.brandId);
  }

  // Filter by price range
  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => {
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));
      return lowestPrice >= (filters.minPrice ?? 0);
    });
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => {
      const lowestPrice = Math.min(...p.variants.map((v) => v.price));
      return lowestPrice <= (filters.maxPrice ?? Infinity);
    });
  }

  // Filter by stock
  if (filters?.inStock) {
    filtered = filtered.filter((p) => p.variants.some((v) => v.stock > 0));
  }

  // Filter by search query
  if (filters?.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.brand?.name.toLowerCase().includes(query)
    );
  }

  // Sort
  if (filters?.sortBy !== undefined) {
    switch (filters.sortBy) {
      case SortBy.PriceLowToHigh:
        filtered.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price));
          const bPrice = Math.min(...b.variants.map((v) => v.price));
          return aPrice - bPrice;
        });
        break;
      case SortBy.PriceHighToLow:
        filtered.sort((a, b) => {
          const aPrice = Math.min(...a.variants.map((v) => v.price));
          const bPrice = Math.min(...b.variants.map((v) => v.price));
          return bPrice - aPrice;
        });
        break;
      case SortBy.Newest:
        filtered.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case SortBy.BestSelling:
        filtered.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0));
        break;
      case SortBy.TopRated:
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case SortBy.NameAZ:
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        break;
      case SortBy.NameZA:
        filtered.sort((a, b) => b.name.localeCompare(a.name, 'tr'));
        break;
      default:
        // Recommended - keep original order or sort by rating
        filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
  }

  // Pagination
  const page = filters?.page ?? 1;
  const pageSize = filters?.pageSize ?? 20;
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: filtered.slice(startIndex, endIndex),
    total,
    page,
    pageSize,
    totalPages,
  };
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return products.find((p) => p.slug === slug) ?? null;
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: number): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return products.find((p) => p.id === id) ?? null;
}

/**
 * Get featured/recommended products for homepage
 */
export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // Return products with highest ratings
  return [...products]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, limit);
}

/**
 * Get best selling products
 */
export async function getBestSellingProducts(limit: number = 8): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  return [...products]
    .sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
    .slice(0, limit);
}

/**
 * Get new arrival products
 */
export async function getNewArrivals(limit: number = 8): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  return [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Get related products (same category, excluding current product)
 */
export async function getRelatedProducts(
  productId: number,
  categoryId: number,
  limit: number = 4
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  return products
    .filter((p) => p.id !== productId && p.categoryId === categoryId)
    .slice(0, limit);
}

/**
 * Search products by query
 */
export async function searchProducts(
  query: string,
  limit: number = 10
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  const searchTerm = query.toLowerCase();
  
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm) ||
        p.brand?.name.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
}

/**
 * Get all product slugs (for static generation)
 */
export async function getAllProductSlugs(): Promise<string[]> {
  return products.map((p) => p.slug);
}
