import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Toast from '../components/Toast';
import { LOCATIONS } from '../utils/constants';
import { getDaysRemaining } from '../utils/dateUtils';

export default function ProductDetail({ itemId, onBack }) {
  const { items, updateItem, deleteItem } = useApp();
  const item = useMemo(() => items.find(i => i.id === itemId), [items, itemId]);

  const [editMode, setEditMode] = useState(false);
  const [draftName, setDraftName] = useState('');
  const [draftExp, setDraftExp] = useState('');
  const [toast, setToast] = useState(null);

  if (!item) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F3F6' }}>
        <div style={{ textAlign: 'center', color: '#9a9aa0' }}>
          <div style={{ fontSize: 14 }}>품목을 찾을 수 없습니다</div>
          <div onClick={onBack} style={{ marginTop: 16, color: '#3C8770', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
            돌아가기
          </div>
        </div>
      </div>
    );
  }

  const loc = LOCATIONS[item.loc];
  const accent = loc.accent;
  const body = loc.body;
  const days = getDaysRemaining(item.exp);

  let ddayStr = '';
  let ddayColor = '#8C8C92';
  if (days !== null) {
    if (days < 0) { ddayStr = (-days) + '일 지남'; ddayColor = '#D24A3F'; }
    else if (days === 0) { ddayStr = '오늘'; ddayColor = '#D94F44'; }
    else { ddayStr = 'D-' + days; if (days <= 3) ddayColor = '#C5781C'; }
  }

  const handleStartEdit = () => {
    setEditMode(true);
    setDraftName(item.name);
    setDraftExp(item.exp);
  };

  const handleCancelEdit = () => setEditMode(false);

  const handleSaveEdit = () => {
    updateItem(item.id, {
      name: draftName.trim() || item.name,
      exp: draftExp,
    });
    setEditMode(false);
    setToast('저장되었어요');
  };

  const handleDelete = () => {
    deleteItem(item.id);
    setToast('삭제했어요');
    setTimeout(onBack, 500);
  };

  const handleQtyChange = (d) => {
    updateItem(item.id, { qty: Math.max(0, item.qty + d) });
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: body,
    }}>
      <div style={{
        flexShrink: 0,
        padding: '48px 18px 6px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div
          onClick={onBack}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2b2b2e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#5a5a60' }}>
          {loc.name} · {item.cat}
        </div>
        <div
          onClick={handleDelete}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.75)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#D24A3F" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </div>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        padding: '14px 20px 20px',
        scrollbarWidth: 'none',
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{
            width: 96, height: 96, borderRadius: 28,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 50,
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}>
            {item.emoji}
          </div>
          {editMode ? (
            <input
              value={draftName}
              onChange={e => setDraftName(e.target.value)}
              style={{
                marginTop: 16, textAlign: 'center',
                fontSize: 22, fontWeight: 800,
                border: 'none', background: 'transparent',
                borderBottom: '2px solid rgba(0,0,0,0.15)',
                padding: '4px 8px', outline: 'none',
                color: '#2b2b2e', width: '65%',
              }}
            />
          ) : (
            <div style={{ marginTop: 16, fontSize: 23, fontWeight: 800, color: '#2b2b2e' }}>
              {item.name}
            </div>
          )}
        </div>

        <div style={{
          marginTop: 24, background: '#fff', borderRadius: 22,
          padding: '18px 22px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#9a9aa0', marginBottom: 14 }}>현재 수량</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              onClick={() => handleQtyChange(-1)}
              style={{
                width: 52, height: 52, borderRadius: 16,
                background: '#f1f1f4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, color: '#555', cursor: 'pointer',
              }}
            >−</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#1d1d20' }}>{item.qty}</div>
            <div
              onClick={() => handleQtyChange(1)}
              style={{
                width: 52, height: 52, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, color: '#fff', cursor: 'pointer',
                background: accent,
              }}
            >+</div>
          </div>
        </div>

        <div style={{
          marginTop: 14, background: '#fff', borderRadius: 22,
          padding: '6px 22px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 54, borderBottom: '1px solid #f1f1f4',
          }}>
            <span style={{ fontSize: 14, color: '#9a9aa0' }}>등록일</span>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: '#3a3a3c' }}>{item.reg}</span>
          </div>
          {editMode ? (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 54,
            }}>
              <span style={{ fontSize: 14, color: '#9a9aa0' }}>소비기한</span>
              <input
                type="date"
                value={draftExp}
                onChange={e => setDraftExp(e.target.value)}
                style={{
                  border: 'none', background: '#f3f3f6', borderRadius: 10,
                  padding: '7px 10px', fontSize: 14, color: '#3a3a3c', outline: 'none',
                }}
              />
            </div>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              height: 54,
            }}>
              <span style={{ fontSize: 14, color: '#9a9aa0' }}>소비기한</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#3a3a3c' }}>
                  {item.exp || '없음'}
                </span>
                {days !== null && (
                  <span style={{ fontSize: 13, fontWeight: 700, color: ddayColor }}>
                    {ddayStr}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        flexShrink: 0,
        padding: '14px 20px 28px',
        display: 'flex', gap: 10,
      }}>
        {editMode ? (
          <>
            <div
              onClick={handleCancelEdit}
              style={{
                flex: 1, height: 52, borderRadius: 16,
                background: '#fff', border: '1px solid #e6e6ea',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 700, color: '#555', cursor: 'pointer',
              }}
            >취소</div>
            <div
              onClick={handleSaveEdit}
              style={{
                flex: 1, height: 52, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer',
                background: accent,
              }}
            >저장</div>
          </>
        ) : (
          <>
            <div
              onClick={handleDelete}
              style={{
                flex: 1, height: 52, borderRadius: 16,
                background: '#fff', border: '1px solid #f0d9d7',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 700, color: '#D24A3F', cursor: 'pointer',
              }}
            >삭제</div>
            <div
              onClick={handleStartEdit}
              style={{
                flex: 1, height: 52, borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 800, color: '#fff', cursor: 'pointer',
                background: accent,
              }}
            >수정</div>
          </>
        )}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
