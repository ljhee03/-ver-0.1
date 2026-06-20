import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const { hasUnreadNotifications } = useApp();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      height: 'var(--header-height)',
      background: 'var(--bg-primary)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
        }}>
          <span style={{ color: 'var(--white)' }}>📦</span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
          재고노트
        </span>
      </div>

      <button
        onClick={() => navigate('/notifications')}
        style={{ position: 'relative', padding: 8 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {hasUnreadNotifications && (
          <div style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--notification-badge)',
          }} />
        )}
      </button>
    </div>
  );
}
