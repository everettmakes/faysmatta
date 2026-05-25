'use client';

import React, { useEffect, useState } from 'react';
import { use } from 'react';
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
  const { id } = use(params);
  const [mat, setMat] = useState<Mat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/mats/${id}`)
      .then((r) => r.json())
      .then((data) => { setMat(data); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <main className="details-main">
        <p className="loading-text">Finding the mat…</p>
      </main>
    );
  }

  if (!mat) {
    return (
      <main className="details-main">
        <Link href="/"><button className="back-button">← back</button></Link>
        <p>Mat not found.</p>
      </main>
    );
  }

  return (
    <main className="details-main">
      <Link href="/"><button className="back-button">← back</button></Link>
      <h1 className="details-title">{mat.name}</h1>
      <div className="details-image-wrapper">
        <img src={mat.image} alt={mat.name} className="details-image" />
      </div>
      <p className="details-description">{mat.description}</p>
      <p className="details-price">{mat.price}</p>
      {mat.stock > 0 ? (
        <RequestForm product={mat} />
      ) : (
        <p className="details-soldout">This one has found its home.</p>
      )}
    </main>
  );
}
