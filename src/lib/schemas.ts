import { z } from 'zod';

// Category schema
export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  details: z.string(),
  labels: z.array(z.string()),
});

// Template schema
export const templateSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  type: z.string(),
  category: z.string(),
  labels: z.array(z.string()),
  slug: z.string(),
});

// Extension schema
export const extensionSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  type: z.union([z.string(), z.array(z.string())]),
  category: z.string(),
  labels: z.array(z.string()),
  slug: z.string(),
});

// TemplatesData schema
export const templatesDataSchema = z.object({
  templates: z.array(templateSchema),
  extensions: z.array(extensionSchema),
  categories: z.array(categorySchema),
});

// Export types derived from the schemas
export type Template = z.infer<typeof templateSchema>;
export type Extension = z.infer<typeof extensionSchema>;
export type Category = z.infer<typeof categorySchema>;
export type TemplatesData = z.infer<typeof templatesDataSchema>;
