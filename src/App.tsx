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
import { FloatingThemeToggle } from './components/FloatingThemeToggle';

function AppContent() {
  const { user, isAdmin } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  if (!user && !isAdmin) {
    return <Login />;
  }

  if (isAdmin) {
    // Admin também herda o tema do wrapper
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
    // Wrapper que aplica cores base para claro/escuro
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      <AuthProvider>
        <AppContent />
      </AuthProvider>

      {/* Botão flutuante de tema (fica sempre disponível) */}
      <FloatingThemeToggle />
    </div>
  );
}

export default App;
