'use client';

import { cn } from '@/lib/utils';
import type { PageBuilderBlockType } from '@/types';
import { motion, number } from 'framer-motion';
import { stegaClean } from 'next-sanity';
import { SanityImage } from '../sanity-image';
import { Container } from '../ui/container';
import { Section } from '../ui/section';
import Link from 'next/link';
import { Badge } from '../ui/badge';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export function MediaGridBlock({
  eyebrow,
  title,
  subtitle,
  mediaItems,
  columns,
}: PageBuilderBlockType<'mediaGridBlock'>) {
  if (!mediaItems?.images?.length) return null;

  const colCount = stegaClean(columns) ?? 2;
  const gridClass = COLUMN_CLASSES[colCount as 2 | 3 | 4] ?? COLUMN_CLASSES[2];

  const hasHeader = eyebrow || title || subtitle;

  return (
    <Section>
      <Container>
        <div className="space-y-10">
          {hasHeader && (
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-4 max-w-2xl"
            >
              {eyebrow && (
                <p className="text-muted-foreground text-sm tracking-wide uppercase">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </motion.div>
          )}

          <div className={cn('grid grid-cols-1 gap-4', gridClass)}>
            {mediaItems?.images?.map((item, i) => (
              <motion.div
                key={item.image?.image?.asset?._id || i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
                className="relative aspect-square rounded-lg overflow-hidden bg-muted shadow-lg border border-border/50"
              >
                {item.link?.href ? (
                  <Link
                    href={item.link.href}
                    target={item.link.openInNewTab ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                  >
                    {item.image?.image && (
                      <>
                        <SanityImage
                          image={item.image}
                          fill
                          className="object-cover"
                        />
                        {item.badgeText && (
                          <Badge
                            variant={item.badgeVariant}
                            className="absolute bottom-4 left-4 font-medium"
                          >
                            {item.badgeText}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                ) : (
                  item.image?.image && (
                    <>
                      <SanityImage
                        image={item.image}
                        fill
                        className="object-cover"
                      />
                      {item.badgeText && (
                        <Badge
                          variant={item.badgeVariant}
                          className="absolute bottom-4 left-4 font-medium"
                        >
                          {item.badgeText}
                        </Badge>
                      )}
                    </>
                  )
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
