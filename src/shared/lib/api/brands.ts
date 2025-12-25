import brandsData from '@/data/brands.json';
import { Brand } from '@/types';

// Type assertion for imported JSON
const brands = brandsData as Brand[];

/**
 * Get all brands
 */
export async function getBrands(): Promise<Brand[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return brands;
}

/**
 * Get a brand by slug
 */
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return brands.find((b) => b.slug === slug) ?? null;
}

/**
 * Get a brand by ID
 */
export async function getBrandById(id: number): Promise<Brand | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return brands.find((b) => b.id === id) ?? null;
}

/**
 * Get popular brands for homepage
 */
export async function getPopularBrands(limit: number = 8): Promise<Brand[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return brands.slice(0, limit);
}

/**
 * Get all brand slugs (for static generation)
 */
export async function getAllBrandSlugs(): Promise<string[]> {
  return brands.map((b) => b.slug);
}
