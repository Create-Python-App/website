import { describe, expect, it } from 'vitest';
import { categorySchema, extensionSchema, templateSchema, templatesDataSchema } from '../schemas';

describe('categorySchema', () => {
  it('should validate a valid category', () => {
    const validCategory = {
      slug: 'backend-applications',
      name: 'Backend Applications',
      description: 'API and service starters for FastAPI.',
      details: 'Use when the deliverable is an HTTP API — FastAPI for async APIs with OpenAPI docs.',
      labels: ['Backend', 'API', 'FastAPI'],
    };
    expect(categorySchema.safeParse(validCategory).success).toBe(true);
  });

  it('should reject a category with missing required fields', () => {
    const invalidCategory = {
      slug: 'backend-applications',
      name: 'Backend Applications',
    };
    expect(categorySchema.safeParse(invalidCategory).success).toBe(false);
  });
});

describe('templateSchema', () => {
  it('should validate a valid template', () => {
    const validTemplate = {
      name: 'FastAPI Starter',
      description: 'A FastAPI API starter with uv.',
      url: 'https://github.com/Create-Python-App/cpa-templates/tree/main/templates/fastapi-starter',
      type: 'fastapi-backend',
      category: 'backend-applications',
      labels: ['FastAPI', 'uv', 'Python'],
      slug: 'fastapi-starter',
    };
    expect(templateSchema.safeParse(validTemplate).success).toBe(true);
  });

  it('should reject a template with invalid url', () => {
    const invalidTemplate = {
      name: 'FastAPI Starter',
      description: 'A FastAPI starter.',
      url: 'not-a-url',
      type: 'fastapi-backend',
      category: 'backend-applications',
      labels: ['fastapi'],
      slug: 'fastapi-starter',
    };
    expect(templateSchema.safeParse(invalidTemplate).success).toBe(false);
  });
});

describe('extensionSchema', () => {
  it('should validate a valid extension with string type', () => {
    const validExtension = {
      name: 'FastAPI Docker',
      description: 'Add Docker packaging for FastAPI.',
      url: 'https://github.com/Create-Python-App/cpa-templates/tree/main/extensions/fastapi-docker',
      type: 'fastapi-backend',
      category: 'containers',
      labels: ['Docker', 'FastAPI'],
      slug: 'fastapi-docker',
    };
    expect(extensionSchema.safeParse(validExtension).success).toBe(true);
  });

  it('should validate a valid extension with array type', () => {
    const validExtension = {
      name: 'GitHub Setup',
      description: 'Add GitHub automation.',
      url: 'https://github.com/Create-Python-App/cpa-templates/tree/main/extensions/all-github-setup',
      type: ['fastapi-backend', 'django-backend', 'cli-app'],
      category: 'ci',
      labels: ['GitHub', 'CI'],
      slug: 'github-setup',
    };
    expect(extensionSchema.safeParse(validExtension).success).toBe(true);
  });
});

describe('templatesDataSchema', () => {
  it('should validate complete templates data', () => {
    const validData = {
      templates: [
        {
          name: 'FastAPI Starter',
          description: 'A FastAPI starter.',
          url: 'https://github.com/example/fastapi-starter',
          type: 'fastapi-backend',
          category: 'backend-applications',
          labels: ['fastapi'],
          slug: 'fastapi-starter',
        },
      ],
      extensions: [
        {
          name: 'FastAPI Docker',
          description: 'Add Docker packaging.',
          url: 'https://github.com/example/fastapi-docker',
          type: 'fastapi-backend',
          category: 'containers',
          labels: ['Docker'],
          slug: 'fastapi-docker',
        },
      ],
      categories: [
        {
          slug: 'backend-applications',
          name: 'Backend Applications',
          description: 'API and service starters for FastAPI.',
          details: 'Build Python APIs.',
          labels: ['Backend'],
        },
      ],
    };
    expect(templatesDataSchema.safeParse(validData).success).toBe(true);
  });
});
