import { NextRequest, NextResponse } from 'next/server';
import { requireAdminAuth } from '../../../../lib/admin';
import { createBlogPost, getAllBlogPosts } from '../../../../lib/blog';

export async function GET(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Failed to load admin blog posts:', error);
    return NextResponse.json(
      { error: 'Unable to load blog posts from Neon right now.' },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAdminAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const created = await createBlogPost(body);
    return NextResponse.json({ post: created }, { status: 201 });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json(
      { error: 'Unable to create the blog post because the Neon database is not accepting writes.' },
      { status: 503 }
    );
  }
}
