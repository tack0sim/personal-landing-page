"use client";

import Link from 'next/link';
import { Button } from '../ui/button';
import type { NAVBAR_QUERY_RESULT } from '../../../sanity.types';
import { Container } from '../ui/container';

interface Props {
  navbar: NAVBAR_QUERY_RESULT;
  siteTitle: string;
}

export function Header({ navbar, siteTitle }: Props) {
  return (
    <header className="hidden md:block bg-background sticky top-0 z-50 shadow-sm border-b border-border">
      <Container className="py-6">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => window.scrollTo({ top: 0 })} className="scroll-auto">
            <h2 className="text-2xl font-bold">{siteTitle}</h2>
          </Link>
          <nav>
            <ul className="flex gap-4">
              {navbar?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.link?.href ?? '#'}
                    target={link.link?.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {navbar?.button?.map((btn) => (
            <Link
              key={btn.label}
              href={btn.link?.href ?? '#'}
              target={btn.link?.openInNewTab ? '_blank' : '_self'}
              rel="noopener noreferrer"
            >
              <Button variant="accent">{btn.label}</Button>
            </Link>
          ))}
        </div>
      </Container>
    </header>
  );
}
