import type { SchemaTypeDefinition } from 'sanity';
import { homepage } from './homepage';
import { settings } from './settings';
import { navbar } from './navbar';

export const documents: SchemaTypeDefinition[] = [homepage, settings, navbar];
