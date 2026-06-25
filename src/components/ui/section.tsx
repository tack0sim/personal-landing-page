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
      className={cn('w-full mx-auto py-16 md:py-18 lg:py-20', className)}
    >
      {children}
    </section>
  );
}
