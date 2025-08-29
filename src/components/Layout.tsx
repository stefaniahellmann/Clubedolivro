import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, BookOpen, Settings } from 'lucide-react';
import { Button } from './ui/Button';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Skip link para acessibilidade */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:bg-amber-100 focus:text-amber-900 dark:focus:bg-amber-500/10
                   dark:focus:text-amber-300 rounded px-3 py-2 shadow-sm"
      >
        Pular para conteúdo
      </a>

      <header
        className="
          sticky top-0 z-40
          bg-white dark:bg-zinc-900
          shadow-lg border-b border-zinc-200 dark:border-zinc-800
        "
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-amber-600 dark:text-amber-500" />
              <h1
                className="
                  text-xl font-bold bg-gradient-to-r
                  from-amber-600 to-emerald-600
                  dark:from-amber-400 dark:to-emerald-400
                  bg-clip-text text-transparent
                "
              >
                Clube do Livro
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  Olá, <span className="text-amber-700 dark:text-amber-400 font-medium">{user.firstName}</span>!
                </span>
              )}
              {isAdmin && (
                <div className="flex items-center space-x-1 text-sm text-amber-700 dark:text-amber-400">
                  <Settings size={16} />
                  <span>Admin</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="
                  flex items-center space-x-1
                  text-zinc-700 hover:text-zinc-900
                  dark:text-zinc-300 dark:hover:text-white
                "
                aria-label="Sair"
                title="Sair"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main
        id="main"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        role="main"
      >
        {children}
      </main>
    </div>
  );
}
