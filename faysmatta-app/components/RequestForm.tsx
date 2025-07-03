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

    const target = e.currentTarget;

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

  if (submitted) return <p className="success-message">Thanks! We’ll be in touch soon.</p>;

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <input
        name="name"
        required
        placeholder="Your name"
        className="input-field"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="input-field"
      />
      <textarea
        name="message"
        placeholder="Optional message"
        className="textarea-field"
      />
      <button
        type="submit"
        disabled={loading}
        className="submit-button"
      >
        {loading ? 'Sending...' : 'Request to Buy'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
