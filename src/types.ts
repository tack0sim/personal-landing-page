import type {
  HOMEPAGE_QUERY_RESULT,
  SANITY_IMAGE_TYPE_QUERY_RESULT,
} from '../sanity.types';

export type PageBuilderBlocks =
  NonNullable<HOMEPAGE_QUERY_RESULT>['pageBuilder'];

export type PageBuilderBlockTypes =
  NonNullable<PageBuilderBlocks>[number]['_type'];

export type PageBuilderBlockType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<PageBuilderBlocks>[number],
  { _type: T }
>;

export type SanityImageType = NonNullable<SANITY_IMAGE_TYPE_QUERY_RESULT>;
