import { LOCATIONS } from '../utils/constants';

const TAB_ICONS = {
  fridge: (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="3"/>
      <line x1="6" y1="10" x2="18" y2="10"/>
      <line x1="9" y1="5.5" x2="9" y2="7.5"/>
      <line x1="9" y1="12.5" x2="9" y2="15"/>
    </svg>
  ),
  drawer: (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2.5"/>
      <line x1="4" y1="12" x2="20" y2="12"/>
      <line x1="10.5" y1="8" x2="13.5" y2="8"/>
      <line x1="10.5" y1="16" x2="13.5" y2="16"/>
    </svg>
  ),
  bathroom: (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 13h16"/>
      <path d="M5 13v2.5a3.5 3.5 0 0 0 3.5 3.5h7a3.5 3.5 0 0 0 3.5-3.5V13"/>
      <path d="M7 13V6.4A2.2 2.2 0 0 1 11.2 6"/>
      <line x1="8" y1="19.5" x2="7.2" y2="21.5"/>
      <line x1="16" y1="19.5" x2="16.8" y2="21.5"/>
    </svg>
  ),
  settings: (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3.2"/>
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"/>
    </svg>
  ),
};

const TABS = ['fridge', 'drawer', 'bathroom', 'settings'];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <div style={{
      flexShrink: 0,
      height: 74,
      background: 'rgba(255,255,255,0.94)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 10,
    }}>
      {TABS.map(key => {
        const isActive = key === activeTab;
        const color = isActive ? LOCATIONS[key].accent : '#9a9aa0';
        return (
          <div
            key={key}
            onClick={() => onTabChange(key)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              color,
            }}
          >
            {TAB_ICONS[key]}
            <span style={{ fontSize: 13, fontWeight: isActive ? 800 : 600 }}>
              {LOCATIONS[key].name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
