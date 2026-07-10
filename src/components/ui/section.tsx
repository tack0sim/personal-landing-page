import { cn } from '@/lib/utils';

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mx-auto w-full py-12 lg:py-20', className)} id={id}>
      {children}
    </section>
  );
}
