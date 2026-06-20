import { useState, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';

export default function SectionCarousel({
  catName, items, perPage, accent, organize, selectedIds, onSelect, onDetail,
}) {
  const [activePage, setActivePage] = useState(0);
  const scrollRef = useRef(null);

  const pages = [];
  for (let i = 0; i < items.length; i += perPage) {
    pages.push(items.slice(i, i + perPage));
  }
  if (pages.length === 0) pages.push([]);

  const handleScroll = useCallback((e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActivePage(idx);
  }, []);

  const scrollToPage = useCallback((idx) => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' });
    setActivePage(idx);
  }, []);

  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 4px 11px' }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#3a3a3c' }}>{catName}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#a3a3a8' }}>{items.length}개</div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          margin: '0 -2px',
        }}
      >
        {pages.map((page, pi) => (
          <div key={pi} style={{ flex: '0 0 100%', scrollSnapAlign: 'start', padding: '0 2px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {page.map(item => (
                <ProductCard
                  key={item.id}
                  item={item}
                  accent={accent}
                  organize={organize}
                  selected={!!selectedIds[item.id]}
                  onSelect={onSelect}
                  onDetail={onDetail}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          {pages.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToPage(i)}
              style={{
                width: i === activePage ? 18 : 6,
                height: 6,
                borderRadius: 3,
                background: i === activePage ? accent : 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
