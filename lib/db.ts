import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is missing");
}

// ✅ Neon serverless SQL client (works great in Next.js API routes / Vercel functions)
export const sql = neon(process.env.DATABASE_URL);
