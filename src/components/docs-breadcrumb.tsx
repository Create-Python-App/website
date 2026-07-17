'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const segmentLabels: Record<string, string> = {
  docs: 'Docs',
  'agents-md': 'AGENTS.md',
  templates: 'Templates',
  customization: 'Customization',
  extensions: 'Extensions',
  contributing: 'Contributing',
  advanced: 'Advanced',
  usage: 'Usage',
};

export function DocsBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length <= 1) {
    return null;
  }

  const crumbs = segments.map((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = segmentLabels[seg] ?? seg;
    const isLast = idx === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {crumbs.map((crumb) => (
          <BreadcrumbItem key={crumb.href}>
            {crumb.isLast ? (
              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={crumb.href}>{crumb.label}</Link>
              </BreadcrumbLink>
            )}
            {!crumb.isLast && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
