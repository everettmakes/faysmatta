'use client';

import { useState, FormEvent } from 'react';

interface Product {
  id?: string;
  name: string;
  image: string;
  price: string;
  stock?: number;
}

interface RequestFormProps {
  product: Product;
}

export default function RequestForm({ product }: RequestFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const target = e.currentTarget as HTMLFormElement;

    const formData = {
      name: (target.elements.namedItem('name') as HTMLInputElement).value,
      email: (target.elements.namedItem('email') as HTMLInputElement).value,
      message: (target.elements.namedItem('message') as HTMLTextAreaElement).value,
      product,
    };

    try {
      const res = await fetch('/api/request-to-buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        e.currentTarget.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return <p className="success-message">Thanks! We’ll be in touch soon.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <input name="name" required placeholder="Your name" className="input-field" />
      <input name="email" type="email" required placeholder="Your email" className="input-field" />
      <textarea name="message" placeholder="Optional message" className="textarea-field" />
      <button type="submit" disabled={loading} className="submit-button">
        {loading ? 'Sending...' : 'Request to Buy'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
