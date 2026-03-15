export function Footer({ siteTitle }: { siteTitle: string }) {
  return (
    <footer className="py-8 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-medium text-foreground">{siteTitle}</span> — made
        with 💜
      </p>
    </footer>
  );
}
