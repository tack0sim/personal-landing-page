'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import type { NAVBAR_QUERY_RESULT } from '../../../sanity.types';
import { Container } from '../ui/container';

interface Props {
  navbar: NAVBAR_QUERY_RESULT;
  siteTitle: string;
}

export function MobileHeader({ navbar, siteTitle }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="md:hidden bg-background sticky top-0 z-50 shadow-sm border-b border-border min-h-20">
      <Container className="py-5">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={() => window.scrollTo({ top: 0 })}>
            <h2 className="text-xl font-bold text-accent-primary">
              {siteTitle}
            </h2>
          </Link>

          {/* Hamburger Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 p-2 aria-expanded:bg-background"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            variant="ghost"
          >
            <span
              className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-foreground transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 space-y-3 border-t border-border pt-4">
            <ul className="space-y-3">
              {navbar?.links?.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.link?.href ?? '#'}
                    target={link.link?.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block text-sm font-medium hover:text-accent-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {navbar?.button && navbar.button.length > 0 && (
              <div className="space-y-2 pt-3">
                {navbar.button.map((btn) => (
                  <Link
                    key={btn.label}
                    href={btn.link?.href ?? '#'}
                    target={btn.link?.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="accent" className="w-full">
                      {btn.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </nav>
        )}
      </Container>
    </header>
  );
}
