import { MegaphoneIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';
import { alignmentField, buttonsField } from '../utils/common';
import { richText } from '../utils/common';

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to Action Block',
  type: 'object',
  icon: MegaphoneIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
    }),
    richText,
    defineField({
      name: 'image',
      type: 'customImage',
    }),
    buttonsField,
    alignmentField({
      description:
        'Select the alignment for the text content in the CTA block.',
      options: [
        { title: 'Left', value: 'left' },
        { title: 'Center', value: 'center' },
        { title: 'Right', value: 'right' },
      ],
      initialValue: 'center',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image.image',
    },
    prepare({ title, media }) {
      return {
        title: title ?? 'Untitled CTA Block',
        subtitle: 'CTA Block',
        media,
      };
    },
  },
});
