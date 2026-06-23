import type { SchemaTypeDefinition } from 'sanity';
import { pageBuilder } from './pagebuilder';
import { link } from './link';
import { button } from './button';
import { richText, richTextCore } from './rich-text';
import { customImage } from './custom-image';
import { linkLabel } from './link-label';

export const definitions: SchemaTypeDefinition[] = [
  pageBuilder,
  link,
  linkLabel,
  button,
  richText,
  richTextCore,
  customImage,
];
