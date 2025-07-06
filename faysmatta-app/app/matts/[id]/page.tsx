'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
import Papa from 'papaparse';
import RequestForm from '../../../components/RequestForm';
import Link from 'next/link';

type Mat = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

interface DetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function DetailsPage({ params }: DetailsPageProps) {
  // Unwrap params Promise using React.use()
  const { id } = use(params);

  const [mat, setMat] = useState<Mat | null>(null);

  useEffect(() => {
    const fetchMatts = async () => {
      const cloudName = "dqnjc6i7b"; // Replace with your Cloudinary cloud name
      const folder = "v1751546002"; // Replace with your Cloudinary folder name

      const res = await fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQpNUuc862lCAPVDHcRsXTAI4BpZLmOstQVqPU54EzVvS7x89qgANn68tNXMZUfZQECEpC_gZMay_vd/pub?gid=0&single=true&output=csv'
      );
      const csvText = await res.text();

      const parsed = Papa.parse(csvText, { header: true });

      const mats: Mat[] = parsed.data.map((row: any) => ({
        id: row.ID || '',
        name: row.Name || '',
        description: row.Description || '',
        image: row.Img
          ? `https://res.cloudinary.com/${cloudName}/image/upload/${folder}/${row.Img}`
          : '/imgs/placeholder.jpg',
        price: row.Price || '',
        stock: parseInt(row.Stock || '0'),
      }));

      const selectedMat = mats.find((m) => m.id === id) || null;
      setMat(selectedMat);
    };

    fetchMatts();
  }, [id]);

  if (!mat) return <p>Finding the mat...</p>;

  return (
    <main className="details-main">
      <Link href="/">
        <button className="back-button"> ← </button>
      </Link>
      <h1 className="details-title">{mat.name}</h1>
      <div className="details-image-wrapper">
        <img src={mat.image} alt={mat.name} className="details-image" />
      </div>
      <p className="details-description">{mat.description}</p>
      <p className="details-price">Price: {mat.price}</p>
      {mat.stock > 0 ? (
        <RequestForm product={mat} />
      ) : (
        <p className="details-soldout">Sorry. It's gone!</p>
      )}
    </main>
  );
}
