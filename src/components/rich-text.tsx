import { PortableText, type PortableTextComponents } from 'next-sanity';
import type { RichTextCore } from '../../sanity.types';
import { cn } from '@/lib/utils';

const components: PortableTextComponents = {
  marks: {
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
};

interface RichTextProps {
  value: RichTextCore;
  className?: string;
}

export function RichText({ value, className }: RichTextProps) {
  if (!value?.length) return null;

  return (
    <div className={cn('prose dark:prose-invert', className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
