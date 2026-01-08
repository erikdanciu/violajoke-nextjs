import { db } from '@/lib/jokes-db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q') || '';

    if (!q || q.length < 2) {
      return NextResponse.json([]);
    }

    const jokes = await db.searchJokes(q);
    return NextResponse.json(jokes);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
