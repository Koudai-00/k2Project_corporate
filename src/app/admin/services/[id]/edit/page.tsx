"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

export default function EditService({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    description: '',
    iconUrl: '',
    appStoreUrl: '',
    googlePlayUrl: '',
    webUrl: '',
  });

  useEffect(() => {
    fetch(`/api/services/${id}`)
      .then(res => res.json())
      .then((data: any) => {
        if (data && !data.error) {
          setForm({
            name: data.name || '',
            description: data.description || '',
            iconUrl: data.iconUrl || '',
            appStoreUrl: data.appStoreUrl || '',
            googlePlayUrl: data.googlePlayUrl || '',
            webUrl: data.webUrl || '',
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    router.push('/admin/services');
    router.refresh();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '2rem', marginBottom: '2rem' }}>Edit Service</h1>
      <div className="glass" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label htmlFor="name">サービス名 (必須)</label>
            <input type="text" id="name" className="input-field" value={form.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="description">説明文 (必須)</label>
            <textarea id="description" className="input-field" rows={4} value={form.description} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="iconUrl">アイコン画像 URL</label>
            <input type="text" id="iconUrl" className="input-field" value={form.iconUrl} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label htmlFor="appStoreUrl">App Store リンク</label>
            <input type="text" id="appStoreUrl" className="input-field" value={form.appStoreUrl} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="googlePlayUrl">Google Play リンク</label>
            <input type="text" id="googlePlayUrl" className="input-field" value={form.googlePlayUrl} onChange={handleChange} />
          </div>
          <div className="input-group">
            <label htmlFor="webUrl">ウェブサイト URL</label>
            <input type="text" id="webUrl" className="input-field" value={form.webUrl} onChange={handleChange} />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">保存する</button>
            <button type="button" className="btn btn-outline" onClick={() => router.push('/admin/services')}>キャンセル</button>
          </div>
        </form>
      </div>
    </div>
  );
}
