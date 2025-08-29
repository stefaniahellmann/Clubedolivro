import React, { useCallback } from 'react';
import { Button } from './ui/Button';
import { Home, Calendar, BookOpen, Users, FileText, UserCircle2, Ticket } from 'lucide-react';

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
    { id: 'raffle', label: 'Rifa', icon: Ticket },
    { id: 'profile', label: 'Perfil', icon: UserCircle2 },
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
      className="bar mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
    >
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex gap-2 justify-center flex-wrap py-4"
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
              variant={isActive ? 'primary' : 'ghost'}
              size="sm"
              className={[
                'flex items-center gap-2 whitespace-nowrap transition-all duration-200 px-4 py-2',
                isActive
                  ? [
                      // ATIVO — claro e escuro
                      'bg-emerald-50 text-emerald-700 border border-emerald-200',
                      'dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700',
                      'dark:hover:bg-emerald-500/10',
                      'shadow-sm',
                    ].join(' ')
                  : [
                      // DEFAULT
                      'text-zinc-700 hover:text-emerald-700 hover:bg-emerald-50',
                      'dark:text-zinc-300 dark:hover:text-emerald-300 dark:hover:bg-emerald-500/10',
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
