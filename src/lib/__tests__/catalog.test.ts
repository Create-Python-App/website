import { describe, expect, it } from 'vitest';

import { buildDocsBreadcrumbs, filterCatalogItems, matchesCatalogQuery } from '../catalog';
import { catalogStatsFrom } from '../data';
import { mockTemplatesData } from '../mock-data';

const items = [
  {
    name: 'FastAPI Starter',
    slug: 'fastapi-starter',
    description: 'A FastAPI API starter with uv.',
    category: 'backend',
    labels: ['Backend', 'API', 'FastAPI'],
  },
  {
    name: 'Celery Worker',
    slug: 'celery-worker',
    description: 'Background workers with Redis.',
    category: 'workers',
    labels: ['Background', 'Redis'],
  },
];

describe('matchesCatalogQuery', () => {
  it('matches everything on a blank query', () => {
    expect(matchesCatalogQuery(items[0], '')).toBe(true);
    expect(matchesCatalogQuery(items[0], '   ')).toBe(true);
  });

  it('matches by name, case-insensitively', () => {
    expect(matchesCatalogQuery(items[0], 'fastapi')).toBe(true);
    expect(matchesCatalogQuery(items[0], 'FASTAPI')).toBe(true);
    expect(matchesCatalogQuery(items[1], 'fastapi')).toBe(false);
  });

  it('matches by slug', () => {
    expect(matchesCatalogQuery(items[1], 'celery-worker')).toBe(true);
  });

  it('matches by description', () => {
    expect(matchesCatalogQuery(items[1], 'redis')).toBe(true);
  });

  it('matches by label', () => {
    expect(matchesCatalogQuery(items[0], 'backend')).toBe(true);
  });

  it('returns false when nothing matches', () => {
    expect(matchesCatalogQuery(items[0], 'django-nope')).toBe(false);
  });
});

describe('filterCatalogItems', () => {
  it('returns all items without options', () => {
    expect(filterCatalogItems(items)).toHaveLength(2);
  });

  it('filters by exact category', () => {
    expect(filterCatalogItems(items, { category: 'workers' })).toEqual([items[1]]);
  });

  it('combines category and query', () => {
    expect(filterCatalogItems(items, { category: 'backend', query: 'celery' })).toEqual([]);
    expect(filterCatalogItems(items, { category: 'backend', query: 'fastapi' })).toEqual([items[0]]);
  });
});

describe('buildDocsBreadcrumbs', () => {
  it('returns [] for top-level routes', () => {
    expect(buildDocsBreadcrumbs('/')).toEqual([]);
    expect(buildDocsBreadcrumbs('/docs')).toEqual([]);
  });

  it('builds the Home → Docs → Section → Page trail', () => {
    expect(buildDocsBreadcrumbs('/docs/templates/customization')).toEqual([
      { href: '/docs', label: 'Docs', isLast: false },
      { href: '/docs/templates', label: 'Templates', isLast: false },
      { href: '/docs/templates/customization', label: 'Customization', isLast: true },
    ]);
  });

  it('falls back to the raw slug for unknown segments', () => {
    const crumbs = buildDocsBreadcrumbs('/docs/some-new-page');
    expect(crumbs[1]).toEqual({
      href: '/docs/some-new-page',
      label: 'some-new-page',
      isLast: true,
    });
  });
});

describe('catalogStatsFrom', () => {
  it('derives counts from templates.json data (no hard-coded values)', () => {
    expect(catalogStatsFrom(mockTemplatesData)).toEqual({
      templates: mockTemplatesData.templates.length,
      extensions: mockTemplatesData.extensions.length,
      categories: mockTemplatesData.categories.length,
    });
  });
});
