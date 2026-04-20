import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json() as { password?: string };
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: 'k2_admin_session',
      value: 'authenticated',
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'パスワードが間違っています' }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('k2_admin_session');
  return response;
}
