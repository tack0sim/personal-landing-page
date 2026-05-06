# Personal Landing Page

A content-driven personal landing page built with **Next.js 16**, **Sanity v5**, and **Tailwind CSS v4**. The Studio runs embedded at `/studio`, so content and code live in the same repository.

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| CMS | Sanity v5 + next-sanity (Live Content API) |
| Styling | Tailwind CSS v4 + Radix UI + CVA |
| Animation | Framer Motion |
| Linting / Formatting | Biome |
| Package Manager | pnpm ≥ 10 |

---

## Architecture

### Embedded Studio

The Sanity Studio is mounted inside the Next.js app at `/studio` via the App Router catch-all route `app/studio/[[...tool]]/`. No separate Studio deployment is needed — a single `pnpm dev` starts both the frontend and the Studio.

### Page Builder

Pages are assembled from an ordered array of content blocks managed in Sanity. Adding a new block follows a strict three-layer registration:

```
Schema definition   →   src/sanity/schemaTypes/blocks/{name}.ts
GROQ fragment       →   src/sanity/queries.ts   (composed into pageBuilderFragment)
React component     →   src/components/blocks/{name}.tsx
```

Each layer is independent and typed end-to-end via Sanity TypeGen, so schema changes flow automatically to TypeScript without manual type maintenance.

### End-to-End Type Safety

Running `pnpm typegen` extracts the Sanity schema and regenerates `sanity.types.ts`. Components consume generated types through the `PageBuilderBlockType<'blockName'>` utility, so component props are always in sync with the schema.

### Composable GROQ Queries

Queries are built from small, reusable fragments (`customImageFragment`, `buttonFragment`, `richTextFragment`, …) composed bottom-up into `pageBuilderFragment`. Only document-level queries use `defineQuery` — fragments remain plain template literals so they can be freely interpolated.

### Live Content

`sanityFetch` from `next-sanity/live` keeps page data automatically updated without polling. `<SanityLive />` is rendered once in the root layout, enabling instant preview and published-content streaming.

---

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing pages
│   └── studio/[[...tool]]/  # Embedded Sanity Studio
├── components/
│   ├── blocks/              # One file per page-builder block
│   ├── layout/              # Site-wide layout pieces (footer, …)
│   └── ui/                  # Headless primitives (Button, Badge, Section, Container)
├── sanity/
│   ├── schemaTypes/
│   │   ├── blocks/          # Block schemas
│   │   ├── documents/       # Document schemas (homepage, settings)
│   │   └── objects/         # Shared object types (image, button, link, …)
│   ├── queries.ts           # All GROQ fragments and document queries
│   └── lib/                 # Sanity client, image builder, live helper
└── types.ts                 # PageBuilderBlockType utility
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 10

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your Sanity credentials:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
```

### Development

```bash
pnpm install
pnpm dev          # Next.js frontend + embedded Studio at /studio
```

### Typegen

After any schema change, regenerate types:

```bash
pnpm typegen      # sanity schema extract && sanity typegen generate
```

### Linting & Formatting

```bash
pnpm lint         # biome check
pnpm format       # biome format --write
```

---

## Key Conventions

- **Block components** guard against missing required data with an early `return null`.
- **Every image** uses the `customImage` object type — never a raw Sanity image reference — to guarantee `alt`, `hotspot`, and `crop` are always present.
- **Animations** follow a shared Framer Motion `fadeUp` pattern (`opacity 0→1`, `y 30→0`, `viewport once`) for visual consistency across blocks.
- **`stegaClean()`** is applied when reading string values from Sanity to strip Visual Editing stega markers before rendering or comparison.
- **UI primitives** (`Button`, `Badge`) use Class Variance Authority for variant management rather than ad-hoc conditional classes.
