import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTemplatesData } from '@/lib/data';
import { breadcrumbJsonLd, extensionSoftwareJsonLd, jsonLdScript, SITE_URL } from '@/lib/seo';
import { isCompatible } from '@/lib/utils';
import { ExtensionDetailsClient } from './ExtensionDetailsClient';

interface ExtensionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { extensions } = await getTemplatesData();
  return extensions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: ExtensionPageProps): Promise<Metadata> {
  const resolved = await params;
  const { extensions } = await getTemplatesData();
  const extension = extensions.find((e) => e.slug === resolved.slug);
  if (!extension) return {};
  const title = `${extension.name} Extension`;
  const description = extension.description.slice(0, 155);
  const url = `${SITE_URL}/extensions/${extension.slug}`;
  const labels = extension.labels.slice(0, 6).join(', ');
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
    twitter: { card: 'summary_large_image', title, description, images: ['/og-default.png'] },
    keywords: labels,
  };
}

export default async function ExtensionPage({ params }: ExtensionPageProps) {
  const resolved = await params;
  const { extensions, templates } = await getTemplatesData();
  const extension = extensions.find((e) => e.slug === resolved.slug);
  if (!extension) notFound();
  const compatibleTemplates = templates.filter((template) => isCompatible(template, extension));
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', url: SITE_URL },
    { name: 'Extensions', url: `${SITE_URL}/extensions` },
    { name: extension.name, url: `${SITE_URL}/extensions/${extension.slug}` },
  ]);

  const softwareJsonLd = extensionSoftwareJsonLd(extension);
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
        <ExtensionDetailsClient extension={extension} compatibleTemplates={compatibleTemplates} />
      </main>
    </div>
  );
}
