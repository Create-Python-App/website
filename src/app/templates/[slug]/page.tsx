import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTemplatesData } from '@/lib/data';
import type { Extension } from '@/lib/schemas';
import { breadcrumbJsonLd, jsonLdScript, SITE_URL, templateSoftwareJsonLd } from '@/lib/seo';
import { TemplateDetailsClient } from './TemplateDetailsClient';

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TemplatePageProps): Promise<Metadata> {
  const resolved = await params;
  const { templates } = await getTemplatesData();
  const template = templates.find((t) => t.slug === resolved.slug);
  if (!template) return {};

  const title = `${template.name} Template`;
  const description = template.description.slice(0, 155);
  const url = `${SITE_URL}/templates/${template.slug}`;
  const labels = template.labels.slice(0, 6).join(', ');

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: [{ url: '/og-default.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-default.png'],
    },
    keywords: labels,
  };
}

// UI interactiva extraída a TemplateDetailsClient (client component)

export async function generateStaticParams() {
  const { templates } = await getTemplatesData();
  return templates.map((t) => ({ slug: t.slug }));
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const resolved = await params;
  const { templates, extensions } = await getTemplatesData();
  const template = templates.find((t) => t.slug === resolved.slug);
  if (!template) notFound();

  const compatibleExtensions: Extension[] = extensions.filter((ext) => {
    if (Array.isArray(ext.type)) return ext.type.includes(template.type);
    return ext.type === template.type || ext.type === 'all';
  });

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Templates', url: `${SITE_URL}/templates` },
    { name: template.name, url: `${SITE_URL}/templates/${template.slug}` },
  ]);

  const softwareJsonLd = templateSoftwareJsonLd(template);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: data controlado
          dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: data controlado
          dangerouslySetInnerHTML={{ __html: jsonLdScript(softwareJsonLd) }}
        />
        <TemplateDetailsClient template={template} compatibleExtensions={compatibleExtensions} />
      </main>
    </div>
  );
}
