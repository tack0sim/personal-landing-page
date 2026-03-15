import type { FieldGroupDefinition } from 'sanity';

export const group = {
  content: 'content',
  seo: 'seo',
  og: 'og',
};

export const groups: FieldGroupDefinition[] = [
  { name: group.content, title: 'Content', default: true },
  { name: group.seo, title: 'SEO' },
  { name: group.og, title: 'Open Graph' },
];
