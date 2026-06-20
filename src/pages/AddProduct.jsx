import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Toast from '../components/Toast';
import { LOCATIONS, LOC_KEYS, ICONS, RECENT_SUGGESTIONS } from '../utils/constants';

export default function AddProduct({ tab, onBack }) {
  const { addItem } = useApp();
  const defaultLoc = tab === 'settings' ? 'fridge' : tab;

  const [loc, setLoc] = useState(defaultLoc);
  const [cat, setCat] = useState(LOCATIONS[defaultLoc].cats[0]);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('🥛');
  const [qty, setQty] = useState(1);
  const [exp, setExp] = useState('');
  const [toast, setToast] = useState(null);

  const accent = LOCATIONS[loc].accent;
  const body = LOCATIONS[loc].body;

  const handleLocChange = (newLoc) => {
    setLoc(newLoc);
    setCat(LOCATIONS[newLoc].cats[0]);
  };

  const handleSave = () => {
    if (!name.trim()) return;
    addItem({ loc, cat, name, emoji, qty, exp });
    setToast('저장되었어요');
    setTimeout(onBack, 500);
  };

  const isValid = name.trim().length > 0;

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      background: body,
    }}>
      <div style={{
        flexShrink: 0,
        padding: '48px 18px 6px',
        display: 'flex', alignItems: 'center', gap: 10,
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
        <div style={{ fontSize: 18, fontWeight: 800, color: '#2b2b2e' }}>새 품목 등록</div>
      </div>

      <div style={{
        flex: 1, overflowY: 'auto', minHeight: 0,
        padding: '8px 18px 18px',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0 2px' }}>
          <div style={{
            width: 76, height: 76, borderRadius: 23,
            background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40,
            boxShadow: '0 6px 18px rgba(0,0,0,0.07)',
          }}>
            {emoji}
          </div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '14px 2px 9px' }}>
          아이콘 선택
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ICONS.map(ic => (
            <div
              key={ic}
              onClick={() => setEmoji(ic)}
              style={{
                width: 43, height: 43, borderRadius: 13,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, cursor: 'pointer',
                background: ic === emoji ? '#fff' : 'rgba(255,255,255,0.55)',
                boxShadow: ic === emoji ? `0 0 0 2px ${accent} inset` : 'none',
              }}
            >
              {ic}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '20px 2px 9px' }}>
          품목 이름
        </div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="예: 우유"
          style={{
            width: '100%', height: 50, borderRadius: 15,
            border: 'none', background: '#fff',
            padding: '0 16px', fontSize: 15, color: '#2b2b2e',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 11 }}>
          {RECENT_SUGGESTIONS.map(r => (
            <div
              key={r.name}
              onClick={() => { setName(r.name); setEmoji(r.emoji); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '7px 13px', borderRadius: 18,
                background: 'rgba(255,255,255,0.7)',
                fontSize: 13, fontWeight: 600, color: '#76767c',
                cursor: 'pointer',
              }}
            >
              <span>{r.emoji}</span>
              <span>{r.name}</span>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '20px 2px 9px' }}>
          보관 장소
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {LOC_KEYS.map(key => (
            <div
              key={key}
              onClick={() => handleLocChange(key)}
              style={{
                flex: 1, height: 46, borderRadius: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 6, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                background: loc === key ? LOCATIONS[key].accent : 'rgba(255,255,255,0.7)',
                color: loc === key ? '#fff' : '#76767c',
              }}
            >
              <span>{LOCATIONS[key].emoji}</span>
              {LOCATIONS[key].name}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '20px 2px 9px' }}>
          분류
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {LOCATIONS[loc].cats.map(c => (
            <div
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: '10px 18px', borderRadius: 20,
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: cat === c ? accent : 'rgba(255,255,255,0.7)',
                color: cat === c ? '#fff' : '#76767c',
              }}
            >
              {c}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '20px 2px 9px' }}>
          수량
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#fff', borderRadius: 16, padding: 6,
          width: 'fit-content',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div
            onClick={() => setQty(q => Math.max(0, q - 1))}
            style={{
              width: 42, height: 42, borderRadius: 12,
              background: '#f1f1f4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: '#666', cursor: 'pointer',
            }}
          >−</div>
          <div style={{ width: 54, textAlign: 'center', fontSize: 19, fontWeight: 800, color: '#1d1d20' }}>
            {qty}
          </div>
          <div
            onClick={() => setQty(q => q + 1)}
            style={{
              width: 42, height: 42, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24, color: '#fff', cursor: 'pointer',
              background: accent,
            }}
          >+</div>
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#8a8a90', margin: '20px 2px 9px' }}>
          소비기한 (선택)
        </div>
        <input
          type="date"
          value={exp}
          onChange={e => setExp(e.target.value)}
          style={{
            width: '100%', height: 50, borderRadius: 15,
            border: 'none', background: '#fff',
            padding: '0 16px', fontSize: 15, color: '#555',
            outline: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}
        />
      </div>

      <div style={{ flexShrink: 0, padding: '14px 18px 26px' }}>
        <div
          onClick={handleSave}
          style={{
            width: '100%', height: 54, borderRadius: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, cursor: 'pointer',
            background: isValid ? accent : 'rgba(0,0,0,0.07)',
            color: isValid ? '#fff' : '#b0b0b4',
          }}
        >
          저장
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
