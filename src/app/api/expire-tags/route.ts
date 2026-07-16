// src/app/api/expire-tags/route.ts
import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

// Validate the request is from Sanity
function validateRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.SANITY_FUNCTION_API_SECRET;

  if (!expectedToken) {
    console.warn('SANITY_FUNCTION_API_SECRET not configured');
    return false;
  }

  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.slice(7); // Remove "Bearer " prefix
  return token === expectedToken;
}

export async function POST(request: NextRequest) {
  // Validate the request is from Sanity
  if (!validateRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const tags = Array.isArray(body.tags) ? body.tags : [];

    if (tags.length === 0) {
      return NextResponse.json({ error: 'No tags provided' }, { status: 400 });
    }

    // Revalidate each tag with "max" to prevent cascading requests
    tags.forEach((tag: string) => {
      revalidateTag(tag, 'max');
    });

    console.log(`✓ Revalidated tags: ${tags.join(', ')}`);

    return NextResponse.json({
      success: true,
      revalidatedTags: tags,
    });
  } catch (error) {
    console.error('Error in expire-tags handler:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
