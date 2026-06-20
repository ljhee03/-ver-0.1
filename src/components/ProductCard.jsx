import { getDaysRemaining } from '../utils/dateUtils';

function getBadge(item) {
  if (item.qty === 0) return { text: '품절', style: 'background:#FBE0DD;color:#D24A3F;' };
  const d = getDaysRemaining(item.exp);
  if (d !== null && d <= 2) return { text: '임박', style: 'background:#FBE6C8;color:#C5781C;' };
  if (item.low) return { text: '부족', style: 'background:#EFE6D6;color:#977C49;' };
  return null;
}

function getSub(item) {
  const d = getDaysRemaining(item.exp);
  if (d === null) return null;
  let color = '#8C8C92';
  if (d <= 3) color = '#C5781C';
  if (d <= 1) color = '#D94F44';
  if (d <= 0) color = '#D24A3F';
  let text;
  if (d < 0) text = '소비기한 ' + (-d) + '일 지남';
  else if (d === 0) text = '오늘까지';
  else text = '소비기한 ' + d + '일 남음';
  return { text, color };
}

export default function ProductCard({ item, accent, organize, selected, onSelect, onDetail }) {
  const badge = getBadge(item);
  const sub = getSub(item);

  const handleClick = () => {
    if (organize) onSelect(item.id);
    else onDetail(item.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        background: '#fff',
        borderRadius: 18,
        padding: '11px 12px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 3px 12px rgba(40,40,45,0.05)',
        cursor: 'pointer',
        overflow: 'hidden',
        height: 96,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: '#f3f3f6',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 23, lineHeight: 1,
        }}>
          {item.emoji}
        </div>
        {badge && !organize && (
          <div style={{
            padding: '3px 8px', borderRadius: 8,
            fontSize: 13, fontWeight: 800, lineHeight: 1.3,
            ...parseInlineStyle(badge.style),
          }}>
            {badge.text}
          </div>
        )}
      </div>
      <div>
        <div style={{
          fontSize: 14.5, fontWeight: 700, color: '#2b2b2e',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {item.name}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 3, overflow: 'hidden' }}>
          <span style={{ fontSize: 19, fontWeight: 800, color: '#1d1d20', letterSpacing: -0.5, lineHeight: 1, flexShrink: 0 }}>
            {item.qty}
          </span>
          {sub && (
            <span style={{
              fontSize: 13, fontWeight: 600, lineHeight: 1,
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              color: sub.color,
            }}>
              {sub.text}
            </span>
          )}
        </div>
      </div>

      {organize && selected && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 18,
          pointerEvents: 'none',
          boxShadow: `0 0 0 2.5px ${accent} inset`,
        }} />
      )}

      {organize && (
        <div style={{
          position: 'absolute', top: 8, right: 8,
          width: 24, height: 24, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800,
          ...(selected
            ? { background: accent, color: '#fff' }
            : { background: 'rgba(255,255,255,0.92)', color: 'transparent', boxShadow: '0 0 0 2px #d4d4d8 inset' }
          ),
        }}>
          {selected ? '✓' : ''}
        </div>
      )}
    </div>
  );
}

function parseInlineStyle(str) {
  const obj = {};
  str.split(';').forEach(pair => {
    const [key, val] = pair.split(':');
    if (key && val) {
      const camel = key.trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      obj[camel] = val.trim();
    }
  });
  return obj;
}
