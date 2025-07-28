import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { DailySummaries } from './components/DailySummaries';
import { Books } from './components/Books';
import { Partners } from './components/Partners';
import { FreeMaterials } from './components/FreeMaterials';
import { AdminPanel } from './components/AdminPanel';
import { Navigation } from './components/Navigation';

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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;