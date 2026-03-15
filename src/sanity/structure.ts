import {
  CogIcon,
  HomeIcon,
} from '@sanity/icons';
import type { ComponentType } from 'react';
import type { StructureBuilder, StructureResolver } from 'sanity/structure';

const createSingleton = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: ComponentType,
) => {
  return S.listItem()
    .id(type)
    .schemaType(type)
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));
};

// const createListItem = (
//   S: StructureBuilder,
//   type: string,
//   title: string,
//   icon?: ComponentType,
// ) => {
//   return S.listItem()
//     .id(type)
//     .schemaType(type)
//     .title(title)
//     .icon(icon)
//     .child(S.documentTypeList(type).title(title));
// };

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      createSingleton(S, 'homepage', 'Homepage', HomeIcon),
      // S.divider(),
        // createListItem(S, 'page', 'Pages', DocumentsIcon),
        // createListItem(S, 'artwork', 'Artworks', ImagesIcon),
        // createListItem(S, 'post', 'Posts', EditIcon),
      // S.divider(),
      // createListItem(S, 'category', 'Categories', BookmarkIcon),
      // createListItem(S, 'tag', 'Tags', TagsIcon),
      S.divider(),
      // TODO: check why the section is not showing the separate title and icon like the "Content" section above
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Site Settings')
            .items([
              createSingleton(S, 'settings', 'Global Settings', CogIcon),
            ]),
        ),
    ]);
