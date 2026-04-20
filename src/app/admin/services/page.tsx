"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then((data: any) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;
    // API削除エンドポイント（まだ作ってないが一旦仮）
    await fetch(`/api/services/${id}`, { method: 'DELETE' });
    setServices(services.filter(s => s.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="section-title" style={{ textAlign: 'left', margin: 0, fontSize: '2rem' }}>Services</h1>
        <button className="btn btn-primary" onClick={() => router.push('/admin/services/new')}>+ サービスを追加</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {services.length === 0 ? (
          <p>登録されているサービスはありません。</p>
        ) : (
          services.map(s => (
            <div key={s.id} className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{s.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{s.description.substring(0, 50)}...</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-outline" style={{ padding: '0.4rem 1rem' }} onClick={() => handleDelete(s.id)}>削除</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
