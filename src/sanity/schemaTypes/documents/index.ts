import type { SchemaTypeDefinition } from 'sanity';
import { homepage } from './homepage';
import { settings } from './settings';

export const documents: SchemaTypeDefinition[] = [
  homepage, settings,
];
