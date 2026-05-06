import { defineQuery } from 'next-sanity';

// ─── Primitive Fragments ──────────────────────────────────────────────────────
//
// Fragments are plain /* groq */ strings composed via template interpolation.
// Only document-level queries use `defineQuery` (for TypeGen support).
// Fragments are exported so consumers can compose custom queries.

/**
 * Body projection for the `customImage` object type.
 *
 * Usage:
 *   someCustomImageField {
 *     ${customImageFragment}
 *   }
 *
 * Pass `value.image` (the native Sanity image) to `urlFor()`. Both `hotspot`
 * and `crop` must be present so `urlFor(value.image).fit('crop')` respects
 * the editor's focal point. `lqip` is not automatic — it must be explicitly
 * fetched to use as `blurDataURL` in `next/image`.
 */
export const customImageFragment = /* groq */ `
  image {
    asset->{
      _id,
      url,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    },
    hotspot,
    crop
  },
  alt
`;

/**
 * Body projection for the `link` object type.
 *
 * Resolves `internal` page references to their slug at query time and
 * normalises both variants into a single `href` string. Components always
 * receive a plain `href` — no branching needed at render time.
 */
export const linkFragment = /* groq */ `
  type,
  "href": select(
    type == "internal" => "/" + internal->slug.current,
    type == "external" => external,
    "#"
  ),
  openInNewTab
`;

/**
 * Body projection for the `button` object type.
 * Composes `linkFragment` so the button destination is always a normalised href.
 */
export const buttonFragment = /* groq */ `
  label,
  link {
    ${linkFragment}
  },
  style,
  size
`;

/**
 * Body projection for items in a `richText` (portable text) array.
 * This type allows inline `customImage` objects and `link` annotations.
 *
 * Usage:
 *   richTextWithImage[] {
 *     ${richTextFragment}
 *   }
 */
export const richTextFragment = /* groq */ `
  ...,
  _type == "customImage" => {
    ${customImageFragment}
  },
  markDefs[] {
    ...,
    _type == "link" => {
      ${linkFragment}
    }
  }
`;

/**
 * Body projection for items in a `richTextCore` array.
 * This type has no inline images or link annotations — plain blocks only.
 * The spread is a pass-through; selecting the field directly is equivalent,
 * but using this fragment keeps rich-text usages consistent.
 */
export const richTextCoreFragment = /* groq */ `
  ...
`;

// ─── Metadata Fragment ───────────────────────────────────────────────────────

/**
 * Combined SEO + OG projection. `seo.title` is always non-null via
 * `coalesce()`. OG fields fall back through SEO fields → document title.
 * Documents without `ogFields` (post, category, tag) will return null for
 * `og.image` and empty strings for `og.title` / `og.description` — safe to
 * use uniformly across all document types.
 */
export const metadataFragment = /* groq */ `
  "seo": {
    "title": coalesce(seoTitle, title, ""),
    "description": coalesce(seoDescription, ""),
    "noIndex": noIndex == true
  },
  "og": {
    "title": coalesce(ogTitle, seoTitle, title, ""),
    "description": coalesce(ogDescription, seoDescription, ""),
    "image": ogImage {
      ${customImageFragment}
    }
  }
`;

// ─── Block Fragments (module-local) ───────────────────────────────────────────
//
// These are only ever consumed by `pageBuilderFragment` below and are not
// exported — they have no meaningful standalone use outside pageBuilder.

const heroBlockFragment = /* groq */ `
  _type == "heroBlock" => {
    eyebrow,
    title,
    subtitle,
    image {
      ${customImageFragment}
    },
    buttons[] {
      ${buttonFragment}
    }
  }
`;

const mediaBlockFragment = /* groq */ `
  _type == "mediaBlock" => {
    eyebrow,
    image {
      ${customImageFragment}
    },
    richTextWithImage[] {
      ${richTextFragment}
    },
    buttons[] {
      ${buttonFragment}
    },
    alignment
  }
`;

const mediaGridBlockFragment = /* groq */ `
  _type == "mediaGridBlock" => {
    eyebrow,
    title,
    subtitle,
    mediaItems {
      images[] {
        image {
          ${customImageFragment}
        },
        link {
          ${linkFragment}
        },
        badgeText,
        badgeVariant
      }
    },
    columns
  }
`;

const ctaBlockFragment = /* groq */ `
  _type == "ctaBlock" => {
    eyebrow,
    title,
    subtitle,
    richTextCore[] {
      ${richTextCoreFragment}
    },
    image {
      ${customImageFragment}
    },
    buttons[] {
      ${buttonFragment}
    },
    alignment
  }
`;

const cloudBlockFragment = /* groq */ `
  _type == "cloudBlock" => {
    logos[] {
      ${customImageFragment}
    }
  }
`;

const caseStudyBlockFragment = /* groq */ `
  _type == "caseStudyBlock" => {
    title,
    subtitle,
    projects[] {
      _key,
      title,
      challenge,
      decisions,
      technologies[] {
        _key,
        name,
        icon {
          ${customImageFragment}
        }
      },
      image {
        ${customImageFragment}
      },
      link {
        ${linkFragment}
      }
    }
  }
`;

// ─── Page Builder Fragment ────────────────────────────────────────────────────

/**
 * Full pageBuilder array expansion covering all 7 block types.
 * `_type` and `_key` are always included — renderers switch on `_type` and
 * React uses `_key` for list reconciliation.
 *
 * Usage:
 *   *[_type == "page"][0] {
 *     title,
 *     ${pageBuilderFragment},
 *   }
 */
export const pageBuilderFragment = /* groq */ `
  "pageBuilder": pageBuilder[] {
    _type,
    _key,
    ${heroBlockFragment},
    ${mediaBlockFragment},
    ${mediaGridBlockFragment},
    ${ctaBlockFragment},
    ${cloudBlockFragment},
    ${caseStudyBlockFragment}
  }
`;

// ─── Document Queries ─────────────────────────────────────────────────────────

export const HOMEPAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "homepage"][0] {
    _id,
    title,
    ${pageBuilderFragment},
    ${metadataFragment}
  }
`);

// ─── Settings ─────────────────────────────────────────────────────────────────

export const SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "settings"][0] {
    _id,
    siteTitle,
    ${metadataFragment}
  }
`);

// ─── Sanity Image Query (module-local) ─────────────────────────────────
export const SANITY_IMAGE_TYPE_QUERY = defineQuery(/* groq */ `
  *[_type == "homepage"][0] {
      pageBuilder[] {
        _type == "heroBlock" => {
          image {
            ${customImageFragment}
          },
        },
      },
    }.pageBuilder[0].image
`);
