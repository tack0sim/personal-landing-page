import { defineField, defineType } from 'sanity';
import { buttonField } from '../utils/common';

export const navbar = defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'links',
      type: 'array',
      of: [{ type: 'linkLabel' }],
    }),
    buttonField,
  ],
  preview: {
    prepare() {
      return {
        title: 'Navbar',
      };
    },
  },
});
