import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type React from 'react';
import '@/app/globals.css';
import { LayoutShell } from '@/components/layout-shell';
import { jsonLdScript, organizationJsonLd, websiteJsonLd } from '@/lib/seo';

const siteUrl = 'https://create-awesome-python-app.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Create Awesome Python App',
    template: '%s | Create Awesome Python App',
  },
  description:
    'One command. Any stack. Choose a template, add addons, and ship production-ready Python APIs, CLIs, and workers.',
  keywords: [
    'python templates',
    'python starter',
    'create python app',
    'fastapi boilerplate',
    'django api template',
    'celery worker starter',
    'python extensions',
  ],
  authors: [{ name: 'Create Awesome Python App Team', url: siteUrl }],
  creator: 'Create Awesome Python App',
  publisher: 'Create Awesome Python App',
  openGraph: {
    title: 'Create Awesome Python App',
    description: 'One command. Any stack. Compose templates and addons into production-ready Python apps.',
    url: siteUrl,
    siteName: 'Create Awesome Python App',
    images: [
      {
        url: '/og-default.png', // raster fallback
        width: 1200,
        height: 630,
        alt: 'Create Awesome Python App – Templates & Extensions',
      },
      {
        url: '/og-default.svg', // some platforms now support SVG (fallback above covers others)
        width: 1200,
        height: 630,
        alt: 'Create Awesome Python App – Templates & Extensions',
        type: 'image/svg+xml',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Awesome Python App',
    description: 'Discover Python templates and extensions to accelerate your development workflow.',
    images: ['/og-default.png', '/og-default.svg'],
    creator: '@',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
};
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: contenido controlado
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              '@context': 'https://schema.org',
              '@graph': [organizationJsonLd(), websiteJsonLd()],
            }),
          }}
        />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
