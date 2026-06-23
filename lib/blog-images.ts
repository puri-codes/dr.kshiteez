import fs from 'fs';
import sharp from 'sharp';
import { query } from './db';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png']);

export interface BlogImageRecord {
  id: string;
  filename: string;
  mimeType: string;
  data: Buffer;
  originalSizeBytes: number;
  compressedSizeBytes: number;
  createdAt: string;
}

export interface BlogImageUploadResult {
  id: string;
  imageUrl: string;
  filename: string;
  mimeType: string;
  originalSizeBytes: number;
  compressedSizeBytes: number;
}

function normalizeMimeType(mimeType: string) {
  if (mimeType === 'image/jpg') return 'image/jpeg';
  return mimeType;
}

async function compressLosslessly(input: Buffer, mimeType: string) {
  if (mimeType === 'image/png') {
    const compressed = await sharp(input)
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
      })
      .toBuffer();

    return compressed.length < input.length ? compressed : input;
  }

  return input;
}

export async function createBlogImageFromUpload(file: File): Promise<BlogImageUploadResult> {
  const mimeType = normalizeMimeType(file.type);
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    throw new Error('Only JPEG and PNG uploads are supported.');
  }

  const originalBuffer = Buffer.from(await file.arrayBuffer());
  const compressedBuffer = await compressLosslessly(originalBuffer, mimeType);

  const { rows } = await query(
    `INSERT INTO blog_images (filename, mime_type, data, original_size_bytes, compressed_size_bytes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, filename, mime_type, original_size_bytes, compressed_size_bytes`,
    [
      file.name || 'upload',
      mimeType,
      compressedBuffer,
      originalBuffer.length,
      compressedBuffer.length,
    ]
  );

  const row = rows[0];
  return {
    id: row.id,
    imageUrl: `/api/blog-images/${row.id}`,
    filename: row.filename,
    mimeType: row.mime_type,
    originalSizeBytes: Number(row.original_size_bytes),
    compressedSizeBytes: Number(row.compressed_size_bytes),
  };
}

export async function getBlogImageById(id: string): Promise<BlogImageRecord | null> {
  const { rows } = await query(
    `SELECT id, filename, mime_type, data, original_size_bytes, compressed_size_bytes, created_at
     FROM blog_images
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  if (!rows.length) {
    return null;
  }

  const row = rows[0];
  return {
    id: row.id,
    filename: row.filename,
    mimeType: row.mime_type,
    data: row.data,
    originalSizeBytes: Number(row.original_size_bytes),
    compressedSizeBytes: Number(row.compressed_size_bytes),
    createdAt: new Date(row.created_at).toISOString(),
  };
}
