import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { Footer } from '@/components/layout/footer';
import { SETTINGS_QUERY } from '@/sanity/queries';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({
    query: SETTINGS_QUERY,
  });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-dvh">{children}</div>
        <Footer siteTitle={settings?.siteTitle ?? ''} />
        <SanityLive />
      </body>
    </html>
  );
}
