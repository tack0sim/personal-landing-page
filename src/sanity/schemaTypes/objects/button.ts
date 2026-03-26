import { LinkIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const button = defineType({
  name: 'button',
  type: 'object',
  icon: LinkIcon,
  description: 'A clickable button element',
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
          { title: 'Ghost', value: 'ghost' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      newTab: 'link.openInNewTab',
    },
    prepare({ title, newTab }) {
      return {
        title: title ?? 'Untitled Button',
        subtitle: newTab ? 'Opens in new tab' : 'Opens in same tab',
        media: LinkIcon,
      };
    },
  },
});
