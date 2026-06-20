import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import SectionCarousel from '../components/SectionCarousel';
import CleanupBar from '../components/CleanupBar';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { STORAGES, SECTIONS, SECTION_LABELS } from '../utils/constants';
import { isImminent } from '../utils/dateUtils';

export default function HomePage() {
  const navigate = useNavigate();
  const { products, settings, deleteProducts, getProductsByStorage, getImminentCount } = useApp();
  const [activeTab, setActiveTab] = useState(settings.defaultStorage || 'refrigerator');
  const [cleanupMode, setCleanupMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const storageProducts = useMemo(
    () => products.filter(p => p.storage === activeTab),
    [products, activeTab]
  );

  const productCount = storageProducts.length;
  const imminentCount = storageProducts.filter(p => isImminent(p.expiryDate)).length;

  const sections = SECTIONS[activeTab];
  const hasSections = sections && sections.length > 0;

  const handleSelect = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === storageProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(storageProducts.map(p => p.id)));
    }
  };

  const handleCleanupToggle = () => {
    if (cleanupMode) {
      setCleanupMode(false);
      setSelectedIds(new Set());
    } else {
      setCleanupMode(true);
    }
  };

  const handleDelete = () => {
    if (selectedIds.size > 0) {
      setShowConfirm(true);
    }
  };

  const confirmDelete = () => {
    deleteProducts([...selectedIds]);
    setShowConfirm(false);
    setCleanupMode(false);
    setSelectedIds(new Set());
    setToast('삭제가 완료되었습니다.');
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCleanupMode(false);
    setSelectedIds(new Set());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Header />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 20px 4px',
      }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
            {STORAGES[activeTab]?.label}
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            {productCount}개 품목 · 임박 {imminentCount}
          </div>
        </div>
        <button
          onClick={cleanupMode ? handleSelectAll : handleCleanupToggle}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            background: 'var(--bg-section)',
            border: '1px solid var(--border-color)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {cleanupMode ? '전체선택' : '정리'}
        </button>
      </div>

      <div className="page-container" style={{
        paddingBottom: cleanupMode ? 100 : 'calc(var(--nav-height) + 16px)',
        paddingTop: 12,
      }}>
        {hasSections ? (
          sections.map(section => {
            const sectionProducts = storageProducts.filter(p => p.section === section.value);
            return (
              <SectionCarousel
                key={section.value}
                title={section.label}
                products={sectionProducts}
                cleanupMode={cleanupMode}
                selectedIds={selectedIds}
                onSelect={handleSelect}
              />
            );
          })
        ) : (
          <SectionCarousel
            products={storageProducts}
            cleanupMode={cleanupMode}
            selectedIds={selectedIds}
            onSelect={handleSelect}
          />
        )}

        {!cleanupMode && (
          <div style={{ padding: '8px 20px 20px' }}>
            <button
              onClick={() => navigate('/add', { state: { defaultStorage: activeTab } })}
              style={{
                width: '100%',
                padding: '14px 0',
                borderRadius: 12,
                background: 'var(--accent)',
                color: 'var(--white)',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              추가 →
            </button>
          </div>
        )}
      </div>

      {cleanupMode ? (
        <CleanupBar
          selectedCount={selectedIds.size}
          onGoBack={handleCleanupToggle}
          onDelete={handleDelete}
        />
      ) : (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      )}

      {showConfirm && (
        <ConfirmModal
          message="선택한 항목을 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
