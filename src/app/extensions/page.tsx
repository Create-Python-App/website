import type { Metadata } from 'next';
import { ExtensionsPageClient } from './ExtensionsPageClient';

export const metadata: Metadata = {
  title: 'Extensions Directory',
  description: 'Enhance your templates with powerful extensions.',
  alternates: { canonical: '/extensions' },
  openGraph: {
    title: 'Extensions Directory',
    description: 'Enhance your templates with powerful extensions.',
    url: '/extensions',
    type: 'website',
  },
};

export default function ExtensionsPage() {
  return <ExtensionsPageClient />;
}
