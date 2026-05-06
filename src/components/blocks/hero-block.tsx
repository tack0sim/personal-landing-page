'use client';

import type { PageBuilderBlockType } from '@/types';
import { Github } from 'lucide-react';
import { LinkedinIcon } from '@sanity/icons';
import { SanityImage } from '../sanity-image';
import { Section } from '../ui/section';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '../ui/container';

export function HeroBlock({
  eyebrow,
  title,
  subtitle,
  image,
  buttons,
}: PageBuilderBlockType<'heroBlock'>) {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            className="order-2 lg:order-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="space-y-4">
              {eyebrow && (
                <p className="text-muted-foreground text-sm tracking-wide uppercase">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance">
                  {title}
                </h1>
              )}
            </div>

            {subtitle && (
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {buttons?.map((button) => (
                <Button
                  key={button.label}
                  size={
                    button.size === 'large'
                      ? 'lg'
                      : button.size === 'medium'
                        ? 'sm'
                        : 'xs'
                  }
                  variant={
                    button.style === 'primary'
                      ? 'default'
                      : button.style === 'outline'
                        ? 'outline'
                        : button.style === 'secondary'
                          ? 'secondary'
                          : button.style === 'ghost'
                            ? 'ghost'
                            : 'link'
                  }
                  className="gap-2"
                >
                  <Link
                    href={button.link?.href ?? '#'}
                    target={button.link?.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex justify-center items-center gap-2"
                  >
                    {button.label === 'LinkedIn' ? (
                      <LinkedinIcon className="w-4 h-4" />
                    ) : button.label === 'GitHub' ? (
                      <Github className="w-4 h-4" />
                    ) : null}
                    {button.label}
                  </Link>
                </Button>
              ))}

              <Button variant="ghost" size="lg" asChild>
                <a href="mailto:talhamjd@gmail.com">Get in Touch</a>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-lg overflow-hidden bg-muted">
              {image && <SanityImage image={image} />}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
