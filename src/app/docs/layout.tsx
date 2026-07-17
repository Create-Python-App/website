import type { ReactNode } from 'react';

import { DocsBreadcrumb } from '@/components/docs-breadcrumb';
import { DocsSidebar } from '@/components/docs-sidebar';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 min-h-0">
      <DocsSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="container pt-6 pb-0">
          <DocsBreadcrumb />
        </div>
        {children}
      </main>
    </div>
  );
}
