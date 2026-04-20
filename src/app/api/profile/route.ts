import { NextResponse } from 'next/server';
import { getDb } from '@/db/client';
import { profile } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET() {
  try {
    const db = getDb();
    const p = await db.select().from(profile).all();
    return NextResponse.json(p[0] || null);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as any;
    const db = getDb();
    
    const existing = await db.select().from(profile).all();
    if (existing.length > 0) {
      await db.update(profile).set({
        companyName: body.companyName,
        address: body.address,
        email: body.email,
        updatedAt: 'CURRENT_TIMESTAMP',
      }).where(eq(profile.id, existing[0].id));
    } else {
      await db.insert(profile).values({
        companyName: body.companyName,
        address: body.address,
        email: body.email,
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
