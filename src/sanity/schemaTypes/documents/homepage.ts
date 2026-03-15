import { defineField, defineType } from 'sanity';
import { ogFields, pageBuilderField, seoFields } from '../utils/common';
import { group, groups } from '../utils/groups';
import { HomeIcon } from '@sanity/icons';

export const homepage = defineType({
  name: 'homepage',
  type: 'document',
  description: 'The homepage of the website',
  icon: HomeIcon,
  groups: groups,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
      group: group.content,
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
});
