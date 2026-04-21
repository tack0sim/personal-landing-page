'use client';

import { cn } from '@/lib/utils';
import type { PageBuilderBlockType } from '@/types';
import { motion } from 'framer-motion';
import { stegaClean } from 'next-sanity';
import { RichText } from '../rich-text';
import { SanityImage } from '../sanity-image';
import { Container } from '../ui/container';
import { Section } from '../ui/section';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
};

export function CtaBlock({
  eyebrow,
  title,
  subtitle,
  richTextCore,
  image,
  alignment,
}: PageBuilderBlockType<'ctaBlock'>) {
  const alignmentClean = stegaClean(alignment);
  const isCenterAligned = alignmentClean === 'center';
  const isRightAligned = alignmentClean === 'right';

  const textContent = (
    <>
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
      {richTextCore && (
        <RichText value={richTextCore} className="text-muted-foreground" />
      )}
    </>
  );

  const imageContent = image && (
    <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-muted">
      <SanityImage image={image} />
    </div>
  );

  if (isCenterAligned) {
    return (
      <Section>
        <Container>
          <div className="flex flex-col items-center gap-10">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center text-center space-y-6 max-w-2xl w-full"
            >
              {textContent}
            </motion.div>

            {imageContent && (
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="w-full max-w-2xl"
              >
                {imageContent}
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            {...fadeUp}
            transition={{
              duration: 0.6,
              delay: isRightAligned ? 0.15 : 0,
              ease: 'easeOut',
            }}
            className={cn(
              'space-y-6',
              isRightAligned
                ? 'lg:col-span-5 lg:col-start-8 order-2'
                : 'lg:col-span-5 lg:col-start-1 order-2 lg:order-1',
            )}
          >
            {textContent}
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{
              duration: 0.6,
              delay: isRightAligned ? 0 : 0.15,
              ease: 'easeOut',
            }}
            className={cn(
              isRightAligned
                ? 'lg:col-span-6 lg:col-start-1 order-1'
                : 'lg:col-span-6 lg:col-start-7 order-1 lg:order-2',
            )}
          >
            {imageContent}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
