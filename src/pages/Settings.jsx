import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ConfirmModal from '../components/ConfirmModal';
import Toast from '../components/Toast';
import { STORAGES, STORAGE_KEYS } from '../utils/constants';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings, resetData } = useApp();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  const handleDarkMode = () => {
    updateSettings({ darkMode: !settings.darkMode });
  };

  const handleDefaultStorage = (storage) => {
    updateSettings({ defaultStorage: storage });
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetData();
    setShowResetConfirm(false);
    setToast('데이터가 초기화되었습니다.');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: settings.darkMode ? 'var(--bg-primary)' : 'var(--bg-primary)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        height: 'var(--header-height)',
      }}>
        <button onClick={() => navigate('/')} style={{ padding: 4 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 17, fontWeight: 600, color: 'var(--text-primary)' }}>
          설정
        </span>
        <div style={{ width: 32 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>다크 모드</div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>어두운 테마로 전환합니다</div>
            </div>
            <button
              onClick={handleDarkMode}
              style={{
                width: 52,
                height: 28,
                borderRadius: 14,
                background: settings.darkMode ? 'var(--accent)' : 'var(--border-color)',
                position: 'relative',
                transition: 'background 0.3s',
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: 3,
                left: settings.darkMode ? 27 : 3,
                transition: 'left 0.3s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }} />
            </button>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <div style={{ padding: '16px 20px 8px' }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>기본 저장소</div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>앱 진입 시 처음 보여지는 저장소</div>
          </div>
          <div style={{ padding: '8px 20px 16px', display: 'flex', gap: 8 }}>
            {STORAGE_KEYS.map(key => (
              <button
                key={key}
                onClick={() => handleDefaultStorage(key)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 10,
                  border: settings.defaultStorage === key ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                  background: settings.defaultStorage === key ? 'var(--accent)' : 'transparent',
                  color: settings.defaultStorage === key ? 'var(--white)' : 'var(--text-primary)',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {STORAGES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          marginBottom: 16,
        }}>
          <button
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '16px 20px',
              textAlign: 'left',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--dday-0)',
            }}
          >
            데이터 초기화
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2, fontWeight: 400 }}>
              모든 데이터를 초기 상태로 되돌립니다
            </div>
          </button>
        </div>

        <div style={{
          textAlign: 'center',
          padding: '20px 0',
          color: 'var(--text-tertiary)',
          fontSize: 12,
        }}>
          재고노트 v1.0.0
        </div>
      </div>

      {showResetConfirm && (
        <ConfirmModal
          message="모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          onConfirm={confirmReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
