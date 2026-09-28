'use client';

import { useIsPresentationTool } from 'next-sanity/hooks';
import { Button } from '@/components/ui/button';

export function DraftModeBanner() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-border bg-background px-5 py-2 shadow-lg">
      <span className="text-muted-foreground text-sm">Draft mode active</span>
      <Button asChild size="sm" variant="outline">
        <a href="/api/draft-mode/disable">Disable</a>
      </Button>
    </div>
  );
}
