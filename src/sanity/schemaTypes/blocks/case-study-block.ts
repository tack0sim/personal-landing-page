import { BriefcaseIcon } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const caseStudyBlock = defineType({
  name: 'caseStudyBlock',
  type: 'object',
  icon: BriefcaseIcon,
  description:
    'Alternating project case study cards with image, problem, decisions and technologies',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Optional section heading',
    }),
    defineField({
      name: 'subtitle',
      type: 'text',
      rows: 2,
      description: 'Optional section subheading',
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'challenge',
              type: 'text',
              rows: 3,
              description: 'Describe the challenge this project addressed',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'decisions',
              type: 'array',
              description: 'Key architectural or technical decisions made',
              of: [{ type: 'string' }],
            }),
            defineField({
              name: 'technologies',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'icon',
                      type: 'customImage',
                      description: 'Technology icon image',
                      validation: (rule) => rule.optional(),
                    }),
                  ],
                  preview: {
                    select: { name: 'name', icon: 'icon' },
                    prepare({ name, icon }) {
                      return { title: name, media: icon?.image };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: 'image',
              type: 'customImage',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'link',
              type: 'link',
              description: 'Optional link to the live project or case study',
            }),
          ],
          preview: {
            select: { title: 'title', image: 'image' },
            prepare({ title, image }) {
              return {
                title: title ?? 'Untitled project',
                media: image?.image,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', projects: 'projects' },
    prepare({ title, projects }) {
      const count = projects?.length ?? 0;
      return {
        title: title || 'Case Studies',
        subtitle: `${count} project${count !== 1 ? 's' : ''}`,
        media: BriefcaseIcon,
      };
    },
  },
});
