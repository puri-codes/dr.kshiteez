import { Pool } from 'pg';

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString) {
  throw new Error('NEON_DATABASE_URL environment variable is required');
}

function sanitizeConnectionString(rawConnectionString: string): string {
  const url = new URL(rawConnectionString);
  url.searchParams.delete('sslmode');
  url.searchParams.delete('channel_binding');
  return url.toString();
}

const pool = new Pool({
  connectionString: sanitizeConnectionString(connectionString),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
  max: 5,
});

export async function query(text: string, params: Array<unknown> = []) {
  let client;

  try {
    client = await pool.connect();
  } catch (error) {
    const code = (error as { code?: string } | undefined)?.code;
    if (code === '28P01') {
      throw new Error('Neon authentication failed. Please refresh NEON_DATABASE_URL in frontend/.env.local with a valid password from the Neon dashboard.');
    }

    throw error;
  }

  try {
    return await client.query(text, params);
  } finally {
    client?.release();
  }
}
