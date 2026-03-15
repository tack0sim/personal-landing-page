import { PageBuilder } from '@/components/pagebuilder';
import { resolveImageDimensions, urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { HOMEPAGE_QUERY, SETTINGS_QUERY } from '@/sanity/queries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const { data: metadata } = await sanityFetch({
    query: HOMEPAGE_QUERY,
    stega: false,
  });

  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
    stega: false,
  });

  if (!metadata || !settings) return {};

  const title = metadata?.title
    ? `${metadata.title} | ${settings.siteTitle}`
    : settings?.siteTitle;

  const imageUrl = metadata?.og?.image && urlFor(metadata.og.image).url();
  const dimensions =
    metadata?.og?.image?.image && resolveImageDimensions(metadata?.og?.image);

  return {
    title,
    description: metadata?.seo?.description ?? settings?.seo?.description,
    openGraph: {
      title: metadata?.og?.title ?? settings?.og?.title,
      description: metadata?.og?.description ?? settings?.og?.description,
      images: [
        {
          url: imageUrl as string,
          alt: metadata?.og?.image?.alt as string,
          width: dimensions?.width,
          height: dimensions?.height,
        },
      ],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
    },
    robots: {
      index: metadata?.seo?.noIndex ? false : true,
      follow: metadata?.seo?.noIndex ? false : true,
    },
  };
}

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: HOMEPAGE_QUERY,
  });

  if (!data) return notFound();

  return <PageBuilder blocks={data.pageBuilder} />;
}
