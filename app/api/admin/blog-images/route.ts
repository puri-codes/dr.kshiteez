import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '../../../../lib/admin';
import { createBlogImageFromUpload } from '../../../../lib/blog-images';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file was provided.' }, { status: 400 });
    }

    const uploaded = await createBlogImageFromUpload(file);
    return NextResponse.json({ image: uploaded }, { status: 201 });
  } catch (error) {
    console.error('Failed to upload blog image:', error);
    const message = (error as Error).message || 'Unable to upload image right now.';
    const status = message.includes('authentication failed') ? 503 : 400;
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}
