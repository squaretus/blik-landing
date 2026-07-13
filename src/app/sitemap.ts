import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * SEO sitemap.xml. Сейчас только лэндос; расширится motion-секциями
 * и блогом по мере добавления публичных страниц.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://blik.app/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
