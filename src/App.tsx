import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ConfigProvider } from './contexts/ConfigContext';

import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { DailySummaries } from './components/DailySummaries';
import { Books } from './components/Books';
import { Partners } from './components/Partners';
import { FreeMaterials } from './components/FreeMaterials';
import { AdminPanel } from './components/AdminPanel';
import { Navigation } from './components/Navigation';
import { FloatingThemeToggle } from './components/FloatingThemeToggle';
// (se você criou Profile e Rifa e quiser listar nas views, importe aqui)
// import { Profile } from './components/Profile';
// import { Rifa } from './components/Rifa';

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (!user && !isAdmin) {
    return <Login />;
  }

  if (isAdmin) {
    return <AdminPanel />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'summaries':
        return <DailySummaries />;
      case 'books':
        return <Books />;
      case 'partners':
        return <Partners />;
      case 'materials':
        return <FreeMaterials />;
      // case 'profile':
      //   return <Profile />;
      // case 'rifa':
      //   return <Rifa />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    // Wrapper raiz: se preferir, você pode mover o ConfigProvider para o main.tsx,
    // mas use APENAS em um lugar (aqui OU no main), nunca os dois.
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      <ConfigProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ConfigProvider>

      {/* Botão flutuante de tema */}
      <FloatingThemeToggle />
    </div>
  );
}

export default App;
