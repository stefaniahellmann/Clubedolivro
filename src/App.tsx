// src/App.tsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
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
    <ThemeProvider>
      {/* Wrapper com transição suave + cores base claro/escuro */}
      <div className="min-h-screen theme-smooth bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
        <AuthProvider>
          <AppContent />
          {/* Botão flutuante de tema (dentro do ThemeProvider) */}
          <FloatingThemeToggle />
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
