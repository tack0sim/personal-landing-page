import { cn } from '@/lib/utils';

export function Container({
  variant = 'default',
  children,
  className = '',
}: {
  variant?: 'default' | 'narrow' | 'wide';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto px-4 md:px-6 lg:px-8',
        {
          'w-full max-w-7xl': variant === 'default',
          'w-full max-w-3xl': variant === 'narrow',
          'w-full max-w-9xl': variant === 'wide',
        },
        className,
      )}
    >
      {children}
    </div>
  );
}
