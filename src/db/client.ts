import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { getRequestContext } from '@cloudflare/next-on-pages';

export function getDb() {
  // @cloudflare/next-on-pages がリクエストコンテキストを提供
  const ctx = getRequestContext();
  const d1 = ctx.env.DB;
  return drizzle(d1, { schema });
}
