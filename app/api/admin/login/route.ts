import { NextRequest, NextResponse } from 'next/server';

function verifyAdminSecret(password: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    console.warn('ADMIN_SECRET not configured');
    return false;
  }
  return password === secret;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (verifyAdminSecret(password)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
