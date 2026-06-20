import { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SectionCarousel from '../components/SectionCarousel';
import CleanupBar from '../components/CleanupBar';
import Toast from '../components/Toast';
import SettingsPanel from '../pages/Settings';
import { LOCATIONS } from '../utils/constants';

export default function HomePage({ tab, onTabChange, onOpenAdd, onOpenDetail, onOpenNotif }) {
  const { getStats, getItemsForLoc, deleteItems, getUrgentCount } = useApp();
  const [organize, setOrganize] = useState(false);
  const [selectedIds, setSelectedIds] = useState({});
  const [toast, setToast] = useState(null);

  const loc = LOCATIONS[tab];
  const isInventory = tab !== 'settings';
  const stats = isInventory ? getStats(tab) : null;
  const urgentCount = getUrgentCount();

  const toggleOrganize = useCallback(() => {
    setOrganize(prev => !prev);
    setSelectedIds({});
  }, []);

  const handleSelect = useCallback((id) => {
    setSelectedIds(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, []);

  const handleDelete = useCallback(() => {
    const ids = Object.keys(selectedIds).map(Number);
    if (ids.length === 0) return;
    deleteItems(ids);
    setOrganize(false);
    setSelectedIds({});
    setToast(ids.length + '개 품목을 삭제했어요');
  }, [selectedIds, deleteItems]);

  const handleTabChange = useCallback((key) => {
    onTabChange(key);
    setOrganize(false);
    setSelectedIds({});
  }, [onTabChange]);

  const selectedCount = Object.keys(selectedIds).length;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: loc.body,
    }}>
      <Header
        tab={tab}
        stats={stats}
        organize={organize}
        onToggleOrganize={toggleOrganize}
        onOpenNotif={onOpenNotif}
        urgentCount={urgentCount}
      />

      {isInventory && (
        <div style={{
          flex: 1, overflowY: 'auto', minHeight: 0,
          padding: '18px 16px 96px',
          scrollbarWidth: 'none',
        }}>
          {loc.cats.map((cat) => {
            const items = getItemsForLoc(tab, cat);
            return (
              <SectionCarousel
                key={cat}
                catName={cat}
                items={items}
                perPage={loc.per}
                accent={loc.accent}
                organize={organize}
                selectedIds={selectedIds}
                onSelect={handleSelect}
                onDetail={onOpenDetail}
              />
            );
          })}
        </div>
      )}

      {!isInventory && <SettingsPanel />}

      {isInventory && !organize && (
        <div
          onClick={onOpenAdd}
          style={{
            position: 'absolute',
            right: 20, bottom: 88,
            width: 56, height: 56, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            background: loc.accent,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </div>
      )}

      {organize && (
        <CleanupBar
          selectedCount={selectedCount}
          onGoBack={toggleOrganize}
          onDelete={handleDelete}
        />
      )}

      <BottomNav activeTab={tab} onTabChange={handleTabChange} />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
