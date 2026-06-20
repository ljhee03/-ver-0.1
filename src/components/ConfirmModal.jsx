export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9998,
      padding: 20,
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 16,
        padding: '28px 24px 20px',
        width: '100%',
        maxWidth: 300,
        textAlign: 'center',
      }}>
        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24, color: 'var(--text-primary)' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 10,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '12px 0',
              borderRadius: 10,
              background: 'var(--accent)',
              color: 'var(--white)',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
