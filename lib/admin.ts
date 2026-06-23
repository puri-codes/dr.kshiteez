import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!ADMIN_SECRET) {
  throw new Error('ADMIN_SECRET environment variable is required for admin routes');
}

const ADMIN_SESSION_SECRET = ADMIN_SECRET as string;

export function validateAdminSecret(secret?: string): boolean {
  return secret === ADMIN_SECRET;
}

export function getAdminSessionValue(request: Request | NextRequest): string {
  if ('cookies' in request) {
    return request.cookies.get('admin-session')?.value ?? '';
  }

  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader.match(/(?:^|; )admin-session=([^;]+)/);
  return match?.[1] ?? '';
}

export function validateAdminSession(request: Request | NextRequest): boolean {
  return getAdminSessionValue(request) === ADMIN_SESSION_SECRET;
}

export function requireAdminAuth(request: Request | NextRequest) {
  if (!validateAdminSession(request)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  return null;
}

export function createAdminSessionResponse(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.cookies.set({
    name: 'admin-session',
    value: ADMIN_SESSION_SECRET,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return response;
}

export function createAdminLogoutResponse(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.cookies.set({
    name: 'admin-session',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
