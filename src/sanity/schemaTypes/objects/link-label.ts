import { defineField, defineType } from 'sanity';

export const linkLabel = defineType({
  name: 'linkLabel',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      description: 'Text to display for the link',
    }),
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
});
