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
    }),
  ],
});
