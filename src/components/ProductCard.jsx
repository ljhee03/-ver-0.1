import { useNavigate } from 'react-router-dom';
import { getDday, getDdayLabel, getDdayColor, shouldShowDday } from '../utils/dateUtils';

export default function ProductCard({ product, cleanupMode, selected, onSelect }) {
  const navigate = useNavigate();
  const dday = getDday(product.expiryDate);
  const ddayLabel = getDdayLabel(dday);
  const ddayColor = getDdayColor(dday);
  const showDday = shouldShowDday(dday);
  const isZero = product.quantity === 0;

  const handleClick = () => {
    if (cleanupMode) {
      onSelect(product.id);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'relative',
        width: 76,
        minWidth: 76,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {cleanupMode && (
        <div style={{
          position: 'absolute',
          top: -4,
          left: -4,
          width: 20,
          height: 20,
          borderRadius: 4,
          border: `2px solid ${selected ? 'var(--accent)' : 'var(--border-color)'}`,
          background: selected ? 'var(--accent)' : 'var(--bg-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}>
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
      )}

      {showDday && (
        <div style={{
          position: 'absolute',
          top: -6,
          right: -6,
          background: ddayColor,
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 6px',
          borderRadius: 10,
          zIndex: 1,
          whiteSpace: 'nowrap',
        }}>
          {ddayLabel}
        </div>
      )}

      <div style={{
        width: 64,
        height: 64,
        borderRadius: 14,
        background: isZero ? 'var(--stock-zero)' : 'var(--bg-section)',
        border: isZero ? '2px solid var(--stock-zero-border)' : '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        transition: 'all 0.2s',
      }}>
        {product.image ? (
          <img src={product.image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 8 }} />
        ) : (
          <span style={{ fontSize: 14, color: 'var(--text-tertiary)' }}>
            {product.name.charAt(0)}
          </span>
        )}
      </div>

      <span style={{
        fontSize: 12,
        color: 'var(--text-primary)',
        textAlign: 'center',
        lineHeight: 1.2,
        maxWidth: 76,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {product.name}
      </span>
      <span style={{
        fontSize: 11,
        color: isZero ? 'var(--dday-0)' : 'var(--text-tertiary)',
        fontWeight: isZero ? 600 : 400,
      }}>
        {product.quantity}
      </span>
    </div>
  );
}
