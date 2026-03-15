import { defineField, defineType } from 'sanity';

export const customImage = defineType({
  name: 'customImage',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({ image }) {
      return {
        title: 'Custom Image',
        media: image,
      };
    },
  },
});
