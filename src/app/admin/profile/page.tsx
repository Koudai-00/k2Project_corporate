"use client";

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [form, setForm] = useState({ companyName: '', address: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setForm({ companyName: data.companyName || '', address: data.address || '', email: data.email || '' });
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage('プロフィールを更新しました');
      } else {
        setMessage('エラーが発生しました');
      }
    } catch (err) {
      setMessage('エラーが発生しました');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px' }}>
      <h1 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '2rem', marginBottom: '2rem' }}>Profile</h1>
      <div className="glass" style={{ padding: '2rem' }}>
        {message && <div style={{ marginBottom: '1rem', color: 'var(--accent)', fontWeight: 600 }}>{message}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="input-group">
            <label htmlFor="companyName">事業者名 (屋号)</label>
            <input type="text" id="companyName" className="input-field" value={form.companyName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="address">所在地</label>
            <input type="text" id="address" className="input-field" value={form.address} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">連絡先メールアドレス</label>
            <input type="email" id="email" className="input-field" value={form.email} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>保存する</button>
        </form>
      </div>
    </div>
  );
}
