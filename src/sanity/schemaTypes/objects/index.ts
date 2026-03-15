import type { SchemaTypeDefinition } from 'sanity';
import { pageBuilder } from './pagebuilder';
import { link } from './link';
import { button } from './button';
import { richText, richTextCore } from './rich-text';
import { customImage } from './custom-image';

export const definitions: SchemaTypeDefinition[] = [
  pageBuilder,
  link,
  button,
  richText,
  richTextCore,
  customImage,
];
