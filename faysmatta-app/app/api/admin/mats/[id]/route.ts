import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { name, description, image, price, stock } = body;

    const mat = await prisma.mat.update({
      where: { id },
      data: {
        name,
        description,
        image,
        price,
        stock: parseInt(stock ?? '0'),
      },
    });

    return NextResponse.json(mat);
  } catch {
    return NextResponse.json({ error: 'Failed to update mat' }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.mat.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete mat' }, { status: 500 });
  }
}
