import { LOCATIONS } from '../utils/constants';

export default function Header({ tab, stats, organize, onToggleOrganize, onOpenNotif, urgentCount }) {
  const loc = LOCATIONS[tab];
  const isInventory = tab !== 'settings';

  return (
    <div style={{
      flexShrink: 0,
      padding: '12px 20px 16px',
      color: '#fff',
      background: `linear-gradient(160deg, ${loc.head}, ${loc.head2})`,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 9,
      }}>
        <div>
          {isInventory && (
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85, marginBottom: 3 }}>
              우리집 재고
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 24 }}>{loc.emoji}</span>
            <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>{loc.name}</span>
          </div>
        </div>
        {isInventory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              onClick={onToggleOrganize}
              style={{
                padding: '7px 13px',
                borderRadius: 13,
                background: 'rgba(255,255,255,0.2)',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {organize ? '완료' : '정리'}
            </div>
            <div
              onClick={onOpenNotif}
              style={{
                position: 'relative',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.7 21a2 2 0 0 1-3.4 0"/>
              </svg>
              {urgentCount > 0 && (
                <div style={{
                  position: 'absolute',
                  top: 8,
                  right: 9,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#FF5A4D',
                  border: '1.5px solid #fff',
                }} />
              )}
            </div>
          </div>
        )}
      </div>

      {isInventory && stats && (
        <div style={{ display: 'flex', gap: 8, marginTop: 17 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.16)', borderRadius: 15, padding: '11px 13px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>전체</div>
            <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3 }}>{stats.total}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.16)', borderRadius: 15, padding: '11px 13px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>부족·품절</div>
            <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3 }}>{stats.short}개</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.16)', borderRadius: 15, padding: '11px 13px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.85 }}>기한임박</div>
            <div style={{ fontSize: 19, fontWeight: 800, marginTop: 3 }}>{stats.soon}개</div>
          </div>
        </div>
      )}
    </div>
  );
}
