import { NextResponse } from 'next/server';
import { getDb } from '@/db/client';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    const allServices = await db.select().from(services).all();
    return NextResponse.json(allServices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as any;
    const db = getDb();
    await db.insert(services).values({
      name: body.name,
      description: body.description,
      iconUrl: body.iconUrl,
      appStoreUrl: body.appStoreUrl,
      googlePlayUrl: body.googlePlayUrl,
      webUrl: body.webUrl,
      visibility: body.visibility ?? 1,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to insert service' }, { status: 500 });
  }
}
