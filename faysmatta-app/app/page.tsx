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
    return <p>Finding mats...</p>;
  }

  const galleryItems = matts.filter((mat) => mat.stock === 0);
  const buyItems = matts.filter((mat) => mat.stock > 0);

  return (
    <main className="main">
      {/* Welcome Section */}
      <section className="welcome-story">
      <h1 className="section-title">faysmatta</h1>
      <div className="welcome-text">
        <h3>I weave Swedish ‘trasmattor’ or rag rugs, on a Kentish heddle loom passed down to me by Anita, my friend’s Swedish mother, who also taught me how to weave.
        Each mat begins with preparing the warp and making the weft, strips of cotton fabrics that have outlived their first life: clothing, bedding, curtains etc. I enjoy the slow, thoughtful process of choosing colours, often inspired by the seasons, the fabrics themselves, or everyday moments.
        Every mat has a name and a story, from ‘Simply Red’, woven from a single bold colour, to ‘Sweet Pea’, made from my mother’s old curtains.
        My first loom lived in a cabin in my mother’s garden. Today, it has a new home in my own garden studio, one of my happy places. Here, I continue the tradition of making beautiful, useful things from what might otherwise be thrown away.
        </h3>
      </div>
    </section>


      {/* Buy Section */}
      <section className="buy">
        <h2 className="section-title">shop</h2>
        <div className="matts-grid">
          {buyItems.map((mat) => (
            <Link key={mat.id} href={`/matts/${mat.id}`} className="mat-card">
              <img src={mat.image} alt={mat.name} className="mat-image" />
              <div className="overlay">
                <span>{mat.name} - {mat.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery">
        <h2 className="section-title">gallery</h2>
        <div className="matts-grid">
          {galleryItems.map((mat) => (
            <div key={mat.id} className="mat-card">
              <img src={mat.image} alt={mat.name} className="mat-image" />
              <div className="overlay">
                <span>{mat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2 className="section-title">say hello!</h2>
        <p>Email: <a href="mailto:faysmatta@gmail.com">faysmatta@gmail.com</a></p>
        <p>Instagram: <a href="https://instagram.com/fayeverett" target="_blank">@fayeverett</a></p>
      </section>
    </main>
  );
}
