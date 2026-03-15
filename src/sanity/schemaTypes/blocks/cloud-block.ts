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
});
