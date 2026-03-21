'use client';

import { motion } from 'framer-motion';
import type { PageBuilderBlockType } from '@/types';
import { SanityImage } from '../sanity-image';
import { Section } from '../ui/section';
import { Container } from '../ui/container';

export function CloudBlock({ logos }: PageBuilderBlockType<'cloudBlock'>) {
  if (!logos?.length) return null;

  const doubled = [...logos, ...logos];

  return (
    <Section>
      <Container>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-16 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          >
            {doubled.map((logo, i) => (
              <div
                key={`${logo.image?.asset?._id}-${i}`}
                className="relative h-10 w-28 shrink-0 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <SanityImage image={logo} fill className="object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
