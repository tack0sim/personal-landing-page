import Link from 'next/link';

export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="bg-border/10 py-8 text-center text-muted-foreground text-sm">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-medium text-foreground">{siteTitle}</span> — made
        with 💜
      </p>
      <span>
        View this webapp on{' '}
        <Link
          className="cursor-pointer underline decoration-dotted"
          href="https://github.com/tack0sim/personal-landing-page"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </Link>
      </span>
    </footer>
  );
}
