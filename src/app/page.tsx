"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>({ companyName: 'K2_Project', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // APIからデータを取得する
    Promise.all([
      fetch('/api/services').then(res => res.json()),
      fetch('/api/profile').then(res => res.json())
    ]).then(([servicesData, profileData]: [any, any]) => {
      setServices(Array.isArray(servicesData) ? servicesData : []);
      if (profileData && profileData.companyName) {
        setProfile(profileData);
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-color)' }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      <nav>
        <div className="container nav-container">
          <div style={{ fontWeight: '800', fontSize: '1.25rem' }}>{profile.companyName}</div>
          {/* Adminボタンを削除しました */}
        </div>
      </nav>

      <main>
        <section className="section" style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontWeight: 800 }}>
              Crafting The Future
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              {profile.companyName}の公式ポートフォリオサイトへようこそ。私たちが開発したアプリやサービスをご紹介します。
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <a href="#services" className="btn btn-primary">View Services</a>
            </div>
          </div>
        </section>

        <section id="services" className="section container">
          <h2 className="section-title">Our Services</h2>
          <div className="grid">
            {services.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>公開中のサービスはまだありません。</p>
            ) : (
              services.filter(s => s.visibility === 1).map((service) => (
                <div key={service.id} className="glass" style={{ padding: '2rem' }}>
                  {service.iconUrl && (
                    <img src={service.iconUrl} alt={service.name} style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '1rem' }} />
                  )}
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{service.name}</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '3rem' }}>
                    {service.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {service.appStoreUrl && (
                      <a href={service.appStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                        App Store
                      </a>
                    )}
                    {service.googlePlayUrl && (
                      <a href={service.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                        Google Play
                      </a>
                    )}
                    {service.webUrl && (
                      <a href={service.webUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                        Website
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section id="about" className="section container" style={{ borderTop: '1px solid var(--card-border)' }}>
          <h2 className="section-title">About Us</h2>
          <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>事業者情報</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem' }}>
              <strong style={{ color: 'var(--text-muted)' }}>事業者名</strong>
              <span>{profile.companyName}</span>
              
              <strong style={{ color: 'var(--text-muted)' }}>所在地</strong>
              <span>{profile.address || '設定されていません'}</span>

              {profile.email && (
                <>
                  <strong style={{ color: 'var(--text-muted)' }}>連絡先</strong>
                  <span>{profile.email}</span>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} {profile.companyName}. All rights reserved.</p>
      </footer>
    </>
  );
}
