'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { PageBuilderBlockType } from '@/types';
import { SanityImage } from '../sanity-image';
import { Section } from '../ui/section';
import { Container } from '../ui/container';

export function CloudBlock({ logos }: PageBuilderBlockType<'cloudBlock'>) {
  if (!logos?.length) return null;

  const tripled = [...logos, ...logos, ...logos];

  return (
    <Section>
      <Container>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-20 w-max"
            animate={{ x: ['0%', '-33.3333%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          >
            {tripled.map((logo, i) => {
              const sizeClass = i % 3 === 0 ? 'h-8' : i % 3 === 1 ? 'h-10' : 'h-12';
              return (
                <div
                  key={`${logo.image?.asset?._id}-${i}`}
                  className={cn('relative w-28 shrink-0 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500', sizeClass)}
                >
                  {logo && (
                    <SanityImage image={logo} fill className="object-contain" />
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
