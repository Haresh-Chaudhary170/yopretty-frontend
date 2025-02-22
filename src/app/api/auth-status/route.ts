// app/api/auth/status/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('session');

  if (token) {
    // Optionally, verify the token here
    return NextResponse.json({ isLoggedIn: true });
  } else {
    return NextResponse.json({ isLoggedIn: false });
  }
}
