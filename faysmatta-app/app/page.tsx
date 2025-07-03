'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Link from 'next/link';

type Mat = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

export default function HomePage() {
  const [matts, setMatts] = useState<Mat[]>([]);

  useEffect(() => {
    async function fetchMatts() {
      const cloudName = "dqnjc6i7b";
      const folder = "v1751546002";

      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv'
      );
      const csvText = await res.text();
      const parsed = Papa.parse(csvText, { header: true });

      const mats = parsed.data.map((row: any) => ({
        id: row.ID || '',
        name: row.Name || '',
        description: row.Description || '',
        image: row.Img
          ? `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${row.Img}`
          : '/imgs/placeholder.jpg',
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      }));

      setMatts(mats);
    }
    fetchMatts();
  }, []);

  if (matts.length === 0) {
    return <p>Loading matts...</p>;
  }

  return (
    <main className="main">
      <h1 className="heading">faysmatta</h1>
      <div className="matts-grid">
        {matts.map((mat) => (
          <Link key={mat.id} href={`/matts/${mat.id}`} className="mat-card">
            <img src={mat.image} alt={mat.name} className="mat-image" />
            <div className="overlay">
              <span>{mat.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
