'use client';

import { useEffect, useState } from 'react';
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
  const [mats, setMats] = useState<Mat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mats')
      .then((r) => r.json())
      .then((data) => { setMats(data); setLoading(false); });
  }, []);

  const galleryItems = mats.filter((m) => m.stock === 0);
  const buyItems = mats.filter((m) => m.stock > 0);

  return (
    <main className="main">

      {/* Hero / Story */}
      <section className="hero">
        <h1 className="hero-title">faysmatta</h1>
        <div className="hero-divider" />
        <p className="hero-story">
          I weave Swedish <em>trasmattor</em> — rag rugs — on a Kentish heddle loom passed down
          to me by Anita, my friend's Swedish mother, who also taught me how to weave.
          Each mat begins with preparing the warp and making the weft: strips of cotton
          fabrics that have outlived their first life — clothing, bedding, curtains.
          I enjoy the slow, thoughtful process of choosing colours, often inspired by the
          seasons, the fabrics themselves, or everyday moments. Every mat has a name and
          a story. My loom now lives in my garden studio, one of my happy places.
        </p>
      </section>

      {/* Shop */}
      {(loading || buyItems.length > 0) && (
        <section className="section">
          <h2 className="section-title">shop</h2>
          {loading ? (
            <p className="loading-text">Finding mats…</p>
          ) : (
            <div className="matts-grid">
              {buyItems.map((mat) => (
                <Link key={mat.id} href={`/matts/${mat.id}`} className="mat-card">
                  <img src={mat.image} alt={mat.name} className="mat-image" />
                  <div className="mat-overlay">
                    <span className="mat-overlay-name">{mat.name}</span>
                    <span className="mat-overlay-price">{mat.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Gallery */}
      {(loading || galleryItems.length > 0) && (
        <section className="section">
          <h2 className="section-title">gallery</h2>
          {loading ? (
            <p className="loading-text">Finding mats…</p>
          ) : (
            <div className="matts-grid">
              {galleryItems.map((mat) => (
                <Link key={mat.id} href={`/matts/${mat.id}`} className="mat-card">
                  <img src={mat.image} alt={mat.name} className="mat-image" />
                  <div className="mat-overlay">
                    <span className="mat-overlay-name">{mat.name}</span>
                    <span className="mat-overlay-price mat-overlay-sold">sold</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Admin link */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="/admin/login" style={{ fontSize: '0.7rem', letterSpacing: '0.12em', color: '#a08060', textTransform: 'uppercase', opacity: 0.7 }}>
          admin
        </a>
      </div>

      {/* Contact */}
      <section className="contact-section">
        <h2 className="section-title">say hello</h2>
        <p className="contact-text">
          For commissions, questions, or just a chat about weaving — get in touch.
        </p>
        <div className="contact-links">
          <a href="mailto:faysmatta@gmail.com" className="contact-link">faysmatta@gmail.com</a>
          <a href="https://instagram.com/fayeverett" target="_blank" rel="noreferrer" className="contact-link">@fayeverett</a>
        </div>
      </section>

    </main>
  );
}
