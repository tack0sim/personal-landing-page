import { defineField, defineType } from 'sanity';

export const link = defineType({
  name: 'link',
  type: 'object',
  description: 'A hyperlink to an internal or external resource',
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Anchor', value: 'anchor' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'anchor',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'anchor',
      type: 'string',
      description: 'Enter the anchor link without "#" (e.g., section-id)',
      hidden: ({ parent }) => parent?.type !== 'anchor',
    }),
    defineField({
      name: 'external',
      type: 'url',
      description: 'Enter the external URL',
      hidden: ({ parent }) => parent?.type !== 'external',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      description: 'Open the link in a new tab',
      initialValue: true,
    }),
  ],
});
