import { NextRequest } from 'next/server';
import { createAdminSessionResponse, validateAdminSecret } from '../../../../lib/admin';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const secret = body.secret as string | undefined;

  if (!validateAdminSecret(secret)) {
    return new Response(JSON.stringify({ error: 'Invalid secret' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  return createAdminSessionResponse({ success: true });
}
