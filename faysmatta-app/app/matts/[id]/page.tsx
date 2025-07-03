'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Papa from 'papaparse';
import RequestForm from '../../../components/RequestForm';

type Mat = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

export default function MatDetailPage() {
  const params = useParams();
  const [mat, setMat] = useState<Mat | null>(null);

  useEffect(() => {
    const fetchMat = async () => {
      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv'
      );
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, { header: true });
      const mats = parsed.data.map((row: any) => ({
        id: row.ID || '',
        name: row.Name || '',
        description: row.Description || '',
        image: row.Img ? `/imgs/${row.Img}` : '/imgs/placeholder.jpg',
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      }));

      const foundMat = mats.find((m) => m.id === params.id) || null;
      setMat(foundMat);
    };

    fetchMat();
  }, [params.id]);

  if (!mat) return <p>Loading mat details...</p>;

  return (
    <main className="main">
      <h1 className="heading">{mat.name}</h1>
      <div className="mat-detail">
        <img src={mat.image} alt={mat.name} className="mat-detail-image" />
        <div className="mat-detail-info">
          <p className="mat-description">{mat.description}</p>
          <p className="mat-price">Price: {mat.price}</p>
          <p>Stock: {mat.stock > 0 ? mat.stock : 'Sold Out'}</p>
          {mat.stock > 0 ? (
            <RequestForm product={mat} />
          ) : (
            <p className="mat-soldout">Sold Out</p>
          )}
        </div>
      </div>
    </main>
  );
}
