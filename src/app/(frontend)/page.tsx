import { PageBuilder } from '@/components/pagebuilder';
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

  return {
    title,
    description: metadata?.seo?.description ?? settings?.seo?.description,
    openGraph: {
      title: metadata?.og?.title ?? settings?.og?.title,
      description: metadata?.og?.description ?? settings?.og?.description,
      images: [],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
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
