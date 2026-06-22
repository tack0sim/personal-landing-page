import { cn } from '@/lib/utils';

export function Section({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn('w-full mx-auto py-24 md:py-28 lg:py-32', className)}
    >
      {children}
    </section>
  );
}
