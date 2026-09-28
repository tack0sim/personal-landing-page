import {
  defineDocuments,
  defineLocations,
  type DocumentLocationResolvers,
  type PresentationPluginOptions,
} from 'sanity/presentation';

const mainDocuments = defineDocuments([
  {
    route: '/',
    type: 'homepage',
  },
]);

const locations: DocumentLocationResolvers = {
  homepage: defineLocations({
    select: { title: 'title' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title ?? 'Homepage',
          href: '/',
        },
      ],
    }),
  }),
  navbar: defineLocations({
    message: 'This document is used on all pages',
    tone: 'caution',
  }),
  settings: defineLocations({
    message: 'This document is used on all pages',
    tone: 'caution',
  }),
};

export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments,
  locations,
};
