'use client';
import { Filter, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AnimatedGradient } from '@/components/animated-gradient';
import { AnnouncementBanner } from '@/components/announcement-banner';
import { HeroSection } from '@/components/hero-section';
import { TemplateCard } from '@/components/template-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getTemplatesData } from '@/lib/data';
import type { Category, Template } from '@/lib/schemas';
import { cn } from '@/lib/utils';

export function TemplatesPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [templates, setTemplates] = useState<Template[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getTemplatesData();
      setTemplates(data.templates);
      setCategories(data.categories);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (templates.length === 0) return;
    let filtered = [...templates];
    if (selectedCategory) {
      filtered = filtered.filter((template) => template.category === selectedCategory);
    } else if (categoryParam && categoryParam !== 'all') {
      const category = categories.find((cat) => cat.slug === categoryParam);
      if (category) {
        filtered = filtered.filter((template) =>
          category.labels.some(
            (label) =>
              template.category.toLowerCase().includes(label.toLowerCase()) ||
              template.labels.some((tLabel) => tLabel.toLowerCase().includes(label.toLowerCase())),
          ),
        );
      }
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.labels.some((label) => label.toLowerCase().includes(query)),
      );
    }
    setFilteredTemplates(filtered);
  }, [categoryParam, selectedCategory, searchQuery, templates, categories]);

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete('category');
    else params.set('category', value);
    router.push(`/templates?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) params.set('search', e.target.value);
    else params.delete('search');
    router.replace(`/templates?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <AnnouncementBanner
          message={
            <>
              Built-in AGENTS.md contract for AI assistance!
              <Link href="/docs/agents-md" className="ml-1 inline-flex" />
            </>
          }
          ctaHref="/docs/agents-md"
          ctaLabel="Learn more"
        />
        <HeroSection
          title={<span>Templates</span>}
          description="Browse and discover templates to kickstart your next project"
          subtle
          glow={false}
        />
        <section className="relative -mt-12 md:-mt-20">
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <AnimatedGradient />
          </div>
          <div className="container relative z-10">
            <div className="mx-auto max-w-5xl py-4 fade-in-up-delay-1">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mb-4">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={cn(
                    'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                    selectedCategory === ''
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                  )}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={cn(
                      'shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors',
                      selectedCategory === cat.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search templates..."
                    className="w-full bg-background/50 backdrop-blur-sm pl-8 border-primary/20 focus:border-primary/40 transition-all duration-300"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue={categoryParam || 'all'} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary/40 transition-all duration-300">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/80 backdrop-blur-sm border-primary/20">
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-background/70 transition-all duration-300"
                  >
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">Loading templates...</p>
                </div>
              ) : filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <div key={template.slug} className={`fade-in-up-delay-${(index % 3) + 1}`}>
                    <Link href={`/templates/${template.slug}`}>
                      <TemplateCard template={template} />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">
                    No templates found. Please try a different search or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
