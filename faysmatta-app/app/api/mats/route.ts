import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const mats = await prisma.mat.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(mats);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch mats' }, { status: 500 });
  }
}
