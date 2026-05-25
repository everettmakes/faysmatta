import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const mats = await prisma.mat.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(mats);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, image, price, stock } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const mat = await prisma.mat.create({
      data: {
        name,
        description: description || '',
        image: image || '/imgs/placeholder.jpg',
        price,
        stock: parseInt(stock ?? '0'),
      },
    });

    return NextResponse.json(mat, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create mat' }, { status: 500 });
  }
}
