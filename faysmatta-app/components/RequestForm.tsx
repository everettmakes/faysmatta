'use client';

import { useState, FormEvent } from 'react';

interface Product {
  name: string;
  image: string;
  price: string;
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

    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      message: { value: string };
    };

    const formData = {
      name: target.name.value,
      email: target.email.value,
      message: target.message.value,
      product,
    };

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
    setLoading(false);
  };

  if (submitted) return <p className="text-green-600">Thanks! We’ll be in touch soon.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" required placeholder="Your name" className="border p-2 w-full" />
      <input name="email" type="email" required placeholder="Your email" className="border p-2 w-full" />
      <textarea name="message" placeholder="Optional message" className="border p-2 w-full" />
      <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded">
        {loading ? 'Sending...' : 'Request to Buy'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}