import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { SanityLive } from '@/sanity/lib/live';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-dvh">{children}</div>
        <SanityLive />
      </body>
    </html>
  );
}
