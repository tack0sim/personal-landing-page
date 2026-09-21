import {
  defineBlueprint,
  defineSyncTagInvalidateFunction,
} from '@sanity/blueprints';

export default defineBlueprint({
  resources: [
    defineSyncTagInvalidateFunction({
      name: 'invalidate-tags',
      event: {
        resource: {
          type: 'dataset',
          id: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        },
      },
      env: {
        SANITY_FUNCTION_API_URL:
          process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        SANITY_FUNCTION_API_SECRET: process.env.SANITY_FUNCTION_API_SECRET!,
      },
    }),
  ],
});
