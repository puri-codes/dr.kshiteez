-- Neon schema for blog administration
-- Run this script against your Neon database to create the required tables.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS blog_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL,
  original_size_bytes INTEGER NOT NULL,
  compressed_size_bytes INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_images_created_at ON blog_images (created_at DESC);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  summary TEXT NOT NULL DEFAULT '',
  intro TEXT NOT NULL DEFAULT '',
  content_sections JSONB NOT NULL DEFAULT '[]'::JSONB,
  image_url TEXT NOT NULL DEFAULT '',
  banner_image_url TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NULL,
  seo_title TEXT NOT NULL DEFAULT '',
  seo_description TEXT NOT NULL DEFAULT '',
  seo_keywords TEXT NOT NULL DEFAULT '',
  canonical_url TEXT NOT NULL DEFAULT '',
  meta_robots TEXT NOT NULL DEFAULT 'index, follow',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- `image_url` and `banner_image_url` can point to external URLs or internal
-- `/api/blog-images/<id>` routes that serve compressed images from Neon.

CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts (featured, is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
