'use client';

import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import RequestForm from '../components/RequestForm';

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
    const fetchMatts = async () => {
      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv'
      );
      const csvText = await res.text();

      // Parse CSV text
      const parsed = Papa.parse(csvText, { header: true });

      // Map to your Mat type
      const mats = parsed.data.map((row: any) => ({
        id: row.ID || '',
        name: row.Name || '',
        description: row.Description || '',
        image: row.Img
          ? `/imgs/${row.Img}`
          : '/imgs/placeholder.jpg',
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      }));

      setMatts(mats);
    };

    fetchMatts();
  }, []);

  return (
    <main className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Matts</h1>
      {matts.length === 0 ? (
        <p>Loading matts...</p>
      ) : (
        matts.map((mat) => (
          <div
            key={mat.id}
            className={`border p-4 rounded shadow ${
              mat.stock === 0 ? 'opacity-50' : ''
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{mat.name}</h2>
            <img
              src={mat.image}
              alt={mat.name}
              className="mb-2 rounded max-h-64 object-cover"
            />
            <p className="text-md text-gray-700 mb-1">{mat.description}</p>
            <p className="text-lg font-medium mb-2">Price: {mat.price}</p>
            {mat.stock > 0 ? (
              <RequestForm product={mat} />
            ) : (
              <p className="text-red-600 font-semibold">Sold Out</p>
            )}
          </div>
        ))
      )}
    </main>
  );
}
