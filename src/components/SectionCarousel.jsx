import ProductCard from './ProductCard';
import { isImminent } from '../utils/dateUtils';

export default function SectionCarousel({ title, products, cleanupMode, selectedIds, onSelect }) {
  const sorted = [...products].sort((a, b) => {
    const aImminent = isImminent(a.expiryDate);
    const bImminent = isImminent(b.expiryDate);
    if (aImminent && !bImminent) return -1;
    if (!aImminent && bImminent) return 1;
    return a.name.localeCompare(b.name, 'ko');
  });

  if (sorted.length === 0) return null;

  return (
    <div style={{ marginBottom: 20 }}>
      {title && (
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--text-secondary)',
          padding: '0 20px',
          marginBottom: 12,
        }}>
          {title}
        </div>
      )}
      <div style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingLeft: 20,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 4,
        scrollSnapType: 'x mandatory',
      }}>
        {sorted.map(product => (
          <div key={product.id} style={{ scrollSnapAlign: 'start' }}>
            <ProductCard
              product={product}
              cleanupMode={cleanupMode}
              selected={selectedIds.has(product.id)}
              onSelect={onSelect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
