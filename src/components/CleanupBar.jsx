export default function CleanupBar({ selectedCount, onGoBack, onDelete }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 430,
      padding: '12px 20px',
      paddingBottom: 24,
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-color)',
      display: 'flex',
      gap: 12,
      zIndex: 101,
    }}>
      <button
        onClick={onGoBack}
        style={{
          flex: 1,
          padding: '14px 0',
          borderRadius: 12,
          border: '1px solid var(--border-color)',
          background: 'var(--bg-card)',
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--text-primary)',
        }}
      >
        돌아가기
      </button>
      <button
        onClick={onDelete}
        disabled={selectedCount === 0}
        style={{
          flex: 1,
          padding: '14px 0',
          borderRadius: 12,
          background: selectedCount > 0 ? 'var(--dday-0)' : 'var(--border-color)',
          color: '#fff',
          fontSize: 15,
          fontWeight: 500,
          opacity: selectedCount > 0 ? 1 : 0.5,
        }}
      >
        {selectedCount > 0 ? `${selectedCount}개 삭제` : '삭제'}
      </button>
    </div>
  );
}
