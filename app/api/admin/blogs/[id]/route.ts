import { NextResponse } from 'next/server';
import { requireAdminAuth } from '../../../../../lib/admin';
import { deleteBlogPost, getBlogPostById, updateBlogPost } from '../../../../../lib/blog';

interface BlogRouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: Request, context: BlogRouteContext) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const post = await getBlogPostById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Failed to load blog post:', error);
    return NextResponse.json(
      { error: 'Unable to load the blog post from Neon right now.' },
      { status: 503 }
    );
  }
}

export async function PUT(request: Request, context: BlogRouteContext) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateBlogPost(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Unable to update post' }, { status: 404 });
    }

    return NextResponse.json({ post: updated });
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json(
      { error: 'Unable to update the blog post because the Neon database is not accepting writes.' },
      { status: 503 }
    );
  }
}

export async function DELETE(request: Request, context: BlogRouteContext) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const { id } = await context.params;
    const deleted = await deleteBlogPost(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Unable to delete post' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json(
      { error: 'Unable to delete the blog post because the Neon database is not accepting writes.' },
      { status: 503 }
    );
  }
}
