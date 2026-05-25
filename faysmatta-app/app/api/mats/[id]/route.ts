import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const mat = await prisma.mat.findUnique({ where: { id } });
    if (!mat) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(mat);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch mat' }, { status: 500 });
  }
}
