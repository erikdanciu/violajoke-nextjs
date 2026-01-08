import { db } from '@/lib/jokes-db';
import { NextRequest, NextResponse } from 'next/server';

// Check admin auth header
function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  const secret = process.env.ADMIN_SECRET;
  return auth === `Bearer ${secret}` || request.headers.get('x-admin-secret') === secret;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const submissions = await db.getUnapprovedJokes();
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
