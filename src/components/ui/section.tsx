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
      className={cn('w-full mx-auto py-12 md:py-16 lg:py-20', className)}
    >
      {children}
    </section>
  );
}
