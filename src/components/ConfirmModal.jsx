export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9998, padding: 20,
    }}>
      <div style={{
        background: '#fff', borderRadius: 22,
        padding: '28px 24px 20px',
        width: '100%', maxWidth: 300,
        textAlign: 'center',
        boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
      }}>
        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 24, color: '#2b2b2e' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <div
            onClick={onCancel}
            style={{
              flex: 1, height: 48, borderRadius: 14,
              background: '#fff', border: '1px solid #e6e6ea',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: '#555', cursor: 'pointer',
            }}
          >취소</div>
          <div
            onClick={onConfirm}
            style={{
              flex: 1, height: 48, borderRadius: 14,
              background: '#2b2b2e', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}
          >확인</div>
        </div>
      </div>
    </div>
  );
}
