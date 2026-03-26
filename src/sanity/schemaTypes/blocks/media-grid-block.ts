import { GridIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const mediaGridBlock = defineType({
  name: 'mediaGridBlock',
  type: 'object',
  icon: GridIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      description:
        'A small piece of text above the title, often used for categorization or emphasis.',
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
      type: 'object',
      fields: [
        defineField({
          name: 'images',
          type: 'array',
          of: [
            {
              name: 'imageItem',
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  type: 'customImage',
                }),
                defineField({
                  name: 'link',
                  type: 'link',
                }),
                defineField({
                  name: 'badgeText',
                  type: 'string',
                  description:
                    'Text to display in a badge overlay on the image.',
                }),
                defineField({
                  name: 'badgeVariant',
                  type: 'string',
                  description:
                    'Variant for the badge (e.g., "default", "secondary", "outline").',
                  options: {
                    list: [
                      { title: 'Default', value: 'default' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'default',
                }),
              ],
              preview: {
                select: {
                  title: 'image.alt',
                  badge: 'badgeText',
                  media: 'image.image',
                },
                prepare({ title, badge, media }) {
                  return {
                    title: title ? `Media Grid: ${title}` : 'Media Grid Item',
                    subtitle: `Badge: ${badge}`,
                    media,
                  };
                },
              },
            },
          ],
          description: 'Add media items to the grid.',
          validation: (Rule) =>
            Rule.required()
              .min(1)
              .error('Please add at least one media item to the grid.'),
        }),
      ],
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
  preview: {
    select: {
      title: 'title',
      mediaItems: 'mediaItems',
    },
    prepare({ title, mediaItems }) {
      const numberOfGridItems = mediaItems?.images?.length ?? 0;
      return {
        title: title ?? 'Untitled Media Grid Block',
        subtitle: `${numberOfGridItems} items`,
        media: GridIcon,
      };
    },
  },
});
