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
      title: 'alt',
      image: 'image',
    },
    prepare({ title, image }) {
      return {
        title: title ?? 'Custom Image',
        media: image,
      };
    },
  },
});
