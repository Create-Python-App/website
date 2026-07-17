import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type Extension, extensionSchema, type Template, templateSchema } from './schemas';

// Validate a single template
export function validateTemplate(data: unknown): Template | null {
  const result = templateSchema.safeParse(data);
  if (!result.success) {
    console.error('Template validation error:', result.error.format());
    return null;
  }
  return result.data;
}

// Validate a single extension
export function validateExtension(data: unknown): Extension | null {
  const result = extensionSchema.safeParse(data);
  if (!result.success) {
    console.error('Extension validation error:', result.error.format());
    return null;
  }
  return result.data;
}

// Validate compatibility between template and extension
export function isCompatible(template: Template, extension: Extension): boolean {
  if (Array.isArray(extension.type)) {
    return extension.type.includes(template.type);
  }
  return extension.type === template.type;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
