export default function CleanupBar({ selectedCount, onGoBack, onDelete }) {
  const hasSelected = selectedCount > 0;

  return (
    <div style={{
      position: 'absolute',
      left: 16, right: 16, bottom: 84,
      display: 'flex', gap: 10,
    }}>
      <div
        onClick={onGoBack}
        style={{
          flex: 1, height: 50, borderRadius: 16,
          background: '#fff', border: '1px solid #e6e6ea',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700, color: '#555',
          cursor: 'pointer',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        }}
      >
        돌아가기
      </div>
      <div
        onClick={onDelete}
        style={{
          flex: 1, height: 50, borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 15, fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          background: hasSelected ? '#E5544B' : '#ecd6d4',
          color: hasSelected ? '#fff' : '#c79a96',
        }}
      >
        {selectedCount}개 삭제
      </div>
    </div>
  );
}
