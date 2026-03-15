import { defineField, defineType } from 'sanity';
import {
  alignmentField,
  buttonsField,
  richTextWithImage,
} from '../utils/common';
import { PresentationIcon } from 'lucide-react';

export const mediaBlock = defineType({
  name: 'mediaBlock',
  type: 'object',
  icon: PresentationIcon,
  description: 'A block for displaying media content such as images or videos',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      description: 'A small heading above the main title',
    }),
    defineField({
      name: 'image',
      type: 'customImage',
      validation: (rule) => rule.required(),
    }),
    richTextWithImage,
    buttonsField,
    alignmentField({
      description:
        'Select whether the media appears on the left or right side of the text',
      options: [
        { title: 'Left', value: 'left' },
        { title: 'Right', value: 'right' },
      ],
      initialValue: 'left',
    }),
  ],
});
