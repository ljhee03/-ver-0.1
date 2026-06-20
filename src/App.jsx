import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

function ThemeWrapper({ children }) {
  const { settings } = useApp();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.darkMode ? 'dark' : 'light');
  }, [settings.darkMode]);

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ThemeWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </ThemeWrapper>
      </AppProvider>
    </BrowserRouter>
  );
}
