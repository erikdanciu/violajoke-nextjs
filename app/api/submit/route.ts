import { db } from '@/lib/jokes-db';
import { validateSubmission, RateLimiter, getClientIP } from '@/lib/submissions';
import { NextRequest, NextResponse } from 'next/server';

const limiter = new RateLimiter(
  parseInt(process.env.SUBMISSION_RATE_LIMIT || '5', 10),
  3600000 // 1 hour
);

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);

    // Rate limiting
    if (!limiter.isAllowed(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validation
    const validation = validateSubmission(body);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Add joke (unapproved)
    const joke = await db.addJoke({
      content: body.content,
      author: body.author || 'Anonymous',
      tags: body.tags || [],
      approved: false,
    });

    return NextResponse.json(
      { success: true, message: 'Joke submitted for review' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
