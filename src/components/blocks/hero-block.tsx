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
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Text Content */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="order-2 space-y-12 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="space-y-6">
              {eyebrow && (
                <p className="font-medium text-muted-foreground text-sm">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h1 className="text-balance font-light text-4xl leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              )}
            </div>

            {subtitle && (
              <p className="max-w-md text-lg text-muted-foreground leading-[1.8]">
                {subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {buttons?.map((button) => {
                const buttonSize =
                  button.size === 'large'
                    ? 'lg'
                    : button.size === 'medium'
                      ? 'sm'
                      : 'xs';

                const buttonVariant =
                  button.style === 'primary'
                    ? 'accent'
                    : button.style === 'outline'
                      ? 'outline'
                      : button.style === 'secondary'
                        ? 'secondary'
                        : button.style === 'ghost'
                          ? 'ghost'
                          : 'link';
                return (
                  <Link
                    className="flex items-center justify-center gap-2"
                    href={button.link?.href ?? '#'}
                    key={button.label}
                    rel="noopener noreferrer"
                    target={button.link?.openInNewTab ? '_blank' : '_self'}
                  >
                    <Button
                      className="gap-2"
                      size={buttonSize}
                      variant={buttonVariant}
                    >
                      {button.label === 'LinkedIn' ? (
                        <LinkedinIcon className="h-4 w-4" />
                      ) : button.label === 'GitHub' ? (
                        <Github className="h-4 w-4" />
                      ) : null}
                      {button.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative h-80 w-64 overflow-hidden rounded-lg bg-muted md:h-96 md:w-80">
              {image && <SanityImage image={image} />}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
