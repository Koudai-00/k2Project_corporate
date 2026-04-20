"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <aside style={{ width: '250px', background: 'var(--nav-bg)', borderRight: '1px solid var(--card-border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: 600 }}>Admin Panel</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Link href="/admin" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
            Dashboard
          </Link>
          <Link href="/admin/services" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
            Services
          </Link>
          <Link href="/admin/profile" className="btn btn-outline" style={{ justifyContent: 'flex-start', border: 'none' }}>
            Profile
          </Link>
        </nav>
        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button onClick={handleLogout} className="btn btn-danger" style={{ width: '100%' }}>
            Logout
          </button>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>View Site</Link>
          </div>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '3rem', background: 'var(--bg-color)', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
