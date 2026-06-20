export default function RecentItems({ names, onSelect }) {
  if (!names || names.length === 0) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        marginBottom: 10,
      }}>
        최근 등록한 품목
      </div>
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
      }}>
        {names.map((name, i) => (
          <button
            key={i}
            onClick={() => onSelect(name)}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              background: 'var(--bg-section)',
              border: '1px solid var(--border-color)',
              fontSize: 13,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
