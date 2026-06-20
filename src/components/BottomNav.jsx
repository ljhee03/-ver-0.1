import { useNavigate } from 'react-router-dom';

const tabs = [
  { key: 'refrigerator', label: '냉장고', icon: '🧊' },
  { key: 'cabinet', label: '수납장', icon: '🗄️' },
  { key: 'bathroom', label: '화장실', icon: '🚿' },
  { key: 'settings', label: '설정', icon: '⚙️' },
];

export default function BottomNav({ activeTab, onTabChange }) {
  const navigate = useNavigate();

  const handleTab = (key) => {
    if (key === 'settings') {
      navigate('/settings');
    } else {
      onTabChange(key);
    }
  };

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      height: 'var(--nav-height)',
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => handleTab(tab.key)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '8px 0',
              minWidth: 64,
              opacity: isActive ? 1 : 0.5,
              transition: 'opacity 0.2s',
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{
              fontSize: 11,
              fontWeight: isActive ? 600 : 400,
              color: 'var(--text-primary)',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
