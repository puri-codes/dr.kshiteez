import { getBlogImageById } from '../../../../lib/blog-images';

interface BlogImageRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export const runtime = 'nodejs';

export async function GET(request: Request, context: BlogImageRouteContext) {
  const { id } = await context.params;
  const image = await getBlogImageById(id);

  if (!image) {
    return new Response('Image not found', { status: 404 });
  }

  const body = new Uint8Array(image.data);

  return new Response(body, {
    headers: {
      'Content-Type': image.mimeType,
      'Content-Length': String(body.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
