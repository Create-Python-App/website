import { getFallbackData, mockTemplatesData } from './mock-data';
import { type TemplatesData, templatesDataSchema } from './schemas';

const TEMPLATES_URL = 'https://raw.githubusercontent.com/Create-Python-App/cpa-templates/main/templates.json';

/** Catalog counts for footer / stats bar — single source of truth. */
export type CatalogStats = {
  templates: number;
  extensions: number;
  categories: number;
};

export function catalogStatsFrom(data: TemplatesData): CatalogStats {
  return {
    templates: data.templates.length,
    extensions: data.extensions.length,
    categories: data.categories.length,
  };
}

export const FALLBACK_STATS: CatalogStats = catalogStatsFrom(mockTemplatesData);

export async function getTemplatesData(): Promise<TemplatesData> {
  try {
    const response = await fetch(TEMPLATES_URL, { next: { revalidate: 3600 } }); // Revalidate every hour

    if (!response.ok) {
      throw new Error(`Failed to fetch templates: ${response.status}`);
    }

    const rawData = await response.json();

    // Validate the data against our schema
    const result = templatesDataSchema.safeParse(rawData);

    if (!result.success) {
      console.error('Data validation error:', result.error.format());
      // Return fallback data if validation fails
      return getFallbackData();
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching templates data:', error);
    // Return fallback data if fetch fails
    return getFallbackData();
  }
}
