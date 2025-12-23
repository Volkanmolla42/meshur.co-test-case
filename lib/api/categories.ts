import categoriesData from '@/data/categories.json';
import { Category } from '@/types';

// Type assertion for imported JSON
const categories = categoriesData as Category[];

/**
 * Get all categories with their children
 */
export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories;
}

/**
 * Get root categories only (top-level)
 */
export async function getRootCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return categories.filter((c) => c.parentCategoryId === null);
}

/**
 * Get a category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Search recursively
  function findBySlug(cats: Category[]): Category | null {
    for (const cat of cats) {
      if (cat.slug === slug) return cat;
      const found = findBySlug(cat.children);
      if (found) return found;
    }
    return null;
  }

  return findBySlug(categories);
}

/**
 * Get a category by ID
 */
export async function getCategoryById(id: number): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  function findById(cats: Category[]): Category | null {
    for (const cat of cats) {
      if (cat.id === id) return cat;
      const found = findById(cat.children);
      if (found) return found;
    }
    return null;
  }

  return findById(categories);
}

/**
 * Get all category slugs (for static generation)
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  const slugs: string[] = [];

  function collectSlugs(cats: Category[]) {
    for (const cat of cats) {
      slugs.push(cat.slug);
      collectSlugs(cat.children);
    }
  }

  collectSlugs(categories);
  return slugs;
}

/**
 * Get breadcrumb path to a category
 */
export async function getCategoryBreadcrumbs(
  slug: string
): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));

  const breadcrumbs: Category[] = [];

  function traverse(cats: Category[], path: Category[]): boolean {
    for (const cat of cats) {
      const currentPath = [...path, cat];
      if (cat.slug === slug) {
        breadcrumbs.push(...currentPath);
        return true;
      }
      if (traverse(cat.children, currentPath)) {
        return true;
      }
    }
    return false;
  }

  traverse(categories, []);
  return breadcrumbs;
}

/**
 * Get featured categories for homepage
 */
export async function getFeaturedCategories(limit: number = 6): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // Return root categories with images, sorted by product count
  return categories
    .filter((c) => c.parentCategoryId === null && c.image)
    .sort((a, b) => (b.productCount ?? 0) - (a.productCount ?? 0))
    .slice(0, limit);
}
