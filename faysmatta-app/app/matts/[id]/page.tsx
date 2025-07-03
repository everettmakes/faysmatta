'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import RequestForm from '../../../components/RequestForm';

type Mat = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

interface PageProps {
  params: { id: string };
}

export default function MatDetailPage({ params }: PageProps) {
  const [mat, setMat] = useState<Mat | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMat() {
      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv'
      );
      const csvText = await res.text();
      const parsed = (await import('papaparse')).default.parse(csvText, { header: true });
      const mats = parsed.data.map((row: any) => ({
        id: row.ID || '',
        name: row.Name || '',
        description: row.Description || '',
        image: row.Img ? `/imgs/${row.Img}` : '/imgs/placeholder.jpg',
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      }));
      const found = mats.find((m) => m.id === params.id) || null;
      setMat(found);
      setLoading(false);
    }
    fetchMat();
  }, [params.id]);

  if (loading) return <p>Loading...</p>;
  if (!mat) return <p>Mat not found.</p>;

  return (
    <main className="main detail-page">
      <h1>{mat.name}</h1>
      <img src={mat.image} alt={mat.name} className="detail-image" />
      <p>{mat.description}</p>
      <p><strong>Price:</strong> {mat.price}</p>
      <p><strong>Stock:</strong> {mat.stock > 0 ? mat.stock : 'Sold Out'}</p>
      {mat.stock > 0 ? (
        <RequestForm product={mat} />
      ) : (
        <p className="soldout-text">Sold Out</p>
      )}
    </main>
  );
}
