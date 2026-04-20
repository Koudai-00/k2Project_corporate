export default function AdminDashboard() {
  return (
    <div>
      <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '2rem' }}>Dashboard</h1>
      <div className="glass" style={{ padding: '2rem' }}>
        <p>K2_Project 管理画面へようこそ。</p>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
          左のメニューから、公開しているサービス一覧の編集や、プロフィール情報（所在地など）の更新を行えます。
        </p>
      </div>
    </div>
  );
}
