import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ConfigProvider } from './contexts/ConfigContext';
import { LinksProvider } from './contexts/LinksContext';

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
import { Profile } from './components/Profile';
import { Raffle } from './components/Raffle';
import { RaffleProvider } from './contexts/RaffleContext';


function AppContent() {
  const { user, isAdmin, hydrated } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  // evita "piscar" login antes de hidratar
  if (!hydrated) return null;

  if (!user && !isAdmin) return <Login />;
  if (isAdmin) return <AdminPanel />;

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
      case 'raffle':
        return <Raffle />;
      case 'profile':
        return <Profile />;
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

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      <ConfigProvider>
        <LinksProvider>
          <RaffleProvider>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </RaffleProvider>
        </LinksProvider>
      </ConfigProvider>

      <FloatingThemeToggle />
    </div>
  );
}


