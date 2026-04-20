import { NextResponse } from 'next/server';
import { getDb } from '@/db/client';
import { services } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();
    const service = await db.select().from(services).where(eq(services.id, Number(id))).get();
    
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json() as any;
    const db = getDb();
    
    await db.update(services)
      .set({
        name: body.name,
        description: body.description,
        iconUrl: body.iconUrl,
        appStoreUrl: body.appStoreUrl,
        googlePlayUrl: body.googlePlayUrl,
        webUrl: body.webUrl,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(services.id, Number(id)));
      
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

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
