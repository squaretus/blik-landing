import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * SEO robots.txt — статический лэндинг, скрывать нечего.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://blik.app/sitemap.xml',
  };
}
