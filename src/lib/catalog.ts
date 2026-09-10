/** Shared pure helpers for the templates/extensions catalog pages. */

export interface CatalogItemLike {
  name: string;
  slug: string;
  description: string;
  labels: string[];
}

export interface BreadcrumbSegment {
  href: string;
  label: string;
  isLast: boolean;
}

/** Labels for known docs path segments; unknown segments fall back to the raw slug. */
export const DOCS_SEGMENT_LABELS: Record<string, string> = {
  docs: 'Docs',
  'agents-md': 'AGENTS.md',
  installation: 'Installation',
  templates: 'Templates',
  customization: 'Customization',
  extensions: 'Extensions',
  contributing: 'Contributing',
  advanced: 'Advanced',
  usage: 'Usage',
};

/**
 * Case-insensitive substring match of a free-text query against an item's
 * name, slug, description, and labels. A blank query matches everything.
 */
export function matchesCatalogQuery(item: CatalogItemLike, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return (
    item.name.toLowerCase().includes(normalized) ||
    item.slug.toLowerCase().includes(normalized) ||
    item.description.toLowerCase().includes(normalized) ||
    item.labels.some((label) => label.toLowerCase().includes(normalized))
  );
}

/**
 * Filter catalog items by category (exact match, empty = all) and free-text
 * query. Pure — the templates/extensions client pages delegate to this.
 */
export function filterCatalogItems<T extends CatalogItemLike & { category: string }>(
  items: T[],
  options: { category?: string; query?: string } = {},
): T[] {
  const { category = '', query = '' } = options;
  return items.filter((item) => (!category || item.category === category) && matchesCatalogQuery(item, query));
}

/**
 * Build the Home → … → Page breadcrumb trail for a docs pathname.
 * Returns [] for top-level routes (no trail needed).
 */
export function buildDocsBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length <= 1) return [];
  return segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join('/')}`,
    label: DOCS_SEGMENT_LABELS[segment] ?? segment,
    isLast: index === segments.length - 1,
  }));
}
