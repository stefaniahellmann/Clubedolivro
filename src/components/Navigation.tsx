// src/components/Navigation.tsx
import React, { useCallback } from 'react';
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
  ] as const;

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = navItems.findIndex((i) => i.id === activeView);
      if (idx < 0) return;

      if (e.key === 'ArrowRight') {
        const next = (idx + 1) % navItems.length;
        onViewChange(navItems[next].id);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = (idx - 1 + navItems.length) % navItems.length;
        onViewChange(navItems[prev].id);
        e.preventDefault();
      }
    },
    [activeView, onViewChange]
  );

  return (
    <nav
      aria-label="Seções principais"
      className="bar mb-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-3 md:gap-4 overflow-x-auto py-5"
        onKeyDown={handleKey}
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <Button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? 'page' : undefined}
              // botões maiores = mais confortáveis
              size="md"
              className={[
                // espaçamento interno extra e cantos mais suaves
                'px-5 md:px-6 rounded-xl',
                'flex items-center gap-3 whitespace-nowrap transition-all duration-200',
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
              <item.icon size={18} />
              <span className="text-sm md:text-base">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
