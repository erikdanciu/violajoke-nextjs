import { db } from '@/lib/jokes-db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const joke = await db.getRandomJoke();
    if (!joke) {
      return NextResponse.json({ error: 'No jokes available' }, { status: 404 });
    }
    return NextResponse.json(joke);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
