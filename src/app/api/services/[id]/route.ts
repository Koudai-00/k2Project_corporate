import { NextResponse } from 'next/server';
import { getDb } from '@/db/client';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();
    await db.delete(services).where(eq(services.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
