import { defineField, type StringOptions } from 'sanity';
import { group } from './groups';

export const pageBuilderField = defineField({
  name: 'pageBuilder',
  type: 'pageBuilder',
  group: group.content,
});

export const buttonsField = defineField({
  name: 'buttons',
  type: 'array',
  of: [{ type: 'button' }],
});

export const richText = defineField({
  name: 'richTextCore',
  type: 'richTextCore',
});

export const richTextWithImage = defineField({
  name: 'richTextWithImage',
  type: 'richText',
});

export const alignmentField = ({
  name = 'alignment',
  title = 'Alignment',
  description,
  options,
  initialValue,
}: {
  name?: string;
  title?: string;
  description: string;
  options: StringOptions['list'];
  initialValue: string;
}) => {
  return defineField({
    name,
    title,
    description,
    type: 'string',
    options: {
      list: options,
      layout: 'radio',
    },
    initialValue,
  });
};

export const seoFields = [
  defineField({
    name: 'seoTitle',
    type: 'string',
    description: 'Title for SEO optimization, max 60 characters',
    validation: (rule) => rule.max(60),
    group: group.seo,
  }),
  defineField({
    name: 'seoDescription',
    type: 'text',
    description: 'Description for SEO optimization, max 160 characters',
    validation: (rule) => rule.max(160),
    group: group.seo,
  }),
  defineField({
    name: 'noIndex',
    type: 'boolean',
    description: 'If checked, this page will not be indexed by search engines',
    initialValue: false,
    group: group.seo,
  }),
];

export const ogFields = [
  defineField({
    name: 'ogTitle',
    type: 'string',
    description: 'Title for Open Graph, max 60 characters',
    validation: (rule) => rule.max(60),
    group: group.og,
  }),
  defineField({
    name: 'ogDescription',
    type: 'text',
    description: 'Description for Open Graph, max 160 characters',
    validation: (rule) => rule.max(160),
    group: group.og,
  }),
  defineField({
    name: 'ogImage',
    type: 'customImage',
    description: 'Image for Open Graph preview',
    group: group.og,
  }),
];
