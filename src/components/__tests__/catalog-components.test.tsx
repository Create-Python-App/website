import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import TemplatesLoading from '@/app/templates/loading';
import { DocsBreadcrumb } from '../docs-breadcrumb';

vi.mock('next/navigation', () => ({
  usePathname: () => '/docs/templates/customization',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('DocsBreadcrumb', () => {
  it('renders an accessible breadcrumb landmark', () => {
    const { container } = render(<DocsBreadcrumb />);
    expect(container.querySelector('nav[aria-label="breadcrumb"]')).not.toBeNull();
  });

  it('renders the Docs → Templates → Customization trail', () => {
    const { container } = render(<DocsBreadcrumb />);
    const links = [...container.querySelectorAll('a')].map((a) => ({
      text: a.textContent,
      href: a.getAttribute('href'),
    }));
    expect(links).toContainEqual({ text: 'Docs', href: '/docs' });
    expect(links).toContainEqual({ text: 'Templates', href: '/docs/templates' });
    // Current page is marked with aria-current, not linked.
    const current = container.querySelector('[aria-current="page"]');
    expect(current?.textContent).toBe('Customization');
  });

  it('has valid list markup (no nested li elements)', () => {
    const { container } = render(<DocsBreadcrumb />);
    expect(container.querySelectorAll('li li')).toHaveLength(0);
  });
});

describe('Templates loading skeleton', () => {
  it('renders six placeholder cards while catalog data loads', () => {
    const { container } = render(<TemplatesLoading />);
    expect(container.querySelectorAll('div.rounded-lg.border')).toHaveLength(6);
  });
});
