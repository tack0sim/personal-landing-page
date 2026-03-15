import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url';
import { getImageDimensions } from '@sanity/asset-utils';
import type { SanityImageType } from '../../types';
import { dataset, projectId } from '../env';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

export function resolveImageDimensions(
  image: SanityImageType,
): { width: number; height: number } | null {
  const img = image?.image;
  if (!img?.asset) return null;

  const { width, height } = getImageDimensions(img.asset);
  const { crop } = img;
  if (!crop) return { width, height };

  return {
    width: Math.round(width * (1 - (crop.left ?? 0) - (crop.right ?? 0))),
    height: Math.round(height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0))),
  };
}

export function resolveHotspot(image: SanityImageType): string | undefined {
  const { x, y } = image?.image?.hotspot ?? {};
  if (x == null || y == null) return undefined;
  return `${x * 100}% ${y * 100}%`;
}
