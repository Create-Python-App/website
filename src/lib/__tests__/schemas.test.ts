import { describe, expect, it } from 'vitest';
import { categorySchema, extensionSchema, templateSchema, templatesDataSchema } from '../schemas';

describe('categorySchema', () => {
  it('should validate a valid category', () => {
    const validCategory = {
      slug: 'frontend-applications',
      name: 'Frontend Applications',
      description: 'Templates for building web interfaces.',
      details: 'Discover templates for React, Vue, and other frameworks.',
      labels: ['Frontend', 'UI', 'React'],
    };
    expect(categorySchema.safeParse(validCategory).success).toBe(true);
  });

  it('should reject a category with missing required fields', () => {
    const invalidCategory = {
      slug: 'frontend-applications',
      name: 'Frontend Applications',
    };
    expect(categorySchema.safeParse(invalidCategory).success).toBe(false);
  });
});

describe('templateSchema', () => {
  it('should validate a valid template', () => {
    const validTemplate = {
      name: 'React Vite Starter',
      description: 'A fast React boilerplate with Vite.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/templates/react-vite-starter',
      type: 'react',
      category: 'frontend-applications',
      labels: ['React', 'Vite', 'TypeScript'],
      slug: 'react-vite-starter',
    };
    expect(templateSchema.safeParse(validTemplate).success).toBe(true);
  });

  it('should reject a template with invalid url', () => {
    const invalidTemplate = {
      name: 'React Vite Starter',
      description: 'A fast React boilerplate.',
      url: 'not-a-url',
      type: 'react',
      category: 'frontend-applications',
      labels: ['React'],
      slug: 'react-vite-starter',
    };
    expect(templateSchema.safeParse(invalidTemplate).success).toBe(false);
  });
});

describe('extensionSchema', () => {
  it('should validate a valid extension with string type', () => {
    const validExtension = {
      name: 'Tailwind CSS',
      description: 'Add Tailwind CSS.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/extensions/react-tailwindcss',
      type: 'react',
      category: 'UI',
      labels: ['Tailwind', 'CSS'],
      slug: 'tailwind-css',
    };
    expect(extensionSchema.safeParse(validExtension).success).toBe(true);
  });

  it('should validate a valid extension with array type', () => {
    const validExtension = {
      name: 'GitHub Setup',
      description: 'Add GitHub automation.',
      url: 'https://github.com/Create-Node-App/cna-templates/tree/main/extensions/all-github-setup',
      type: ['react', 'nextjs', 'backend'],
      category: 'Tooling',
      labels: ['GitHub', 'CI/CD'],
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
          name: 'React Vite Starter',
          description: 'A fast React boilerplate.',
          url: 'https://github.com/example/react-vite',
          type: 'react',
          category: 'frontend-applications',
          labels: ['React'],
          slug: 'react-vite-starter',
        },
      ],
      extensions: [
        {
          name: 'Tailwind CSS',
          description: 'Add Tailwind CSS.',
          url: 'https://github.com/example/tailwind',
          type: 'react',
          category: 'UI',
          labels: ['CSS'],
          slug: 'tailwind-css',
        },
      ],
      categories: [
        {
          slug: 'frontend-applications',
          name: 'Frontend Applications',
          description: 'Templates for building web interfaces.',
          details: 'Build web interfaces.',
          labels: ['Frontend'],
        },
      ],
    };
    expect(templatesDataSchema.safeParse(validData).success).toBe(true);
  });
});
