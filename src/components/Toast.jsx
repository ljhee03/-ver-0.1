import { useEffect } from 'react';

export default function Toast({ message, onClose, duration = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      bottom: 100,
      transform: 'translateX(-50%)',
      background: 'rgba(30,30,34,0.92)',
      color: '#fff',
      padding: '11px 20px',
      borderRadius: 22,
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      animation: 'toastIn 0.25s ease',
      zIndex: 50,
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
    }}>
      {message}
    </div>
  );
}
