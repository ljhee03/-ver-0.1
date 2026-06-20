import { useState, useCallback } from 'react';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import AddProduct from './pages/AddProduct';
import ProductDetail from './pages/ProductDetail';
import Notifications from './pages/Notifications';

function AppInner() {
  const [screen, setScreen] = useState('main');
  const [tab, setTab] = useState('fridge');
  const [detailId, setDetailId] = useState(null);

  const openAdd = useCallback(() => setScreen('add'), []);
  const openDetail = useCallback((id) => {
    setDetailId(id);
    setScreen('detail');
  }, []);
  const openNotif = useCallback(() => setScreen('notif'), []);
  const goMain = useCallback(() => setScreen('main'), []);

  if (screen === 'add') {
    return <AddProduct tab={tab} onBack={goMain} />;
  }
  if (screen === 'detail') {
    return <ProductDetail itemId={detailId} onBack={goMain} />;
  }
  if (screen === 'notif') {
    return <Notifications onBack={goMain} onOpenDetail={openDetail} />;
  }

  return (
    <HomePage
      tab={tab}
      onTabChange={setTab}
      onOpenAdd={openAdd}
      onOpenDetail={openDetail}
      onOpenNotif={openNotif}
    />
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
