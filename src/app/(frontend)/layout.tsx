import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { sanityFetch } from '@/sanity/lib/live';
import { Footer } from '@/components/layout/footer';
import { NAVBAR_QUERY, SETTINGS_QUERY } from '@/sanity/queries';
import { Header } from '@/components/layout/header';
import { MobileHeader } from '@/components/layout/mobile-header';
import { Toaster } from 'sonner';

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
        </div>
      </body>
    </html>
  );
}
