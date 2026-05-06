import { defineArrayMember, defineType } from 'sanity';
import { pageBuilderBlocks } from '../blocks';

export const pageBuilderBlockTypes = pageBuilderBlocks.map((block) => ({
  type: block.name,
}));

export const pageBuilder = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: pageBuilderBlockTypes.map((block) => defineArrayMember(block)),
  options: {
    insertMenu: {
      views: [
        {
          name: 'grid',
          previewImageUrl: (schemaTypeName) =>
            `/static/preview-${schemaTypeName}.png`,
        },
      ],
      groups: [
        {
          name: 'intro',
          of: ['heroBlock'],
        },
        {
          name: 'content',
          of: ['textBlock', 'collectionBlock', 'caseStudyBlock'],
        },
        {
          name: 'media',
          of: ['mediaBlock', 'mediaGridBlock', 'carouselBlock'],
        },
        {
          name: 'engagement',
          of: ['ctaBlock'],
        },
      ],
    },
  },
});
