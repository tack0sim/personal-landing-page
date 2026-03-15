import Image, { type ImageProps } from 'next/image';
import type { SanityImageSource } from '@sanity/image-url';
import type { SanityImageType } from '../types';
import {
  urlFor,
  resolveImageDimensions,
  resolveHotspot,
} from '../sanity/lib/image';

type ManagedKeys =
  | 'src'
  | 'alt'
  | 'width'
  | 'height'
  | 'fill'
  | 'placeholder'
  | 'blurDataURL';
type BaseProps = { image: SanityImageType; alt?: string | null } & Omit<
  ImageProps,
  ManagedKeys
>;

export type SanityImageProps =
  | (BaseProps & { fill: true; width?: never; height?: never })
  | (BaseProps & { fill?: false; width?: number; height?: number });

export function SanityImage({
  image,
  alt,
  fill,
  width,
  height,
  quality = 75,
  style,
  className,
  ...rest
}: SanityImageProps): React.ReactElement | null {
  const img = image.image;
  const asset = img?.asset;
  if (!img || !asset) return null;

  const blurProps = asset.metadata?.lqip
    ? { placeholder: 'blur' as const, blurDataURL: asset.metadata.lqip }
    : {};
  const objectPosition = resolveHotspot(image);
  const altText = image.alt ?? alt ?? '';
  const urlBuilder = urlFor(img as SanityImageSource).auto('format');

  if (fill) {
    return (
      <Image
        src={urlBuilder.url()}
        alt={altText}
        fill
        style={{ objectPosition, ...style }}
        className={className}
        {...blurProps}
        {...rest}
      />
    );
  }

  const dimensions = resolveImageDimensions(image);

  const url = urlFor(img)
    .size(
      Number(width ?? dimensions?.width),
      Number(height ?? dimensions?.height),
    )
    .auto('format')
    .dpr(2)
    .quality(Number(quality))
    .url();

  return (
    <Image
      src={url}
      alt={alt ?? altText}
      width={width ?? dimensions?.width}
      height={height ?? dimensions?.height}
      quality={quality}
      style={{ objectPosition, ...style }}
      {...blurProps}
      {...rest}
    />
  );
}
