import { query } from './db';

export interface ContentSection {
  heading: string;
  items: string[];
  imageUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  intro: string;
  contentSections: ContentSection[];
  imageUrl: string;
  bannerImageUrl: string;
  readTime: string;
  featured: boolean;
  isPublished: boolean;
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
  metaRobots: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  category?: string;
  tags?: string[];
  summary?: string;
  intro?: string;
  contentSections?: ContentSection[];
  imageUrl?: string;
  bannerImageUrl?: string;
  readTime?: string;
  featured?: boolean;
  isPublished?: boolean;
  publishedAt?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  metaRobots?: string;
}

function mapBlogRow(row: any): BlogPost {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category || '',
    tags: row.tags || [],
    summary: row.summary || '',
    intro: row.intro || '',
    contentSections: row.content_sections || [],
    imageUrl: row.image_url || '',
    bannerImageUrl: row.banner_image_url || '',
    readTime: row.read_time || '',
    featured: row.featured,
    isPublished: row.is_published,
    publishedAt: row.published_at ? new Date(row.published_at).toISOString() : null,
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    seoKeywords: row.seo_keywords || '',
    canonicalUrl: row.canonical_url || '',
    metaRobots: row.meta_robots || 'index, follow',
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function logDatabaseError(operation: string, error: unknown) {
  console.error(`Blog DB error during ${operation}:`, error);
}

function getReadableDatabaseError(operation: string) {
  return `Unable to ${operation}. Please check the Neon connection string and ensure the database is reachable.`;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const { rows } = await query(
      `SELECT * FROM blog_posts ORDER BY published_at DESC NULLS LAST, created_at DESC`
    );
    return rows.map(mapBlogRow);
  } catch (error) {
    logDatabaseError('loading all blog posts', error);
    return [];
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const { rows } = await query(
      `SELECT * FROM blog_posts WHERE is_published = true ORDER BY published_at DESC NULLS LAST, created_at DESC`
    );
    return rows.map(mapBlogRow);
  } catch (error) {
    logDatabaseError('loading published blog posts', error);
    return [];
  }
}

export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { rows } = await query(
      `SELECT * FROM blog_posts WHERE featured = true AND is_published = true ORDER BY published_at DESC NULLS LAST, created_at DESC LIMIT $1`,
      [limit]
    );
    return rows.map(mapBlogRow);
  } catch (error) {
    logDatabaseError('loading featured blog posts', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { rows } = await query(
      `SELECT * FROM blog_posts WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    return rows.length ? mapBlogRow(rows[0]) : null;
  } catch (error) {
    logDatabaseError(`loading blog post by slug "${slug}"`, error);
    return null;
  }
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const { rows } = await query(
      `SELECT * FROM blog_posts WHERE id = $1 LIMIT 1`,
      [id]
    );
    return rows.length ? mapBlogRow(rows[0]) : null;
  } catch (error) {
    logDatabaseError(`loading blog post by id "${id}"`, error);
    return null;
  }
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  try {
    const { rows } = await query(
      `INSERT INTO blog_posts (
      title,
      slug,
      category,
      tags,
      summary,
      intro,
      content_sections,
      image_url,
      banner_image_url,
      read_time,
      featured,
      is_published,
      published_at,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      meta_robots
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    RETURNING *`,
    [
      input.title,
      input.slug,
      input.category || '',
      input.tags || [],
      input.summary || '',
      input.intro || '',
      JSON.stringify(input.contentSections || []),
      input.imageUrl || '',
      input.bannerImageUrl || '',
      input.readTime || '',
      input.featured ?? false,
      input.isPublished ?? false,
      input.publishedAt || null,
      input.seoTitle || '',
      input.seoDescription || '',
      input.seoKeywords || '',
      input.canonicalUrl || '',
      input.metaRobots || 'index, follow',
      ]
    );
    return mapBlogRow(rows[0]);
  } catch (error) {
    logDatabaseError(`creating blog post "${input.slug}"`, error);
    throw new Error(getReadableDatabaseError('create the blog post'));
  }
}

export async function updateBlogPost(id: string, input: Partial<BlogPostInput>): Promise<BlogPost | null> {
  const setClauses: string[] = [];
  const values: Array<unknown> = [];
  let index = 1;

  if (input.title !== undefined) {
    setClauses.push(`title = $${index++}`);
    values.push(input.title);
  }
  if (input.slug !== undefined) {
    setClauses.push(`slug = $${index++}`);
    values.push(input.slug);
  }
  if (input.category !== undefined) {
    setClauses.push(`category = $${index++}`);
    values.push(input.category);
  }
  if (input.tags !== undefined) {
    setClauses.push(`tags = $${index++}`);
    values.push(input.tags);
  }
  if (input.summary !== undefined) {
    setClauses.push(`summary = $${index++}`);
    values.push(input.summary);
  }
  if (input.intro !== undefined) {
    setClauses.push(`intro = $${index++}`);
    values.push(input.intro);
  }
  if (input.contentSections !== undefined) {
    setClauses.push(`content_sections = $${index++}`);
    values.push(JSON.stringify(input.contentSections));
  }
  if (input.imageUrl !== undefined) {
    setClauses.push(`image_url = $${index++}`);
    values.push(input.imageUrl);
  }
  if (input.bannerImageUrl !== undefined) {
    setClauses.push(`banner_image_url = $${index++}`);
    values.push(input.bannerImageUrl);
  }
  if (input.readTime !== undefined) {
    setClauses.push(`read_time = $${index++}`);
    values.push(input.readTime);
  }
  if (input.featured !== undefined) {
    setClauses.push(`featured = $${index++}`);
    values.push(input.featured);
  }
  if (input.isPublished !== undefined) {
    setClauses.push(`is_published = $${index++}`);
    values.push(input.isPublished);
  }
  if (input.publishedAt !== undefined) {
    setClauses.push(`published_at = $${index++}`);
    values.push(input.publishedAt);
  }
  if (input.seoTitle !== undefined) {
    setClauses.push(`seo_title = $${index++}`);
    values.push(input.seoTitle);
  }
  if (input.seoDescription !== undefined) {
    setClauses.push(`seo_description = $${index++}`);
    values.push(input.seoDescription);
  }
  if (input.seoKeywords !== undefined) {
    setClauses.push(`seo_keywords = $${index++}`);
    values.push(input.seoKeywords);
  }
  if (input.canonicalUrl !== undefined) {
    setClauses.push(`canonical_url = $${index++}`);
    values.push(input.canonicalUrl);
  }
  if (input.metaRobots !== undefined) {
    setClauses.push(`meta_robots = $${index++}`);
    values.push(input.metaRobots);
  }

  if (!setClauses.length) {
    return getBlogPostById(id);
  }

  try {
    const { rows } = await query(
      `UPDATE blog_posts SET ${setClauses.join(', ')}, updated_at = now() WHERE id = $${index} RETURNING *`,
      [...values, id]
    );

    return rows.length ? mapBlogRow(rows[0]) : null;
  } catch (error) {
    logDatabaseError(`updating blog post "${id}"`, error);
    throw new Error(getReadableDatabaseError('update the blog post'));
  }
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const { rowCount } = await query(`DELETE FROM blog_posts WHERE id = $1`, [id]);
    return rowCount > 0;
  } catch (error) {
    logDatabaseError(`deleting blog post "${id}"`, error);
    throw new Error(getReadableDatabaseError('delete the blog post'));
  }
}
