import { Category } from '@/types';

/**
 * Flatten nested category tree into a flat array
 */
export function flattenCategories(categories: Category[]): Category[] {
  const result: Category[] = [];

  function traverse(category: Category) {
    result.push(category);
    for (const child of category.children) {
      traverse(child);
    }
  }

  for (const category of categories) {
    traverse(category);
  }

  return result;
}

/**
 * Find a category by slug in a nested tree
 */
export function findCategoryBySlug(categories: Category[], slug: string): Category | null {
  for (const category of categories) {
    if (category.slug === slug) {
      return category;
    }
    const found = findCategoryBySlug(category.children, slug);
    if (found) return found;
  }
  return null;
}

/**
 * Get breadcrumb path for a category
 */
export function getCategoryBreadcrumbs(
  categories: Category[],
  targetSlug: string
): Category[] {
  const breadcrumbs: Category[] = [];

  function traverse(category: Category, path: Category[]): boolean {
    const currentPath = [...path, category];

    if (category.slug === targetSlug) {
      breadcrumbs.push(...currentPath);
      return true;
    }

    for (const child of category.children) {
      if (traverse(child, currentPath)) {
        return true;
      }
    }

    return false;
  }

  for (const category of categories) {
    if (traverse(category, [])) {
      break;
    }
  }

  return breadcrumbs;
}

/**
 * Get root categories only (no parents)
 */
export function getRootCategories(categories: Category[]): Category[] {
  return categories.filter((c) => c.parentCategoryId === null);
}

/**
 * Get all subcategory IDs for a category (including itself)
 */
export function getSubcategoryIds(category: Category): number[] {
  const ids: number[] = [category.id];

  function traverse(cat: Category) {
    for (const child of cat.children) {
      ids.push(child.id);
      traverse(child);
    }
  }

  traverse(category);
  return ids;
}

/**
 * Generate category URL
 */
export function getCategoryUrl(category: Category, locale: string): string {
  return `/${locale}/c/${category.slug}`;
}
