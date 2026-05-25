/**
 * Seed script — migrates existing mat data from Google Sheets into the SQLite database.
 * Run once with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client';
import Papa from 'papaparse';

const prisma = new PrismaClient();

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv';

const CLOUDINARY_CLOUD = 'dqnjc6i7b';
const CLOUDINARY_FOLDER = 'v1751546002';

async function main() {
  console.log('Fetching mats from Google Sheets…');

  const res = await fetch(SHEET_URL);
  const csv = await res.text();

  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data;
  console.log(`Found ${rows.length} mats. Seeding database…`);

  // Clear existing data first so re-running is safe
  await prisma.mat.deleteMany();

  for (const row of rows) {
    if (!row.Name) continue;

    const imageUrl = row.Img
      ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload/${CLOUDINARY_FOLDER}/${row.Img}`
      : '/imgs/placeholder.jpg';

    await prisma.mat.create({
      data: {
        name: row.Name,
        description: row.Description || '',
        image: imageUrl,
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      },
    });

    console.log(`  ✓ ${row.Name}`);
  }

  console.log('Done! Database seeded.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
