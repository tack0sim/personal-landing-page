import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { Footer } from '@/components/layout/footer';
import { NAVBAR_QUERY, SETTINGS_QUERY } from '@/sanity/queries';
import { Header } from '@/components/layout/header';
import { MobileHeader } from '@/components/layout/mobile-header';
import { Toaster } from 'sonner';
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity/visual-editing';
import { DraftModeBanner } from '@/components/layout/draft-mode-banner';

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
  const isProduction = process.env.VERCEL_ENV === 'production';
  const isDraftMode = (await draftMode()).isEnabled;
  const [{ data: settings }, { data: navbar }] = await Promise.all([
    sanityFetch({
      query: SETTINGS_QUERY,
    }),
    sanityFetch({
      query: NAVBAR_QUERY,
    }),
  ]);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-dvh flex-col">
          <Header navbar={navbar} siteTitle={settings?.siteTitle ?? ''} />
          <MobileHeader navbar={navbar} siteTitle={settings?.siteTitle ?? ''} />
          <main className="flex grow flex-col">{children}</main>
          <Toaster position="bottom-center" />
          <Footer siteTitle={settings?.siteTitle ?? ''} />
          <SanityLive waitFor={isProduction ? 'function' : undefined} />
          {isDraftMode && (
            <>
              <VisualEditing />
              <DraftModeBanner />
            </>
          )}
        </div>
      </body>
    </html>
  );
}
