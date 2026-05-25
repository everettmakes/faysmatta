'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

type Mat = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  stock: number;
};

const emptyForm = { name: '', description: '', image: '', price: '', stock: '0' };

export default function AdminPage() {
  const [mats, setMats] = useState<Mat[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'shop' | 'gallery'>('shop');
  const router = useRouter();

  const fetchMats = async () => {
    const res = await fetch('/api/admin/mats');
    if (res.ok) setMats(await res.json());
  };

  useEffect(() => { fetchMats(); }, []);

  const shopMats = mats.filter((m) => m.stock > 0);
  const galleryMats = mats.filter((m) => m.stock === 0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, image: url }));
    } else {
      setMessage('Image upload failed — check Cloudinary settings in .env.local');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const body = { ...form, stock: parseInt(form.stock) };
    const url = editingId ? `/api/admin/mats/${editingId}` : '/api/admin/mats';
    const method = editingId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMessage(editingId ? 'Mat updated!' : 'Mat added!');
      setForm(emptyForm);
      setEditingId(null);
      await fetchMats();
    } else {
      setMessage('Something went wrong. Please try again.');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleEdit = (mat: Mat) => {
    setForm({
      name: mat.name,
      description: mat.description,
      image: mat.image,
      price: mat.price,
      stock: String(mat.stock),
    });
    setEditingId(mat.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/mats/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setDeleteConfirm(null);
      await fetchMats();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-header-title">faysmatta — admin</h1>
          <div className="admin-header-actions">
            <a href="/" target="_blank" className="admin-view-site">view site ↗</a>
            <button onClick={handleLogout} className="admin-logout-btn">log out</button>
          </div>
        </div>
      </header>

      <div className="admin-body">
        {/* Form */}
        <section className="admin-form-section">
          <h2 className="admin-section-heading">
            {editingId ? '✏️ edit mat' : '+ add a mat'}
          </h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-form-row">
              <label className="admin-label">Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="e.g. Sweet Pea"
                className="admin-input"
              />
            </div>

            <div className="admin-form-row">
              <label className="admin-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Tell the story of this mat..."
                rows={3}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-row">
              <label className="admin-label">Image</label>
              <div className="admin-image-row">
                {form.image && (
                  <img src={form.image} alt="preview" className="admin-image-preview" />
                )}
                <div className="admin-image-inputs">
                  <label className="admin-upload-btn">
                    {uploading ? 'Uploading...' : '📷 Upload photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="admin-file-input"
                    />
                  </label>
                  <span className="admin-or">or paste a URL:</span>
                  <input
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="admin-input"
                  />
                </div>
              </div>
            </div>

            <div className="admin-form-two-col">
              <div className="admin-form-row">
                <label className="admin-label">Price *</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  placeholder="e.g. £45"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-row">
                <label className="admin-label">Status</label>
                <select
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  className="admin-select"
                >
                  <option value="1">🛍️ For sale (shop)</option>
                  <option value="0">🖼️ Gallery only (sold)</option>
                </select>
              </div>
            </div>

            {message && (
              <p className={`admin-message ${message.includes('!') ? 'admin-message--success' : 'admin-message--error'}`}>
                {message}
              </p>
            )}

            <div className="admin-form-actions">
              {editingId && (
                <button type="button" onClick={handleCancel} className="admin-btn admin-btn--secondary">
                  Cancel
                </button>
              )}
              <button type="submit" disabled={saving || uploading} className="admin-btn admin-btn--primary">
                {saving ? 'Saving...' : editingId ? 'Save changes' : 'Add mat'}
              </button>
            </div>
          </form>
        </section>

        {/* Mat list */}
        <section className="admin-list-section">
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'shop' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('shop')}
            >
              Shop ({shopMats.length})
            </button>
            <button
              className={`admin-tab ${activeTab === 'gallery' ? 'admin-tab--active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery ({galleryMats.length})
            </button>
          </div>

          <div className="admin-mat-list">
            {(activeTab === 'shop' ? shopMats : galleryMats).length === 0 ? (
              <p className="admin-empty">No mats here yet.</p>
            ) : (
              (activeTab === 'shop' ? shopMats : galleryMats).map((mat) => (
                <div key={mat.id} className="admin-mat-row">
                  <img
                    src={mat.image || '/imgs/placeholder.jpg'}
                    alt={mat.name}
                    className="admin-mat-thumb"
                  />
                  <div className="admin-mat-info">
                    <p className="admin-mat-name">{mat.name}</p>
                    <p className="admin-mat-price">{mat.price}</p>
                    {mat.description && (
                      <p className="admin-mat-desc">{mat.description.slice(0, 80)}{mat.description.length > 80 ? '…' : ''}</p>
                    )}
                  </div>
                  <div className="admin-mat-actions">
                    <button onClick={() => handleEdit(mat)} className="admin-btn admin-btn--edit">
                      Edit
                    </button>
                    {deleteConfirm === mat.id ? (
                      <div className="admin-delete-confirm">
                        <span>Sure?</span>
                        <button onClick={() => handleDelete(mat.id)} className="admin-btn admin-btn--danger">Yes, delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="admin-btn admin-btn--secondary">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(mat.id)} className="admin-btn admin-btn--danger">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
