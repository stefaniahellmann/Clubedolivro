import React from 'react';
import { Button } from './ui/Button';
import { Home, Calendar, BookOpen, Users, FileText } from 'lucide-react';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ activeView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'summaries', label: 'Resumos', icon: Calendar },
    { id: 'books', label: 'Livros', icon: BookOpen },
    { id: 'partners', label: 'Parceiros', icon: Users },
    { id: 'materials', label: 'Materiais', icon: FileText },
  ];

  return (
    <nav
      className="
        bar mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8
        /* 'bar' vem do index.css: bg-white/80 dark:bg-zinc-900/80 + border + blur */
      "
    >
      <div className="flex space-x-1 overflow-x-auto py-4">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              // o variant do seu Button continua, mas as classes abaixo definem as cores
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              className={[
                'flex items-center space-x-2 whitespace-nowrap transition-all duration-200',
                isActive
                  ? [
                      // CLARO (pastéis)
                      'bg-emerald-50 text-emerald-700 border border-emerald-200',
                      'hover:bg-emerald-100',
                      // ESCURO
                      'dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-700/40',
                      'dark:hover:bg-emerald-500/15',
                      'shadow-sm',
                    ].join(' ')
                  : [
                      // CLARO
                      'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100',
                      // ESCURO
                      'dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800',
                    ].join(' '),
              ].join(' ')}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
