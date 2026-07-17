import type { MetadataRoute } from 'next';
import { getTemplatesData } from '@/lib/data';

const siteUrl = 'https://create-awesome-node-app.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { templates, extensions, categories } = await getTemplatesData();

  const staticRoutes: MetadataRoute.Sitemap = ['', '/templates', '/extensions', '/docs'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const templateRoutes: MetadataRoute.Sitemap = templates.map((t) => ({
    url: `${siteUrl}/templates/${t.slug}`,
    lastModified: new Date(),
  }));

  const extensionRoutes: MetadataRoute.Sitemap = extensions.map((e) => ({
    url: `${siteUrl}/extensions/${e.slug}`,
    lastModified: new Date(),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/templates?category=${encodeURIComponent(c.slug)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...templateRoutes, ...extensionRoutes, ...categoryRoutes];
}
