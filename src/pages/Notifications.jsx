import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LOCATIONS } from '../utils/constants';
import { getDaysRemaining } from '../utils/dateUtils';

export default function Notifications({ onBack, onOpenDetail }) {
  const { items } = useApp();
  const [filter, setFilter] = useState('all');

  const { groups, empty } = useMemo(() => {
    const list = [];

    items.forEach(it => {
      const days = getDaysRemaining(it.exp);
      if (days !== null && days <= 7) {
        list.push({ kind: 'soon', urg: days, it });
      }
      if (it.qty === 0) {
        list.push({ kind: 'out', urg: -2, it });
      } else if (it.low) {
        list.push({ kind: 'low', urg: -1, it });
      }
    });

    let filtered = list;
    if (filter === 'soon') filtered = list.filter(x => x.kind === 'soon');
    if (filter === 'gone') filtered = list.filter(x => x.kind !== 'soon');
    filtered.sort((a, b) => a.urg - b.urg);

    const buckets = { '오늘': [], '최근 7일': [] };
    filtered.forEach(x => {
      const { it, kind } = x;
      const loc = LOCATIONS[it.loc];
      let title, sub, badge, badgeStyle;

      if (kind === 'soon') {
        const d = getDaysRemaining(it.exp);
        title = it.name + ' 소비기한 임박';
        sub = '소비기한 ' + d + '일 남음';
        badge = 'D-' + d;
        badgeStyle = { background: '#FBE6C8', color: '#C5781C' };
      } else if (kind === 'out') {
        title = it.name + ' 재고 소진';
        sub = '재고가 모두 떨어졌어요';
        badge = '소진';
        badgeStyle = { background: '#FBE0DD', color: '#D24A3F' };
      } else {
        title = it.name + ' 재고 부족';
        sub = '재고가 얼마 남지 않았어요';
        badge = '부족';
        badgeStyle = { background: '#EFE6D6', color: '#977C49' };
      }

      const card = {
        id: it.id + '-' + kind,
        itemId: it.id,
        emoji: it.emoji,
        title,
        sub,
        badge,
        badgeStyle,
        locTag: loc.name,
      };

      if (x.urg <= 2) buckets['오늘'].push(card);
      else buckets['최근 7일'].push(card);
    });

    const groups = ['오늘', '최근 7일']
      .filter(key => buckets[key].length > 0)
      .map(key => ({ title: key, items: buckets[key] }));

    return { groups, empty: groups.length === 0 };
  }, [items, filter]);

  const filterBtn = (key, label) => ({
    onClick: () => setFilter(key),
    style: {
      padding: '8px 18px', borderRadius: 18,
      fontSize: 13, fontWeight: 700, cursor: 'pointer',
      background: filter === key ? '#2b2b2e' : '#fff',
      color: filter === key ? '#fff' : '#76767c',
    },
  });

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: '#F4F4F7',
    }}>
      <div style={{
        flexShrink: 0,
        padding: '48px 18px 10px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div
          onClick={onBack}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b2b2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#2b2b2e' }}>알림</div>
      </div>

      <div style={{ flexShrink: 0, display: 'flex', gap: 8, padding: '6px 18px 12px' }}>
        <div {...filterBtn('all', '전체')}>전체</div>
        <div {...filterBtn('soon', '임박')}>임박</div>
        <div {...filterBtn('gone', '소진')}>소진</div>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        padding: '4px 16px 24px',
        scrollbarWidth: 'none',
      }}>
        {groups.map(g => (
          <div key={g.title}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#9a9aa2', margin: '12px 6px 9px' }}>
              {g.title}
            </div>
            {g.items.map(n => (
              <div
                key={n.id}
                onClick={() => onOpenDetail(n.itemId)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 13,
                  background: '#fff', borderRadius: 18, padding: 14,
                  marginBottom: 10,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  cursor: 'pointer',
                  animation: 'fadeUp 0.3s ease',
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 13,
                  background: '#f3f3f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>
                  {n.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14.5, fontWeight: 700, color: '#2b2b2e',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#a0a0a6', marginTop: 3 }}>
                    {n.sub} · {n.locTag}
                  </div>
                </div>
                <div style={{
                  padding: '5px 11px', borderRadius: 10,
                  fontSize: 13, fontWeight: 800, flexShrink: 0,
                  ...n.badgeStyle,
                }}>
                  {n.badge}
                </div>
              </div>
            ))}
          </div>
        ))}
        {empty && (
          <div style={{ textAlign: 'center', color: '#b0b0b6', fontSize: 14, marginTop: 80 }}>
            새로운 알림이 없어요
          </div>
        )}
      </div>
    </div>
  );
}
