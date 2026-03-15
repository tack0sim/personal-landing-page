import type { SchemaTypeDefinition } from 'sanity';
import { documents } from './documents';
import { definitions } from './objects';
import { pageBuilderBlocks } from './blocks';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...documents, ...definitions, ...pageBuilderBlocks],
};
