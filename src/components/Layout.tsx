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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <header className="bg-gray-800/90 backdrop-blur-sm shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-amber-500" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
                Clube do Livro
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {isAdmin && (
                <div className="flex items-center space-x-1 text-sm text-amber-400">
                  <Settings size={16} />
                  <span>Admin</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-1 text-gray-300 hover:text-white"
              >
                <LogOut size={16} />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-amber-300">
              Olá, {user.firstName}! 👋
            </h2>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
