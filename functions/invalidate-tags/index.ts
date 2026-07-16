import { syncTagInvalidateEventHandler } from '@sanity/functions';

export const handler = syncTagInvalidateEventHandler(
  async ({ context, event, done }) => {
    const time = new Date().toLocaleTimeString();
    console.log(
      `Your sync tag invalidate Sanity Function was called at ${time}`
    );
    // TODO: add code to do something with the invalidated sync tags provided to you in `event.data.syncTags`
    try {
      const apiUrl = process.env.SANITY_FUNCTION_API_URL;

      if (!apiUrl) {
        throw new Error('SANITY_FUNCTION_API_URL environment variable not set');
      }

      const response = await fetch(`${apiUrl}/api/expire-tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth header if needed
          ...(process.env.SANITY_FUNCTION_API_SECRET && {
            Authorization: `Bearer ${process.env.SANITY_FUNCTION_API_SECRET}`,
          }),
        },
        body: JSON.stringify({
          tags: event.data.syncTags,
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      // notify Sanity that you have completed invalidation
      await done(event.data.syncTags);
      console.log(
        'Invalidation complete, Sanity responded with an HTTP',
        response.status
      );
    } catch (e) {
      console.error('Error invoking Sanity invalidation done endpoint!', e);
      throw e;
    }
  }
);
