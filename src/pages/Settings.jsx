import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Toast from '../components/Toast';

export default function SettingsPanel() {
  const { settings, updateSettings, resetData } = useApp();
  const [toast, setToast] = useState(null);

  return (
    <div style={{
      flex: 1, overflowY: 'auto', minHeight: 0,
      padding: '20px 16px 96px',
      scrollbarWidth: 'none',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#9a9aa2', margin: '0 6px 9px' }}>알림</div>
      <div style={{
        background: '#fff', borderRadius: 18, padding: '4px 18px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: 22,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, borderBottom: '1px solid #f1f1f4',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>소비기한 임박 알림</div>
            <div style={{ fontSize: 13, color: '#a8a8ae', marginTop: 2 }}>D-2부터 앱푸시 발송</div>
          </div>
          <Toggle
            active={settings.expAlert}
            onToggle={() => updateSettings({ expAlert: !settings.expAlert })}
          />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, borderBottom: '1px solid #f1f1f4',
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>재고 소진 알림</div>
            <div style={{ fontSize: 13, color: '#a8a8ae', marginTop: 2 }}>재고 1개부터 앱푸시 발송</div>
          </div>
          <Toggle
            active={settings.lowAlert}
            onToggle={() => updateSettings({ lowAlert: !settings.lowAlert })}
          />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, cursor: 'pointer',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>정기 알림 시간</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, color: '#9a9aa2' }}>오전 9:00</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4c4cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: '#9a9aa2', margin: '0 6px 9px' }}>저장소</div>
      <div style={{
        background: '#fff', borderRadius: 18, padding: '4px 18px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)', marginBottom: 22,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, borderBottom: '1px solid #f1f1f4', cursor: 'pointer',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>기본 저장소</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, color: '#9a9aa2' }}>냉장고</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4c4cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18"/>
            </svg>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56, borderBottom: '1px solid #f1f1f4', cursor: 'pointer',
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>냉장고 공유하기</div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c4c4cc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18"/>
          </svg>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 56,
        }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#2b2b2e' }}>버전</div>
          <span style={{ fontSize: 14, color: '#a8a8ae' }}>1.0.0</span>
        </div>
      </div>

      <div style={{
        background: '#fff', borderRadius: 18, padding: '4px 18px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
      }}>
        <div
          onClick={() => { resetData(); setToast('데이터가 초기화되었습니다'); }}
          style={{ display: 'flex', alignItems: 'center', height: 56, cursor: 'pointer' }}
        >
          <div style={{ fontSize: 15, fontWeight: 600, color: '#D24A3F' }}>데이터 초기화</div>
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function Toggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        width: 46, height: 28, borderRadius: 14,
        position: 'relative',
        transition: '0.2s',
        cursor: 'pointer',
        flexShrink: 0,
        background: active ? '#9A9AA6' : '#d6d6dc',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        width: 22, height: 22,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: '0.2s',
        left: active ? 21 : 3,
      }} />
    </div>
  );
}
