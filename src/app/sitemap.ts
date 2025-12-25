import { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/shared/lib/api/products';
import { getAllCategorySlugs } from '@/shared/lib/api/categories';
import { locales } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://meshur.co';

  // Static pages
  const staticPages = ['', '/favorites'];
  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Product pages
  const productSlugs = await getAllProductSlugs();
  const productUrls = locales.flatMap((locale) =>
    productSlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/p/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  // Category pages
  const categorySlugs = await getAllCategorySlugs();
  const categoryUrls = locales.flatMap((locale) =>
    categorySlugs.map((slug) => ({
      url: `${baseUrl}/${locale}/c/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...productUrls, ...categoryUrls];
}
