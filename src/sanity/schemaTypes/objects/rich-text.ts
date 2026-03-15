import { defineType } from 'sanity';

export const richTextStyles = [
  { title: 'Normal', value: 'normal' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' },
  { title: 'H4', value: 'h4' },
  { title: 'Quote', value: 'blockquote' },
];

export const richTextLists = [
  { title: 'Bullet', value: 'bullet' },
  { title: 'Numbered', value: 'number' },
];

export const richTextMarks = [
  { title: 'Strong', value: 'strong' },
  { title: 'Emphasis', value: 'em' },
  { title: 'Underline', value: 'underline' },
];

export interface RichTextConfig {
  styles?: typeof richTextStyles;
  marks?: typeof richTextMarks;
  lists?: typeof richTextLists;
  includeLinks?: boolean;
  includeImages?: boolean;
}

const linkAnnotation = {
  name: 'link',
  type: 'link',
};

const imageObject = {
  type: 'customImage',
};

/**
 * Creates a rich-text block with configurable styles, marks, lists, and annotations.
 * @param config - Optional RichTextConfig to customize the block
 * @returns Block configuration object
 */
const createRichTextBlock = (config: RichTextConfig = {}) => {
  const {
    styles = richTextStyles,
    marks = richTextMarks,
    lists = richTextLists,
    includeLinks = true,
  } = config;

  const blockAnnotations = includeLinks ? [linkAnnotation] : [];

  return {
    type: 'block',
    styles,
    lists,
    marks: {
      decorators: marks,
      annotations: blockAnnotations,
    },
  };
};

/**
 * Default rich-text configuration with all features enabled.
 * Includes:
 * - Block styles (Normal, H2, H3, H4, Quote)
 * - Inline marks (Strong, Emphasis, Underline)
 * - Lists (Bullet, Numbered)
 * - Link annotations (supports internal and external links)
 * - Inline custom images
 *
 * Performance: Highly optimized with minimal overhead. Links and images
 * are stored inline with no additional data queries required.
 */
export const richText = defineType({
  name: 'richText',
  type: 'array',
  of: [createRichTextBlock(), imageObject],
});

/**
 * Core rich-text configuration without links or images.
 * Useful for simple text-only fields where link annotations are not needed.
 * Includes only: styles, marks, lists
 */
export const richTextCore = defineType({
  name: 'richTextCore',
  type: 'array',
  of: [createRichTextBlock({ includeLinks: false, includeImages: false })],
});

/**
 * Factory function to create custom rich-text configurations.
 * Allows fine-grained control over which features are enabled.
 *
 * Example:
 * const customRichText = createCustomRichText('myRichText', {
 *   styles: [richTextStyles[0], richTextStyles[1]],
 *   includeLinks: true,
 *   includeImages: false,
 * });
 *
 * @param name - The type name for the custom rich-text
 * @param config - Optional RichTextConfig for customization
 * @returns Configured rich-text type definition
 */
export const createCustomRichText = (name: string, config?: RichTextConfig) => {
  const imageObjectToInclude =
    config?.includeImages !== false ? [imageObject] : [];

  return defineType({
    name,
    type: 'array',
    of: [createRichTextBlock(config), ...imageObjectToInclude],
  });
};
