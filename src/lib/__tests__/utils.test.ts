import { describe, expect, it } from 'vitest';
import type { Extension, Template } from '../schemas';
import { cn, isCompatible, validateExtension, validateTemplate } from '../utils';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('should handle conditional classes', () => {
    const condition = true;
    expect(cn(condition && 'active')).toBe('active');
  });
});

describe('validateTemplate', () => {
  it('should return null for invalid data', () => {
    const invalidData = { name: 'Test' };
    expect(validateTemplate(invalidData)).toBeNull();
  });

  it('should return data for valid template', () => {
    const validData = {
      name: 'FastAPI Starter',
      description: 'A FastAPI starter.',
      url: 'https://github.com/Create-Python-App/cpa-templates/tree/main/templates/fastapi-starter',
      type: 'fastapi-backend',
      category: 'backend-applications',
      labels: ['FastAPI', 'uv'],
      slug: 'fastapi-starter',
    };
    const result = validateTemplate(validData);
    expect(result).not.toBeNull();
    expect(result?.name).toBe('FastAPI Starter');
  });
});

describe('validateExtension', () => {
  it('should return null for invalid data', () => {
    const invalidData = { name: 'Test' };
    expect(validateExtension(invalidData)).toBeNull();
  });

  it('should return data for valid extension', () => {
    const validData = {
      name: 'FastAPI Docker',
      description: 'Add Docker packaging for FastAPI.',
      url: 'https://github.com/Create-Python-App/cpa-templates/tree/main/extensions/fastapi-docker',
      type: 'fastapi-backend',
      category: 'containers',
      labels: ['Docker'],
      slug: 'fastapi-docker',
    };
    const result = validateExtension(validData);
    expect(result).not.toBeNull();
    expect(result?.name).toBe('FastAPI Docker');
  });
});

describe('isCompatible', () => {
  it('should return true when extension type matches template type', () => {
    const template = { type: 'fastapi-backend' } as Template;
    const extension = { type: 'fastapi-backend' } as Extension;
    expect(isCompatible(template, extension)).toBe(true);
  });

  it('should return true when extension type array includes template type', () => {
    const template = { type: 'fastapi-backend' } as Template;
    const extension = { type: ['fastapi-backend', 'django-backend'] } as Extension;
    expect(isCompatible(template, extension)).toBe(true);
  });

  it('should return false when extension type does not match', () => {
    const template = { type: 'fastapi-backend' } as Template;
    const extension = { type: 'django-backend' } as Extension;
    expect(isCompatible(template, extension)).toBe(false);
  });
});
