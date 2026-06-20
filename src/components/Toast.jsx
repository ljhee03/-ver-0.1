import { useEffect } from 'react';

export default function Toast({ message, onClose, duration = 2000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 100,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--toast-bg)',
      color: '#fff',
      padding: '12px 24px',
      borderRadius: 8,
      fontSize: 14,
      zIndex: 9999,
      animation: 'fadeInUp 0.3s ease',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      {message}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
