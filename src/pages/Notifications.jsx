import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { isImminent, isDepleted, todayString, generateId } from '../utils/dateUtils';

const TABS = [
  { key: 'all', label: '전체' },
  { key: 'imminent', label: '임박' },
  { key: 'depleted', label: '소진' },
];

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, products, addNotification, markAllNotificationsRead } = useApp();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const today = todayString();
    const existingToday = notifications.filter(n => n.date === today);

    products.forEach(p => {
      if (isImminent(p.expiryDate)) {
        const already = existingToday.find(n => n.productId === p.id && n.type === 'imminent');
        if (!already) {
          addNotification({
            productId: p.id,
            productName: p.name,
            type: 'imminent',
            message: `${p.name}의 소비기한이 임박했습니다.`,
          });
        }
      }
      if (isDepleted(p.quantity)) {
        const already = existingToday.find(n => n.productId === p.id && n.type === 'depleted');
        if (!already) {
          addNotification({
            productId: p.id,
            productName: p.name,
            type: 'depleted',
            message: `${p.name}의 재고가 소진되었습니다.`,
          });
        }
      }
    });

    markAllNotificationsRead();
  }, []);

  const today = todayString();
  const sevenDaysAgo = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  })();

  const filtered = useMemo(() => {
    let list = notifications.filter(n => n.date >= sevenDaysAgo);
    if (activeTab === 'imminent') list = list.filter(n => n.type === 'imminent');
    if (activeTab === 'depleted') list = list.filter(n => n.type === 'depleted');
    return list;
  }, [notifications, activeTab, sevenDaysAgo]);

  const todayNotifs = filtered.filter(n => n.date === today);
  const olderNotifs = filtered.filter(n => n.date !== today);

  const renderSection = (title, items) => {
    if (items.length === 0) return null;
    return (
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-secondary)',
          padding: '0 0 8px',
        }}>
          {title}
        </div>
        {items.map(n => (
          <div
            key={n.id}
            style={{
              padding: '14px 16px',
              background: 'var(--bg-card)',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              marginBottom: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: 11,
                padding: '2px 8px',
                borderRadius: 10,
                background: n.type === 'imminent' ? 'var(--dday-1)' : 'var(--dday-0)',
                color: '#fff',
                fontWeight: 600,
              }}>
                {n.type === 'imminent' ? '임박' : '소진'}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{n.date}</span>
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{n.message}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        height: 'var(--header-height)',
      }}>
        <button onClick={() => navigate(-1)} style={{ padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 600 }}>알림</span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px' }}>
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 10,
              border: activeTab === tab.key ? '2px solid var(--accent)' : '1px solid var(--border-color)',
              background: activeTab === tab.key ? 'var(--accent)' : 'var(--bg-card)',
              color: activeTab === tab.key ? 'var(--white)' : 'var(--text-primary)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 20px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-tertiary)', fontSize: 14 }}>
            알림이 없습니다.
          </div>
        ) : (
          <>
            {renderSection('오늘', todayNotifs)}
            {renderSection('이전', olderNotifs)}
          </>
        )}
      </div>
    </div>
  );
}
