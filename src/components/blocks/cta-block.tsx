import { PageBuilderBlockType } from '@/types';
import { stegaClean } from 'next-sanity';
import { Section } from '../ui/section';
import { Container } from '../ui/container';

export function CtaBlock({
  eyebrow,
  title,
  subtitle,
  image,
  buttons,
  alignment,
}: PageBuilderBlockType<'ctaBlock'>) {
  const alignmentClean = stegaClean(alignment);

  const isLeftAligned = alignmentClean === 'left';
  const isCenterAligned = alignmentClean === 'center';
  const isRightAligned = alignmentClean === 'right';

  return (
    <Section>
      <Container></Container>
    </Section>
  );
}
