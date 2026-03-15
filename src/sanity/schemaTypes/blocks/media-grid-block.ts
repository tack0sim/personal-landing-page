import { GridIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const mediaGridBlock = defineType({
  name: 'mediaGridBlock',
  type: 'object',
  icon: GridIcon,
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      description: "A small piece of text above the title, often used for categorization or emphasis.", 
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'mediaItems',
      type: 'array',
      of: [{ type: 'customImage' }],
      description:
        'Add media items to the grid.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Please add at least one media item to the grid.'),
    }),
    defineField({
      name: 'columns',
      type: 'number',
      description:
        'Select the number of columns for the media grid. Defaults to 2 columns.',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
        layout: 'radio',
      },
      initialValue: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
