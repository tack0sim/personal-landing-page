import { CloudIcon } from 'lucide-react';
import { defineField, defineType } from 'sanity';

export const cloudBlock = defineType({
  name: 'cloudBlock',
  type: 'object',
  icon: CloudIcon,
  description: 'An infinite scrolling strip of logos',
  fields: [
    defineField({
      name: 'logos',
      type: 'array',
      of: [{ type: 'customImage' }],
      description: 'Add logo images to display in the infinite scroll strip.',
    }),
  ],
  preview: {
    select: {
      logos: 'logos',
    },
    prepare({ logos }) {
      const numberOfLogos = logos?.length || 0;
      return {
        title: 'Cloud Block',
        subtitle: `${numberOfLogos} logos`,
        media: CloudIcon,
      };
    },
  },
});
