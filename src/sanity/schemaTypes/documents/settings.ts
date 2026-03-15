import { defineField, defineType } from 'sanity';
import { ogFields, seoFields } from '../utils/common';
import { group, groups } from '../utils/groups';
import { CogIcon } from '@sanity/icons';

export const settings = defineType({
  name: 'settings',
  type: 'document',
  description: 'Global settings for the website',
  icon: CogIcon,
  groups: groups,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      validation: (rule) => rule.required(),
      group: group.content,
    }),
    ...seoFields,
    ...ogFields,
  ],
});
