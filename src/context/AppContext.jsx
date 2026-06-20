import { createContext, useContext, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { buildSampleData } from '../utils/constants';
import { getDaysRemaining, todayString } from '../utils/dateUtils';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [items, setItems] = useLocalStorage('inv-items', buildSampleData());
  const [settings, setSettings] = useLocalStorage('inv-settings', {
    expAlert: true,
    lowAlert: true,
  });

  const nextId = useRef(items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1);

  const addItem = useCallback((item) => {
    const id = nextId.current++;
    const newItem = {
      id,
      loc: item.loc,
      cat: item.cat,
      name: item.name.trim(),
      emoji: item.emoji,
      qty: item.qty,
      low: item.qty > 0 && item.qty <= 1,
      reg: todayString(),
      exp: item.exp || '',
    };
    setItems(prev => [...prev, newItem]);
    return newItem;
  }, [setItems]);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  }, [setItems]);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, [setItems]);

  const deleteItems = useCallback((ids) => {
    const idSet = new Set(ids);
    setItems(prev => prev.filter(i => !idSet.has(i.id)));
  }, [setItems]);

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const resetData = useCallback(() => {
    setItems(buildSampleData());
  }, [setItems]);

  const getItemsForLoc = useCallback((loc, cat) => {
    return items.filter(i => i.loc === loc && i.cat === cat);
  }, [items]);

  const getStats = useCallback((loc) => {
    const its = items.filter(i => i.loc === loc);
    return {
      total: its.length,
      short: its.filter(i => i.qty === 0 || i.low).length,
      soon: its.filter(i => {
        const d = getDaysRemaining(i.exp);
        return d !== null && d <= 2;
      }).length,
    };
  }, [items]);

  const getUrgentCount = useCallback(() => {
    return items.filter(i => {
      if (i.qty === 0) return true;
      const d = getDaysRemaining(i.exp);
      return d !== null && d <= 2;
    }).length;
  }, [items]);

  const value = {
    items,
    settings,
    addItem,
    updateItem,
    deleteItem,
    deleteItems,
    updateSettings,
    resetData,
    getItemsForLoc,
    getStats,
    getUrgentCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
