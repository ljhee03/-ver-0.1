import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RecentItems from '../components/RecentItems';
import Toast from '../components/Toast';
import { STORAGES, SECTIONS, STORAGE_KEYS } from '../utils/constants';

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addProduct, recentNames } = useApp();
  const fileInputRef = useRef(null);

  const defaultStorage = location.state?.defaultStorage || 'refrigerator';

  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [storage, setStorage] = useState(defaultStorage);
  const [section, setSection] = useState(SECTIONS[defaultStorage]?.[0]?.value || null);
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState('');
  const [toast, setToast] = useState(null);

  const sections = SECTIONS[storage] || [];
  const hasSections = sections.length > 0;

  const isValid = name.trim() && storage && (!hasSections || section);

  const handleStorageChange = (newStorage) => {
    setStorage(newStorage);
    const newSections = SECTIONS[newStorage] || [];
    setSection(newSections.length > 0 ? newSections[0].value : null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!isValid) return;
    addProduct({
      name: name.trim(),
      image,
      storage,
      section: hasSections ? section : null,
      quantity,
      expiryDate: expiryDate || null,
      memo: '',
    });
    setToast('저장되었습니다.');
    setTimeout(() => navigate('/'), 500);
  };

  const handleRecentSelect = (selectedName) => {
    setName(selectedName);
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
        <span style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 600 }}>
          새 품목 등록
        </span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 120px' }}>
        {/* 사진 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            사진 <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(선택)</span>
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              height: 160,
              borderRadius: 14,
              background: 'var(--bg-section)',
              border: '2px dashed var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            {image ? (
              <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <div style={{ fontSize: 12, marginTop: 4 }}>탭하여 사진 추가</div>
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
        </div>

        {/* 최근 등록 품목 */}
        <RecentItems names={recentNames} onSelect={handleRecentSelect} />

        {/* 품목명 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            품목명 <span style={{ color: 'var(--dday-0)' }}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="품목명을 입력하세요"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              fontSize: 15,
              outline: 'none',
            }}
          />
        </div>

        {/* 저장소 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            저장소 <span style={{ color: 'var(--dday-0)' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {STORAGE_KEYS.map(key => (
              <button
                key={key}
                onClick={() => handleStorageChange(key)}
                style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 10,
                  border: storage === key ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  background: storage === key ? 'var(--accent)' : 'var(--bg-card)',
                  color: storage === key ? 'var(--white)' : 'var(--text-primary)',
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {STORAGES[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* 구분 */}
        {hasSections && (
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
              구분 <span style={{ color: 'var(--dday-0)' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {sections.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSection(s.value)}
                  style={{
                    flex: sections.length <= 3 ? 1 : 'none',
                    padding: '12px 16px',
                    borderRadius: 10,
                    border: section === s.value ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                    background: section === s.value ? 'var(--accent)' : 'var(--bg-card)',
                    color: section === s.value ? 'var(--white)' : 'var(--text-primary)',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 수량 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            수량 <span style={{ color: 'var(--dday-0)' }}>*</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setQuantity(q => Math.max(0, q - 1))}
              style={{
                width: 44, height: 44, borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-section)',
                fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >−</button>
            <input
              type="number"
              value={quantity}
              onChange={e => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: 64, textAlign: 'center', fontSize: 18, fontWeight: 600,
                border: '1px solid var(--border-color)', borderRadius: 10,
                padding: '10px 0', background: 'var(--bg-card)',
              }}
            />
            <button
              onClick={() => setQuantity(q => q + 1)}
              style={{
                width: 44, height: 44, borderRadius: 10,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-section)',
                fontSize: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >+</button>
          </div>
        </div>

        {/* 소비기한 */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8, display: 'block' }}>
            소비기한 <span style={{ fontWeight: 400, color: 'var(--text-tertiary)' }}>(선택)</span>
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 12,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              fontSize: 15,
            }}
          />
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 430,
        padding: '12px 20px',
        paddingBottom: 24,
        background: 'var(--bg-primary)',
      }}>
        <button
          onClick={handleSave}
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '16px 0',
            borderRadius: 12,
            background: isValid ? 'var(--accent)' : 'var(--border-color)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            opacity: isValid ? 1 : 0.5,
          }}
        >
          저장
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
