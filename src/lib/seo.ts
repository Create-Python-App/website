export const SITE_URL = 'https://create-awesome-node-app.vercel.app';
export const SITE_NAME = 'Create Awesome Node App';
export const SITE_DESCRIPTION =
  'Discover production-ready templates and extensions to jumpstart your next Node.js project. Combine starters and add-ons to build faster.';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function jsonLdScript(data: object) {
  return JSON.stringify(data);
}

// SoftwareApplication JSON-LD for a template (acts like a starter kit)
export function templateSoftwareJsonLd(template: {
  name: string;
  description: string;
  slug: string;
  labels: string[];
  url: string;
  category: string;
  type: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: template.name,
    applicationCategory: template.category || 'DeveloperApplication',
    operatingSystem: 'Any',
    description: template.description,
    keywords: template.labels?.join(', '),
    url: `${SITE_URL}/templates/${template.slug}`,
    softwareVersion: '1.0.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      url: `${SITE_URL}/templates/${template.slug}`,
    },
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

// SoftwareApplication JSON-LD for an extension (add-on)
export function extensionSoftwareJsonLd(extension: {
  name: string;
  description: string;
  slug: string;
  labels: string[];
  url: string;
  category: string;
  type: string | string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: extension.name,
    applicationCategory: extension.category || 'DeveloperApplication',
    operatingSystem: 'Any',
    description: extension.description,
    keywords: extension.labels?.join(', '),
    url: `${SITE_URL}/extensions/${extension.slug}`,
    softwareVersion: '1.0.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      url: `${SITE_URL}/extensions/${extension.slug}`,
    },
    creator: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
