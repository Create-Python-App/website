import type { Metadata } from 'next';
import { TemplatesPageClient } from './TemplatesPageClient';

export const metadata: Metadata = {
  title: 'Templates Directory',
  description: 'Browse and discover templates to kickstart your next project.',
  alternates: { canonical: '/templates' },
  openGraph: {
    title: 'Templates Directory',
    description: 'Browse and discover templates to kickstart your next project.',
    url: '/templates',
    type: 'website',
  },
};

export default function TemplatesPage() {
  return <TemplatesPageClient />;
}
