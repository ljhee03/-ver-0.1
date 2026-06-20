import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { STORAGES, SECTION_LABELS } from '../utils/constants';
import { formatDate, getDday, getDdayLabel, todayString } from '../utils/dateUtils';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, deleteProduct } = useApp();

  const product = useMemo(() => products.find(p => p.id === id), [products, id]);

  const [editMode, setEditMode] = useState(false);
  const [quantity, setQuantity] = useState(product?.quantity ?? 0);
  const [expiryDate, setExpiryDate] = useState(product?.expiryDate || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
        품목을 찾을 수 없습니다.
        <br />
        <button onClick={() => navigate('/')} style={{ marginTop: 16, color: 'var(--accent)', textDecoration: 'underline' }}>
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  const dday = getDday(expiryDate || product.expiryDate);
  const ddayLabel = getDdayLabel(dday);
  const storageLabel = STORAGES[product.storage]?.label || '';
  const sectionLabel = product.section ? SECTION_LABELS[product.section] : '';
  const locationStr = sectionLabel ? `${storageLabel} > ${sectionLabel}` : storageLabel;

  const handleStartEdit = () => {
    setQuantity(product.quantity);
    setExpiryDate(product.expiryDate || '');
    setEditMode(true);
  };

  const handleSave = () => {
    updateProduct(id, {
      quantity,
      expiryDate: expiryDate || null,
    });
    setEditMode(false);
    setToast('저장되었습니다.');
  };

  const handleCancelEdit = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    setShowCancelConfirm(false);
    setEditMode(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    deleteProduct(id);
    setShowDeleteConfirm(false);
    setToast('삭제가 완료되었습니다.');
    setTimeout(() => navigate('/'), 500);
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
          품목 상세
        </span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>
        <div style={{
          width: '100%',
          height: 200,
          borderRadius: 16,
          background: 'var(--bg-section)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          overflow: 'hidden',
        }}>
          {product.image ? (
            <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: 48, color: 'var(--text-tertiary)' }}>
              {product.name.charAt(0)}
            </span>
          )}
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{product.name}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{locationStr}</p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border-color)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>수량</span>
            {editMode ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => setQuantity(q => Math.max(0, q - 1))}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-section)',
                    fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  style={{
                    width: 48, textAlign: 'center', fontSize: 16, fontWeight: 600,
                    border: '1px solid var(--border-color)', borderRadius: 8,
                    padding: '4px 0', background: 'var(--bg-section)',
                  }}
                />
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-section)',
                    fontSize: 18,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >+</button>
              </div>
            ) : (
              <span style={{ fontSize: 16, fontWeight: 600 }}>{product.quantity}개</span>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border-color)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>등록일</span>
            <span style={{ fontSize: 14 }}>
              {editMode ? formatDate(todayString()) : formatDate(product.createdAt)}
            </span>
          </div>

          <div style={{ height: 1, background: 'var(--border-color)' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>유통기한</span>
            {editMode ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  style={{
                    fontSize: 14,
                    border: '1px solid var(--border-color)',
                    borderRadius: 8,
                    padding: '6px 10px',
                    background: 'var(--bg-section)',
                  }}
                />
                {expiryDate && dday !== null && (
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    ({ddayLabel})
                  </span>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>{formatDate(product.expiryDate)}</span>
                {product.expiryDate && dday !== null && (
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    ({ddayLabel})
                  </span>
                )}
              </div>
            )}
          </div>
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
        display: 'flex',
        gap: 12,
      }}>
        {editMode ? (
          <>
            <button
              onClick={handleCancelEdit}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)', fontSize: 15, fontWeight: 500,
              }}
            >취소</button>
            <button
              onClick={handleSave}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12,
                background: 'var(--accent)', color: 'var(--white)',
                fontSize: 15, fontWeight: 500,
              }}
            >저장</button>
          </>
        ) : (
          <>
            <button
              onClick={handleDelete}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12,
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)', fontSize: 15, fontWeight: 500,
                color: 'var(--dday-0)',
              }}
            >삭제</button>
            <button
              onClick={handleStartEdit}
              style={{
                flex: 1, padding: '14px 0', borderRadius: 12,
                background: 'var(--accent)', color: 'var(--white)',
                fontSize: 15, fontWeight: 500,
              }}
            >수정</button>
          </>
        )}
      </div>

      {showDeleteConfirm && (
        <ConfirmModal
          message="해당 항목을 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {showCancelConfirm && (
        <ConfirmModal
          message="이전 화면으로 돌아가시겠습니까?"
          onConfirm={confirmCancel}
          onCancel={() => setShowCancelConfirm(false)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
