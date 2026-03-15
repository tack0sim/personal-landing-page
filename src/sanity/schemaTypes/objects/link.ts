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
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'external',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'external',
      type: 'url',
      description: 'Enter the external URL',
    }),
    defineField({
      name: 'openInNewTab',
      type: 'boolean',
      description: 'Open the link in a new tab',
      initialValue: true,
    }),
  ],
});
