import { defineField, defineType } from 'sanity';
import { buttonsField } from '../utils/common';
import { HouseHeart } from 'lucide-react';

export const heroBlock = defineType({
  name: 'heroBlock',
  type: 'object',
  icon: HouseHeart,
  description: 'The hero section of a page',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'customImage',
      description: 'The main image for the hero section background',
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image.image',
    },
    prepare({ title, media }) {
      return {
        title: title ?? 'Untitled Hero Block',
        subtitle: 'Hero Block',
        media,
      };
    },
  },
});
