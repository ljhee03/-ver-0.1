import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SAMPLE_DATA } from '../utils/constants';
import { generateId, todayString, isImminent, isDepleted } from '../utils/dateUtils';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [products, setProducts] = useLocalStorage('inventory-products', SAMPLE_DATA);
  const [settings, setSettings] = useLocalStorage('inventory-settings', {
    darkMode: false,
    defaultStorage: 'refrigerator',
    notifications: true,
  });
  const [notifications, setNotifications] = useLocalStorage('inventory-notifications', []);
  const [recentNames, setRecentNames] = useLocalStorage('inventory-recent-names', []);

  const addProduct = useCallback((product) => {
    const newProduct = {
      ...product,
      id: generateId(),
      createdAt: todayString(),
    };
    setProducts(prev => [...prev, newProduct]);

    setRecentNames(prev => {
      const filtered = prev.filter(n => n !== product.name);
      return [product.name, ...filtered].slice(0, 10);
    });

    return newProduct;
  }, [setProducts, setRecentNames]);

  const updateProduct = useCallback((id, updates) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, ...updates, createdAt: todayString() } : p)
    );
  }, [setProducts]);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, [setProducts]);

  const deleteProducts = useCallback((ids) => {
    setProducts(prev => prev.filter(p => !ids.includes(p.id)));
  }, [setProducts]);

  const getProductsByStorage = useCallback((storage) => {
    return products.filter(p => p.storage === storage);
  }, [products]);

  const getImminentCount = useCallback((storage) => {
    return products.filter(p => p.storage === storage && isImminent(p.expiryDate)).length;
  }, [products]);

  const getDepletedCount = useCallback((storage) => {
    return products.filter(p => p.storage === storage && isDepleted(p.quantity)).length;
  }, [products]);

  const updateSettings = useCallback((updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [{
      ...notification,
      id: generateId(),
      date: todayString(),
      read: false,
    }, ...prev]);
  }, [setNotifications]);

  const markNotificationRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, [setNotifications]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [setNotifications]);

  const hasUnreadNotifications = notifications.some(n => !n.read);

  const resetData = useCallback(() => {
    setProducts(SAMPLE_DATA);
    setNotifications([]);
    setRecentNames([]);
  }, [setProducts, setNotifications, setRecentNames]);

  const value = {
    products,
    settings,
    notifications,
    recentNames,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteProducts,
    getProductsByStorage,
    getImminentCount,
    getDepletedCount,
    updateSettings,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    hasUnreadNotifications,
    resetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
