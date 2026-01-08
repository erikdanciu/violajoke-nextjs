import { db } from '@/lib/jokes-db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = process.env.ADMIN_SECRET;
  const authSecret = request.headers.get('x-admin-secret');

  if (authSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jokeId } = await request.json();

    if (!jokeId) {
      return NextResponse.json({ error: 'Joke ID required' }, { status: 400 });
    }

    await db.deleteJoke(jokeId);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
