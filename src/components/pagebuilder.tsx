import type { ComponentType } from 'react';
import type { PageBuilderBlocks } from '@/types';
import { HeroBlock } from './blocks/hero-block';
import { CloudBlock } from './blocks/cloud-block';
import { CtaBlock } from './blocks/cta-block';
import { MediaGridBlock } from './blocks/media-grid-block';
import { CaseStudyBlock } from './blocks/case-study-block';

type BlockEntry = NonNullable<PageBuilderBlocks>[number];

type BlockComponentMap = {
  [K in BlockEntry['_type']]: ComponentType<
    Extract<BlockEntry, { _type: K }> & { 'data-slot': string }
  >;
};

interface PageBuilderProps {
  blocks: PageBuilderBlocks;
}

// Register block components here as they are implemented
const BLOCK_COMPONENTS: Partial<BlockComponentMap> = {
  heroBlock: HeroBlock,
  ctaBlock: CtaBlock,
  cloudBlock: CloudBlock,
  mediaGridBlock: MediaGridBlock,
  caseStudyBlock: CaseStudyBlock,
};

function renderBlock(block: BlockEntry, map: Partial<BlockComponentMap>) {
  const Component = map[block._type] as ComponentType<typeof block> | undefined;
  if (!Component) return null;
  return (
    <div data-slot={block._type} key={block._key}>
      <Component {...block} />
    </div>
  );
}

export function PageBuilder({ blocks }: PageBuilderProps) {
  if (!blocks) return null;
  return <>{blocks.map((block) => renderBlock(block, BLOCK_COMPONENTS))}</>;
}
