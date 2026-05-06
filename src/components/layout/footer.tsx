import Link from 'next/link';

export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-medium text-foreground">{siteTitle}</span> — made
        with 💜
      </p>
      <span>
        View this webapp on{' '}
        <Link
          href="https://github.com/tack0sim/personal-landing-page"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-dotted cursor-pointer"
        >
          GitHub
        </Link>
      </span>
    </footer>
  );
}
